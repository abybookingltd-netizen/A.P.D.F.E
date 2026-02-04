import { UserPlus, X, User as UserIcon, Trash2, Edit2 } from 'lucide-react';
import HelperService from '../../services/HelperService';
import { Pagination } from '../../components/dashboard/Pagination';
import type { User } from '../../types';
import { useCallback, useEffect, useState } from 'react';

export const HelpersPage: React.FC = () => {
    const [helpers, setHelpers] = useState<User[]>([]);
    const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
    const [isLoading, setIsLoading] = useState(false);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', email: '', isValidated: false });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch Helpers
    const fetchHelpers = useCallback(async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await HelperService.getAll(page);
            console.warn(response);
            if (response.success) {
                setHelpers(response.data);
                setMeta({
                    page: response.page,
                    totalPages: response.totalPages,
                    total: response.total
                });
            }
        } catch (error) {
            console.error('Failed to fetch helpers', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHelpers();
    }, [fetchHelpers]);

    // Handle Submit (Create/Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            if (isEditMode && currentId) {
                await HelperService.update(currentId, form);
            } else {
                await HelperService.create(form);
            }
            setIsModalOpen(false);
            resetForm();
            fetchHelpers(meta.page);
        } catch (error) {
            console.error('Operation failed', error);
            // Ideally show toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (deletingId) return;

        if (window.confirm('Are you sure you want to delete this helper?')) {
            setDeletingId(id);
            try {
                await HelperService.delete(id);
                fetchHelpers(meta.page);
            } catch (error) {
                console.error('Delete failed', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const openCreateModal = () => {
        resetForm();
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setForm({
            name: user.name,
            email: user.email,
            isValidated: user.isValidated || false
        });
        setCurrentId(user.id);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setForm({ name: '', email: '', isValidated: false });
        setCurrentId(null);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Helper Register</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Field Agent Management</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 shadow-xl transition-all"
                >
                    <UserPlus size={18} /> Add New Helper
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Helper Identity</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact Email</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold">Loading records...</td></tr>
                            ) : helpers.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold">No helpers found.</td></tr>
                            ) : (
                                helpers.map(h => (
                                    <tr key={h.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                                    {h.profilePicture ?
                                                        <img src={h.profilePicture} className="w-full h-full object-cover rounded-2xl" alt={h.name} /> :
                                                        <UserIcon size={20} />
                                                    }
                                                </div>
                                                <span className="font-black text-slate-900 text-sm leading-tight">{h.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-sm text-slate-400 font-bold">{h.email}</td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${h.isValidated ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {h.isValidated ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEditModal(h)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(h.id)}
                                                    disabled={deletingId === h.id}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete"
                                                >
                                                    {deletingId === h.id ? <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" /> : <Trash2 size={16} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={meta.page}
                    totalPages={meta.totalPages}
                    onPageChange={(page) => fetchHelpers(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-12 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{isEditMode ? 'Update Helper' : 'Provision Helper'}</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Field Credentials Management</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg focus:border-blue-500 transition-colors"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg focus:border-blue-500 transition-colors"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Account Status</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, isValidated: true })}
                                        className={`flex-1 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border-2 ${form.isValidated ? 'border-green-600 bg-green-50 text-green-600 shadow-lg shadow-green-500/10' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        Active / Verified
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, isValidated: false })}
                                        className={`flex-1 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border-2 ${!form.isValidated ? 'border-amber-500 bg-amber-50 text-amber-600 shadow-lg shadow-amber-500/10' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        Pending
                                    </button>
                                </div>
                            </div>

                            {!isEditMode && (
                                <div className="bg-blue-50 p-6 rounded-2xl text-blue-700 text-xs font-bold">
                                    <p>Note: A secure password will be automatically generated and sent to the provided email address.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-6 bg-slate-900 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (isEditMode ? 'Update Credentials' : 'Create & Send Invitation')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
