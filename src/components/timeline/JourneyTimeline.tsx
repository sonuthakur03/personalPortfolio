// src/components/timeline/JourneyTimeline.tsx
import React from 'react';
import { Award, Shield, Cpu, Code2, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface Milestone {
  year: string;
  role: string;
  organization: string;
  category: 'education' | 'security' | 'ai' | 'fullstack';
  badge: string;
  summary: string;
  highlights: string[];
}

export const JourneyTimeline: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: '2026',
      role: 'BugV National CTF 3rd Place Podium',
      organization: 'BugV Cyber Defense Network',
      category: 'security',
      badge: 'Solo 3rd Place (Nationwide)',
      summary: 'Competed solo across 48-hour continuous CTF challenges solving advanced web exploits, JWT forgery, and AI prompt jailbreaks.',
      highlights: ['Bypassed Broken Object Level Auth (BOLA)', 'Constructed hardened delimiter guards for LLM APIs', 'Solo competitor podium recognition'],
    },
    {
      year: '2025 - 2026',
      role: 'Applied AI & Full-Stack Intern',
      organization: 'Zidio Development (Project LOOP)',
      category: 'ai',
      badge: 'Gemini AI SDK & MERN',
      summary: 'Engineered multimodal Voice-of-Customer (VoC) analytics and customer escalation pipelines with strict token budgets and ACID concurrency.',
      highlights: ['Sub-120ms token streaming latency', 'VoC Risk Matrix classification with 94.2% accuracy', 'MongoDB multi-document ACID transactions'],
    },
    {
      year: '2022 - 2026',
      role: 'Bachelor of Computer Applications (BCA)',
      organization: 'Tribhuvan University',
      category: 'education',
      badge: 'Rank 1 TU Board Exams (CGPA 3.63)',
      summary: 'Graduated as the university board exam topper across the computer applications faculty, mastering OS architecture, databases, and network protocols.',
      highlights: ['Dean’s Honor List throughout 8 semesters', 'Academic Gold Medal Candidate', 'Peer Mentor in Web Architecture & Cybersecurity'],
    },
    {
      year: '2024 - 2026',
      role: 'Full-Stack Systems & Civic Engineering',
      organization: 'Open Source & Production Platforms',
      category: 'fullstack',
      badge: 'Production Systems',
      summary: 'Designed and deployed 6 production-grade web systems including CricketNepal (3-gateway eCommerce), PublicCare (civic geolocation mesh), and StudyTrack.',
      highlights: ['Optimistic concurrency stock locks', 'WebSocket real-time contractor tendering', 'End-to-end Archify system blueprint documentation'],
    },
  ];

  const getCategoryIcon = (cat: Milestone['category']) => {
    switch (cat) {
      case 'security':
        return <Shield className="w-4 h-4 text-accent-emerald" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-accent-cyan" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-accent-amber" />;
      case 'fullstack':
        return <Code2 className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative scroll-mt-12">
      <div id="journey" className="absolute -top-12" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Engineering Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Experience &amp; Education
            </h2>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground mt-2 leading-relaxed">
              Verified academic excellence, CTF achievements, and applied engineering across production systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Visual Timeline Stream */}
        <div className="relative border-l-2 border-border/80 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10">
          {milestones.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} yOffset={24}>
            <div className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-md group-hover:border-accent-cyan transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-accent-cyan transition-colors" />
              </div>

              {/* Milestone Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-surface/90 border border-subtle hover:border-primary/40 transition-all shadow-md space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-elevated border border-border">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground">
                        {item.role}
                      </h3>
                      <div className="text-xs font-mono text-muted-foreground">
                        {item.organization}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.year}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] font-sans text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-2.5 py-1 rounded bg-background border border-border text-[11px] font-mono text-muted-foreground"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
