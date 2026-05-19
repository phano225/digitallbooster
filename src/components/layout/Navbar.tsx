"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  navigation?: Array<{ label: string; href: string }>;
}

export default function Navbar({ navigation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = navigation && navigation.length > 0 
    ? navigation.map(n => ({ name: n.label, href: n.href }))
    : [
        { name: "Accueil", href: "#" },
        { name: "Expertises", href: "#services" },
        { name: "Réalisations", href: "#portfolio" },
      ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
        ? "bg-white/70 backdrop-blur-xl border-b border-[#0052FF]/10 py-3 shadow-[0_4px_30px_rgba(0,82,255,0.03)]" 
        : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group relative">
          <div className="relative w-10 h-10 bg-white border border-[#0052FF]/15 rounded-xl flex items-center justify-center text-black font-black text-lg group-hover:rotate-6 transition-transform shadow-lg shadow-[#0052FF]/5 overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0052FF]/5 to-[#FFC700]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-950 via-afro-blue to-afro-blue-dark">
              DB
            </span>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-afro-gold rounded-full border border-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-[0.2em] text-zinc-950 font-serif text-sm">
              DIGITALL BOOSTER
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#0052FF] font-bold uppercase">
              AFRO-FUTURIST TECH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center bg-white/40 border border-[#0052FF]/10 backdrop-blur-md rounded-full px-2 py-1 shadow-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-full hover:bg-[#0052FF]/5 relative group ${
                link.href === "/admin" 
                ? "text-afro-blue hover:text-afro-blue-dark flex items-center gap-1.5" 
                : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {link.href === "/admin" && <ShieldCheck className="w-3.5 h-3.5" />}
              {link.name}
              
              {/* Dynamic hover bottom line */}
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#0052FF] group-hover:w-1/3 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="#contact" 
            className="text-xs uppercase tracking-wider font-black px-6 py-3 bg-gradient-to-r from-afro-blue to-blue-600 text-white rounded-full hover:shadow-[0_0_20px_rgba(0,82,255,0.3)] transition-all flex items-center gap-2 group transform active:scale-95 shadow-lg shadow-blue-500/10"
          >
            Parlons de vous
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-zinc-800 bg-white border border-[#0052FF]/10 rounded-xl hover:bg-zinc-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white/95 border-b border-[#0052FF]/10 backdrop-blur-xl md:hidden shadow-xl"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider pb-2 border-b border-zinc-100 flex items-center gap-2 ${
                    link.href === "/admin" 
                    ? "text-afro-blue" 
                    : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {link.href === "/admin" && <ShieldCheck className="w-4 h-4" />}
                  {link.name}
                </Link>
              ))}
              <Link 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-xs font-black uppercase tracking-wider py-3.5 bg-gradient-to-r from-afro-blue to-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20"
              >
                Prendre contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
