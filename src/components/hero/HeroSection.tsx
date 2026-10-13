// src/components/hero/HeroSection.tsx
// Redesigned Antigravity Hero Section using:
// - /frontend-design: Distinctive typography, intentional spacing, zero cookie-cutter clutter
// - /gsap-plugins & /motion-patterns: Token-based spring physics, staggered entry sequences
// - /ui-ux-pro-max: High contrast (cream #f7f6f2 / obsidian #09090b), accessible tap targets, keyboard navigable
// - ReactBits inspirations: Magnetic interactive buttons, kinetic SplitText, spotlight aura, floating credential pills

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AntigravityCanvas } from './AntigravityCanvas';
import { AntigravityCharacter } from './AntigravityCharacter';
import { Magnetic } from '../common/Magnetic';
import { SplitText } from '../common/SplitText';
import { sounds } from '../../utils/soundEffects';
import { springs } from '../../lib/motion-tokens';

interface HeroSectionProps {
  onOpenCommandPalette?: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
}) => {
  // Mouse coordinates for hero parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, springs.gentle);

  // Parallax on the giant ghosted backdrop wordmark
  const backdropX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  const handleScrollTo = (id: string, soundFreq = 650) => (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playClick(soundFreq);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playClick(850);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const target = document.getElementById('contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'About', href: '#story', targetId: 'story', freq: 620 },
    { label: 'Skills', href: '#skills', targetId: 'skills', freq: 660 },
    { label: 'Work', href: '#projects', targetId: 'projects', freq: 700 },
    { label: 'Experience', href: '#experience', targetId: 'experience', freq: 740 },
    { label: 'Contact', href: '#contact', targetId: 'contact', freq: 780 },
  ];

  return (
    <section
      id="hero"
      aria-label="Sonu Thakur - Full-Stack Developer Portfolio"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden text-foreground transition-colors duration-500 px-6 sm:px-10 md:px-12 lg:px-16 py-5 sm:py-6 select-none"
    >
      {/* 1. ANTIGRAVITY AMBIENT CANVAS */}
      <AntigravityCanvas />

      {/* 2. GHOSTED SONU BACKDROP WORDMARK WITH MOUSE PARALLAX */}
      <motion.div
        style={{ x: backdropX }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      >
        <span className="font-sans font-black text-[23vw] sm:text-[26vw] leading-none tracking-tighter text-neutral-900/[0.22] dark:text-white/[0.14] transition-colors select-none">
          SONU
        </span>
      </motion.div>

      {/* 3. TOP NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-30 flex w-full items-center justify-between py-2 select-none"
      >
        {/* Brand */}
        <Magnetic strength={0.25}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              sounds.playClick(800);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-foreground text-xl sm:text-2xl font-sans font-extrabold tracking-tight hover:text-purple-500 transition-colors cursor-pointer shrink-0"
          >
            <span>SONU</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
          </a>
        </Magnetic>

        {/* Nav Links + CTA (spaced cleanly for the ceiling pull-cord) */}
        <nav className="flex items-center gap-3 sm:gap-6 lg:gap-8 pr-14 sm:pr-20 md:pr-24">
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleScrollTo(link.targetId, link.freq)}
                className="relative text-foreground/75 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={handleContact}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 font-sans"
            >
              Get in touch
            </button>
          </Magnetic>
        </nav>
      </motion.header>

      {/* 4. HERO MAIN STAGE */}
      <div className="relative z-20 flex flex-1 items-center justify-center w-full max-w-7xl mx-auto py-4 sm:py-6 pointer-events-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* LEFT: Kinetic Typography & Actions */}
          <div className="lg:col-span-6 text-left space-y-4 sm:space-y-6">

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono font-semibold tracking-wide uppercase text-foreground/80">
                Available for High-Impact Roles
              </span>
            </motion.div>

            {/* Kinetic SplitText Main Headline */}
            <h1 className="font-sans font-extrabold tracking-tight text-foreground leading-[0.92] select-none text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[5.2rem] xl:text-[6.2rem]">
              <div className="block text-slate-900 dark:text-white">
                <SplitText text="Full Stack" delay={0.2} stagger={0.035} />
              </div>
              <div className="block text-slate-900 dark:text-white mt-1">
                <SplitText text="Developer." delay={0.48} stagger={0.035} />
              </div>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-lg font-sans leading-relaxed"
            >
              Engineering intelligent, secure web applications with MERN, applied AI pipelines (Gemini SDK), and competitive security rigor.
            </motion.p>

            {/* Tech Chips Micro-Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {['MERN Stack', 'Next.js 15', 'Applied AI (Gemini)', 'AppSec & CTF', 'ACID Systems'].map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-foreground/75 bg-neutral-900/[0.04] dark:bg-white/[0.06] border border-neutral-900/[0.08] dark:border-white/[0.1]"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4 font-sans"
            >
              <Magnetic strength={0.35}>
                <a
                  href="#projects"
                  onClick={handleScrollTo('projects', 650)}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-900 dark:text-white bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 border border-slate-900/20 dark:border-white/20 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <button
                  type="button"
                  onClick={handleContact}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-black dark:hover:bg-zinc-200 shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
                  <span>Get in touch</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* RIGHT: Enhanced Antigravity Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <AntigravityCharacter />
          </motion.div>

        </div>
      </div>

      {/* 5. MINIMALIST SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative z-20 flex justify-center pb-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-foreground/40"
        >
          <div className="w-[1px] h-7 bg-gradient-to-b from-transparent via-current to-transparent" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em]">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
