// src/components/skills/SkillsSection.tsx
// Pop Brutalist Skills & Technical Stack Showcase:
// - Collectible Pop Brutalist Sticker Pack aesthetic
// - Thick 3px black borders, hard offset shadows, alternating playful tilts
// - Pop Brutalist filter pills with instant category switching
// - Devicon integration with high-contrast sticker badges
// - Strictly typed, zero emojis, responsive across all viewports

import React, { useState } from 'react';
import { flatSkillsData, type SkillCategoryType } from '../../data/skillsData';
import { Cpu } from 'lucide-react';
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
  { key: 'ai-tools', label: 'AI Dev Tools' },
  { key: 'tools', label: 'Tools & Hosting' },
  { key: 'fundamentals', label: 'CS Fundamentals' },
];

// Alternating rotation tilts for playful sticker feel
const tilts = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3', 'rotate-1'];

// Diverse Pop Brutalist liquid filling gradients for each skill card
const waveGradients = [
  'from-[#FF6FB5]/95 via-[#FF8A65]/95 to-[#FFE14D]', // Pink / Coral / Yellow
  'from-[#7C9BFF]/95 via-[#A78BFA]/95 to-[#FF6FB5]', // Soft Blue / Violet / Pink
  'from-[#7DFFA6]/95 via-[#38BDF8]/95 to-[#7C9BFF]', // Mint / Sky / Cobalt
  'from-[#FFE14D]/95 via-[#FFB38A]/95 to-[#FF6FB5]', // Pop Yellow / Peach / Punch
  'from-[#38BDF8]/95 via-[#7DFFA6]/95 to-[#FFE14D]', // Cyan / Lime / Lemon
  'from-[#C084FC]/95 via-[#F472B6]/95 to-[#FB7185]', // Lavender / Orchid / Rose
  'from-[#34D399]/95 via-[#60A5FA]/95 to-[#A78BFA]', // Emerald / Blue / Iris
  'from-[#FB923C]/95 via-[#F43F5E]/95 to-[#C084FC]', // Amber / Crimson / Purple
  'from-[#F43F5E]/95 via-[#FB923C]/95 to-[#FFE14D]', // Cherry / Tangerine / Gold
  'from-[#2DD4BF]/95 via-[#38BDF8]/95 to-[#818CF8]', // Teal / Ice / Periwinkle
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
    <section
      id="skills"
      aria-label="Technical Skills and Arsenal"
      className="py-20 sm:py-28 relative bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-[3px] border-[#111111]">
            <div className="space-y-3 max-w-xl">
              <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#7DFFA6] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>04 // Technical Arsenal</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
                Skills &amp; Stack
              </h2>
              <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80">
                Production-grade technologies across full-stack engineering, applied AI, and application security.
              </p>
            </div>

            <div className="self-start sm:self-end">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold">
                <span>{flatSkillsData.length} Verified Tech Competencies</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* POP BRUTALIST FILTER PILLS                                        */}
        {/* ================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
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
                className={`px-4 sm:px-5 py-2 border-[3px] border-[#111111] font-spaceMono text-xs sm:text-sm font-bold uppercase transition-all select-none cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FF6FB5] text-[#111111] shadow-brutal -translate-x-0.5 -translate-y-0.5'
                    : 'bg-white dark:bg-[#181A20] text-[#111111] dark:text-white hover:bg-[#FFE14D] dark:hover:bg-[#FFE14D] hover:text-[#111111] dark:hover:text-[#111111]'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 border border-[#111111] font-bold ${
                    isActive ? 'bg-[#111111] text-white' : 'bg-neutral-100 dark:bg-black text-[#111111] dark:text-white'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* POP BRUTALIST STICKER PACK GRID                                   */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredSkills.map((skill, idx) => {
            const tilt = tilts[idx % tilts.length];
            const waveGradient = waveGradients[idx % waveGradients.length];

            return (
              <div
                key={skill.id}
                onMouseEnter={() => sounds.playHover(720)}
                className={`pop-card group relative h-[148px] sm:h-[156px] p-2.5 sm:p-3 flex flex-col items-center justify-between text-center bg-white dark:bg-[#181A20] ${tilt} hover:rotate-0 hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300 cursor-default select-none overflow-hidden`}
              >
                {/* Signature Liquid Wave Effect on Hover with Unique Gradient per Card */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-[240%] h-[240%] top-[195px] group-hover:top-[-45%] bg-gradient-to-b ${waveGradient} transition-all duration-500 ease-out pointer-events-none -z-10 group-hover:animate-[skillWave_6s_linear_infinite]`}
                  style={{
                    borderRadius: '45% 55% 40% 60% / 55% 60% 35% 45%',
                  }}
                />

                {/* Highlight Badge */}
                {skill.highlight && (
                  <span
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-[#FF6FB5] text-[#111111] border border-[#111111] font-spaceMono text-[8.5px] font-black z-20"
                    title="Core CV Focus"
                  >
                    ✦ CORE
                  </span>
                )}

                {/* Brand Icon */}
                <div className="relative z-10 text-3xl sm:text-4xl mt-1 text-[#111111] dark:text-white group-hover:text-[#111111] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                  <i className={skill.iconClass} />
                </div>

                {/* Name & Level (100% visible before hover in both light & dark mode) */}
                <div className="relative z-10 w-full space-y-1 flex flex-col items-center justify-center">
                  <span
                    className="font-archivoBlack text-[10.5px] sm:text-[11.5px] uppercase tracking-tight leading-tight line-clamp-2 block text-[#111111] dark:text-white group-hover:text-[#111111] transition-colors duration-200 px-0.5"
                    title={skill.name}
                  >
                    {skill.name}
                  </span>
                  {skill.level && (
                    <span
                      className="inline-block max-w-[98%] truncate px-1.5 py-0.5 bg-neutral-100 dark:bg-black/60 group-hover:bg-white/95 border border-[#111111] dark:border-neutral-700 group-hover:border-[#111111] font-spaceMono text-[8.5px] sm:text-[9.5px] font-bold text-[#111111] dark:text-neutral-200 group-hover:text-[#111111] transition-colors duration-200"
                      title={skill.level}
                    >
                      {skill.level}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
