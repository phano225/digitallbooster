"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#" },
    { name: "Expertises", href: "#services" },
    { name: "Réalisations", href: "#portfolio" },
    { name: "À propos", href: "#about" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
        ? "bg-background/80 backdrop-blur-lg border-white/10 py-3" 
        : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-afro-green to-afro-orange rounded-xl flex items-center justify-center text-black font-black text-lg group-hover:rotate-6 transition-transform">
            DB
          </div>
          <span className="font-bold tracking-widest text-white font-serif">
            DIGITALL BOOSTER
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center bg-white/5 border border-white/5 backdrop-blur-md rounded-full px-2 py-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#contact" className="text-sm font-bold px-6 py-2.5 bg-white text-black rounded-full hover:bg-afro-green transition-colors">
            Parlons de vous
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-zinc-950/95 border-b border-white/10 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-300 border-b border-white/5 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="#contact" className="text-center font-bold py-3 bg-afro-green text-black rounded-xl">
                Prendre contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
