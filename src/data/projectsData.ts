// src/data/projectsData.ts
import type { ProjectCaseStudy } from '../types/projects';

export const projectsData: readonly ProjectCaseStudy[] = [
  {
    id: 'project-loop',
    title: 'Project LOOP',
    role: 'Full Stack Developer Intern, Zidio Development',
    category: 'ai-systems',
    period: '07/2026 - Present',
    summary:
      'AI-powered customer feedback intelligence platform integrating Google Gemini AI SDK for automated sentiment scoring, theme classification, and Voice of Customer (VOC) risk matrix reports, backed by ACID-compliant transactional APIs.',
    githubUrl: 'https://github.com/sonuthakur03/loop',
    architectureDiagram: {
      id: 'arch-loop',
      title: 'Project LOOP — AI Feedback Intelligence Architecture',
      subtitle: 'Gemini AI SDK, Multi-turn Chat, ACID Transactions & Security Perimeter',
      type: 'architecture',
      path: '/architectures/project-loop.html',
      keyHighlights: [
        'Google Gemini SDK ingestion for sentiment and theme classification',
        'Multi-turn conversational AI ("Ask LOOP") natural language querying',
        'ACID-compliant MongoDB session transactions preventing partial feedback writes',
        'Security perimeter: Rate limiting, Helmet security headers, and XSS sanitization',
      ],
    },
    securityHardening: [
      {
        title: 'API Rate Limiting & Abuse Prevention',
        threatMitigated: 'Denial of Service (DoS) and automated prompt brute-forcing',
        implementation: 'Express-rate-limit configured on LLM ingestion and member invite routes',
        ctfTakeaway: 'Applied rate-limiting principles tested during BugV CTF to prevent resource exhaustion',
      },
      {
        title: 'Multi-Document ACID Safety',
        threatMitigated: 'Database race conditions and inconsistent feedback state',
        implementation: 'Wrapped multi-document writes into atomic MongoDB replica sessions with rollback safety',
      },
      {
        title: 'Zero LLM Secret Leakage',
        threatMitigated: 'Client-side extraction of proprietary Gemini API credentials',
        implementation: 'Server-side API proxying with environment variable isolation on Render/Vercel',
      },
    ],
    techStack: ['Node.js', 'Express', 'React', 'Google Gemini SDK', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    metrics: ['2-person core engineering team', '100% ACID compliant writes', 'Zero credential exposure'],
    image: '/projects/Loop.png',
  },
  {
    id: 'cricket-nepal',
    title: 'CricketNepal',
    role: 'Lead Full-Stack Developer',
    category: 'fullstack-mern',
    summary:
      'Multi-role (Buyer, Seller, Admin) MERN eCommerce marketplace with temporary server-side stock reservations, Cloudinary media CDN, and a unified 3-gateway payment router supporting Khalti, eSewa, and Stripe.',
    liveUrl: 'https://cricket-nepal-kappa.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/cricketNepal',
    architectureDiagram: {
      id: 'arch-cricketnepal',
      title: 'CricketNepal — Multi-Role eCommerce & Payment Engine Architecture',
      subtitle: 'Server-Side Stock Reservation, 3-Gateway Payment Router & RBAC Hierarchy',
      type: 'architecture',
      path: '/architectures/cricketnepal.html',
      keyHighlights: [
        'Server-side concurrency lock to eliminate stock overselling during flash sales',
        'Triple payment gateway integration: domestic (Khalti, eSewa) and international (Stripe)',
        'Role-Based Access Control (RBAC) isolating Buyer, Seller, and Admin boundaries',
        'Direct authenticated Cloudinary uploads for product catalogs and verification docs',
      ],
    },
    securityHardening: [
      {
        title: 'Inventory Concurrency Lock',
        threatMitigated: 'Race conditions and double-spending / overselling of high-demand gear',
        implementation: 'Atomic inventory decrement with automated lock expiry timeout',
      },
      {
        title: 'Payment Webhook Signature Verification',
        threatMitigated: 'Replay attacks and forged payment confirmation callbacks',
        implementation: 'HMAC SHA-256 signature verification on Stripe and domestic gateway webhooks',
      },
      {
        title: 'JWT Role Isolation',
        threatMitigated: 'Privilege escalation and unauthorized catalog tampering',
        implementation: 'Strict middleware validation verifying role claims on each protected endpoint',
      },
    ],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Khalti', 'eSewa', 'Stripe', 'Cloudinary'],
    metrics: ['3 integrated payment gateways', 'Live on Vercel & Render', 'Zero oversell concurrency guarantee'],
    image: '/projects/CricketNepal.png',
  },
  {
    id: 'public-care',
    title: 'PublicCare',
    role: 'Full-Stack & Security Lead (Hackathon Team)',
    category: 'civic-tech',
    period: 'Jul 27-29, 2026',
    summary:
      'Civic tech complaint and hygiene platform built at Embark Hackathon. Enables citizens to pin issues with GPS coordinates and photos, triggers automated priority escalation upon cluster verification, and coordinates real-time municipal contractor bidding over WebSockets.',
    githubUrl: 'https://github.com/sonuthakur03/PublicCare',
    architectureDiagram: {
      id: 'arch-publiccare',
      title: 'PublicCare — Civic Issue Escalation & Real-Time Tendering Architecture',
      subtitle: 'GPS Geofencing, Automated Priority Escalation, WebSockets & Contractor Bidding',
      type: 'architecture',
      path: '/architectures/publiccare.html',
      keyHighlights: [
        'Geospatial issue verification using MongoDB 2dsphere indexing and GPS pinning',
        'Automated priority escalation dynamically elevating urgency upon multi-citizen reports',
        'Real-time WebSocket server pushing live tender updates and contractor bids',
        'Vendor tendering module connecting municipal authorities with verified contractors',
      ],
    },
    securityHardening: [
      {
        title: 'Hackathon Security Hardening Pass',
        threatMitigated: 'Malicious file uploads and GPS spoofing spam',
        implementation: 'Photo evidence mime-type validation and distance-radius rate limiting per citizen account',
      },
      {
        title: 'Role-Based Tendering Guard',
        threatMitigated: 'Unauthorized contractor bid viewing and tampering',
        implementation: 'Isolated vendor routes ensuring contractors only see authorized tender specifications',
      },
    ],
    techStack: ['Node.js', 'Express', 'MongoDB (2dsphere)', 'Socket.io', 'JWT', 'Cloudinary', 'Leaflet'],
    metrics: ['3-day rapid hackathon delivery', 'Live WebSocket bi-directional sync', 'GPS radius clustering'],
    image: '/projects/PublicCare.png',
  },
  {
    id: 'study-track',
    title: 'StudyTrack Nepal',
    role: 'Sole Full-Stack Developer',
    category: 'fullstack-mern',
    summary:
      'Full-stack MERN study progress tracker featuring automated daily streak calculations, background node-cron reminder schedules, and responsive HTML email digest dispatches via Nodemailer and SMTP.',
    liveUrl: 'https://study-tracker-gules-delta.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/study-tracker',
    architectureDiagram: {
      id: 'arch-studytrack',
      title: 'StudyTrack Nepal — Automated Progress Tracking & Digest Architecture',
      subtitle: 'MERN Stack, Streak Engine, Scheduled Node-Cron & Automated Email Reminders',
      type: 'architecture',
      path: '/architectures/studytrack.html',
      keyHighlights: [
        'Streak evaluation engine calculating consecutive learning days with timezone awareness',
        'Node-cron scheduled background task managing daily reminders without main thread blocking',
        'Nodemailer batch processing delivering responsive HTML email digests via SMTP',
        'Administrative dashboard for tracking curriculum progress and student metrics',
      ],
    },
    securityHardening: [
      {
        title: 'SMTP Credential Isolation',
        threatMitigated: 'Mail relay abuse and credential harvesting',
        implementation: 'Environment variable segregation with secure TLS connection enforcement',
      },
      {
        title: 'JWT Session Management',
        threatMitigated: 'Session hijacking and unauthorized study record mutation',
        implementation: 'Stateless JWT tokens with strict expiry and payload validation',
      },
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Node-Cron', 'Nodemailer', 'Tailwind CSS'],
    metrics: ['Automated daily cron jobs', 'Live on Vercel', 'Timezone-aware streak calculation'],
    image: '/projects/StudyTrack.png',
  },
  {
    id: 'quizify',
    title: 'Quizify',
    role: 'Frontend Developer',
    category: 'interactive-web',
    summary:
      'Dynamic quiz application in React and Tailwind CSS that queries the Open Trivia Database API with session token management, client-side HTML entity decoding/sanitization, and localStorage analytics.',
    liveUrl: 'https://quiz-bizz-quiz-webapp.vercel.app',
    githubUrl: 'https://github.com/sonuthakur03/QuizBizz',
    architectureDiagram: {
      id: 'arch-quizify',
      title: 'Quizify — Dynamic Trivia Engine & Client Architecture',
      subtitle: 'Open Trivia DB Integration, Session Token Management, HTML Sanitization & LocalStorage',
      type: 'architecture',
      path: '/architectures/quizify.html',
      keyHighlights: [
        'Open Trivia DB API integration with category and difficulty parameter filters',
        'Session token management to guarantee questions never duplicate during a play session',
        'Safe HTML entity decoding preventing XSS vulnerabilities without dangerouslySetInnerHTML',
        'Offline client-side state machine and score persistence via localStorage',
      ],
    },
    securityHardening: [
      {
        title: 'Safe Entity Decoding (No dangerouslySetInnerHTML)',
        threatMitigated: 'Stored/reflected XSS through trivia question text',
        implementation: 'DOMParser-based string decoding avoiding unescaped HTML injections',
      },
      {
        title: 'LocalStorage Schema Guard',
        threatMitigated: 'State corruption via malformed browser storage',
        implementation: 'Defensive try/catch parsing with fallback schema resets',
      },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Open Trivia DB API', 'LocalStorage'],
    metrics: ['Zero runtime XSS risks', 'Instant offline state recovery', 'Live on Vercel'],
    image: '/projects/QuizBizz.png',
  },
  {
    id: 'travel-np',
    title: 'TravelNP',
    role: 'UI/UX & Product Designer',
    category: 'uiux-design',
    summary:
      'Full UI/UX architecture and interactive prototype designed in Figma for a travel management platform. Features dual-persona workflows (tourist discovery vs hotel self-registration), geo-proximity discovery, and local guide booking.',
    figmaUrl: 'https://figma.com/design/K4bc1L7tnImrWXYh85Qojs/travelnp',
    architectureDiagram: {
      id: 'arch-travelnp',
      title: 'TravelNP — Travel Planning & Hotel Self-Listing Architecture',
      subtitle: 'Dual-Persona Flow, Geo-Proximity Discovery, Hotel Self-Registration & Guide Booking',
      type: 'architecture',
      path: '/architectures/travelnp.html',
      keyHighlights: [
        'Dual-persona user flow connecting tourists with self-registered hotel proprietors',
        'Geo-proximity model linking hotels to nearby attractions and regional travel guides',
        'Self-service hotel onboarding with room management and photo catalog upload',
        'Interactive Figma prototype with screen-to-screen transitions simulating production UX',
      ],
    },
    securityHardening: [
      {
        title: 'Hotel Partner KYC & Verification Gate',
        threatMitigated: 'Fraudulent property listings and phantom hotel scams',
        implementation: 'Designed admin approval workflow requiring verified registration documentation',
      },
      {
        title: 'Secure Booking State Transitions',
        threatMitigated: 'Double booking and orphaned reservation records',
        implementation: 'Structured booking lifecycle from date selection to payment escrow and confirmation',
      },
    ],
    techStack: ['Figma', 'UI/UX Prototyping', 'User Flow Mapping', 'Information Architecture'],
    metrics: ['Complete dual-persona UX flow', 'Full screen-to-screen interactive prototype', 'High-fidelity Figma UI'],
    image: '/projects/TravelNP.png',
  },
];
