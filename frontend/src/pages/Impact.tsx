import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { IMPACT_DATA, TIMELINE_EVENTS } from '../constants';
import { TrendingUp, MapPin, Users, Heart, Star, FileText, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Impact = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504159506876-f8338247a14a?q=80&w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&h=600&fit=crop"
  ];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const stats = [
    { label: "Beneficiaries", value: "68,000+", icon: <Users size={24} /> },
    { label: "Countries", value: "4", icon: <MapPin size={24} /> },
    { label: "Communities", value: "142", icon: <TrendingUp size={24} /> },
    { label: "% Survivor-Led", value: "100%", icon: <Heart size={24} /> },
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <SEO
        title="Our Impact"
        description="See the measurable transformation A.P.D.F.E has achieved across Central Africa. With 68,000+ beneficiaries and 100% survivor-led action, we are creating sustainable change."
      />
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300 p-4 md:p-10"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={40} />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-all hover:scale-110 z-[110]"
            onClick={prevImage}
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center pointer-events-none">
            <img
              src={galleryImages[lightboxIndex].replace('h=600&', 'h=1200&').replace('w=600&', 'w=1600&')}
              alt="Field Work Enlarged"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-500 pointer-events-auto"
            />
            <div className="absolute bottom-[-50px] left-0 w-full text-center text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">
              Image {lightboxIndex + 1} of {galleryImages.length}
            </div>
          </div>

          <button
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-all hover:scale-110 z-[110]"
            onClick={nextImage}
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>
        </div>
      )}

      <section className="bg-slate-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-6 tracking-tight">Impact & Transformation</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Evidence-based growth and survivor-led change across Central Africa.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-24">
        <div className="max-w-7xl mx-auto px-4 -mt-32 mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center border border-slate-100 group hover:-translate-y-2 transition-all">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black mb-8 text-slate-900 tracking-tight flex items-center gap-3">
              <TrendingUp className="text-blue-600" /> Beneficiary Growth
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={IMPACT_DATA}>
                  <defs>
                    <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#003399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="beneficiaries" stroke="#003399" strokeWidth={3} fillOpacity={1} fill="url(#colorBen)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black mb-8 text-slate-900 tracking-tight flex items-center gap-3">
              <MapPin className="text-green-600" /> Community Outreach
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={IMPACT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="communities" fill="#00AA44" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-24 max-w-7xl mx-auto px-4 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Success Stories</h2>
          <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real lives transformed by survivor-led action</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Marie's Journey",
              location: "Eastern DRC",
              text: "After losing everything to conflict, Marie found hope through our economic empowerment program. She now runs a successful local cooperative.",
              img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&fit=crop"
            },
            {
              name: "Jean's Education",
              location: "CAR",
              text: "A former child soldier, Jean is now back in school and excelling in his studies through our rehabilitation and scholarship program.",
              img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&fit=crop"
            },
            {
              name: "Healing Together",
              location: "Rwanda",
              text: "A group of 20 survivors formed a community healing circle that now supports over 200 women in their district.",
              img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&fit=crop"
            }
          ].map((story, i) => (
            <div key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl transition-all">
              <div className="h-64 overflow-hidden">
                <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">
                  <Star size={14} /> {story.location}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{story.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{story.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Annual Reports Section */}
      <section id="reports" className="py-24 bg-slate-900 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">Annual Reports</h2>
            <p className="mt-4 text-blue-400 font-bold uppercase tracking-widest text-[10px]">Transparency and operational excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['2024 Annual Impact', '2023 Field Audit', '2022 Strategic Review', '2021 Growth Phase'].map((report, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <FileText size={40} className="text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-6 tracking-tight">{report}</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">Download PDF</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Photo Gallery</h2>
          <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Visual records of our field operations</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="aspect-square rounded-3xl overflow-hidden group relative border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={url}
                alt="Field Work"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <ImageIcon size={32} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
