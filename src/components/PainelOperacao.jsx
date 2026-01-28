import React, { useState } from 'react';
import { ExternalLink, Flame, DollarSign, Users, Trello, CreditCard, HardDrive, MessageSquare, Share2, Mail, Calendar, Zap } from 'lucide-react';

const PainelOperacao = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
            url: 'https://phoenix-lead-hub.vercel.app/',
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
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div className="max-w-7xl mx-auto p-6">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Flame className="text-orange-500" size={60} />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                            Operação Phoenix
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">Central de Comando - Acesso Rápido aos Sistemas</p>
                </div>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Buscar sistema ou atalho..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                </div>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-600 rounded"></div>
                        <h2 className="text-2xl font-bold">Sistemas de Operação</h2>
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
                                    className="group relative bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${sistema.cor} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>

                                    <div className="relative">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${sistema.cor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <Icon size={32} className="text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                                            {sistema.nome}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">{sistema.descricao}</p>

                                        <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                                            <span>Acessar</span>
                                            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                        <h2 className="text-2xl font-bold">Atalhos Rápidos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {atalhos.filter(a =>
                            a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            a.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((atalho, index) => {
                            const Icon = atalho.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => abrirLink(atalho.url)}
                                    className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 flex items-start gap-4"
                                >
                                    <div className={`w-12 h-12 ${atalho.cor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon size={24} className="text-white" />
                                    </div>

                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">
                                            {atalho.nome}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{atalho.descricao}</p>
                                    </div>

                                    <ExternalLink size={18} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {searchTerm && itensFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{searchTerm}"</p>
                    </div>
                )}

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg">
                        <Flame className="text-orange-500" size={20} />
                        <span className="text-gray-400">Powered by Phoenix Rise</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PainelOperacao;
