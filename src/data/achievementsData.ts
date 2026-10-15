// src/data/achievementsData.ts
import type { Achievement } from '../types/achievements';

export const initialAchievementsData: readonly Achievement[] = [
  {
    id: 'bugv-ctf-2026',
    title: 'BugV CTF 2026',
    organization: 'Swoyambhu International College',
    date: '2026',
    rankOrAward: '3rd Place',
    description:
      'Solo capture-the-flag security tournament; solved web exploitation, reverse engineering, and forensic challenges using offensive workflows and AI-assisted tooling.',
    category: 'security-ctf',
    badge: 'CTF 3rd Place',
    isDraft: false,
    isHidden: false,
  },
  {
    id: 'embark-hackathon-2026',
    title: 'Embark Community Innovation Hackathon',
    organization: 'Embark College',
    date: 'Jul 27-29, 2026',
    rankOrAward: 'Finalist / Built PublicCare',
    description:
      '3-day team hackathon; architected and pitched PublicCare, a civic complaint and tendering platform with automated GPS clustering and real-time WebSockets.',
    category: 'hackathon',
    badge: 'Hackathon Finalist',
    isDraft: false,
    isHidden: false,
  },
  {
    id: 'bca-tu-rank1',
    title: 'BCA Board Examination Merit Rank',
    organization: 'Tribhuvan University',
    date: '12/2023 - Present',
    rankOrAward: 'Rank 1 (CGPA 3.63 / 4.0)',
    description:
      'Consistent academic topper pursuing Bachelor of Computer Application; Rank 1 in every internal and board examination to date with focus on web dev, databases, and DSA.',
    category: 'academic',
    badge: 'University Rank 1',
    isDraft: false,
    isHidden: false,
  },
  {
    id: 'recent-hackathon-draft',
    title: 'Recent Hackathon Championship',
    organization: 'Hackathon Partner',
    date: '2026',
    rankOrAward: 'Winner / 1st Place',
    description:
      'Recent hackathon victory project (pre-configured in draft mode; toggle to published in /admin whenever ready to announce).',
    category: 'hackathon',
    badge: 'Hackathon Winner',
    isDraft: true,
    isHidden: true,
  },
  {
    id: 'uiux-training',
    title: 'UI/UX Design Certification (30 Hours)',
    organization: 'Swoyambhu International College',
    date: '07/2024 - 10/2024',
    rankOrAward: 'Certified',
    description:
      'Comprehensive 30-hour training in Figma design systems, wireframing, high-fidelity screen-to-screen prototyping, and user journey optimization.',
    category: 'training',
    badge: 'Certified UI/UX',
    isDraft: false,
    isHidden: false,
  },
  {
    id: 'django-training',
    title: 'Python with Django Certification (30 Hours)',
    organization: 'Swoyambhu International College',
    date: '01/2025 - 02/2025',
    rankOrAward: 'Certified',
    description:
      'Hands-on 30-hour training focusing on Python backend development, Django ORM, REST APIs, and database migrations.',
    category: 'training',
    badge: 'Django Certified',
    isDraft: false,
    isHidden: false,
  },
];
