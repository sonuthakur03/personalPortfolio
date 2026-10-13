// src/components/hero/AntigravityCharacter.tsx
// Antigravity floating character component featuring Sonu hovering suspended in mid-air,
// responsive physics-based floor drop shadow, real-time 3D cursor perspective tilt,
// and glowing levitating React & Next.js technology orbs floating in his open palms.

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface AntigravityCharacterProps {
  className?: string;
}

export const AntigravityCharacter: React.FC<AntigravityCharacterProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates mapped to spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt and Parallax transforms
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-14, 14]);

  // Track window mouse movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] xl:max-w-[580px] aspect-[3/4] mx-auto flex flex-col items-center justify-end select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* =================================================================== */}
      {/* 1. DYNAMIC GROUND DROP SHADOW (GROUNDS THE FLOATING EFFECT)        */}
      {/* =================================================================== */}
      <motion.div
        animate={{
          scale: [1, 0.82, 1],
          opacity: [0.35, 0.2, 0.35],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-4 z-10 w-48 sm:w-60 h-8 rounded-[100%] bg-neutral-950/35 dark:bg-black/55 blur-md pointer-events-none"
      />

      {/* =================================================================== */}
      {/* 2. FLOATING CHARACTER BODY CONTAINER (ANTIGRAVITY SUSPENSION)      */}
      {/* =================================================================== */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -22, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-8"
      >
        <div className="relative w-[84%] sm:w-[86%] max-h-[92%] flex items-center justify-center">
          {/* High-Resolution Clean Antigravity Sonu Character */}
          <img
            src="/character/sonu_antigravity_floating.png"
            alt="Sonu Thakur - Floating Antigravity Developer"
            draggable={false}
            className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)] transition-transform duration-300"
          />

          {/* =============================================================== */}
          {/* TECHNOLOGY 1: REACT ATOM (Levitating on viewer's left hand)      */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, -7, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[1%] sm:left-[3%] top-[36%] z-30 flex flex-col items-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}
          >
            {/* Glowing cyan levitation aura */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/35 dark:bg-cyan-400/40 blur-lg animate-pulse" />

            {/* Glassmorphic Tech Orb Badge */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_25px_rgba(6,182,212,0.35)] dark:shadow-[0_8px_30px_rgba(6,182,212,0.5)]">
              <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 sm:w-7 sm:h-7 animate-[spin_12s_linear_infinite]">
                <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
                <g stroke="#00d8ff" strokeWidth="1.1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </div>

            {/* Tech label pill */}
            <span className="mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-tight text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/15 border border-cyan-500/20 shadow-sm">
              React
            </span>
          </motion.div>

          {/* =============================================================== */}
          {/* TECHNOLOGY 2: NEXT.JS (Levitating on viewer's right hand)        */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, -7, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="absolute right-[1%] sm:right-[3%] top-[36%] z-30 flex flex-col items-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}
          >
            {/* Glowing monochrome/white levitation aura */}
            <div className="absolute inset-0 rounded-full bg-slate-400/25 dark:bg-white/30 blur-lg animate-pulse" />

            {/* Glassmorphic Tech Orb Badge */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-300 dark:border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.25)]">
              <svg viewBox="0 0 180 180" className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 dark:fill-white">
                <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
                  <circle cx="90" cy="90" fill="black" r="90" />
                </mask>
                <g mask="url(#next-mask)">
                  <circle cx="90" cy="90" fill="currentColor" r="90" className="text-slate-900 dark:text-white" />
                  <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.136 149.508 157.438Z" fill="url(#next-grad-1)" />
                  <rect height="72" width="12" fill="url(#next-grad-2)" x="115" y="54" />
                </g>
                <defs>
                  <linearGradient id="next-grad-1" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="next-grad-2" x1="121" x2="120.799" y1="54" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Tech label pill */}
            <span className="mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-tight text-slate-800 dark:text-neutral-200 bg-slate-200/50 dark:bg-white/15 border border-slate-300 dark:border-white/20 shadow-sm">
              Next.js
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
