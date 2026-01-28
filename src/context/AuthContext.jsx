import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // List of ALL profiles for team dropdowns
    const [loading, setLoading] = useState(true);

    const ADMIN_EMAIL = 'contato@leadsign.com.br';

    useEffect(() => {
        // 1. Get Session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // Fetch profile to get role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                setUser({ ...session.user, ...profile });
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        getSession();

        // 2. Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser({ ...session.user, ...profile });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // 3. Fetch All Team Members (for dropdowns)
        const fetchTeam = async () => {
            const { data } = await supabase.from('profiles').select('*');
            if (data) setUsers(data);
        };
        fetchTeam();

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) return { success: false, message: error.message };
        return { success: true };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // NOTE: Creating users programmatically usually requires Admin API (Service Role)
    // For this client-side demo, we just rely on normal SignUp or invite manually via Dashboard.
    // Ideally, "registerUser" would call a Supabase Edge Function.
    // For now, we simulate a success message but tell user to invite via Dashboard.
    const registerUser = async (newUser) => {
        // Warning: Sign Up here logs the current user out if we blindly use signUp() client side!
        // Proper way: Use Admin API in an Edge Function.
        return { success: false, message: 'Adicione usuários via painel do Supabase > Authentication.' };
    };

    const deleteUser = async (userId) => {
        // Requires Admin API
        return { success: false, message: 'Remova usuários via painel do Supabase.' };
    };

    return (
        <AuthContext.Provider value={{ user, users, login, logout, registerUser, deleteUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
