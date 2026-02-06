import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

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
            setError(err.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-noir-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-green opacity-5 blur-[128px]"></div>
            </div>

            <div className="bg-noir-800 p-8 rounded-lg border border-noir-600 shadow-2xl w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-noir-700 mb-4 border border-noir-600">
                        <UserPlus className="text-neon-green" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold font-mono text-gray-100">NEW BADGE</h1>
                    <p className="text-gray-500 mt-2">Join the investigation unit.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-noir-900 border border-noir-600 rounded p-3 text-gray-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-noir-900 border border-noir-600 rounded p-3 text-gray-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-green hover:bg-green-600 text-noir-900 font-bold py-3 rounded transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
                    >
                        CREATE ACCOUNT
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have a badge? <Link to="/login" className="text-neon-green hover:underline">Access Terminal</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
