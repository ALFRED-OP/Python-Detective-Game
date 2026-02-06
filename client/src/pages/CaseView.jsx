import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import CodeEditor from '../components/CodeEditor';
import EvidenceBoard from '../components/EvidenceBoard';
import { Play, AlertOctagon, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

const CaseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();

    const [caseData, setCaseData] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, passed, failed, error
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await api.get(`/cases/${id}`);
                setCaseData(res.data);
                setCode(res.data.starting_code.replace(/\\n/g, '\n')); // Handle potentially escaped newlines from DB
            } catch (err) {
                console.error(err);
                setOutput("Error loading case file. Connection terminated.");
            } finally {
                setLoading(false);
            }
        };
        fetchCase();
    }, [id]);

    const handleSubmit = async () => {
        setStatus('running');
        setOutput('Initializing sandbox environment...\nExecuting trace...\n');
        setResultData(null);

        try {
            const res = await api.post('/submit', {
                user_id: user.id,
                case_id: id,
                code: code
            });

            const data = res.data;
            setResultData(data);

            if (data.status === 'Passed') {
                setStatus('passed');
                setOutput(data.output);
                if (data.first_completion) {
                    refreshUser(data.xp_gained);
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#b026ff', '#00ff41', '#ffffff']
                    });
                }
            } else {
                setStatus(data.status === 'Error' ? 'error' : 'failed');
                // Format output to show user output vs expected if failed
                let out = "";
                if (data.stderr) {
                    out += `STDERR:\n${data.stderr}\n\n`;
                }
                out += `OUTPUT:\n${data.output}\n`;

                if (data.status === 'Failed') {
                    out += `\nEXPECTED:\n${data.expected}`;
                }
                setOutput(out);
            }

        } catch (err) {
            setStatus('error');
            setOutput("System Failure: Unable to reach execution engine.");
        }
    };

    if (loading) return <div className="h-[calc(100vh-64px)] flex items-center justify-center text-neon-green font-mono">Loading Case #{id}...</div>;

    if (!caseData) return <div className="p-8 text-center text-red-500">Case file corrupted or missing.</div>;

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row gap-4">
            {/* LEFT PANEL: Evidence & Story */}
            <div className="md:w-1/3 flex flex-col rounded-lg overflow-hidden border border-noir-600 shadow-2xl">
                <EvidenceBoard caseData={caseData} />
            </div>

            {/* RIGHT PANEL: Workspace */}
            <div className="md:w-2/3 flex flex-col gap-4">
                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center bg-noir-800 p-2 rounded-t-lg border border-noir-600 border-b-0">
                        <div className="flex items-center space-x-2 px-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm font-mono text-gray-400 ml-2">main.py</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={status === 'running'}
                            className={clsx(
                                "flex items-center px-4 py-1 rounded text-sm font-bold transition-all",
                                status === 'running' ? "bg-gray-600 cursor-not-allowed" : "bg-neon-green hover:bg-green-500 text-noir-900 shadow-lg hover:shadow-neon-green/50"
                            )}
                        >
                            {status === 'running' ? 'EXECUTING...' : <><Play size={16} className="mr-2" /> RUN CODE</>}
                        </button>
                    </div>
                    <div className="flex-1">
                        <CodeEditor code={code} onChange={setCode} />
                    </div>
                </div>

                {/* Console / Output Area */}
                <div className="h-48 bg-noir-900 rounded-lg border border-noir-600 flex flex-col overflow-hidden shadow-inner font-mono text-sm relative">
                    <div className="bg-noir-800 px-4 py-2 text-xs font-bold text-gray-500 border-b border-noir-700 flex justify-between">
                        <span>TERMINAL OUTPUT</span>
                        {status === 'passed' && <span className="text-neon-green flex items-center"><CheckCircle size={12} className="mr-1" /> CASE SOLVED</span>}
                        {status === 'failed' && <span className="text-red-500 flex items-center"><XCircle size={12} className="mr-1" /> INCORRECT</span>}
                        {status === 'error' && <span className="text-yellow-500 flex items-center"><AlertOctagon size={12} className="mr-1" /> RUNTIME ERROR</span>}
                    </div>

                    <pre className="p-4 flex-1 overflow-auto text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                        {output || <span className="text-gray-600 italic">// Output will appear here...</span>}
                    </pre>

                    {/* Success Overlay Actions */}
                    {status === 'passed' && (
                        <div className="absolute top-1 right-2 animate-in fade-in slide-in-from-right duration-500">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-noir-800 text-neon-purple border border-neon-purple/50 px-3 py-1 rounded text-xs font-bold hover:bg-neon-purple hover:text-white transition-colors flex items-center"
                            >
                                RETURN TO HQ <ArrowRight size={12} className="ml-2" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaseView;
