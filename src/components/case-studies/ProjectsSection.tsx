// src/components/case-studies/ProjectsSection.tsx
// Redesigned Engineering Projects Showcase:
// - Flagship Spotlight Widescreen Showcases (Project LOOP & CricketNepal)
// - Responsive Multi-Column Bento Grid for Specialized Systems
// - Interactive Category Filtering (All, Applied AI, Full-Stack MERN, Civic & Real-Time)
// - Simulated Browser/CAD Engineering Frames with Telemetry Badges
// - Direct Quick-Actions: Source Code (GitHub), Live Deployment, and Archify System Blueprint
// - Zero Emojis, Pure SVG/Lucide Engineering Aesthetics

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Layers,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { labProjects, type LabProject } from '../../data/labProjectsData';
import type { ProjectCaseStudy } from '../../types/projects';
import { sounds } from '../../utils/soundEffects';
import { ScrollReveal } from '../common/ScrollReveal';

interface ProjectsSectionProps {
  onOpenModal: (project: ProjectCaseStudy) => void;
}

type FilterCategory = 'all' | 'ai' | 'mern' | 'civic';

interface FilterOption {
  id: FilterCategory;
  label: string;
  count: number;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenModal }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Systems', count: labProjects.length },
    { id: 'ai', label: 'Applied AI & Cloud', count: 1 },
    { id: 'mern', label: 'Full-Stack MERN', count: 2 },
    { id: 'civic', label: 'Civic & Interactive', count: 3 },
  ];

  const filteredProjects = labProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return project.id === 'project-loop';
    if (activeFilter === 'mern') {
      return project.id === 'cricket-nepal' || project.id === 'study-track';
    }
    if (activeFilter === 'civic') {
      return (
        project.id === 'public-care' ||
        project.id === 'quizify' ||
        project.id === 'travel-np'
      );
    }
    return true;
  });

  const handleFilterChange = (id: FilterCategory) => {
    if (id !== activeFilter) {
      sounds.playHover(650);
      setActiveFilter(id);
    }
  };

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

  return (
    <section
      id="projects"
      aria-label="Engineering Projects Showcase"
      className="py-24 sm:py-32 relative bg-background text-foreground border-t border-border selection:bg-cyan-500/20 selection:text-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border mb-10 sm:mb-14">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Terminal className="w-3.5 h-3.5" />
                <span>ENGINEERING WORKSPACE // SYSTEM ARCHITECTURES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
                Featured Projects <span className="text-muted-foreground/50 font-light">/</span> Selected Work
              </h2>
              <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
                Production web applications, applied AI pipelines (Google Gemini SDK), and high-concurrency transactional architectures engineered with security rigor.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-900/[0.04] dark:bg-white/[0.04] border border-border self-start md:self-end">
              {filterOptions.map((opt) => {
                const isActive = activeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleFilterChange(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-foreground text-background font-bold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-neutral-900/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-background/20 text-background'
                          : 'bg-neutral-900/10 dark:bg-white/10 text-muted-foreground'
                      }`}
                    >
                      {opt.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* PROJECTS GRID / SHOWCASE STREAM                                   */}
        {/* ================================================================= */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch"
          >
            {filteredProjects.map((project, idx) => {
              // Flagship spotlight: first 2 projects in "all" view span full width (12 cols)
              const isFlagship = activeFilter === 'all' && idx < 2;
              const colSpan = isFlagship ? 'lg:col-span-12' : 'lg:col-span-6';

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className={`${colSpan} group relative rounded-2xl border border-border/80 bg-surface/50 dark:bg-surface/40 hover:bg-surface hover:border-cyan-500/40 dark:hover:border-cyan-400/30 transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden flex flex-col justify-between`}
                >
                  {/* Subtle top accent gradient */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent group-hover:via-cyan-400 transition-colors" />

                  {isFlagship ? (
                    /* -------------------------------------------------------- */
                    /* FLAGSHIP EXPANSIVE SHOWCASE LAYOUT (12 Columns)          */
                    /* -------------------------------------------------------- */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 items-center flex-1">
                      {/* Left: Technical Copy & Metadata (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          {/* Top Subheader */}
                          <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground">
                            <span className="text-cyan-500 font-bold">{project.number}</span>
                            <span className="text-border">/</span>
                            <span className="uppercase tracking-wider">{project.category}</span>
                            <span className="text-border">·</span>
                            <span>{project.year}</span>
                          </div>

                          {/* Title & Role */}
                          <div>
                            <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-foreground group-hover:text-cyan-500 transition-colors">
                              {project.name}
                            </h3>
                            <p className="mt-1 text-xs font-mono font-medium text-muted-foreground">
                              {project.role}
                            </p>
                          </div>

                          {/* Telemetry Status Badge */}
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{project.systemStatus}</span>
                          </div>

                          {/* Description */}
                          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                            {project.fullDescription}
                          </p>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                            CORE TECHNOLOGIES
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-foreground/80 bg-neutral-900/[0.04] dark:bg-white/[0.06] border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-foreground bg-neutral-900/[0.05] dark:bg-white/[0.06] hover:bg-neutral-900/10 dark:hover:bg-white/12 border border-border transition-colors"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                              <span>Source Code</span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold text-white bg-slate-900 hover:bg-black dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live System</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.figmaUrl && (
                            <a
                              href={project.figmaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                            >
                              <span>Figma Spec</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={(e) => handleOpenBlueprint(e, project)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>System Blueprint</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Interactive Browser Mockup Frame (7 cols) */}
                      <div
                        onClick={(e) => handleOpenBlueprint(e, project)}
                        className="lg:col-span-7 cursor-pointer group/frame relative rounded-xl border border-border bg-neutral-950/80 shadow-2xl overflow-hidden aspect-[16/10] flex flex-col justify-between"
                      >
                        {/* Browser Header Chrome */}
                        <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-900/90 border-b border-neutral-800 text-[11px] font-mono text-zinc-400 select-none shrink-0 z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>

                          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-[10px] text-zinc-400 max-w-[220px] truncate">
                            <span className="text-zinc-600">https://</span>
                            <span className="text-zinc-200">{getDomainLabel(project)}</span>
                          </div>

                          <div className="text-[10px] text-zinc-500 font-mono">
                            {project.buildCode}
                          </div>
                        </div>

                        {/* Image Canvas with Zoom & Hover Overlay */}
                        <div className="relative flex-1 overflow-hidden min-h-0 bg-neutral-950 flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={`${project.name} Architecture Showcase`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-105"
                            loading="lazy"
                          />

                          {/* Hover Vignette & Click Indicator */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/50 text-xs font-mono text-cyan-300 shadow-xl scale-95 group-hover/frame:scale-100 transition-transform">
                              <Layers className="w-3.5 h-3.5 text-cyan-400" />
                              <span>View System Architecture</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* -------------------------------------------------------- */
                    /* BALANCED 2-COLUMN GRID CARD LAYOUT                       */
                    /* -------------------------------------------------------- */
                    <div className="p-5 sm:p-6 flex flex-col justify-between h-full space-y-5">
                      {/* Top: Browser Mockup Frame */}
                      <div
                        onClick={(e) => handleOpenBlueprint(e, project)}
                        className="cursor-pointer group/frame relative rounded-xl border border-border bg-neutral-950/80 shadow-md overflow-hidden aspect-[16/10] flex flex-col justify-between"
                      >
                        {/* Chrome Header */}
                        <div className="flex items-center justify-between px-3 py-2 bg-neutral-900/90 border-b border-neutral-800 text-[10px] font-mono text-zinc-400 select-none shrink-0 z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="text-[10px] text-zinc-400 truncate max-w-[180px]">
                            {getDomainLabel(project)}
                          </span>
                          <span className="text-[10px] text-zinc-500">{project.number}</span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative flex-1 overflow-hidden min-h-0 bg-neutral-950 flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={`${project.name} preview`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-105"
                            loading="lazy"
                          />

                          {/* Hover Vignette */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
                              <Layers className="w-3 h-3 text-cyan-400" />
                              <span>Inspect Architecture</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Content & Specs */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                          <span className="text-cyan-500 font-bold">{project.number}</span>
                          <span className="uppercase text-[11px]">{project.category} · {project.year}</span>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-foreground group-hover:text-cyan-500 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5">
                            {project.type}
                          </p>
                        </div>

                        {/* Telemetry Status Chip */}
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{project.systemStatus}</span>
                        </div>

                        <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed line-clamp-3">
                          {project.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-foreground/80 bg-neutral-900/[0.04] dark:bg-white/[0.06] border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-neutral-900/[0.03] dark:bg-white/[0.04] border border-border">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom: Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border text-xs font-mono">
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] text-foreground bg-neutral-900/[0.04] dark:bg-white/[0.06] hover:bg-neutral-900/10 dark:hover:bg-white/12 border border-border transition-colors"
                            >
                              <GithubIcon className="w-3 h-3" />
                              <span>Code</span>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                            >
                              <span>Live</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}

                          {project.figmaUrl && (
                            <a
                              href={project.figmaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors"
                            >
                              <span>Figma</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleOpenBlueprint(e, project)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors cursor-pointer"
                        >
                          <Layers className="w-3 h-3" />
                          <span>Blueprint</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
