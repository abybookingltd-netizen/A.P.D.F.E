import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { IMPACT_DATA } from '../constants';
import { SUCCESS_STORIES } from '../constants/stories';
import { TrendingUp, MapPin, Users, Heart, Star, FileText, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';
import { HeaderBanner } from '../components/HeaderBanner';

// Using IMG_6913.jpg for impact
import bgImpact from '../assets/others/IMG_6913.jpg';

import img6561 from '../assets/others/IMG_6561.jpg';
import img6563 from '../assets/others/IMG_6563.jpg';
import img6680 from '../assets/others/IMG_6680.jpg';
import img6683 from '../assets/others/IMG_6683.jpg';
import img6723 from '../assets/others/IMG_6723.jpg';
import img6725 from '../assets/others/IMG_6725.jpg';
import img6730 from '../assets/others/IMG_6730.jpg';
import img6740 from '../assets/others/IMG_6740.jpg';
import img6748 from '../assets/others/IMG_6748.jpg';
import img6898 from '../assets/others/IMG_6898.jpg';
import img6913 from '../assets/others/IMG_6913.jpg';
import img6919 from '../assets/others/IMG_6919.jpg';
import img6924 from '../assets/others/IMG_6924.jpg';
import img7044 from '../assets/others/IMG_7044.jpg';
import img7051 from '../assets/others/IMG_7051.jpg';
import img7055 from '../assets/others/IMG_7055.jpg';
import img7060 from '../assets/others/IMG_7060.jpg';
import img7067 from '../assets/others/IMG_7067.jpg';
import img70602 from '../assets/others/IMG_70602.jpeg';

export const Impact = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    img6561,
    img6563,
    img6680,
    img6683,
    img6723,
    img6725,
    img6730,
    img6740,
    img6748,
    img6898,
    img6913,
    img6919,
    img6924,
    img7044,
    img7051,
    img7055,
    img7060,
    img7067,
    img70602
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
              src={galleryImages[lightboxIndex]}
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

      {/* Hero */}
      <HeaderBanner
        title="Our Impact"
        subtitle="Numbers tell part of the story, but the real impact is measured in the lives rebuilt, policies changed, and communities strengthened."
        bgImage={bgImpact}
        bgOverlay="bg-blue-950/80"
      />

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
          {SUCCESS_STORIES.slice(0, 3).map((story, i) => (
            <Link to={`/story/${story.id}`} key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl transition-all block cursor-pointer">
              <div className="h-64 overflow-hidden">
                <LazyImage
                  src={story.img}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">
                  <Star size={14} /> {story.location}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{story.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">{story.shortText}</p>
              </div>
            </Link>
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
              <LazyImage
                src={url}
                alt="Field Work"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                containerClassName="w-full h-full"
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
