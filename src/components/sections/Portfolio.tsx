"use client";

import { motion } from "framer-motion";
import { ExternalLink, Folder, Code2 } from "lucide-react";
import { AfroGrid } from "../ui/AfroPatterns";

export interface Project {
  title: string;
  category?: string;
  image?: string;
  description?: string;
  tags?: string[];
}

export const defaultProjects: Project[] = [
  {
    title: "Bamousso RH Platform",
    category: "SaaS Enterprise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Suite complète de gestion des ressources humaines avec dashboard temps réel et notifications mobiles.",
    tags: ["Next.js", "Supabase", "Node.js"]
  },
  {
    title: "Fidelis FinTech",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    description: "Application financière sécurisée facilitant les paiements et le suivi budgétaire pour particuliers.",
    tags: ["Flutter", "Firebase", "Dart"]
  },
  {
    title: "E-Shop Africa",
    category: "E-Commerce PWA",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    description: "Portail d'achats en ligne optimisé pour les connexions lentes avec mode hors-ligne PWA.",
    tags: ["React", "Stripe", "Vercel"]
  },
  {
    title: "Connect Immo",
    category: "Plateforme Web",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    description: "Marketplace immobilière mettant en relation propriétaires et locataires avec visites virtuelles.",
    tags: ["Typescript", "Postgres", "Tailwind"]
  }
];

export default function Portfolio({ data }: { data?: Project[] }) {
  const finalProjects = data && data.length > 0 ? data : defaultProjects;

  return (
    <section id="portfolio" className="py-28 bg-white relative overflow-hidden border-t border-zinc-100">
      {/* Background design */}
      <AfroGrid className="opacity-[0.03]" />

      {/* Ambient decorative glowing backlights */}
      <div className="absolute top-1/3 right-[-10%] w-[450px] h-[450px] bg-afro-gold/4 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-5%] w-[400px] h-[400px] bg-afro-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-afro-gold/10 to-afro-gold/15 border border-[#FFC700]/20 text-zinc-800 text-[10px] font-black tracking-[0.18em] uppercase mb-6 shadow-sm">
              <Folder className="w-3.5 h-3.5 text-afro-blue" /> Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 mb-6 leading-tight font-sans">
              Nos Chefs-d'œuvre
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed">
              Découvrez une sélection rigoureuse de nos dernières réussites technologiques façonnées pour propulser l'excellence opérationnelle et commerciale de nos partenaires.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-3.5 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-md text-zinc-950 font-bold uppercase tracking-wider text-xs hover:bg-zinc-50 hover:border-zinc-300 transition-all inline-flex items-center gap-2 shadow-sm"
          >
            Voir toutes les réalisations <ExternalLink className="w-3.5 h-3.5 text-afro-blue" />
          </motion.button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {finalProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white border border-zinc-100 rounded-3xl overflow-hidden transition-all hover:border-[#0052FF]/20 hover:shadow-xl hover:shadow-[#0052FF]/5 tribal-border-glow flex flex-col h-full"
            >
              {/* Image Wrapper */}
              <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-103"
                />
                
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-900 shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-xl font-bold text-zinc-950 font-sans group-hover:text-afro-blue transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-afro-blue group-hover:border-[#0052FF]/20 group-hover:bg-[#0052FF]/5 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-sans flex-1 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-zinc-50 shrink-0">
                  {project.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">
                      <Code2 className="w-3.5 h-3.5 text-afro-blue opacity-70" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
