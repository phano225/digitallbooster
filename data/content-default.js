window.DIGITALL_STORAGE_KEY = "digitall-booster-content-v3";

window.DIGITALL_DEFAULT_CONTENT = {
  storage: {
    provider: "local",
    cloudinary: { cloudName: "", uploadPreset: "", folder: "digitall-booster" }
  },
  branding: {
    name: "Digitall Booster",
    logo: "",
    homeUrl: "#"
  },
  navigation: {
    links: [
      { label: "Accueil", url: "#accueil" },
      { label: "Notre Histoire", url: "#story" },
      { label: "Expertises", url: "#services" },
      { label: "Réalisations", url: "#portfolio" },
      { label: "Contact", url: "#contact" }
    ],
    cmsLabel: "Commencer un projet",
    cmsUrl: "#contact",
    footerCmsLabel: "Dashboard CMS",
    footerCmsUrl: "./admin-login.html"
  },
  theme: {
    bg: "#070707",
    text: "#FAF9F6",
    muted: "rgba(250,249,246,0.5)",
    primary: "#00C853",
    primaryDark: "#1B5E20",
    accent: "#FF9800",
    glass: "rgba(255,255,255,0.05)",
    bgGrad1: "#0d0d0d",
    bgGrad2: "#111111",
    blob1: "rgba(0,200,83,0.15)",
    blob2: "rgba(255,152,0,0.15)"
  },
  hero: {
    eyebrow: "Startup Africaine",
    title: "Créons ensemble vos solutions digitales",
    subtitle: "De la conception à la mise en production, notre équipe d'experts développe des applications web et mobiles sur-mesure pour accélérer votre croissance.",
    primaryCtaLabel: "Commencer un projet",
    primaryCtaUrl: "#contact",
    secondaryCtaLabel: "Voir nos réalisations",
    secondaryCtaUrl: "#portfolio",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    bullets: []
  },
  story: {
    title: "Une vision née en Afrique, tournée vers le monde",
    vision: "Digitall Booster est une startup technologique africaine fondée avec la conviction que l'innovation digitale peut transformer les entreprises et les vies sur le continent et au-delà.",
    mission: "Notre mission : rendre accessible des solutions technologiques de classe mondiale aux entreprises africaines et internationales, en combinant créativité, expertise technique et compréhension profonde des marchés locaux.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { year: "2023", title: "Naissance de l'idée", description: "Création du concept Digitall Booster à Abidjan avec une vision panafricaine." },
      { year: "2024", title: "Premiers projets", description: "Réalisation de nos premières applications web et mobiles pour des clients locaux." },
      { year: "2025", title: "Expansion", description: "Développement de solutions SaaS et MVP pour des startups internationales." }
    ]
  },
  services: [
    {
      icon: "💻",
      title: "Développement de site internet",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      points: ["Sites Vitrines", "Plateformes E-commerce", "Portails sur-mesure"]
    },
    {
      icon: "📱",
      title: "Applications Android et iOS",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
      points: ["Développement iOS", "Développement Android", "Apps React Native / Flutter"]
    },
    {
      icon: "🚀",
      title: "Progressive Web Apps (PWA)",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      points: ["Performances optimales", "Installation mobile", "Mode hors-ligne"]
    },
    {
      icon: "⚙️",
      title: "SaaS & MVP",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      points: ["Architecture Cloud", "Minimum Viable Product", "Scalabilité garantie"]
    }
  ],
  portfolio: [
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80",
      title: "Application E-commerce B2B",
      description: "Plateforme complète de gestion de commandes avec application mobile Android.",
      category: "Web",
      technologies: ["React", "Node.js", "PostgreSQL"]
    },
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      title: "Dashboard Analytique",
      description: "Application Web React.js pour le suivi et la visualisation de données en temps réel.",
      category: "SaaS",
      technologies: ["React", "D3.js", "Supabase"]
    },
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      title: "Application iOS de Réservation",
      description: "Application native iOS (Swift) pour un service de conciergerie.",
      category: "Mobile",
      technologies: ["Swift", "Firebase", "Stripe"]
    }
  ],
  contact: {
    title: "Parlons de votre projet",
    text: "Nous accompagnons startups et entreprises dans la réalisation de leurs produits technologiques.",
    phone: "+225 07 07 07 07 07",
    email: "contact@digitallbooster.com",
    website: "www.digitallbooster.com",
    address: "Abidjan, Côte d'Ivoire"
  },
  whatsapp: {
    enabled: true,
    number: "2250707070707",
    message: "Bonjour ! Je suis intéressé par vos services.",
    position: "right"
  },
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: ""
  },
  footerText: "DIGITALL BOOSTER — VOTRE PARTENAIRE TECHNOLOGIQUE POUR DES APPLICATIONS PERFORMANTES."
};
