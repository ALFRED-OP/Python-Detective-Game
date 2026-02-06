import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Map, Trophy, Terminal, User } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-noir-900/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.3)] group-hover:shadow-[0_0_25px_rgba(176,38,255,0.5)] transition-all">
                            <Terminal size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold font-mono tracking-tighter text-white group-hover:text-glow transition-all">
                            PY<span className="text-neon-purple">DETECTIVE</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    {user && (
                        <div className="flex items-center space-x-1 md:space-x-4">
                            <Link
                                to="/"
                                className={clsx(
                                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                                    isActive('/')
                                        ? "text-neon-cyan bg-neon-cyan/10 ring-1 ring-neon-cyan/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Map size={16} className="mr-2" />
                                <span className="hidden md:inline">CASES</span>
                            </Link>

                            <Link
                                to="/leaderboard"
                                className={clsx(
                                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                                    isActive('/leaderboard')
                                        ? "text-neon-green bg-neon-green/10 ring-1 ring-neon-green/50 shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Trophy size={16} className="mr-2" />
                                <span className="hidden md:inline">RANKING</span>
                            </Link>

                            <div className="h-6 w-px bg-white/10 mx-2" />

                            {/* User Profile */}
                            <div className="flex items-center gap-4 pl-2">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-bold text-gray-200">{user.username}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase tracking-wider text-neon-purple bg-neon-purple/10 px-1.5 rounded">
                                            {user.rank || 'Rookie'}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-mono">
                                            {user.xp} XP
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-neon-pink hover:bg-neon-pink/10 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
