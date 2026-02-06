import { useState, useEffect } from 'react';
import api from '../lib/api';
import { motion } from 'framer-motion';
import CaseCard from '../components/dashboard/CaseCard';
import DashboardScene from '../components/dashboard/DashboardScene';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/cases', {
                    params: { user_id: user?.id }
                });
                setCases(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user?.id]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-100px)]">
            {/* 3D Background */}
            <DashboardScene />

            <div className="relative z-10 flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 backdrop-blur-sm bg-noir-900/30 p-4 rounded-xl">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            CASE FILES
                        </h1>
                        <p className="text-neon-cyan/80 mt-2 font-mono text-sm tracking-wide">
                             // SELECT CASE FILE TO BEGIN INVESTIGATION
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-right hidden md:block"
                    >
                        <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">SYSTEM STATUS</div>
                        <div className="text-neon-green font-bold flex items-center justify-end gap-2 bg-neon-green/10 px-3 py-1 rounded-full border border-neon-green/20">
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                            ACTIVE AGENT
                        </div>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 text-neon-purple">
                        <Loader2 size={40} className="animate-spin mb-4" />
                        <span className="font-mono text-sm animate-pulse">DECRYPTING ARCHIVES...</span>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
                    >
                        {cases.map((c, index) => (
                            <CaseCard key={c.id} caseData={c} index={index} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
