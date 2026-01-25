import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/apdfe-logo.png"
                            alt="Logo"
                            className="w-10 h-10 object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">A.P.D.F.E</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">Loading Resources...</span>
                </div>
            </div>
        </div>
    );
};
