// src/components/skills/SkillsSection.tsx
import React, { useState } from 'react';
import { flatSkillsData, type SkillCategoryType } from '../../data/skillsData';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { ScrollReveal } from '../common/ScrollReveal';

interface FilterOption {
  key: SkillCategoryType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'All Stack' },
  { key: 'languages', label: 'Languages' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'databases', label: 'Databases' },
  { key: 'ai-security', label: 'AI & Security' },
  { key: 'tools', label: 'Tools & DevOps' },
];

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SkillCategoryType>('all');

  const filteredSkills =
    activeFilter === 'all'
      ? flatSkillsData
      : flatSkillsData.filter((item) => item.category === activeFilter);

  const handleFilterClick = (key: SkillCategoryType) => {
    sounds.playClick();
    setActiveFilter(key);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden bg-background">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-accent-purple/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-mono text-accent-purple tracking-widest uppercase mb-4 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Arsenal &amp; Core Stack</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground tracking-tight">
              Technical Skills &amp;{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Core Competencies
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans max-w-2xl mx-auto">
              Production-grade technologies across full-stack engineering, AI systems, and application security.
            </p>
          </div>
        </ScrollReveal>

        {/* Skill Filter Pill Tabs (Aakarsh DevHQ Signature Pill Filter) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count =
              filter.key === 'all'
                ? flatSkillsData.length
                : flatSkillsData.filter((s) => s.category === filter.key).length;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleFilterClick(filter.key)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium font-sans transition-all duration-300 overflow-hidden select-none flex items-center gap-2 ${
                  isActive
                    ? 'text-white border border-purple-500 bg-purple-600/30 shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_0_10px_rgba(168,85,247,0.2)] scale-105'
                    : 'text-muted-foreground border border-border bg-surface hover:text-foreground hover:border-purple-500/40 hover:bg-elevated hover:-translate-y-0.5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 -z-10" />
                )}
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Skill Cards Grid (Aakarsh DevHQ Signature Wave Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4.5 max-w-7xl mx-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onMouseEnter={() => sounds.playHover(720)}
              className="group relative h-[135px] sm:h-[142px] rounded-2xl bg-surface/80 backdrop-blur-md border border-border hover:border-purple-500/80 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08),0_0_25px_rgba(168,85,247,0.2)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.25)] overflow-hidden cursor-default"
            >
              {/* Signature Liquid Wave Effect on Hover */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[240%] h-[240%] top-[155px] group-hover:top-[-45%] bg-gradient-to-b from-purple-600/90 to-indigo-900/95 transition-all duration-500 ease-out pointer-events-none -z-10 group-hover:animate-[skillWave_6s_linear_infinite]"
                style={{
                  borderRadius: '45% 55% 40% 60% / 55% 60% 35% 45%',
                }}
              />

              {/* Cyan Status Dot for Core CV Highlights */}
              {skill.highlight && (
                <span
                  className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] z-20"
                  title="Core CV Specialization"
                />
              )}

              {/* Brand Icon */}
              <div className="relative z-10 text-3xl sm:text-4xl mb-2 transition-transform duration-300 group-hover:scale-115 group-hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                <i className={`${skill.iconClass} text-3xl sm:text-4xl`} />
              </div>

              {/* Skill Name */}
              <span className="relative z-10 text-xs sm:text-sm font-bold text-foreground tracking-tight text-center group-hover:text-white group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300 line-clamp-1 px-1">
                {skill.name}
              </span>

              {/* Level indicator pill */}
              {skill.level && (
                <span className="relative z-10 text-[10px] font-mono text-muted-foreground group-hover:text-purple-200 mt-1 transition-colors duration-300 px-2 py-0.5 rounded-full bg-elevated/80 group-hover:bg-black/40 border border-border/40 group-hover:border-purple-400/30">
                  {skill.level}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stack Summary Bar */}
        <div className="mt-14 sm:mt-16 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/80 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
            <span>
              Total of {flatSkillsData.length} production technologies verified across Full-Stack, Applied AI, and AppSec
            </span>
          </div>

          {/* Key CV Highlights Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {[
              'MERN Architecture',
              'Google Gemini AI SDK',
              'BugV CTF 3rd Place',
              'Khalti / eSewa / Stripe Gateways',
              'ACID Multi-Doc Transactions',
              'Tribhuvan University BCA Rank 1',
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.03] border border-white/10 text-gray-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
