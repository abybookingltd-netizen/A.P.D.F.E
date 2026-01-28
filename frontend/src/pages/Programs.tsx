import { Link } from 'react-router-dom';
import { PROGRAMS } from '../constants/programs'; // ← updated import path
import {
  CheckCircle2,
  ArrowRight,
  Heart,
  Users,
  Shield,
  Leaf,
  BookOpen,
  Handshake,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

// Map string icon names from data → actual Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'heart-pulse': Heart,
  'hand-coin': Users,
  'shield-user': Shield,
  leaf: Leaf,
  'book-open': BookOpen,
  handshake: Handshake,
};

export const Programs = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <SEO
        title="Our Programs"
        description="Discover A.P.D.F.E's survivor-led programs in healthcare, women's & youth economic empowerment, child protection, environmental resilience, education, and peace-building across Central Africa."
      />

      {/* Hero */}
      <section id="programs-hero" className="bg-slate-900 py-24 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/60 z-0" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Our Programs</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
            Holistic, survivor-centered, and community-driven interventions transforming lives across Central Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">
            Strategic Program Pillars
          </h2>
          <div className="h-1.5 w-28 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Six interconnected programs addressing the root causes and consequences of conflict, poverty, and exclusion.
          </p>
        </div>

        <div className="space-y-24 md:space-y-40">
          {PROGRAMS.map((program, idx) => {
            const IconComponent = ICON_MAP[program.icon] || Heart; // fallback
            const isEven = idx % 2 === 0;

            return (
              <div
                key={program.id}
                id={program.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center group scroll-mt-24"
              >
                {/* Image Column */}
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[3.5rem] overflow-hidden shadow-2xl h-[480px] md:h-[560px] relative bg-slate-100 border border-slate-200">
                    <LazyImage
                      src={program.image}
                      alt={`${program.title} - A.P.D.F.E`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent z-10 pointer-events-none" />

                    {/* Floating icon + title overlay */}
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4 z-20">
                      <div className="p-5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl">
                        <IconComponent size={56} className="text-white drop-shadow-lg" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight drop-shadow-2xl">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div className="space-y-8 md:space-y-10">
                  <div className="inline-block px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-black uppercase tracking-widest border border-blue-200">
                    Program Area {idx + 1}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    {program.title}
                  </h3>

                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                    {program.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {program.highlights.slice(0,4).map((highlight, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
                      >
                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-base font-semibold text-slate-800">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/programs/${program.id}`}
                    className="inline-flex items-center gap-3 text-blue-700 font-black text-base uppercase tracking-widest hover:gap-5 transition-all duration-300 hover:text-blue-800 group"
                    aria-label={`Learn more about ${program.title}`}
                  >
                    Read Full Program Details
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Summary */}
      <section className="bg-slate-900 py-24 md:py-32 text-white rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 to-slate-950/60 z-0" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">
            Collective Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center">
            {[
              { val: "50,000+", lab: "Lives Directly Impacted" },
              { val: "4", lab: "Countries of Operation" },
              { val: "65%", lab: "Women & Girls Reached" },
              { val: "120+", lab: "Communities Served" },
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <div className="text-5xl md:text-7xl font-black tracking-tighter text-blue-400">
                  {stat.val}
                </div>
                <div className="text-base md:text-lg uppercase tracking-wider text-slate-400 font-semibold">
                  {stat.lab}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};