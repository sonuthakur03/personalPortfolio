import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../components/hero/HeroSection';
import { FloatingDock } from '../components/common/FloatingDock';
import { SkillsSection } from '../components/skills/SkillsSection';
import { EducationSection } from '../components/education/EducationSection';
import { CertificationsSection } from '../components/certifications/CertificationsSection';
import { PortfolioContentProvider } from '../context/PortfolioContentContext';

const renderWithContext = (ui: React.ReactElement) => {
  return render(<PortfolioContentProvider>{ui}</PortfolioContentProvider>);
};

describe('Core Component Rendering & Interaction', () => {
  it('renders HeroSection with developer identity, headline, and action CTAs', () => {
    const handleOpenContact = vi.fn();
    renderWithContext(<HeroSection onOpenContact={handleOpenContact} />);

    // Brand and headline
    expect(screen.getAllByText(/Sonu Thakur/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Full stack/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/developer/i).length).toBeGreaterThanOrEqual(1);

    // CTA buttons
    const exploreBtn = screen.getByText(/Explore my work/i);
    expect(exploreBtn).toBeInTheDocument();

    const contactBtn = screen.getByText(/Get in touch/i);
    expect(contactBtn).toBeInTheDocument();
    fireEvent.click(contactBtn);
    expect(handleOpenContact).toHaveBeenCalledTimes(1);
  });

  it('renders FloatingDock with navigation actions and fold button', () => {
    window.scrollY = 350;
    renderWithContext(<FloatingDock onOpenContact={() => {}} />);

    const foldButton = screen.getByTitle(/Fold dock/i);
    expect(foldButton).toBeInTheDocument();
    expect(screen.getByTitle(/Home/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Projects/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Skills/i)).toBeInTheDocument();
  });

  it('renders SkillsSection and filters categories properly', () => {
    renderWithContext(<SkillsSection />);

    expect(screen.getByText(/04 \/\/ Technical Arsenal/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills & Stack/i)).toBeInTheDocument();

    // Verify filter pills
    expect(screen.getByText(/All Stack/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /frontend/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /backend/i })).toBeInTheDocument();

    // Click Backend filter pill
    const backendPill = screen.getByRole('button', { name: /backend/i });
    fireEvent.click(backendPill);
    expect(screen.getByText(/Node\.js/i)).toBeInTheDocument();
  });

  it('renders EducationSection with Tribhuvan University BCA topper merit', () => {
    renderWithContext(<EducationSection />);

    expect(screen.getByText(/Bachelor of Computer Applications \(BCA\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/3\.63/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/RANK 1 IN TU/i)).toBeInTheDocument();

    // Verify Curriculum Pillars
    expect(screen.getByText(/Curriculum Pillars/i)).toBeInTheDocument();
    expect(screen.getByText(/Systems & Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Data & Algorithms/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineering/i)).toBeInTheDocument();
  });

  it('renders CertificationsSection with Exhibition Stage and filter categories', () => {
    renderWithContext(<CertificationsSection />);

    expect(screen.getByText(/05 \/\/ Verified Credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/Exhibition Stage/i)).toBeInTheDocument();
    expect(screen.getByText(/🏆 Wins & Podiums/i)).toBeInTheDocument();
    expect(screen.getByText(/Surprise Me/i)).toBeInTheDocument();
  });
});
