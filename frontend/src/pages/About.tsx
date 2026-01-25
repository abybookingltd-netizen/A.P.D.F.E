import React, { useState } from 'react';
import { Shield, Heart, Users, CheckCircle, Mail, Phone, MapPin, Globe, X, Linkedin, Twitter } from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

const TEAM_MEMBERS = [
  { id: 'amina', name: 'Amina N.', role: 'Programs Director', location: 'Rwanda', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&fit=crop', bio: 'Amina has over 12 years of experience in humanitarian program management across East and Central Africa.' },
  { id: 'john', name: 'John K.', role: 'Field Coordinator', location: 'Kenya', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', bio: 'John specializes in rapid response and field logistics in conflict-affected regions.' },
  { id: 'grace', name: 'Grace M.', role: 'MHPSS Lead', location: 'Uganda', image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=200&h=200&fit=crop', bio: 'Grace is a clinical psychologist focused on trauma healing and community resilience.' },
  { id: 'pierre', name: 'Pierre L.', role: 'Logistics Manager', location: 'DRC', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', bio: 'Pierre manages complex supply chains across the Great Lakes region.' },
  { id: 'marie', name: 'Marie T.', role: 'Safe Spaces Coord.', location: 'Central African Rep.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', bio: 'Marie advocates for the protection of women and girls in internal displacement camps.' },
  { id: 'emmanuel', name: 'Emmanuel B.', role: 'Finance Officer', location: 'Republic of Congo', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', bio: 'Emmanuel ensures financial transparency and accountability for all regional projects.' },
  { id: 'chantal', name: 'Chantal R.', role: 'Health Program Lead', location: 'Cameroon', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop', bio: 'Chantal oversees mobile health clinics and maternal care initiatives.' },
  { id: 'samuel', name: 'Samuel O.', role: 'Monitoring Officer', location: 'Tanzania', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop', bio: 'Samuel tracks project impact and beneficiary data across the region.' },
  { id: 'fatou', name: 'Fatou S.', role: 'Communications', location: 'Senegal', image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&h=200&fit=crop', bio: 'Fatou manages regional storytelling and international advocacy campaigns.' },
  { id: 'kwame', name: 'Kwame A.', role: 'M&E Specialist', location: 'Ghana', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop', bio: 'Kwame focuses on data-driven strategy and project efficiency.' },
  { id: 'aisha', name: 'Aisha N.', role: 'Education Coord.', location: 'Nigeria', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&fit=crop', bio: 'Aisha leads literacy and foundational learning programs for displaced youth.' },
  { id: 'hassan', name: 'Hassan D.', role: 'Agriculture Specialist', location: 'Mali', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', bio: 'Hassan develops sustainable farming and food security initiatives.' },
  { id: 'selam', name: 'Selam G.', role: 'Advocacy Lead', location: 'Ethiopia', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&fit=crop', bio: 'Selam works with regional bodies to advocate for women\'s rights and legal protection.' },
  { id: 'abdi', name: 'Abdi M.', role: 'Programs Officer', location: 'Somalia', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', bio: 'Abdi coordinates emergency relief and community development in fragile zones.' },
  { id: 'ruth', name: 'Ruth K.', role: 'Protection Lead', location: 'South Sudan', image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=200&h=200&fit=crop', bio: 'Ruth specializes in child protection and prevention of gender-based violence.' },
  { id: 'omar', name: 'Omar H.', role: 'Operations Manager', location: 'Sudan', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', bio: 'Omar manages regional logistics and security protocols for field missions.' },
  { id: 'lillian', name: 'Lillian Z.', role: 'HR & Training', location: 'Zambia', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', bio: 'Lillian focuses on staff development and regional capacity building.' },
  { id: 'temba', name: 'Temba S.', role: 'Legal Advisor', location: 'Zimbabwe', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', bio: 'Temba provides legal counsel and supports advocacy for human rights legislation.' },
  { id: 'marta', name: 'Marta P.', role: 'Communities Lead', location: 'Mozambique', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop', bio: 'Marta leads grassroots mobilization and community engagement initiatives.' },
];

const TIMELINE_EVENTS = [
  { year: '2019', title: 'Foundation', description: 'APDFE was founded by two human rights defenders to transform personal experiences of loss into collective healing.' },
  { year: '2020', title: 'Regional Expansion', description: 'Operations expanded to DRC and CAR, focusing on trauma-informed interventions.' },
  { year: '2022', title: 'Global Recognition', description: 'Received international awards for survivor-led humanitarian leadership.' },
  { year: '2024', title: 'Scaling Impact', description: 'Reaching over 50,000 beneficiaries with integrated health and education programs.' },
];

export const About = () => {
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);

  return (
    <div className="animate-in fade-in duration-700">
      <SEO
        title="About Us"
        description="Learn about A.P.D.F.E, a survivor-led organization founded in 2019 to transform personal experiences of loss into collective healing for women and children in Central Africa."
      />
      {/* Hero */}
      <section id="hero" className="bg-blue-900 py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">A.P.D.F.E</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-widest text-sm opacity-80">
            Action Pour le Développement de la Femme et de l'Enfant
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800/20 -skew-x-12 transform translate-x-20"></div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-24 max-w-7xl mx-auto px-4 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Our Identity</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Survivor-Led & Community Driven</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                Action Pour le Développement de la Femme et de l'Enfant (APDFE) is a survivor-led, women- and child-centered humanitarian organization founded in 2019 by two human rights defenders who transformed their personal experiences of violence and loss into a powerful force for collective healing and systemic change.
              </p>
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl border-l-8 border-blue-600 relative overflow-hidden group">
                <p className="relative z-10 font-bold italic text-lg leading-relaxed">
                  "We are not just an organization that works for vulnerable populations—we ARE those populations. Our staff, leadership, and community mobilizers are survivors."
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full group-hover:scale-110 transition-transform"></div>
              </div>
              <p>
                Operating in four of Central Africa's most fragile and conflict-affected countries—Central African Republic, Democratic Republic of Congo, Republic of Congo, and Cameroon—we deliver trauma-informed, locally-led interventions.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[600px] relative z-10 bg-slate-100">
              <LazyImage
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop"
                alt="Empowerment"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-green-500 rounded-[2rem] -z-10 animate-pulse"></div>
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-600 rounded-full -z-10 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-24 max-w-7xl mx-auto px-4 border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-900 text-white p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-3xl font-black mb-8 relative z-10">Our Mission</h3>
            <p className="text-slate-300 text-xl leading-relaxed italic font-medium relative z-10">
              "To empower, protect, and advocate for vulnerable women and children living in conflict and post-conflict environments across Central Africa by providing holistic, trauma-informed services."
            </p>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
          </div>
          <div id="vision" className="bg-blue-600 text-white p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-3xl font-black mb-8 relative z-10">Our Vision</h3>
            <p className="text-blue-50 text-xl leading-relaxed italic font-medium relative z-10">
              "A Central Africa where every woman and child—regardless of conflict or poverty—lives with dignity, safety, and the full realization of their rights."
            </p>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 max-w-7xl mx-auto px-4 border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Strategic Core</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Users size={32} />, title: "Survivor-Centered", desc: "Our programs are designed BY survivors, FOR survivors." },
            { icon: <Heart size={32} />, title: "Dignity & Respect", desc: "We restore hope, autonomy, and self-worth to those society has marginalized." },
            { icon: <Shield size={32} />, title: "Community-Led", desc: "We empower local leaders and support grassroots solutions." },
            { icon: <CheckCircle size={32} />, title: "Do No Harm", desc: "Safety, confidentiality, and trauma-informed care are at the heart of our work." }
          ].map((v, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="text-blue-600 flex justify-center mb-8 group-hover:scale-110 transition-transform">{v.icon}</div>
              <h3 className="text-xl font-black mb-4 text-slate-900">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Regional Team</h2>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">A dedicated, diverse team of field experts and leaders across Central Africa and beyond.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <LazyImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">{member.location}</div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-black text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">{member.role}</p>
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Popup */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 ease-out" onClick={() => setSelectedMember(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-500 ease-out">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-full transition-all z-10"
            >
              <X size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-80 md:h-auto overflow-hidden">
                <LazyImage
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-10 md:p-14 space-y-8 flex flex-col justify-center">
                <div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 block">{selectedMember.role}</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMember.name}</h2>
                  <div className="flex items-center gap-2 text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">
                    <MapPin size={12} /> {selectedMember.location}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium italic">"{selectedMember.bio}"</p>
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <a href="#" className="p-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all"><Linkedin size={18} /></a>
                  <a href="#" className="p-3 bg-slate-50 hover:bg-sky-500 hover:text-white rounded-xl transition-all"><Twitter size={18} /></a>
                  <a href="mailto:staff@apdfe.org" className="p-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all"><Mail size={18} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Section */}
      <section id="history" className="py-24 bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Operational History</h2>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">A Legacy of Survival and Growth</p>
          </div>
          <div className="relative border-l-4 border-blue-50 ml-4 md:ml-auto md:mr-auto space-y-20 max-w-4xl mx-auto">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.year} className="relative pl-12">
                <div className="absolute left-[-11px] top-0 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div>
                  <span className="text-5xl font-black text-blue-600/10 mb-2 block leading-none">{event.year}</span>
                  <div className="-mt-8">
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{event.title}</h4>
                    <p className="text-slate-600 mb-6 font-medium leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section id="locations" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Regional Footprint</div>
              <h2 className="text-4xl font-black mb-8 tracking-tight">Where We Work</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light italic">
                Our operations span across the most fragile environments in Central Africa, focusing on cross-border coordination and grassroots protection.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { name: 'DR Congo', projects: '12 active missions' },
                  { name: 'C.A.R', projects: '8 regional hubs' },
                  { name: 'Cameroon', projects: '6 medical centers' },
                  { name: 'Rep. Congo', projects: '5 safe spaces' },
                ].map((loc) => (
                  <div key={loc.name} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      <h4 className="font-black text-lg tracking-tight">{loc.name}</h4>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{loc.projects}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-blue-600/5 border border-white/5 p-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-8 border border-white/10">
                    <Globe size={48} className="text-blue-400 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Cross-Border Impact</h3>
                  <p className="text-sm text-slate-400 font-medium">Protecting the most vulnerable populations across borders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
