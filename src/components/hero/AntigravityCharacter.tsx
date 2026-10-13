// src/components/hero/AntigravityCharacter.tsx
// Antigravity floating character component featuring Sonu hovering suspended in mid-air,
// responsive physics-based floor drop shadow, real-time 3D cursor perspective tilt,
// glowing levitating React & Next.js technology orbs floating in his open palms,
// and floating credential pills (BCA Rank 1 & BugV CTF 3rd).

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Award, ShieldCheck } from 'lucide-react';

interface AntigravityCharacterProps {
  className?: string;
}

export const AntigravityCharacter: React.FC<AntigravityCharacterProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates mapped to spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 170, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt and Parallax transforms
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-16, 16]);

  // Spotlight glow offset
  const spotX = useTransform(smoothMouseX, [-0.5, 0.5], ['35%', '65%']);
  const spotY = useTransform(smoothMouseY, [-0.5, 0.5], ['35%', '65%']);

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
      className={`relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px] aspect-[3/4] mx-auto flex flex-col items-center justify-end select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* =================================================================== */}
      {/* 1. REACTBITS SPOTLIGHT / AMBIENT BACKLIGHT GLOW                     */}
      {/* =================================================================== */}
      <motion.div
        style={{
          left: spotX,
          top: spotY,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/15 via-purple-500/15 to-amber-500/10 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* =================================================================== */}
      {/* 2. DYNAMIC GROUND DROP SHADOW (GROUNDS THE FLOATING EFFECT)        */}
      {/* =================================================================== */}
      <motion.div
        animate={{
          scale: [1, 0.82, 1],
          opacity: [0.38, 0.22, 0.38],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-4 z-10 w-48 sm:w-64 h-8 rounded-[100%] bg-neutral-950/40 dark:bg-black/65 blur-md pointer-events-none"
      />

      {/* =================================================================== */}
      {/* 3. FLOATING CHARACTER BODY CONTAINER (ANTIGRAVITY SUSPENSION)      */}
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
        className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-6"
      >
        <div className="relative w-[86%] sm:w-[88%] max-h-[94%] flex items-center justify-center">
          {/* High-Resolution Clean Antigravity Sonu Character */}
          <img
            src="/character/sonu_antigravity_floating.png"
            alt="Sonu Thakur - Floating Antigravity Developer"
            draggable={false}
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition-transform duration-300 pointer-events-none"
          />

          {/* =============================================================== */}
          {/* TECHNOLOGY 1: REACT ATOM (Levitating on viewer's left hand)      */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[0%] sm:left-[2%] top-[37%] z-30 flex flex-col items-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
          >
            {/* Glowing cyan levitation aura */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/40 dark:bg-cyan-400/50 blur-xl animate-pulse" />

            {/* Glassmorphic Tech Orb Badge */}
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/95 dark:bg-neutral-900/90 backdrop-blur-xl border border-cyan-400/50 shadow-[0_8px_30px_rgba(6,182,212,0.4)] dark:shadow-[0_8px_35px_rgba(6,182,212,0.55)]">
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
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/15 border border-cyan-500/20 shadow-sm backdrop-blur-sm">
              React
            </span>
          </motion.div>

          {/* =============================================================== */}
          {/* TECHNOLOGY 2: NEXT.JS (Levitating on viewer's right hand)        */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -4, 4, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="absolute right-[0%] sm:right-[2%] top-[37%] z-30 flex flex-col items-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
          >
            {/* Glowing monochrome/white levitation aura */}
            <div className="absolute inset-0 rounded-full bg-slate-400/30 dark:bg-white/35 blur-xl animate-pulse" />

            {/* Glassmorphic Tech Orb Badge */}
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/95 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-300 dark:border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_35px_rgba(255,255,255,0.25)]">
              <svg viewBox="0 0 180 180" className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 dark:fill-white">
                <circle cx="90" cy="90" fill="currentColor" r="90" className="text-slate-900 dark:text-white" />
                <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.136 149.508 157.438Z" fill="url(#next-grad-hero)" />
                <path d="M115.416 54H127.529V125.97H115.416V54Z" fill="url(#next-grad-hero-2)" />
                <defs>
                  <linearGradient id="next-grad-hero" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="next-grad-hero-2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Tech label pill */}
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight text-slate-800 dark:text-slate-200 bg-slate-900/10 dark:bg-white/15 border border-slate-900/15 dark:border-white/20 shadow-sm backdrop-blur-sm">
              Next.js
            </span>
          </motion.div>

          {/* =============================================================== */}
          {/* FLOATING CREDENTIAL 1: BCA RANK 1 (Upper-left float)            */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              x: [0, 3, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="hidden sm:flex absolute -left-4 sm:-left-6 top-[18%] z-30 items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)] pointer-events-none"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-500">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-sans font-semibold text-foreground whitespace-nowrap">
              BCA Rank 1 · TU Topper
            </span>
          </motion.div>

          {/* =============================================================== */}
          {/* FLOATING CREDENTIAL 2: BUGV CTF 3RD PLACE (Lower-right float)   */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              y: [0, 6, 0],
              x: [0, -3, 0],
            }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            className="hidden sm:flex absolute -right-4 sm:-right-6 bottom-[22%] z-30 items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)] pointer-events-none"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-sans font-semibold text-foreground whitespace-nowrap">
              BugV CTF 3rd · AppSec
            </span>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
