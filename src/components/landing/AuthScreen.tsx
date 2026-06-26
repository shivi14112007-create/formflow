import * as React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ArrowLeft, KeyRound, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface AuthScreenProps {
  onBack: () => void;
  onSuccess: (user: { email: string; name: string }) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onBack,
  onSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = React.useState<'login' | 'signup'>(initialMode);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Quick fill personas for hassle-free demonstration
  const personas = [
    { name: 'Sarah Wu', email: 'sarah.wu@designer.co', role: 'Lead Product Designer', avatar: 'SW' },
    { name: 'Alex Rivera', email: 'alex.rivera@growth.io', role: 'Growth Marketing Lead', avatar: 'AR' },
  ];

  const handleQuickFill = (persona: typeof personas[0]) => {
    setIsLoading(true);
    setError(null);
    setName(persona.name);
    setEmail(persona.email);
    setPassword('demo-secured-pass');

    // Simulate authenticating for realistic feedback
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({ email: persona.email, name: persona.name });
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must have at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate secure storage and login
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        email,
        name: mode === 'signup' ? name : email.split('@')[0],
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans select-none relative overflow-hidden" style={{
      background: "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), #09090B"
    }}>
      {/* Decorative Top header row */}
      <div className="h-16 flex items-center justify-between px-8 max-w-7xl mx-auto w-full border-b border-white/10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
        <div className="flex items-center gap-2 font-bold tracking-tight text-white select-none">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-xs text-white">
            <span className="transform rotate-12">F</span>
          </div>
          <span>FormFlow</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        {/* Main interactive Box */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', damping: 25 }}
          className="w-full max-w-md rounded-[24px] bg-white/[0.03] border border-white/[0.08] p-8 backdrop-blur-xl premium-shadow"
        >
          <div className="text-center mb-8">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              FormFlow Console Portal
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white mb-2 font-sans">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-zinc-400">
              {mode === 'login' 
                ? 'Sign in to access your serverless drag & drop analytics'
                : 'Instantly build custom logic systems and capture smart feedback'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-2"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jordan Cooper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:bg-white/[0.06] text-zinc-100 text-sm font-medium outline-none transition-all placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:bg-white/[0.06] text-zinc-100 text-sm font-medium outline-none transition-all placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:bg-white/[0.06] text-zinc-100 text-sm font-medium outline-none transition-all placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 ring-4 ring-indigo-600/10 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Let\'s Go' : 'Create Free Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick-fill section */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 text-center uppercase mb-3">
              Fast Demo Quick-Connect Mode
            </p>
            <div className="grid grid-cols-2 gap-2">
              {personas.map((persona) => (
                <button
                  key={persona.email}
                  onClick={() => handleQuickFill(persona)}
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.05] text-left text-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[9px] flex items-center justify-center">
                      {persona.avatar}
                    </div>
                    <span className="font-semibold text-zinc-300 truncate">{persona.name}</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 truncate">{persona.role}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-zinc-500">
              {mode === 'login' ? "Don't have an account yet?" : "Already have an account?"}
            </span>
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
              }}
              className="ml-1.5 font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in instead'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
    </div>
  );
};
