import React, { useState } from 'react';
import { Plus, X, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const EventsPage: React.FC = () => {
    const {
        events,
        eventsMeta,
        fetchEvents,
        addEvent
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<any>({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        type: 'Mission'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const id = `ev-${Date.now()}`;
            await addEvent({
                id,
                ...form
            });
            setIsModalOpen(false);
            setForm({ title: '', date: '', startTime: '', endTime: '', location: '', description: '', type: 'Mission' });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mission Events</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Briefings, Webinars & Community gatherings</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all"
                >
                    <Plus size={18} /> Schedule New Event
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp & Location</th>
                            <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(events || []).map(ev => (
                            <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">EV</div>
                                        <div>
                                            <span className="font-black text-slate-900 text-sm block leading-tight">{ev.title}</span>
                                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{ev.type}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">{ev.date} • {ev.startTime} - {ev.endTime}</div>
                                    <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase"><MapPin size={10} /> {ev.location}</div>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Edit Entry</button>
                                </td>
                            </tr>
                        ))}
                        {(!events || events.length === 0) && (
                            <tr><td colSpan={3} className="px-10 py-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest">No scheduled mission events</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={eventsMeta.page}
                    totalPages={eventsMeta.totalPages}
                    onPageChange={(page) => fetchEvents(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Schedule Mission Event</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Field Publication</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Event Title</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Date</label>
                                        <input required type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Location</label>
                                        <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" placeholder="Location details" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Start Time</label>
                                        <input required type="time" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">End Time</label>
                                        <input required type="time" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Mission Description</label>
                                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-sm" placeholder="Detailed briefing..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Publishing...</span>
                                    </>
                                ) : 'Publish to Network'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
