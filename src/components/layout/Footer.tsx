"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send, Globe, Share2, ShieldCheck } from "lucide-react";
import { AfroGrid, TribalDivider } from "../ui/AfroPatterns";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#0052FF]/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background elegant pattern */}
      <AfroGrid className="opacity-[0.03]" />

      {/* Decorative Tribal Chevron divider at the very top */}
      <div className="absolute top-0 left-0 w-full">
        <TribalDivider color="text-afro-blue/10" />
      </div>

      {/* Soft backlighting */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-afro-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center space-x-3 group relative">
              <div className="w-10 h-10 bg-white border border-[#0052FF]/15 rounded-xl flex items-center justify-center text-black font-black text-lg group-hover:rotate-6 transition-transform shadow-md">
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
            
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-sans">
              Startup technologique panafricaine spécialisée dans l'ingénierie digitale de luxe. Nous bâtissons les infrastructures de l'Afrique de demain.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Share2, Globe, Share2].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-9 h-9 rounded-xl border border-zinc-200 bg-white/40 flex items-center justify-center text-zinc-500 hover:text-afro-blue hover:border-[#0052FF]/30 hover:shadow-lg hover:shadow-[#0052FF]/5 hover:-translate-y-1 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-zinc-950 font-black mb-6 text-xs tracking-[0.15em] uppercase font-sans">
              Plan du Site
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Accueil", href: "#" },
                { name: "Expertises", href: "#services" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Console Administration", href: "/admin" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`text-zinc-500 hover:text-zinc-950 transition-colors text-sm inline-flex items-center group font-bold ${
                      link.href === "/admin" ? "text-afro-blue" : ""
                    }`}
                  >
                    <span className="w-0 h-[1.5px] bg-[#0052FF] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.href === "/admin" && <ShieldCheck className="w-4 h-4 mr-1.5 shrink-0" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-zinc-950 font-black mb-6 text-xs tracking-[0.15em] uppercase font-sans">
              Nous Trouver
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-afro-blue shrink-0 mt-0.5" />
                <span className="text-zinc-500 text-sm font-sans leading-relaxed">
                  Cocody, Abidjan<br />Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-afro-blue shrink-0" />
                <span className="text-zinc-500 text-sm font-sans">+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-afro-blue shrink-0" />
                <span className="text-zinc-500 text-sm font-sans">contact@digitallbooster.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-zinc-950 font-black mb-6 text-xs tracking-[0.15em] uppercase font-sans">
              S'abonner
            </h4>
            <p className="text-zinc-500 text-sm mb-4 font-sans leading-relaxed">
              Restez à l'affût des dernières innovations technologiques afro-futuristes.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Votre e-mail" 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 transition-colors pr-12 font-sans"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-r from-afro-blue to-blue-600 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#0052FF]/20 transition-all">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-sans">
          <p>© {currentYear} Digitall Booster. Conçu pour le futur du continent.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-800 transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-zinc-800 transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
