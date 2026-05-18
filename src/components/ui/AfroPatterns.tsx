"use client";

import { motion } from "framer-motion";

/**
 * 1. AfroGrid: Futuristic tech grid mixed with geometric tribal patterns (diamonds, chevrons)
 */
export function AfroGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="afro-tech-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Standard grid lines */}
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            
            {/* Tech Dots */}
            <circle cx="40" cy="40" r="1.5" className="fill-afro-blue" />
            <circle cx="0" cy="0" r="1" className="fill-afro-gold" />
            <circle cx="80" cy="0" r="1" className="fill-afro-gold" />
            <circle cx="0" cy="80" r="1" className="fill-afro-gold" />
            <circle cx="80" cy="80" r="1" className="fill-afro-gold" />

            {/* Tribal Chevrons & Diamonds (subtle geometric) */}
            <path d="M 20 20 L 40 10 L 60 20 L 40 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 20 60 L 40 50 L 60 60 L 40 70 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            
            {/* Mini Chevron corners */}
            <path d="M 5 35 L 10 40 L 5 45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 75 35 L 70 40 L 75 45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#afro-tech-pattern)" />
      </svg>
    </div>
  );
}

/**
 * 2. TribalDivider: Premium section separator that acts as a geometric African tribal banner.
 */
export function TribalDivider({ 
  className = "", 
  color = "text-afro-blue/15" 
}: { 
  className?: string; 
  color?: string; 
}) {
  return (
    <div className={`w-full flex items-center justify-center pointer-events-none py-4 overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1200 24" 
        className={`w-full max-w-7xl h-6 ${color}`} 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,12 L50,12 L60,2 L70,12 L120,12 L130,22 L140,12 L190,12 L200,2 L210,12 L260,12 L270,22 L280,12 L330,12 L340,2 L350,12 L400,12 L410,22 L420,12 L470,12 L480,2 L490,12 L540,12 L550,22 L560,12 L610,12 L620,2 L630,12 L680,12 L690,22 L700,12 L750,12 L760,2 L770,12 L820,12 L830,22 L840,12 L890,12 L900,2 L910,12 L960,12 L970,22 L980,12 L1030,12 L1040,2 L1050,12 L1100,12 L1110,22 L1120,12 L1170,12 L1180,2 L1190,12 L1200,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
        
        {/* Diamond centers */}
        <polygon points="60,6 66,12 60,18 54,12" className="fill-afro-gold/40" />
        <polygon points="200,6 206,12 200,18 194,12" className="fill-afro-blue/40" />
        <polygon points="340,6 346,12 340,18 334,12" className="fill-afro-gold/40" />
        <polygon points="480,6 486,12 480,18 474,12" className="fill-afro-blue/40" />
        <polygon points="620,6 626,12 620,18 614,12" className="fill-afro-gold/40" />
        <polygon points="760,6 766,12 760,18 754,12" className="fill-afro-blue/40" />
        <polygon points="900,6 906,12 900,18 894,12" className="fill-afro-gold/40" />
        <polygon points="1040,6 1046,12 1040,18 1034,12" className="fill-afro-blue/40" />
        <polygon points="1180,6 1186,12 1180,18 1174,12" className="fill-afro-gold/40" />
      </svg>
    </div>
  );
}

/**
 * 3. WakandaLines: High-tech circuit lines but with ethnic/geometric bends instead of plain square lines.
 */
export function WakandaLines({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute pointer-events-none opacity-[0.08] ${className}`} 
      viewBox="0 0 400 400" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path 
        d="M 10 10 L 100 10 L 120 30 L 220 30 L 230 20 L 350 20 L 370 40 L 370 150 L 350 170 L 350 280 L 320 310" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <circle cx="10" cy="10" r="2.5" className="fill-afro-blue" />
      <circle cx="320" cy="310" r="2.5" className="fill-afro-gold" stroke="none" />
      
      <motion.path 
        d="M 50 100 L 50 200 L 70 220 L 170 220 L 190 240 L 190 320 L 210 340 M 170 220 L 190 200 L 250 200" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <circle cx="50" cy="100" r="2" className="fill-afro-gold" stroke="none" />
      <circle cx="210" cy="340" r="2" className="fill-afro-blue" stroke="none" />
      <circle cx="250" cy="200" r="2" className="fill-afro-blue" stroke="none" />
    </svg>
  );
}

/**
 * 4. HoloCircle: Futuristic glowing ethnic tech mandala
 */
export function HoloCircle({ className = "", size = 300 }: { className?: string; size?: number }) {
  return (
    <div 
      className={`relative rounded-full flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer concentric rotating ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-dashed border-afro-blue/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Main geometric tribal chevron ring */}
      <motion.div 
        className="absolute w-[90%] h-[90%] rounded-full opacity-35 text-afro-blue"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" strokeDasharray="1,2" />
          <circle cx="50" cy="50" r="41" strokeDasharray="4,4" />
          {/* Tribal triangle vectors */}
          <path d="M 50 5 L 47 13 L 53 13 Z M 50 95 L 47 87 L 53 87 Z M 5 50 L 13 47 L 13 53 Z M 95 50 L 87 47 L 87 53 Z" fill="currentColor" />
          <path d="M 18 18 L 24 24 M 82 18 L 76 24 M 18 82 L 24 76 M 82 82 L 76 76" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Inner glowing core */}
      <div className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-afro-blue/5 to-afro-gold/5 filter blur-xl animate-pulse" />
      
      {/* Inner circle */}
      <motion.div 
        className="absolute w-[50%] h-[50%] rounded-full border border-afro-gold/20 flex items-center justify-center"
        animate={{ rotate: 180 }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      >
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-afro-gold fill-none stroke-currentColor" strokeWidth="1">
          {/* Centered stylized elegant African diamond */}
          <polygon points="50,15 85,50 50,85 15,50" className="fill-afro-gold/10" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </motion.div>
    </div>
  );
}
