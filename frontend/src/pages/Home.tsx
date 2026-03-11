import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Heart, Users, ShieldCheck, Activity,
  GraduationCap, ChevronLeft, MapPin, Mail, Phone,
  Leaf, Globe, TrendingUp, BookOpen, HandHelping, Share2,
  Calendar, ArrowRight, Sparkles, Star
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';
import { useData } from '../context/DataContext';
import { getImageUrl } from '../constants';
import { SUCCESS_STORIES } from '../constants/stories';

import heroImg1 from '../assets/home/image1.jpeg';
import heroImg2 from '../assets/home/image2.jpeg';
import heroImg3 from '../assets/home/image3.jpeg';

import eduImg from '../assets/programs/education.jpeg';
import healthcareImg from '../assets/programs/women.jpeg';
import skillsImg from '../assets/programs/rights.jpeg';
import storyIntroImg from '../assets/others/IMG_6412.jpg';
import impactBg from '../assets/others/IMG_6730.jpg';


const HERO_SLIDES = [
  {
    image: heroImg2,
    title: "Empowering Through Education",
    subtitle: "Building brighter futures by providing quality education and learning resources to children in underserved communities across Central Africa.",
    accent: "Education"
  },
  {
    image: heroImg3,
    title: "Healthcare for Every Mother",
    subtitle: "Ensuring safe delivery and postnatal care for women in conflict zones through our dedicated mobile health clinics.",
    accent: "Healthcare"
  },
  {
    image: heroImg1,
    title: " SURVIVOR-LED TRANSFORMATIVE Resilience",
    subtitle: "Turning pain into purpose. Our organization is led by survivors, for survivors, creating a legacy of resilience.",
    accent: "Resilience"
  }
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { news } = useData();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const latestNews = (news || []).slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      <SEO
        title="Empowering Women and Children in Central Africa"
        description="A.P.D.F.E is a survivor-led organization dedicated to empowering women and children through education, healthcare, and skills development in conflict-affected regions."
      />

      {/* ── Hero Slideshow ─────────────────────────────────────────────── */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div key={currentSlide} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <Heart size={12} className="text-red-400" /> Making a difference since 2019
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {slideContent(HERO_SLIDES[currentSlide])}
            </h1>
            <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 rounded-full text-sm font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                Make a Donation <ChevronRight size={16} />
              </Link>
              <Link to="/about" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md border border-white/30 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 md:left-8 z-20 p-2 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 md:right-8 z-20 p-2 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-10 flex gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-green-400' : 'w-2 bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:-mt-16 relative z-10 max-w-6xl mx-auto rounded-xl shadow-2xl px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Lives Impacted", value: "65,000+", icon: Heart, color: "text-red-500" },
          { label: "Active Programs", value: "6", icon: Activity, color: "text-blue-500" },
          { label: "Volunteers", value: "500+", icon: Users, color: "text-green-500" },
          { label: "Countries Reached", value: "4", icon: ShieldCheck, color: "text-amber-500" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="text-center group">
              <div className="flex justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                <Icon className={stat.color} size={32} />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* ── About Overview ────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">About A.P.D.F.E</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Survivor-led. Community-driven. Transformative.</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Founded in 2019 in Bangui, Central African Republic, by two survivors of conflict and violence, APDFE empowers women and children across the most fragile regions of Central Africa — through healthcare, education, economic empowerment, child protection, and peace-building.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {['Survivor-Centered', 'Dignity & Respect', 'Community-Led', 'Do No Harm'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                  {item}
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative order-1 lg:order-2">
            <LazyImage
              src={storyIntroImg}
              alt="APDFE Field Work"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              containerClassName="rounded-3xl shadow-2xl w-full h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
              <div className="text-4xl font-extrabold text-blue-600 mb-1">2019</div>
              <div className="text-sm font-bold text-slate-500 uppercase">Founded in Bangui, CAR</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs Preview ──────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Programs</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Six Pillars of Transformation</h2>
              <p className="text-slate-600">Holistic, survivor-centered interventions addressing the root causes of poverty, conflict, and exclusion across Central Africa.</p>
            </div>
            <Link to="/programs" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Education Initiative", desc: "Providing quality education and learning resources to children and adults in underserved communities.", icon: <GraduationCap size={24} />, color: "bg-blue-100 text-blue-600", img: eduImg },
              { title: "Women's Health", desc: "Bringing essential maternal and reproductive health services through mobile clinics and health centers.", icon: <Activity size={24} />, color: "bg-green-100 text-green-600", img: healthcareImg },
              { title: "Economic Empowerment", desc: "Vocational training and cooperative models that give survivors financial independence and dignity.", icon: <Users size={24} />, color: "bg-amber-100 text-amber-600", img: skillsImg }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="h-64 overflow-hidden relative">
                  <LazyImage src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" containerClassName="w-full h-full" />
                  <div className={`absolute top-4 left-4 p-3 rounded-full ${card.color} z-10`}>{card.icon}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{card.desc}</p>
                  <Link to="/programs" className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-4 transition-all">
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Numbers ────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <LazyImage src={impactBg} alt="Impact" className="w-full h-full object-cover" containerClassName="w-full h-full" />
          <div className="absolute inset-0 bg-blue-950/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20 mb-5">
              <TrendingUp size={14} /> Measurable Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Our Impact in Numbers</h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg font-light">
              Real change, measured in lives rebuilt, communities strengthened, and futures secured.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16">
            {[
              { val: "65,000+", lab: "Lives Directly Reached", icon: <Heart size={28} className="text-red-400" /> },
              { val: "4", lab: "Countries of Operation", icon: <Globe size={28} className="text-blue-400" /> },
              { val: "120+", lab: "Communities Served", icon: <MapPin size={28} className="text-green-400" /> },
              { val: "65%", lab: "Women & Girls Reached", icon: <Star size={28} className="text-amber-400" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">{stat.val}</div>
                <div className="text-sm uppercase tracking-widest text-blue-300 font-semibold">{stat.lab}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/impact" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-900 font-black rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all">
              See Full Impact Data <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Real Stories ──────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Stories of Change</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Real Stories, Real Impact</h2>
          <p className="text-slate-600">From the field — transformation told by the people who lived it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {SUCCESS_STORIES.slice(0, 4).map((story, idx) => (
            <Link to={`/story/${story.id}`} key={idx} className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-slate-900 block">
              <LazyImage
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                containerClassName="w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-md mb-3">{story.tag}</span>
                <h3 className="text-2xl font-bold text-white leading-tight">{story.title}</h3>
                <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">{story.shortText}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/impact" className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
            View All Stories <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Latest Publications ───────────────────────────────────────── */}
      {latestNews.length > 0 && (
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Publications</span>
                <h2 className="text-4xl font-bold text-slate-900">Latest News & Updates</h2>
              </div>
              <Link to="/publication" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold transition-all shadow-sm hover:shadow-md text-sm">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((item) => (
                <Link to={`/publication/news/${item.id}`} key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col border border-slate-100">
                  <div className="h-52 overflow-hidden">
                    <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black mb-3 uppercase tracking-widest">
                      <Calendar size={12} className="text-blue-500" /> {item.date}
                    </div>
                    <span className="inline-block text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-3 self-start">{item.category}</span>
                    <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug flex-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Voices</span>
            <h2 className="text-4xl font-bold text-slate-900">Hear From Our Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The support from A.P.D.F.E changed my life. I was able to finish my education and start my own business. I am forever grateful.", author: "Sarah M.", role: "Program Beneficiary", img: "https://picsum.photos/seed/sarah/100/100" },
              { text: "Volunteering with this team has been the most rewarding experience of my life. The impact is visible and immediate.", author: "David K.", role: "Volunteer", img: "https://picsum.photos/seed/david/100/100" },
              { text: "Transparency and dedication define this organization. I trust them completely to make the most of my donations.", author: "Emily R.", role: "Regular Donor", img: "https://picsum.photos/seed/emily/100/100" }
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get Involved CTA ──────────────────────────────────────────── */}
      <section className="bg-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/20 mb-5">
              <Sparkles size={14} /> Take Action
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Get Involved Today</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
              You don't need to be a survivor to create change. Every act of solidarity matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <HandHelping size={40} className="text-blue-400" />, title: "Volunteer", desc: "Share your skills and time with communities that need your expertise.", action: "Volunteer Now", href: "/get-involved" },
              { icon: <Heart size={40} className="text-red-400" />, title: "Donate", desc: "Your financial support directly funds programs that transform lives.", action: "Make a Donation", href: "/donate" },
              { icon: <Share2 size={40} className="text-green-400" />, title: "Spread the Word", desc: "Help us reach more hearts by sharing our story on social media.", action: "Learn How", href: "/get-involved" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:bg-white/10 transition-all group">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{item.desc}</p>
                <Link to={item.href} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white hover:text-slate-900 text-white rounded-full font-bold text-sm transition-all">
                  {item.action} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/get-involved" className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-full shadow-xl hover:-translate-y-1 hover:shadow-blue-500/30 transition-all">
              Join Our Global Community <ChevronRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Strip ─────────────────────────────────────────────── */}
      <section className="bg-blue-600 py-16">
        <div className=" mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Have Questions? Reach Out.</h3>
              <p className="text-blue-100 font-medium">We're here for mission support, strategic partnerships, or urgent inquiries.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <a href="mailto:apdfe19@gmail.com" className="flex items-center gap-3 text-white font-bold hover:text-blue-100 transition-colors">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"><Mail size={20} /></div>
                apdfe19@gmail.com
              </a>
              <a href="tel:+250788219724" className="flex items-center gap-3 text-white font-bold hover:text-blue-100 transition-colors">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"><Phone size={20} /></div>
                +250 788 219 724 / +236 74 89 66 50
              </a>
              <div className="flex items-center gap-3 text-white font-bold">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"><MapPin size={20} /></div>
                Kigali · Goma · Bangui · Brazzaville
              </div>
            </div>

            <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-black rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Send a Message <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to handle rich text in titles
const slideContent = (slide: typeof HERO_SLIDES[0]) => {
  const parts = slide.title.split(slide.accent);
  return (
    <>
      {parts[0]}
      <span className="text-green-400">{slide.accent}</span>
      {parts[1]}
    </>
  );
};
