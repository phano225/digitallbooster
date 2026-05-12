"use client";

import { motion } from "framer-motion";
import { Laptop, Smartphone, Zap, Layers, CheckCircle2, LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon?: string | LucideIcon;
  title?: string;
  description?: string;
  color?: string;
  bg?: string;
  points?: string[];
}

const defaultServices = [
  {
    icon: Laptop,
    title: "Développement Web & E-Commerce",
    description: "Création de sites web vitrines et e-commerce sur-mesure, rapides, sécurisés et optimisés pour le référencement naturel (SEO).",
    color: "text-afro-green",
    bg: "bg-emerald-500/10",
    points: ["Design Unique (UI/UX)", "Solutions E-commerce", "Optimisation SEO"]
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles Native & Cross",
    description: "Conception d'applications iOS et Android fluides et performantes pour rapprocher votre entreprise de vos clients au quotidien.",
    color: "text-afro-orange",
    bg: "bg-orange-500/10",
    points: ["iOS & Android", "Flutter & React Native", "Notifications Push"]
  },
  {
    icon: Zap,
    title: "Progressive Web Apps (PWA)",
    description: "Le meilleur du web et du mobile combinés. Des applications accessibles sans téléchargement, fonctionnant même hors-connexion.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    points: ["Temps de chargement éclair", "Utilisable hors-ligne", "Léger & Économique"]
  },
  {
    icon: Layers,
    title: "Solutions SaaS & ERP/CRM",
    description: "Automatisez vos processus métiers avec des progiciels de gestion intégrés et des plateformes Cloud scalables et sur-mesure.",
    color: "text-afro-gold",
    bg: "bg-yellow-500/10",
    points: ["Dashboards d'analyse", "Automatisation Workflow", "Architecture Cloud"]
  }
];

const iconMap: Record<string, LucideIcon> = {
  Laptop, Smartphone, Zap, Layers
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
} as const;

export default function Expertises({ data }: { data?: ServiceItem[] }) {
  const finalServices = (data && data.length > 0 ? data : defaultServices).map((s, idx) => {
    const fallback = defaultServices[idx] || defaultServices[0];
    return {
      ...fallback,
      ...s,
      icon: typeof s.icon === 'string' ? (iconMap[s.icon] || fallback.icon) : (s.icon || fallback.icon)
    };
  });
  return (
    <section id="services" className="py-24 relative bg-black overflow-hidden">
      {/* Glow decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-afro-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-afro-green text-xs font-bold tracking-wider uppercase mb-4"
          >
            Nos Savoir-Faire
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black font-serif text-white mb-6 leading-tight"
          >
            Ingénierie Digitale pour{" "}
            <span className="text-gradient">Propulser votre Vision</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg"
          >
            Notre équipe de passionnés conçoit des architectures robustes et esthétiques pour répondre à vos défis technologiques les plus complexes.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8"
        >
          {finalServices.map((service, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group p-8 md:p-10 bg-surface border border-white/5 rounded-3xl flex flex-col md:flex-row items-start gap-6 hover:border-white/10 transition-all duration-300 relative overflow-hidden hover:shadow-2xl hover:shadow-black"
            >
              {/* Background subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon with styled backing */}
              <div className={`shrink-0 w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Checklist points */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                      <CheckCircle2 className={`w-4 h-4 ${service.color} opacity-70`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
