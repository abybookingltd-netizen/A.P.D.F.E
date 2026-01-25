import React, { useState } from 'react';
import { UserPlus, X, Sparkles, User as UserIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const StaffPage: React.FC = () => {
    const {
        helpers,
        helpersMeta,
        fetchHelpers
    } = useData();
    const { currentUser, registerStaff } = useAuth();

    const isRootAdmin = currentUser?.email === 'kennytohne@gmail.com';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'helper' as 'admin' | 'helper', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerStaff(form.name, form.email, form.role, form.password);
        setIsModalOpen(false);
        setForm({ name: '', email: '', role: 'helper', password: '' });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Personnel Directory</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Access Authorization Ledger</p>
                </div>
                {isRootAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 shadow-xl transition-all"
                    >
                        <UserPlus size={18} /> Provision Staff
                    </button>
                )}
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Personnel Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Access</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Authorization Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(helpers || []).map(h => (
                            <tr key={h.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                            {h.profilePicture ? <img src={h.profilePicture} className="w-full h-full object-cover rounded-2xl" /> : <UserIcon size={20} />}
                                        </div>
                                        <span className="font-black text-slate-900 text-sm leading-tight">{h.name} {h.email === 'kennytohne@gmail.com' && <Sparkles size={12} className="text-blue-500 inline ml-1" />}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-sm text-slate-400 font-bold">{h.email}</td>
                                <td className="px-10 py-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${h.role === 'admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-600'}`}>
                                        {h.role === 'admin' ? 'Regional Lead' : 'Field Helper'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={helpersMeta.page}
                    totalPages={helpersMeta.totalPages}
                    onPageChange={(page) => fetchHelpers(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-12 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Provision Personnel</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Assign Regional Hub Authorization</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Personnel Name</label>
                                <input required type="text" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">A.P.D.F.E Identity Email</label>
                                <input required type="email" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Initial Access Password</label>
                                <input required type="password" placeholder="••••••••" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Clearance Authorization Level</label>
                                <div className="flex gap-4">
                                    {['helper', 'admin'].map(r => (
                                        <button key={r} type="button" onClick={() => setForm({ ...form, role: r as any })} className={`flex-1 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border-2 ${form.role === r ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-500/10' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                                            {r === 'admin' ? 'Regional Lead' : 'Field Helper'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all">Publish Personnel Record</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
