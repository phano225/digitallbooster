"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Smartphone, Globe, Rocket, Terminal } from "lucide-react";
import Link from "next/link";
import { AfroGrid, WakandaLines, HoloCircle } from "../ui/AfroPatterns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} as const;

export interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export default function Hero({ data }: { data?: HeroProps }) {
  const eyebrow = data?.eyebrow || "INGÉNIERIE TECH AFRO-FUTURISTE DE LUXE";
  const title = data?.title || "Bâtissons ensemble l'avenir digital du continent.";
  const subtitle = data?.subtitle || "Digitall Booster fusionne le minimalisme de prestige avec l'audace de l'identité technologique africaine pour façonner vos applications Web, Mobile et plateformes SaaS d'envergure mondiale.";
  const primaryBtn = data?.primaryCtaLabel || "Démarrez l'aventure";
  const secondaryBtn = data?.secondaryCtaLabel || "Explorer nos œuvres";

  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-16 overflow-hidden bg-white">
      {/* Dynamic African Tech grid backdrop */}
      <AfroGrid className="opacity-[0.06]" />

      {/* Cybernetic Wakanda circuit lines */}
      <WakandaLines className="top-12 left-10 w-[300px] h-[300px] text-[#0052FF]" />
      <WakandaLines className="bottom-12 right-10 w-[350px] h-[350px] text-[#FFC700]" />

      {/* Ambient decorative glowing backlights */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-afro-blue/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-afro-gold/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-afro-blue/5 to-afro-blue/10 border border-[#0052FF]/15 rounded-full px-4.5 py-1.5 mb-8 w-fit shadow-[0_4px_15px_rgba(0,82,255,0.02)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-afro-blue animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-afro-blue">
              {eyebrow}
            </span>
          </motion.div>
          
          {/* Luminous Title */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[1.1] mb-6 font-sans"
          >
            {title.includes("l'avenir digital") ? (
              <>
                Bâtissons ensemble <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0052FF] via-blue-600 to-[#FFC700] block mt-1 drop-shadow-sm pb-1">
                  l'avenir digital
                </span>
                du continent.
              </>
            ) : (
              title
            )}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed mb-10 font-sans"
          >
            {subtitle}
          </motion.p>
          
          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4.5 font-bold uppercase tracking-wider text-xs text-white transition-all duration-300 bg-gradient-to-r from-afro-blue to-blue-600 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              {primaryBtn}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="#portfolio" 
              className="inline-flex items-center justify-center px-8 py-4.5 font-bold uppercase tracking-wider text-xs text-zinc-800 transition-all border border-zinc-200 bg-white/50 backdrop-blur-md rounded-full hover:bg-zinc-50 hover:shadow-md active:scale-98 shadow-sm"
            >
              {secondaryBtn}
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Composite - High end Afrofuturistic hologram interface */}
        <motion.div 
          className="lg:col-span-5 relative aspect-square lg:aspect-auto lg:h-[550px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full h-full max-w-[420px] max-h-[420px] flex items-center justify-center">
            
            {/* Spinning mandalas (holograms) */}
            <div className="absolute z-0 scale-110 opacity-70">
              <HoloCircle size={380} />
            </div>
            
            <div className="absolute z-0 scale-75 opacity-90">
              <HoloCircle size={280} />
            </div>

            {/* Floating Premium glass cards (representing product components) */}
            <motion.div 
              className="absolute top-[12%] -right-8 z-20 glass-light p-4.5 rounded-2xl shadow-xl flex items-center gap-4 hover:border-[#0052FF]/30 transition-all duration-300 w-52 tribal-border-glow"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 bg-afro-blue/10 border border-[#0052FF]/15 rounded-xl flex items-center justify-center text-afro-blue shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-black text-xs text-zinc-950 tracking-wide uppercase">Web & PWA</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Svelte / Next.js</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-[42%] -left-12 z-20 glass-light p-4.5 rounded-2xl shadow-xl flex items-center gap-4 hover:border-[#FFC700]/40 transition-all duration-300 w-52 tribal-border-glow"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-10 h-10 bg-afro-gold/10 border border-[#FFC700]/20 rounded-xl flex items-center justify-center text-afro-gold shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-black text-xs text-zinc-950 tracking-wide uppercase">iOS & Android</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Flutter / Swift</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-[8%] right-[-4px] z-20 glass-light p-4.5 rounded-2xl shadow-xl flex items-center gap-4 hover:border-[#0052FF]/30 transition-all duration-300 w-52 tribal-border-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-10 h-10 bg-afro-blue/10 border border-[#0052FF]/15 rounded-xl flex items-center justify-center text-afro-blue shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-black text-xs text-zinc-950 tracking-wide uppercase">SaaS Cloud</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Supabase / Edge</p>
              </div>
            </motion.div>

            {/* Glowing Center Core */}
            <div className="w-[180px] h-[180px] rounded-3xl bg-white border border-[#0052FF]/10 shadow-[0_15px_45px_rgba(0,82,255,0.06)] flex flex-col items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0052FF]/5 to-[#FFC700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-afro-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:rotate-6 transition-transform shadow-lg shadow-blue-500/10 shrink-0">
                DB
              </div>
              <span className="mt-4 font-black tracking-widest text-zinc-950 text-center uppercase text-[10px] font-sans">
                WAKANDA NODE
              </span>
              <span className="text-[7px] tracking-[0.25em] text-afro-blue font-bold uppercase mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
                ONLINE
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
