import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('detective_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const res = await api.post('/auth/login', { username, password });
        if (res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('detective_user', JSON.stringify(res.data.user));
        }
        return res.data;
    };

    const register = async (username, password) => {
        const res = await api.post('/auth/register', { username, password });
        return res.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('detective_user');
    };

    const refreshUser = (xp) => {
        // Update XP locally
        if (user) {
            const updated = { ...user, xp: user.xp + xp };
            setUser(updated);
            localStorage.setItem('detective_user', JSON.stringify(updated));
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, refreshUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
