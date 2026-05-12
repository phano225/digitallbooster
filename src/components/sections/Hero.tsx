"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Smartphone, Globe, Rocket } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
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
  const eyebrow = data?.eyebrow || "L'excellence technologique africaine";
  const title = data?.title || "Concevons vos futurs Chef-d'œuvre digitaux.";
  const subtitle = data?.subtitle || "Digitall Booster fusionne l'audace de l'Afro-Futurisme avec les technologies de pointe pour bâtir vos Applications Web, Mobiles et Solutions SaaS de classe mondiale.";
  const primaryBtn = data?.primaryCtaLabel || "Lancez votre projet";
  const secondaryBtn = data?.secondaryCtaLabel || "Nos réalisations";

  // Split text to identify last few words for gradient manually or keep full title support
  const mainTitle = title.replace("Chef-d'œuvre digitaux.", "");

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/5 border border-afro-green/30 rounded-full px-4 py-1.5 mb-8 w-fit backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-afro-green" />
            <span className="text-xs font-bold uppercase tracking-wider text-afro-green">
              {eyebrow}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl font-black font-serif tracking-tight text-white leading-[1.1] mb-6"
          >
            {mainTitle}
            <span className="text-gradient block mt-2">
              Chef-d'œuvre digitaux.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-10 font-sans"
          >
            {subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-gradient-to-r from-afro-green to-emerald-500 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:outline-none overflow-hidden transform active:scale-95">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 -translate-x-full bg-white/20 group-hover:translate-x-0 ease"></span>
              {primaryBtn}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all border border-white/10 rounded-full hover:bg-white/5 backdrop-blur-sm">
              {secondaryBtn}
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Composite */}
        <motion.div 
          className="lg:col-span-5 relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <div className="relative w-full h-full max-w-md max-h-md mx-auto group perspective-1000">
            {/* Floating Abstract Cards representing Tech stacks */}
            <motion.div 
              className="absolute top-[10%] -right-4 z-20 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:border-afro-green/50 transition-colors"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 bg-afro-green/20 rounded-xl flex items-center justify-center text-afro-green">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Web & PWA</h4>
                <p className="text-xs text-zinc-500">React / Next.js</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-[40%] -left-8 z-20 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:border-afro-orange/50 transition-colors"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-afro-orange/20 rounded-xl flex items-center justify-center text-afro-orange">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">iOS & Android</h4>
                <p className="text-xs text-zinc-500">Flutter / Native</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-[15%] right-0 z-20 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:border-afro-gold/50 transition-colors"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-12 h-12 bg-afro-gold/20 rounded-xl flex items-center justify-center text-afro-gold">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Startup SaaS</h4>
                <p className="text-xs text-zinc-500">Supabase / Cloud</p>
              </div>
            </motion.div>

            {/* Center Main Graphic / Image Box */}
            <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-white/5 overflow-hidden glow-subtle transform group-hover:scale-[1.02] transition-transform duration-500 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80"></div>
              {/* Ambient circle inside */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-afro-green/20 blur-[60px]"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
