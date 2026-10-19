// src/data/skillsData.ts
// Structured technical skills and competencies matching Sonu Thakur's verified stack.

import type { SkillCategoryType, FlatSkillItem, SkillCategory } from '../types/skills';

export type { SkillCategoryType, FlatSkillItem, SkillCategory };

export const flatSkillsData: FlatSkillItem[] = [
  // --- Languages ---
  { id: 'js', name: 'JavaScript', category: 'languages', iconClass: 'devicon-javascript-plain colored', level: 'Advanced', highlight: true },
  { id: 'ts', name: 'TypeScript', category: 'languages', iconClass: 'devicon-typescript-plain colored', level: 'Intermediate', highlight: true },
  { id: 'py', name: 'Python', category: 'languages', iconClass: 'devicon-python-plain colored', level: 'Certified · Demonstrable', highlight: true },
  { id: 'academic-languages', name: 'Java / C++ / PHP / .NET', category: 'languages', iconClass: 'devicon-java-plain colored', level: 'Academic experience' },

  // --- Frontend Development ---
  { id: 'react', name: 'React 19', category: 'frontend', iconClass: 'devicon-react-original colored', level: 'Advanced', highlight: true },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', iconClass: 'devicon-nextjs-plain', level: 'Intermediate', highlight: true },
  { id: 'frontend-core', name: 'HTML5 / CSS3 / Tailwind', category: 'frontend', iconClass: 'devicon-tailwindcss-original colored', level: 'Frontend development', highlight: true },
  { id: 'figma', name: 'Figma', category: 'frontend', iconClass: 'devicon-figma-plain colored', level: 'UI/UX design', highlight: true },

  // --- Backend Development ---
  { id: 'backend-core', name: 'Node.js & Express.js', category: 'backend', iconClass: 'devicon-nodejs-plain colored', level: 'Backend development', highlight: true },
  { id: 'auth', name: 'Authentication & Authorization', category: 'backend', iconClass: 'devicon-oauth-plain colored', level: 'JWT & RBAC', highlight: true },
  { id: 'payments', name: 'Payment Gateway Integration', category: 'backend', iconClass: 'devicon-fastapi-plain colored', level: 'Khalti / eSewa / Stripe', highlight: true },
  { id: 'django', name: 'Django', category: 'backend', iconClass: 'devicon-django-plain colored', level: 'Certified · Demonstrable' },
  { id: 'socketio', name: 'WebSockets', category: 'backend', iconClass: 'devicon-socketio-original', level: 'Beginner' },

  // --- Databases ---
  { id: 'mongodb', name: 'MongoDB', category: 'databases', iconClass: 'devicon-mongodb-plain colored', level: 'Advanced (Prioritized)', highlight: true },
  { id: 'mysql', name: 'MySQL', category: 'databases', iconClass: 'devicon-mysql-plain colored', level: 'Intermediate' },
  { id: 'postgres', name: 'PostgreSQL', category: 'databases', iconClass: 'devicon-postgresql-plain colored', level: 'Intermediate' },
  { id: 'dbms', name: 'Database Fundamentals', category: 'databases', iconClass: 'devicon-postgresql-plain colored', level: 'ACID & Relational', highlight: true },
  { id: 'redis', name: 'Redis Streams', category: 'databases', iconClass: 'devicon-redis-plain colored', level: 'Beginner (Optional)' },

  // --- Applied AI & Security ---
  { id: 'gemini', name: 'AI Application Integration', category: 'ai-security', iconClass: 'devicon-googlecloud-plain colored', level: 'Beginner (AI SDK)' },
  { id: 'appsec', name: 'Application Security', category: 'ai-security', iconClass: 'devicon-bash-plain', level: 'Intermediate (Evidence)', highlight: true },

  // --- AI-Assisted Development Tools ---
  { id: 'ai-tools', name: 'Claude Code / Antigravity', category: 'ai-tools', iconClass: 'devicon-googlecloud-plain colored', level: 'AI-assisted dev tools', highlight: true },

  // --- Tools, Version Control & Hosting ---
  { id: 'vcs', name: 'Git / GitHub / GitLab', category: 'tools', iconClass: 'devicon-github-original', level: 'Version control & collab', highlight: true },
  { id: 'hosting', name: 'Vercel / Render', category: 'tools', iconClass: 'devicon-vercel-original', level: 'Deployment & hosting', highlight: true },
  { id: 'postman', name: 'Postman', category: 'tools', iconClass: 'devicon-postman-plain colored', level: 'API testing' },
  { id: 'linux', name: 'Linux OS', category: 'tools', iconClass: 'devicon-linux-plain colored', level: 'Intermediate (Secondary)' },

  // --- Computer Science Fundamentals ---
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'fundamentals', iconClass: 'devicon-cplusplus-plain colored', level: 'CS Fundamentals', highlight: true },
];

export const initialSkillsData: readonly SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'JavaScript', level: 'Advanced', highlight: true },
      { name: 'TypeScript', level: 'Intermediate', highlight: true },
      { name: 'Python', level: 'Certified · Demonstrable', highlight: true },
      { name: 'Java / C++ / PHP / .NET', level: 'Academic experience' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React 19', level: 'Advanced', highlight: true },
      { name: 'Next.js', level: 'Intermediate', highlight: true },
      { name: 'HTML5 / CSS3 / Tailwind CSS', level: 'Frontend development', highlight: true },
      { name: 'Figma', level: 'UI/UX design', highlight: true },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js & Express.js', level: 'Backend development', highlight: true },
      { name: 'Authentication & Authorization', level: 'JWT & RBAC', highlight: true },
      { name: 'Payment Gateway Integration', level: 'Khalti / eSewa / Stripe', highlight: true },
      { name: 'Django', level: 'Certified · Demonstrable' },
      { name: 'WebSockets', level: 'Beginner' },
    ],
  },
  {
    title: 'Databases & Fundamentals',
    skills: [
      { name: 'MongoDB', level: 'Advanced (Prioritized)', highlight: true },
      { name: 'MySQL', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Database Fundamentals', level: 'ACID & Relational', highlight: true },
      { name: 'Redis Streams', level: 'Beginner (Optional)' },
    ],
  },
  {
    title: 'Applied AI & Security',
    skills: [
      { name: 'AI Application Integration (AI SDK)', level: 'Beginner' },
      { name: 'Application Security', level: 'Intermediate (Evidence)', highlight: true },
    ],
  },
  {
    title: 'AI-Assisted Development Tools',
    skills: [
      { name: 'Claude Code / Antigravity', level: 'AI-assisted dev tools', highlight: true },
    ],
  },
  {
    title: 'Version Control, Tools & Hosting',
    skills: [
      { name: 'Git / GitHub / GitLab', level: 'Version control & collaboration', highlight: true },
      { name: 'Vercel / Render', level: 'Deployment & hosting', highlight: true },
      { name: 'Postman', level: 'API testing' },
      { name: 'Linux OS', level: 'Intermediate (Secondary)' },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'CS Fundamentals', highlight: true },
    ],
  },
];
