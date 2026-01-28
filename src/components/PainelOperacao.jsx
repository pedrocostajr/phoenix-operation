import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Flame, DollarSign, Users, Trello, CreditCard, HardDrive, MessageSquare, Share2, Mail, Calendar, Zap } from 'lucide-react';

const PainelOperacao = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const sistemasOperacao = [
        {
            nome: 'Financeiro',
            url: 'https://app.phoenixrise.com.br/',
            descricao: 'Sistema financeiro completo',
            icon: DollarSign,
            cor: 'from-green-500 to-emerald-600'
        },
        {
            nome: 'CRM Phoenix',
            url: '/crm',
            descricao: 'Gestão de leads e clientes',
            icon: Users,
            cor: 'from-orange-500 to-red-600'
        },
        {
            nome: 'Trello Phoenix',
            url: 'https://phoenix-boards.vercel.app/',
            descricao: 'Gestão de projetos e tarefas',
            icon: Trello,
            cor: 'from-blue-500 to-indigo-600'
        },
        {
            nome: 'Phoenix Pay',
            url: 'https://phoenix-ppay.vercel.app/admin',
            descricao: 'Administração de pagamentos',
            icon: CreditCard,
            cor: 'from-purple-500 to-pink-600'
        }
    ];

    const atalhos = [
        {
            nome: 'Google Drive',
            url: 'https://drive.google.com/',
            descricao: 'Armazenamento em nuvem',
            icon: HardDrive,
            cor: 'bg-yellow-500'
        },
        {
            nome: 'ChatGPT',
            url: 'https://chat.openai.com/',
            descricao: 'Assistente de IA',
            icon: MessageSquare,
            cor: 'bg-green-600'
        },
        {
            nome: 'Gerenciador Meta',
            url: 'https://business.facebook.com/',
            descricao: 'Meta Business Suite',
            icon: Share2,
            cor: 'bg-blue-600'
        },
        {
            nome: 'Gerenciador Google',
            url: 'https://ads.google.com/',
            descricao: 'Google Ads Manager',
            icon: Zap,
            cor: 'bg-red-500'
        },
        {
            nome: 'Asaas',
            url: 'https://www.asaas.com/',
            descricao: 'Plataforma de pagamentos',
            icon: DollarSign,
            cor: 'bg-indigo-600'
        },
        {
            nome: 'Google Meet',
            url: 'https://meet.google.com/',
            descricao: 'Videoconferências',
            icon: Calendar,
            cor: 'bg-teal-600'
        }
    ];

    const todosItens = [
        ...sistemasOperacao.map(s => ({ ...s, categoria: 'Operação' })),
        ...atalhos.map(a => ({ ...a, categoria: 'Atalhos' }))
    ];

    const itensFiltrados = todosItens.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const abrirLink = (url) => {
        if (url.startsWith('/')) {
            navigate(url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
            <div className="max-w-7xl mx-auto p-6">
                <div className="text-center mb-12">
                    <div className="flex flex-col items-center justify-center gap-6 mb-8">
                        <img
                            src="/assets/phoenix-logo-full.png"
                            alt="Phoenix Rise"
                            className="h-24 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                    <p className="text-blue-200/80 text-lg font-light tracking-wide">Central de Comando - Acesso Rápido aos Sistemas</p>
                </div>

                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <input
                            type="text"
                            placeholder="O que você procura hoje?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="relative w-full px-8 py-5 bg-gray-900/90 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg shadow-xl backdrop-blur-xl"
                        />
                    </div>
                </div>

                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8 pl-2">
                        <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Sistemas Globais
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sistemasOperacao.filter(s =>
                            s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((sistema, index) => {
                            const Icon = sistema.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => abrirLink(sistema.url)}
                                    className="group relative bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${sistema.cor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                        <ExternalLink size={18} className="text-gray-400 group-hover:text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${sistema.cor} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon size={28} className="text-white drop-shadow-md" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-blue-400 transition-colors">
                                            {sistema.nome}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{sistema.descricao}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-8 pl-2">
                        <div className="h-8 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Acesso Rápido
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {atalhos.filter(a =>
                            a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            a.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((atalho, index) => {
                            const Icon = atalho.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => abrirLink(atalho.url)}
                                    className="group bg-gray-800/40 border border-gray-700/30 rounded-xl p-5 hover:bg-gray-800/80 hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 flex items-center gap-5"
                                >
                                    <div className={`w-12 h-12 ${atalho.cor} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:ring-2 ring-white/20 transition-all`}>
                                        <Icon size={24} className="text-white" />
                                    </div>

                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-bold text-gray-200 group-hover:text-indigo-300 transition-colors">
                                            {atalho.nome}
                                        </h3>
                                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{atalho.descricao}</p>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                        <ExternalLink size={14} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {searchTerm && itensFiltrados.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-4">
                            <Zap size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{searchTerm}"</p>
                    </div>
                )}

                <div className="mt-20 text-center border-t border-gray-800 pt-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gray-900/50 border border-gray-800">
                        <img src="/assets/phoenix-icon-white.png" alt="Phoenix" className="w-5 h-5 opacity-70" />
                        <span className="text-gray-500 text-sm font-medium tracking-wide">Powered by Phoenix Rise Digital Performance</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PainelOperacao;
