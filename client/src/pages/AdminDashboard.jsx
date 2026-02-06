import { useState } from 'react';
import api from '../lib/api';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle, Database, ArrowLeft } from 'lucide-react';
import CyberButton from '../components/common/CyberButton';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        difficulty: 'Easy',
        xp_reward: 100,
        description: '',
        starting_code: '',
        expected_output: '',
        hint_1: '',
        hint_2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const res = await api.post('/cases', formData);
            setMessage(res.data.message);
            setFormData({
                title: '',
                category: '',
                difficulty: 'Easy',
                xp_reward: 100,
                description: '',
                starting_code: '',
                expected_output: '',
                hint_1: '',
                hint_2: ''
            });
        } catch (err) {
            setError(err.error || "System failure: Unable to archive case file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 font-mono text-sm group"
            >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                RETURN TO HQ
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-noir-800/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8"
            >
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                    <Database className="text-neon-cyan" />
                    <div>
                        <h1 className="text-3xl font-display font-bold">CASE ARCHIVE MANAGER</h1>
                        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">ADMINISTRATIVE ACCESS ONLY</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">CASE TITLE</label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
                                placeholder="The Mystery of..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">CATEGORY</label>
                            <input
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
                                placeholder="Variables, Loops, etc."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">DIFFICULTY</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">XP REWARD</label>
                            <input
                                type="number"
                                name="xp_reward"
                                value={formData.xp_reward}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400">CASE BRIEFING (MARKDOWN SUPPORTED)</label>
                        <textarea
                            required
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors resize-none font-sans"
                            placeholder="Describe the crime scene..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">STARTING CODE (CORRUPTED SCRIPT)</label>
                            <textarea
                                required
                                name="starting_code"
                                rows={6}
                                value={formData.starting_code}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-neon-cyan font-mono text-sm focus:border-neon-cyan outline-none transition-colors resize-none"
                                placeholder="# Fix the logic below..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">EXPECTED OUTPUT</label>
                            <textarea
                                required
                                name="expected_output"
                                rows={6}
                                value={formData.expected_output}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-neon-green font-mono text-sm focus:border-neon-green outline-none transition-colors resize-none"
                                placeholder="Exact string output to match..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">INVESTIGATION HINT 1 (OPTIONAL)</label>
                            <input
                                name="hint_1"
                                value={formData.hint_1}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400">INVESTIGATION HINT 2 (OPTIONAL)</label>
                            <input
                                name="hint_2"
                                value={formData.hint_2}
                                onChange={handleChange}
                                className="w-full bg-noir-900 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-mono animate-shake">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    {message && (
                        <div className="flex items-center gap-2 p-4 bg-neon-green/10 border border-neon-green/20 text-neon-green rounded-lg text-sm font-mono">
                            <CheckCircle size={18} /> {message}
                        </div>
                    )}

                    <CyberButton
                        type="submit"
                        variant="primary"
                        icon={Save}
                        className="w-full"
                        isLoading={loading}
                        disabled={loading}
                    >
                        ARCHIVE CASE FILE
                    </CyberButton>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
