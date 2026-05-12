(function bootstrapLandingPage() {
  const SERVICE_IMAGE_FALLBACKS = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  ];

  function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }

  function mergeContent(raw) {
    const d = structuredClone(window.DIGITALL_DEFAULT_CONTENT);
    if (!raw || typeof raw !== "object") return d;
    return {
      ...d,
      ...raw,
      branding: { ...d.branding, ...(raw.branding || {}) },
      navigation: { ...d.navigation, ...(raw.navigation || {}) },
      theme: { ...d.theme, ...(raw.theme || {}) },
      hero: { ...d.hero, ...(raw.hero || {}) },
      contact: { ...d.contact, ...(raw.contact || {}) },
      story: { ...d.story, ...(raw.story || {}) },
      whatsapp: { ...d.whatsapp, ...(raw.whatsapp || {}) },
      socials: { ...d.socials, ...(raw.socials || {}) },
      // Force overwrite arrays explicitly from remote
      services: Array.isArray(raw.services) && raw.services.length > 0 ? raw.services : d.services,
      portfolio: Array.isArray(raw.portfolio) && raw.portfolio.length > 0 ? raw.portfolio : d.portfolio
    };
  }

  function applyTheme(c) {
    const r = document.documentElement;
    const t = c.theme || {};
    if (t.bg) r.style.setProperty('--black', t.bg);
    if (t.primary) r.style.setProperty('--green', t.primary);
    if (t.accent) r.style.setProperty('--orange', t.accent);
    document.body.style.backgroundColor = t.bg || "#070707";
    document.body.style.color = t.text || "#FAF9F6";
  }

  async function getContent() {
    // Force Clear Legacy Local Storages just in case
    localStorage.removeItem("digitall-booster-content-v1");
    localStorage.removeItem("digitall-booster-content-v2");

    if (window.CMS_API) {
      try {
        const loaded = await window.CMS_API.loadContent(window.DIGITALL_DEFAULT_CONTENT);
        return mergeContent(loaded);
      } catch(e) { console.error("CMS Error", e); }
    }
    const raw = localStorage.getItem(window.DIGITALL_STORAGE_KEY);
    return raw ? mergeContent(safeParse(raw)) : structuredClone(window.DIGITALL_DEFAULT_CONTENT);
  }

  function $(id) { return document.getElementById(id); }
  function fillText(id, v) { const el = $(id); if (el) el.textContent = v || ""; }
  function fillLink(id, label, url) { const el = $(id); if (!el) return; el.textContent = label || ""; el.setAttribute("href", url || "#"); }
  function fillImage(id, src) { const el = $(id); if (el && src) el.setAttribute("src", src); }

  function applyBranding(c) {
    fillText("brandName", c.branding.name);
    const homeLink = $("brandHomeLink");
    if (homeLink) homeLink.setAttribute("href", c.branding.homeUrl || "#");
    const logo = $("brandLogo"), mark = $("brandMark");
    if (logo && mark) {
      if (c.branding.logo) { logo.src = c.branding.logo; logo.style.display = "block"; mark.style.display = "none"; }
      else { logo.style.display = "none"; mark.style.display = "grid"; }
    }
  }

  function applyNavigation(c) {
    const links = c.navigation.links || [];
    for (let i = 0; i < 5; i++) {
      fillLink("navLink" + (i + 1), links[i]?.label, links[i]?.url);
    }
    fillLink("navCmsButton", c.navigation.cmsLabel, c.navigation.cmsUrl);
    fillLink("footerCmsButton", c.navigation.footerCmsLabel, c.navigation.footerCmsUrl);
  }

  function renderHero(c) {
    fillText("heroEyebrow", c.hero.eyebrow);
    fillText("heroTitle", c.hero.title);
    fillText("heroSubtitle", c.hero.subtitle);
    fillLink("primaryCta", c.hero.primaryCtaLabel, c.hero.primaryCtaUrl);
    fillLink("secondaryCta", c.hero.secondaryCtaLabel, c.hero.secondaryCtaUrl);
    fillImage("heroMainImage", c.hero.image);
  }

  function renderStory(c) {
    const story = c.story || {};
    fillText("storyTitle", story.title);
    fillText("storyVision", story.vision);
    fillText("storyMission", story.mission);
    fillImage("storyImg", story.image);
    const host = $("timeline");
    if (!host) return;
    host.innerHTML = "";
    (story.timeline || []).forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "timeline-item animate-on-scroll";
      div.style.transitionDelay = `${i * 0.15}s`;
      div.innerHTML = `<h4>${item.year || ""} — ${item.title || ""}</h4><p>${item.description || ""}</p>`;
      host.appendChild(div);
    });
  }

  function createServiceMedia(service, index) {
    const media = document.createElement("div");
    media.className = "service-media";
    const url = service.image || SERVICE_IMAGE_FALLBACKS[index % SERVICE_IMAGE_FALLBACKS.length];
    if (service.mediaType === "video") {
      const v = document.createElement("video");
      v.className = "service-image"; v.src = url; v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
      media.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.className = "service-image"; img.src = url; img.alt = service.title || "Service";
      media.appendChild(img);
    }
    const icon = document.createElement("span");
    icon.className = "service-icon"; icon.textContent = service.icon || "💻";
    media.appendChild(icon);
    return media;
  }

  function renderServices(c) {
    const host = $("serviceGrid");
    if (!host) return;
    host.innerHTML = "";
    (c.services || []).forEach((s, i) => {
      const card = document.createElement("article");
      card.className = "service-card animate-on-scroll";
      card.style.transitionDelay = `${i * 0.1}s`;
      const title = document.createElement("h3");
      title.textContent = s.title || "";
      const points = Array.isArray(s.points) ? s.points : [];
      card.appendChild(createServiceMedia(s, i));
      card.appendChild(title);
      if (points.length > 0) {
        const ul = document.createElement("ul");
        ul.className = "service-points";
        points.forEach(p => { const li = document.createElement("li"); li.textContent = p; ul.appendChild(li); });
        card.appendChild(ul);
      }
      host.appendChild(card);
    });
  }

  function renderPortfolio(c) {
    const host = $("portfolioGrid");
    const filtersHost = $("portfolioFilters");
    if (!host) return;
    host.innerHTML = "";
    const items = c.portfolio || [];

    // Filters
    if (filtersHost) {
      filtersHost.innerHTML = "";
      const cats = ["Tous", ...new Set(items.map(i => i.category).filter(Boolean))];
      cats.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        if (cat === "Tous") btn.classList.add("active");
        btn.addEventListener("click", () => {
          filtersHost.querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          host.querySelectorAll(".portfolio-card").forEach(card => {
            card.style.display = (cat === "Tous" || card.dataset.category === cat) ? "" : "none";
          });
        });
        filtersHost.appendChild(btn);
      });
    }

    items.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "portfolio-card animate-on-scroll";
      card.style.transitionDelay = `${i * 0.1}s`;
      card.dataset.category = item.category || "";

      const media = document.createElement("div");
      media.className = "portfolio-media";
      if (item.type === "video") {
        const v = document.createElement("video");
        v.src = item.mediaUrl; v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
        media.appendChild(v);
      } else {
        const img = document.createElement("img");
        img.src = item.mediaUrl; img.alt = item.title || "Portfolio";
        media.appendChild(img);
      }

      const content = document.createElement("div");
      content.className = "portfolio-content";
      content.innerHTML = `
        <h3 class="portfolio-title">${item.title || "Projet"}</h3>
        <p class="portfolio-desc">${item.description || ""}</p>
      `;

      // Tags
      const techs = Array.isArray(item.technologies) ? item.technologies : [];
      if (techs.length > 0) {
        const tags = document.createElement("div");
        tags.className = "portfolio-tags";
        techs.forEach(t => { const span = document.createElement("span"); span.textContent = t; tags.appendChild(span); });
        content.appendChild(tags);
      }

      card.appendChild(media);
      card.appendChild(content);

      // Lightbox
      card.addEventListener("click", () => {
        const lb = $("lightbox"), lbImg = $("lightboxImg");
        if (lb && lbImg && item.mediaUrl) {
          lbImg.src = item.mediaUrl;
          lb.classList.add("active");
        }
      });

      host.appendChild(card);
    });
  }

  function renderContact(c) {
    fillText("contactTitle", c.contact.title);
    fillText("contactText", c.contact.text);
    fillText("contactPhone", c.contact.phone);
    fillText("contactEmail", c.contact.email);
    fillText("contactWebsite", c.contact.website);
    fillText("contactAddress", c.contact.address);
    fillText("footerText", c.footerText);
    fillText("footerPhone", c.contact.phone);
    fillText("footerEmail", c.contact.email);
    fillText("footerWebsite", c.contact.website);
  }

  function renderWhatsApp(c) {
    const wa = c.whatsapp || {};
    const bubble = $("whatsappBubble");
    if (!bubble) return;
    if (wa.enabled && wa.number) {
      const msg = encodeURIComponent(wa.message || "Bonjour !");
      bubble.href = `https://wa.me/${wa.number}?text=${msg}`;
      bubble.style.display = "grid";
    } else {
      bubble.style.display = "none";
    }
  }

  function renderSocials(c) {
    const host = $("footerSocials");
    if (!host) return;
    host.innerHTML = "";
    const socials = c.socials || {};
    const icons = { facebook: "📘", instagram: "📷", twitter: "🐦", linkedin: "💼", tiktok: "🎵" };
    Object.entries(socials).forEach(([key, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener"; a.title = key; a.textContent = icons[key] || "🔗";
      host.appendChild(a);
    });
  }

  function setupHamburger() {
    const btn = $("hamburgerBtn"), menu = $("mainMenu");
    if (!btn || !menu) return;
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      menu.classList.toggle("mobile-open");
    });
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        btn.classList.remove("active");
        menu.classList.remove("mobile-open");
      });
    });
  }

  function setupLightbox() {
    const lb = $("lightbox"), closeBtn = $("lightboxClose");
    if (!lb || !closeBtn) return;
    closeBtn.addEventListener("click", () => lb.classList.remove("active"));
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("active"); });
  }

  function setupContactForm() {
    const form = $("contactForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $("formStatus");
      const data = {
        name: $("formName").value.trim(),
        email: $("formEmail").value.trim(),
        phone: $("formPhone").value.trim(),
        message: $("formMessage").value.trim()
      };
      if (!data.name || !data.email || !data.message) return;
      try {
        if (window.CMS_API && window.CMS_API.isSupabaseEnabled()) {
          const client = window.supabase.createClient(window.CMS_CONFIG.supabase.url, window.CMS_CONFIG.supabase.anonKey);
          await client.from("contact_messages").insert([data]);
        }
        if (status) { status.textContent = "✅ Message envoyé avec succès !"; status.style.display = "block"; status.style.color = "var(--green)"; }
        form.reset();
      } catch (err) {
        if (status) { status.textContent = "❌ Erreur lors de l'envoi."; status.style.display = "block"; status.style.color = "var(--red)"; }
      }
    });
  }

  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
  }

  function initGSAP() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    gsap.to(".hero-visual", { y: -60, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });

    // Section reveals
    gsap.utils.toArray(".section-title, .section-kicker, .section-text").forEach(el => {
      gsap.from(el, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
      });
    });

    // Service cards stagger
    ScrollTrigger.batch(".service-card", {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "back.out(1.2)" }),
      start: "top 88%"
    });

    // Portfolio cards stagger
    ScrollTrigger.batch(".portfolio-card", {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "back.out(1.2)" }),
      start: "top 88%"
    });

    // Timeline items
    ScrollTrigger.batch(".timeline-item", {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" }),
      start: "top 90%"
    });

    // 3D tilt on service cards
    document.querySelectorAll(".service-card, .portfolio-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  async function init() {
    const content = await getContent();
    applyTheme(content); // FORCE THEME
    applyBranding(content);
    applyNavigation(content);
    renderHero(content);
    renderStory(content);
    renderServices(content);
    renderPortfolio(content);
    renderContact(content);
    renderWhatsApp(content);
    renderSocials(content);
    setupHamburger();
    setupLightbox();
    setupContactForm();
    requestAnimationFrame(() => {
      initAnimations();
      initGSAP();
    });
  }

  init();
})();
