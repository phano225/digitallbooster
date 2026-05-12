import Link from "next/link";
import { Mail, Phone, MapPin, Send, Globe, Share2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      {/* Ambient Light effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-afro-green/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-afro-green to-afro-orange rounded-xl flex items-center justify-center text-black font-black text-lg">
                DB
              </div>
              <span className="font-bold tracking-widest text-white font-serif text-xl">
                DIGITALL BOOSTER
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Startup technologique panafricaine spécialisée dans l'ingénierie digitale haut de gamme. Nous construisons le futur technologique du continent.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Share2, Globe, Share2].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-afro-green hover:border-afro-green/50 transition-all hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Plan du Site</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Accueil", href: "#" },
                { name: "Expertises", href: "#services" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Notre Histoire", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-zinc-500 hover:text-white transition-colors text-sm inline-flex items-center group">
                    <span className="w-0 h-[1px] bg-afro-green group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Nous Trouver</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-afro-green shrink-0 mt-0.5" />
                <span className="text-zinc-500 text-sm">
                  Cocody, Abidjan<br />Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-afro-green shrink-0" />
                <span className="text-zinc-500 text-sm">+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-afro-green shrink-0" />
                <span className="text-zinc-500 text-sm">contact@digitallbooster.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">S'abonner</h4>
            <p className="text-zinc-500 text-sm mb-4">Restez à l'affût des dernières innovations tech.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Votre e-mail" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-afro-green/50 transition-colors pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-afro-green rounded-lg flex items-center justify-center text-black hover:bg-emerald-400 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {currentYear} Digitall Booster. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
