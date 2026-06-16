import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/fox-admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/fox-admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#111111] border border-[#232323] p-8 md:p-10 rounded-sm relative z-10">
        {/* Brand Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-2xl font-bold text-[#F8F8F8] tracking-wider">
            FOX<span className="text-[#D4AF37]">.</span>STUDIO
          </span>
          <p className="text-xs text-[#555555] uppercase tracking-widest mt-2">
            Owner Management Console
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-sm text-sm text-[#EF4444] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@foxstudio.com"
                className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#232323] hover:border-[#555555] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm transition-colors duration-200 outline-none"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
              Console Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#232323] hover:border-[#555555] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm transition-colors duration-200 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Access Console
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
