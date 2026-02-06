import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ScanLine, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassPanel from '../components/common/GlassPanel';
import CyberButton from '../components/common/CyberButton';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-noir-950">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 blur-[150px] animate-pulse-slow delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-md p-4 relative z-10"
            >
                <GlassPanel className="p-8 border-neon-purple/20">
                    <div className="text-center mb-8 relative">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-noir-800/50 mb-4 border border-neon-purple/30 shadow-[0_0_15px_rgba(176,38,255,0.2)]"
                        >
                            <Lock className="text-neon-purple" size={36} />
                        </motion.div>

                        <h1 className="text-3xl font-display font-bold text-white tracking-wider mb-2">
                            ACCESS CONSOLE
                        </h1>
                        <p className="text-gray-400 text-sm font-mono">
                            Identify yourself, Detective.
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/40 text-red-500 p-3 rounded mb-6 text-sm flex items-center justify-center gap-2 font-mono"
                        >
                            <ScanLine size={16} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-mono text-neon-purple mb-1 ml-1 uppercase tracking-widest">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-noir-800/50 border border-noir-600 rounded-lg p-3 pl-4 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 focus:bg-noir-800 transition-all font-mono"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="DETECTIVE ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono text-neon-purple mb-1 ml-1 uppercase tracking-widest">Passcode</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full bg-noir-800/50 border border-noir-600 rounded-lg p-3 pl-4 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 focus:bg-noir-800 transition-all font-mono"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <CyberButton
                            type="submit"
                            variant="primary"
                            className="w-full py-4 text-base shadow-[0_0_20px_rgba(176,38,255,0.2)]"
                            icon={Terminal}
                        >
                            INITIATE SESSION
                        </CyberButton>
                    </form>

                    <div className="mt-8 text-center text-sm font-mono text-gray-500">
                        <span className="opacity-70">No credentials?</span>
                        <Link to="/register" className="ml-2 text-neon-cyan hover:text-white transition-colors underline decoration-neon-cyan/30 underline-offset-4 hover:decoration-white">
                            Request Badge
                        </Link>
                    </div>
                </GlassPanel>
            </motion.div>
        </div>
    );
};

export default Login;
