import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Trophy, Medal, Award } from 'lucide-react';

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

    const getIcon = (index) => {
        if (index === 0) return <Trophy className="text-yellow-400" size={24} />;
        if (index === 1) return <Medal className="text-gray-300" size={24} />;
        if (index === 2) return <Medal className="text-amber-700" size={24} />;
        return <span className="font-mono text-gray-500 text-lg font-bold">#{index + 1}</span>;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-mono font-bold text-gray-100 flex items-center justify-center">
                    <Award className="mr-4 text-neon-green" size={40} />
                    TOP DETECTIVES
                </h1>
            </div>

            <div className="bg-noir-800 border border-noir-600 rounded-lg overflow-hidden shadow-2xl">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-noir-600 bg-noir-900 text-gray-400 font-bold text-sm uppercase tracking-wider">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6">Detective</div>
                    <div className="col-span-4 text-right">XP Scored</div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Decrypting records...</div>
                ) : (
                    <div className="divide-y divide-noir-700">
                        {board.map((user, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-noir-700/50 transition-colors">
                                <div className="col-span-2 flex justify-center">{getIcon(idx)}</div>
                                <div className="col-span-6">
                                    <div className="font-bold text-gray-200 text-lg">{user.username}</div>
                                    <div className="text-xs text-neon-purple">{user.rank_title}</div>
                                </div>
                                <div className="col-span-4 text-right font-mono text-neon-green font-bold text-xl">
                                    {user.xp} XP
                                </div>
                            </div>
                        ))}

                        {board.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No active agents found locally.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
