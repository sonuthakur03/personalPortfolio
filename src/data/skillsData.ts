// src/data/skillsData.ts

export type SkillCategoryType =
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai-security'
  | 'tools';

export interface FlatSkillItem {
  id: string;
  name: string;
  category: SkillCategoryType;
  iconClass: string;
  color?: string;
  level?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  readonly title: string;
  readonly skills: readonly {
    readonly name: string;
    readonly level?: string;
    readonly highlight?: boolean;
  }[];
}

export const flatSkillsData: FlatSkillItem[] = [
  // --- Languages (from CV: JavaScript, Java, Python, PHP, C) ---
  { id: 'js', name: 'JavaScript', category: 'languages', iconClass: 'devicon-javascript-plain colored', level: 'Advanced', highlight: true },
  { id: 'ts', name: 'TypeScript', category: 'languages', iconClass: 'devicon-typescript-plain colored', level: 'Advanced', highlight: true },
  { id: 'py', name: 'Python', category: 'languages', iconClass: 'devicon-python-plain colored', level: 'Intermediate', highlight: true },
  { id: 'java', name: 'Java', category: 'languages', iconClass: 'devicon-java-plain colored', level: 'Intermediate' },
  { id: 'c', name: 'C / C++', category: 'languages', iconClass: 'devicon-cplusplus-plain colored', level: 'Academic' },
  { id: 'php', name: 'PHP', category: 'languages', iconClass: 'devicon-php-plain colored', level: 'Intermediate' },

  // --- Frontend (from CV: React, Next.js, Tailwind CSS, HTML/CSS, Figma) ---
  { id: 'react', name: 'React 19', category: 'frontend', iconClass: 'devicon-react-original colored', level: 'Advanced', highlight: true },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', iconClass: 'devicon-nextjs-plain', level: 'Intermediate', highlight: true },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', iconClass: 'devicon-tailwindcss-original colored', level: 'Advanced', highlight: true },
  { id: 'html5', name: 'HTML5', category: 'frontend', iconClass: 'devicon-html5-plain colored', level: 'Advanced' },
  { id: 'css3', name: 'CSS3', category: 'frontend', iconClass: 'devicon-css3-plain colored', level: 'Advanced' },
  { id: 'figma', name: 'Figma UI/UX', category: 'frontend', iconClass: 'devicon-figma-plain colored', level: 'Certified 30h', highlight: true },

  // --- Backend (from CV: Node.js, Express, Django, .NET, REST APIs, WebSockets, Payments) ---
  { id: 'nodejs', name: 'Node.js', category: 'backend', iconClass: 'devicon-nodejs-plain colored', level: 'Advanced', highlight: true },
  { id: 'express', name: 'Express.js', category: 'backend', iconClass: 'devicon-express-original', level: 'Advanced', highlight: true },
  { id: 'django', name: 'Django', category: 'backend', iconClass: 'devicon-django-plain colored', level: 'Certified 30h', highlight: true },
  { id: 'dotnet', name: '.NET Framework', category: 'backend', iconClass: 'devicon-dot-net-plain colored', level: 'Academic' },
  { id: 'rest', name: 'REST APIs', category: 'backend', iconClass: 'devicon-fastapi-plain colored', level: 'Advanced', highlight: true },
  { id: 'jwt', name: 'JWT Auth & RBAC', category: 'backend', iconClass: 'devicon-oauth-plain colored', level: 'Advanced', highlight: true },
  { id: 'socketio', name: 'WebSockets', category: 'backend', iconClass: 'devicon-socketio-original', level: 'Production', highlight: true },
  { id: 'payments', name: 'Khalti / eSewa / Stripe', category: 'backend', iconClass: 'devicon-fastapi-plain colored', level: 'Production', highlight: true },

  // --- Databases (from CV: MongoDB, MySQL, Prisma, DBMS Fundamentals) ---
  { id: 'mongodb', name: 'MongoDB (Mongoose)', category: 'databases', iconClass: 'devicon-mongodb-plain colored', level: 'Advanced', highlight: true },
  { id: 'mysql', name: 'MySQL', category: 'databases', iconClass: 'devicon-mysql-plain colored', level: 'Intermediate', highlight: true },
  { id: 'prisma', name: 'Prisma ORM', category: 'databases', iconClass: 'devicon-prisma-original colored', level: 'Intermediate', highlight: true },
  { id: 'dbms', name: 'ACID & DBMS', category: 'databases', iconClass: 'devicon-postgresql-plain colored', level: 'Advanced', highlight: true },
  { id: 'postgres', name: 'PostgreSQL', category: 'databases', iconClass: 'devicon-postgresql-plain colored', level: 'Intermediate' },
  { id: 'redis', name: 'Redis Streams', category: 'databases', iconClass: 'devicon-redis-plain colored', level: 'Intermediate' },

  // --- AI & Security / CS Fundamentals (from CV: Gemini AI SDK, Claude/Antigravity, BugV CTF, AppSec, DSA) ---
  { id: 'gemini', name: 'Gemini AI SDK', category: 'ai-security', iconClass: 'devicon-googlecloud-plain colored', level: 'Production', highlight: true },
  { id: 'ai-tools', name: 'Claude / Antigravity', category: 'ai-security', iconClass: 'devicon-googlecloud-plain colored', level: 'Production', highlight: true },
  { id: 'bugv', name: 'BugV CTF (3rd)', category: 'ai-security', iconClass: 'devicon-linux-plain colored', level: 'National 3rd', highlight: true },
  { id: 'appsec', name: 'Application Security', category: 'ai-security', iconClass: 'devicon-bash-plain', level: 'Advanced', highlight: true },
  { id: 'dsa', name: 'Data Structures & Algo', category: 'ai-security', iconClass: 'devicon-cplusplus-plain colored', level: 'TU Rank 1', highlight: true },

  // --- Tools & Deployment (from CV: Git/GitHub, Cloudinary, Postman, Linux, Vercel/Render, Docker) ---
  { id: 'git', name: 'Git', category: 'tools', iconClass: 'devicon-git-plain colored', level: 'Advanced', highlight: true },
  { id: 'github', name: 'GitHub', category: 'tools', iconClass: 'devicon-github-original', level: 'Advanced', highlight: true },
  { id: 'cloudinary', name: 'Cloudinary API', category: 'tools', iconClass: 'devicon-googlecloud-plain colored', level: 'Production', highlight: true },
  { id: 'postman', name: 'Postman', category: 'tools', iconClass: 'devicon-postman-plain colored', level: 'Advanced' },
  { id: 'linux', name: 'Linux OS', category: 'tools', iconClass: 'devicon-linux-plain colored', level: 'Advanced' },
  { id: 'vercel', name: 'Vercel & Render', category: 'tools', iconClass: 'devicon-vercel-original', level: 'Production', highlight: true },
  { id: 'docker', name: 'Docker', category: 'tools', iconClass: 'devicon-docker-plain colored', level: 'Intermediate' },
];

export const initialSkillsData: readonly SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Advanced', highlight: true },
      { name: 'TypeScript', level: 'Advanced', highlight: true },
      { name: 'Python', level: 'Intermediate', highlight: true },
      { name: 'Java', level: 'Intermediate' },
      { name: 'C / C++', level: 'Academic' },
      { name: 'PHP', level: 'Intermediate' },
    ],
  },
  {
    title: 'Frontend Architecture',
    skills: [
      { name: 'React 19', level: 'Advanced', highlight: true },
      { name: 'Next.js', level: 'Intermediate', highlight: true },
      { name: 'Tailwind CSS', level: 'Advanced', highlight: true },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Figma UI/UX (30h)', level: 'Certified', highlight: true },
    ],
  },
  {
    title: 'Backend & Systems',
    skills: [
      { name: 'Node.js', level: 'Advanced', highlight: true },
      { name: 'Express.js', level: 'Advanced', highlight: true },
      { name: 'Django (30h)', level: 'Certified', highlight: true },
      { name: '.NET Framework', level: 'Academic' },
      { name: 'REST APIs & JWT', level: 'Advanced', highlight: true },
      { name: 'WebSockets (Socket.io)', level: 'Production', highlight: true },
      { name: 'Payment Gateways (Khalti/eSewa/Stripe)', level: 'Production', highlight: true },
    ],
  },
  {
    title: 'Databases & Storage',
    skills: [
      { name: 'MongoDB (Mongoose)', level: 'Advanced', highlight: true },
      { name: 'MySQL', level: 'Intermediate', highlight: true },
      { name: 'Prisma ORM', level: 'Intermediate', highlight: true },
      { name: 'ACID & DBMS Fundamentals', level: 'Advanced', highlight: true },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Redis Streams', level: 'Intermediate' },
    ],
  },
  {
    title: 'Applied AI & Security',
    skills: [
      { name: 'Google Gemini AI SDK', level: 'Production', highlight: true },
      { name: 'AI Tooling (Claude/Antigravity)', level: 'Production', highlight: true },
      { name: 'BugV CTF Security', level: 'Solo 3rd Podium', highlight: true },
      { name: 'Application Security (OWASP)', level: 'Advanced', highlight: true },
      { name: 'Data Structures & Algorithms', level: 'TU Rank 1', highlight: true },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', highlight: true },
      { name: 'Cloudinary API', level: 'Production', highlight: true },
      { name: 'Postman', level: 'Advanced' },
      { name: 'Linux OS', level: 'Advanced' },
      { name: 'Vercel & Render', level: 'Production', highlight: true },
      { name: 'Docker', level: 'Intermediate' },
    ],
  },
];

