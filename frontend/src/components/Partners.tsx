import { LazyImage } from './LazyImage';

import partnerEx3 from '../assets/partners/external/partner3.png';
import partnerEx4 from '../assets/partners/external/parnter4.png';
import partnerEx5 from '../assets/partners/external/partner5.png';
import partnerEx6 from '../assets/partners/external/partner6.png';
import partnerEx7 from '../assets/partners/external/partner7.png';
import partnerIn1 from '../assets/partners/internal/partner1.png';
import partnerIn2 from '../assets/partners/internal/partner2.png';

const PARTNERS = [
  { id: 'ex3', src: partnerEx3, alt: 'Partner 3' },
  { id: 'ex4', src: partnerEx4, alt: 'Partner 4' },
  { id: 'ex5', src: partnerEx5, alt: 'Partner 5' },
  { id: 'ex6', src: partnerEx6, alt: 'Partner 6' },
  { id: 'ex7', src: partnerEx7, alt: 'Partner 7' },
  { id: 'in1', src: partnerIn1, alt: 'Partner 1' },
  { id: 'in2', src: partnerIn2, alt: 'Partner 2' },
];

export const Partners = () => {
  return (
    <div className="py-12 bg-slate-900 overflow-hidden w-full">
      <style>
        {`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 25s linear infinite;
          }
          .pause-on-hover:hover .animate-infinite-scroll {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Our Trusted Partners</h2>
        </div>
        
        {/* Infinite Scroll Wrapper */}
        <div 
          className="flex overflow-hidden w-full relative pause-on-hover py-4" 
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          {/* Scroll Track 1 */}
          <div className="flex gap-10 sm:gap-16 pr-10 sm:pr-16 shrink-0 animate-infinite-scroll">
            {PARTNERS.map((partner) => (
              <div key={`t1-${partner.id}`} className="w-24 h-24 md:w-32 md:h-32 flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <LazyImage
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full object-contain"
                  containerClassName="w-full h-full flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-50"
                />
              </div>
            ))}
          </div>

          {/* Scroll Track 2 (Duplicate) */}
          <div className="flex gap-10 sm:gap-16 pr-10 sm:pr-16 shrink-0 animate-infinite-scroll" aria-hidden="true">
            {PARTNERS.map((partner) => (
              <div key={`t2-${partner.id}`} className="w-24 h-24 md:w-32 md:h-32 flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <LazyImage
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full object-contain"
                  containerClassName="w-full h-full flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
