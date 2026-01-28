import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROGRAMS } from '../constants/programs'; // ← your elaborated data file
import {
  ArrowLeft,
  CheckCircle2,
  Share2,
  Calendar,
  MapPin,
  Users,
  Heart,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

export const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();

  const program = PROGRAMS.find((p) => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Program Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">
          The program you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/programs"
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
        >
          ← Back to All Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <SEO
        title={`${program.title} | A.P.D.F.E Programs`}
        description={program.shortDescription}
      />

      {/* Hero / Banner */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <LazyImage
          src={program.image}
          alt={`${program.title} in action`}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-5xl">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 md:mb-10 inline-flex items-center gap-2 text-white/90 hover:text-white font-black text-sm uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={18} /> Back to Programs
            </button>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-none uppercase drop-shadow-2xl">
              {program.title}
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              {program.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400" /> Central Africa
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-green-400" /> Ongoing Mission
              </span>
              <span className="flex items-center gap-2">
                <Users size={16} className="text-amber-400" /> Women & Children Focus
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Main Content (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-16">
            {/* Full Description */}
            <section className="prose prose-lg max-w-none text-slate-700">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-8">
                Program Overview
              </h2>
              <div className="text-lg leading-relaxed space-y-6">
                {program.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Highlights / Key Activities */}
            {program.highlights.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Key Activities & Approaches
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {program.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                    >
                      <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={24} />
                      <span className="text-base font-semibold text-slate-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sub-Programs / Components */}
            {program.subPrograms.length > 0 && (
              <section className="space-y-10">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Core Components
                </h2>
                <div className="space-y-10">
                  {program.subPrograms.map((sub, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-2xl font-black text-blue-700 mb-4 flex items-center gap-3">
                        <Heart size={28} className="text-red-400" />
                        {sub.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Banner */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 opacity-10">
                <Heart size={240} />
              </div>
              <div className="relative z-10 max-w-3xl">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                  Support This Life-Changing Work
                </h3>
                <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
                  Your contribution directly funds mobile clinics, training sessions, learning materials, safe spaces, and economic start-up kits — helping women, children, and communities rebuild with dignity.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/donate"
                    className="px-10 py-5 bg-white text-blue-700 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg"
                  >
                    Donate Now
                  </Link>
                  <Link
                    to="/get-involved"
                    className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Volunteer or Partner
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (1/3 width on desktop) */}
          <div className="space-y-12 lg:sticky lg:top-8 lg:self-start">
            {/* Quick Stats */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-600 pb-4 border-b border-slate-100">
                Quick Facts
              </h4>
              <div className="space-y-5 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Primary Focus</span>
                  <span className="font-semibold text-slate-900">Women & Children</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Geographic Reach</span>
                  <span className="font-semibold text-slate-900">Central Africa</span>
                </div>
                {program.stats?.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-none">
                    <span className="text-slate-500 font-medium">{stat.label}</span>
                    <span className="font-black text-blue-600">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Programs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">
                Explore Other Programs
              </h4>
              <div className="space-y-5">
                {PROGRAMS.filter((p) => p.id !== programId)
                  .slice(0, 3)
                  .map((p) => (
                    <Link
                      key={p.id}
                      to={`/programs/${p.id}`}
                      className="group block p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                          <LazyImage
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h5 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                            {p.title}
                          </h5>
                          <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">
                            Learn More →
                          </p>
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