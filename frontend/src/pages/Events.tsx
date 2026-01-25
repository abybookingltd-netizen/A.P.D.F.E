
import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Events = () => {
  const { events } = useData();

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={12} className="text-green-400" /> Mission Gatherings & Briefings
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none">Field Events</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Direct engagement with our regional operations, community dialogues, and strategic fundraisers."
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-12">
          {events.length > 0 ? events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
               <div className="grid grid-cols-1 md:grid-cols-12">
                 <div className="md:col-span-4 bg-slate-900 text-white p-12 flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">{ev.type}</span>
                    <div className="text-4xl font-black mb-1">{new Date(ev.date).getDate()}</div>
                    <div className="text-lg font-black uppercase tracking-widest opacity-60">{new Date(ev.date).toLocaleString('default', { month: 'long' })}</div>
                    <div className="mt-8 pt-8 border-t border-white/10 w-full space-y-2">
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <Clock size={14} className="text-blue-500" /> {ev.startTime} - {ev.endTime}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <MapPin size={14} className="text-green-500" /> {ev.location}
                      </div>
                    </div>
                 </div>
                 <div className="md:col-span-8 p-12 md:p-16 flex flex-col justify-center">
                   <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">{ev.title}</h3>
                   <p className="text-slate-500 leading-relaxed font-medium mb-10 text-lg">
                     {ev.description}
                   </p>
                   <button className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all">
                     Reserve Access <ArrowRight size={20} className="text-blue-600" />
                   </button>
                 </div>
               </div>
            </div>
          )) : (
            <div className="py-40 text-center space-y-8 animate-in zoom-in duration-500">
               <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
                 <Calendar size={48} />
               </div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tight">No Active Schedules</h3>
               <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">We are currently evaluating next phases of regional field gatherings. Check back for official dispatch.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
