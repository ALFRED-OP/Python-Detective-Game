import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import CodeEditor from '../components/CodeEditor';
import EvidenceBoard from '../components/EvidenceBoard';
import TerminalOutput from '../components/case/TerminalOutput';
import CyberButton from '../components/common/CyberButton';
import { Play, ArrowLeft, Loader2, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const CaseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();

    const [caseData, setCaseData] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, passed, failed, error
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const params = user ? { user_id: user.id } : {};
                const res = await api.get(`/cases/${id}`, { params });
                const data = res.data;

                setCaseData(data);

                // Priority: Protected Draft > Starting Code
                if (data.saved_code) {
                    setCode(data.saved_code);
                } else {
                    setCode(data.starting_code.replace(/\\n/g, '\n'));
                }
            } catch (err) {
                console.error(err);
                if (err.response?.status === 403) {
                    navigate('/'); // Case is locked
                }
                setOutput("Error loading case file. Connection terminated.");
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchCase();
    }, [id, user, navigate]);

    // Debounced Autosave
    useEffect(() => {
        if (!caseData || caseData.status === 'completed' || !user) return;

        const timer = setTimeout(async () => {
            setSaveStatus('saving');
            try {
                await api.post(`/cases/${id}/save`, {
                    user_id: user.id,
                    code: code
                });
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            } catch (err) {
                console.error("Autosave failed", err);
                setSaveStatus('error');
            }
        }, 5000); // 5 second debounce

        return () => clearTimeout(timer);
    }, [code, id, user, caseData]);

    const handleSave = async () => {
        if (!user) return;
        setSaveStatus('saving');
        try {
            await api.post(`/cases/${id}/save`, {
                user_id: user.id,
                code: code
            });
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            setSaveStatus('error');
        }
    };

    const handleSubmit = async () => {
        setStatus('running');
        setOutput('Initializing sandbox environment...\nExecuting trace...\n');

        try {
            const res = await api.post('/submit', {
                user_id: user.id,
                case_id: id,
                code: code
            });

            const data = res.data;

            if (data.status === 'Passed') {
                setStatus('passed');
                setOutput(data.output);
                // Refresh local data to show completion
                setCaseData(prev => ({ ...prev, status: 'completed' }));

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

    if (loading) return (
        <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center text-neon-cyan/80">
            <Loader2 size={40} className="animate-spin mb-4" />
            <span className="font-mono text-sm tracking-widest animate-pulse">DECRYPTING CASE FILE #{id}...</span>
        </div>
    );

    if (!caseData) return <div className="p-8 text-center text-red-500 font-mono">CASE FILE CORRUPTED OR MISSING.</div>;

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
            {/* Header / Nav */}
            <div className="flex items-center justify-between shrink-0">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-400 hover:text-white transition-colors group text-sm font-mono"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    RETURN TO DASHBOARD
                </button>
                <div className="text-xs text-gray-500 font-mono">
                    CASE ID: <span className="text-white">#{id}</span> // STATUS: <span className={caseData.status === 'completed' ? "text-neon-green" : "text-neon-cyan"}>
                        {caseData.status === 'completed' ? "SOLVED" : "ACTIVE"}
                    </span>
                </div>
            </div>

            {/* Resolved Banner */}
            {caseData.status === 'completed' && (
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="bg-neon-green/10 border border-neon-green/30 p-2 text-center rounded-lg"
                >
                    <span className="text-neon-green font-mono text-sm font-bold tracking-[0.2em] animate-pulse">
                        ★ CASE SOLVED ★
                    </span>
                    <span className="text-neon-green/60 font-mono text-xs ml-4 uppercase tracking-wider">
                        Review mode active. No additional XP will be awarded.
                    </span>
                </motion.div>
            )}

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
                {/* LEFT PANEL: Evidence & Story */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="md:w-1/3 flex flex-col min-h-0"
                >
                    <EvidenceBoard caseData={caseData} />
                </motion.div>

                {/* RIGHT PANEL: Workspace */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="md:w-2/3 flex flex-col gap-4 min-h-0"
                >
                    {/* Editor Area */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center bg-noir-900 border border-noir-600 border-b-0 rounded-t-lg p-2">
                            <div className="flex items-center space-x-2 px-3">
                                <div className="flex space-x-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                                </div>
                                <span className="text-xs font-mono text-gray-400 ml-3">solution.py</span>

                                {/* Save Status Indicator */}
                                {saveStatus !== 'idle' && (
                                    <div className={clsx(
                                        "text-[10px] font-mono ml-4 px-2 py-0.5 rounded transition-all duration-300 translate-y-[1px]",
                                        saveStatus === 'saving' ? "text-neon-cyan animate-pulse bg-neon-cyan/10" :
                                            saveStatus === 'saved' ? "text-neon-green bg-neon-green/10" :
                                                "text-neon-pink bg-neon-pink/10"
                                    )}>
                                        {saveStatus === 'saving' && "// SYNCING..."}
                                        {saveStatus === 'saved' && "// DRAFT SYNCED"}
                                        {saveStatus === 'error' && "// SYNC FAILED"}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <CyberButton
                                    variant="ghost"
                                    size="sm"
                                    icon={Save}
                                    onClick={handleSave}
                                    className="!py-1 !px-2 text-xs"
                                    isLoading={saveStatus === 'saving'}
                                    disabled={caseData.status === 'completed'}
                                >
                                    SAVE
                                </CyberButton>
                                <CyberButton
                                    variant="success"
                                    size="sm"
                                    icon={Play}
                                    onClick={handleSubmit}
                                    isLoading={status === 'running'}
                                    disabled={status === 'running'}
                                    className="!py-1"
                                >
                                    EXECUTE
                                </CyberButton>
                            </div>
                        </div>

                        {/* Editor Component */}
                        <div className="flex-1 min-h-0">
                            <CodeEditor code={code} onChange={setCode} />
                        </div>
                    </div>

                    {/* Console / Output Area */}
                    <div className="h-1/3 min-h-[150px] shrink-0">
                        <TerminalOutput output={output} status={status} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CaseView;
