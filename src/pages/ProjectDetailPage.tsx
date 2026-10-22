// src/pages/ProjectDetailPage.tsx
// Dedicated Deep-Dive Case Study Page for Sonu Thakur's Engineering Projects
// Adheres strictly to Pop Brutalist design language (3px black borders, shadow-brutal, Archivo Black display, Space Mono data labels)
// Features: Problem, Interactive Archify System Architecture, API Design, Database Collections,
// AI-Assisted Engineering Workflow, Honest Project Status (Completed vs Mocked/Sandboxed), Working Evidence Checklist, and Recruiter Fast-Action Bar.

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  Database,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Maximize2,
  Mail,
  Download,
  Terminal,
  Activity,
  Award,
  Check,
  Share2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/BrandIcons';
import { projectsData } from '../data/projectsData';
import { getProjectTheme } from '../data/labProjectsData';
import { STANDARD_RESUME_URL, DEFAULT_EMAIL, DEFAULT_GITHUB, DEFAULT_LINKEDIN } from '../data/profileData';
import { PullCordTheme } from '../components/common/PullCordTheme';
import { ScrollProgressBar } from '../components/common/ScrollProgressBar';
import { sounds } from '../utils/soundEffects';
import type { ProjectCaseStudy } from '../types/projects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeArchTab, setActiveArchTab] = useState<'diagram' | 'flow' | 'api' | 'db'>('diagram');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top upon navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project: ProjectCaseStudy | undefined = projectsData[currentIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl">
          <div className="inline-block p-4 bg-[#FF6FB5] border-2 border-[#111111] shadow-brutal mb-4">
            <AlertTriangle className="w-8 h-8 text-[#111111]" />
          </div>
          <h1 className="font-archivoBlack text-2xl uppercase mb-2">Project Not Found</h1>
          <p className="font-spaceMono text-sm text-neutral-600 dark:text-neutral-300 mb-6">
            The requested project case study could not be located in the engineering registry.
          </p>
          <Link
            to="/#projects"
            className="pop-btn px-5 py-2.5 bg-[#FFE14D] text-[#111111] font-spaceMono font-bold text-xs uppercase shadow-brutal inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];
  const theme = getProjectTheme(project.id);

  const handleShare = () => {
    sounds.playClick(750);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-[#FFE14D] selection:text-[#111111] overflow-x-hidden pb-28">
      {/* Pull-Cord Theme Switcher */}
      <PullCordTheme />

      {/* Reading Progress Indicator */}
      <ScrollProgressBar />

      {/* Top Header / Breadcrumbs Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 dark:bg-[#0D0E12]/95 backdrop-blur-md border-b-[3px] border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/#projects"
              onClick={() => sounds.playClick(600)}
              className="pop-btn px-3 py-1.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Projects</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <span className="text-neutral-400 dark:text-neutral-600 font-spaceMono text-xs hidden sm:inline">/</span>

            <span className="font-spaceMono text-xs font-bold uppercase truncate max-w-[180px] sm:max-w-xs text-[#111111] dark:text-white">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="pop-btn px-2.5 py-1.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm inline-flex items-center gap-1"
              title="Share Case Study"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#17A34A]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            {/* Next / Previous Project Switches */}
            <div className="hidden sm:inline-flex items-center border-2 border-[#111111] shadow-brutal-sm bg-white dark:bg-[#181A20]">
              <button
                onClick={() => {
                  sounds.playClick(650);
                  navigate(`/projects/${prevProject.id}`);
                }}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#111111] dark:text-white border-r border-[#111111] transition-colors"
                title={`Previous: ${prevProject.title}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sounds.playClick(750);
                  navigate(`/projects/${nextProject.id}`);
                }}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#111111] dark:text-white transition-colors"
                title={`Next: ${nextProject.title}`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-10 sm:space-y-14">
        {/* ================================================================= */}
        {/* HERO BANNER SECTION                                               */}
        {/* ================================================================= */}
        <section className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal-xl overflow-hidden">
          {/* Top Decorative Color Strip */}
          <div
            style={{ backgroundColor: theme.bg }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border-b-[3px] border-[#111111] flex flex-wrap items-center justify-between gap-2 text-[#111111] font-spaceMono text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="bg-[#111111] text-white px-2 py-0.5 text-[10px] sm:text-xs">
                SYSTEM #{String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
            {project.period && <span className="text-[11px] sm:text-xs">{project.period}</span>}
          </div>

          <div className="p-5 sm:p-8 lg:p-10 space-y-6">
            <div className="space-y-3">
              {/* Badges for Featured & Hackathon Winner */}
              <div className="flex flex-wrap items-center gap-2">
                {project.id === 'fintrace' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>1ST PLACE WINNER · 72-HOUR IDEAX HACKATHON (FINTECH TRACK)</span>
                  </span>
                )}
                {project.id === 'project-loop' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED VOC AI FEEDBACK INTELLIGENCE SAAS</span>
                  </span>
                )}
                {project.isFeatured && project.id !== 'fintrace' && project.id !== 'project-loop' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FLAGSHIP SYSTEM</span>
                  </span>
                )}
              </div>

              <h1 className="font-archivoBlack text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111] dark:text-white leading-[1.05]">
                {project.title}
              </h1>

              <p className="font-spaceMono text-xs sm:text-sm md:text-base font-bold text-neutral-600 dark:text-neutral-300">
                {project.role}
              </p>
            </div>

            <p className="font-archivo text-base sm:text-lg md:text-xl font-medium leading-relaxed text-[#111111]/90 dark:text-white/90 max-w-4xl">
              {project.summary}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick(850)}
                  className="pop-btn px-4 sm:px-5 py-2 sm:py-2.5 bg-[#7DFFA6] text-[#111111] font-spaceMono font-bold text-xs sm:text-sm uppercase shadow-brutal inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick(750)}
                  className="pop-btn px-4 sm:px-5 py-2 sm:py-2.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] font-spaceMono font-bold text-xs sm:text-sm uppercase shadow-brutal inline-flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick(700)}
                  className="pop-btn px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FFE14D] text-[#111111] font-spaceMono font-bold text-xs sm:text-sm uppercase shadow-brutal inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Figma Specs</span>
                </a>
              )}

              <a
                href="#system-architecture"
                onClick={() => sounds.playClick(600)}
                className="pop-btn px-4 sm:px-5 py-2 sm:py-2.5 bg-[#7C9BFF] text-[#111111] font-spaceMono font-bold text-xs sm:text-sm uppercase shadow-brutal inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Jump to Architecture</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-neutral-200 dark:border-white/10">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 bg-[#F8F6F0] dark:bg-[#1C1E26] border-2 border-[#111111] shadow-brutal-sm font-spaceMono"
                >
                  <div className="text-[10px] sm:text-xs uppercase font-bold text-neutral-500 mb-1">
                    Telemetry Metric #{idx + 1}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#111111] dark:text-white leading-snug">
                    {metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 1: PROBLEM STATEMENT & REAL-WORLD CHALLENGES               */}
        {/* ================================================================= */}
        {project.problemStatement && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                01 · The Problem & Core Technical Challenges
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Problem Statement Card */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal space-y-4">
                <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-[#FF6FB5]">
                  The Real-World Friction
                </h3>
                <p className="font-archivo text-base sm:text-lg leading-relaxed text-[#111111] dark:text-neutral-200">
                  {project.problemStatement.problem}
                </p>
                <div className="p-3.5 bg-[#FFE14D]/20 border-2 border-[#111111] font-spaceMono text-xs text-[#111111] dark:text-neutral-300">
                  <span className="font-bold text-[#111111] dark:text-[#FFE14D]">Engineering Directive: </span>
                  Standard superficial CRUD implementations fail here due to data integrity drift, latency spikes, or
                  unhandled edge cases. Every component below was designed specifically to eliminate these bottlenecks.
                </div>
              </div>

              {/* Challenges Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F8F6F0] dark:bg-[#1A1C24] border-[3px] border-[#111111] shadow-brutal space-y-4">
                <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-neutral-500">
                  Key Technical Roadblocks Solved
                </h3>
                <ul className="space-y-3 font-spaceMono text-xs sm:text-sm">
                  {project.problemStatement.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[10px] mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-[#111111] dark:text-neutral-200 leading-snug">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 2: SYSTEM ARCHITECTURE & INTERACTIVE SPEC                 */}
        {/* ================================================================= */}
        <section id="system-architecture" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#7C9BFF] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                02 · System Architecture & Backend Flow
              </h2>
            </div>

            {/* Navigation Tabs */}
            <div className="inline-flex items-center p-1 bg-white dark:bg-[#181A20] border-2 border-[#111111] shadow-brutal-sm">
              <button
                onClick={() => {
                  sounds.playClick(600);
                  setActiveArchTab('diagram');
                }}
                className={`px-3 py-1 text-xs font-spaceMono font-bold uppercase transition-all ${
                  activeArchTab === 'diagram'
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                Live Archify
              </button>
              {project.architectureSpec?.backendFlow && (
                <button
                  onClick={() => {
                    sounds.playClick(650);
                    setActiveArchTab('flow');
                  }}
                  className={`px-3 py-1 text-xs font-spaceMono font-bold uppercase transition-all ${
                    activeArchTab === 'flow'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Backend Flow
                </button>
              )}
              {project.architectureSpec?.apiEndpoints && (
                <button
                  onClick={() => {
                    sounds.playClick(700);
                    setActiveArchTab('api');
                  }}
                  className={`px-3 py-1 text-xs font-spaceMono font-bold uppercase transition-all ${
                    activeArchTab === 'api'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  API Design
                </button>
              )}
              {project.architectureSpec?.collections && (
                <button
                  onClick={() => {
                    sounds.playClick(750);
                    setActiveArchTab('db');
                  }}
                  className={`px-3 py-1 text-xs font-spaceMono font-bold uppercase transition-all ${
                    activeArchTab === 'db'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Database
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Live Archify Diagram Viewer */}
          {activeArchTab === 'diagram' && (
            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-[#FFE14D] border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold text-[#111111]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                  <span className="uppercase">{project.architectureDiagram.title}</span>
                </div>
                <a
                  href={project.architectureDiagram.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pop-btn px-2.5 py-1 bg-white text-[#111111] border-2 border-[#111111] text-[11px] font-bold shadow-brutal-sm inline-flex items-center gap-1"
                >
                  <span>Fullscreen</span>
                  <Maximize2 className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe embedding the Archify SVG architecture */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#181A20] min-h-[380px] sm:min-h-[500px]">
                <iframe
                  src={project.architectureDiagram.path}
                  title={`${project.title} Architecture Diagram`}
                  className="w-full h-full border-none"
                  loading="lazy"
                />
              </div>

              {/* Architecture Key Highlights */}
              <div className="p-4 sm:p-6 bg-[#F8F6F0] dark:bg-[#1A1C24] border-t-[3px] border-[#111111]">
                <h4 className="font-spaceMono text-xs uppercase font-bold text-neutral-500 mb-3">
                  Verified Architectural Guarantees
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-spaceMono text-xs">
                  {project.architectureDiagram.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-[#15161C] border-2 border-[#111111] shadow-brutal-sm"
                    >
                      <span className="font-archivoBlack text-[#7C9BFF] block mb-1">P#{idx + 1}</span>
                      <p className="text-[#111111] dark:text-neutral-200 leading-snug">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Step-by-Step Backend Flow */}
          {activeArchTab === 'flow' && project.architectureSpec?.backendFlow && (
            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal p-6 sm:p-8 space-y-4">
              <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-[#7C9BFF]">
                Deterministic Request Lifecycle & Pipeline
              </h3>
              <div className="space-y-3 font-spaceMono text-xs sm:text-sm">
                {project.architectureSpec.backendFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F6F0] dark:bg-[#1A1C24] border-2 border-[#111111] shadow-brutal-sm flex items-start gap-3"
                  >
                    <span className="shrink-0 px-2 py-0.5 bg-[#111111] text-white font-bold text-xs">
                      STEP {idx + 1}
                    </span>
                    <span className="text-[#111111] dark:text-neutral-200 leading-relaxed font-mono">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Production API Design */}
          {activeArchTab === 'api' && project.architectureSpec?.apiEndpoints && (
            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal overflow-x-auto">
              <table className="w-full text-left font-spaceMono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FFE14D] border-b-[3px] border-[#111111] text-[#111111] font-bold uppercase">
                    <th className="p-3 sm:p-4">Method</th>
                    <th className="p-3 sm:p-4">Endpoint</th>
                    <th className="p-3 sm:p-4">Purpose / Operation</th>
                    <th className="p-3 sm:p-4">Payload / Params</th>
                    <th className="p-3 sm:p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 dark:divide-white/10">
                  {project.architectureSpec.apiEndpoints.map((ep, idx) => {
                    const methodColor =
                      ep.method === 'GET'
                        ? 'bg-[#7DFFA6] text-[#111111]'
                        : ep.method === 'POST'
                        ? 'bg-[#7C9BFF] text-[#111111]'
                        : ep.method === 'DELETE'
                        ? 'bg-[#FF6FB5] text-[#111111]'
                        : 'bg-[#FFE14D] text-[#111111]';

                    return (
                      <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                        <td className="p-3 sm:p-4 font-bold">
                          <span className={`px-2 py-0.5 border border-[#111111] text-[10px] font-bold ${methodColor}`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 font-mono font-bold text-[#111111] dark:text-white">{ep.path}</td>
                        <td className="p-3 sm:p-4 text-neutral-700 dark:text-neutral-300">{ep.description}</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px] text-neutral-500">{ep.payloadOrParams || '—'}</td>
                        <td className="p-3 sm:p-4 font-bold text-[#17A34A]">{ep.responseCode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: Database Schema Collections */}
          {activeArchTab === 'db' && project.architectureSpec?.collections && (
            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal p-6 sm:p-8 space-y-6">
              {project.architectureSpec.databaseOverview && (
                <p className="font-spaceMono text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border-l-4 border-[#7C9BFF] pl-4">
                  {project.architectureSpec.databaseOverview}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.architectureSpec.collections.map((col, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F6F0] dark:bg-[#1A1C24] border-2 border-[#111111] shadow-brutal-sm space-y-2.5 font-spaceMono text-xs"
                  >
                    <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-2">
                      <Database className="w-4 h-4 text-[#7C9BFF]" />
                      <span className="font-bold text-[#111111] dark:text-white uppercase">{col.name}</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-snug">{col.purpose}</p>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Key Fields & Indexes:</span>
                      <div className="flex flex-wrap gap-1">
                        {col.keyFields.map((field, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-1.5 py-0.5 bg-white dark:bg-[#111111] border border-[#111111] text-[10px] text-[#111111] dark:text-white font-mono"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: SECURITY HARDENING & OWASP DEFENSE                     */}
        {/* ================================================================= */}
        {project.securityHardening && project.securityHardening.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <Shield className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                03 · Application Security & OWASP Defense
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.securityHardening.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal space-y-3 font-spaceMono text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#111111] text-white font-bold text-[10px]">RULE {idx + 1}</span>
                    <h4 className="font-bold uppercase text-[#111111] dark:text-white truncate">{sec.title}</h4>
                  </div>

                  <div className="p-2.5 bg-[#FF6FB5]/15 border-2 border-[#111111]">
                    <span className="font-bold text-[#FF6FB5] block text-[10px] uppercase">Threat Mitigated:</span>
                    <span className="text-[#111111] dark:text-neutral-200">{sec.threatMitigated}</span>
                  </div>

                  <div>
                    <span className="font-bold text-neutral-500 block text-[10px] uppercase mb-1">Defense Implementation:</span>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-snug">{sec.implementation}</p>
                  </div>

                  {sec.ctfTakeaway && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-white/10 text-[11px] text-neutral-500 italic">
                      🎯 CTF Discipline: {sec.ctfTakeaway}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 4: AI-ASSISTED ENGINEERING & INDIVIDUAL OWNERSHIP         */}
        {/* ================================================================= */}
        {project.aiEngineering && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <Cpu className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                04 · AI-Assisted Engineering Workflow & Individual Ownership
              </h2>
            </div>

            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal-xl p-6 sm:p-8 space-y-6">
              {/* Individual Ownership Disclosure */}
              <div className="p-4 sm:p-5 bg-[#FFE14D]/25 border-2 border-[#111111]">
                <h3 className="font-spaceMono text-xs uppercase font-bold text-[#111111] dark:text-[#FFE14D] mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#17A34A]" />
                  <span>Individual Authorship & Engineering Ownership</span>
                </h3>
                <p className="font-archivo text-sm sm:text-base font-medium text-[#111111] dark:text-neutral-100 leading-relaxed">
                  {project.aiEngineering.individualOwnership}
                </p>
              </div>

              {/* Workflow & Human Verification Rhythm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 font-spaceMono text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[#7C9BFF] flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span>Antigravity Workflow & Prompt Rhythm</span>
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {project.aiEngineering.aiWorkflowDescription}
                  </p>
                </div>

                <div className="space-y-3 font-spaceMono text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[#17A34A] flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Human Verification & Rigorous Audit</span>
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {project.aiEngineering.humanVerificationRhythm}
                  </p>
                </div>
              </div>

              {/* Tools Used Pills */}
              <div className="pt-4 border-t-2 border-neutral-200 dark:border-white/10 space-y-2">
                <span className="font-spaceMono text-xs uppercase font-bold text-neutral-500 block">
                  AI Toolset & Verification Infrastructure:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.aiEngineering.aiToolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 5: HONEST PROJECT STATUS (COMPLETED VS MOCKED/ROADMAP)    */}
        {/* ================================================================= */}
        {project.projectStatus && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#FFB38A] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                05 · Honest Project Status & Feature Breakdown
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: Completed Features */}
              <div className="p-5 sm:p-6 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-3">
                  <span className="w-3 h-3 rounded-full bg-[#17A34A]" />
                  <h3 className="font-archivoBlack text-base uppercase text-[#111111] dark:text-white">
                    Completed & Live
                  </h3>
                </div>
                <ul className="space-y-2.5 font-spaceMono text-xs">
                  {project.projectStatus.completed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                      <Check className="w-3.5 h-3.5 text-[#17A34A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: In-Progress / Mocked / Sandboxed */}
              <div className="p-5 sm:p-6 bg-[#FFE14D]/15 dark:bg-[#FFE14D]/10 border-[3px] border-[#111111] shadow-brutal space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-3">
                  <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
                  <h3 className="font-archivoBlack text-base uppercase text-[#111111] dark:text-white">
                    Sandboxed / In Progress
                  </h3>
                </div>
                <ul className="space-y-2.5 font-spaceMono text-xs">
                  {project.projectStatus.inProgressOrMocked.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#EAB308] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Future Roadmap */}
              <div className="p-5 sm:p-6 bg-[#7C9BFF]/15 dark:bg-[#7C9BFF]/10 border-[3px] border-[#111111] shadow-brutal space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-3">
                  <span className="w-3 h-3 rounded-full bg-[#7C9BFF]" />
                  <h3 className="font-archivoBlack text-base uppercase text-[#111111] dark:text-white">
                    Future Roadmap
                  </h3>
                </div>
                <ul className="space-y-2.5 font-spaceMono text-xs">
                  {project.projectStatus.futureRoadmap.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                      <Clock className="w-3.5 h-3.5 text-[#7C9BFF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 6: WORKING EVIDENCE & VERIFIABLE FEATURES                  */}
        {/* ================================================================= */}
        {project.workingEvidence && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                06 · Working Evidence & Verifiable Features
              </h2>
            </div>

            <div className="border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal-xl p-6 sm:p-8 space-y-6">
              {project.workingEvidence.demoNote && (
                <div className="p-4 bg-[#7DFFA6]/20 border-2 border-[#111111] font-spaceMono text-xs text-[#111111] dark:text-neutral-200">
                  <span className="font-bold text-[#111111] dark:text-[#7DFFA6]">Verifier Note: </span>
                  {project.workingEvidence.demoNote}
                </div>
              )}

              {/* Verifiable Features List */}
              <div className="space-y-3 font-spaceMono text-xs">
                {project.workingEvidence.verifiableFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F6F0] dark:bg-[#1A1C24] border-2 border-[#111111] shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#111111] text-white font-bold text-[10px]">
                          V-TEST #{idx + 1}
                        </span>
                        <span className="font-bold text-[#111111] dark:text-white uppercase">{feat.feature}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">{feat.howToVerify}</p>
                    </div>

                    <span
                      className={`self-start sm:self-center px-2.5 py-1 text-[10px] font-bold uppercase border border-[#111111] shrink-0 ${
                        feat.status === 'verified-live'
                          ? 'bg-[#7DFFA6] text-[#111111]'
                          : feat.status === 'interactive-demo'
                          ? 'bg-[#FFE14D] text-[#111111]'
                          : 'bg-[#7C9BFF] text-[#111111]'
                      }`}
                    >
                      {feat.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Demo Launch Action */}
              {project.liveUrl && (
                <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                  <span className="font-spaceMono text-xs text-neutral-500">
                    Ready to test this system firsthand?
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pop-btn px-4 py-2 bg-[#7DFFA6] text-[#111111] font-spaceMono font-bold text-xs uppercase shadow-brutal inline-flex items-center gap-1.5"
                  >
                    <span>Open Live Verification Environment</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 7: OUTCOMES & IMPACT                                      */}
        {/* ================================================================= */}
        {project.outcomes && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                <Award className="w-4 h-4" />
              </span>
              <h2 className="font-archivoBlack text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-white">
                07 · Outcomes & Real-World Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal space-y-4">
                <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-neutral-500">
                  Key Quantitative & Qualitative Results
                </h3>
                <ul className="space-y-2.5 font-spaceMono text-xs sm:text-sm">
                  {project.outcomes.keyResults.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6FB5] shrink-0 mt-2" />
                      <span className="leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 p-6 sm:p-8 bg-[#FFE14D] border-[3px] border-[#111111] shadow-brutal text-[#111111] space-y-3">
                <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-[#111111]/80">
                  Final Takeaway
                </h3>
                <p className="font-archivo text-sm sm:text-base font-bold leading-relaxed">
                  {project.outcomes.impact}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 8: TECHNOLOGIES & PACKAGES                                */}
        {/* ================================================================= */}
        <section className="p-6 sm:p-8 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal space-y-4">
          <h3 className="font-spaceMono text-xs uppercase font-bold tracking-wider text-neutral-500">
            Complete Technology & Infrastructure Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-[#F8F6F0] dark:bg-[#1C1E26] text-[#111111] dark:text-white border-2 border-[#111111] font-spaceMono text-xs font-bold shadow-brutal-sm uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* RECRUITER FAST-ACTION CALL TO ACTION                              */}
        {/* ================================================================= */}
        <section className="border-[3px] border-[#111111] bg-[#FFE14D] text-[#111111] p-6 sm:p-10 shadow-brutal-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="px-2.5 py-0.5 bg-[#111111] text-white font-spaceMono text-xs font-bold uppercase inline-block">
                For Technical Recruiters & Engineering Leads
              </span>
              <h2 className="font-archivoBlack text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-tight">
                Evaluating Sonu for an Engineering Role?
              </h2>
              <p className="font-archivo font-medium text-sm sm:text-base text-[#111111]/85 leading-relaxed max-w-2xl">
                I am actively seeking high-impact Full-Stack (MERN) and Applied AI developer opportunities where
                disciplined architecture, real-world security hardening, and fast execution matter.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <a
                href={STANDARD_RESUME_URL}
                download="Sonu_Thakur_CV.pdf"
                className="pop-btn w-full py-2.5 bg-[#111111] text-white font-spaceMono text-xs font-bold uppercase shadow-brutal text-center inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href={`mailto:${DEFAULT_EMAIL}?subject=Engineering%20Opportunity%20-%20${encodeURIComponent(project.title)}`}
                className="pop-btn w-full py-2.5 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal text-center inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email Inquiry</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={DEFAULT_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pop-btn flex-1 py-2 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal-sm text-center inline-flex items-center justify-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEFAULT_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pop-btn flex-1 py-2 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal-sm text-center inline-flex items-center justify-center gap-1.5"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Case Study Footer Navigation */}
        <div className="flex items-center justify-between border-t-2 border-[#111111] pt-6 font-spaceMono text-xs font-bold">
          <Link
            to={`/projects/${prevProject.id}`}
            onClick={() => sounds.playClick(600)}
            className="inline-flex items-center gap-2 text-[#111111] dark:text-white hover:text-[#FF6FB5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREVIOUS:</span>
            <span className="uppercase">{prevProject.title}</span>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            onClick={() => sounds.playClick(700)}
            className="inline-flex items-center gap-2 text-[#111111] dark:text-white hover:text-[#7DFFA6] transition-colors"
          >
            <span className="hidden sm:inline">NEXT:</span>
            <span className="uppercase">{nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
