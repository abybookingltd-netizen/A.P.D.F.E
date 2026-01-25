import React, { useState, useRef } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';
import { getImageUrl } from '../../constants';

export const NewsPage: React.FC = () => {
    const {
        news,
        newsMeta,
        fetchNews,
        addNews,
        deleteNews
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<any>({
        title: '',
        category: '',
        excerpt: '',
        image: ''
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image: reader.result as string, file: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = `n-${Date.now()}`;
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        await addNews({
            id,
            title: form.title,
            date,
            category: form.category || 'Regional Update',
            excerpt: form.excerpt,
            image: form.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
            file: form.file // Pass the file object
        } as any);
        setIsModalOpen(false);
        setForm({ title: '', category: '', excerpt: '', image: '' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">News Hub</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Field update & Regional publication control</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all"
                >
                    <Plus size={18} /> Publish Intelligence
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Publication Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Regional Metadata</th>
                            <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(news || []).map(n => (
                            <tr key={n.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">N</div>
                                        <span className="font-black text-slate-900 text-sm leading-tight">{n.title}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{n.category} • {n.date}</span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <button onClick={() => deleteNews(n.id)} className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline">Delete Entry</button>
                                </td>
                            </tr>
                        ))}
                        {(!news || news.length === 0) && (
                            <tr><td colSpan={3} className="px-10 py-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest italic">"No regional updates published yet."</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={newsMeta.page}
                    totalPages={newsMeta.totalPages}
                    onPageChange={(page) => fetchNews(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Publish Intelligence</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Field Publication</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">News Title</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Category</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" placeholder="e.g. Regional Update" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest block">Featured Image</label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        <button type="button" onClick={() => uploadInputRef.current?.click()} className="px-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all flex-grow justify-center">
                                            <Upload size={16} /> Upload Local Image
                                        </button>
                                        <input type="file" ref={uploadInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        <span className="text-[10px] font-black text-slate-300 uppercase">OR</span>
                                        <input type="text" className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold outline-none flex-grow" placeholder="External URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                                    </div>
                                    {form.image && (
                                        <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-100">
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Narrative Excerpt</label>
                                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-sm" placeholder="Summary for the field wire..." value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">Publish to Network</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
