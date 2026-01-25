import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const ProjectsPage: React.FC = () => {
    const {
        projects,
        projectsMeta,
        fetchProjects,
        addProject,
        deleteProject
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<any>({
        title: '',
        region: '',
        timeline: '',
        beneficiaries: '',
        description: '',
        goals: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = `p-${Date.now()}`;
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        await addProject({
            id,
            title: form.title,
            status: 'In Progress',
            region: form.region,
            timeline: form.timeline,
            beneficiaries: form.beneficiaries,
            description: form.description,
            progress: 0,
            goals: form.goals,
            lastUpdated: date,
            completedItems: [],
            missingItems: [],
            currentFunding: 0,
            targetFunding: 0,
            purpose: form.description,
            duration: form.timeline,
            field: 'Health'
        });

        setIsModalOpen(false);
        setForm({ title: '', region: '', timeline: '', beneficiaries: '', description: '', goals: [] });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Project Hub</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Direct Field update control</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all"
                >
                    <Plus size={18} /> Deploy Intelligence
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Mission Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Regional Metadata</th>
                            <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(projects || []).map(p => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">P</div>
                                        <span className="font-black text-slate-900 text-sm leading-tight">{p.title}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.region} • {p.progress}% Status</span>
                                </td>
                                <td className="px-10 py-8 text-right flex items-center justify-end gap-3">
                                    <Link
                                        to={`/dashboard/project/${p.id}`}
                                        className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all inline-flex items-center gap-2"
                                    >
                                        <LinkIcon size={12} /> Update Mission
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to terminate mission: ${p.title}? This action cannot be reversed.`)) {
                                                deleteProject(p.id);
                                            }
                                        }}
                                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                        title="Terminate Mission"
                                    >
                                        <X size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(!projects || projects.length === 0) && (
                            <tr><td colSpan={3} className="px-10 py-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest italic">"No missions deployed in this sector yet."</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={projectsMeta.page}
                    totalPages={projectsMeta.totalPages}
                    onPageChange={(page) => fetchProjects(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Deploy Intelligence</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Field Publication</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Project Title</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Operational Region</label>
                                        <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Strategic Timeline</label>
                                        <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" placeholder="e.g. 6 Months" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Beneficiary Target</label>
                                        <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" placeholder="e.g. 500+ Children" value={form.beneficiaries} onChange={e => setForm({ ...form, beneficiaries: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Narrative Description</label>
                                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-sm" placeholder="Summarize mission objectives..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Strategic Goals</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newGoals = [...(form.goals || []), { id: `g-${Date.now()}`, description: '', isCompleted: false }];
                                                setForm({ ...form, goals: newGoals });
                                            }}
                                            className="text-[10px] font-black uppercase text-blue-600 hover:underline"
                                        >
                                            + Add Goal
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(form.goals || []).map((goal: any, idx: number) => (
                                            <div key={idx} className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Goal description..."
                                                    className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold"
                                                    value={goal.description}
                                                    onChange={(e) => {
                                                        const newGoals = [...form.goals];
                                                        newGoals[idx].description = e.target.value;
                                                        setForm({ ...form, goals: newGoals });
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newGoals = form.goals.filter((_: any, i: number) => i !== idx);
                                                        setForm({ ...form, goals: newGoals });
                                                    }}
                                                    className="p-3 text-red-400 hover:bg-red-50 rounded-xl"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        {(!form.goals || form.goals.length === 0) && (
                                            <p className="text-[10px] text-slate-400 italic">No goals added yet. Progress will start at 0%.</p>
                                        )}
                                    </div>
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
