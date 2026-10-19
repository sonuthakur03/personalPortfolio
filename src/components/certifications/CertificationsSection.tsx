// src/components/certifications/CertificationsSection.tsx
// Pop Brutalist Interactive Exhibition Stage & Gallery Showcase:
// - Replaces restrictive bento grid with an Exhibition Stage + Uniform Gallery Deck
// - Zero text clipping: dedicated metadata panel with generous breathing room
// - High-resolution landscape certificate display honoring real scanned documents
// - Interactive Filmstrip navigation with keyboard arrow shortcuts (←, →)
// - Dual View Modes: Exhibition Stage (Cinematic) vs Archival Catalog (Grid)
// - "Surprise Me" random award discovery
// - High-contrast inspect modal with full-screen zoom and 1-click credential copy

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialCertificatesData } from '../../data/certificatesData';
import type { CertificateItem, CertificateCategory } from '../../types/certificates';
import {
  ShieldCheck,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Check,
  Copy,
  Trophy,
  LayoutGrid,
  Laptop,
  Shuffle,
  Play,
  Pause,
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { sounds } from '../../utils/soundEffects';

type FilterCategory = 'All' | '🏆 Wins & Podiums' | CertificateCategory;

const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
  Hackathon: { bg: '#FF6FB5', text: '#111111', badge: 'bg-[#FF6FB5]' },
  Security: { bg: '#FFE14D', text: '#111111', badge: 'bg-[#FFE14D]' },
  Academic: { bg: '#7DFFA6', text: '#111111', badge: 'bg-[#7DFFA6]' },
  'Full-Stack': { bg: '#7C9BFF', text: '#111111', badge: 'bg-[#7C9BFF]' },
  Design: { bg: '#FFB38A', text: '#111111', badge: 'bg-[#FFB38A]' },
  Workshop: { bg: '#B9C8FF', text: '#111111', badge: 'bg-[#B9C8FF]' },
  '🏆 Wins & Podiums': { bg: '#FFE14D', text: '#111111', badge: 'bg-[#FFE14D]' },
};

export const CertificationsSection: React.FC = () => {
  const [certificates] = useState<CertificateItem[]>(initialCertificatesData);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('stage');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const categories = useMemo(() => {
    const list: FilterCategory[] = [
      'All',
      '🏆 Wins & Podiums',
      'Hackathon',
      'Security',
      'Full-Stack',
      'Design',
      'Workshop',
    ];
    return list;
  }, []);

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'All') return certificates;
    if (activeFilter === '🏆 Wins & Podiums') {
      return certificates.filter((c) =>
        ['cert-ideax-winner-2026', 'cert-bugv-ctf-3rd'].includes(c.id)
      );
    }
    return certificates.filter((c) => c.category === activeFilter);
  }, [certificates, activeFilter]);

  const safeIndex = currentIndex < filteredCertificates.length ? currentIndex : 0;
  const activeCert = filteredCertificates[safeIndex] || filteredCertificates[0];
  const selectedCert = selectedCertIndex !== null ? filteredCertificates[selectedCertIndex] : null;

  // Next / Previous navigation
  const handlePrev = useCallback(() => {
    sounds.playClick(680);
    setCurrentIndex((prev) => (prev === 0 ? filteredCertificates.length - 1 : prev - 1));
  }, [filteredCertificates.length]);

  const handleNext = useCallback(() => {
    sounds.playClick(720);
    setCurrentIndex((prev) => (prev === filteredCertificates.length - 1 ? 0 : prev + 1));
  }, [filteredCertificates.length]);

  // Autoplay carousel timer (auto-advances every 3s, pauses on hover)
  useEffect(() => {
    if (isPlaying && !isHovered && viewMode === 'stage' && filteredCertificates.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, viewMode, filteredCertificates.length]);

  // Surprise Me / Shuffle
  const handleSurpriseMe = () => {
    sounds.playClick(900);
    const randomIndex = Math.floor(Math.random() * filteredCertificates.length);
    setCurrentIndex(randomIndex);
    if (viewMode === 'grid') {
      setViewMode('stage');
    }
  };

  // Keyboard navigation for stage view and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCertIndex !== null) {
        if (e.key === 'Escape') setSelectedCertIndex(null);
        else if (e.key === 'ArrowLeft') {
          setSelectedCertIndex((prev) =>
            prev !== null ? (prev === 0 ? filteredCertificates.length - 1 : prev - 1) : null
          );
        } else if (e.key === 'ArrowRight') {
          setSelectedCertIndex((prev) =>
            prev !== null ? (prev === filteredCertificates.length - 1 ? 0 : prev + 1) : null
          );
        }
      } else if (viewMode === 'stage') {
        if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'ArrowRight') handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertIndex, viewMode, handlePrev, handleNext, filteredCertificates.length]);

  const handleCopyId = (id: string) => {
    sounds.playSuccess();
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section
      id="certifications"
      aria-label="Verified Certifications and Hackathon Awards"
      className="py-20 sm:py-28 relative bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* ================================================================= */}
        {/* SECTION HEADER WITH DUAL VIEW CONTROLS                            */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-[3px] border-[#111111]">
            <div className="space-y-3 max-w-2xl">
              <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE14D] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>05 // Verified Credentials</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
                Certifications
              </h2>
              <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80">
                Independent capture-the-flag podium finishes, 1st place hackathon victories, and professional software engineering certifications. Explore in interactive Exhibition Stage or Archival Grid view.
              </p>
            </div>

            {/* View Mode & Discovery Actions */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              {/* Surprise Me Button */}
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="pop-btn px-4 py-2 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-[3px] border-[#111111] font-spaceMono text-xs font-bold gap-2 shadow-brutal hover:bg-[#FF6FB5] dark:hover:bg-[#FF6FB5] hover:text-[#111111] dark:hover:text-[#111111] transition-all"
                title="Jump to a random credential"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#FF6FB5]" />
                <span>Surprise Me</span>
              </button>

              {/* View Switcher: Stage vs Grid */}
              <div className="inline-flex items-center border-[3px] border-[#111111] bg-white dark:bg-[#181A20] shadow-brutal p-1 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(700);
                    setViewMode('stage');
                  }}
                  className={`px-3 py-1.5 font-spaceMono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'stage'
                      ? 'bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111]'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Stage View</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(720);
                    setViewMode('grid');
                  }}
                  className={`px-3 py-1.5 font-spaceMono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111]'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid View</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* CATEGORY FILTER PILLS                                             */}
        {/* ================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            let count = certificates.length;
            if (cat === '🏆 Wins & Podiums') {
              count = 2; // IdeaX Winner + BugV 3rd
            } else if (cat !== 'All') {
              count = certificates.filter((c) => c.category === cat).length;
            }

            const catInfo = categoryColors[cat] || { bg: '#FFE14D', text: '#111' };

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sounds.playClick(800);
                  setActiveFilter(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 sm:px-5 py-2 border-[3px] border-[#111111] font-spaceMono text-xs sm:text-sm font-bold uppercase transition-all select-none cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'shadow-brutal -translate-x-0.5 -translate-y-0.5 text-[#111111]'
                    : 'bg-white dark:bg-[#181A20] text-[#111111] dark:text-white hover:bg-[#FFE14D] dark:hover:bg-[#FFE14D] hover:text-[#111111] dark:hover:text-[#111111] hover:-translate-y-0.5'
                }`}
                style={isActive ? { backgroundColor: catInfo.bg } : {}}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.5 border border-[#111111] bg-white dark:bg-[#111111] text-[#111111] dark:text-white font-bold">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* VIEW 1: EXHIBITION STAGE (CINEMATIC HERO SHOWCASE)                */}
        {/* ================================================================= */}
        {viewMode === 'stage' && activeCert && (
          <div className="space-y-6">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl overflow-hidden flex flex-col lg:flex-row relative"
            >
              {/* Carousel Progress Bar across top edge */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-200 dark:bg-neutral-800 z-40 overflow-hidden">
                <motion.div
                  key={`${safeIndex}-${isPlaying}-${isHovered}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-[#FFE14D]"
                />
              </div>

              {/* LEFT COLUMN: Large High-Res Certificate Stage */}
              <div
                onClick={() => {
                  sounds.playClick(750);
                  setSelectedCertIndex(currentIndex);
                }}
                className="relative lg:w-3/5 min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] bg-[#0C0D11] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#111111] flex items-center justify-center p-4 sm:p-8 overflow-hidden group cursor-pointer"
              >
                {/* Decorative Top Washi Tape */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-[#FFE14D] border-2 border-[#111111] rotate-[-2deg] shadow-[2px_2px_0_#111111] pointer-events-none" />

                {/* Scanned Document Image with Smooth Carousel Slide Animation */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeCert.id}
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    initial={{ opacity: 0, x: 25, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -25, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="max-h-[440px] w-auto max-w-full object-contain border-2 border-[#111111] shadow-[8px_8px_0_#000] select-none"
                    draggable="false"
                  />
                </AnimatePresence>

                {/* Carousel Indicator Dots Overlay */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 bg-black/75 backdrop-blur-sm border-2 border-[#111111] rounded-full shadow-[2px_2px_0_#000]">
                  {filteredCertificates.map((cert, dotIdx) => (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick(650);
                        setCurrentIndex(dotIdx);
                      }}
                      title={cert.title}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        dotIdx === safeIndex
                          ? 'w-6 bg-[#FFE14D] border border-[#111111]'
                          : 'w-2 bg-white/40 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Hover Lens Hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="pop-btn px-5 py-2.5 bg-white text-[#111111] font-spaceMono font-bold text-xs uppercase gap-2 shadow-brutal">
                    <Maximize2 className="w-4 h-4" />
                    <span>Click for Fullscreen Lightbox</span>
                  </span>
                </div>

                {/* Left/Right Stage Arrows */}
                {filteredCertificates.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white text-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FFE14D] hover:-translate-x-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                      aria-label="Previous Certificate"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white text-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FFE14D] hover:translate-x-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                      aria-label="Next Certificate"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* RIGHT COLUMN: Generous Metadata Details Panel (Zero Clipping!) */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FFFFFF] dark:bg-[#15161C] text-[#111111] dark:text-white">
                <div className="space-y-4">
                  {/* Category & Status Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#111111]/15 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          backgroundColor:
                            categoryColors[activeCert.category]?.bg || '#FFE14D',
                        }}
                        className="px-3 py-1 border-2 border-[#111111] shadow-[2px_2px_0_#111111] text-[#111111] font-spaceMono font-bold text-xs uppercase"
                      >
                        {activeCert.category}
                      </span>

                      {activeCert.id === 'cert-ideax-winner-2026' && (
                        <span className="px-2.5 py-1 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] font-archivoBlack text-xs uppercase">
                          🏆 1ST PLACE WINNER
                        </span>
                      )}
                      {activeCert.id === 'cert-bugv-ctf-3rd' && (
                        <span className="px-2.5 py-1 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] font-archivoBlack text-xs uppercase">
                          🛡️ 3RD PODIUM
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-spaceMono font-bold text-[#17A34A]">
                      <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                      <span>VERIFIED ASSET</span>
                    </span>
                  </div>

                  {/* Headline Title */}
                  <h3 className="font-archivoBlack uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111] dark:text-white leading-[1.05]">
                    {activeCert.title}
                  </h3>

                  {/* Issuer & Date Strip */}
                  <div className="flex items-center gap-2 font-spaceMono text-xs font-bold text-[#111111] dark:text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-[#17A34A] shrink-0" />
                    <span>{activeCert.issuer}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{activeCert.date}</span>
                  </div>

                  {/* Full Description with Generous Breathing Room */}
                  <p className="font-archivo text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {activeCert.description}
                  </p>

                  {/* Skills Pills */}
                  {activeCert.skills && (
                    <div className="pt-2">
                      <span className="block font-spaceMono text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Technologies &amp; Disciplines
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeCert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 bg-[#F8F6F0] dark:bg-[#1D1F28] border-2 border-[#111111] text-[#111111] dark:text-white font-spaceMono text-xs font-bold shadow-[2px_2px_0_#111111]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Credential ID Copy Box */}
                  {activeCert.credentialId && (
                    <div className="p-3 bg-[#F8F6F0] dark:bg-[#1D1F28] border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center justify-between gap-3 text-xs font-spaceMono">
                      <div className="overflow-hidden">
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase">
                          Credential Identifier
                        </span>
                        <span className="block font-bold text-[#111111] dark:text-white truncate">
                          {activeCert.credentialId}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyId(activeCert.credentialId!)}
                        className="px-2.5 py-1 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border border-[#111111] text-xs font-bold flex items-center gap-1 hover:bg-[#FFE14D] transition-colors cursor-pointer shrink-0"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#17A34A]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Stage Action Buttons & Pagination */}
                <div className="pt-4 border-t-2 border-[#111111]/15 dark:border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick(750);
                        setSelectedCertIndex(currentIndex);
                      }}
                      className="pop-btn flex-1 py-3 px-4 bg-[#FFE14D] hover:bg-[#ffd61a] text-[#111111] text-xs sm:text-sm font-archivoBlack uppercase gap-2 shadow-brutal"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Fullscreen</span>
                    </button>

                    {activeCert.credentialUrl && (
                      <a
                        href={activeCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick(850)}
                        className="pop-btn py-3 px-5 bg-[#7DFFA6] hover:bg-[#68f595] text-[#111111] text-xs sm:text-sm font-archivoBlack uppercase gap-1.5 shadow-brutal shrink-0"
                        title="Verify credential on official portal"
                      >
                        <span>Verify Online</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Stage Progress Bar & Pagination Controls */}
                  <div className="flex items-center justify-between text-xs font-spaceMono font-bold text-zinc-600 dark:text-zinc-400 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 border border-[#111111] bg-white dark:bg-[#111111] text-[#111111] dark:text-white hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause Auto-cycle' : 'Auto-cycle Stage'}
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                      <span>
                        Stage #{String(currentIndex + 1).padStart(2, '0')} of{' '}
                        {String(filteredCertificates.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1 border border-[#111111] bg-white dark:bg-[#111111] text-[#111111] dark:text-white hover:bg-[#FFE14D] transition-colors cursor-pointer"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1 border border-[#111111] bg-white dark:bg-[#111111] text-[#111111] dark:text-white hover:bg-[#FFE14D] transition-colors cursor-pointer"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FILMSTRIP THUMBNAIL CAROUSEL DOCK */}
            <div className="p-3 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal flex items-center gap-3 overflow-x-auto select-none">
              <span className="font-spaceMono text-xs font-bold text-zinc-500 uppercase px-2 shrink-0">
                Deck Filmstrip:
              </span>
              {filteredCertificates.map((cert, idx) => {
                const isActive = idx === currentIndex;
                const catInfo = categoryColors[cert.category] || { bg: '#FFE14D' };

                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => {
                      sounds.playClick(700 + idx * 20);
                      setCurrentIndex(idx);
                    }}
                    className={`relative shrink-0 flex items-center gap-2.5 px-3 py-2 border-2 border-[#111111] text-xs font-spaceMono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFE14D] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                        : 'bg-[#F8F6F0] dark:bg-[#1A1C26] text-[#111111] dark:text-zinc-300 hover:bg-white hover:-translate-y-0.5'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: catInfo.bg }}
                      className="w-2.5 h-2.5 rounded-full border border-[#111111]"
                    />
                    <span className="truncate max-w-[140px] uppercase">{cert.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: UNIFORM ARCHIVAL CATALOG GRID (BALANCED 3-COLUMN LAYOUT)  */}
        {/* ================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCertificates.map((cert, index) => {
              const catInfo = categoryColors[cert.category] || { bg: '#FFE14D', text: '#111' };

              return (
                <div
                  key={cert.id}
                  className="pop-card group relative flex flex-col justify-between overflow-hidden bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal hover:shadow-brutal-xl transition-all"
                >
                  {/* Top Category Header Banner */}
                  <div
                    style={{ backgroundColor: catInfo.bg }}
                    className="px-4 py-2 border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold text-[#111111]"
                  >
                    <span className="uppercase tracking-wider">{cert.category}</span>
                    <span>{cert.date}</span>
                  </div>

                  {/* Document Artwork Viewport */}
                  <div
                    onClick={() => {
                      sounds.playClick(750);
                      setSelectedCertIndex(index);
                    }}
                    className="relative w-full aspect-[4/3] bg-[#0E0F13] border-b-[3px] border-[#111111] flex items-center justify-center p-3 overflow-hidden cursor-pointer group/thumb"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="pop-btn px-4 py-2 bg-white text-[#111111] font-spaceMono font-bold text-xs uppercase gap-1.5 shadow-brutal-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3
                        onClick={() => {
                          sounds.playClick(750);
                          setSelectedCertIndex(index);
                        }}
                        className="font-archivoBlack text-lg uppercase tracking-tight text-[#111111] dark:text-white group-hover:text-[#FF6FB5] transition-colors cursor-pointer line-clamp-2"
                      >
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-1.5 font-spaceMono text-xs font-bold text-zinc-600 dark:text-zinc-400 truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#17A34A] shrink-0" />
                        <span className="truncate">{cert.issuer}</span>
                      </div>

                      <p className="font-archivo text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t-2 border-[#111111]/15 dark:border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playClick(750);
                          setSelectedCertIndex(index);
                        }}
                        className="pop-btn px-4 py-2 bg-[#FFE14D] hover:bg-[#ffd61a] text-[#111111] font-archivoBlack text-xs uppercase gap-1.5 shadow-brutal-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sounds.playClick(850)}
                          className="p-2 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#7DFFA6] transition-colors"
                          title="Verify Credential Online"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* POP BRUTALIST INSPECT LIGHTBOX MODAL                              */}
      {/* ================================================================= */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCertIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner in Pop Yellow */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#FFE14D] text-[#111111] border-b-[3px] border-[#111111] font-spaceMono text-xs font-bold shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="bg-[#111111] text-white px-2.5 py-1 border border-[#111111] uppercase shrink-0">
                  {selectedCert.category}
                </span>
                <span className="font-archivoBlack uppercase text-sm sm:text-base truncate">
                  {selectedCert.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(600);
                    setSelectedCertIndex(null);
                  }}
                  className="p-1.5 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Full-Bleed Image Stage */}
            <div className="relative flex-1 min-h-[340px] max-h-[66vh] flex items-center justify-center p-4 bg-[#0A0B0E] overflow-hidden">
              {filteredCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(680);
                    setSelectedCertIndex((prev) =>
                      prev !== null
                        ? prev === 0
                          ? filteredCertificates.length - 1
                          : prev - 1
                        : null
                    );
                  }}
                  className="absolute left-4 z-20 p-2.5 bg-white text-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FFE14D] hover:-translate-x-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[62vh] max-w-full w-auto h-auto object-contain border-2 border-[#111111] shadow-[6px_6px_0_#000]"
              />

              {filteredCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(720);
                    setSelectedCertIndex((prev) =>
                      prev !== null
                        ? prev === filteredCertificates.length - 1
                          ? 0
                          : prev + 1
                        : null
                    );
                  }}
                  className="absolute right-4 z-20 p-2.5 bg-white text-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FFE14D] hover:translate-x-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                  aria-label="Next Certificate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Footer with Verification details */}
            <div className="p-4 sm:p-5 border-t-[3px] border-[#111111] bg-[#F8F6F0] dark:bg-[#1a1c26] flex flex-wrap items-center justify-between gap-4 font-spaceMono text-xs font-bold shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#111111] dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-[#17A34A] shrink-0" />
                  <span>{selectedCert.issuer}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{selectedCert.date}</span>
                </div>
                {selectedCert.credentialId && (
                  <div className="flex items-center gap-2 text-[11px] font-spaceMono text-zinc-500">
                    <span>CREDENTIAL ID:</span>
                    <span className="text-[#111111] dark:text-zinc-200 font-bold bg-white dark:bg-[#111111] px-2 py-0.5 border border-[#111111]">
                      {selectedCert.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(selectedCert.credentialId!)}
                      className="inline-flex items-center gap-1 text-[10px] text-[#111111] dark:text-zinc-300 underline cursor-pointer"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3 h-3 text-[#17A34A]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick(800)}
                  className="pop-btn px-4 py-2 bg-white dark:bg-[#111111] text-[#111111] dark:text-white text-xs gap-1.5 shadow-brutal-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Raw Image</span>
                </a>

                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick(850)}
                    className="pop-btn px-4 py-2 bg-[#7DFFA6] text-[#111111] text-xs gap-1.5 shadow-brutal-sm"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
