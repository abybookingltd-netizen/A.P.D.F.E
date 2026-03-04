import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Globe, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

// Using the same impactful global image from the About page
import regionalImg from '../assets/others/IMG_6730.jpg';

export const RegionalPresence = () => {
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <SEO
                title="Our Regional Presence - A.P.D.F.E"
                description="APDFE operates across Central African Republic, Republic of the Congo, Democratic Republic of the Congo, and Rwanda."
            />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-slate-900 overflow-hidden">
                <LazyImage
                    src={regionalImg}
                    alt="APDFE Regional Presence"
                    className="w-full h-full object-cover opacity-50"
                    containerClassName="w-full h-full absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full px-4 pb-12 md:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
                        >
                            <ChevronLeft size={16} /> Back to About Us
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-md">
                                <Globe size={12} /> Regional Network
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                            Our Regional and Country Presence
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl leading-relaxed">
                            Operating across four African countries, our regional presence reflects the diversity of the contexts in which we work and the strength of our shared commitment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-100">
                    {/* Decorative Lead-in */}
                    <div className="w-16 h-1 bg-blue-600 mb-10 rounded-full"></div>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none">

                        {/* Introduction Paragraphs */}
                        <div className="mb-12">
                            <p className="leading-relaxed text-slate-700 font-medium text-xl">
                                APDEFE operates across four African countries: <strong>Central African Republic, Republic of the Congo, Democratic Republic of the Congo, and Rwanda.</strong>
                            </p>
                            <p className="leading-relaxed text-slate-600 mt-6">
                                Our regional presence reflects both the diversity of the contexts in which we work and the strength of our shared commitment to transformative development.
                            </p>
                        </div>

                        {/* A Decentralized Yet Unified Model */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <MapPin size={18} />
                                </div>
                                A Decentralized Yet Unified Model
                            </h2>
                            <p className="leading-relaxed text-slate-600 mb-6">
                                Each country program operates independently under its own national leadership, responding to the specific social, economic, and institutional realities of its context. This structure allows APDFE to remain locally grounded, culturally responsive, and strategically aligned with national priorities and stakeholder expectations.
                            </p>
                            <p className="leading-relaxed text-slate-600">
                                While operationally autonomous, all country programs are guided by a shared Vision, Mission, and core Values. These common principles ensure coherence in our strategic direction, uphold organizational standards, and safeguard the integrity of our work across borders.
                            </p>
                        </div>

                        {/* Collaboration, Learning, and Capacity Sharing */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Globe size={18} />
                                </div>
                                Collaboration, Learning, and Capacity Sharing
                            </h2>
                            <p className="leading-relaxed text-slate-600">
                                APDEFE promotes strong inter-country coordination and collaboration. Our programs actively engage in experience-sharing, peer learning, and technical support mechanisms that strengthen institutional capacity and enhance program quality. Through this collaborative approach, we leverage regional expertise, amplify impact, and foster innovation across our areas of intervention.
                            </p>
                        </div>

                        {/* Regional Office in Kigali */}
                        <div className="mb-12 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
                                Regional Office in Kigali
                            </h2>
                            <p className="leading-relaxed text-slate-700 font-medium mb-6">
                                In line with our commitment to deeper integration and collective growth, all country programs have agreed to establish a Regional Office in Kigali.
                            </p>
                            <p className="leading-relaxed text-slate-600 mb-6">
                                The Regional Office serves as a strategic coordination hub, with a particular focus on:
                            </p>

                            <ul className="space-y-4 mb-8 list-none pl-0">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                                    <span className="text-slate-700">Joint fundraising and resource mobilization efforts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                                    <span className="text-slate-700">Development of cross-border and multi-country initiatives</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                                    <span className="text-slate-700">Strategic partnerships at regional and international levels</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                                    <span className="text-slate-700">Strengthening organizational systems and standards</span>
                                </li>
                            </ul>

                            <p className="leading-relaxed text-slate-900 font-semibold italic border-l-4 border-blue-600 pl-4 py-2">
                                By combining strong national ownership with structured regional coordination, APDEFE positions itself as a credible, agile, and impact-driven regional organization dedicated to sustainable development across Central and East Africa.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
