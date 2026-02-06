import { User, FileText, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const EvidenceBoard = ({ caseData }) => {
    const [activeTab, setActiveTab] = useState('briefing');

    if (!caseData) return <div className="p-4 text-gray-500">Loading case file...</div>;

    return (
        <div className="h-full flex flex-col bg-noir-800 border-r border-noir-600">
            {/* Tabs */}
            <div className="flex border-b border-noir-600">
                <button
                    onClick={() => setActiveTab('briefing')}
                    className={`flex-1 p-3 text-sm font-bold flex items-center justify-center transition-colors ${activeTab === 'briefing' ? 'bg-noir-700 text-neon-purple border-b-2 border-neon-purple' : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    <FileText size={16} className="mr-2" /> CASE FILE
                </button>
                <button
                    onClick={() => setActiveTab('suspects')}
                    className={`flex-1 p-3 text-sm font-bold flex items-center justify-center transition-colors ${activeTab === 'suspects' ? 'bg-noir-700 text-neon-purple border-b-2 border-neon-purple' : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    <User size={16} className="mr-2" /> SUSPECTS
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {activeTab === 'briefing' && (
                    <div className="space-y-6">
                        <div className="border-l-2 border-neon-purple pl-4">
                            <h2 className="text-xl font-bold text-gray-100 mb-1">{caseData.title}</h2>
                            <div className="text-sm text-neon-purple font-mono mb-4">DIFFICULTY: {caseData.difficulty.toUpperCase()}</div>
                            <p className="text-gray-300 leading-relaxed font-serif text-lg">{caseData.description}</p>
                        </div>

                        <div className="bg-noir-900/50 p-4 rounded border border-noir-600">
                            <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
                                <HelpCircle size={14} className="mr-2" />
                                OBJECTIVE
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {/* Infer objective from description or show standard text. 
                        Usually description contains the task. */}
                                Compare the evidence code against expectations. Fix the logic or reveal the truth.
                            </p>
                        </div>

                        {caseData.evidence && caseData.evidence.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 mb-3">EVIDENCE LOG</h3>
                                <ul className="space-y-2">
                                    {caseData.evidence.map((ev, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-300 bg-black/20 p-2 rounded">
                                            <span className="text-neon-blue mr-2">➜</span> {ev}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'suspects' && (
                    <div className="space-y-4">
                        {caseData.suspects && caseData.suspects.map((suspect, idx) => (
                            <div key={idx} className="bg-noir-900 border border-noir-600 p-4 rounded hover:border-neon-purple transition-colors group">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-noir-800 flex items-center justify-center mr-3 border border-noir-600 group-hover:border-neon-purple">
                                        <User size={20} className="text-gray-500 group-hover:text-neon-purple" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-200">{suspect.name}</div>
                                        <div className="text-xs text-gray-500">Subject #{idx + 1}</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 pl-14">"{suspect.bio}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvidenceBoard;
