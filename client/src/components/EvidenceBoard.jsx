import { User, FileText, HelpCircle, Lightbulb, Lock, Unlock, AlertOctagon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from './common/GlassPanel';
import { clsx } from 'clsx';

const EvidenceBoard = ({ caseData }) => {
    const [activeTab, setActiveTab] = useState('briefing');
    const [revealedHints, setRevealedHints] = useState([]);

    if (!caseData) return <div className="p-4 text-neon-cyan animate-pulse font-mono">Loading case file...</div>;

    const toggleHint = (index) => {
        if (revealedHints.includes(index)) return;
        setRevealedHints([...revealedHints, index]);
    };

    const tabs = [
        { id: 'briefing', label: 'CASE FILE', icon: FileText },
        { id: 'suspects', label: 'SUSPECTS', icon: User },
        { id: 'hints', label: 'HINTS', icon: Lightbulb },
    ];

    return (
        <div className="h-full flex flex-col bg-noir-800/50 backdrop-blur-md rounded-lg overflow-hidden border border-white/5 shadow-2xl">
            {/* Tabs Header */}
            <div className="flex border-b border-white/5 bg-noir-900/80">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex-1 p-4 text-sm font-bold flex items-center justify-center transition-all relative font-mono tracking-wider",
                            activeTab === tab.id ? "text-neon-purple bg-white/5" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-purple shadow-[0_0_10px_#b026ff]"
                            />
                        )}
                        <tab.icon size={16} className="mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-noir-600 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {activeTab === 'briefing' && (
                            <div className="space-y-6">
                                <div className="border-l-2 border-neon-purple pl-6 py-1">
                                    <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wide">{caseData.title}</h2>
                                    <div className="text-xs text-neon-purple font-mono mb-4 px-2 py-0.5 bg-neon-purple/10 inline-block rounded border border-neon-purple/30">
                                        DIFFICULTY: {caseData.difficulty.toUpperCase()}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed text-base font-sans">{caseData.description}</p>
                                </div>

                                <GlassPanel className="p-4 border-l-4 border-l-neon-cyan !bg-neon-cyan/5 !border-y-0 !border-r-0 rounded-none">
                                    <h3 className="text-xs font-bold text-neon-cyan mb-2 flex items-center font-mono uppercase tracking-widest">
                                        <HelpCircle size={14} className="mr-2" />
                                        Mission Objective
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Compare the evidence code against expectations. Fix the logic or reveal the truth.
                                    </p>
                                </GlassPanel>

                                {caseData.evidence && caseData.evidence.length > 0 && (
                                    <div className="bg-noir-900/50 p-4 rounded-lg border border-white/5">
                                        <h3 className="text-xs font-bold text-gray-500 mb-4 font-mono uppercase tracking-widest">EVIDENCE LOG</h3>
                                        <ul className="space-y-3">
                                            {caseData.evidence.map((ev, i) => (
                                                <li key={i} className="flex items-start text-sm text-gray-300">
                                                    <span className="text-neon-blue mr-3 mt-1 text-xs">➜</span>
                                                    <span className="font-mono bg-black/30 px-2 py-1 rounded w-full">{ev}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'suspects' && (
                            <div className="grid grid-cols-1 gap-4">
                                {caseData.suspects && caseData.suspects.map((suspect, idx) => (
                                    <GlassPanel key={idx} className="!p-4 hover:border-neon-purple/40 transition-colors group cursor-default">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 rounded bg-noir-800 flex items-center justify-center mr-4 border border-white/10 group-hover:border-neon-purple/50 group-hover:shadow-[0_0_10px_rgba(176,38,255,0.2)] transition-all">
                                                <User size={24} className="text-gray-500 group-hover:text-neon-purple transition-colors" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="font-bold text-white font-display tracking-wide">{suspect.name}</div>
                                                    <div className="text-[10px] text-gray-600 font-mono border border-gray-800 px-1 rounded uppercase">Subj-{String(idx + 1).padStart(2, '0')}</div>
                                                </div>
                                                <p className="text-sm text-gray-400 italic">"{suspect.bio}"</p>
                                            </div>
                                        </div>
                                    </GlassPanel>
                                ))}
                            </div>
                        )}

                        {activeTab === 'hints' && (
                            <div className="space-y-4">
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded text-yellow-500 text-xs font-mono mb-6">
                                    <h4 className="font-bold flex items-center mb-1"><AlertOctagon size={14} className="mr-2" /> WARNING: RESOURCE COST</h4>
                                    Accessing hints uses investigation resources. Only decrypt if absolutely necessary.
                                </div>

                                {caseData.hints && Object.entries(caseData.hints).map(([key, hintText], index) => {
                                    if (!hintText) return null;
                                    const isRevealed = revealedHints.includes(index);

                                    return (
                                        <div key={key} className={clsx(
                                            "border rounded-lg overflow-hidden transition-all duration-300",
                                            isRevealed ? "border-neon-green/30 bg-neon-green/5" : "border-white/5 bg-noir-900"
                                        )}>
                                            <button
                                                onClick={() => toggleHint(index)}
                                                className="w-full p-4 flex items-center justify-between text-left"
                                            >
                                                <span className={clsx(
                                                    "font-bold font-mono text-xs tracking-widest",
                                                    isRevealed ? "text-neon-green" : "text-gray-500"
                                                )}>
                                                    ENCRYPTED FILE #{index + 1}
                                                </span>
                                                {isRevealed ? (
                                                    <Unlock size={16} className="text-neon-green" />
                                                ) : (
                                                    <Lock size={16} className="text-gray-600" />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {isRevealed && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="px-4 pb-4"
                                                    >
                                                        <div className="pt-4 border-t border-neon-green/10">
                                                            <p className="text-gray-200 font-mono text-sm leading-relaxed">{hintText}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EvidenceBoard;
