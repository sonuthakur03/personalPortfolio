// src/components/case-studies/ProjectsSection.tsx
// Developer Laboratory / Engineering Workspace — Portfolio Projects Section
// Aesthetic: Swiss Graphic Design + Technical Documentation + Developer Workstation
// Architecture: Vertical Project Index (Left) + Interactive Laboratory Workbench Preview (Right)

import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { labProjects, type LabProject } from '../../data/labProjectsData';
import { LabProjectVisual } from './LabProjectVisual';
import type { ProjectCaseStudy } from '../../types/projects';
import { sounds } from '../../utils/soundEffects';
import { ScrollReveal } from '../common/ScrollReveal';

interface ProjectsSectionProps {
  onOpenModal: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeProject = labProjects[activeIndex] || labProjects[0];

  // Subtle cursor follower state over preview
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);

  // Keyboard navigation through project index
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % labProjects.length;
        setActiveIndex(nextIndex);
        sounds.playHover(600 + nextIndex * 30);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + labProjects.length) % labProjects.length;
        setActiveIndex(prevIndex);
        sounds.playHover(600 + prevIndex * 30);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sounds.playClick(750);
        onOpenModal(labProjects[index].originalProject);
      }
    },
    [onOpenModal]
  );

  const handleSelectProject = (index: number) => {
    if (index !== activeIndex) {
      sounds.playHover(650 + index * 25);
      setActiveIndex(index);
    }
  };

  const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePreviewMouseEnter = () => {
    setIsHoveringPreview(true);
  };

  const handlePreviewMouseLeave = () => {
    setIsHoveringPreview(false);
    setCursorPos(null);
  };

  const handleOpenBlueprint = (e: React.MouseEvent, project: LabProject) => {
    e.stopPropagation();
    sounds.playClick(850);
    onOpenModal(project.originalProject);
  };

  return (
    <section
      id="projects"
      aria-label="Developer Laboratory Projects"
      className="py-20 sm:py-28 relative bg-background text-foreground border-t border-border selection:bg-primary/20 selection:text-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* SECTION HEADER: Swiss Engineering Minimal Hierarchy              */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="border-b border-border pb-8 mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span>ENGINEERING WORKSPACE // SYSTEM ARCHITECTURE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
                  PROJECTS <span className="text-muted-foreground/60 font-light">/</span> SELECTED WORK
                </h2>
              </div>
              <div className="font-mono text-xs text-muted-foreground tracking-wider">
                TOTAL_SYSTEMS: <span className="text-foreground font-bold">{labProjects.length} ACTIVE</span>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base font-sans text-muted-foreground max-w-2xl leading-relaxed">
              A selection of systems, experiments, and products I&apos;ve designed and built.
            </p>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* DESKTOP LABORATORY: 2-COLUMN WORKSTATION LAYOUT (hidden on <lg)   */}
        {/* ================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* --------------------------------------------------------------- */}
          {/* LEFT COLUMN: Vertically Stacked Project Index (5 cols)          */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-5" role="tablist" aria-label="Project Index List">
            <div className="flex items-center justify-between pb-3 border-b border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
              <span>INDEX // SYSTEM ID</span>
              <span>YEAR · DOMAIN</span>
            </div>

            <ol className="divide-y divide-border">
              {labProjects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`project-tab-${project.id}`}
                      aria-selected={isActive}
                      aria-controls={`project-panel-${project.id}`}
                      tabIndex={0}
                      onClick={() => handleSelectProject(index)}
                      onMouseEnter={() => handleSelectProject(index)}
                      onFocus={() => handleSelectProject(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-full text-left py-4 px-3 rounded-lg transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-elevated text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-elevated/40'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        {/* Number, Status Dot, and Name */}
                        <div className="flex items-baseline gap-2.5 min-w-0">
                          <span
                            className={`font-mono text-xs tracking-wider shrink-0 w-5 transition-colors ${
                              isActive ? 'text-foreground font-bold' : 'text-muted-foreground/60'
                            }`}
                          >
                            {project.number}
                          </span>

                          {/* Technical Active Indicator */}
                          <span
                            className={`text-[10px] shrink-0 transition-opacity duration-200 ${
                              isActive
                                ? 'text-emerald-500 opacity-100 font-bold'
                                : 'text-muted-foreground/40 opacity-0 group-hover:opacity-40'
                            }`}
                            aria-hidden="true"
                          >
                            ●
                          </span>

                          <h3
                            className={`font-sans font-bold text-base tracking-tight truncate transition-colors ${
                              isActive
                                ? 'text-foreground font-extrabold'
                                : 'text-muted-foreground group-hover:text-foreground'
                            }`}
                          >
                            {project.name}
                          </h3>
                        </div>

                        {/* Year & Category */}
                        <div className="shrink-0 font-mono text-[11px] text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                          <span>{project.year}</span>
                          <span className="mx-1 text-muted-foreground/40">·</span>
                          <span>{project.category}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p
                        className={`mt-1 pl-8 text-xs font-sans transition-colors line-clamp-1 ${
                          isActive ? 'text-foreground/80' : 'text-muted-foreground/70'
                        }`}
                      >
                        {project.shortDescription}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Spacer */}
            <div className="mt-4 pt-4 border-t border-border" />
          </div>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Project Laboratory Preview & Metadata (7 cols)    */}
          {/* --------------------------------------------------------------- */}
          <div
            className="lg:col-span-7 sticky top-28 space-y-6"
            id={`project-panel-${activeProject.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${activeProject.id}`}
          >
            {/* 1. Project Title & Technical Abstract */}
            <div className="transition-opacity duration-300">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                <span>SYSTEM INSPECTION // {activeProject.number} OF 06</span>
                <span className="text-foreground/80 font-bold">{activeProject.type}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
                {activeProject.name}
              </h3>

              <p className="mt-2 text-sm font-sans text-muted-foreground leading-relaxed">
                {activeProject.fullDescription}
              </p>
            </div>

            {/* 2. Large Laboratory Preview Canvas */}
            <div
              ref={previewContainerRef}
              onMouseMove={handlePreviewMouseMove}
              onMouseEnter={handlePreviewMouseEnter}
              onMouseLeave={handlePreviewMouseLeave}
              className="relative rounded-lg border border-border bg-surface shadow-xl overflow-hidden aspect-[16/10] group transition-all duration-300 hover:border-edge"
            >
              <LabProjectVisual project={activeProject} />

              {/* Subtle Custom Cursor Follower over Preview */}
              {isHoveringPreview && cursorPos && (
                <div
                  style={{
                    transform: `translate3d(${cursorPos.x + 16}px, ${cursorPos.y + 16}px, 0)`,
                  }}
                  className="absolute top-0 left-0 pointer-events-none z-30 transition-transform duration-75 ease-out"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface/95 border border-border text-[10px] font-mono text-foreground shadow-2xl backdrop-blur-md">
                    <span>
                      {activeProject.liveUrl
                        ? 'LIVE SYSTEM'
                        : activeProject.figmaUrl
                        ? 'FIGMA SPEC'
                        : 'INSPECT REPO'}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Project Technical Metadata (Swiss Grid) */}
            <div className="border border-border rounded-lg divide-y divide-border bg-surface/60 text-xs font-mono">
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    TYPE
                  </span>
                  <span className="text-foreground font-semibold">{activeProject.type}</span>
                </div>
                <div className="p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    ROLE
                  </span>
                  <span className="text-foreground font-semibold">{activeProject.role}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    STACK
                  </span>
                  <span className="text-foreground/90 font-sans leading-relaxed">
                    {activeProject.technologies.join(' · ')}
                  </span>
                </div>
                <div className="p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    YEAR
                  </span>
                  <span className="text-foreground font-semibold">{activeProject.year}</span>
                </div>
              </div>
            </div>

            {/* 4. Technical Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
              <div className="flex items-center gap-5">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors py-1 group"
                  >
                    <GithubIcon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                    <span>[SOURCE CODE ↗]</span>
                  </a>
                )}

                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold py-1"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>[LIVE DEPLOYMENT ↗]</span>
                  </a>
                )}

                {activeProject.figmaUrl && (
                  <a
                    href={activeProject.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors font-semibold py-1"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>[FIGMA PROTOTYPE ↗]</span>
                  </a>
                )}
              </div>

              {/* Archify Architectural Blueprint Trigger */}
              <button
                type="button"
                onClick={(e) => handleOpenBlueprint(e, activeProject)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono transition-all hover:border-zinc-500"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>[SYSTEM BLUEPRINT ↗]</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* MOBILE RESPONSIVE STREAM: Clean Vertical Experience (<lg)        */}
        {/* ================================================================= */}
        <div className="lg:hidden space-y-16">
          {labProjects.map((project) => (
            <article
              key={project.id}
              className="border-b border-border pb-12 last:border-b-0 space-y-5"
            >
              {/* Project Number & Title */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                  <span>{project.number}</span>
                  <span>{project.year} · {project.category}</span>
                </div>
                <h3 className="text-2xl font-display font-bold tracking-tight text-foreground">
                  {project.name}
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {project.shortDescription}
                </p>
              </div>

              {/* Technical Preview Frame */}
              <div className="relative rounded-lg border border-border bg-surface overflow-hidden aspect-[16/10]">
                <LabProjectVisual project={project} />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Metadata Details */}
              <div className="border border-border rounded-lg divide-y divide-border bg-surface/60 text-xs font-mono p-3 space-y-2">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                    TYPE
                  </span>
                  <span className="text-foreground font-semibold">{project.type}</span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                    STACK
                  </span>
                  <span className="text-foreground/90 font-sans leading-relaxed text-[11px]">
                    {project.technologies.join(' · ')}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                    ROLE
                  </span>
                  <span className="text-foreground font-semibold">{project.role}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-surface text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code ↗</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-300 hover:text-emerald-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Live Demo ↗</span>
                  </a>
                )}

                {project.figmaUrl && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-purple-900/60 bg-purple-950/40 text-purple-300 hover:text-purple-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Figma Spec ↗</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={(e) => handleOpenBlueprint(e, project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 bg-zinc-900 text-cyan-300 hover:text-cyan-200"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Blueprint ↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
