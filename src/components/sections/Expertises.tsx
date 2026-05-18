"use client";

import { motion } from "framer-motion";
import { Laptop, Smartphone, Zap, Layers, CheckCircle2, LucideIcon } from "lucide-react";
import { AfroGrid } from "../ui/AfroPatterns";

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
    description: "Création de sites web vitrines et e-commerce sur-mesure, ultra-rapides, sécurisés et optimisés pour le référencement naturel (SEO).",
    color: "text-afro-blue",
    bg: "bg-[#0052FF]/5 border border-[#0052FF]/10",
    points: ["Design Unique (UI/UX)", "Solutions E-commerce", "Optimisation SEO"]
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles Native & Cross",
    description: "Conception d'applications iOS et Android fluides et performantes pour rapprocher votre entreprise de vos clients au quotidien.",
    color: "text-afro-gold",
    bg: "bg-[#FFC700]/5 border border-[#FFC700]/15",
    points: ["iOS & Android", "Flutter & React Native", "Notifications Push"]
  },
  {
    icon: Zap,
    title: "Progressive Web Apps (PWA)",
    description: "Le meilleur du web et du mobile combinés. Des applications accessibles sans téléchargement, fonctionnant même hors-connexion.",
    color: "text-afro-blue",
    bg: "bg-[#0052FF]/5 border border-[#0052FF]/10",
    points: ["Chargement éclair", "Utilisable hors-ligne", "Léger & Économique"]
  },
  {
    icon: Layers,
    title: "Solutions SaaS & ERP/CRM",
    description: "Automatisez vos processus métiers avec des progiciels de gestion intégrés et des plateformes Cloud scalables et sur-mesure.",
    color: "text-afro-gold",
    bg: "bg-[#FFC700]/5 border border-[#FFC700]/15",
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
    transition: { staggerChildren: 0.1 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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
    <section id="services" className="py-28 relative bg-[#FCFCFD] overflow-hidden border-t border-zinc-100">
      {/* Decorative patterns */}
      <AfroGrid className="opacity-[0.03]" />
      
      {/* Glowing decor */}
      <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-afro-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-afro-blue/5 to-afro-blue/10 border border-[#0052FF]/10 text-afro-blue text-[10px] font-black tracking-[0.18em] uppercase mb-6"
          >
            Nos Savoir-Faire
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-zinc-950 mb-6 leading-tight font-sans"
          >
            Ingénierie Digitale pour{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0052FF] to-blue-700">
              Propulser votre Vision
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-base md:text-lg leading-relaxed font-sans"
          >
            Notre équipe de passionnés conçoit des architectures technologiques robustes et esthétiques pour relever vos défis business les plus audacieux.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {finalServices.map((service, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group p-8 md:p-10 bg-white border border-zinc-100 rounded-3xl flex flex-col md:flex-row items-start gap-8 hover:border-[#0052FF]/20 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#0052FF]/5 tribal-border-glow"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0052FF]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className={`shrink-0 w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 relative z-10">
                <h3 className="text-xl font-bold text-zinc-950 mb-3 font-sans group-hover:text-[#0052FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
                
                {/* Checklist points */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-50 pt-5">
                  {service.points?.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-wider font-sans">
                      <CheckCircle2 className="w-4 h-4 text-afro-blue shrink-0 opacity-80" />
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
