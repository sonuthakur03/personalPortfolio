// src/components/hero/HeroSection.tsx
// Antigravity Hero Section:
// - Massive "SONU" backdrop sitting grounded flush on the bottom of the screen with enhanced dark mode visibility
// - Clean typography-led layout (no badge clutter, zero emojis)
// - Kinetic SplitText headline and magnetic interactive CTA buttons

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Magnetic } from '../common/Magnetic';
import { SplitText } from '../common/SplitText';
import { sounds } from '../../utils/soundEffects';

interface HeroSectionProps {
  onOpenCommandPalette?: () => void;
  onOpenContact?: () => void;
}

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
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-500 px-6 sm:px-10 md:px-12 lg:px-16 py-5 sm:py-6 select-none"
    >
      {/* 1. SOFT AMBIENT GLOW BACKDROP */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[480px] rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent dark:from-cyan-500/15 dark:via-purple-500/10 dark:to-transparent blur-3xl" />
      </div>

      {/* 2. ELEVATED "SONU" WORDMARK (LIFTED SLIGHTLY UP FOR BREATHING ROOM, ZERO CLIPPING) */}
      <div
        className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 flex items-end justify-center pointer-events-none select-none z-0 overflow-hidden leading-none"
        aria-hidden="true"
      >
        <span className="font-sans font-black text-[27vw] sm:text-[29vw] md:text-[31vw] lg:text-[32vw] leading-[0.76] tracking-tighter text-neutral-900/[0.16] dark:text-white/[0.22] transition-colors select-none text-center">
          SONU
        </span>
      </div>

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
      <div className="relative z-20 flex flex-1 items-center w-full max-w-7xl mx-auto py-8 sm:py-12 pointer-events-auto">
        <div className="w-full max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6 text-left">

          {/* Identity Eyebrow (Editorial, Zero Emoji) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-wider text-slate-500 dark:text-slate-400"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[11px] sm:text-xs">
              Sonu Thakur
            </span>
            <span className="text-slate-400 dark:text-slate-600 font-sans">/</span>
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
              Full-Stack Engineer & Applied AI Builder
            </span>
          </motion.div>

          {/* Kinetic SplitText Main Headline */}
          <h1 className="font-sans font-extrabold tracking-tight text-foreground leading-[0.92] select-none text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[5.4rem] xl:text-[6.4rem]">
            <div className="block text-slate-900 dark:text-white">
              <SplitText text="Full Stack" delay={0.15} stagger={0.035} />
            </div>
            <div className="block text-slate-900 dark:text-white mt-1">
              <SplitText text="Developer." delay={0.42} stagger={0.035} />
            </div>
          </h1>

          {/* Value-Driven Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-2xl font-sans leading-relaxed"
          >
            Architecting intelligent, secure web applications. Specialized in scalable MERN architectures, ACID-compliant transactional backends, and applied AI pipelines with the Gemini SDK.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4 font-sans"
          >
            <Magnetic strength={0.35}>
              <a
                href="#projects"
                onClick={handleScrollTo('projects', 650)}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-900 dark:text-white bg-slate-900/[0.04] dark:bg-white/[0.08] hover:bg-slate-900/[0.08] dark:hover:bg-white/[0.14] border border-slate-900/15 dark:border-white/20 shadow-sm transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>

            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={handleContact}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-black dark:hover:bg-neutral-100 shadow-md transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
                <span>Get in touch</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* 5. MINIMALIST SCROLL FOOTER */}
      <div className="relative z-20 flex justify-end pr-2 pb-1 pointer-events-none">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-foreground/35">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
