// src/components/social/WebPresenceSection.tsx
import React, { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Globe, Trophy, Code, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { ScrollReveal } from '../common/ScrollReveal';

interface SocialProfile {
  id: string;
  name: string;
  action: string;
  url: string;
  iconType: 'linkedin' | 'github' | 'bugv' | 'leetcode' | 'mail';
  accentColor: string;
  glowColor: string;
}

export const WebPresenceSection: React.FC = () => {
  const { profile } = usePortfolioContent();
  const [avatarError, setAvatarError] = useState(false);

  const profiles: SocialProfile[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      action: 'Connect',
      url: profile?.linkedin || 'https://linkedin.com/in/sonuthakur03',
      iconType: 'linkedin',
      accentColor: '#0077b5',
      glowColor: 'rgba(0, 119, 181, 0.4)',
    },
    {
      id: 'github',
      name: 'GitHub',
      action: 'Commit',
      url: profile?.github || 'https://github.com/sonuthakur03',
      iconType: 'github',
      accentColor: '#ffffff',
      glowColor: 'rgba(255, 255, 255, 0.3)',
    },
    {
      id: 'bugv',
      name: 'BugV CTF',
      action: 'Compete',
      url: 'https://bugv.io',
      iconType: 'bugv',
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.4)',
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      action: 'Code',
      url: 'https://leetcode.com',
      iconType: 'leetcode',
      accentColor: '#ffa116',
      glowColor: 'rgba(255, 161, 22, 0.4)',
    },
    {
      id: 'mail',
      name: 'Email Direct',
      action: 'Collaborate',
      url: `mailto:${profile?.email || 'sonuthakur.dev@gmail.com'}`,
      iconType: 'mail',
      accentColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.4)',
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-background border-t border-border/40 scroll-mt-12">
      <div id="profiles" className="absolute -top-12" />
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>Developer Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground tracking-tight">
              Web Presence —{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Dev Network
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Profile Avatar Header with Rotating Border and Floating Animation */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="relative w-32 h-32 rounded-full p-1 bg-surface backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center justify-center animate-[floatProfile_6s_ease-in-out_infinite] group cursor-pointer">
            {/* Rotating Conic-Gradient Ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none z-10"
              style={{
                padding: '3px',
                background:
                  'conic-gradient(from var(--angle), transparent 20%, #a855f7 50%, #06b6d4 70%, transparent 90%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: 'rotateBorder 4s linear infinite',
              }}
            />

            {/* Avatar Photo / Fallback Initials */}
            {!avatarError && profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile?.name || 'Sonu Thakur'}
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover rounded-full border border-border relative z-20 transition-all duration-400 group-hover:scale-108 group-hover:rotate-3 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900/60 to-cyan-950/80 border border-border flex items-center justify-center text-2xl font-display font-bold text-white relative z-20 group-hover:scale-108 transition-all duration-400">
                <span>ST</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
              {profile?.name || 'Sonu Thakur'}
            </h3>
            <p className="font-mono text-sm text-purple-400 tracking-wider mt-0.5">
              @sonuthakur03
            </p>
          </div>
        </div>

        {/* Profiles Grid with 3D Y-Axis Flip and Conic Borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {profiles.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-surface/80 backdrop-blur-md border border-border hover:border-purple-500/60 transition-all duration-400 hover:-translate-y-2 hover:bg-elevated hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Rotating Conic-Gradient Border on Hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                  padding: '2px',
                  background: `conic-gradient(from var(--angle), transparent 40%, ${item.accentColor}, transparent 60%)`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  animation: 'rotateBorder 3s linear infinite',
                }}
              />

              {/* Icon Container with 3D Y-Axis Flip Animation on Hover */}
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl mb-3 transition-transform duration-700 ease-out group-hover:scale-125 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)_scale(1.2)]"
                style={{ color: item.accentColor }}
              >
                <ProfileIcon type={item.iconType} />
              </div>

              {/* Title & Action Label */}
              <h4 className="font-display font-bold text-sm sm:text-base text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">
                {item.name}
              </h4>
              <span
                className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground group-hover:font-semibold mt-1 transition-colors"
                style={{ color: undefined }}
              >
                <span className="group-hover:text-purple-400 transition-colors">
                  {item.action}
                </span>
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
      return <LinkedinIcon className="w-7 h-7 text-[#0077b5]" />;
    case 'github':
      return <GithubIcon className="w-7 h-7 text-white" />;
    case 'bugv':
      return <Trophy className="w-7 h-7 text-amber-400" />;
    case 'leetcode':
      return <Code className="w-7 h-7 text-[#ffa116]" />;
    case 'mail':
      return <Mail className="w-7 h-7 text-cyan-400" />;
    default:
      return <ExternalLink className="w-6 h-6 text-white" />;
  }
};
