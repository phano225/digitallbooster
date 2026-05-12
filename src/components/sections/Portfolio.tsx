"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Folder, Code2 } from "lucide-react";

export interface Project {
  title: string;
  category?: string;
  image?: string;
  description?: string;
  tags?: string[];
}

const defaultProjects: Project[] = [
  {
    title: "Bamousso RH Platform",
    category: "SaaS Business",
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
    <section id="portfolio" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-afro-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-afro-orange text-xs font-bold tracking-wider uppercase mb-4">
              <Folder className="w-3 h-3" /> Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-white mb-4">
              Nos Réalisations
            </h2>
            <p className="text-zinc-400">
              Explorez une sélection rigoureuse de nos derniers succès technologiques propulsant la croissance de nos partenaires.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-3 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          >
            Voir tous les projets <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {finalProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              {/* Image Wrapper */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-afro-green transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500">
                      <Code2 className="w-3 h-3 text-afro-orange" /> {tag}
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
