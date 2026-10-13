// src/components/hero/HeroSection.tsx
// Antigravity Hero Section — polished professional rebuild.
// Features: smooth staggered entry animations, minimalist top nav, giant ghosted backdrop
// typography, bold lower-left copy, and the floating Sonu character with 3D parallax.

import React from 'react';
import { motion } from 'motion/react';
import { AntigravityCanvas } from './AntigravityCanvas';
import { AntigravityCharacter } from './AntigravityCharacter';
import { sounds } from '../../utils/soundEffects';

interface HeroSectionProps {
  onOpenCommandPalette?: () => void;
  onOpenContact?: () => void;
}

// Stagger container — orchestrates children entering one after another
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
}) => {
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

      {/* 2. GHOSTED SONU BACKDROP WORDMARK */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      >
        <span className="font-sans font-black text-[22vw] sm:text-[25vw] leading-none tracking-tighter text-neutral-900/[0.18] dark:text-white/[0.12] transition-colors select-none">
          SONU
        </span>
      </motion.div>

      {/* 3. TOP NAVBAR */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-30 flex w-full items-center justify-between py-2 select-none"
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            sounds.playClick(800);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-foreground text-xl sm:text-2xl font-sans font-bold tracking-tight hover:text-purple-500 transition-colors cursor-pointer shrink-0"
        >
          SONU
        </a>

        {/* Nav Links + CTA */}
        <nav className="flex items-center gap-3 sm:gap-6 lg:gap-8 pr-14 sm:pr-20 md:pr-24">
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleScrollTo(link.targetId, link.freq)}
                className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={handleContact}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 font-sans"
          >
            Get in touch
          </button>
        </nav>
      </motion.header>

      {/* 4. HERO MAIN STAGE */}
      <div className="relative z-20 flex flex-1 items-center justify-center w-full max-w-7xl mx-auto py-4 sm:py-8 pointer-events-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* LEFT: Staggered Typography */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 text-left space-y-4 sm:space-y-6"
          >
            {/* Label */}
            <motion.span
              variants={fadeUp}
              className="block text-xs sm:text-sm font-bold tracking-[0.22em] text-muted-foreground uppercase font-sans"
            >
              SONU
            </motion.span>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-sans font-extrabold tracking-tight text-foreground leading-[0.92] select-none text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[5.2rem] xl:text-[6.2rem]"
            >
              <span className="block text-slate-900 dark:text-white">
                Full Stack
              </span>
              <span className="block text-slate-900 dark:text-white">
                Developer.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal max-w-md font-sans"
            >
              Building intelligent web systems — MERN · AI · Security
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4 font-sans"
            >
              <a
                href="#projects"
                onClick={handleScrollTo('projects', 650)}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-900 dark:text-white bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 border border-slate-900/20 dark:border-white/20 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                See my work
              </a>

              <button
                type="button"
                onClick={handleContact}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-black dark:hover:bg-zinc-200 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Get in touch
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Antigravity Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <AntigravityCharacter />
          </motion.div>

        </div>
      </div>

      {/* 5. SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative z-20 flex justify-center pb-4 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-muted-foreground/50"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-current" />
          <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
