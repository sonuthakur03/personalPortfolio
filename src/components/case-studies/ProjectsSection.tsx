// src/components/case-studies/ProjectsSection.tsx
// Pop Brutalist Engineering Projects Showcase:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - Thick 3px black borders, vibrant color blocking (#FF6FB5, #7DFFA6, #7C9BFF, #FFE14D, #FFB38A)
// - Hard offset brutalist drop shadows (4px, 6px, 10px) with zero blur
// - Dual View Modes: Pop Brutalist Grid Feed + Cinematic Stage
// - "Surprise Me" quick-discovery action
// - Archivo Black display typography and Space Mono data labels
// - Strictly typed, zero emojis, pure SVG engineering aesthetics

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ArrowUpRight,
  Layers,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shuffle,
  LayoutGrid,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { labProjects, getProjectTheme, type LabProject } from '../../data/labProjectsData';
import type { ProjectCaseStudy } from '../../types/projects';
import { sounds } from '../../utils/soundEffects';
import { ScrollReveal } from '../common/ScrollReveal';

interface ProjectsSectionProps {
  onOpenModal: (project: ProjectCaseStudy) => void;
}

const AUTOPLAY_DURATION_MS = 6000;
const PROGRESS_TICK_MS = 50;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenModal }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'stage'>('stage');
  const [surpriseCardId, setSurpriseCardId] = useState<string | null>(null);

  // Carousel stage state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [isTouchPaused, setIsTouchPaused] = useState<boolean>(false);

  const activeProject = labProjects[currentIndex] || labProjects[0];
  const activeColor = getProjectTheme(activeProject.id);

  const goToProject = useCallback(
    (index: number, manualDirection?: number) => {
      const nextDir = manualDirection ?? (index > currentIndex ? 1 : -1);
      setDirection(nextDir);
      setCurrentIndex(index);
      setProgress(0);
      sounds.playClick(680 + index * 25);
    },
    [currentIndex]
  );

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % labProjects.length;
    goToProject(nextIndex, 1);
  }, [currentIndex, goToProject]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + labProjects.length) % labProjects.length;
    goToProject(prevIndex, -1);
  }, [currentIndex, goToProject]);

  const togglePlayPause = useCallback(() => {
    sounds.playClick(isPlaying ? 550 : 750);
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const handleSurpriseMe = () => {
    sounds.playClick(920);
    const pool = labProjects;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];

    const labIdx = labProjects.findIndex((p) => p.id === chosen.id);
    if (labIdx !== -1 && viewMode === 'stage') {
      goToProject(labIdx);
    }

    setSurpriseCardId(chosen.id);
    setTimeout(() => {
      onOpenModal(chosen.originalProject);
      setSurpriseCardId(null);
    }, 400);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setIsTouchPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      setIsTouchPaused(false);
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsTouchPaused(false);
  };

  // Autoplay loop for carousel stage
  useEffect(() => {
    if (viewMode !== 'stage' || !isPlaying || isHovered || isTouchPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = (PROGRESS_TICK_MS / AUTOPLAY_DURATION_MS) * 100;
        const nextVal = prev + increment;
        if (nextVal >= 100) {
          handleNext();
          return 0;
        }
        return nextVal;
      });
    }, PROGRESS_TICK_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewMode, isPlaying, isHovered, isTouchPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;
      const rect = projectsSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' && viewMode === 'stage') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' && viewMode === 'stage') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' && viewMode === 'stage') {
        if (document.activeElement?.tagName !== 'BUTTON' && document.activeElement?.tagName !== 'A') {
          e.preventDefault();
          togglePlayPause();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNext, handlePrev, togglePlayPause]);

  const handleOpenBlueprint = (e: React.MouseEvent, project: LabProject) => {
    e.stopPropagation();
    sounds.playClick(850);
    onOpenModal(project.originalProject);
  };

  const getDomainLabel = (project: LabProject): string => {
    if (project.liveUrl) {
      try {
        return new URL(project.liveUrl).hostname;
      } catch {
        return project.liveUrl.replace(/^https?:\/\//, '');
      }
    }
    if (project.figmaUrl) return 'figma.com/design/travelnp';
    if (project.githubUrl) {
      return `github.com/sonuthakur03/${project.id}`;
    }
    return `${project.id}.local`;
  };

  const perspectiveVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.25, ease: 'easeIn' },
    }),
  };

  return (
    <section
      id="projects"
      aria-label="Engineering Projects Showcase"
      className="py-20 sm:py-28 relative bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ================================================================= */}
        {/* POP BRUTALIST SECTION HEADER                                      */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-[3px] border-[#111111] mb-10">
            <div className="space-y-3 max-w-xl">
              {/* Category Sticker */}
              <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF6FB5] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>01 // Selected Work</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
                Projects
              </h2>

              <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80 leading-relaxed">
                Curated production web architectures, applied AI pipelines, and transactional full-stack backends.
              </p>
            </div>

            {/* Brutalist Controls Toolbar */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
              {/* Surprise Me Button */}
              <button
                type="button"
                onClick={handleSurpriseMe}
                title="Randomly discover a system architecture"
                className="pop-btn px-4 py-2 bg-[#FF6FB5] text-[#111111] text-xs font-spaceMono font-bold gap-2 shadow-brutal"
              >
                <Shuffle className="w-4 h-4" />
                <span>Surprise Me</span>
              </button>

              {/* View Mode Toggle: Grid vs Stage */}
              <div className="inline-flex items-center p-1 bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(650);
                    setViewMode('grid');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-spaceMono font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5 inline mr-1" />
                  <span>Feed</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick(750);
                    setViewMode('stage');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-spaceMono font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'stage'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5 inline mr-1" />
                  <span>Stage</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* VIEW MODE 1: POP BRUTALIST BENTO GRID FEED                        */}
        {/* ================================================================= */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {labProjects.map((project, idx) => {
                const colorConfig = getProjectTheme(project.id);
                const isSurprise = surpriseCardId === project.id;

                return (
                  <motion.article
                    key={project.id}
                    id={`project-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isSurprise ? 1.03 : 1,
                      transition: { duration: 0.35, delay: idx * 0.05 },
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => {
                      sounds.playClick(800);
                      onOpenModal(project.originalProject);
                    }}
                    className={`pop-card group relative flex flex-col justify-between overflow-hidden cursor-pointer dark:bg-[#181A20] ${
                      isSurprise ? 'ring-4 ring-[#FF6FB5]' : ''
                    }`}
                  >
                    <div>
                      {/* Top Color Banner Strip */}
                      <div
                        style={{ backgroundColor: colorConfig.bg }}
                        className="px-4 py-2.5 border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold text-[#111111]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="bg-[#111111] text-white px-2 py-0.5 text-[11px]">
                            {project.number}
                          </span>
                          <span className="uppercase tracking-wider">{project.category}</span>
                        </div>
                        <span className="text-[11px] font-bold">{project.year}</span>
                      </div>

                      {/* Media Image Frame */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border-b-[3px] border-[#111111]">
                        <img
                          src={project.image}
                          alt={`${project.name} preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top Protocol Tag */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2 py-1 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-[10px] font-bold shadow-brutal-sm">
                            {getDomainLabel(project)}
                          </span>
                        </div>

                        {/* Telemetry Status Badge */}
                        <div className="absolute bottom-2.5 left-2.5 z-10">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#111111] text-white border-2 border-[#111111] font-spaceMono text-[10px] font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                            <span>{project.systemStatus}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                        <div>
                          <h3 className="font-archivoBlack text-2xl uppercase tracking-tight text-[#111111] dark:text-white group-hover:text-[#FF6FB5] transition-colors">
                            {project.name}
                          </h3>
                          <p className="mt-1 font-spaceMono text-xs font-bold text-[#111111]/60 dark:text-white/60">
                            {project.role}
                          </p>
                        </div>

                        <p className="font-archivo font-medium text-sm leading-relaxed text-[#111111]/80 dark:text-white/80 line-clamp-3">
                          {project.shortDescription}
                        </p>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-2 border-[#111111] dark:border-white/30 font-spaceMono text-[11px] font-bold shadow-brutal-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-neutral-200 dark:border-white/10 mt-3 pt-4">
                      <button
                        type="button"
                        onClick={(e) => handleOpenBlueprint(e, project)}
                        className="pop-btn px-4 py-2 bg-[#7C9BFF] text-[#111111] text-xs font-spaceMono font-bold gap-1.5 shadow-brutal-sm flex-1"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Blueprint</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="GitHub"
                            className="p-2 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                          >
                            <GithubIcon className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Live Demo"
                            className="p-2 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm hover:bg-[#7DFFA6] transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* VIEW MODE 2: POP BRUTALIST CINEMATIC STAGE                        */}
        {/* ================================================================= */}
        {viewMode === 'stage' && (
          <div>
            {/* Stage Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 bg-[#111111] text-white border-[3px] border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm">
                  <span>{activeProject.number}</span> / <span>0{labProjects.length}</span>
                </div>

                <button
                  type="button"
                  onClick={togglePlayPause}
                  title={isPlaying ? 'Pause' : 'Resume'}
                  className="p-2 bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-sm hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous"
                  className="p-2 bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-sm hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next"
                  className="p-2 bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-sm hover:bg-[#FF6FB5] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="w-full h-2.5 bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-sm overflow-hidden mb-8">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#FF6FB5] transition-all duration-75 ease-linear"
              />
            </div>

            {/* Stage Card */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative min-h-[640px] sm:min-h-[820px] lg:min-h-[580px]"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.article
                  key={activeProject.id}
                  custom={direction}
                  variants={perspectiveVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full min-h-[640px] sm:min-h-[820px] lg:min-h-[580px] flex flex-col justify-between bg-white dark:bg-[#181A20] border-[3px] border-[#111111] shadow-brutal-lg overflow-hidden"
                >
                  {/* Top Color Banner */}
                  <div
                    style={{ backgroundColor: activeColor.bg }}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 border-b-[3px] border-[#111111] flex flex-wrap items-center justify-between gap-2 font-spaceMono text-xs sm:text-sm font-bold text-[#111111]"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="bg-[#111111] text-white px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs">
                        SYSTEM {activeProject.number}
                      </span>
                      <span className="uppercase tracking-wider">{activeProject.category}</span>
                    </div>
                    <span>{activeProject.year}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 p-4 sm:p-7 lg:p-9 items-center flex-1">
                    {/* Left: Spec Details */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[1.05]">
                          {activeProject.name}
                        </h3>
                        <p className="mt-1 font-spaceMono text-xs sm:text-sm font-bold text-[#111111]/70 dark:text-white/70">
                          {activeProject.role}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-white border-2 border-[#111111] font-spaceMono text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                        <span>{activeProject.systemStatus}</span>
                      </div>

                      <p className="font-archivo text-sm sm:text-base font-medium text-[#111111]/85 dark:text-white/85 leading-relaxed line-clamp-3">
                        {activeProject.fullDescription}
                      </p>

                      {/* Tech Chips (Capped to 5 to preserve uniform height) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-spaceMono text-[11px] font-bold uppercase tracking-wider text-[#111111]/60 dark:text-white/60 block">
                          Architecture Stack:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {activeProject.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-2 border-[#111111] dark:border-white/30 font-spaceMono text-[11px] sm:text-xs font-bold shadow-brutal-sm"
                            >
                              {tech}
                            </span>
                          ))}
                          {activeProject.technologies.length > 5 && (
                            <span className="px-2 py-0.5 bg-neutral-100 dark:bg-black/60 text-[#111111] dark:text-white/80 border border-[#111111] dark:border-neutral-700 font-spaceMono text-[10px] font-bold">
                              +{activeProject.technologies.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTAs (Standardized row) */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenBlueprint(e, activeProject)}
                          className="pop-btn px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#FF6FB5] text-[#111111] text-xs sm:text-sm font-spaceMono font-bold gap-1.5 shadow-brutal"
                        >
                          <Layers className="w-4 h-4 shrink-0" />
                          <span>Blueprint</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0" />
                        </button>

                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pop-btn px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#7DFFA6] text-[#111111] text-xs sm:text-sm font-spaceMono font-bold gap-1.5 shadow-brutal"
                          >
                            <ExternalLink className="w-4 h-4 shrink-0" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {activeProject.figmaUrl && (
                          <a
                            href={activeProject.figmaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pop-btn px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#FFE14D] text-[#111111] text-xs sm:text-sm font-spaceMono font-bold gap-1.5 shadow-brutal"
                          >
                            <ExternalLink className="w-4 h-4 shrink-0" />
                            <span>Figma UI</span>
                          </a>
                        )}

                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pop-btn p-2 sm:p-2.5 bg-white dark:bg-[#111111] text-[#111111] dark:text-white text-xs sm:text-sm font-spaceMono font-bold shadow-brutal"
                            title="GitHub"
                          >
                            <GithubIcon className="w-4 h-4 shrink-0" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: Media Showcase */}
                    <div className="lg:col-span-7">
                      <div className="relative aspect-[16/10] w-full border-[3px] border-[#111111] shadow-brutal-md bg-neutral-950 overflow-hidden">
                        <img
                          src={activeProject.image}
                          alt={activeProject.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm">
                            {getDomainLabel(activeProject)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
