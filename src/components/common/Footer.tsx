// src/components/common/Footer.tsx
// Pop Brutalist Footer:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - Huge Archivo Black CTA headline
// - Copyable email button with feedback
// - 3px solid black borders, hard offset shadows, high contrast
// - Strictly typed, zero emojis

import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Shield, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Link } from 'react-router-dom';
import {
  DEFAULT_EMAIL,
  DEFAULT_GITHUB,
  DEFAULT_LINKEDIN,
  DEFAULT_INSTAGRAM,
  DEFAULT_RESUME_URL,
} from '../../data/profileData';

export const Footer: React.FC = () => {
  const { profile } = usePortfolioContent();
  const [copied, setCopied] = useState(false);

  const email = profile.email || DEFAULT_EMAIL;
  const github = profile.github || DEFAULT_GITHUB;
  const linkedin = profile.linkedin || DEFAULT_LINKEDIN;
  const instagram = profile.instagram || DEFAULT_INSTAGRAM;
  const resumeUrl = profile.resumeUrl || DEFAULT_RESUME_URL;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#111111] text-white border-t-[3px] border-[#111111] overflow-hidden select-none">
      {/* Top Ticker Tape */}
      <div className="w-full overflow-hidden bg-[#FFE14D] text-[#111111] py-2.5 border-b-[3px] border-[#111111]">
        <div className="animate-marquee font-spaceMono text-xs font-bold tracking-widest uppercase">
          <span className="mx-4">✦ OPEN FOR 2026 ROLES</span>
          <span className="mx-4">✦ MERN STACK &amp; ACID BACKENDS</span>
          <span className="mx-4">✦ APPLIED AI WORKFLOWS</span>
          <span className="mx-4">✦ IDEAX HACKATHON WINNER (FINTECH)</span>
          <span className="mx-4">✦ BASED IN KATHMANDU, NEPAL</span>
          <span className="mx-4">✦ OPEN FOR 2026 ROLES</span>
          <span className="mx-4">✦ MERN STACK &amp; ACID BACKENDS</span>
          <span className="mx-4">✦ APPLIED AI WORKFLOWS</span>
          <span className="mx-4">✦ IDEAX HACKATHON WINNER (FINTECH)</span>
          <span className="mx-4">✦ BASED IN KATHMANDU, NEPAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Main Footer Call to Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b-[3px] border-white/20">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-archivoBlack uppercase tracking-tight leading-[0.92]">
              Have a project<br />
              <span className="text-[#FF6FB5]">in mind?</span>
            </h2>
            <p className="font-archivo text-base sm:text-lg text-white/80 max-w-lg">
              Let&apos;s build fast, secure, and production-ready web applications. Available for high-impact software engineering roles in 2026.
            </p>
          </div>

          {/* Copy Email Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="pop-btn h-[58px] px-6 py-4 bg-[#7DFFA6] text-[#111111] font-spaceMono text-sm font-bold gap-2.5 shadow-brutal-sm cursor-pointer whitespace-nowrap justify-center items-center"
            >
              {copied ? <Check className="w-4 h-4 shrink-0 text-[#111111]" /> : <Copy className="w-4 h-4 shrink-0" />}
              <span>{copied ? 'Email Copied!' : email}</span>
            </button>

            <a
              href={`mailto:${email}`}
              className="pop-btn h-[58px] px-6 py-4 bg-[#FF6FB5] text-[#111111] font-spaceMono text-sm font-bold gap-2.5 shadow-brutal-sm text-center cursor-pointer whitespace-nowrap justify-center items-center"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Send Message</span>
            </a>
          </div>
        </div>

        {/* Navigation & Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b-[3px] border-white/20 font-spaceMono text-xs">
          {/* Identity */}
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 bg-white text-[#111111] font-archivoBlack text-base uppercase">
              Sonu Thakur
            </div>
            <p className="font-archivo text-xs text-white/70 leading-relaxed">
              Full-Stack MERN Developer, Applied AI Systems, and AppSec specialist based in Kathmandu, Nepal.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2026 Roles</span>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="space-y-3">
            <span className="font-bold text-[#FFE14D] uppercase tracking-wider block">
              // Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#projects" className="text-white/80 hover:text-[#FF6FB5] transition-colors">
                  → Work &amp; Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-white/80 hover:text-[#FF6FB5] transition-colors">
                  → Experience &amp; Track Record
                </a>
              </li>
              <li>
                <a href="#education" className="text-white/80 hover:text-[#FF6FB5] transition-colors">
                  → Education &amp; TU Merit
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/80 hover:text-[#FF6FB5] transition-colors">
                  → Skills &amp; Stack
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-white/80 hover:text-[#FF6FB5] transition-colors">
                  → Certifications &amp; Awards
                </a>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <span className="font-bold text-[#7DFFA6] uppercase tracking-wider block">
              // Connect
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-[#7DFFA6] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>github.com/sonuthakur03</span>
                </a>
              </li>
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-[#7DFFA6] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>linkedin.com/in/sonuthakur03</span>
                </a>
              </li>
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-[#7DFFA6] transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@not_sonuthakur</span>
                </a>
              </li>
              <li>
                <a
                  href="https://bugv.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-[#7DFFA6] transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>BugV CTF Profile</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Verified CV & Resume */}
          <div className="space-y-3">
            <span className="font-bold text-[#7DFFA6] uppercase tracking-wider block font-spaceMono">
              // Official Resume
            </span>
            <p className="font-archivo text-xs text-white/70 leading-relaxed">
              2-page verified technical CV covering MERN engineering, Applied AI systems, and competitive honors.
            </p>
            <div className="flex flex-col gap-2 items-start">
              <a
                href={resumeUrl}
                download="Sonu_Thakur_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pop-btn px-4 py-2 bg-[#FFE14D] text-[#111111] text-xs font-bold gap-2 shadow-brutal-sm inline-flex items-center"
              >
                <FileText className="w-3.5 h-3.5 text-[#111111]" />
                <span>Download CV (PDF)</span>
              </a>
              {Boolean(import.meta.env.DEV) && (
                <Link
                  to="/admin"
                  className="text-[11px] font-spaceMono text-amber-400 hover:underline inline-flex items-center gap-1 opacity-60 hover:opacity-100"
                >
                  <Shield className="w-3 h-3" />
                  <span>Dev Admin Console</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-spaceMono text-xs text-white/50">
          <span>&copy; {new Date().getFullYear()} Sonu Thakur. All rights reserved.</span>
          <span>Crafted in Pop Brutalist Style with React 19 &amp; Vite</span>
        </div>
      </div>
    </footer>
  );
};
