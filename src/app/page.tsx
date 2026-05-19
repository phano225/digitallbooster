import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Expertises from "@/components/sections/Expertises";
import Portfolio from "@/components/sections/Portfolio";
import Loader from "@/components/ui/Loader";
import ThemeInjector from "@/components/ui/ThemeInjector";
import { getSiteContent } from "@/lib/data";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { AfroGrid, TribalDivider } from "@/components/ui/AfroPatterns";

// Configure dynamic fetching so edits show live. 
export const revalidate = 0; 

export default async function Home() {
  // Fetch Data Server-Side Directly from Supabase
  const content = await getSiteContent();

  return (
    <div className="relative w-full bg-white">
      <ThemeInjector theme={content?.theme} />
      {/* Immersive Loading Screen */}
      <Loader />

      <Navbar navigation={content?.navigation} />
      
      {/* Hero section */}
      <Hero data={content?.hero} />

      <TribalDivider color="text-afro-blue/10" />

      {/* Expertises (Services) */}
      <Expertises data={content?.services as any} />

      <TribalDivider color="text-afro-gold/15" />

      {/* Portfolio section */}
      <Portfolio data={content?.portfolio} />

      <TribalDivider color="text-afro-blue/10" />

      {/* Pre-Show Features Grid */}
      <section id="features" className="relative py-28 bg-[#FCFCFD] overflow-hidden">
        {/* Background micro grid */}
        <AfroGrid className="opacity-[0.02]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content?.features?.length ? content.features : [
              {
                icon: "Zap",
                title: "Ultra-Performance",
                desc: "Optimisé pour atteindre 100/100 aux scores Google Core Web Vitals."
              },
              {
                icon: "Shield",
                title: "Sécurité Maximale",
                desc: "Protocoles cloud-native avancés et cryptage de pointe de vos données."
              },
              {
                icon: "Cpu",
                title: "Architecture Moderne",
                desc: "Bâti sur une stack serverless hautement évolutive prête pour l'international."
              }
            ]).map((feat, idx) => {
              const f = feat as { icon?: string; title?: string; desc?: string };
              // Dynamic Icon mapping (Fallback to Zap if not found)
              const LucideIcons: Record<string, React.ElementType> = { Zap, Shield, Cpu };
              const Icon = LucideIcons[f.icon || ""] || Zap;
              
              const colors = [
                { color: "text-afro-blue", bg: "bg-[#0052FF]/5 border-[#0052FF]/10" },
                { color: "text-afro-gold", bg: "bg-[#FFC700]/5 border-[#FFC700]/15" },
                { color: "text-afro-blue", bg: "bg-[#0052FF]/5 border-[#0052FF]/10" }
              ];
              const themeColor = colors[idx % colors.length];

              return (
              <div 
                key={idx} 
                className="group p-8 bg-white border border-zinc-100 rounded-3xl transition-all duration-300 hover:border-[#0052FF]/20 hover:shadow-xl hover:shadow-[#0052FF]/5 tribal-border-glow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${themeColor.bg} mb-6 transform transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${themeColor.color}`} />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 mb-3 font-sans group-hover:text-afro-blue transition-colors">
                  {f.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-sans">{f.desc}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      <TribalDivider color="text-afro-gold/15" />

      {/* Footer / Call to action teaser */}
      <section id="contact" className="py-32 flex items-center justify-center text-center px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-afro-blue/5 pointer-events-none" />
        
        {/* Soft glowing backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-afro-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-afro-blue/5 to-afro-blue/10 border border-[#0052FF]/10 text-afro-blue text-[10px] font-black tracking-[0.18em] uppercase mb-8 shadow-sm">
            {content?.cta?.title || "Prêt à Décoller"}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-zinc-950 font-sans tracking-tight leading-tight">
            Prêt à faire décoller <br />votre vision ?
          </h2>
          
          <p className="text-zinc-500 mb-10 text-base md:text-lg leading-relaxed font-sans max-w-lg mx-auto">
            {content?.cta?.subtitle || "Faites appel à l'excellence technologique de Digitall Booster et obtenez une solution digitale de luxe qui transforme votre croissance."}
          </p>
          
          <button className="px-8 py-4.5 rounded-full bg-gradient-to-r from-afro-blue to-blue-600 text-white text-xs font-black uppercase tracking-wider hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-blue-500/10">
            {content?.cta?.buttonLabel || "Démarrer un projet"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer navigation={content?.navigation} />
    </div>
  );
}
