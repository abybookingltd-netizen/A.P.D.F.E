import React from 'react';
import { HandHelping } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';

export const VolunteersPage: React.FC = () => {
    const {
        volunteers,
        volunteersMeta,
        fetchVolunteers
    } = useData();

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
                                        {v.interests.map((int, i) => (
                                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded">{int}</span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="px-10 py-20 text-center">
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
