import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Trophy, Map } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-noir-800 border-b border-noir-600 bg-opacity-90 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold font-mono tracking-tighter">
                    <span className="text-neon-purple">PY</span>
                    <span className="text-gray-100">DETECTIVE</span>
                </Link>

                {user && (
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="flex items-center text-gray-400 hover:text-neon-blue transition-colors">
                            <Map size={18} className="mr-2" />
                            <span className="hidden md:inline">Cases</span>
                        </Link>

                        <Link to="/leaderboard" className="flex items-center text-gray-400 hover:text-neon-green transition-colors">
                            <Trophy size={18} className="mr-2" />
                            <span className="hidden md:inline">Leaderboard</span>
                        </Link>

                        <div className="flex items-center pl-6 border-l border-noir-600">
                            <div className="flex flex-col items-end mr-3">
                                <span className="text-sm font-bold text-gray-200">{user.username}</span>
                                <span className="text-xs text-neon-purple">{user.rank || 'Detective'} | {user.xp} XP</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
