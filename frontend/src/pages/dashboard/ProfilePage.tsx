import React, { useState, useRef } from 'react';
import { Camera, Mail, Save, ShieldCheck, Globe, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { getImageUrl } from '../../constants';

export const ProfilePage: React.FC = () => {
    const { currentUser, updateProfile } = useAuth();
    const { resetDatabase } = useData();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(currentUser?.name || '');
    const [editedEmail, setEditedEmail] = useState(currentUser?.email || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isRootAdmin = currentUser?.email === 'kennytohne@gmail.com';

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProfile({ name: editedName, email: editedEmail });
        setIsEditing(false);
    };

    if (!currentUser) return null;

    return (
        <div className=" animate-in fade-in duration-700">
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-44 bg-slate-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                </div>
                <div className="px-12 pb-16 -mt-24 relative z-10">
                    <div className="flex flex-col md:flex-row items-end gap-10 mb-12">
                        <div className="w-44 h-44 rounded-[2.8rem] bg-white p-2 shadow-2xl relative group overflow-hidden border-2 border-slate-100 flex items-center justify-center">
                            {currentUser.profilePicture ? (
                                <img src={getImageUrl(currentUser.profilePicture)} className="w-full h-full object-cover rounded-[2.5rem]" alt="Profile" />
                            ) : (
                                <div className="w-full h-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-200 font-black text-6xl">
                                    {currentUser.name.charAt(0)}
                                </div>
                            )}
                            <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                                <Camera size={36} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Update Portrait</span>
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => updateProfile({
                                        profilePicture: reader.result as string,
                                        file: file // Pass the file object
                                    } as any);
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </div>
                        <div className="flex-grow pb-6">
                            <div className="flex items-center gap-4 mb-3">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{currentUser.name}</h2>
                                <span className="px-5 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full shadow-lg">{currentUser.role}</span>
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 italic"><Mail size={14} className="text-blue-500" /> {currentUser.email}</p>
                        </div>
                        <button onClick={() => setIsEditing(!isEditing)} className="px-10 py-4 border-2 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all mb-4">
                            {isEditing ? 'Cancel Edit' : 'Modify Record'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Identity Alias</label>
                                    <input required type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl focus:ring-4 focus:ring-blue-500/10" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Secure Communication Channel</label>
                                    <input required type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl focus:ring-4 focus:ring-blue-500/10" />
                                </div>
                            </div>
                            <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-3">
                                <Save size={20} /> Deploy Intelligence Update
                            </button>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] mb-4">Security Clearance</h4>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100"><ShieldCheck size={28} /></div>
                                    <p className="text-sm font-black text-slate-900">Multi-Factor Cloud Verified</p>
                                </div>
                            </div>
                            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] mb-4">Mission Assignment</h4>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100"><Globe size={28} /></div>
                                    <p className="text-sm font-black text-slate-900">Regional Coordination Hub</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isRootAdmin && (
                        <div className="mt-20 pt-16 border-t border-slate-100">
                            <h4 className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em] mb-8">System Maintenance Protocol</h4>
                            <div className="p-12 bg-red-50 rounded-[3.5rem] border border-red-100 space-y-8">
                                <div className="flex items-start gap-5">
                                    <AlertCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                    <div className="space-y-2">
                                        <p className="text-lg font-black text-red-900 leading-tight">Hard Cache Purge Terminal</p>
                                        <p className="text-xs text-red-600 font-bold leading-relaxed uppercase">
                                            Executing this directive will purge all local data syncs and terminate active staff sessions across the regional network.
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => { if (confirm("Executing hard purge?")) resetDatabase(); }} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all">
                                    Execute Terminal Purge
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
