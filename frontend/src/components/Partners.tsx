import { LazyImage } from './LazyImage';

// External Partners
import partnerEx3 from '../assets/partners/external/partner3.png';
import partnerEx4 from '../assets/partners/external/parnter4.png';
import partnerEx5 from '../assets/partners/external/partner5.png';
import partnerEx6 from '../assets/partners/external/partner6.png';
import partnerEx7 from '../assets/partners/external/partner7.png';

// Internal Partners
import partnerIn1 from '../assets/partners/internal/partner1.png';
import partnerIn2 from '../assets/partners/internal/partner2.png';

const EXTERNAL_PARTNERS = [
  { id: 'ex3', src: partnerEx3, alt: 'External Partner 3' },
  { id: 'ex4', src: partnerEx4, alt: 'External Partner 4' },
  { id: 'ex5', src: partnerEx5, alt: 'External Partner 5' },
  { id: 'ex6', src: partnerEx6, alt: 'External Partner 6' },
  { id: 'ex7', src: partnerEx7, alt: 'External Partner 7' },
];

const INTERNAL_PARTNERS = [
  { id: 'in1', src: partnerIn1, alt: 'Internal Partner 1' },
  { id: 'in2', src: partnerIn2, alt: 'Internal Partner 2' },
];

export const Partners = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Network</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Trusted Partners</h2>
          <p className="mt-4 text-slate-500 font-medium">Collaborating to drive impactful change across Central Africa.</p>
        </div>

        {/* Global/External Partners */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-slate-800 mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">External Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16">
            {EXTERNAL_PARTNERS.map((partner) => (
              <div key={partner.id} className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <LazyImage
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full object-contain"
                  containerClassName="w-full h-full flex items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Internal/Local Partners */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-8 border-l-4 border-green-500 pl-4 uppercase tracking-widest">Internal Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16">
            {INTERNAL_PARTNERS.map((partner) => (
              <div key={partner.id} className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <LazyImage
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full object-contain"
                  containerClassName="w-full h-full flex items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
