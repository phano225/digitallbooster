window.DIGITALL_STORAGE_KEY = "digitall-booster-content-v2";

window.DIGITALL_DEFAULT_CONTENT = {
  storage: {
    provider: "local",
    cloudinary: {
      cloudName: "",
      uploadPreset: "",
      folder: "digitall-booster"
    }
  },
  branding: {
    name: "Digitall Booster",
    logo: "",
    homeUrl: "#"
  },
  navigation: {
    links: [
      { label: "Expertises", url: "#services" },
      { label: "Portfolio", url: "#portfolio" },
      { label: "Contact", url: "#contact" }
    ],
    cmsLabel: "Espace Client",
    cmsUrl: "./admin-login.html",
    footerCmsLabel: "Dashboard CMS",
    footerCmsUrl: "./admin-login.html"
  },
  theme: {
    bg: "#f4f6f9",
    text: "#212529",
    muted: "#6c757d",
    primary: "#0056b3",
    primaryDark: "#004085",
    accent: "#0d6efd",
    glass: "rgba(255, 255, 255, 0.85)",
    bgGrad1: "#e9ecef",
    bgGrad2: "#dee2e6",
    blob1: "#cce5ff",
    blob2: "#b8daff"
  },
  hero: {
    eyebrow: "Agence de Développement",
    title: "Créons ensemble vos applications Web et Mobiles",
    subtitle:
      "De la conception à la mise en production, notre équipe d'experts développe des solutions digitales sur-mesure pour accélérer votre croissance.",
    primaryCtaLabel: "Démarrer un projet",
    primaryCtaUrl: "#contact",
    secondaryCtaLabel: "Nos Réalisations",
    secondaryCtaUrl: "#portfolio",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  },
  services: [
    {
      icon: "💻",
      title: "Développement Web",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      points: ["Sites Vitrines", "Applications SaaS", "Plateformes E-commerce"]
    },
    {
      icon: "📱",
      title: "Applications Mobiles",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
      points: ["Développement iOS", "Développement Android", "Apps React Native / Flutter"]
    },
    {
      icon: "🎨",
      title: "UI / UX Design",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      points: ["Maquettes interactives", "Parcours utilisateurs", "Identité visuelle"]
    },
    {
      icon: "⚙️",
      title: "Maintenance & DevOps",
      mediaType: "image",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      points: ["Hébergement Cloud", "Mise à jour sécurisée", "Intégration continue"]
    }
  ],
  portfolio: [
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80",
      title: "Application E-commerce B2B",
      description: "Plateforme complète de gestion de commandes avec application mobile Android."
    },
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      title: "Dashboard d'Analyse Financière",
      description: "Application Web React.js pour le suivi et la visualisation de données en temps réel."
    },
    {
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      title: "Application iOS de Réservation",
      description: "Application native iOS (Swift) pour un service de conciergerie de luxe."
    }
  ],
  contact: {
    title: "Parlons de votre projet de développement",
    text: "Nous accompagnons startups et entreprises dans la réalisation de leurs produits technologiques.",
    phone: "+225 07 07 07 07 07",
    email: "contact@digitallbooster.com",
    website: "www.digitallbooster.com",
    address: "Abidjan, Côte d'Ivoire"
  },
  footerText: "DIGITALL BOOSTER - VOTRE PARTENAIRE TECHNOLOGIQUE POUR DES APPLICATIONS PERFORMANTES."
};
