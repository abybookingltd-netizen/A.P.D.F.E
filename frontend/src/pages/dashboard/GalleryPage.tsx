import React, { useState, useRef } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Pagination } from '../../components/dashboard/Pagination';
import { getImageUrl } from '../../constants';

export const GalleryPage: React.FC = () => {
    const {
        gallery,
        galleryMeta,
        fetchGallery,
        addImage,
        deleteImage
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<any>({
        title: '',
        subtitle: '',
        img: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, img: reader.result as string, file: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const id = `g-${Date.now()}`;
            await addImage({
                id,
                title: form.title,
                subtitle: form.subtitle,
                img: form.img || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop',
                file: form.file // Pass the file object
            } as any);
            setIsModalOpen(false);
            setForm({ title: '', subtitle: '', img: '' });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (deletingId) return;
        setDeletingId(id);
        try {
            await deleteImage(id);
        } catch (error) {
            console.error(error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Gallery Hub</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Visual testimony & Field imagery</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-xl transition-all"
                >
                    <Plus size={18} /> Add Visual Testimony
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(gallery || []).map((item) => (
                    <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            
                            <img src={getImageUrl(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    disabled={deletingId === item.id}
                                    className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deletingId === item.id ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <X size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="p-8">
                            {/* Removed redundant getImageUrl call that was printing null */}
                            <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">{item.title}</h3>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
                {(!gallery || gallery.length === 0) && (
                    <div className="md:col-span-2 lg:col-span-3 py-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest bg-white rounded-[3rem] border-2 border-dashed border-slate-100 italic">
                        "No field imagery has been published yet."
                    </div>
                )}
            </div>

            <div className="mt-12 bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                <Pagination
                    currentPage={galleryMeta.page}
                    totalPages={galleryMeta.totalPages}
                    onPageChange={(page) => fetchGallery(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add Visual Testimony</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Authorized Field Publication</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-6">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Image Title</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Image Subtitle / Category</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest block">Visual Identity</label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        <button type="button" onClick={() => uploadInputRef.current?.click()} className="px-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all flex-grow justify-center">
                                            <Upload size={16} /> Upload Local Image
                                        </button>
                                        <input type="file" ref={uploadInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        <span className="text-[10px] font-black text-slate-300 uppercase">OR</span>
                                        <input type="text" className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold outline-none flex-grow" placeholder="External URL" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} />
                                    </div>
                                    {form.img && (
                                        <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-100">
                                            <img src={form.img} className="w-full h-full object-cover" />
                                        </div>
                                    )}
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
                                ) : 'Publish to Gallery'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
