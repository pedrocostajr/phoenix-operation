import React from 'react';
import { X, Calendar, User, Mail, Phone, DollarSign } from 'lucide-react';

const LeadDetailsModal = ({ lead, onClose }) => {
    if (!lead) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-2xl font-bold text-white">{lead.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Contato</h3>

                            <div className="flex items-center gap-3 text-slate-300">
                                <User className="text-blue-500" size={20} />
                                <span>{lead.contactName || 'Sem nome'}</span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <Mail className="text-blue-500" size={20} />
                                <span>{lead.email || 'Sem email'}</span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <Phone className="text-blue-500" size={20} />
                                <span>{lead.phone || 'Sem telefone'}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Detalhes</h3>

                            <div className="flex items-center gap-3 text-slate-300">
                                <DollarSign className="text-green-500" size={20} />
                                <span className="text-xl font-bold text-green-400">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value || 0)}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <Calendar className="text-purple-500" size={20} />
                                <span>Criado em {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Descrição</h3>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-slate-300 min-h-[100px]">
                            {lead.description || 'Nenhuma descrição informada.'}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-700 bg-slate-900 rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        Fechar
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadDetailsModal;
