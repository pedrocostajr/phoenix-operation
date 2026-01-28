import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Trash2, Shield, Mail, Lock, User } from 'lucide-react';

const TeamPage = () => {
    const { users, registerUser, deleteUser, user: currentUser } = useAuth();
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (currentUser?.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                <Shield size={48} className="mb-4 text-slate-600" />
                <h2 className="text-xl font-bold text-white mb-2">Acesso Restrito</h2>
                <p>Apenas administradores podem gerenciar a equipe.</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(newUser);
        setNewUser({ name: '', email: '', password: '' });
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestão de Equipe</h1>
                    <p className="text-slate-400">Gerencie os membros do time comercial e seus acessos.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 font-medium"
                >
                    <UserPlus size={20} />
                    <span>Novo Membro</span>
                </button>
            </div>

            {/* Add User Form */}
            {isFormOpen && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                        Adicionar Novo Usuário
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-slate-600" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Ex: João Silva"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Email Corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-600" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="joao@leadsign.com.br"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Senha Provisória</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-600" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Definir senha"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-5 py-2.5 text-slate-400 hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-md font-medium"
                            >
                                Salvar Usuário
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Users List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Admin Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-blue-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg text-lg">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{currentUser.name}</h3>
                                <p className="text-sm text-slate-400">{currentUser.email}</p>
                            </div>
                            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                Admin
                            </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <Shield size={12} />
                            Acesso Total
                        </div>
                    </div>
                </div>

                {users.map((user) => (
                    <div key={user.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-slate-700 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-lg group-hover:bg-slate-700 transition-colors">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-white">{user.name}</h3>
                                    <p className="text-sm text-slate-400">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Remover usuário"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                <User size={12} />
                                Vendedor
                            </div>
                        </div>
                    </div>
                ))}

                {users.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                        <UserPlus size={48} className="mb-4 opacity-50" />
                        <p>Nenhum membro na equipe ainda.</p>
                        <button onClick={() => setIsFormOpen(true)} className="text-blue-400 hover:underline mt-2">
                            Adicionar o primeiro
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPage;
