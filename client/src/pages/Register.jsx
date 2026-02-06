import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassPanel from '../components/common/GlassPanel';
import CyberButton from '../components/common/CyberButton';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            navigate('/login');
        } catch (err) {
            console.error("Registration Error:", err);
            // If the error is a string (e.g. 500 HTML or raw DB error), show it
            if (typeof err === 'string') {
                setError(err);
            }
            // If it's an object with an 'error' property
            else if (err.error) {
                setError(err.error);
            }
            // If it's an object with a 'message' property
            else if (err.message) {
                setError(err.message);
            }
            // Fallback
            else {
                setError('Registration failed. Check console/backend.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-noir-950">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-green/10 blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 blur-[150px] animate-pulse-slow delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-md p-4 relative z-10"
            >
                <GlassPanel className="p-8 border-neon-green/20">
                    <div className="text-center mb-8 relative">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-noir-800/50 mb-4 border border-neon-green/30 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                        >
                            <UserPlus className="text-neon-green" size={36} />
                        </motion.div>

                        <h1 className="text-3xl font-display font-bold text-white tracking-wider mb-2">
                            NEW RECRUIT
                        </h1>
                        <p className="text-gray-400 text-sm font-mono">
                            Initialize detective profile.
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/40 text-red-500 p-3 rounded mb-6 text-sm flex items-center justify-center gap-2 font-mono"
                        >
                            <Shield size={16} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-mono text-neon-green mb-1 ml-1 uppercase tracking-widest">Codename</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-noir-800/50 border border-noir-600 rounded-lg p-3 pl-4 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 focus:bg-noir-800 transition-all font-mono"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="CHOOSE ALIAS"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono text-neon-green mb-1 ml-1 uppercase tracking-widest">Secret Key</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full bg-noir-800/50 border border-noir-600 rounded-lg p-3 pl-4 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 focus:bg-noir-800 transition-all font-mono"
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
                            variant="success"
                            className="w-full py-4 text-base shadow-[0_0_20px_rgba(0,255,65,0.2)] text-noir-900"
                            icon={ChevronRight}
                        >
                            CREATE PROFILE
                        </CyberButton>
                    </form>

                    <div className="mt-8 text-center text-sm font-mono text-gray-500">
                        <span className="opacity-70">Already verified?</span>
                        <Link to="/login" className="ml-2 text-neon-purple hover:text-white transition-colors underline decoration-neon-purple/30 underline-offset-4 hover:decoration-white">
                            Access Terminal
                        </Link>
                    </div>
                </GlassPanel>
            </motion.div>
        </div>
    );
};

export default Register;
