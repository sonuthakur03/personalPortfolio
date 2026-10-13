import React, { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, ExternalLink, Shield, Layers, Cpu, CheckCircle, Laptop } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { ProjectCaseStudy } from '../../types/projects';

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

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`bg-zinc-950 border border-white/15 text-white flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full max-w-none'
            : 'w-full max-w-5xl max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 border border-white/10 text-white shrink-0 bg-zinc-950">
              <Layers className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 id="case-study-title" className="font-display font-medium text-base text-white truncate">
                {project.title}
              </h2>
              <div className="text-xs font-mono text-zinc-400 truncate">
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
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-background border border-border text-xs font-mono text-primary hover:border-primary transition-colors"
              >
                <span>Live App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-background border border-border text-xs font-mono text-foreground hover:border-primary transition-colors"
              >
                <GithubIcon className="w-3 h-3" />
                <span>Code</span>
              </a>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-background border border-border text-xs font-mono text-accent-cyan hover:border-primary transition-colors"
              >
                <span>Figma</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Inspector'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-5 border-b border-border bg-surface flex items-center gap-4 text-xs font-mono shrink-0 overflow-x-auto">
          {project.image && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'dashboard'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Live Dashboard UI</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Architecture (Archify)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'security'
                ? 'border-accent-emerald text-accent-emerald'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Security & Threat Mitigation</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'metrics'
                ? 'border-accent-cyan text-accent-cyan'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Engineering Metrics & Stack</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* TAB 0: LIVE DASHBOARD UI */}
          {activeTab === 'dashboard' && project.image && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-border/60">
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground">
                    {project.title} — Production Dashboard & Interface System
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    Verified visual interface and operational workspace for {project.role}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                    ✦ Production UI
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 px-2.5 py-0.5 rounded border border-accent-emerald/20 flex items-center gap-1 transition-colors"
                    >
                      <span>Open Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Studio Browser Display Container */}
              <div className="rounded-xl border border-border overflow-hidden bg-background shadow-2xl group relative">
                <div className="px-4 py-2.5 bg-elevated/80 border-b border-border flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-muted-foreground text-[11px] truncate max-w-xs">
                      {project.liveUrl || project.githubUrl || 'dashboard://workspace'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                      ● VERIFIED ASSET
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#090b10] flex items-center justify-center p-3 sm:p-5">
                  <img
                    src={project.image}
                    alt={`${project.title} Dashboard`}
                    className="w-full h-auto max-h-[540px] rounded-lg shadow-2xl object-contain border border-border/50 transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Interface Workflows & Architecture */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  System Workflows & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-elevated/40 border border-border text-xs font-mono text-foreground flex items-start gap-2"
                    >
                      <span className="text-primary font-bold">›</span>
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground">
                    {project.architectureDiagram.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {project.architectureDiagram.subtitle}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 px-2 py-0.5 rounded border border-accent-emerald/20">
                  ✓ Verified via Headless Browser Gate
                </div>
              </div>

              {/* Embedded Interactive Archify Viewport */}
              <div className="flex-1 min-h-[460px] w-full rounded-lg border border-border overflow-hidden bg-background relative shadow-inner">
                <iframe
                  src={project.architectureDiagram.path}
                  title={`${project.title} Architecture Diagram`}
                  className="w-full h-full min-h-[460px] border-0"
                  loading="lazy"
                />
              </div>

              {/* Highlights Pill list */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  System Architecture Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.architectureDiagram.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-elevated/40 border border-border text-xs font-mono text-foreground flex items-start gap-2"
                    >
                      <span className="text-primary font-bold">›</span>
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
              <div className="p-4 rounded-lg bg-accent-emerald/5 border border-accent-emerald/20 text-xs font-mono text-foreground leading-relaxed">
                <strong className="text-accent-emerald font-semibold block mb-1">
                  🛡️ Defense in Depth & CTF Methodology
                </strong>
                Each project undergoes security threat modeling derived from hands-on BugV CTF offensive testing principles: strict input sanitization, rate limiting, and zero-trust perimeter validation.
              </div>

              <div className="space-y-3 mt-4">
                {project.securityHardening.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-elevated/50 border border-subtle space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-foreground text-sm">
                        {sec.title}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-accent-emerald/10 text-accent-emerald text-[11px]">
                        Hardened
                      </span>
                    </div>

                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Threat Mitigated:</strong> {sec.threatMitigated}
                    </div>

                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Implementation:</strong> {sec.implementation}
                    </div>

                    {sec.ctfTakeaway && (
                      <div className="text-accent-cyan text-[11px] pt-1 border-t border-border/40">
                        💡 <strong>CTF Insight:</strong> {sec.ctfTakeaway}
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
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Executive Engineering Summary
                </h4>
                <p className="text-sm font-sans text-foreground leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Key Production & Architecture Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded bg-elevated/50 border border-border font-mono text-xs">
                      <div className="text-accent-cyan font-bold mb-0.5">Metric #{idx + 1}</div>
                      <div className="text-foreground">{m}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-surface border border-subtle text-xs font-mono text-foreground"
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
