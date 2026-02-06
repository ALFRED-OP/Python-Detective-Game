import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-noir-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple opacity-5 blur-[128px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue opacity-5 blur-[128px]"></div>
            </div>

            <div className="bg-noir-800 p-8 rounded-lg border border-noir-600 shadow-2xl w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-noir-700 mb-4 border border-noir-600">
                        <Lock className="text-neon-purple" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold font-mono text-gray-100">ACCESS TERMINAL</h1>
                    <p className="text-gray-500 mt-2">Identify yourself, detective.</p>
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
                            className="w-full bg-noir-900 border border-noir-600 rounded p-3 text-gray-100 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-noir-900 border border-noir-600 rounded p-3 text-gray-100 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-purple hover:bg-purple-600 text-white font-bold py-3 rounded transition-all shadow-[0_0_15px_rgba(176,38,255,0.3)] hover:shadow-[0_0_25px_rgba(176,38,255,0.5)]"
                    >
                        AUTHENTICATE
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    New recruit? <Link to="/register" className="text-neon-blue hover:underline">Register badge here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
