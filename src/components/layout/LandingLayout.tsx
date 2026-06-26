import * as React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { LayoutGrid, FileText, ArrowRight, Github, Hexagon } from 'lucide-react';

interface LandingLayoutProps {
  children: React.ReactNode;
  onNavigateToDashboard: () => void;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  onNavigateToDashboard,
}) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col relative overflow-hidden select-none font-sans">
      
      {/* Header Navbar - Fixed 72px height */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 h-[72px] flex items-center ${
          scrolled
            ? 'bg-[#09090B]/90 backdrop-blur-xl border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo Left */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 cursor-pointer pb-0.5"
            onClick={onNavigateToDashboard}
          >
            <Hexagon className="h-5 w-5 text-[#6366F1] fill-[#6366F1]/10 stroke-[2.5]" />
            <span className="text-base font-bold tracking-tight text-[#FAFAFA] font-display">
              FormFlow
            </span>
          </motion.div>

          {/* Links - Center */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="relative group text-xs tracking-wide uppercase font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              Features
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-indigo-500 transition-all duration-200 group-hover:w-full" />
            </a>
            <a href="#pricing" className="relative group text-xs tracking-wide uppercase font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              Pricing
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-indigo-500 transition-all duration-200 group-hover:w-full" />
            </a>
            <a href="#docs" className="relative group text-xs tracking-wide uppercase font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              Docs
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-indigo-500 transition-all duration-200 group-hover:w-full" />
            </a>
          </nav>

          {/* Right side Actions */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-4.5"
          >
            <button
              onClick={onNavigateToDashboard}
              className="text-xs font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] transition-all cursor-pointer py-1"
            >
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onNavigateToDashboard}
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg h-9 px-4 text-sm font-medium shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_-1px_0_rgba(0,0,0,0.3)_inset,0_2px_8px_rgba(99,102,241,0.25)] text-white transition-all cursor-pointer leading-tight flex items-center justify-center border border-indigo-600"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Main content slot */}
      <main className="flex-1">
        {children}
      </main>

      {/* Landing Footer */}
      <footer className="border-t border-white/[0.06] bg-[#050507] py-14 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Hexagon className="h-4.5 w-4.5 text-[#6366F1]" />
              <span className="font-display font-bold text-sm tracking-tight text-[#FAFAFA]">
                FormFlow
              </span>
            </div>
            <p className="text-xs text-[#71717A] leading-relaxed max-w-[240px]">
              The premium serverless document ingestion architecture built for Vercel, Linear, and modern cloud developers.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-zinc-500 mb-4">
              Infrastructure
            </h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-600">
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">AWS Step Triggers</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">DynamoDB Storage Cluster</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Serverless Endpoint Hub</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">IAM Access Logs</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-zinc-500 mb-4">
              Operations
            </h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-600">
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Linear Integrations</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Webhook Streaming API</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Vercel Edge Functions</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Cloud Watch Dogs</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-zinc-500 mb-4">
              Enterprise Compliance
            </h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-600">
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Strict IAM Isolations</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">99.99% Node Execution</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">SOC-2 Audited Sandbox</span></li>
              <li><span className="hover:text-zinc-300 transition-colors cursor-pointer">Standard TLS 1.3 Keys</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 mt-14 pt-6 border-t border-[#ffffff08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-zinc-700">
            &copy; {new Date().getFullYear()} FormFlow Inc. Designed for premium operations. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#71717A] hover:text-[#FAFAFA] transition-all cursor-pointer flex items-center gap-1">
              <Github className="h-3 w-3" /> GitHub
            </span>
            <span className="text-[#71717A] text-[11px]">|</span>
            <span className="text-[11px] text-[#71717A]">System Operates at 100% capacity</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
