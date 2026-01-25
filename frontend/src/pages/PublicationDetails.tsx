import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, ArrowLeft, MapPin, Share2, Clock, CheckCircle } from 'lucide-react';

export const PublicationDetails = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { news, projects } = useData();

  const item = type === 'news' 
    ? news.find(n => n.id === id) 
    : projects.find(p => p.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Content Not Found</h2>
          <button onClick={() => navigate('/publication')} className="text-blue-600 font-bold uppercase tracking-widest text-xs">Back to Publications</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen">
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={'image' in item ? item.image : 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'} 
          className="w-full h-full object-cover" 
          alt={item.title} 
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-4xl text-center">
            <button onClick={() => navigate(-1)} className="mb-8 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">
              <ArrowLeft size={16} /> Back to Hub
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase leading-tight">{item.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-white/80 font-bold uppercase tracking-widest text-[10px]">
              {'date' in item && <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-400" /> {item.date}</span>}
              {'region' in item && <span className="flex items-center gap-2"><MapPin size={14} className="text-green-400" /> {item.region}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-12">
          <section className="prose prose-slate lg:prose-xl">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Overview</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              {'excerpt' in item ? item.excerpt : item.description}
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              This initiative represents A.P.D.F.E's ongoing commitment to sustainable development and community empowerment in Central Africa. Through rigorous field operations and stakeholder engagement, we continue to drive measurable change for women and children in the region.
            </p>
          </section>

          {'progress' in item && (
            <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Project Momentum</h3>
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black">{item.progress}% Complete</span>
              </div>
              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                <div style={{ width: `${item.progress}%` }} className="h-full bg-blue-600 transition-all duration-1000"></div>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">On Schedule</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-500" size={20} />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Active Phase</span>
                </div>
              </div>
            </section>
          )}

          <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
            <button className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest">
              <Share2 size={18} /> Share Update
            </button>
            <Link to="/contact" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
              Request Full Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
