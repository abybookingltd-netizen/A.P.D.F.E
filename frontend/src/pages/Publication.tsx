import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon, Briefcase, FileText, CheckCircle, Search, Sparkles, Clock, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getImageUrl } from '../constants';

export const Publication = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { news, projects, gallery } = useData();

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGallery = gallery.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} className="text-blue-400" /> Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Publications</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            News, visual media, and detailed regional project tracking.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-[68px] z-40 bg-white border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search news, projects, or images..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* News Section */}
        <section id="news" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-end justify-between mb-12 border-l-4 border-blue-600 pl-6">
            <div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Updates</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Latest News</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col border border-slate-100 relative">
                <div className="h-64 relative overflow-hidden">
                  <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black mb-4 uppercase tracking-widest">
                    <Calendar size={14} className="text-blue-500" /> {item.date}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">{item.excerpt}</p>
                  <Link 
                    to={`/publication/news/${item.id}`}
                    className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Images Section */}
        <section id="images" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-end justify-between mb-12 border-l-4 border-green-600 pl-6">
            <div>
              <span className="text-xs font-black text-green-600 uppercase tracking-widest block mb-2">Visual Media</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Gallery & Field Images</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((img) => (
              <div key={img.id} className="aspect-square rounded-3xl overflow-hidden group relative border border-slate-100">
                <img src={getImageUrl(img.img)} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-black text-sm mb-1 uppercase tracking-tight">{img.title}</h4>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ongoing Projects Section */}
        <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-end justify-between mb-12 border-l-4 border-amber-500 pl-6">
            <div>
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-2">Operations</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ongoing Projects</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 p-10 md:p-14 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse"><Clock size={14} /> In Progress</span>
                      <span className="bg-slate-50 text-slate-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-100"><MapPin size={14} /> {project.region}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{project.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-lg">{project.description}</p>
                    <Link 
                      to={`/publication/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mt-4"
                    >
                      Read Full Details <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="lg:col-span-4 flex flex-col items-center gap-8 border-l border-slate-100 pl-8">
                    <div className="w-full text-center">
                      <div className="text-4xl font-black text-blue-600 mb-2">{project.progress}%</div>
                      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                        <div style={{ width: `${project.progress}%` }} className="h-full bg-blue-600 rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all">
                      <FileText size={18} /> Detailed Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
