import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROGRAMS } from '../constants';
import { ArrowLeft, CheckCircle2, Share2, Calendar, MapPin } from 'lucide-react';

export const ProgramDetails = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const program = PROGRAMS.find(p => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Program Not Found</h2>
        <p className="text-slate-500 mb-8">The program you're looking for doesn't exist or has been moved.</p>
        <Link to="/programs" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
          Back to Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl">
            <button 
              onClick={() => navigate(-1)}
              className="mb-8 inline-flex items-center gap-2 text-white/80 hover:text-white font-black text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} /> Back to Exploration
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase">{program.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-white/80 font-bold uppercase tracking-widest text-[10px]">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> Central Africa Region</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-green-400" /> Active Mission 2024-2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mission Overview</h2>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                {program.description} Our approach is rooted in survivor-led methodologies, ensuring that those directly impacted by conflict and poverty are the primary architects of their own recovery and development.
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Strategic Objectives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-tight mb-1">{detail}</h4>
                      <p className="text-xs text-slate-500 font-medium">Standardized field implementation following international humanitarian protocols.</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-900 text-white p-12 rounded-[3rem] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Share2 size={120} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Get Involved with this Mission</h3>
              <p className="text-blue-100 font-medium">Your support directly funds the {program.title}, providing essential resources to women and children in need. Join us in making a tangible difference.</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/donate" className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-green-900/20">
                  Donate to {program.id}
                </Link>
                <Link to="/get-involved" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 font-black uppercase tracking-widest transition-all">
                  Volunteer
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Quick Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-400">Impact Level</span>
                  <span className="text-xs font-black text-slate-900">High / Strategic</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-400">Focus Group</span>
                  <span className="text-xs font-black text-slate-900">Women & Children</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">Regional Coverage</span>
                  <span className="text-xs font-black text-slate-900">6 Countries</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-4">Other Programs</h4>
              <div className="space-y-4">
                {PROGRAMS.filter(p => p.id !== programId).slice(0, 3).map(p => (
                  <Link key={p.id} to={`/programs/${p.id}`} className="block group">
                    <div className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{p.title}</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Explore Mission</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
