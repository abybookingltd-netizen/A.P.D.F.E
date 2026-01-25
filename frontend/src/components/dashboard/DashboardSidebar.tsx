import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Users,
    LayoutDashboard,
    FileText,
    Calendar,
    Wallet,
    ShieldCheck,
    User as UserIcon,
    LogOut,
    Globe,
    Sparkles,
    ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardSidebarProps {
    isCollapsed: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = currentUser?.role === 'admin';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard Overview', path: '/dashboard', icon: <LayoutDashboard size={18} />, end: true },
        { name: 'Project Hub', path: '/dashboard/projects', icon: <FileText size={18} /> },
        { name: 'News Hub', path: '/dashboard/news', icon: <Sparkles size={18} /> },
        { name: 'Gallery Hub', path: '/dashboard/gallery', icon: <ImageIcon size={18} /> },
        { name: 'Event Control', path: '/dashboard/events', icon: <Calendar size={18} /> },
        { name: 'Community HQ', path: '/dashboard/volunteers', icon: <Users size={18} /> },
    ];

    const adminItems = [
        { name: 'Donation Intake', path: '/dashboard/donations', icon: <Wallet size={18} /> },
        { name: 'Expense Ledger', path: '/dashboard/finance', icon: <FileText size={18} /> },
        { name: 'Personnel Hub', path: '/dashboard/staff', icon: <ShieldCheck size={18} /> },
    ];

    return (
        <aside className={`bg-slate-900 text-white flex flex-col sticky top-0 h-screen z-50 overflow-y-auto shrink-0 shadow-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-full md:w-20' : 'w-full md:w-72'}`}>
            <div className={`p-8 flex items-center gap-3 border-b border-white/5 transition-all duration-300 ${isCollapsed ? 'justify-center p-6' : ''}`}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <Globe size={20} className="text-white" />
                </div>
                {!isCollapsed && (
                    <div className="animate-in fade-in duration-500 overflow-hidden whitespace-nowrap">
                        <div className="text-xl font-black tracking-tight leading-none">APDFE <span className="text-blue-500">HQ</span></div>
                        <div className="text-[9px] uppercase font-black text-slate-500 mt-1.5 tracking-widest">Global Field Control</div>
                    </div>
                )}
            </div>

            <div className="p-4 md:p-6 space-y-1.5 flex-grow">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) => `w-full flex items-center gap-3 p-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        {item.icon} {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}

                {isAdmin && (
                    <>
                        <div className={`mt-8 mb-2 px-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.25em]">Strategic Access</p>
                        </div>
                        {adminItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `w-full flex items-center gap-3 p-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                {item.icon} {!isCollapsed && <span>{item.name}</span>}
                            </NavLink>
                        ))}
                    </>
                )}
            </div>

            <div className="p-6 mt-auto border-t border-white/5">
                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) => `w-full flex items-center gap-3 p-3.5 mb-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <UserIcon size={18} /> {!isCollapsed && <span>My ID</span>}
                </NavLink>
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 p-3.5 text-red-400 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={18} /> {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};
