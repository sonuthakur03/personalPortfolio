// src/data/labProjectsData.ts
// Structured project data for the Developer Laboratory / Engineering Workspace
// DRY Principle: Derives directly from canonical projectsData while attaching lab presentation metadata.

import { projectsData } from './projectsData';
import type { ProjectCaseStudy } from '../types/projects';

export interface LabProject {
  readonly id: string;
  readonly number: string; // "01", "02", etc.
  readonly name: string; // e.g. "PROJECT LOOP"
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly year: string;
  readonly category: string;
  readonly type: string;
  readonly role: string;
  readonly technologies: readonly string[];
  readonly systemStatus: string;
  readonly buildCode: string;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly figmaUrl?: string;
  readonly blueprintId: string;
  readonly image: string;
  readonly originalProject: ProjectCaseStudy;
}

export interface ProjectTheme {
  readonly bg: string;
  readonly text: string;
  readonly badge: string;
}

export const projectThemes: Record<string, ProjectTheme> = {
  'project-loop': { bg: '#FF6FB5', text: '#111111', badge: 'bg-[#FF6FB5]' },
  'cricket-nepal': { bg: '#7DFFA6', text: '#111111', badge: 'bg-[#7DFFA6]' },
  'public-care': { bg: '#7C9BFF', text: '#111111', badge: 'bg-[#7C9BFF]' },
  'study-track': { bg: '#FFE14D', text: '#111111', badge: 'bg-[#FFE14D]' },
  'quizify': { bg: '#FFB38A', text: '#111111', badge: 'bg-[#FFB38A]' },
  'travel-np': { bg: '#B9C8FF', text: '#111111', badge: 'bg-[#B9C8FF]' },
};

export const getProjectTheme = (id: string): ProjectTheme => {
  const normalized = id.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return (
    projectThemes[normalized] ||
    projectThemes[normalized.replace(/-/g, '')] || {
      bg: '#FFE14D',
      text: '#111111',
      badge: 'bg-[#FFE14D]',
    }
  );
};

interface LabProjectMeta {
  readonly name?: string;
  readonly shortDescription: string;
  readonly category: string;
  readonly type: string;
  readonly systemStatus: string;
  readonly buildCode: string;
}

const labProjectMeta: Record<string, LabProjectMeta> = {
  'project-loop': {
    shortDescription: 'Voice-of-Customer AI Feedback Intelligence',
    category: 'AI Systems',
    type: 'AI Ingestion & NLP Platform',
    systemStatus: 'VERIFIED ACID TRANSACTIONS',
    buildCode: 'BUILD 2026.07 · LOOP-AI-01',
  },
  'cricket-nepal': {
    name: 'CRICKETNEPAL',
    shortDescription: 'Multi-Role E-Commerce & Concurrency Engine',
    category: 'Full-Stack MERN',
    type: 'High-Concurrency E-Commerce Platform',
    systemStatus: 'MUTEX RESERVATION ACTIVE',
    buildCode: 'BUILD 2026.05 · CN-STORE-02',
  },
  'public-care': {
    name: 'PUBLICCARE',
    shortDescription: 'Civic Issue Escalation & Real-Time Tendering',
    category: 'Civic Tech & IoT',
    type: 'Geospatial & WebSocket Platform',
    systemStatus: '2DSPHERE GEOFENCE VERIFIED',
    buildCode: 'BUILD 2026.07 · PC-CIVIC-03',
  },
  'study-track': {
    name: 'STUDYTRACK NEPAL',
    shortDescription: 'Automated Study Progress & Cron Reminder Engine',
    category: 'Full-Stack MERN',
    type: 'Curriculum & Task Engine',
    systemStatus: 'CRON DAEMON SCHEDULED',
    buildCode: 'BUILD 2026.04 · ST-CRON-04',
  },
  'quizify': {
    shortDescription: 'Security-Hardened Real-Time Trivia Platform',
    category: 'Interactive Web',
    type: 'Client-Side Trivia Engine',
    systemStatus: 'ZERO XSS INJECTION AUDITED',
    buildCode: 'BUILD 2026.02 · QZ-APP-05',
  },
  'travel-np': {
    name: 'TRAVELNP',
    shortDescription: 'Dual-Persona Expedition & Booking Architecture',
    category: 'UI/UX Architecture',
    type: 'Expedition UX Architecture',
    systemStatus: 'SPECIFICATION 100% COMPLETE',
    buildCode: 'BUILD 2026.03 · TNP-UX-06',
  },
};

export const labProjects: readonly LabProject[] = projectsData.map((project, idx) => {
  const meta = labProjectMeta[project.id];
  return {
    id: project.id,
    number: String(idx + 1).padStart(2, '0'),
    name: meta?.name || project.title.toUpperCase(),
    shortDescription: meta?.shortDescription || project.summary.slice(0, 60),
    fullDescription: project.summary,
    year: '2026',
    category: meta?.category || project.category,
    type: meta?.type || 'Platform',
    role: project.role,
    technologies: project.techStack,
    systemStatus: meta?.systemStatus || 'PRODUCTION VERIFIED',
    buildCode: meta?.buildCode || `BUILD 2026.${String(idx + 1).padStart(2, '0')} · ${project.id.toUpperCase()}`,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    figmaUrl: project.figmaUrl,
    blueprintId: project.architectureDiagram.id,
    image: project.image || '/projects/Loop.png',
    originalProject: project,
  };
});
