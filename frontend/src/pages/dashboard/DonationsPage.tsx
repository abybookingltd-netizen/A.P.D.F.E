import React, { useState, useEffect } from 'react';
import { Plus, Wallet, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const DonationsPage: React.FC = () => {
    const {
        donations,
        donationsMeta,
        fetchDonations,
        expenses,
        addDonation,
        getAggregates
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<any>({
        amount: '',
        name: '',
        source: 'Individual'
    });

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getAggregates();
            setStats(data);
        };
        fetchStats();
    }, [donations, expenses, getAggregates]);

    const unifiedLedger = (donations || [])
        .map(d => ({ ...d, type: 'Income', name: d.name, source: d.source || 'Direct Contribution' }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const id = `d-${Date.now()}`;
            const date = new Date().toISOString().split('T')[0];
            await addDonation({
                id,
                name: form.name,
                amount: parseFloat(form.amount),
                date,
                source: form.source || 'Direct Contribution',
                status: 'Cleared'
            });
            setIsModalOpen(false);
            setForm({ amount: '', name: '', source: 'Individual' });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    // ...
    // Inside the form return
    <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-6 bg-green-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isSubmitting ? 'Processing...' : 'Commit Transaction to Cloud'}
    </button>

    if (!stats) return <div className="animate-pulse h-96 bg-white rounded-[3rem]"></div>;

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Donation Intake</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Authorized Cloud Financial Oversight</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-green-700 shadow-xl transition-all"
                >
                    <Plus size={18} /> Log Intake
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Operational Assets</p>
                        <p className="text-5xl font-black text-slate-900">${(stats.totalRevenue - stats.totalExpenses).toLocaleString()}</p>
                    </div>
                    <div className="absolute top-0 right-0 p-8 text-blue-50 group-hover:text-blue-100 transition-colors">
                        <Wallet size={80} strokeWidth={1} />
                    </div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cumulative Intake</p>
                    <p className="text-5xl font-black text-green-600">${stats.totalRevenue.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Donor Entity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Source</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-sm">
                        {unifiedLedger.map((item: any, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-10 py-8 text-xs text-slate-400">{item.date}</td>
                                <td className="px-10 py-8">
                                    <div className="font-black text-slate-900 leading-tight">{item.name}</div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] uppercase font-black tracking-widest">{item.source}</span>
                                </td>
                                <td className="px-10 py-8 text-right font-black text-lg text-green-600">
                                    +${item.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={donationsMeta.page}
                    totalPages={donationsMeta.totalPages}
                    onPageChange={(page) => fetchDonations(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Log Intake</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Resource Commit</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <div className="p-12">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Amount Identity ($)</label>
                                        <input required type="number" step="0.01" className="w-full px-7 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-4xl focus:ring-4 focus:ring-blue-500/10" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Donor Entity</label>
                                        <input required type="text" className="w-full px-7 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl" placeholder="Identity" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Source</label>
                                    <select className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-sm" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
                                        <option value="Individual">Individual</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Grant">Grant</option>
                                        <option value="Recurring">Recurring</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-green-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : 'Commit Transaction to Cloud'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
