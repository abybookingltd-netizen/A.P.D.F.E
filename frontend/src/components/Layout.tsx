import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Menu, X, Facebook, Instagram, Heart, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { LoadingScreen } from './LoadingScreen';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();
  const { currentUser } = useAuth();
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close sidebar and reset accordion on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenSection(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us',
      path: '/about',
      dropdown: [
        { name: 'Who We Are', path: '/about' },
        { name: 'Our Mission', path: '/about#mission' },
        { name: 'Our Values', path: '/about#values' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'History', path: '/about#history' },
        { name: 'Where We Work', path: '/about#locations' }
      ]
    },
    {
      name: 'Programs',
      path: '/programs',
      dropdown: [
        { name: 'Health Programs', path: '/programs#health' },
        { name: 'Youth and Women Economic Empowerment', path: '/programs#empowerment' },
        { name: 'Child Protection', path: '/programs#protection' },
        { name: 'Environmental Protection', path: '/programs#environment' },
        { name: 'Education Programs', path: '/programs#education' },
        { name: 'Peace-Building', path: '/programs#peace' }
      ]
    },
    {
      name: 'Impact',
      path: '/impact',
      dropdown: [
        { name: 'Success Stories', path: '/impact#stories' },
        { name: 'Statistics', path: '/impact#statistics' },
        { name: 'Annual Reports', path: '/impact#reports' },
        { name: 'Photo Gallery', path: '/impact#gallery' }
      ]
    },
    {
      name: 'Publication',
      path: '/publication',
      dropdown: [
        { name: 'Field News', path: '/publication#news' },
        { name: 'Images', path: '/publication#images' },
        { name: 'Ongoing Projects', path: '/publication#projects' }
      ]
    },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleMouseEnter = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const toggleSection = (name: string) =>
    setOpenSection((prev) => (prev === name ? null : name));

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop dropdown backdrop */}
      {activeDropdown && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 animate-in fade-in"
          onMouseEnter={handleMouseLeave}
        />
      )}

      <nav className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
        {/* Top Bar */}
        <div className={`bg-slate-900 text-white px-2 md:px-6 flex-col md:flex-row flex justify-between items-center text-xs gap-3  md:gap-0 transition-all duration-500 ease-in-out ${isScrolled ? 'min-h-7 opacity-80' : 'min-h-10 opacity-100'}`}>
          <div className="flex gap-4 flex-wrap justify-center ">
            <a href="mailto:apdfe19@gmail.com" className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <Mail size={12} /> <span className={isScrolled ? 'hidden sm:inline' : ''}>apdfe19@gmail.com</span>
            </a>
            <a href="tel:+250788219724" className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <Phone size={12} /> <span className={isScrolled ? 'hidden sm:inline' : ''}>+250 788 219 724 / +236 74 89 66 50</span>
            </a>
          </div>
          <div className="flex gap-4 items-center ">
            <Facebook size={14} className="cursor-pointer hover:text-blue-400" />
            <Instagram size={14} className="cursor-pointer hover:text-pink-400" />
            {currentUser ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-blue-400 font-black hover:text-white transition-colors ml-4 uppercase tracking-tighter">
                <User size={12} /> Dashboard
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors ml-4 uppercase tracking-tighter">
                <User size={12} /> Staff Access
              </Link>
            )}
          </div>
        </div>

        <div className={`mx-auto px-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src="logo.jpg"
              alt="A.P.D.F.E Logo"
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10 scale-115' : 'h-13 scale-120'}`}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.path + link.name}
                className="relative group h-full flex items-center"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.name)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                <Link
                  to={link.path}
                  className={`text-[11px] uppercase tracking-widest font-black transition-all duration-500 ease-in-out hover:text-blue-600 flex items-center gap-1 hover:scale-105 active:scale-95 transform ${isActive(link.path) ? 'text-blue-600' : 'text-slate-500'}`}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown size={10} className={`transition-transform duration-300 ease-in-out ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-[calc(100%+15px)] left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-2xl border-t-4 border-blue-600 py-4 animate-in fade-in slide-in-from-top-4 duration-300 ease-out z-[60]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-6 py-3 text-[10px] uppercase font-black tracking-[0.15em] text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-center relative z-10"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/donate" className={`bg-green-500 hover:bg-green-600 text-white rounded-full font-black shadow-lg transition-all active:scale-95 flex items-center gap-2 ${isScrolled ? 'px-4 py-1.5 text-[10px]' : 'px-6 py-2.5 text-xs'}`}>
              <Heart size={14} /> DONATE
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-900 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Sidebar Backdrop ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Mobile Sidebar Panel ────────────────────────────────── */}
      <aside
        className={`fixed top-0 right-0 z-[100] h-full w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="logo.jpg" alt="APDFE" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Close menu"
          >
            <X size={22} className="text-slate-700" />
          </button>
        </div>

        {/* Nav Links (scrollable) */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-0.5">
          {navLinks.map((link) => (
            <div key={link.path + link.name}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleSection(link.name)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest transition-colors ${isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${openSection === link.name ? 'rotate-180 text-blue-500' : 'text-slate-400'
                        }`}
                    />
                  </button>

                  {/* Accordion Sub-items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="pl-4 pb-2 pt-0.5 flex flex-col gap-0.5">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest transition-colors ${isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-6 border-t border-slate-100 bg-slate-50 space-y-4">
          <Link
            to="/donate"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-md"
          >
            <Heart size={18} /> Donate Now
          </Link>
          <div className="flex flex-col gap-2 text-xs text-slate-500 font-medium">
            <a href="mailto:apdfe19@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Mail size={14} className="text-green-500" /> apdfe19@gmail.com
            </a>
            <a href="tel:+250788219724" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Phone size={14} className="text-green-500" /> +250 788 219 724 / +236 74 89 66 50
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl">
              <img src="logo.jpg" alt="A.P.D.F.E Logo" className="h-10 w-auto object-contain" />
            </div>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            Empowering women and children across Central Africa through survivor-led initiatives in health, education, and peace-building.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-pink-500 transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/impact" className="hover:text-white transition-colors">Impact</Link></li>
            <li><Link to="/publication" className="hover:text-white transition-colors">Publication</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Engagement</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/donate" className="hover:text-white transition-colors">Support Missions</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Volunteer Hub</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Strategic Partnerships</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Dispatch</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Dispatch HQ</h4>
          <ul className="space-y-5 text-sm font-medium">
            <li className="flex items-center gap-3"><Mail size={16} className="text-green-500" /> apdfe19@gmail.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-green-500" /> +250 788 219 724 / +236 74 89 66 50</li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-lg">📍</span>
              Kigali-Rwanda, Goma-DRC<br />Bangui-RCA, Brazzaville-Congo
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          © 2025 A.P.D.F.E | ACTION POUR LE DÉVELOPPEMENT DE LA FEMME ET DE L'ENFANT
        </p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useData();
  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-1000">
      {isLoading && <LoadingScreen />}
      {!isDashboard && <Navbar />}
      <main className="grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};
