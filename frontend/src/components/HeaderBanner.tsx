import React from 'react';
import { Sparkles } from 'lucide-react';
import { LazyImage } from './LazyImage';
import bgImage from '../assets/others/IMG_6723.jpg';

interface HeaderBannerProps {
    title: string;
    subtitle?: string;
    badge?: string;
    bgImage: string;
    bgOverlay?: string; // e.g. 'bg-slate-900/80', defaults to 'bg-slate-900/70'
    className?: string; // Optional extra classes for the container
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
    title,
    subtitle,
    badge,

    bgOverlay = 'bg-slate-900/80',
    className = '',
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <LazyImage
                    src={bgImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                />
            </div>

            {/* Color Overlay Layer */}
            <div className={`absolute inset-0 z-10 bg-gradient-to-t to-zinc-900/40 from-neutral-900/90 backdrop-blur-[2px]`}></div>

            {/* Decorative Glow Elements */}
            {/* <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl z-10 pointer-events-none"></div> */}
            {/* <div className="absolute top-0 right-0 p-8 text-blue-100 z-10 pointer-events-none"> */}
                {/* <Sparkles size={64} className="opacity-10" /> */}
            {/* </div> */}

            {/* Content */}
            <section className="relative z-20 py-24 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 text-blue-300 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-500/20">
                            {badge}
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-lg">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed drop-shadow">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};
