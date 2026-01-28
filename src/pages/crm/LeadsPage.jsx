import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Search, Filter, Phone, Mail, Calendar, User, DollarSign, ChevronDown } from 'lucide-react';

const LeadsPage = () => {
    const { leads, addLead } = useCrm();
    const { users } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [newLead, setNewLead] = useState({
        name: '',
        email: '',
        phone: '',
        value: '',
        status: 'new',
        assignedTo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addLead(newLead);
        setNewLead({ name: '', email: '', phone: '', value: '', status: 'new', assignedTo: '' });
        setIsFormOpen(false);
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            negotiation: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
            won: 'bg-green-500/10 text-green-400 border-green-500/20',
            lost: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        const labels = {
            new: 'Novo Lead',
            contacted: 'Em Contato',
            negotiation: 'Negociação',
            won: 'Venda Realizada',
            lost: 'Perdido'
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.new}`}>
                {labels[status] || status}
            </span>
        );
    };

    const getResponsibleName = (id) => {
        const user = users.find(u => u.id === id);
        return user ? user.name : 'Não atribuído';
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Leads</h1>
                    <p className="text-slate-400">Visualize e gerencie todos os seus contatos comerciais.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 font-medium"
                >
                    <Plus size={20} />
                    <span>Novo Lead</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3.5 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Modals Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Cadastrar Novo Lead</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Nome do Cliente</label>
                                    <input
                                        type="text"
                                        required
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                        placeholder="Ex: Pedro Costa"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Email</label>
                                    <input
                                        type="email"
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                        placeholder="cliente@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Telefone / WhatsApp</label>
                                    <input
                                        type="text"
                                        value={newLead.phone}
                                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Valor Estimado</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-500">R$</span>
                                        <input
                                            type="number"
                                            value={newLead.value}
                                            onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-white focus:border-blue-500 outline-none"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Responsável</label>
                                    <select
                                        value={newLead.assignedTo}
                                        onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none appearance-none"
                                    >
                                        <option value="">Selecione um vendedor...</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Fase do Funil</label>
                                    <select
                                        value={newLead.status}
                                        onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none appearance-none"
                                    >
                                        <option value="new">Novos Leads</option>
                                        <option value="contacted">Em Contato</option>
                                        <option value="negotiation">Negociação</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25"
                                >
                                    Confirmar Cadastro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Leads Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Lead / Cliente</th>
                                <th className="p-4 font-medium">Contato</th>
                                <th className="p-4 font-medium">Valor</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Responsável</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{lead.name}</p>
                                                <p className="text-xs text-slate-500">Cadastrado há 2 dias</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <Mail size={14} className="text-slate-500" />
                                                {lead.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <Phone size={14} className="text-slate-500" />
                                                {lead.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-white font-medium">
                                            {lead.value ? `R$ ${parseFloat(lead.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={lead.status} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                                                {getResponsibleName(lead.assignedTo).charAt(0)}
                                            </div>
                                            <span className="text-sm text-slate-400">{getResponsibleName(lead.assignedTo)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colspan="5" className="p-8 text-center text-slate-500">
                                        Nenhum lead encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadsPage;
