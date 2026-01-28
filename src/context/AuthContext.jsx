import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded Admin
    const ADMIN_USER = {
        id: 'admin-001',
        name: 'Administrador',
        email: 'contato@leadsign.com.br',
        role: 'admin',
        avatar: null
    };

    const ADMIN_PASS = 'Phoenix120126#';

    useEffect(() => {
        // Load users from localStorage
        const storedUsers = localStorage.getItem('phoenix_users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }

        // Check for active session
        const session = localStorage.getItem('phoenix_session');
        if (session) {
            setUser(JSON.parse(session));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // 1. Check Admin
        if (email === ADMIN_USER.email && password === ADMIN_PASS) {
            const adminSession = { ...ADMIN_USER };
            setUser(adminSession);
            localStorage.setItem('phoenix_session', JSON.stringify(adminSession));
            return { success: true };
        }

        // 2. Check Registered Users
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const userSession = { ...foundUser }; // Exclude password ideally
            setUser(userSession);
            localStorage.setItem('phoenix_session', JSON.stringify(userSession));
            return { success: true };
        }

        return { success: false, message: 'Credenciais inválidas' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('phoenix_session');
    };

    const registerUser = (newUser) => {
        const userWithId = { ...newUser, id: uuidv4(), role: 'user' };
        const updatedUsers = [...users, userWithId];
        setUsers(updatedUsers);
        localStorage.setItem('phoenix_users', JSON.stringify(updatedUsers));
        return userWithId;
    };

    const deleteUser = (userId) => {
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('phoenix_users', JSON.stringify(updatedUsers));
    }

    return (
        <AuthContext.Provider value={{ user, users, login, logout, registerUser, deleteUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
