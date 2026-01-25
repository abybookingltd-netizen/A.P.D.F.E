import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowRight, Share2, Star } from 'lucide-react';

export const ThankYou = () => {
  return (
    <div className="animate-in fade-in zoom-in duration-700 bg-slate-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-12 text-center space-y-8 border border-slate-100 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-green-500 to-blue-600"></div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-50 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <Heart size={48} className="text-green-600 fill-green-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Thank You for Your Heart!</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            Your generous contribution has been received. You're now a vital part of our mission to empower women and children across Central Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
            <Star className="text-blue-600 mb-3" size={20} />
            <h4 className="font-black text-slate-900 uppercase tracking-tight text-xs mb-1">Direct Impact</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Your donation funds field operations and survivor-led programs.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
            <Share2 className="text-green-600 mb-3" size={20} />
            <h4 className="font-black text-slate-900 uppercase tracking-tight text-xs mb-1">Spread the Word</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Share our mission with your network to amplify our reach.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-900/20"
          >
            <Home size={18} /> Return Home
          </Link>
          <Link 
            to="/impact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all"
          >
            See Your Impact <ArrowRight size={18} />
          </Link>
        </div>

        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pt-4">
          A formal receipt has been sent to your email address.
        </p>
      </div>
    </div>
  );
};
