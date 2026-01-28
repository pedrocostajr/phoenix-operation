import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    DollarSign,
    Target,
    Calendar
} from 'lucide-react';

const DashboardPage = () => {
    const { leads } = useCrm();

    // Calculations
    const totalLeads = leads.length;
    const totalValue = leads.reduce((acc, lead) => acc + (Number(lead.value) || 0), 0);
    const wonLeads = leads.filter(l => l.status === 'won');
    const wonValue = wonLeads.reduce((acc, lead) => acc + (Number(lead.value) || 0), 0);
    const conversionRate = totalLeads > 0 ? ((wonLeads.length / totalLeads) * 100).toFixed(1) : 0;

    const leadsByStatus = leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
    }, {});

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const KpiCard = ({ title, value, icon: Icon, color, subtext }) => (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {subtext && <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">{subtext}</span>}
            </div>
            <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
                <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Geral</h1>
                <p className="text-slate-400">Visão estratégica do seu funil de vendas.</p>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Total de Leads"
                    value={totalLeads}
                    icon={Users}
                    color="bg-blue-500"
                />
                <KpiCard
                    title="Valor em Pipeline"
                    value={formatCurrency(totalValue)}
                    icon={DollarSign}
                    color="bg-orange-500"
                />
                <KpiCard
                    title="Vendas Realizadas"
                    value={formatCurrency(wonValue)}
                    icon={TrendingUp}
                    color="bg-green-500"
                />
                <KpiCard
                    title="Taxa de Conversão"
                    value={`${conversionRate}%`}
                    icon={Target}
                    color="bg-purple-500"
                    subtext="Global"
                />
            </div>

            {/* Status Breakdown & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leads by Status */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6">Leads por Etapa</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'new', label: 'Novos Leads', color: 'bg-blue-500' },
                            { id: 'contacted', label: 'Em Contato', color: 'bg-yellow-500' },
                            { id: 'negotiation', label: 'Negociação', color: 'bg-orange-500' },
                            { id: 'won', label: 'Venda Realizada', color: 'bg-green-500' },
                            { id: 'lost', label: 'Perdidos', color: 'bg-red-500' }
                        ].map((stage) => {
                            const count = leadsByStatus[stage.id] || 0;
                            const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;

                            return (
                                <div key={stage.id} className="group">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-300 font-medium">{stage.label}</span>
                                        <div className="flex gap-2">
                                            <span className="text-white font-bold">{count}</span>
                                            <span className="text-slate-500">({percentage.toFixed(0)}%)</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className={`${stage.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity (Placeholder for now) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-400" />
                        Atividades Recentes
                    </h3>
                    <div className="space-y-6">
                        {leads.length > 0 ? (
                            leads.slice(0, 5).map(lead => (
                                <div key={lead.id} className="flex gap-3">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-slate-300">
                                            Novo lead adicionado: <span className="text-white font-medium">{lead.name}</span>
                                        </p>
                                        <span className="text-xs text-slate-500">
                                            {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-sm">Nenhuma atividade registrada.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
