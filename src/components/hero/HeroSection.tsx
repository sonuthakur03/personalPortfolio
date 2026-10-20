// src/components/hero/HeroSection.tsx
// B · Pop Brutalist Hero Section:
// - Exact implementation of the B · Pop Brutalist design specification
// - Massive Archivo Black typography with stroke-fill outline effects
// - Interactive rotating word button ("building [ scalable ] apps")
// - Tilted polaroid card with Nano Banana Pro avatar & live Kathmandu clock
// - Interactive sticker badges with hard offset brutalist drop shadows
// - Accent palette color switcher: Yellow (#FFE14D), Mint (#7DFFA6), Pink (#FF6FB5), Blue (#7C9BFF), Peach (#FFB38A)

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Shuffle, FileText } from 'lucide-react';
import { STANDARD_RESUME_URL } from '../../data/profileData';

interface HeroSectionProps {
  onOpenCommandPalette?: () => void;
  onOpenContact?: () => void;
}

const words = ['scalable', 'secure', 'smart', 'fast'];

const accentColors = [
  { id: 'yellow', name: 'Yellow', hex: '#FFE14D', label: '🟡' },
  { id: 'mint', name: 'Mint', hex: '#7DFFA6', label: '🟢' },
  { id: 'pink', name: 'Pink', hex: '#FF6FB5', label: '🌸' },
  { id: 'blue', name: 'Blue', hex: '#7C9BFF', label: '🔵' },
  { id: 'peach', name: 'Peach', hex: '#FFB38A', label: '🟠' },
  { id: 'lavender', name: 'Lavender', hex: '#C4B5FD', label: '🟣' },
];

/**
 * Gets a fresh accent color on page reload/mount.
 * Guarantees a different color from the last loaded session to make each reload dynamic.
 */
const getInitialAccentColor = (): string => {
  if (typeof window === 'undefined') return accentColors[0].hex;
  try {
    const lastColor = sessionStorage.getItem('sonu_hero_accent_color');
    const pool = accentColors.filter((c) => c.hex !== lastColor);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || accentColors[0];
    sessionStorage.setItem('sonu_hero_accent_color', chosen.hex);
    return chosen.hex;
  } catch {
    return accentColors[0].hex;
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenCommandPalette }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [accentColor, setAccentColor] = useState<string>(getInitialAccentColor);
  const [kathmanduTime, setKathmanduTime] = useState<string>('');
  const [avatarView, setAvatarView] = useState<'workspace' | 'badge'>('workspace');

  // Sync active accent color to document CSS variable for system-wide synergy
  useEffect(() => {
    document.documentElement.style.setProperty('--pop-hero-accent', accentColor);
  }, [accentColor]);

  // Kathmandu Live Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setKathmanduTime(timeStr);
      } catch {
        setKathmanduTime('--:--');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Word auto cycler (every 2.4s)
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleNextWord = useCallback(() => {
    setWordIndex((prev) => (prev + 1) % words.length);
  }, []);

  const handleSelectAccent = (hex: string) => {
    setAccentColor(hex);
    try {
      sessionStorage.setItem('sonu_hero_accent_color', hex);
    } catch {
      // ignore
    }
  };

  const handleShuffleColor = () => {
    const pool = accentColors.filter((c) => c.hex !== accentColor);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || accentColors[0];
    handleSelectAccent(chosen.hex);
  };

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'contact' && onOpenContact) {
      onOpenContact();
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Work', href: '#projects', targetId: 'projects' },
    { label: 'Experience', href: '#experience', targetId: 'experience' },
    { label: 'Education', href: '#education', targetId: 'education' },
    { label: 'Skills', href: '#skills', targetId: 'skills' },
  ];

  // Dynamic complementary colors for high-contrast pop brutalist buttons
  const hireMeBg =
    accentColor === '#7C9BFF'
      ? '#FFE14D'
      : accentColor === '#FF6FB5'
        ? '#7DFFA6'
        : accentColor === '#FFE14D'
          ? '#7C9BFF'
          : '#FF6FB5';

  const cyclerBg = accentColor === '#FF6FB5' ? '#FFE14D' : '#FF6FB5';

  return (
    <section
      id="hero"
      aria-label="Sonu Thakur - Pop Brutalist Hero"
      style={{ backgroundColor: accentColor }}
      className="relative flex min-h-screen lg:min-h-0 lg:h-screen lg:max-h-[880px] xl:max-h-[920px] 2xl:max-h-[960px] w-full flex-col justify-between overflow-hidden text-[#111111] font-archivo transition-colors duration-500 border-b-[3px] border-[#111111]"
    >
      {/* ── HEADER NAVIGATION ── */}
      <header className="relative z-30 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4 lg:pt-5 select-none">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-1.5 sm:px-5 sm:py-2 bg-[#111111] text-white border-[3px] border-[#111111] font-archivoBlack text-base sm:text-lg tracking-wider uppercase transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-brutal-sm"
        >
          Sonu Thakur
        </a>

        {/* Navigation Pills & Actions */}
        <nav className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleScrollTo(link.targetId)}
              className={`pop-pill text-xs sm:text-sm px-3 sm:px-3.5 py-1 sm:py-1.5 ${
                link.label !== 'Work' ? 'hidden sm:inline-flex' : ''
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* CV Direct Download Pill */}
          <a
            href={STANDARD_RESUME_URL}
            download="Sonu_Thakur_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Sonu Thakur's Curriculum Vitae (PDF)"
            className="pop-pill text-xs sm:text-sm px-3 sm:px-3.5 py-1 sm:py-1.5 flex items-center gap-1.5 bg-[#FFE14D] hover:bg-[#FFD700] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#111111]" />
            <span>CV</span>
          </a>

          {/* Hire Me CTA Button */}
          <button
            type="button"
            onClick={onOpenContact}
            style={{ backgroundColor: hireMeBg }}
            className="pop-btn px-4 sm:px-5 py-1.5 sm:py-2 text-[#111111] rounded-full text-xs sm:text-sm font-semibold transition-colors"
          >
            Hire me
          </button>

          {/* Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Search Portfolio (Cmd+K / Ctrl+K)"
              className="pop-pill hidden md:inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 font-mono font-bold hover:scale-105 transition-transform"
            >
              <span>⌘K</span>
            </button>
          )}

          {/* Color Accent Picker with Reload Shuffle Hint */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 bg-white border-[3px] border-[#111111] rounded-full shadow-brutal-sm ml-1.5">
            {accentColors.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => handleSelectAccent(col.hex)}
                style={{ backgroundColor: col.hex }}
                title={`Switch accent to ${col.name} (Changes each reload)`}
                aria-label={`Switch accent to ${col.name}`}
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border-2 border-[#111111] transition-transform cursor-pointer ${accentColor === col.hex ? 'scale-115 ring-2 ring-black' : 'hover:scale-105'
                  }`}
              />
            ))}
            <button
              type="button"
              onClick={handleShuffleColor}
              title="Shuffle accent color (randomizes automatically on every reload)"
              aria-label="Shuffle accent color"
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-2 border-[#111111] transition-transform cursor-pointer"
            >
              <Shuffle className="w-2.5 h-2.5 text-[#111111]" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── MAIN HERO STAGE ── */}
      <main className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-4 max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN: Typography & Identity */}
        <section className="flex-1 min-w-[280px] max-w-xl flex flex-col gap-3.5 sm:gap-4 lg:gap-5 text-left">
          {/* Availability Sticker Badge */}
          <div className="self-start inline-flex items-center gap-2 px-3 py-1 bg-white border-[3px] border-[#111111] rounded-full shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2 hover:rotate-0 transition-transform select-none">
            <span className="w-2 h-2 rounded-full bg-[#17A34A] border border-[#111111] animate-pulse" />
            <span>Available for 2026 roles</span>
          </div>

          {/* Display Title */}
          <h1 className="font-archivoBlack uppercase text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.5rem] 2xl:text-[5rem] leading-[0.93] tracking-tight text-[#111111] select-none">
            Full stack
            <br />
            <span className="text-white text-stroke-pop">developer</span>
          </h1>

          {/* Dynamic Clickable Word Cycler */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-archivoBlack text-xl sm:text-2xl lg:text-3xl leading-tight">
            <span>building</span>
            <button
              type="button"
              onClick={handleNextWord}
              aria-label="Change the word"
              style={{ backgroundColor: cyclerBg }}
              className="px-3 sm:px-4 py-0.5 sm:py-1 text-[#111111] border-[3px] border-[#111111] shadow-brutal font-archivoBlack text-inherit cursor-pointer -rotate-2 hover:rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all select-none"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="inline-block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </button>
            <span>apps.</span>
          </div>

          {/* Bio Description */}
          <p className="max-w-lg text-sm sm:text-base lg:text-[1.05rem] font-semibold leading-relaxed text-[#111111]">
            I&apos;m a Full-Stack MERN Developer specializing in production-grade web applications, ACID-compliant transactional APIs, and Applied AI systems.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={handleScrollTo('projects')}
              className="pop-btn pop-btn-pink w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#111111] text-white text-sm sm:text-base justify-center gap-2.5"
            >
              <span>Explore my work</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href={STANDARD_RESUME_URL}
                download="Sonu_Thakur_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pop-btn px-3 sm:px-6 py-2.5 sm:py-3 bg-[#FFE14D] text-[#111111] text-xs sm:text-base justify-center gap-1.5 sm:gap-2 shadow-brutal hover:bg-[#FFD700] transition-colors"
                title="Download Sonu Thakur's Curriculum Vitae (PDF)"
              >
                <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#111111]" />
                <span>Download CV</span>
              </a>

              <button
                type="button"
                onClick={onOpenContact}
                className="pop-btn px-3 sm:px-6 py-2.5 sm:py-3 bg-white text-[#111111] text-xs sm:text-base justify-center gap-1.5 sm:gap-2"
              >
                <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-500" />
                <span>Get in touch</span>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Polaroid Frame & Pop Stickers */}
        <section
          aria-label="Portrait and tools"
          className="shrink-0 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[370px] flex flex-col items-center gap-3 sm:gap-4 mx-auto lg:mx-0"
        >
          {/* Tilted Polaroid Frame */}
          <div className="w-full bg-white border-[3px] border-[#111111] shadow-brutal-lg rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Image Container */}
            <div className="relative aspect-[4/3.7] border-b-[3px] border-[#111111] bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
              {/* Subtle background blueprint stripes */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #111111 0, #111111 2px, transparent 2px, transparent 14px)',
                }}
              />

              {/* Nano Banana Pro Workspace Avatar */}
              <img
                src={
                  avatarView === 'workspace'
                    ? '/character/sonu_workspace_sitting.png'
                    : '/character/sonu_avatar_badge.png'
                }
                alt="Sonu Thakur - Developer Workspace Avatar"
                className="relative z-10 max-h-full w-auto object-contain drop-shadow-xl select-none"
                draggable="false"
              />

              {/* Photo toggle button */}
              <button
                type="button"
                onClick={() =>
                  setAvatarView((prev) => (prev === 'workspace' ? 'badge' : 'workspace'))
                }
                className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-white border-2 border-[#111111] shadow-brutal-sm font-spaceMono text-[9px] font-bold uppercase hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                title="Toggle avatar pose"
              >
                {avatarView === 'workspace' ? 'Avatar ✦' : 'Workspace 💻'}
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="flex flex-wrap justify-between items-center gap-1.5 px-3 py-2 font-spaceMono text-xs font-bold text-[#111111]">
              <span>Sonu Thakur</span>
              <span>Kathmandu · {kathmanduTime}</span>
            </div>
          </div>

          {/* Pop Sticker Cluster */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-[360px]">
            <div className="pop-sticker bg-[#FF6FB5] -rotate-3 text-[11px] sm:text-xs !py-1 !px-2.5">MERN</div>
            <div className="pop-sticker bg-[#FFE14D] rotate-2 text-[11px] sm:text-xs !py-1 !px-2.5 font-bold">PYTHON</div>
            <div className="pop-sticker bg-[#7C9BFF] -rotate-2 text-[11px] sm:text-xs !py-1 !px-2.5">APPLIED AI</div>
            <div className="pop-sticker bg-[#7DFFA6] rotate-3 text-[11px] sm:text-xs !py-1 !px-2.5">TYPESCRIPT</div>
            <div className="pop-sticker bg-white -rotate-3 text-[11px] sm:text-xs !py-1 !px-2.5">HACKATHON WINNER 🏆</div>
            <div className="pop-sticker bg-[#FFB38A] rotate-2 text-[11px] sm:text-xs !py-1 !px-2.5">TU BCA RANK 1</div>
          </div>
        </section>
      </main>

      {/* ── TICKER STRIP RUNNING ACROSS BOTTOM ── */}
      <div className="relative z-20 w-full overflow-hidden bg-[#111111] text-white py-2 sm:py-2.5 border-t-[3px] border-[#111111] select-none">
        <div className="flex w-max animate-marquee space-x-8 font-spaceMono text-xs sm:text-sm font-bold tracking-widest uppercase">
          <span>⚡ FULL STACK ENGINEER</span>
          <span>✦ MERN SPECIALIST</span>
          <span>✦ APPLIED AI SYSTEMS</span>
          <span>✦ IDEAX HACKATHON WINNER (FINTECH)</span>
          <span>✦ TRIBHUVAN UNIVERSITY TOPPER</span>
          <span>✦ SCALABLE ACID BACKENDS</span>
          <span>⚡ FULL STACK ENGINEER</span>
          <span>✦ MERN SPECIALIST</span>
          <span>✦ APPLIED AI SYSTEMS</span>
          <span>✦ IDEAX HACKATHON WINNER (FINTECH)</span>
          <span>✦ TRIBHUVAN UNIVERSITY TOPPER</span>
          <span>✦ SCALABLE ACID BACKENDS</span>
        </div>
      </div>
    </section>
  );
};
