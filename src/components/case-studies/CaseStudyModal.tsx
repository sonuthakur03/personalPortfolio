// src/components/case-studies/CaseStudyModal.tsx
// Pop Brutalist Interactive Case Study Modal:
// - Heavy 3px solid black borders, shadow-brutal-xl (10px 10px 0 #111)
// - Punchy Pop Brutalist color scheme (#FFE14D header, #FF6FB5 tabs, #7DFFA6 badges)
// - Tactile buttons with push/active offset micro-interactions
// - Archivo Black display typography and Space Mono data labels
// - Strictly typed, zero emojis, full accessibility

import React, { useState } from 'react';
import { X, Maximize2, Minimize2, ExternalLink, Shield, Layers, Cpu, CheckCircle, Laptop, Lightbulb } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { ProjectCaseStudy } from '../../types/projects';
import { sounds } from '../../utils/soundEffects';
import { useModalDismiss } from '../../hooks/useModalDismiss';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'security' | 'metrics'>('dashboard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [prevProjectId, setPrevProjectId] = useState<string | null>(project?.id ?? null);
  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setActiveTab(project.image ? 'dashboard' : 'architecture');
    setIsFullscreen(false);
  }

  // Handle ESC key and scroll lock via shared hook
  useModalDismiss({
    isOpen,
    onClose,
    onEscapeOverride: () => {
      if (isFullscreen) {
        setIsFullscreen(false);
        return true;
      }
      return false;
    },
  });

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl text-[#111111] dark:text-white flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full max-w-none'
            : 'w-full max-w-5xl max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner in Pop Yellow */}
        <div className="px-5 py-4 border-b-[3px] border-[#111111] bg-[#FFE14D] text-[#111111] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 border-2 border-[#111111] bg-[#111111] text-white shadow-[2px_2px_0_#111111] shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 id="case-study-title" className="font-archivoBlack text-base sm:text-lg text-[#111111] uppercase tracking-tight truncate">
                {project.title}
              </h2>
              <div className="text-xs font-spaceMono font-bold text-[#111111]/80 uppercase truncate">
                {project.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Outbound Links */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick(800)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none text-xs font-spaceMono font-bold uppercase transition-all"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick(750)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none text-xs font-spaceMono font-bold uppercase transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                sounds.playClick(700);
                setIsFullscreen(!isFullscreen);
              }}
              className="p-1.5 bg-white text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Inspector'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick(600);
                onClose();
              }}
              className="p-1.5 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-4 py-2.5 border-b-[3px] border-[#111111] bg-[#F8F6F0] dark:bg-[#1a1c24] flex items-center gap-2 text-xs font-spaceMono font-bold shrink-0 overflow-x-auto">
          {project.image && (
            <button
              onClick={() => {
                sounds.playClick(720);
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1.5 border-2 border-[#111111] transition-all flex items-center gap-1.5 shrink-0 uppercase cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#FF6FB5] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                  : 'bg-white dark:bg-zinc-800 text-[#111111] dark:text-zinc-200 shadow-[2px_2px_0_#111111] hover:bg-[#FFE14D]'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Live UI</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick(740);
              setActiveTab('architecture');
            }}
            className={`px-3 py-1.5 border-2 border-[#111111] transition-all flex items-center gap-1.5 shrink-0 uppercase cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-[#7DFFA6] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                : 'bg-white dark:bg-zinc-800 text-[#111111] dark:text-zinc-200 shadow-[2px_2px_0_#111111] hover:bg-[#FFE14D]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture (Archify)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(760);
              setActiveTab('security');
            }}
            className={`px-3 py-1.5 border-2 border-[#111111] transition-all flex items-center gap-1.5 shrink-0 uppercase cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#7C9BFF] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                : 'bg-white dark:bg-zinc-800 text-[#111111] dark:text-zinc-200 shadow-[2px_2px_0_#111111] hover:bg-[#FFE14D]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Security (BugV CTF)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(780);
              setActiveTab('metrics');
            }}
            className={`px-3 py-1.5 border-2 border-[#111111] transition-all flex items-center gap-1.5 shrink-0 uppercase cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-[#FFB38A] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                : 'bg-white dark:bg-zinc-800 text-[#111111] dark:text-zinc-200 shadow-[2px_2px_0_#111111] hover:bg-[#FFE14D]'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Metrics & Stack</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white dark:bg-[#15161C]">
          {/* TAB 0: LIVE DASHBOARD UI */}
          {activeTab === 'dashboard' && project.image && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#111111]/15">
                <div>
                  <h3 className="font-archivoBlack text-base sm:text-lg text-[#111111] dark:text-white uppercase">
                    {project.title} — Production Interface
                  </h3>
                  <p className="text-xs font-spaceMono text-zinc-600 dark:text-zinc-400">
                    Verified visual interface and operational workspace for {project.role}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-spaceMono font-bold text-[#111111] bg-[#FFE14D] px-2.5 py-1 border-2 border-[#111111] shadow-[2px_2px_0_#111111] uppercase">
                    Verified Asset
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-spaceMono font-bold text-[#111111] bg-[#7DFFA6] hover:bg-[#68f595] px-2.5 py-1 border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center gap-1 transition-all uppercase"
                    >
                      <span>Open Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Studio Browser Display Container */}
              <div className="border-[3px] border-[#111111] shadow-[6px_6px_0_#111111] overflow-hidden bg-white dark:bg-[#0c0d12]">
                <div className="px-4 py-2.5 bg-[#F8F6F0] dark:bg-[#1a1c24] border-b-[3px] border-[#111111] flex items-center justify-between text-xs font-spaceMono">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF6FB5] border border-[#111111]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFE14D] border border-[#111111]" />
                    <span className="w-3 h-3 rounded-full bg-[#7DFFA6] border border-[#111111]" />
                    <span className="ml-2 text-zinc-600 dark:text-zinc-400 font-bold truncate max-w-xs">
                      {project.liveUrl || project.githubUrl || 'dashboard://workspace'}
                    </span>
                  </div>
                  <span className="font-spaceMono text-[11px] font-bold text-[#111111] dark:text-zinc-300 uppercase">
                    100% RESPONSIVE
                  </span>
                </div>

                <div className="relative overflow-hidden bg-[#0e0f14] flex items-center justify-center p-3 sm:p-5">
                  <img
                    src={project.image}
                    alt={`${project.title} Dashboard`}
                    className="w-full h-auto max-h-[520px] object-contain border-2 border-[#111111] shadow-[4px_4px_0_#111111]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* System Workflows & Highlights */}
              <div className="pt-2">
                <h4 className="text-xs font-spaceMono uppercase font-bold tracking-wider text-zinc-500 mb-3">
                  System Workflows & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8F6F0] dark:bg-[#1b1d28] border-2 border-[#111111] shadow-[3px_3px_0_#111111] text-xs font-spaceMono font-bold text-[#111111] dark:text-zinc-200 flex items-start gap-2"
                    >
                      <span className="text-[#FF6FB5] font-archivoBlack">›</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b-2 border-[#111111]/15">
                <div>
                  <h3 className="font-archivoBlack text-base sm:text-lg text-[#111111] dark:text-white uppercase">
                    {project.architectureDiagram.title}
                  </h3>
                  <p className="text-xs font-spaceMono text-zinc-600 dark:text-zinc-400">
                    {project.architectureDiagram.subtitle}
                  </p>
                </div>
                <div className="text-xs font-spaceMono font-bold text-[#111111] bg-[#7DFFA6] px-2.5 py-1 border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center gap-1.5 uppercase">
                  <CheckCircle className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                  <span>Archify Verified</span>
                </div>
              </div>

              {/* Embedded Interactive Archify Viewport */}
              <div className="flex-1 min-h-[460px] w-full border-[3px] border-[#111111] shadow-[6px_6px_0_#111111] overflow-hidden bg-white">
                <iframe
                  src={project.architectureDiagram.path}
                  title={`${project.title} Architecture Diagram`}
                  className="w-full h-full min-h-[460px] border-0"
                  loading="lazy"
                />
              </div>

              {/* Highlights Pill list */}
              <div className="pt-2">
                <h4 className="text-xs font-spaceMono uppercase font-bold tracking-wider text-zinc-500 mb-2">
                  System Architecture Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.architectureDiagram.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8F6F0] dark:bg-[#1b1d28] border-2 border-[#111111] shadow-[3px_3px_0_#111111] text-xs font-spaceMono font-bold text-[#111111] dark:text-zinc-200 flex items-start gap-2"
                    >
                      <span className="text-[#7C9BFF] font-archivoBlack">›</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFE14D]/30 border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] text-xs font-spaceMono text-[#111111] dark:text-zinc-200 leading-relaxed">
                <strong className="text-[#111111] dark:text-white font-archivoBlack uppercase flex items-center gap-2 mb-1.5 text-sm">
                  <Shield className="w-4 h-4 text-[#111111] dark:text-white shrink-0" />
                  <span>Defense in Depth & BugV CTF Methodology</span>
                </strong>
                Each project undergoes security threat modeling derived from hands-on BugV National CTF podium (3rd place) principles: strict input sanitization, rate limiting, and zero-trust perimeter validation.
              </div>

              <div className="space-y-3.5 mt-4">
                {project.securityHardening.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-[#1a1c26] border-2 border-[#111111] shadow-[4px_4px_0_#111111] space-y-2.5 font-spaceMono text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-archivoBlack text-[#111111] dark:text-white text-sm uppercase">
                        {sec.title}
                      </span>
                      <span className="px-2.5 py-0.5 border-2 border-[#111111] bg-[#7DFFA6] text-[#111111] font-bold text-[11px] shadow-[2px_2px_0_#111111] uppercase">
                        Hardened
                      </span>
                    </div>

                    <div className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-[#111111] dark:text-white font-bold">Threat Mitigated:</strong> {sec.threatMitigated}
                    </div>

                    <div className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-[#111111] dark:text-white font-bold">Implementation:</strong> {sec.implementation}
                    </div>

                    {sec.ctfTakeaway && (
                      <div className="text-[#111111] dark:text-[#FFE14D] text-[11px] font-bold pt-2 border-t-2 border-[#111111]/15 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-[#FF6FB5] shrink-0" />
                        <span><strong>CTF Insight:</strong> {sec.ctfTakeaway}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: METRICS & STACK */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 bg-[#F8F6F0] dark:bg-[#1b1d28] border-2 border-[#111111] shadow-[4px_4px_0_#111111]">
                <h4 className="text-xs font-spaceMono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Executive Engineering Summary
                </h4>
                <p className="text-sm font-archivo font-medium text-[#111111] dark:text-zinc-200 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="text-xs font-spaceMono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Key Production & Architecture Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-white dark:bg-[#1a1c26] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-spaceMono text-xs">
                      <div className="text-[#FF6FB5] font-archivoBlack uppercase text-xs mb-1">Metric #{idx + 1}</div>
                      <div className="text-[#111111] dark:text-white font-bold">{m}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-spaceMono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] text-xs font-spaceMono font-bold uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
