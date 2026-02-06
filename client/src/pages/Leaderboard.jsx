import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Trophy, Medal, Award, Crown, Loader2, User } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassPanel from '../components/common/GlassPanel';
import { clsx } from 'clsx';

const Leaderboard = () => {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/leaderboard');
                setBoard(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-400 fill-yellow-400/20 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" size={28} />;
        if (index === 1) return <Medal className="text-gray-300 fill-gray-300/20" size={24} />;
        if (index === 2) return <Medal className="text-amber-700 fill-amber-700/20" size={24} />;
        return <span className="font-mono text-gray-500 text-lg font-bold">#{String(index + 1).padStart(2, '0')}</span>;
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="max-w-4xl mx-auto min-h-[calc(100vh-100px)] flex flex-col">
            <div className="text-center mb-10 relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white flex items-center justify-center mb-2">
                        <Trophy className="mr-4 text-neon-green hidden md:block" size={40} />
                        ELITE AGENTS
                        <Trophy className="ml-4 text-neon-green hidden md:block" size={40} />
                    </h1>
                    <p className="text-neon-cyan/70 font-mono tracking-widest text-sm uppercase">
                        // Security Clearance: Top Secret
                    </p>
                </motion.div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 blur-[100px] pointer-events-none rounded-full" />
            </div>

            <GlassPanel className="flex-1 !p-0 overflow-hidden flex flex-col">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-noir-900/50 text-gray-400 font-mono font-bold text-xs uppercase tracking-wider sticky top-0 backdrop-blur-md z-10">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-7">Agent Identity</div>
                    <div className="col-span-3 text-right">XP Score</div>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-neon-green">
                        <Loader2 size={32} className="animate-spin mb-4" />
                        <span className="font-mono animate-pulse">DECRYPTING ARCHIVES...</span>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="divide-y divide-white/5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-noir-600"
                    >
                        {board.map((user, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                className={clsx(
                                    "grid grid-cols-12 gap-4 p-4 items-center transition-all duration-300 hover:bg-white/5",
                                    idx === 0 ? "bg-gradient-to-r from-yellow-500/10 to-transparent border-l-2 border-yellow-500" :
                                        idx === 1 ? "bg-gradient-to-r from-gray-300/5 to-transparent border-l-2 border-gray-300/50" :
                                            idx === 2 ? "bg-gradient-to-r from-amber-700/5 to-transparent border-l-2 border-amber-700/50" :
                                                "border-l-2 border-transparent hover:border-white/20"
                                )}
                            >
                                <div className="col-span-2 flex justify-center items-center">
                                    {getRankIcon(idx)}
                                </div>
                                <div className="col-span-7 flex items-center">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center mr-4 border",
                                        idx === 0 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" :
                                            idx === 1 ? "bg-gray-300/10 border-gray-300/30 text-gray-300" :
                                                idx === 2 ? "bg-amber-700/10 border-amber-700/30 text-amber-700" :
                                                    "bg-noir-800 border-white/10 text-gray-500"
                                    )}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <div className={clsx(
                                            "font-bold text-lg font-display tracking-wide",
                                            idx === 0 ? "text-yellow-400" :
                                                idx < 3 ? "text-gray-100" : "text-gray-300"
                                        )}>
                                            {user.username}
                                        </div>
                                        <div className="text-[10px] text-neon-purple font-mono uppercase border border-neon-purple/20 px-1.5 rounded inline-block bg-neon-purple/5">
                                            {user.rank_title}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 text-right font-mono font-bold text-lg text-white">
                                    {user.xp} <span className="text-xs text-gray-500 font-normal">XP</span>
                                </div>
                            </motion.div>
                        ))}

                        {board.length === 0 && (
                            <div className="p-20 text-center text-gray-500 font-mono">
                                NO ACTIVE AGENTS FOUND IN LOCAL DATABASE.
                            </div>
                        )}
                    </motion.div>
                )}
            </GlassPanel>
        </div>
    );
};

export default Leaderboard;
