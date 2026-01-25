import { Link } from 'react-router-dom';
import { PROGRAMS } from '../constants';
import { CheckCircle2, ArrowRight, Heart, Users, Shield, Leaf, GraduationCap, Scale } from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

const PROGRAM_ICONS = {
  health: <Heart size={48} className="text-red-500" />,
  empowerment: <Users size={48} className="text-blue-500" />,
  protection: <Shield size={48} className="text-amber-500" />,
  environment: <Leaf size={48} className="text-green-500" />,
  education: <GraduationCap size={48} className="text-indigo-500" />,
  peace: <Scale size={48} className="text-slate-500" />,
};

const PROGRAM_IDS = ['health', 'empowerment', 'protection', 'environment', 'education', 'peace'];

export const Programs = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <SEO
        title="Our Programs"
        description="Discover A.P.D.F.E's strategic pillars including healthcare, women empowerment, protection, environmental sustainability, education, and peace building in Central Africa."
      />
      <section id="programs-hero" className="bg-slate-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Our Programs</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Holistic, survivor-led interventions across Central Africa.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">Strategic Pillars</h2>
          <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-32">
          {PROGRAMS.map((program, idx) => (
            <div key={program.id} id={PROGRAM_IDS[idx]} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px] relative bg-slate-100">
                  <LazyImage
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <div className="absolute bottom-10 left-10 flex items-center gap-4">
                    <div className="p-4 bg-white/20 backdrop-blur-md border border-white/20 rounded-3xl">
                      {PROGRAM_ICONS[PROGRAM_IDS[idx] as keyof typeof PROGRAM_ICONS]}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">{program.title}</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Program Area {idx + 1}</div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{program.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {program.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                      <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/programs/${program.id}`}
                  className="flex items-center gap-3 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all"
                >
                  Read More <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact summary section */}
      <section className="bg-slate-900 py-24 text-white rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "50,000+", lab: "Lives Impacted" },
              { val: "4", lab: "Countries" },
              { val: "65%", lab: "Women Reached" },
              { val: "120+", lab: "Communities" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter text-blue-500">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">{stat.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
