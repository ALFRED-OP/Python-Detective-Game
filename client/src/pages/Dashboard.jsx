import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { Lock, Unlock, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Fetch cases and user progress
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/cases');
                // Assuming response is an array of cases
                // We also need user progress (frontend can infer from API if API returned it, 
                // but our /cases endpoint just returns cases. 
                // Ideally /cases should include "completed: boolean" if user is logged in, OR we fetch progress separately.
                // For now, let's fetch progress or update backend. 
                // Update: Backtrack. Let's make /cases return completed status?
                // Or simpler: /cases works. We map locally if we had progress endpoint.
                // Let's implement a quick progress check on backend? 
                // Actually, backend /cases endpoint logic was: "getAllCases".
                // Let's stick to simple dashboard for now. We won't show "Completed" tick unless we have the data.
                // Wait, SubmissionModel has getUserProgress.
                // I should have exposed an endpoint for it.
                // I can add it to `index.php`?
                // Or just assume local user state has it?
                // User state in context has `xp`.
                // Let's just list cases for now.
                setCases(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-noir-600 pb-4">
                <div>
                    <h1 className="text-4xl font-mono font-bold text-gray-100">CASE FILES</h1>
                    <p className="text-gray-400 mt-2">Select a file to begin investigation.</p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-sm text-gray-500">CURRENT STATUS</div>
                    <div className="text-neon-green font-bold">ACTIVE AGENT</div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500 animate-pulse">Accessing Archives...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((c) => (
                        <Link
                            to={`/case/${c.id}`}
                            key={c.id}
                            className={clsx(
                                "group relative p-6 bg-noir-800 border border-noir-600 rounded-lg hover:border-neon-purple transition-all hover:shadow-[0_0_20px_rgba(176,38,255,0.2)] overflow-hidden",
                            )}
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <div className="text-4xl font-bold text-noir-700 font-mono">#{String(c.id).padStart(3, '0')}</div>
                            </div>

                            <div className="relative z-10">
                                <div className={clsx(
                                    "inline-flex items-center px-2 py-1 rounded text-xs font-bold mb-3",
                                    c.difficulty === 'Easy' ? "bg-green-900/30 text-green-400" :
                                        c.difficulty === 'Medium' ? "bg-yellow-900/30 text-yellow-400" :
                                            "bg-red-900/30 text-red-500"
                                )}>
                                    {c.difficulty.toUpperCase()}
                                </div>

                                <h3 className="text-xl font-bold mb-1 text-gray-100 group-hover:text-neon-purple transition-colors">{c.title}</h3>
                                <div className="text-sm text-gray-400 mb-4 font-mono">{c.category}</div>

                                <div className="flex items-center justify-between mt-6 text-sm">
                                    <span className="text-gray-500 flex items-center">
                                        <Clock size={14} className="mr-1" /> XP REWARD: {c.xp_reward}
                                    </span>
                                    <span className="text-neon-blue flex items-center group-hover:translate-x-1 transition-transform">
                                        OPEN FILE &rarr;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
