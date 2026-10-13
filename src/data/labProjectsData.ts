// src/data/labProjectsData.ts
// Structured project data for the Developer Laboratory / Engineering Workspace
// Strictly maps to Sonu Thakur's real projects and verified CV credentials.

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

export const labProjects: readonly LabProject[] = [
  {
    id: 'project-loop',
    number: '01',
    name: 'PROJECT LOOP',
    shortDescription: 'Voice-of-Customer AI Feedback Intelligence',
    fullDescription:
      'AI-powered customer feedback intelligence platform integrating Google Gemini AI SDK for automated sentiment scoring, theme classification, and Voice of Customer (VOC) risk matrix reports, backed by ACID-compliant transactional APIs.',
    year: '2026',
    category: 'AI Systems',
    type: 'AI Ingestion & NLP Platform',
    role: 'Full-Stack Developer Intern, Zidio',
    technologies: ['React', 'Node.js', 'Express', 'Google Gemini SDK', 'MongoDB', 'Tailwind CSS'],
    systemStatus: 'VERIFIED ACID TRANSACTIONS',
    buildCode: 'BUILD 2026.07 · LOOP-AI-01',
    githubUrl: 'https://github.com/sonuthakur03/loop',
    blueprintId: 'arch-loop',
    image: '/projects/Loop.png',
    originalProject: projectsData[0],
  },
  {
    id: 'cricket-nepal',
    number: '02',
    name: 'CRICKETNEPAL',
    shortDescription: 'Multi-Role E-Commerce & Concurrency Engine',
    fullDescription:
      'Multi-role (Buyer, Seller, Admin) MERN eCommerce marketplace with temporary server-side stock reservations, Cloudinary media CDN, and a unified 3-gateway payment router supporting Khalti, eSewa, and Stripe.',
    year: '2026',
    category: 'Full-Stack MERN',
    type: 'High-Concurrency E-Commerce Platform',
    role: 'Lead Full-Stack Developer',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Khalti', 'eSewa', 'Stripe', 'Cloudinary'],
    systemStatus: 'MUTEX RESERVATION ACTIVE',
    buildCode: 'BUILD 2026.05 · CN-STORE-02',
    liveUrl: 'https://cricket-nepal-kappa.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/cricketNepal',
    blueprintId: 'arch-cricketnepal',
    image: '/projects/CricketNepal.png',
    originalProject: projectsData[1],
  },
  {
    id: 'public-care',
    number: '03',
    name: 'PUBLICCARE',
    shortDescription: 'Civic Issue Escalation & Real-Time Tendering',
    fullDescription:
      'Civic tech complaint and hygiene platform built at Embark Hackathon. Enables citizens to pin issues with GPS coordinates, triggers automated priority escalation upon cluster verification, and coordinates real-time municipal contractor bidding over WebSockets.',
    year: '2026',
    category: 'Civic Tech & IoT',
    type: 'Geospatial & WebSocket Platform',
    role: 'Full-Stack & Security Lead',
    technologies: ['Node.js', 'Express', 'MongoDB (2dsphere)', 'Socket.io', 'Leaflet', 'JWT'],
    systemStatus: '2DSPHERE GEOFENCE VERIFIED',
    buildCode: 'BUILD 2026.07 · PC-CIVIC-03',
    githubUrl: 'https://github.com/sonuthakur03/PublicCare',
    blueprintId: 'arch-publiccare',
    image: '/projects/PublicCare.png',
    originalProject: projectsData[2],
  },
  {
    id: 'study-track',
    number: '04',
    name: 'STUDYTRACK NEPAL',
    shortDescription: 'Automated Study Progress & Cron Reminder Engine',
    fullDescription:
      'Full-stack MERN study progress tracker featuring automated daily streak calculations, background node-cron reminder schedules, and responsive HTML email digest dispatches via Nodemailer and SMTP.',
    year: '2026',
    category: 'Full-Stack MERN',
    type: 'Curriculum & Task Engine',
    role: 'Sole Full-Stack Developer',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Node-Cron', 'Nodemailer', 'SMTP'],
    systemStatus: 'CRON DAEMON SCHEDULED',
    buildCode: 'BUILD 2026.04 · ST-CRON-04',
    liveUrl: 'https://study-tracker-gules-delta.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/study-tracker',
    blueprintId: 'arch-studytrack',
    image: '/projects/StudyTrack.png',
    originalProject: projectsData[3],
  },
  {
    id: 'quizify',
    number: '05',
    name: 'QUIZIFY',
    shortDescription: 'Security-Hardened Real-Time Trivia Platform',
    fullDescription:
      'Dynamic quiz application in React and Tailwind CSS that queries the Open Trivia Database API with session token management, client-side HTML entity decoding/sanitization, and localStorage analytics without dangerouslySetInnerHTML.',
    year: '2026',
    category: 'Interactive Web',
    type: 'Client-Side Trivia Engine',
    role: 'Frontend & Security Developer',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Open Trivia DB API', 'LocalStorage'],
    systemStatus: 'ZERO XSS INJECTION AUDITED',
    buildCode: 'BUILD 2026.02 · QZ-APP-05',
    liveUrl: 'https://quiz-bizz-quiz-webapp.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/QuizBizz',
    blueprintId: 'arch-quizify',
    image: '/projects/QuizBizz.png',
    originalProject: projectsData[4],
  },
  {
    id: 'travel-np',
    number: '06',
    name: 'TRAVELNP',
    shortDescription: 'Dual-Persona Expedition & Booking Architecture',
    fullDescription:
      'Full UI/UX architecture and interactive prototype designed in Figma for a travel management platform. Features dual-persona workflows (tourist discovery vs hotel self-registration), geo-proximity discovery, and local guide booking.',
    year: '2026',
    category: 'UI/UX Architecture',
    type: 'Expedition UX Architecture',
    role: 'UI/UX & Product Designer',
    technologies: ['Figma', 'UI/UX Prototyping', 'User Flow Mapping', 'Information Architecture'],
    systemStatus: 'SPECIFICATION 100% COMPLETE',
    buildCode: 'BUILD 2026.03 · TNP-UX-06',
    figmaUrl: 'https://figma.com/design/K4bc1L7tnImrWXYh85Qojs/travelnp',
    blueprintId: 'arch-travelnp',
    image: '/projects/TravelNP.png',
    originalProject: projectsData[5],
  },
];
