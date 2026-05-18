"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HoloCircle } from "./AfroPatterns";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 1200; // 1.2s loading simulation
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(currentProgress);

      if (stepCount >= steps) {
        clearInterval(timer);
        // Add a slight delay before hiding the loader for a smoother transition
        setTimeout(() => setIsVisible(false), 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -30,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#FCFCFD] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />
          
          {/* Glowing blue backlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-afro-blue/10 rounded-full filter blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-afro-gold/5 rounded-full filter blur-[60px]" />

          {/* Loader content */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Spinning Holographic Ethnic Ring */}
            <div className="absolute z-0">
              <HoloCircle size={220} />
            </div>

            {/* Inner Brand Logo */}
            <motion.div 
              className="relative z-10 w-20 h-20 bg-white border border-afro-blue/15 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-xl shadow-afro-blue/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Little gold and blue glowing dots */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-afro-blue rounded-full border-2 border-white animate-pulse" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-afro-gold rounded-full border-2 border-white" />
              
              {/* Tribal Tech Font Style Lettering */}
              <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-950 via-afro-blue to-afro-blue-dark">
                DB
              </span>
            </motion.div>

            {/* Text details */}
            <motion.div 
              className="mt-28 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-zinc-950">
                DIGITALL BOOSTER
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-afro-blue mt-2 font-bold font-sans">
                SYSTEME TECH WAKANDA INITIALISÉ
              </p>
            </motion.div>

            {/* Loading progress bars */}
            <div className="mt-8 w-48 relative">
              {/* Micro tribal diamond in the middle of progress */}
              <div className="h-[2px] w-full bg-zinc-200/60 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-afro-blue to-afro-gold"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Progress counter text */}
              <div className="flex justify-between items-center mt-2 text-[10px] font-bold text-zinc-400 font-sans">
                <span>BOOSTING...</span>
                <span className="text-afro-blue">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
