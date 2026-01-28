import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    Trello,
    LogOut,
    Settings,
    ChevronRight,
    Search,
    Bell
} from 'lucide-react';
import PipelinePage from './PipelinePage';
import LeadsPage from './LeadsPage';
import TeamPage from './TeamPage';
import DashboardPage from './DashboardPage';

const CrmLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/crm/dashboard', icon: LayoutDashboard },
        { name: 'Pipeline', path: '/crm', icon: Trello },
        { name: 'Leads', path: '/crm/leads', icon: Users },
        // Only Admin sees Team
        ...(user?.role === 'admin' ? [{ name: 'Equipe', path: '/crm/team', icon: Settings }] : [])
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                <div className="p-6 flex items-center justify-center border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <img src="/assets/phoenix-logo-full.png" alt="Phoenix" className="h-8 object-contain" />
                        <span className="font-bold text-lg tracking-wide hidden">Phoenix</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${active
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <Icon size={20} className={active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} />
                                <span className="font-medium">{item.name}</span>
                                {active && (
                                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-md"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sair do Sistema</span>
                    </button>

                    <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
                {/* Header */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">CRM</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                        </button>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-auto p-8 relative">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none sticky-0">
                        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<PipelinePage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/leads" element={<LeadsPage />} />
                            <Route path="/team" element={<TeamPage />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CrmLayout;
