import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ChevronRight, AlertCircle, Fingerprint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-12 border border-slate-100 animate-in zoom-in duration-500">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Fingerprint size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Personnel Access
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest">
            Authorized Staff Only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              Staff Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                size={20}
              />
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                placeholder="staff@apdfe.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              Password
            </label>
            <div className="relative">
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-5 bg-red-50 rounded-2xl flex gap-4 text-red-600 items-center border border-red-100 animate-in shake">
              <AlertCircle size={20} />
              <span className="text-xs font-bold">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-700"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>

        {/* Footer Security Notice */}
        <div className="mt-14 pt-12 border-t border-slate-100">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Internal Access System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
