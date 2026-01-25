import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface DashboardHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isCollapsed, setIsCollapsed }) => {
    return (
        <header className="bg-white border-b border-slate-200 py-4 px-10 flex justify-between items-center sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors hidden md:block"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">APDFE Cloud Interface V4.0</div>
            </div>
            <Link to="/" className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all">Public Portal</Link>
        </header>
    );
};
