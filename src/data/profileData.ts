// src/data/profileData.ts
import type { ProfileData } from '../types/profile';

export const DEFAULT_EMAIL = 'rsonuth789@gmail.com';
export const DEFAULT_GITHUB = 'https://github.com/sonuthakur03';
export const DEFAULT_LINKEDIN = 'https://linkedin.com/in/sonuthakur03';
export const DEFAULT_INSTAGRAM = 'https://www.instagram.com/not_sonuthakur?srtk=MWNpZmwzcnN0cWV5aA==';
export const DEFAULT_RESUME_URL = '/cv/Sonu_Thakur_CV_2page.pdf';
export const STANDARD_RESUME_URL = '/cv/Sonu_Thakur_CV.pdf';

export const initialProfileData: ProfileData = {
  name: 'Sonu Thakur',
  headline: 'Full-Stack Engineer · Applied AI Systems · Application Security',
  bio: 'Full-stack MERN developer with production experience building AI-powered customer feedback pipelines, ACID-compliant transactional APIs, and multi-gateway payment platforms. IdeaX Hackathon 1st Place Winner (FinTrace) and consistent academic topper at Tribhuvan University.',
  academic: 'BCA Topper @ Tribhuvan University (Rank 1, CGPA 3.63/4.0)',
  hackathonWin: 'IdeaX Hackathon 2026 — FinTech Track Winner (Team FinTrace)',
  ctfAchievement: 'BugV CTF 2026 — 3rd Place (AI-Assisted Security)',
  internship: 'Full Stack Developer Intern @ Zidio Development (Project LOOP)',
  location: 'Sanepa, Lalitpur, Nepal',
  github: DEFAULT_GITHUB,
  linkedin: DEFAULT_LINKEDIN,
  email: DEFAULT_EMAIL,
  activeStatus: 'Available for high-impact software engineering & AI roles',
  resumeUrl: DEFAULT_RESUME_URL,
  instagram: DEFAULT_INSTAGRAM,
};
