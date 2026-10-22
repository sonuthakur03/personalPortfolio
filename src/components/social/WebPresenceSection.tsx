// src/components/social/WebPresenceSection.tsx
// Pop Brutalist Web Presence & Dev Network Showcase:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - Features Nano Banana Pro avatar badge
// - 3px solid black borders, hard offset shadows, vibrant pop colors
// - Direct profile links: LinkedIn, GitHub, BugV CTF, LeetCode, Direct Email

import React from 'react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Globe, Trophy, Code, Mail, ExternalLink, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/BrandIcons';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  DEFAULT_EMAIL,
  DEFAULT_GITHUB,
  DEFAULT_LINKEDIN,
  DEFAULT_INSTAGRAM,
  STANDARD_RESUME_URL,
} from '../../data/profileData';

interface SocialProfile {
  id: string;
  name: string;
  action: string;
  url: string;
  iconType: 'linkedin' | 'github' | 'instagram' | 'bugv' | 'leetcode' | 'mail' | 'resume';
  bgColor: string;
}

export const WebPresenceSection: React.FC = () => {
  const { profile } = usePortfolioContent();

  const profiles: SocialProfile[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      action: 'Connect',
      url: profile?.linkedin || DEFAULT_LINKEDIN,
      iconType: 'linkedin',
      bgColor: '#7C9BFF',
    },
    {
      id: 'github',
      name: 'GitHub',
      action: 'Source Code',
      url: profile?.github || DEFAULT_GITHUB,
      iconType: 'github',
      bgColor: '#111111',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      action: 'Follow',
      url: profile?.instagram || DEFAULT_INSTAGRAM,
      iconType: 'instagram',
      bgColor: '#FF6FB5',
    },
    {
      id: 'mail',
      name: 'Direct Email',
      action: 'Say Hello',
      url: `mailto:${profile?.email || DEFAULT_EMAIL}`,
      iconType: 'mail',
      bgColor: '#7DFFA6',
    },
    {
      id: 'resume',
      name: 'Verified CV',
      action: 'Download PDF',
      url: profile?.resumeUrl || STANDARD_RESUME_URL,
      iconType: 'resume',
      bgColor: '#FFE14D',
    },
  ];

  return (
    <section
      id="contact"
      aria-label="Developer Ecosystem and Social Presence"
      className="py-20 sm:py-28 relative bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] scroll-mt-12 overflow-hidden"
    >
      <div id="profiles" className="absolute -top-12" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-12">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF6FB5] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
              <Globe className="w-3.5 h-3.5" />
              <span>06 // Dev Network</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
              Connect &amp; Follow
            </h2>
            <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80 max-w-xl mx-auto">
              Find my open-source repositories, engineering case studies, professional network, and direct contact channels.
            </p>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* NANO BANANA PRO AVATAR CENTERPIECE                                */}
        {/* ================================================================= */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-[3px] border-[#111111] shadow-brutal-md overflow-hidden bg-white dark:bg-[#181A20] rotate-2 hover:rotate-0 transition-transform duration-300">
            <img
              src="/character/sonu_avatar_badge.png"
              alt="Sonu Thakur - Nano Banana Pro Avatar Badge"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-3 sm:mt-4">
            <h3 className="text-xl sm:text-2xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
              {profile?.name || 'Sonu Thakur'}
            </h3>
            <p className="font-spaceMono text-[11px] sm:text-xs md:text-sm font-bold text-[#FF6FB5] mt-0.5">
              @sonuthakur03 · Kathmandu, Nepal
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* POP BRUTALIST SOCIAL CARDS GRID                                   */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {profiles.map((item, idx) => (
            <a
              key={item.id}
              href={item.url}
              download={item.id === 'resume' ? 'Sonu_Thakur_CV.pdf' : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`pop-card group relative flex flex-col items-center justify-center p-3 sm:p-4 md:p-3.5 lg:p-6 text-center dark:bg-[#181A20] hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-200 ${
                idx === profiles.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Icon Container */}
              <div
                style={{ backgroundColor: item.bgColor }}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-11 md:h-11 lg:w-14 lg:h-14 border-[3px] border-[#111111] shadow-brutal-sm flex items-center justify-center mb-2.5 sm:mb-3 md:mb-4 transition-transform group-hover:scale-110"
              >
                <ProfileIcon type={item.iconType} />
              </div>

              {/* Title & Action */}
              <h4 className="font-archivoBlack text-xs sm:text-sm md:text-xs lg:text-base uppercase tracking-tight text-[#111111] dark:text-white">
                {item.name}
              </h4>
              <span className="font-spaceMono text-[10px] sm:text-xs font-bold text-[#111111]/60 dark:text-white/60 mt-0.5 sm:mt-1">
                {item.action} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProfileIcon: React.FC<{ type: SocialProfile['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'linkedin':
      return <LinkedinIcon className="w-7 h-7 text-[#111111]" />;
    case 'github':
      return <GithubIcon className="w-7 h-7 text-white" />;
    case 'instagram':
      return <InstagramIcon className="w-7 h-7 text-[#111111]" />;
    case 'bugv':
      return <Trophy className="w-7 h-7 text-[#111111]" />;
    case 'leetcode':
      return <Code className="w-7 h-7 text-[#111111]" />;
    case 'mail':
      return <Mail className="w-7 h-7 text-[#111111]" />;
    case 'resume':
      return <FileText className="w-7 h-7 text-[#111111]" />;
    default:
      return <ExternalLink className="w-6 h-6 text-[#111111]" />;
  }
};
