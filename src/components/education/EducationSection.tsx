// src/components/education/EducationSection.tsx
// Pop Brutalist Education Showcase:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - Tribhuvan University BCA Rank 1 Topper in bold Yellow #FFE14D card
// - Thick 3px black borders, hard offset shadows, high-contrast badges
// - Viswa Niketan Secondary School (+2 Computer Science) foundation card
// - Interactive curriculum pillars with Pop Brutalist module cards
// - Strictly typed, zero emojis, fully accessible

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { sounds } from '../../utils/soundEffects';
import { curriculumPillars } from '../../data/educationData';

export const EducationSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('systems');

  const activePillar = curriculumPillars.find((p) => p.id === activePillarId) || curriculumPillars[0];

  return (
    <section
      id="education"
      aria-label="Academic Education and Honors"
      className="py-20 sm:py-28 relative scroll-mt-16 bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-[3px] border-[#111111]">
            <div className="space-y-3 max-w-xl">
              <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE14D] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>03 // Academic Foundations</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
                Education
              </h2>
              <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80">
                Computer science theory, university board rankings, and formal engineering coursework.
              </p>
            </div>

            {/* Quick Merit Badge */}
            <div className="self-start sm:self-end">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-white border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                <span>TU Rank 1 Topper · CGPA 3.63</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* POP BRUTALIST BENTO GRID                                          */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* =============================================================== */}
          {/* 1. PRIMARY HERO BENTO: TRIBHUVAN UNIVERSITY BCA (Span 8)        */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.05} className="lg:col-span-8">
            <div className="pop-card group relative flex flex-col justify-between h-full overflow-hidden dark:bg-[#181A20]">
              {/* Top Color Banner */}
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FFE14D] text-[#111111] border-b-[3px] border-[#111111] flex flex-wrap items-center justify-between gap-2 font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2.5 py-0.5 text-[11px]">UNIVERSITY</span>
                  <span className="uppercase">Tribhuvan University (TU) · Kathmandu</span>
                </div>
                <span className="bg-white px-2.5 py-0.5 border-2 border-[#111111] text-[11px]">
                  Batch 2022 - 2026
                </span>
              </div>

              {/* Main Content */}
              <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-[3px] border-[#111111]">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="text-xs font-spaceMono font-bold text-[#111111]/70 dark:text-white/70 mt-1">
                      Swoyambhu International College · Affiliated to TU
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17A34A] text-white border-2 border-[#111111] font-spaceMono text-xs font-bold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Final Year · Active</span>
                  </div>
                </div>

                {/* Score & Merit Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Giant Brutalist Grade Card */}
                  <div className="sm:col-span-5 p-5 bg-[#7DFFA6] text-[#111111] border-[3px] border-[#111111] shadow-brutal text-center space-y-2">
                    <span className="text-[11px] font-spaceMono font-bold uppercase tracking-wider block">
                      CUMULATIVE BOARD MERIT
                    </span>
                    <div className="text-4xl sm:text-5xl font-archivoBlack tracking-tight">
                      3.63
                      <span className="text-xl font-spaceMono font-bold"> / 4.0</span>
                    </div>
                    <div className="inline-block px-3 py-1 bg-[#111111] text-white font-spaceMono text-[11px] font-bold uppercase">
                      RANK 1 IN TU
                    </div>
                  </div>

                  {/* Achievements List */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="p-3 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm flex items-start gap-2.5">
                      <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-archivoBlack uppercase text-[#111111] dark:text-white">
                          100% Rank 1 Internal Exam Streak
                        </div>
                        <div className="text-xs font-archivo text-[#111111]/70 dark:text-white/70 mt-0.5">
                          Consistent topper across all semesters in theory and practical programming labs.
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-[#FF6FB5] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-archivoBlack uppercase text-[#111111] dark:text-white">
                          Dean&apos;s Honor List Candidate
                        </div>
                        <div className="text-xs font-archivo text-[#111111]/70 dark:text-white/70 mt-0.5">
                          Dean&apos;s Honor List status throughout; prime candidate for the university academic gold medal.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* INTERACTIVE CURRICULUM EXPLORER                           */}
                {/* ========================================================= */}
                <div className="pt-6 border-t-[3px] border-[#111111]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-spaceMono text-xs font-bold uppercase tracking-wider text-[#111111]/70 dark:text-white/70">
                      Curriculum Pillars // Core CS Coursework:
                    </span>
                  </div>

                  {/* Pillar Selection Pills */}
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {curriculumPillars.map((pillar) => {
                      const isActive = pillar.id === activePillarId;
                      const Icon = pillar.icon;
                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          onClick={() => {
                            sounds.playClick(680);
                            setActivePillarId(pillar.id);
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-2 border-[3px] border-[#111111] font-spaceMono text-xs font-bold uppercase transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#111111] dark:bg-[#FFE14D] text-white dark:text-[#111111] shadow-brutal-sm -translate-x-0.5 -translate-y-0.5'
                              : 'bg-white dark:bg-[#111111] text-[#111111] dark:text-white hover:bg-[#FF6FB5] dark:hover:bg-[#FF6FB5] hover:text-[#111111] dark:hover:text-[#111111]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{pillar.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Module Cards */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      {activePillar.modules.map((mod) => (
                        <div
                          key={mod.code}
                          className="p-3.5 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-2 border-[#111111] shadow-brutal-sm flex flex-col justify-between space-y-2 hover:bg-[#FFE14D] dark:hover:bg-[#1E222D] hover:text-[#111111] dark:hover:text-white hover:border-[#FFE14D] dark:hover:border-[#FFE14D] hover:-translate-y-1 hover:shadow-brutal transition-all duration-200"
                        >
                          <div className="flex items-center justify-between font-spaceMono text-xs font-bold">
                            <span className="text-[#FF6FB5] font-black">{mod.code}</span>
                            <span className="px-1.5 py-0.5 bg-[#17A34A] text-white text-[10px] font-bold">
                              {mod.gradeBadge}
                            </span>
                          </div>
                          <div className="font-archivoBlack text-sm uppercase truncate text-[#111111] dark:text-white">
                            {mod.name}
                          </div>
                          <p className="font-spaceMono text-[10px] leading-relaxed line-clamp-2 opacity-80 text-[#111111] dark:text-white">
                            {mod.keyTopics}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 flex flex-wrap items-center justify-between text-xs font-spaceMono font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#17A34A]" />
                  <span>Affiliated to Tribhuvan University · Curriculum Approved</span>
                </span>
                <span className="text-neutral-500">8 Semesters Full Transcript</span>
              </div>
            </div>
          </ScrollReveal>

          {/* =============================================================== */}
          {/* 2. SECONDARY BENTO: VISWA NIKETAN SECONDARY SCHOOL (Span 4)     */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.15} className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="pop-card group relative flex flex-col justify-between h-full overflow-hidden dark:bg-[#181A20]">
              {/* Top Color Banner */}
              <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#7C9BFF] text-[#111111] border-b-[3px] border-[#111111] flex flex-wrap items-center justify-between gap-2 font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2.5 py-0.5 text-[11px]">+2 / NEB</span>
                  <span className="uppercase">Viswa Niketan</span>
                </div>
                <span>2021 - 2023</span>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                    <BookOpen className="w-6 h-6 text-[#7C9BFF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                      Higher Secondary (+2)
                    </h3>
                    <div className="text-xs font-spaceMono font-bold text-[#111111]/60 dark:text-white/60 mt-0.5">
                      Viswa Niketan Secondary School · Tripureshwor
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm font-spaceMono text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17A34A]" />
                  <span>Computer Science Major · First Division</span>
                </div>

                <p className="font-archivo text-sm font-medium leading-relaxed text-[#111111]/80 dark:text-white/80">
                  Management stream with Computer Science as major. Built foundational fluency in procedural C programming, data normalization, computational logic, and operating system basics.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-spaceMono text-[11px] font-bold uppercase tracking-wider text-[#111111]/60 dark:text-white/60 block">
                    Foundational Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'C Programming',
                      'Boolean Algebra',
                      'Relational Tables',
                      'Computational Logic',
                      'Networking Basics',
                      'HTML/CSS Fundamentals',
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm font-spaceMono text-[11px] font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 text-xs font-spaceMono font-bold text-neutral-500">
                National Examination Board (NEB) Certified
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
