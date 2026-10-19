// src/components/timeline/JourneyTimeline.tsx
// Pop Brutalist Asymmetric Bento Grid for Experience:
// - Authentic Pop Brutalist styling matching B · Pop Brutalist design specification
// - 3px solid black borders, hard offset shadows, vibrant color banners
// - Cell 1 (lg:col-span-7): Zidio Development (Blue #7C9BFF banner + telemetry metrics)
// - Cell 2 (lg:col-span-5): BugV National CTF (Yellow #FFE14D banner + terminal exploit verify)
// - Cell 3 (lg:col-span-5): Embark Hackathon (Pink #FF6FB5 banner + geo-radar pipeline)
// - Cell 4 (lg:col-span-7): Production Systems (Peach #FFB38A banner + 2x3 live node matrix)

import React from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { sounds } from '../../utils/soundEffects';

export const JourneyTimeline: React.FC = () => {
  return (
    <section
      id="experience"
      aria-label="Professional Experience and Track Record"
      className="py-20 sm:py-28 relative scroll-mt-16 bg-[#F8F6F0] dark:bg-[#0D0E12] text-[#111111] dark:text-[#F4F4F5] border-b-[3px] border-[#111111] overflow-hidden"
    >
      <div id="journey" className="absolute -top-16" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-8 sm:space-y-10">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-[3px] border-[#111111]">
            <div className="space-y-3 max-w-xl">
              <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#7DFFA6] text-[#111111] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase -rotate-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>02 // Track Record</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white leading-[0.95]">
                Experience
              </h2>
              <p className="text-base font-archivo font-semibold text-[#111111]/80 dark:text-white/80">
                Production-grade applied AI, competitive cybersecurity tournaments, and distributed web platforms.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================= */}
        {/* POP BRUTALIST ASYMMETRIC BENTO GRID                               */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* =============================================================== */}
          {/* CELL 1: ZIDIO DEVELOPMENT (lg:col-span-7)                       */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.05} className="lg:col-span-7">
            <div className="pop-card group relative h-full flex flex-col justify-between overflow-hidden dark:bg-[#181A20]">
              {/* Color Header Banner */}
              <div className="px-5 py-3 bg-[#7C9BFF] text-[#111111] border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2 py-0.5 text-[11px]">INTERNSHIP</span>
                  <span className="uppercase">Zidio Development · Remote</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 border-2 border-[#111111] text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                  <span>Active Production</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  {/* Left Column: Role Details */}
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <h3 className="text-2xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                        Full Stack Developer Intern
                      </h3>
                      <p className="text-xs font-spaceMono font-bold text-[#111111]/60 dark:text-white/60 mt-1">
                        Project LOOP · 07/2026 - Present · Core 2-Dev Team
                      </p>
                    </div>

                    <p className="font-archivo text-sm font-medium leading-relaxed text-[#111111]/80 dark:text-white/80">
                      Engineered multimodal Voice-of-Customer (VoC) analytics and automated escalation pipelines for Project LOOP using the Google Gemini AI SDK with strict token budgets and ACID MongoDB transactions.
                    </p>

                    <div className="font-spaceMono text-xs font-bold text-[#111111]/70 dark:text-white/70 pt-2">
                      Gemini SDK · Node.js · React · MongoDB ACID · Vercel
                    </div>
                  </div>

                  {/* Right Column: Brutalist Metric Blocks */}
                  <div className="sm:col-span-5 flex flex-col justify-between gap-3 sm:border-l-[3px] sm:border-[#111111] sm:pl-5">
                    <div className="p-3 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                      <div className="text-2xl font-archivoBlack tracking-tight">&lt;120ms</div>
                      <div className="text-[10px] font-spaceMono font-bold uppercase tracking-wider">
                        P99 Token Latency
                      </div>
                    </div>

                    <div className="p-3 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                      <div className="text-2xl font-archivoBlack tracking-tight">94.2%</div>
                      <div className="text-[10px] font-spaceMono font-bold uppercase tracking-wider">
                        VoC Risk Accuracy
                      </div>
                    </div>

                    <div className="p-3 bg-[#FFB38A] text-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                      <div className="text-2xl font-archivoBlack tracking-tight">ACID</div>
                      <div className="text-[10px] font-spaceMono font-bold uppercase tracking-wider">
                        Concurrency Safety
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Link */}
              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 flex items-center justify-between text-xs font-spaceMono font-bold">
                <a
                  href="#projects"
                  onClick={() => sounds.playClick(750)}
                  className="inline-flex items-center gap-1.5 text-[#111111] dark:text-white hover:text-[#FF6FB5] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Inspect Project LOOP Blueprint</span>
                </a>
                <span className="text-neutral-500 text-[11px]">2-Person Core Delivery</span>
              </div>
            </div>
          </ScrollReveal>

          {/* =============================================================== */}
          {/* CELL 2: IDEAX HACKATHON FINTECH TRACK WINNER (lg:col-span-5)    */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <div className="pop-card group relative h-full flex flex-col justify-between overflow-hidden dark:bg-[#181A20]">
              {/* Color Header Banner */}
              <div className="px-5 py-3 bg-[#FFE14D] text-[#111111] border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2 py-0.5 text-[11px]">HACKATHON</span>
                  <span className="uppercase">IdeaX 2026</span>
                </div>
                <span className="bg-white px-2 py-0.5 border-2 border-[#111111] text-[11px] font-black">
                  Track Winner 🏆
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                    FinTech Track Winner
                  </h3>
                  <p className="text-xs font-spaceMono font-bold text-[#111111]/60 dark:text-white/60 mt-1">
                    72-Hour Hackathon · Team FinTrace · 1st Place
                  </p>
                </div>

                <p className="font-archivo text-sm font-medium leading-relaxed text-[#111111]/80 dark:text-white/80">
                  Secured 1st Place / Track Winner in the FinTech Track at the 72-Hour IdeaX Hackathon with project FinTrace. Designed and deployed an algorithmic real-time financial tracking and expense orchestration platform.
                </p>

                {/* 2-Step Brutalist Pipeline */}
                <div className="grid grid-cols-2 gap-3 pt-1 font-spaceMono text-xs">
                  <div className="p-3 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                    <span className="text-[#17A34A] font-black block mb-1">01. Real-Time Flow</span>
                    <span className="text-xs text-[#111111]/70 dark:text-white/70">Algorithmic Ledger</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-brutal-sm">
                    <span className="text-[#7C9BFF] font-black block mb-1">02. FinTech Engine</span>
                    <span className="text-xs text-[#111111]/70 dark:text-white/70">Full-Stack MERN</span>
                  </div>
                </div>

                <div className="font-spaceMono text-xs font-bold text-[#111111]/70 dark:text-white/70">
                  Full-Stack MERN · FinTech Algorithms · REST APIs · System Architecture
                </div>
              </div>

              {/* Bottom Quick-Action Link */}
              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 flex items-center justify-between text-xs font-spaceMono font-bold">
                <a
                  href="#certifications"
                  onClick={() => sounds.playClick(750)}
                  className="inline-flex items-center gap-1.5 text-[#111111] dark:text-white hover:text-[#FF6FB5] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Inspect IdeaX Winner Certificate</span>
                </a>
                <span className="text-neutral-500 text-[11px]">Oct 2026 Champion</span>
              </div>
            </div>
          </ScrollReveal>

          {/* =============================================================== */}
          {/* CELL 3: BUGV NATIONAL CTF (lg:col-span-5)                       */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.15} className="lg:col-span-5">
            <div className="pop-card group relative h-full flex flex-col justify-between overflow-hidden dark:bg-[#181A20]">
              {/* Color Header Banner */}
              <div className="px-5 py-3 bg-[#7DFFA6] text-[#111111] border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2 py-0.5 text-[11px]">SECURITY</span>
                  <span className="uppercase">BugV Cyber Defense</span>
                </div>
                <span className="bg-white px-2 py-0.5 border-2 border-[#111111] text-[11px]">
                  Solo 3rd Podium 🏆
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                    BugV National CTF 2026
                  </h3>
                  <p className="text-xs font-spaceMono font-bold text-[#111111]/60 dark:text-white/60 mt-1">
                    48-Hour Continuous CTF Tournament · Solo Non-Team Entry
                  </p>
                </div>

                {/* Brutalist Terminal Window */}
                <div className="bg-[#111111] text-white border-[3px] border-[#111111] p-3.5 font-spaceMono text-xs space-y-2 shadow-brutal-sm">
                  <div className="flex items-center justify-between pb-1.5 border-b border-neutral-700 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6FB5]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFE14D]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7DFFA6]" />
                    </div>
                    <span className="text-[#7DFFA6]">$ ./verify_exploit.sh</span>
                  </div>
                  <div className="space-y-1 pt-1 text-[11px]">
                    <div className="text-[#7DFFA6]">[+] BOLA privilege escalation bypassed</div>
                    <div className="text-[#B9C8FF]">[+] JWT signature forgery &amp; LLM delimiter defense</div>
                    <div className="text-amber-400">[✓] Verified flags: 18/20 challenges solved</div>
                  </div>
                </div>

                <div className="font-spaceMono text-xs font-bold text-[#111111]/70 dark:text-white/70">
                  OWASP Top 10 · BOLA · JWT Signatures · LLM Guardrails
                </div>
              </div>

              {/* Bottom Quick-Action Link */}
              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 flex items-center justify-between text-xs font-spaceMono font-bold">
                <a
                  href="#certifications"
                  onClick={() => sounds.playClick(700)}
                  className="inline-flex items-center gap-1.5 text-[#111111] dark:text-white hover:text-[#FF6FB5] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Verify CTF Credential</span>
                </a>
                <span className="text-neutral-500 text-[11px]">Nationwide Standing</span>
              </div>
            </div>
          </ScrollReveal>

          {/* =============================================================== */}
          {/* CELL 4: PRODUCTION SYSTEMS (lg:col-span-7)                      */}
          {/* =============================================================== */}
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="pop-card group relative h-full flex flex-col justify-between overflow-hidden dark:bg-[#181A20]">
              {/* Color Header Banner */}
              <div className="px-5 py-3 bg-[#FFB38A] text-[#111111] border-b-[3px] border-[#111111] flex items-center justify-between font-spaceMono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white px-2 py-0.5 text-[11px]">PORTFOLIO</span>
                  <span className="uppercase">Production Platforms</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 border-2 border-[#111111] text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#17A34A] animate-pulse" />
                  <span>6 Live Systems</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                  {/* Left Column */}
                  <div className="sm:col-span-5 space-y-3">
                    <div>
                      <h3 className="text-2xl font-archivoBlack uppercase tracking-tight text-[#111111] dark:text-white">
                        Full-Stack Engineer
                      </h3>
                      <p className="text-xs font-spaceMono font-bold text-[#111111]/60 dark:text-white/60 mt-1">
                        Independent Architect · 2024 - 2026
                      </p>
                    </div>

                    <p className="font-archivo text-sm font-medium leading-relaxed text-[#111111]/80 dark:text-white/80">
                      Shipped 6 production web applications with real-world payment gateway integrations, scheduled cron worker daemons, and client-side caching.
                    </p>

                    <div className="font-spaceMono text-xs font-bold text-[#111111]/70 dark:text-white/70">
                      Khalti · eSewa · Stripe · Node-Cron · MERN · Cloudinary
                    </div>
                  </div>

                  {/* Right Column: 2x3 Node Matrix */}
                  <div className="sm:col-span-7 grid grid-cols-2 gap-2.5 sm:border-l-[3px] sm:border-[#111111] sm:pl-5">
                    {[
                      { name: 'CricketNepal', tech: 'Khalti / eSewa / Stripe', status: 'live' },
                      { name: 'StudyTrack', tech: 'Node-Cron Worker', status: 'live' },
                      { name: 'PublicCare', tech: 'WebSockets Mesh', status: 'live' },
                      { name: 'Project LOOP', tech: 'Gemini VoC Pipeline', status: 'live' },
                      { name: 'Quizify', tech: 'Open Trivia Cache', status: 'live' },
                      { name: 'TravelNP', tech: 'Figma UI/UX System', status: 'design' },
                    ].map((node) => (
                      <div
                        key={node.name}
                        onMouseEnter={() => sounds.playHover(800)}
                        className="p-2.5 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-2 border-[#111111] shadow-brutal-sm hover:bg-[#FFE14D] dark:hover:bg-[#1E2028] hover:text-[#111111] dark:hover:text-white transition-colors cursor-default"
                      >
                        <div className="flex items-center justify-between text-xs font-archivoBlack uppercase">
                          <span className="truncate">{node.name}</span>
                          <span
                            className={`w-2 h-2 rounded-full border border-black shrink-0 ${
                              node.status === 'live' ? 'bg-[#17A34A]' : 'bg-amber-400'
                            }`}
                          />
                        </div>
                        <div className="text-[10px] font-spaceMono font-bold text-[#111111]/70 dark:text-white/70 truncate mt-1">
                          {node.tech}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Link */}
              <div className="p-4 px-6 border-t-[3px] border-[#111111] bg-neutral-50 dark:bg-black/20 flex items-center justify-between text-xs font-spaceMono font-bold">
                <a
                  href="#projects"
                  onClick={() => sounds.playClick(750)}
                  className="inline-flex items-center gap-1.5 text-[#111111] dark:text-white hover:text-[#FF6FB5] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Explore All 6 Production Systems</span>
                </a>
                <span className="text-neutral-500 text-[11px]">100% Uptime Track Record</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
