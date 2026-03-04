import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
            <SEO
                title="Page Not Found - A.P.D.F.E"
                description="The page you are looking for does not exist."
            />

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

            <div className="text-center relative z-10 max-w-xl animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600 rotate-12">
                    <HelpCircle size={48} className="-rotate-12" />
                </div>

                <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4">404</h1>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Page Not Found</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-space-900 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
                >
                    <ArrowLeft size={20} /> Return to Homepage
                </Link>
            </div>
        </div>
    );
};
