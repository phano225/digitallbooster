"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Save, Sparkles, Smartphone, Globe, Rocket, 
  Terminal, ShieldCheck, Database, Server, RefreshCw, 
  Plus, Trash2, CheckCircle2, AlertCircle, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { SiteContent } from "@/lib/data";
import { AfroGrid, HoloCircle } from "@/components/ui/AfroPatterns";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  
  // Auth state
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Site Content state
  const [content, setContent] = useState<SiteContent>({
    hero: {
      eyebrow: "",
      title: "",
      subtitle: "",
      primaryCtaLabel: "",
      secondaryCtaLabel: ""
    },
    services: [],
    portfolio: []
  });

  // Load Content from Supabase
  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('payload')
        .eq('id', 1)
        .single();

      if (fetchError) throw fetchError;
      
      if (data?.payload) {
        setContent(data.payload as SiteContent);
      }
    } catch (err: any) {
      console.error("Error loading content:", err);
      setError("Impossible de charger les données Supabase. Veuillez vérifier vos clés d'API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ultra-safe auth session check
    try {
      if (supabase && supabase.auth && typeof supabase.auth.getSession === 'function') {
        supabase.auth.getSession().then((response: any) => {
          const activeSession = response?.data?.session || null;
          setSession(activeSession);
          if (activeSession) {
            loadContent();
          } else {
            setLoading(false);
          }
        }).catch((err: any) => {
          console.error("Auth session check error:", err);
          setLoading(false);
        });
      } else {
        console.warn("Supabase auth is not available on this client.");
        setLoading(false);
      }

      if (supabase && supabase.auth && typeof supabase.auth.onAuthStateChange === 'function') {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, activeSession: any) => {
          setSession(activeSession);
          if (activeSession) {
            loadContent();
          } else {
            setLoading(false);
          }
        });
        return () => subscription?.unsubscribe();
      }
    } catch (err) {
      console.error("Critical error in auth effect:", err);
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    // Map "admin" to "admin@digitallbooster.com"
    const email = username.includes("@") ? username : `${username}@digitallbooster.com`;

    try {
      if (!supabase || !supabase.auth || typeof supabase.auth.signInWithPassword !== 'function') {
        throw new Error("Supabase auth n'est pas initialisé correctement.");
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
    } catch (err: any) {
      console.error("Login error:", err);
      setLoginError(err.message || "Identifiants invalides");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setContent({
      hero: { eyebrow: "", title: "", subtitle: "", primaryCtaLabel: "", secondaryCtaLabel: "" },
      services: [],
      portfolio: []
    });
  };

  // Save Content back to Supabase
  const saveContent = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { error: updateError } = await supabase
        .from('site_content')
        .update({ payload: content })
        .eq('id', 1);

      if (updateError) throw updateError;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      console.error("Error saving content:", err);
      setError("Erreur lors de la sauvegarde : " + (err.message || "Problème de connexion"));
    } finally {
      setSaving(false);
    }
  };

  // Add a Service Item helper
  const addService = () => {
    setContent(prev => ({
      ...prev,
      services: [
        ...(prev.services || []),
        { icon: "Laptop", title: "Nouveau Service", description: "Description du service...", points: ["Avantage 1"] }
      ]
    }));
  };

  // Delete a Service Item helper
  const removeService = (index: number) => {
    setContent(prev => ({
      ...prev,
      services: prev.services?.filter((_, idx) => idx !== index)
    }));
  };

  // Add a Portfolio Item helper
  const addPortfolio = () => {
    setContent(prev => ({
      ...prev,
      portfolio: [
        ...(prev.portfolio || []),
        { title: "Nouveau Projet", category: "Web Design", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", description: "Brève description...", tags: ["React"] }
      ]
    }));
  };

  // Delete a Portfolio Item helper
  const removePortfolio = (index: number) => {
    setContent(prev => ({
      ...prev,
      portfolio: prev.portfolio?.filter((_, idx) => idx !== index)
    }));
  };

  // Upload portfolio image directly to Supabase Storage Bucket
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIdx(idx);
      setError(null);

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage Bucket 'portfolio'
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Update state
      const next = [...(content.portfolio || [])];
      next[idx] = { ...next[idx], image: publicUrl };
      setContent(prev => ({ ...prev, portfolio: next }));
    } catch (err: any) {
      console.error("Error uploading image:", err);
      setError("Erreur de téléversement : " + (err.message || "Impossible d'envoyer l'image."));
    } finally {
      setUploadingIdx(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCFD] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-afro-blue" />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Chargement de la console...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen bg-[#FCFCFD] text-zinc-900 font-sans flex items-center justify-center p-6">
        {/* Background patterns */}
        <AfroGrid className="opacity-[0.03]" />
        
        {/* Glow Orbs */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-afro-blue/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-afro-gold/4 rounded-full filter blur-[90px] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-md bg-white border border-zinc-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#0052FF]/5 relative overflow-hidden tribal-border-glow">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0052FF]/2 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center space-x-3 mb-6 group relative">
              <div className="relative w-12 h-12 bg-white border border-[#0052FF]/15 rounded-xl flex items-center justify-center text-black font-black text-lg group-hover:rotate-6 transition-transform shadow-lg shadow-[#0052FF]/5">
                <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-950 via-afro-blue to-afro-blue-dark">
                  DB
                </span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-afro-gold rounded-full border border-white" />
              </div>
            </Link>
            <h2 className="text-sm font-black tracking-[0.2em] text-zinc-950 font-serif text-center uppercase">
              CONSOLE ADMINISTRATION
            </h2>
            <p className="text-[9px] tracking-[0.3em] text-[#0052FF] font-bold uppercase mt-1">
              ACCÈS SÉCURISÉ DIGITALL BOOSTER
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                Identifiant administrateur
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: admin"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#0052FF] focus:border-[#0052FF] transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                Mot de passe
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#0052FF] focus:border-[#0052FF] transition-all font-sans"
              />
            </div>

            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full py-3.5 bg-gradient-to-r from-afro-blue to-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-[0_4px_20px_rgba(0,82,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Connexion...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Se connecter
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FCFCFD] text-zinc-900 font-sans pb-16">
      {/* Background patterns */}
      <AfroGrid className="opacity-[0.03]" />
      
      {/* Glow Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-afro-blue/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-afro-gold/4 rounded-full filter blur-[90px] pointer-events-none z-0" />

      {/* Header bar */}
      <header className="sticky top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-zinc-100 py-4.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 border border-zinc-200 rounded-xl bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all text-zinc-500 hover:text-zinc-950"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xs font-black uppercase tracking-widest text-zinc-950 flex items-center gap-1.5 font-sans">
                <ShieldCheck className="w-4 h-4 text-afro-blue" /> Console Admin Digitall Booster
              </h1>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-5.5 mt-0.5">Système d'Édition Cyber-Africain v2.5</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 border border-emerald-100 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4" /> Contenu sauvegardé en direct !
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={saveContent}
              disabled={saving || loading}
              className="px-6 py-3 bg-gradient-to-r from-afro-blue to-[#003BFF] text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:shadow-[0_4px_20px_rgba(0,82,255,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-55 disabled:pointer-events-none transition-all flex items-center gap-2"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Enregistrer
                </>
              )}
            </button>

            <button 
              onClick={handleLogout}
              className="p-3 border border-zinc-200 text-zinc-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50/50 transition-all rounded-xl flex items-center justify-center"
              title="Se déconnecter"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin UI */}
      <main className="max-w-7xl mx-auto px-6 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Side panels */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Infra Status */}
            <div className="glass-light p-6 rounded-3xl shadow-sm border-[#0052FF]/10 relative overflow-hidden">
              <HoloCircle className="w-32 h-32 absolute top-[-10%] right-[-10%] opacity-[0.03] pointer-events-none" />
              
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 mb-5 flex items-center gap-2">
                <Database className="w-4 h-4 text-afro-blue" /> Statut Infrastructure
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Base de données", val: "Supabase Live", icon: Server, color: "text-emerald-500" },
                  { label: "Shield de sécurité", val: "Actif (Wakanda v2)", icon: ShieldCheck, color: "text-afro-blue" },
                  { label: "Revalidation Cache", val: "Instantanée (SSR)", icon: RefreshCw, color: "text-afro-gold" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-zinc-50 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-500 font-sans">{item.label}</span>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${item.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="glass-light p-6 rounded-3xl shadow-sm border-[#FFC700]/15 relative overflow-hidden">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 mb-5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-afro-gold" /> Télémétrie Tech
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 border border-zinc-100 p-4.5 rounded-2xl">
                  <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Services Actifs</span>
                  <p className="text-3xl font-black text-zinc-950 mt-1 font-serif">{content.services?.length || 0}</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 p-4.5 rounded-2xl">
                  <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Projets Portfolio</span>
                  <p className="text-3xl font-black text-zinc-950 mt-1 font-serif">{content.portfolio?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Editor */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold flex items-center gap-2.5 font-sans">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {loading ? (
              <div className="glass-light p-16 rounded-3xl shadow-sm flex flex-col items-center justify-center gap-4">
                <RefreshCw className="w-8 h-8 text-afro-blue animate-spin" />
                <p className="text-xs uppercase tracking-widest font-black text-zinc-400">Chargement de la Console...</p>
              </div>
            ) : (
              <>
                {/* SECTION 1: HERO EDITING */}
                <div className="glass-light p-8 rounded-3xl shadow-sm border-[#0052FF]/10 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-afro-blue" /> Section Hero (Accueil)
                    </h3>
                    <span className="text-[9px] bg-afro-blue/5 border border-[#0052FF]/15 text-afro-blue font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Dynamic Config
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Badge (Eyebrow)</label>
                      <input 
                        type="text" 
                        value={content.hero?.eyebrow || ""}
                        onChange={(e) => setContent(prev => ({
                          ...prev, 
                          hero: { ...(prev.hero || {}), eyebrow: e.target.value }
                        }))}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Titre Principal</label>
                      <input 
                        type="text" 
                        value={content.hero?.title || ""}
                        onChange={(e) => setContent(prev => ({
                          ...prev, 
                          hero: { ...(prev.hero || {}), title: e.target.value }
                        }))}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Description (Sous-titre)</label>
                      <textarea 
                        rows={3}
                        value={content.hero?.subtitle || ""}
                        onChange={(e) => setContent(prev => ({
                          ...prev, 
                          hero: { ...(prev.hero || {}), subtitle: e.target.value }
                        }))}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans leading-relaxed resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Bouton Principal</label>
                      <input 
                        type="text" 
                        value={content.hero?.primaryCtaLabel || ""}
                        onChange={(e) => setContent(prev => ({
                          ...prev, 
                          hero: { ...(prev.hero || {}), primaryCtaLabel: e.target.value }
                        }))}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Bouton Secondaire</label>
                      <input 
                        type="text" 
                        value={content.hero?.secondaryCtaLabel || ""}
                        onChange={(e) => setContent(prev => ({
                          ...prev, 
                          hero: { ...(prev.hero || {}), secondaryCtaLabel: e.target.value }
                        }))}
                        className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: SERVICES EDITING */}
                <div className="glass-light p-8 rounded-3xl shadow-sm border-[#FFC700]/15 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-afro-gold" /> Expertises & Services
                    </h3>
                    <button 
                      onClick={addService}
                      className="px-4 py-2 bg-gradient-to-r from-afro-blue/10 to-afro-blue/15 border border-[#0052FF]/15 text-afro-blue text-[10px] font-black uppercase tracking-wider rounded-full hover:bg-[#0052FF]/20 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    {content.services?.map((service, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl relative group">
                        <button 
                          onClick={() => removeService(idx)}
                          className="absolute top-4 right-4 p-2 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 transition-all text-rose-500 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Titre du Service</label>
                            <input 
                              type="text" 
                              value={service.title || ""}
                              onChange={(e) => {
                                const next = [...(content.services || [])];
                                next[idx] = { ...service, title: e.target.value };
                                setContent(prev => ({ ...prev, services: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Description</label>
                            <textarea 
                              rows={2}
                              value={service.description || ""}
                              onChange={(e) => {
                                const next = [...(content.services || [])];
                                next[idx] = { ...service, description: e.target.value };
                                setContent(prev => ({ ...prev, services: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans leading-relaxed resize-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Avantages / Points clés (Séparés par des virgules)</label>
                            <input 
                              type="text" 
                              value={service.points?.join(", ") || ""}
                              onChange={(e) => {
                                const next = [...(content.services || [])];
                                next[idx] = { ...service, points: e.target.value.split(",").map(p => p.trim()) };
                                setContent(prev => ({ ...prev, services: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 3: PORTFOLIO EDITING */}
                <div className="glass-light p-8 rounded-3xl shadow-sm border-[#0052FF]/10 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-afro-blue" /> Portfolio Réalisations
                    </h3>
                    <button 
                      onClick={addPortfolio}
                      className="px-4 py-2 bg-gradient-to-r from-afro-blue/10 to-afro-blue/15 border border-[#0052FF]/15 text-afro-blue text-[10px] font-black uppercase tracking-wider rounded-full hover:bg-[#0052FF]/20 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    {content.portfolio?.map((project, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl relative group">
                        <button 
                          onClick={() => removePortfolio(idx)}
                          className="absolute top-4 right-4 p-2 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 transition-all text-rose-500 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Nom de la réalisation</label>
                            <input 
                              type="text" 
                              value={project.title || ""}
                              onChange={(e) => {
                                const next = [...(content.portfolio || [])];
                                next[idx] = { ...project, title: e.target.value };
                                setContent(prev => ({ ...prev, portfolio: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Catégorie</label>
                            <input 
                              type="text" 
                              value={project.category || ""}
                              onChange={(e) => {
                                const next = [...(content.portfolio || [])];
                                next[idx] = { ...project, category: e.target.value };
                                setContent(prev => ({ ...prev, portfolio: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                            />
                          </div>

                          <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Image de la réalisation</label>
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-center bg-zinc-50 p-4 border border-zinc-200 rounded-2xl">
                              {/* Preview Thumbnail */}
                              <div className="relative w-16 h-16 bg-white border border-zinc-200 rounded-xl overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                {project.image ? (
                                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                  <Globe className="w-5 h-5 text-zinc-300" />
                                )}
                                
                                {uploadingIdx === idx && (
                                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                    <RefreshCw className="w-5 h-5 text-afro-blue animate-spin" />
                                  </div>
                                )}
                              </div>

                              {/* Uploader Actions */}
                              <div className="flex-1 flex flex-col gap-2.5 w-full">
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <label 
                                    htmlFor={`file-${idx}`}
                                    className="px-4 py-3 bg-white border border-zinc-200 text-zinc-800 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                                  >
                                    {uploadingIdx === idx ? "Envoi..." : "Téléverser"}
                                  </label>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    id={`file-${idx}`}
                                    onChange={(e) => handleImageUpload(e, idx)}
                                    className="hidden" 
                                    disabled={uploadingIdx !== null}
                                  />
                                  
                                  <input 
                                    type="text" 
                                    placeholder="Ou coller une URL d'image..."
                                    value={project.image || ""}
                                    onChange={(e) => {
                                      const next = [...(content.portfolio || [])];
                                      next[idx] = { ...project, image: e.target.value };
                                      setContent(prev => ({ ...prev, portfolio: next }));
                                    }}
                                    className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans shadow-sm"
                                  />
                                </div>
                                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block pl-1">
                                  Stocké directement dans votre bucket Supabase public "portfolio"
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Description</label>
                            <textarea 
                              rows={2}
                              value={project.description || ""}
                              onChange={(e) => {
                                const next = [...(content.portfolio || [])];
                                next[idx] = { ...project, description: e.target.value };
                                setContent(prev => ({ ...prev, portfolio: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans leading-relaxed resize-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Tags Technologiques (Séparés par des virgules)</label>
                            <input 
                              type="text" 
                              value={project.tags?.join(", ") || ""}
                              onChange={(e) => {
                                const next = [...(content.portfolio || [])];
                                next[idx] = { ...project, tags: e.target.value.split(",").map(t => t.trim()) };
                                setContent(prev => ({ ...prev, portfolio: next }));
                              }}
                              className="bg-white border border-zinc-200 rounded-xl px-4.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-[#0052FF]/30 font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
