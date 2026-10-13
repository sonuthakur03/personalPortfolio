import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Shield, Cpu, Layers, ExternalLink, X } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { useNavigate } from 'react-router-dom';

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

  // Global keydown listeners for Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigateToSection = (sectionId: string) => {
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
      action: () => navigateToSection('journey'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Core Expertise',
      subtitle: '5-column filterable tech stack with interactive wave cards',
      category: 'Navigation',
      action: () => navigateToSection('skills'),
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
    {
      id: 'nav-admin',
      title: 'Admin Control Console',
      subtitle: 'Manage portfolio sections, draft hackathon wins, and export code',
      category: 'Admin',
      action: () => {
        onClose();
        navigate('/admin');
      },
    },
    // Projects
    ...visibleProjects.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: `${p.role} · ${p.architectureDiagram.subtitle}`,
      category: 'Projects' as const,
      action: () => {
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-zinc-950 border border-white/15 text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-black">
          <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, architecture diagrams, skills, or admin..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-zinc-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching commands or architecture blueprints found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-white text-black' : 'hover:bg-white/[0.04] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-1.5 text-xs font-mono shrink-0 border ${
                        isSelected
                          ? 'border-black text-black bg-transparent'
                          : 'border-white/10 text-zinc-400 bg-black'
                      }`}
                    >
                      {item.category === 'Projects' && <Layers className="w-3.5 h-3.5" />}
                      {item.category === 'Admin' && <Shield className="w-3.5 h-3.5" />}
                      {item.category === 'Navigation' && <Cpu className="w-3.5 h-3.5" />}
                      {item.category === 'External' && <ExternalLink className="w-3.5 h-3.5" />}
                    </div>
                    <div className="truncate">
                      <div className="font-display font-medium text-xs truncate">
                        {item.title}
                      </div>
                      <div
                        className={`font-mono text-[11px] truncate ${
                          isSelected ? 'text-zinc-700' : 'text-zinc-500'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span
                      className={`text-[10px] font-mono hidden sm:inline ${
                        isSelected ? 'text-zinc-600' : 'text-zinc-500'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-zinc-500'}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/10 bg-black flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
