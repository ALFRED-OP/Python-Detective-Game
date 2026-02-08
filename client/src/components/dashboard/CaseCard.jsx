import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

const CaseCard = ({ caseData, index }) => {
    const isLocked = false;
    const isCompleted = caseData.completed;

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.1 }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
            className="group relative"
        >
            <Link to={`/case/${caseData.id}`} className="block h-full">
                <div className={clsx(
                    "h-full bg-noir-800/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden relative transition-all duration-300",
                    "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_20px_rgba(176,38,255,0.15)]",
                    isLocked && "opacity-60 grayscale cursor-not-allowed"
                )}>
                    {/* Decorative Top Bar */}
                    <div className={clsx(
                        "h-1 w-full",
                        caseData.difficulty === 'Easy' ? "bg-neon-green" :
                            caseData.difficulty === 'Medium' ? "bg-neon-cyan" :
                                "bg-neon-pink"
                    )} />

                    <div className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className={clsx(
                                "px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border",
                                caseData.difficulty === 'Easy' ? "bg-neon-green/10 text-neon-green border-neon-green/30" :
                                    caseData.difficulty === 'Medium' ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" :
                                        "bg-neon-pink/10 text-neon-pink border-neon-pink/30"
                            )}>
                                {caseData.difficulty}
                            </span>
                            <span className="text-noir-600 font-mono font-bold text-2xl group-hover:text-white/20 transition-colors">
                                #{String(caseData.id).padStart(3, '0')}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-neon-purple transition-colors font-display tracking-tight flex items-center gap-2">
                            {caseData.title}
                            {isCompleted && (
                                <CheckCircle size={18} className="text-neon-green fill-neon-green/10" />
                            )}
                        </h3>

                        <p className="text-gray-400 text-sm font-mono mb-6 line-clamp-2">
                            {caseData.category}
                        </p>

                        <div className="flex items-center justify-between text-sm border-t border-white/5 pt-4">
                            <div className="flex items-center text-gray-500 font-mono text-xs">
                                <Clock size={12} className="mr-1.5" />
                                {caseData.xp_reward} XP
                            </div>

                            <div className={clsx(
                                "flex items-center font-bold text-xs transition-transform group-hover:translate-x-1",
                                isLocked ? "text-gray-600" : "text-neon-blue"
                            )}>
                                {isLocked ? <Lock size={14} /> : <>ACCESS FILE <ChevronRight size={14} className="ml-1" /></>}
                            </div>
                        </div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />

                    {/* Scanline on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-[150%] group-hover:animate-[scan_2s_linear_infinite]" />
                </div>
            </Link>
        </motion.div>
    );
};

export default CaseCard;
