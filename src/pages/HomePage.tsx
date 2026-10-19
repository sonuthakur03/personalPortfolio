import React, { useState } from 'react';
import { Footer } from '../components/common/Footer';
import { CommandPalette } from '../components/common/CommandPalette';
import { ScrollProgressBar } from '../components/common/ScrollProgressBar';
import { FloatingDock } from '../components/common/FloatingDock';
import { ContactModal } from '../components/common/ContactModal';
import { LanguagePreloader } from '../components/common/LanguagePreloader';
import { HeroSection } from '../components/hero/HeroSection';
import { AntigravityCanvas } from '../components/hero/AntigravityCanvas';
import { ProjectsSection } from '../components/case-studies/ProjectsSection';
import { CaseStudyModal } from '../components/case-studies/CaseStudyModal';
import { JourneyTimeline } from '../components/timeline/JourneyTimeline';
import { SkillsSection } from '../components/skills/SkillsSection';
import { CertificationsSection } from '../components/certifications/CertificationsSection';
import { WebPresenceSection } from '../components/social/WebPresenceSection';
import { EducationSection } from '../components/education/EducationSection';
import { PullCordTheme } from '../components/common/PullCordTheme';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import type { ProjectCaseStudy } from '../types/projects';

const HomePage: React.FC = () => {
  const { visibleProjects } = usePortfolioContent();
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectCaseStudy | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSelectProjectFromCommand = (projectId: string) => {
    const proj = visibleProjects.find((p) => p.id === projectId);
    if (proj) {
      setSelectedModalProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-[#FFE14D] selection:text-[#111111] overflow-x-hidden">
      {/* 0. Initial Multi-Language Preloader */}
      <LanguagePreloader />

      {/* Ceiling Pull-Cord Theme Switcher (abdulrehmanwaseem.me inspiration) */}
      <PullCordTheme />

      {/* 1. Scroll Progress Bar (aakarsh-devhq inspiration) */}
      <ScrollProgressBar />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Landing: Clean, Elevated Horizon Arc, Monochrome SONU (Zero Circles) */}
        <HeroSection
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        {/* 2. Rest of the Website: Subtly Animated Black & Grey Circles Backdrop */}
        <div className="relative overflow-hidden">
          <AntigravityCanvas />

          {/* 2. Flagship Case Studies & Archify Diagrams */}
          <ProjectsSection onOpenModal={(project) => setSelectedModalProject(project)} />

          {/* 5. Engineering Career & Experience */}
          <JourneyTimeline />

          {/* 6. Education Showcase (Vibrant Bento Standard) */}
          <EducationSection />

          {/* 6. Technical Skills (Aakarsh DevHQ inspired) */}
          <SkillsSection />

          {/* 7. Certifications & Milestones (Aakarsh DevHQ inspired) */}
          <CertificationsSection />

          {/* 8. Web Presence & Dev Network (Aakarsh DevHQ inspired social handle cards) */}
          <WebPresenceSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Archify Case Study Modal */}
      <CaseStudyModal
        project={selectedModalProject}
        isOpen={!!selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectFromCommand}
      />

      {/* Floating Bottom Navigation Dock (aakarsh-devhq / sawad inspiration) */}
      <FloatingDock onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
