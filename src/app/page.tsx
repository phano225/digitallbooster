import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Expertises from "@/components/sections/Expertises";
import Portfolio from "@/components/sections/Portfolio";
import { getSiteContent } from "@/lib/data";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";

// Configure dynamic fetching so edits show live. 
export const revalidate = 0; 

export default async function Home() {
  // 1. Fetch Data Server-Side Directly from Supabase
  const content = await getSiteContent();

  return (
    <div className="relative w-full">
      <Navbar />
      
      {/* Pass dynamic content to Hero with graceful fallbacks baked in */}
      <Hero data={content?.hero} />

      {/* Inject live dynamic expertises */}
      <Expertises data={content?.services as any} />

      {/* Feed Supabase list straight to dynamic Portfolio */}
      <Portfolio data={content?.portfolio} />

      {/* Pre-Show Features Grid */}
      <section id="features" className="relative py-20 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Ultra-Performance",
                desc: "Optimisé pour atteindre 100/100 aux scores Core Web Vitals.",
                color: "text-afro-green"
              },
              {
                icon: Shield,
                title: "Sécurité Maximale",
                desc: "Protocoles cloud-native avancés protégeant vos données sensibles.",
                color: "text-afro-orange"
              },
              {
                icon: Cpu,
                title: "Architecture Moderne",
                desc: "Bâti sur une stack Server-side évolutive prête pour l'international.",
                color: "text-afro-gold"
              }
            ].map((feat, idx) => (
              <div key={idx} className="group p-8 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/[0.08] hover:border-white/20">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 mb-6 ${feat.color}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Call to action teaser */}
      <section className="py-24 flex items-center justify-center text-center px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-afro-green/5 to-transparent pointer-events-none"></div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black font-serif mb-6 text-white">
            Prêt à faire décoller votre projet ?
          </h2>
          <p className="text-zinc-400 mb-10 text-lg">
            Faites appel à l'expertise Digitall Booster et obtenez une solution digitale premium qui transforme votre business.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-afro-green transition-colors flex items-center gap-2 mx-auto">
            Démarrez l'aventure <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
