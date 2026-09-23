import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Zap, User, Building } from 'lucide-react';
import { Button } from '../components/common/Button';

export function LoginPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('demo.geologist@gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Dr. Priya Sharma');
  const [department, setDepartment] = useState('GSI AI Exploration Cell');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#05152b] flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white">
      {/* Left Visual Section */}
      <div className="lg:w-[58%] relative bg-[#061c38] p-8 lg:p-14 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
        
        {/* Subtle Geological Background Graphics & Wave Overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Glowing gradient blue beam */}
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl" />
          {/* Subtle translucent overlapping mineral circles */}
          <div className="absolute top-[25%] left-[10%] w-[380px] h-[380px] bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[420px] h-[420px] bg-amber-500/10 rounded-full blur-2xl" />
          
          {/* Curved topographic line SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 800 800" fill="none">
            <path d="M-100 200 C 200 100, 400 400, 900 250" stroke="#38bdf8" strokeWidth="2" />
            <path d="M-100 450 C 300 250, 500 600, 900 350" stroke="#eab308" strokeWidth="2" />
            <path d="M-50 600 C 150 400, 450 700, 850 500" stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* Top Header Logo & Ministry Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 border border-slate-400/40 rounded flex items-center justify-center text-white">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
              <path d="M12 7l5 5H7l5-5z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-black tracking-wider text-white uppercase leading-tight">
              MINISTRY OF MINES
            </div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-tight">
              GOVERNMENT OF INDIA
            </div>
          </div>
        </div>

        {/* Hero Content Section */}
        <div className="relative z-10 my-10 lg:my-auto space-y-5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tracking-wider uppercase text-[11px]">NATIONAL MINERAL INTELLIGENCE INITIATIVE</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Manganese Mining<br />
            Intelligence Platform
          </h1>

          <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
            AI-powered mineral exploration and mining decision support
          </p>

          {/* Metric Stats Box with 3 columns */}
          <div className="mt-8 pt-6 border border-slate-700/60 bg-slate-900/40 backdrop-blur-xs rounded-lg p-5 grid grid-cols-3 gap-4 text-left">
            <div className="border-r border-slate-700/80 pr-4">
              <div className="text-3xl font-black text-white">146</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">BOREHOLES</div>
            </div>
            <div className="border-r border-slate-700/80 px-4">
              <div className="text-3xl font-black text-white">24</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">MINING AREAS</div>
            </div>
            <div className="pl-4">
              <div className="text-3xl font-black text-white">08</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PRIORITY ZONES</div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Text */}
        <div className="relative z-10 text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          SIH 2026 • PROTOTYPE ENVIRONMENT • DEMONSTRATION DATA
        </div>
      </div>

      {/* Right Login / Sign Up Card Panel */}
      <div className="lg:w-[42%] bg-[#f8fafc] p-8 lg:p-14 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          
          {/* Secure Access Pill */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SECURE ACCESS</span>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isSignUp
                ? 'Request official geologist access to the mineral intelligence workspace.'
                : 'Sign in to access the mineral intelligence workspace.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Additional Fields for Sign Up */}
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Priya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#083366]/20 focus:border-[#083366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Department / Cell
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="GSI AI Exploration Cell"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#083366]/20 focus:border-[#083366]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field (Removed Username label) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#083366]/20 focus:border-[#083366]"
                />
              </div>
            </div>

            {/* Password Field with Dynamic Eye / EyeOff Icon */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {!isSignUp && (
                  <a href="#forgot" className="text-xs text-[#083366] font-semibold hover:underline">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#083366]/20 focus:border-[#083366]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field for Sign Up */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#083366]/20 focus:border-[#083366]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded focus:outline-none"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            {!isSignUp && (
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#083366] focus:ring-[#083366]"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember me on this device</span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#083366] hover:bg-[#062449] active:bg-[#041833] text-white font-bold text-sm py-3 px-4 rounded-lg shadow-sm transition-colors mt-2"
            >
              {loading
                ? isSignUp
                  ? 'Creating Account...'
                  : 'Signing In...'
                : isSignUp
                ? 'Request Access & Sign Up'
                : 'Sign In'}
            </button>
          </form>

          {/* Sign Up / Sign In Toggle Link */}
          <div className="text-center text-xs text-slate-600 pt-1">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-[#083366] font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-[#083366] font-bold hover:underline"
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-5 border-t border-slate-200/60 text-center space-y-1">
            <div className="font-bold text-xs text-slate-800">Government of India • Ministry of Mines</div>
            <div className="text-[10px] text-slate-400">This is a visual demonstration. No credentials are validated.</div>
          </div>

        </div>
      </div>
    </div>
  );
}
