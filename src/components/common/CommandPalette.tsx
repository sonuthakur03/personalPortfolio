// src/components/common/CommandPalette.tsx
// Pop Brutalist Command Palette (Ctrl+K):
// - Heavy 3px solid black borders, shadow-brutal-xl
// - Yellow (#FFE14D) search input header with bold Space Mono typography
// - Pink (#FF6FB5) active selection highlighting with hard black offset shadows
// - Mint (#7DFFA6) keyboard navigation footer
// - Audio cues and smooth keyboard shortcuts

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Shield, Cpu, Layers, ExternalLink, X } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { useNavigate } from 'react-router-dom';
import { sounds } from '../../utils/soundEffects';
import { DEFAULT_INSTAGRAM, DEFAULT_RESUME_URL } from '../../data/profileData';

import { useModalDismiss } from '../../hooks/useModalDismiss';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const { visibleProjects, profile } = usePortfolioContent();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useModalDismiss({ isOpen, onClose });

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keydown listener for Ctrl+K toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigateToSection = (sectionId: string) => {
    sounds.playClick();
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // Assemble searchable items
  interface CommandItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Projects' | 'Navigation' | 'External' | 'Admin';
    action: () => void;
  }

  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-projects',
      title: 'View All Architecture Blueprints',
      subtitle: 'Explore 6 full-stack, AI, and civic system case studies',
      category: 'Navigation',
      action: () => navigateToSection('projects'),
    },
    {
      id: 'nav-journey',
      title: 'Academic Merit & Career Trajectory',
      subtitle: 'Tribhuvan Univ Rank 1, BugV CTF podium, and Zidio AI journey',
      category: 'Navigation',
      action: () => navigateToSection('experience'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Core Expertise',
      subtitle: 'Interactive sticker pack with verified CV badges',
      category: 'Navigation',
      action: () => navigateToSection('skills'),
    },
    {
      id: 'nav-education',
      title: 'Education & Academic Honors',
      subtitle: 'TU BCA Rank 1 topper (3.63 CGPA) & Viswa Niketan +2',
      category: 'Navigation',
      action: () => navigateToSection('education'),
    },
    {
      id: 'nav-certs',
      title: 'Certifications & Verified Credentials',
      subtitle: 'BugV CTF, Tribhuvan Univ Merit, Zidio AI, and OWASP certifications',
      category: 'Navigation',
      action: () => navigateToSection('certifications'),
    },
    {
      id: 'nav-profiles',
      title: 'Web Presence & Dev Network',
      subtitle: 'LinkedIn, GitHub, BugV CTF, and LeetCode social cards',
      category: 'Navigation',
      action: () => navigateToSection('profiles'),
    },
    // Projects
    ...visibleProjects.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: `${p.role} · ${p.architectureDiagram.subtitle}`,
      category: 'Projects' as const,
      action: () => {
        sounds.playClick();
        onClose();
        if (onSelectProject) onSelectProject(p.id);
        else navigateToSection('projects');
      },
    })),
    // External
    {
      id: 'ext-github',
      title: 'GitHub Profile',
      subtitle: profile.github,
      category: 'External',
      action: () => window.open(profile.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'ext-linkedin',
      title: 'LinkedIn Profile',
      subtitle: profile.linkedin,
      category: 'External',
      action: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'ext-instagram',
      title: 'Instagram Profile',
      subtitle: '@not_sonuthakur',
      category: 'External',
      action: () => window.open(profile.instagram || DEFAULT_INSTAGRAM, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'doc-cv',
      title: 'Download CV / Resume (PDF)',
      subtitle: '2-page verified technical curriculum vitae',
      category: 'External',
      action: () => {
        sounds.playClick(900);
        window.open(profile.resumeUrl || DEFAULT_RESUME_URL, '_blank', 'noopener,noreferrer');
      },
    },
  ];

  // Filter items
  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl overflow-hidden text-[#111111] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Banner in Pop Yellow */}
        <div className="flex items-center px-4 py-3.5 border-b-[3px] border-[#111111] bg-[#FFE14D]">
          <Search className="w-5 h-5 text-[#111111] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="SEARCH BLUEPRINTS, SKILLS, OR ROLES..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full bg-transparent border-none outline-none text-[#111111] font-spaceMono font-bold text-sm placeholder:text-[#111111]/60 uppercase tracking-wide"
          />
          <button
            onClick={onClose}
            className="p-1 bg-white text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:bg-[#FF6FB5] transition-colors cursor-pointer"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 bg-[#F8F6F0] dark:bg-[#121318]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-spaceMono font-bold text-zinc-500 uppercase">
              No matching commands or blueprints found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 border-2 border-[#111111] cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FF6FB5] text-[#111111] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                      : 'bg-white dark:bg-[#1c1e28] text-[#111111] dark:text-white shadow-[2px_2px_0_#111111] hover:bg-[#FFE14D]'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-1.5 text-xs font-spaceMono shrink-0 border-2 border-[#111111] ${
                        isSelected
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#FFE14D] text-[#111111]'
                      }`}
                    >
                      {item.category === 'Projects' && <Layers className="w-3.5 h-3.5" />}
                      {item.category === 'Admin' && <Shield className="w-3.5 h-3.5" />}
                      {item.category === 'Navigation' && <Cpu className="w-3.5 h-3.5" />}
                      {item.category === 'External' && <ExternalLink className="w-3.5 h-3.5" />}
                    </div>
                    <div className="truncate">
                      <div className="font-archivoBlack text-xs uppercase truncate">
                        {item.title}
                      </div>
                      <div
                        className={`font-spaceMono text-[11px] font-bold truncate ${
                          isSelected ? 'text-[#111111]' : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <span
                      className={`text-[10px] font-spaceMono font-bold px-2 py-0.5 border border-[#111111] hidden sm:inline uppercase ${
                        isSelected ? 'bg-white text-[#111111]' : 'bg-[#7DFFA6] text-[#111111]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${isSelected ? 'text-[#111111]' : 'text-zinc-400'}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Mint Footer info */}
        <div className="px-4 py-2 border-t-[3px] border-[#111111] bg-[#7DFFA6] text-[#111111] flex items-center justify-between text-xs font-spaceMono font-bold uppercase">
          <span>Navigate: ↑ ↓ · Enter: ↵</span>
          <span>Esc: Close</span>
        </div>
      </div>
    </div>
  );
};
