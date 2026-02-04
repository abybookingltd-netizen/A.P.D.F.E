import { HandHelping, Trash2, Check, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';
import { useState } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';

export const VolunteersPage: React.FC = () => {
    const {
        volunteers,
        volunteersMeta,
        isLoading,
        fetchVolunteers,
        deleteVolunteer,
        approveVolunteer
    } = useData();

    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isApproving, setIsApproving] = useState<string | null>(null);

    if (isLoading) {
        return <LoadingScreen />;
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this volunteer?')) return;
        setIsDeleting(id);
        try {
            await deleteVolunteer(id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(null);
        }
    };

    const handleApprove = async (id: string) => {
        setIsApproving(id);
        try {
            await approveVolunteer(id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsApproving(null);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Community Registry</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Global Volunteers & Field Supporters</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Volunteer Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact Info</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Interests</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {(volunteers || []).length > 0 ? (volunteers || []).map(v => (
                            <tr key={v.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center font-black">V</div>
                                        <span className="font-black text-slate-900 text-sm leading-tight">{v.firstName} {v.lastName}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-sm text-slate-400 font-bold">{v.email}</td>
                                <td className="px-10 py-8">
                                    <div className="flex flex-wrap gap-2">
                                        {(() => {
                                            const interestsRaw = v.interests as any;
                                            let interestsList: string[] = [];

                                            if (Array.isArray(interestsRaw)) {
                                                interestsList = interestsRaw;
                                            } else if (typeof interestsRaw === 'string') {
                                                try {
                                                    const parsed = JSON.parse(interestsRaw);
                                                    if (Array.isArray(parsed)) interestsList = parsed;
                                                } catch (e) {
                                                    // console.error("Failed to parse interests:", e);
                                                    interestsList = [];
                                                }
                                            }

                                            return interestsList.map((int, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded">{int}</span>
                                            ));
                                        })()}
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {!v.isApproved && (
                                            <button
                                                onClick={() => handleApprove(v.id)}
                                                disabled={isApproving === v.id}
                                                className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50"
                                                title="Approve Volunteer"
                                            >
                                                {isApproving === v.id ? <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin" /> : <Check size={18} />}
                                            </button>
                                        )}
                                        {v.isApproved && (
                                            <span className="px-4 py-2 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-xl border border-green-100 items-center flex gap-2">
                                                <Check size={14} /> Approved
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleDelete(v.id)}
                                            disabled={isDeleting === v.id}
                                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                                            title="Remove Volunteer"
                                        >
                                            {isDeleting === v.id ? <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" /> : <Trash2 size={18} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-10 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4 text-slate-400">
                                        <HandHelping size={48} />
                                        <p className="font-black text-xs uppercase tracking-widest">No field volunteers registered yet</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={volunteersMeta.page}
                    totalPages={volunteersMeta.totalPages}
                    onPageChange={(page) => fetchVolunteers(page)}
                />
            </div>
        </div>
    );
};
