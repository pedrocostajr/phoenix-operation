import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CrmProvider } from './context/CrmContext';
import PainelOperacao from './components/PainelOperacao';
import LoginPage from './pages/LoginPage';
import CrmLayout from './pages/crm/CrmLayout';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Carregando...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <PainelOperacao />
                        </ProtectedRoute>
                    } />
                    <Route path="/crm/*" element={
                        <ProtectedRoute>
                            <CrmProvider>
                                <CrmLayout />
                            </CrmProvider>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
