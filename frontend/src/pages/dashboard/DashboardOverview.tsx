import React, { useState, useEffect } from 'react';
import {
    Users,
    Heart,
    Wallet,
    Target,
    TrendingUp,
    Zap,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';

export const DashboardOverview: React.FC = () => {
    const {
        donations,
        expenses,
        projects,
        volunteers,
        getAggregates
    } = useData();

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getAggregates();
            setStats(data);
        };
        fetchStats();
    }, [donations, expenses, projects, volunteers, getAggregates]);

    if (!stats) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Field Command</h1>
                    <p className="text-slate-400 mt-2 font-black uppercase tracking-widest text-[10px]">Strategic resource visualization</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Regional Intake", value: `$${stats.totalRevenue.toLocaleString()}`, icon: <Wallet className="text-blue-600" /> },
                    { label: "Community", value: stats.volunteerCount, icon: <Users className="text-green-600" /> },
                    { label: "Active Missions", value: stats.projectCount, icon: <Target className="text-amber-600" /> },
                    { label: "Beneficiaries", value: stats.activeBeneficiaries, icon: <Heart className="text-red-600" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                        <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">{stat.icon}</div>
                        <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-black mb-10 flex items-center gap-3"><TrendingUp className="text-blue-600" /> Resource Flow</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.revenueHistory}>
                                <defs>
                                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <h3 className="text-xl font-black mb-8 relative z-10 flex items-center gap-3"><Zap size={20} className="text-amber-400" /> Mission Health</h3>
                    <div className="space-y-10 relative z-10">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Readiness Index</span>
                                <span className="text-lg font-black text-blue-400">88%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[88%]"></div>
                            </div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Stability index</span>
                                <span className="text-lg font-black text-green-400">95%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[95%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
