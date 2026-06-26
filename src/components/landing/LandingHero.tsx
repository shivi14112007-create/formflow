import * as React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Terminal, 
  Database, 
  Layers, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  MousePointer, 
  Settings, 
  Check, 
  Play, 
  LineChart, 
  FormInput, 
  ChevronRight,
  Server
} from 'lucide-react';
import { Button } from '../ui/Button';

interface LandingHeroProps {
  onStart: () => void;
  onViewDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onViewDemo }) => {
  
  // Custom stagger config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: [0.16, 1, 0.3, 1],
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: [0.16, 1, 0.3, 1],
        duration: 0.7,
      },
    },
  };

  const featureCards = [
    {
      title: 'Drag and Drop Builder',
      desc: 'Formulate responsive inputs with strict data validation contracts in a beautiful interactive canvas.',
      icon: MousePointer,
      tag: 'Dynamic UI'
    },
    {
      title: 'Real-time Analytics',
      desc: 'Observe visitor retention, completion rates, and raw telemetry responses on instant streaming dashboards.',
      icon: Activity,
      tag: 'AWS WebSockets'
    },
    {
      title: 'Custom Themes',
      desc: 'Pair brand palettes, elegant typography families, and spacing tokens to render perfect layouts.',
      icon: Layers,
      tag: 'CSS Variables'
    },
    {
      title: 'AWS Native Deployment',
      desc: 'Dispatch payload records securely straight into fully containerized VPC Lambda routines and DynamoDB.',
      icon: Cpu,
      tag: 'Serverless Edge'
    }
  ];

  return (
    <div className="bg-[#09090B] w-full relative select-none">
      
      {/* 1. HERO SECTION & INTEGRATED PRODUCT PREVIEW MOCKUP */}
      <section className="max-w-[1280px] mx-auto px-6 pt-[120px] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content (Staggered Intro) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col text-left space-y-6"
          >
            {/* Small Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 border border-white/[0.1] bg-white/[0.03] text-[11px] font-semibold tracking-[0.08em] uppercase text-zinc-500 rounded-md px-2.5 py-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block" />
                Serverless Form Builder
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-bold text-5xl md:text-[72px] tracking-tight leading-[1.05] text-white"
            >
              Build forms that <span className="text-indigo-400">scale</span> without thinking about infrastructure
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-[16px] leading-relaxed text-[#A1A1AA] max-w-xl"
            >
              Create, publish and analyze forms in minutes with a beautiful no-code experience powered by AWS. Fully optimized for instant deployments and automated compliance.
            </motion.p>

            {/* Buttons (Height 44px) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row items-center gap-4.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onStart}
                className="h-11 px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_2px_8px_rgba(99,102,241,0.3)] hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_4px_16px_rgba(99,102,241,0.4)] active:scale-[0.99] cursor-pointer inline-flex items-center gap-2 border border-indigo-600"
              >
                Get Started
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onViewDemo}
                className="h-11 px-6 bg-white/[0.04] hover:bg-white/[0.07] text-zinc-300 hover:text-white text-sm font-medium rounded-lg border border-white/[0.1] hover:border-white/[0.16] transition-all duration-150 cursor-pointer inline-flex items-center gap-2"
              >
                Book Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Right Dashboard Mockup (Linear/Vercel Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="lg:col-span-5 w-full flex flex-col"
          >
            {/* Dashboard Window Framer */}
            <div className="w-full rounded-xl border border-white/[0.1] bg-[#0C0C0E] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col max-w-lg mx-auto">
              {/* Window Header */}
              <div className="h-11 border-b border-white/[0.06] bg-[#141416] px-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
                <div className="px-3 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-md text-[11px] text-zinc-600 font-mono">
                  aws.formflow.dev/live-metrics
                </div>
                <div className="h-4 w-4" />
              </div>

              {/* Window Body Layout */}
              <div className="grid grid-cols-12 h-[340px] bg-[#09090b]">
                
                {/* 1. Sidebar */}
                <div className="col-span-4 border-r border-white/[0.06] p-3.5 flex flex-col justify-between bg-[#0A0A0D] h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-4.5 w-4.5 rounded bg-indigo-600 flex items-center justify-center text-white">
                        <FormInput className="h-3 w-3" />
                      </div>
                      <span className="text-[11px] font-bold text-white font-display">Console</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#52525B] uppercase tracking-wider block px-1">Forms List</span>
                      <div className="space-y-1">
                        <div className="px-2 py-1.5 rounded bg-indigo-600/[0.12] border-l-2 border-l-indigo-500 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-indigo-400 truncate">Product Beta</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        </div>
                        <div className="px-2 py-1.5 rounded hover:bg-white/[0.03] transition-all flex items-center justify-between cursor-pointer">
                          <span className="text-[10px] font-medium text-zinc-600 truncate">User UX Survey</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                        </div>
                        <div className="px-2 py-1.5 rounded hover:bg-white/[0.03] transition-all flex items-center justify-between cursor-pointer">
                          <span className="text-[10px] font-medium text-zinc-600 truncate">Event Feedbacks</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center gap-1.5 px-0.5 text-[#71717A]">
                    <Settings className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-medium">Zone: us-east-1</span>
                  </div>
                </div>

                {/* 2. Center Panel (Faux chart and placeholders) */}
                <div className="col-span-5 p-3 flex flex-col justify-between h-full bg-[#0a0a0d]">
                  <div className="bg-[#111114] rounded-lg p-3">
                    <div className="text-[9px] text-[#71717A] uppercase tracking-wider mb-2 font-bold select-none font-sans">Active SLA</div>
                    <svg className="h-10 w-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <rect x="2" y="18" width="8" height="12" rx="1.5" fill="rgba(99,102,241,0.6)" />
                      <rect x="18" y="14" width="8" height="16" rx="1.5" fill="rgba(99,102,241,0.6)" />
                      <rect x="34" y="16" width="8" height="14" rx="1.5" fill="rgba(99,102,241,0.6)" />
                      <rect x="50" y="8" width="8" height="22" rx="1.5" fill="rgba(99,102,241,0.6)" />
                      <rect x="66" y="11" width="8" height="19" rx="1.5" fill="rgba(99,102,241,0.6)" />
                      <rect x="82" y="2" width="8" height="28" rx="1.5" fill="rgba(99,102,241,1)" />
                    </svg>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-6 flex items-center justify-between border-b border-white/[0.04] px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />
                        <span className="text-[9px] text-[#A1A1AA] font-mono">Row 01</span>
                      </div>
                      <div className="h-1.5 w-14 bg-zinc-800 rounded" />
                    </div>
                    <div className="h-6 flex items-center justify-between border-b border-white/[0.04] px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />
                        <span className="text-[9px] text-[#A1A1AA] font-mono">Row 02</span>
                      </div>
                      <div className="h-1.5 w-18 bg-zinc-800 rounded" />
                    </div>
                    <div className="h-6 flex items-center justify-between border-b border-white/[0.04] px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />
                        <span className="text-[9px] text-[#A1A1AA] font-mono">Row 03</span>
                      </div>
                      <div className="h-1.5 w-10 bg-zinc-800 rounded" />
                    </div>
                  </div>
                </div>

                {/* 3. Right panel mock */}
                <div className="col-span-3 p-3 flex flex-col justify-between h-full bg-[#0a0a0d] border-l border-white/[0.06]">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="h-2 w-12 bg-zinc-800 rounded" />
                      <div className="h-2 w-20 bg-zinc-700 rounded" />
                    </div>

                    <div className="pt-2">
                      <span className="block text-[8px] text-[#52525B] uppercase tracking-wider font-bold">Processed</span>
                      <div className="text-xl font-bold text-white font-mono leading-none mt-1">1,284</div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-mono font-medium">
                      +12.4%
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] text-[8px] text-[#52525B] font-mono uppercase tracking-wider">
                    Live feed
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 2. FEATURE SECTION (Gap 96px) */}
      <section id="features" className="max-w-[1280px] mx-auto px-6 mt-[96px] pb-[96px]">
        <div className="text-left py-6 border-b border-white/5 mb-14">
          <span className="text-xs font-bold text-[#6366F1] uppercase tracking-widest block mb-2">Designed for elite operations</span>
          <h2 className="font-display font-bold text-3xl md:text-[36px] tracking-tight text-[#FAFAFA]">
            A complete suite for serverless structures
          </h2>
        </div>

        {/* 4 Cards Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-[2px] hover:border-white/[0.13] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 text-left flex flex-col justify-between h-[210px]"
              >
                <div>
                  <div className="text-zinc-500 mb-5">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-zinc-200 mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-[13px] text-zinc-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. AWS INFRASTRUCTURE ARCHITECTURE FOCUS (Editorial Layout) */}
      <section id="infrastructure" className="border-t border-[#ffffff08] bg-[#09090b] select-none py-[96px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#6366F1] uppercase tracking-widest inline-flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5" />
                No Provisioning Required
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-[36px] tracking-tight leading-snug text-[#FAFAFA]">
                Enterprise class security blueprints native to AWS
              </h2>
              <p className="font-sans text-[16px] text-[#A1A1AA] leading-relaxed">
                Skip tedious server orchestration. FormFlow deploys isolated telemetry handlers straight on AWS serverless runtimes. Maintain perfect payload isolation, subsecond DB writes, and direct encryption out of the box.
              </p>
              
              <div className="space-y-4 pt-3 text-sm text-[#A1A1AA]">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#FAFAFA]">VPC Isolations</strong>
                    <span className="block text-[13px] text-[#71717A] mt-0.5">Responses are processed inside isolated VPC networks with multi-region replication.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#FAFAFA]">Automated IAM Protections</strong>
                    <span className="block text-[13px] text-[#71717A] mt-0.5">Our strict templates write with single-record access levels, ensuring zero database leakage risk.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right SAM Config Terminal Code Rendering */}
            <div className="lg:col-span-6 w-full">
              <div className="rounded-xl border border-white/[0.06] bg-[#0F0F12] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] p-5 font-mono text-left">
                {/* File tab header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 select-none">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-indigo-400" />
                    <span className="text-zinc-400 font-bold text-[11px] font-mono leading-none">formflow-template.yaml</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>

                {/* Styled YAML specification */}
                <div className="text-[12px] leading-relaxed text-zinc-400 space-y-1.5 select-all overflow-auto">
                  <p className="text-zinc-600 font-mono"># AWS Serverless SAM Deployment Definition</p>
                  <p className="font-mono"><span className="text-zinc-100 font-semibold">AWSTemplateFormatVersion:</span> <span className="text-zinc-400">'2010-09-09'</span></p>
                  <p className="font-mono"><span className="text-zinc-100 font-semibold">Transform:</span> <span className="text-indigo-400">'AWS::Serverless-2016-10-31'</span></p>
                  <p className="font-mono"><span className="text-zinc-100 font-semibold">Resources:</span></p>
                  <p className="pl-4 font-mono"><span className="text-zinc-100 font-semibold">PayloadIngestionStream:</span></p>
                  <p className="pl-8 font-mono"><span className="text-zinc-100 font-semibold">Type:</span> <span className="text-indigo-400">AWS::Serverless::Function</span></p>
                  <p className="pl-8 font-mono"><span className="text-zinc-100 font-semibold">Properties:</span></p>
                  <p className="pl-12 font-mono"><span className="text-zinc-500">Handler:</span> <span className="text-zinc-400">index.handler</span></p>
                  <p className="pl-12 font-mono"><span className="text-zinc-500">Runtime:</span> <span className="text-zinc-400">nodejs20.x</span></p>
                  <p className="pl-12 font-mono"><span className="text-zinc-500">MemorySize:</span> <span className="text-zinc-400">1024</span></p>
                  <p className="pl-12 font-mono"><span className="text-zinc-500">Timeout:</span> <span className="text-zinc-400">3</span></p>
                  <p className="pl-12 font-mono"><span className="text-zinc-500">Policies:</span> <span className="text-indigo-400">DynamoDBCrudPolicy</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION (Gap 96px) */}
      <section id="pricing" className="border-t border-[#ffffff08] bg-[#09090b] py-[96px] select-none">
        <div className="max-w-[1280px] mx-auto px-6 text-left">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold text-[#6366F1] uppercase tracking-widest block mb-2">PROPORTIONAL SAVINGS</span>
            <h2 className="font-display font-semibold text-3xl md:text-[36px] tracking-tight text-[#FAFAFA] mb-4">
              Simple, transparent routing rates
            </h2>
            <p className="font-sans text-[15px] text-[#A1A1AA] leading-relaxed">
              No hidden fees. Pay strictly for the ingestion payload and active concurrent Lambdas. Select a plan configured for your platform operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Developer Card */}
            <div className="flex flex-col justify-between p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block">Developer</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-display text-white">$0</span>
                    <span className="text-xs text-zinc-500 tracking-wide">/ month</span>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-relaxed min-h-[40px]">
                  Perfect for side-hustles, testing AWS endpoints, and local client application trials.
                </p>
                <div className="h-[1px] bg-white/[0.06] my-4" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500 shrink-0" />
                    <span>3 active forms</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500 shrink-0" />
                    <span>100 submissions / month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500 shrink-0" />
                    <span>Standard AWS endpoint latency</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-650">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 ml-1 mr-1" />
                    <span>No priority queues</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={onStart}
                  className="w-full h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-zinc-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-150 cursor-pointer"
                >
                  Deploy Free
                </button>
              </div>
            </div>

            {/* Pro Card (Accent highlights) */}
            <div className="flex flex-col justify-between p-6 rounded-xl border border-indigo-500 bg-white/[0.03] relative text-left shadow-[0_16px_40px_rgba(99,102,241,0.08)]">
              <div className="absolute -top-3 right-6 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold tracking-widest text-[9px] uppercase px-2.5 py-1 rounded-md">
                Optimal Choice
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Pro Platform</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-display text-white">$29</span>
                    <span className="text-xs text-zinc-500 tracking-wide">/ month</span>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-relaxed min-h-[40px]">
                  Built for production teams requiring custom themes, direct AWS ingestion logs, and instant support.
                </p>
                <div className="h-[1px] bg-white/[0.06] my-4" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-indigo-400" />
                    <span>Unlimited schema fields</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-indigo-400" />
                    <span>10,000 entries / month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-indigo-400" />
                    <span>Real-time analytical graphs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-indigo-400" />
                    <span>Priority email support queue</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={onStart}
                  className="w-full h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs tracking-wider uppercase transition-all duration-150 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_2px_8px_rgba(99,102,241,0.2)] cursor-pointer"
                >
                  Start Scaling Now
                </button>
              </div>
            </div>

            {/* Enterprise Card */}
            <div className="flex flex-col justify-between p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block">Enterprise Ops</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-display text-white">Custom</span>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-relaxed min-h-[40px]">
                  Engineered for custom scale VPC isolation, custom AWS IAM roles, and strict uptime SLAs.
                </p>
                <div className="h-[1px] bg-white/[0.06] my-4" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500" />
                    <span>Infinite active entries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500" />
                    <span>Dedicated IAM security rules</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500" />
                    <span>Custom AWS Lambda subsecond logs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-zinc-500" />
                    <span>99.99% Node isolation SLAs</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={onStart}
                  className="w-full h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-zinc-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-150 cursor-pointer"
                >
                  Contact Ops Team
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DOCUMENTATION GUIDE (Docs Section) */}
      <section id="docs" className="border-t border-[#ffffff08] bg-[#09090b] py-[96px]">
        <div className="max-w-[1280px] mx-auto px-6 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#6366F1] uppercase tracking-widest block mb-2">REST API & SDK GUIDE</span>
            <h2 className="font-display font-semibold text-3xl md:text-[36px] tracking-tight text-[#FAFAFA] mb-4">
              Integrate with simple, clean hooks
            </h2>
            <p className="font-sans text-[15px] text-[#A1A1AA] leading-relaxed mb-10">
              FormFlow operates as a robust HTTP REST proxy endpoint or as a lightweight React drop-in. Embed anywhere inside static HTML blocks or custom full-stack solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="border border-white/5 bg-[#ffffff03] rounded-md p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6366F1] tracking-wider uppercase block mb-3 font-mono">Option A: HTML Form POST Handler</span>
                <p className="font-sans text-[13px] text-[#A1A1AA] leading-relaxed mb-6">
                  Directly capture submissions from any static HTML form utilizing simple redirect properties. Standard responses process instantly.
                </p>
                <div className="bg-[#0c0c0e] rounded p-4 font-mono text-[11px] text-[#A1A1AA] border border-white/5">
                  <span className="text-[#71717A] block">&lt;!-- Zero JS required --&gt;</span>
                  <span className="text-white">&lt;form</span> action=<span className="text-[#6366F1]">"https://api.formflow.aws/v3/submit"</span> method=<span className="text-[#6366F1]">"POST"</span><span className="text-white">&gt;</span>
                  <span className="block pl-4 text-[#71717A]">&lt;input type="email" name="email" required /&gt;</span>
                  <span className="block pl-4 text-[#71717A]">&lt;button type="submit"&gt;Secure Send&lt;/button&gt;</span>
                  <span className="text-white">&lt;/form&gt;</span>
                </div>
              </div>
            </div>

            <div className="border border-white/5 bg-[#ffffff03] rounded-md p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6366F1] tracking-wider uppercase block mb-3 font-mono">Option B: Serverless Fetch JSON Endpoint</span>
                <p className="font-sans text-[13px] text-[#A1A1AA] leading-relaxed mb-6">
                  Fetch and submit JSON datasets directly over asynchronous requests. Perfect for client-side React, Vue, or backend Express wrappers.
                </p>
                <div className="bg-[#0c0c0e] rounded p-4 font-mono text-[11px] text-[#A1A1AA] border border-white/5">
                  <span className="text-[#71717A] block">// Fetch POST interface</span>
                  <span className="text-[#6366F1]">const</span> response = <span className="text-[#6366F1]">await</span> fetch(<span className="text-white">'/api/v3/payload'</span>, &#123;
                  <span className="block pl-4 text-[#71717A]">method: 'POST',</span>
                  <span className="block pl-4 text-[#71717A]">headers: &#123; 'Content-Type': 'application/json' &#125;,</span>
                  <span className="block pl-4 text-[#71717A]">body: JSON.stringify(&#123; retention_hours: 24 &#125;)</span>
                  &#125;);
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
