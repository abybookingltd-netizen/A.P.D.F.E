import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ChevronRight, AlertCircle, Fingerprint, KeyRound, ArrowLeft, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expiresIn, setExpiresIn] = useState(300); // 5 minutes in seconds
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  const { sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  // Timer for OTP expiration
  React.useEffect(() => {
    if (step === 'otp' && expiresIn > 0) {
      const timer = setInterval(() => {
        setExpiresIn(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, expiresIn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await sendOTP(email);
      setExpiresIn(response.expiresIn);
      setStep('otp');
      setAttemptsRemaining(3);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to send OTP';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOTP(email, otp);
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid OTP';
      const remaining = err.response?.data?.attemptsRemaining;
      
      setError(errorMessage);
      if (remaining !== undefined) {
        setAttemptsRemaining(remaining);
      }
      
      // If OTP expired or too many attempts, go back to email step
      if (errorMessage.includes('expired') || errorMessage.includes('Too many')) {
        setTimeout(() => {
          setStep('email');
          setOtp('');
          setError('');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp('');
    setError('');
    setLoading(true);

    try {
      const response = await sendOTP(email);
      setExpiresIn(response.expiresIn);
      setAttemptsRemaining(3);
      setError(''); // Clear any previous errors
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to resend OTP';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-12 border border-slate-100 animate-in zoom-in duration-500">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            {step === 'email' ? <Fingerprint size={40} /> : <KeyRound size={40} />}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {step === 'email' ? 'Personnel Access' : 'Verify Code'}
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest">
            {step === 'email' ? 'Authorized Staff Only' : 'Enter OTP from Email'}
          </p>
        </div>

        {/* Email Step */}
        {step === 'email' && (
          <form onSubmit={handleSendOTP} className="space-y-8">
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
              {loading ? 'Sending OTP...' : 'Send OTP'}
              {!loading && <ChevronRight size={20} />}
            </button>
          </form>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-8">
            {/* Back button */}
            <button
              type="button"
              onClick={handleBackToEmail}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Change Email
            </button>

            {/* Email display */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                Sent to
              </p>
              <p className="text-sm font-bold text-slate-900">{email}</p>
            </div>

            {/* Timer */}
            {expiresIn > 0 && (
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <Clock size={16} />
                <span className="text-sm font-bold">
                  Code expires in {formatTime(expiresIn)}
                </span>
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                6-Digit Code
              </label>
              <input
                required
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={loading}
                maxLength={6}
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-black text-3xl text-center text-slate-900 placeholder:text-slate-300 tracking-[0.5em]"
                placeholder="000000"
                autoComplete="off"
              />
              {attemptsRemaining < 3 && (
                <p className="text-xs font-bold text-orange-600 ml-1">
                  {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
                </p>
              )}
            </div>

            {error && (
              <div className="p-5 bg-red-50 rounded-2xl flex gap-4 text-red-600 items-center border border-red-100 animate-in shake">
                <AlertCircle size={20} />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
              {!loading && <ChevronRight size={20} />}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading || expiresIn > 240} // Allow resend after 1 minute
                className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Didn't receive code? Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Footer Security Notice */}
        <div className="mt-14 pt-12 border-t border-slate-100">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {step === 'email' ? 'Internal Access System' : 'Secure OTP Authentication'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};