// src/components/case-studies/LabProjectVisual.tsx
// High-precision Developer Laboratory / Workbench visualization
// Featuring real project screenshots, Swiss engineering CAD framing, and status telemetry.

import React, { useState } from 'react';
import type { LabProject } from '../../data/labProjectsData';

interface LabProjectVisualProps {
  project: LabProject;
}

export const LabProjectVisual: React.FC<LabProjectVisualProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#07090e] text-zinc-300 font-mono text-xs flex flex-col justify-between overflow-hidden select-none p-2.5 sm:p-3.5">
      {/* Precision CAD Registration Corner Crosshairs */}
      <span className="absolute top-2 left-2 text-[10px] text-zinc-600 font-mono leading-none select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute top-2 right-2 text-[10px] text-zinc-600 font-mono leading-none select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] text-zinc-600 font-mono leading-none select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] text-zinc-600 font-mono leading-none select-none pointer-events-none z-20">
        +
      </span>

      {/* TOP HEADER BAR: Technical System Index & Spec */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wider uppercase text-[11px]">
            {project.name}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
            SYSTEM WORKBENCH
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-400">
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900/60 font-mono">
            {project.buildCode}
          </span>
          <span className="text-zinc-200 font-bold font-mono">{project.number} / 06</span>
        </div>
      </div>

      {/* MAIN VISUAL: The actual project photograph/screenshot */}
      <div className="relative flex-1 w-full rounded border border-zinc-800/80 bg-black/80 overflow-hidden group/image min-h-0 flex items-center justify-center">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 z-0">
            <span className="font-mono text-[10px] text-zinc-600 animate-pulse tracking-widest">
              LOADING SYSTEM ARTIFACT...
            </span>
          </div>
        )}

        <img
          src={project.image}
          alt={`${project.name} preview`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 p-4 text-center font-mono text-xs">
            <span className="text-zinc-400 font-bold mb-1">{project.name}</span>
            <span>SYSTEM PHOTO DISPLAY</span>
          </div>
        )}

        {/* Subtle dark gradient overlay at bottom to anchor floating tags */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Tech stack pills floating over bottom-left of image */}
        <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-zinc-700/70 text-[10px] font-mono text-zinc-300 shadow-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-zinc-700/70 text-[10px] font-mono text-zinc-400 shadow-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Live indicator badge floating over top-right */}
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-zinc-700/80 text-[10px] font-mono text-emerald-400 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DEPLOYED</span>
          </span>
        </div>
      </div>

      {/* BOTTOM FOOTER BAR: System Status & Diagnostic Metrics */}
      <div className="flex flex-wrap items-center justify-between pt-2 mt-2 border-t border-zinc-800 text-[10px] text-zinc-500 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">STATUS:</span>
          <span className="text-zinc-300 font-mono truncate max-w-[200px] sm:max-w-none">
            {project.systemStatus}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span className="text-zinc-400 uppercase">{project.category}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">{project.year}</span>
        </div>
      </div>
    </div>
  );
};
