import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const ExpensesPage: React.FC = () => {
    const {
        expenses,
        expensesMeta,
        fetchExpenses,
        donations,
        addExpense,
        getAggregates
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<any>({
        amount: '',
        description: '',
        category: 'Field Projects',
        recipient: ''
    });

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getAggregates();
            setStats(data);
        };
        fetchStats();
    }, [expenses, donations, getAggregates]);

    const unifiedLedger = (expenses || [])
        .map(e => ({ ...e, type: 'Expense', name: e.description || 'Project Support', source: e.category || 'Field' }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = `f-${Date.now()}`;
        const date = new Date().toISOString().split('T')[0];
        await addExpense({
            id,
            category: form.category as any,
            amount: parseFloat(form.amount),
            date,
            description: form.description,
            recipient: form.recipient || 'Regional Vendor',
            status: 'Cleared'
        });
        setIsModalOpen(false);
        setForm({ amount: '', description: '', category: 'Field Projects', recipient: '' });
    };

    if (!stats) return <div className="animate-pulse h-96 bg-white rounded-[3rem]"></div>;

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Expense Ledger</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Authorized Cloud Financial Oversight</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all"
                >
                    <Plus size={18} /> Log Outflow
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Operational Assets</p>
                    <p className="text-5xl font-black text-slate-900">${(stats.totalRevenue - stats.totalExpenses).toLocaleString()}</p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cumulative Burn</p>
                    <p className="text-5xl font-black text-red-500">${stats.totalExpenses.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Purpose</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-sm">
                        {unifiedLedger.map((item: any, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-10 py-8 text-xs text-slate-400">{item.date}</td>
                                <td className="px-10 py-8">
                                    <div className="font-black text-slate-900 leading-tight">{item.name}</div>
                                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mt-1">{item.recipient}</div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] uppercase font-black tracking-widest">{item.source}</span>
                                </td>
                                <td className="px-10 py-8 text-right font-black text-lg text-red-500">
                                    -${item.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={expensesMeta.page}
                    totalPages={expensesMeta.totalPages}
                    onPageChange={(page) => fetchExpenses(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Log Outflow</h3>
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
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Recipient Entity</label>
                                        <input required type="text" className="w-full px-7 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl" placeholder="Recipient" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Category</label>
                                    <select className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                        <option value="Field Projects">Field Projects</option>
                                        <option value="Administrative">Administrative</option>
                                        <option value="Emergency Relief">Emergency Relief</option>
                                        <option value="Community Support">Community Support</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Strategic Mission Purpose</label>
                                    <input required type="text" className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-sm" placeholder="Purpose details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95">Commit Transaction to Cloud</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
