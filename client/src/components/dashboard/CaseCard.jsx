import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Lock, Unlock } from 'lucide-react';
import { clsx } from 'clsx';

const CaseCard = ({ caseData, index }) => {
    const isLocked = caseData.status === 'locked';
    const isCompleted = caseData.status === 'completed';

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.1 }
        }
    };

    const cardContent = (
        <div className={clsx(
            "h-full bg-noir-800/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden relative transition-all duration-300",
            !isLocked && "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_20px_rgba(176,38,255,0.15)]",
            isLocked && "opacity-60 grayscale cursor-not-allowed",
            isCompleted && "border-neon-green/30 shadow-[0_0_15px_rgba(0,255,65,0.1)]"
        )}>
            {/* Decorative Top Bar */}
            <div className={clsx(
                "h-1 w-full",
                isCompleted ? "bg-neon-green shadow-[0_0_10px_#00ff41]" :
                    caseData.difficulty === 'Easy' ? "bg-neon-green" :
                        caseData.difficulty === 'Medium' ? "bg-neon-cyan" :
                            "bg-neon-pink"
            )} />

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        <span className={clsx(
                            "px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border",
                            caseData.difficulty === 'Easy' ? "bg-neon-green/10 text-neon-green border-neon-green/30" :
                                caseData.difficulty === 'Medium' ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" :
                                    "bg-neon-pink/10 text-neon-pink border-neon-pink/30"
                        )}>
                            {caseData.difficulty}
                        </span>
                        {isCompleted && (
                            <span className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-neon-green text-noir-900 animate-pulse shadow-[0_0_10px_#00ff41]">
                                SOLVED
                            </span>
                        )}
                    </div>
                    <span className="text-noir-600 font-mono font-bold text-2xl group-hover:text-white/20 transition-colors">
                        #{String(caseData.id).padStart(3, '0')}
                    </span>
                </div>

                <h3 className={clsx(
                    "text-xl font-bold mb-2 transition-colors font-display tracking-tight",
                    isLocked ? "text-gray-500" : (isCompleted ? "text-neon-green group-hover:text-neon-green" : "text-gray-100 group-hover:text-neon-purple")
                )}>
                    {caseData.title}
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
                        isLocked ? "text-gray-600" : (isCompleted ? "text-neon-green" : "text-neon-blue")
                    )}>
                        {isLocked ? (
                            <span className="flex items-center gap-1.5 opacity-50">
                                <Lock size={14} /> LOCKED
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                {isCompleted ? 'REVIEW FILE' : 'ACCESS FILE'}
                                <ChevronRight size={14} className="ml-1" />
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />

            {/* Scanline on hover */}
            {!isLocked && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-[150%] group-hover:animate-[scan_2s_linear_infinite]" />
            )}

            {/* Completion Glow Overlay */}
            {isCompleted && (
                <div className="absolute inset-0 bg-neon-green/5 pointer-events-none" />
            )}
        </div>
    );

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            whileHover={!isLocked ? { y: -5 } : {}}
            className="group relative"
        >
            {isLocked ? (
                <div className="block h-full cursor-not-allowed" title="Complete previous cases to unlock">
                    {cardContent}
                </div>
            ) : (
                <Link to={`/case/${caseData.id}`} className="block h-full">
                    {cardContent}
                </Link>
            )}
        </motion.div>
    );
};

export default CaseCard;
