// src/components/common/FloatingDock.tsx
// Pop Brutalist Floating Navigation Dock:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - 3px solid black border, hard offset shadows, vibrant button states
// - High-contrast tooltips in Space Mono
// - Foldable/Collapsible into a sleek compact capsule with smooth spring transitions

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Layers,
  Award,
  GraduationCap,
  Wrench,
  Globe,
  CheckCircle2,
  Mail,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Compass,
  FileText,
} from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { sounds } from '../../utils/soundEffects';
import { STANDARD_RESUME_URL } from '../../data/profileData';

interface FloatingDockProps {
  onOpenContact: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenContact }) => {
  const { theme, toggleTheme, profile } = usePortfolioContent();
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isFolded, setIsFolded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const sections = ['profiles', 'certifications', 'skills', 'education', 'journey', 'projects'];
      const scrollPos = window.scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          return;
        }
      }
      if (window.scrollY < 400) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dockItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#' },
    { id: 'projects', label: 'Projects', icon: Layers, href: '#projects' },
    { id: 'journey', label: 'Journey', icon: Award, href: '#experience' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '#education' },
    { id: 'skills', label: 'Skills', icon: Wrench, href: '#skills' },
    { id: 'certifications', label: 'Certs', icon: CheckCircle2, href: '#certifications' },
    { id: 'profiles', label: 'Network', icon: Globe, href: '#profiles' },
  ];

  const currentItem = dockItems.find((d) => d.id === activeSection) || dockItems[0];

  const handleNavClick = (href: string) => {
    sounds.playClick(700);
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsFolded(true);
    }
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick navigation dock"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 max-w-[calc(100vw-24px)]"
    >
      <AnimatePresence mode="wait">
        {isFolded ? (
          /* Folded Compact Pill */
          <motion.div
            key="folded"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          >
            <button
              onClick={() => {
                sounds.playClick(800);
                setIsFolded(false);
              }}
              className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-md text-[#111111] dark:text-white hover:bg-[#FFE14D] dark:hover:bg-[#FF6FB5] transition-all cursor-pointer font-spaceMono text-xs font-bold"
              title="Expand navigation dock"
              aria-label="Expand navigation dock"
            >
              <Compass className="w-4 h-4 text-[#FF6FB5] dark:text-[#FFE14D] group-hover:rotate-45 transition-transform" />
              <span className="uppercase tracking-wider">Nav</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFE14D] dark:bg-[#111111] text-[#111111] dark:text-white text-[10px] font-bold border border-[#111111] uppercase">
                {currentItem.label}
              </span>
              <ChevronUp className="w-3.5 h-3.5 text-[#111111] dark:text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        ) : (
          /* Expanded Full Pop Brutalist Dock Frame */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-md"
          >
            {dockItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative p-2 rounded-full transition-all duration-150 group focus:outline-none cursor-pointer border-2 ${
                    isActive
                      ? 'bg-[#FF6FB5] text-[#111111] border-[#111111] shadow-brutal-sm scale-105'
                      : 'border-transparent text-[#111111] dark:text-white hover:bg-[#FFE14D] hover:text-[#111111] hover:border-[#111111]'
                  }`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  {/* Tooltip on hover */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#111111] text-white border-2 border-[#111111] text-[11px] font-spaceMono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}

            <div className="w-[2px] h-6 bg-[#111111] dark:bg-white/30 mx-0.5 sm:mx-1" />

            {/* Theme Switcher */}
            <button
              onClick={() => {
                sounds.playClick(920);
                toggleTheme();
              }}
              className="relative p-2 rounded-full border-2 border-transparent hover:border-[#111111] hover:bg-[#FFE14D] text-[#111111] dark:text-white transition-all cursor-pointer group"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 group-hover:-rotate-12 transition-transform" />
              )}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#111111] text-white border-2 border-[#111111] text-[11px] font-spaceMono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* CV Download Icon in Dock */}
            <a
              href={profile?.resumeUrl || STANDARD_RESUME_URL}
              download="Sonu_Thakur_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick(780)}
              className="relative p-2 rounded-full border-2 border-transparent hover:border-[#111111] hover:bg-[#FFE14D] text-[#111111] dark:text-white transition-all cursor-pointer group"
              title="Download CV (PDF)"
              aria-label="Download Sonu Thakur's Curriculum Vitae"
            >
              <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#111111] text-white border-2 border-[#111111] text-[11px] font-spaceMono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                CV (PDF)
              </span>
            </a>

            {/* Contact CTA in Dock */}
            <button
              onClick={() => {
                sounds.playClick(850);
                onOpenContact();
              }}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              title="Connect with Sonu"
              aria-label="Connect with Sonu"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contact</span>
            </button>

            {/* Fold / Minimize Dock Button */}
            <button
              onClick={() => {
                sounds.playClick(600);
                setIsFolded(true);
              }}
              className="relative p-2 rounded-full border-2 border-transparent hover:border-[#111111] hover:bg-[#FF6FB5] text-[#111111] dark:text-white transition-all cursor-pointer group ml-0.5"
              title="Fold dock (minimize)"
              aria-label="Fold navigation dock"
            >
              <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-y-0.5 transition-transform" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#111111] text-white border-2 border-[#111111] text-[11px] font-spaceMono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                Fold
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
