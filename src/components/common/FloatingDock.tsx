import React, { useState, useEffect } from 'react';
import { Home, Layers, Award, Wrench, Globe, CheckCircle2, Mail, Sun, Moon } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { sounds } from '../../utils/soundEffects';

interface FloatingDockProps {
  onOpenContact: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenContact }) => {
  const { theme, toggleTheme } = usePortfolioContent();
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const sections = ['profiles', 'certifications', 'skills', 'journey', 'projects'];
      const scrollPos = window.scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          return;
        }
      }
      if (window.scrollY < 400) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dockItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#' },
    { id: 'projects', label: 'Projects', icon: Layers, href: '#projects' },
    { id: 'journey', label: 'Journey', icon: Award, href: '#journey' },
    { id: 'skills', label: 'Skills', icon: Wrench, href: '#skills' },
    { id: 'certifications', label: 'Certs', icon: CheckCircle2, href: '#certifications' },
    { id: 'profiles', label: 'Network', icon: Globe, href: '#profiles' },
  ];

  const handleNavClick = (href: string) => {
    sounds.playClick(700);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick navigation dock" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 animate-fadeIn">
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-surface/85 backdrop-blur-xl border border-subtle shadow-2xl ring-1 ring-border/50">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={`relative p-2 sm:p-2.5 rounded-full transition-all group focus:outline-none ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-elevated/80'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              {/* Tooltip on hover */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="w-[1px] h-5 bg-border/80 mx-1" />

        {/* Quick Theme Switcher */}
        <button
          onClick={() => {
            sounds.playClick(920);
            toggleTheme();
          }}
          className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-elevated/80 transition-all group focus:outline-none"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-sky-600 group-hover:-rotate-12 transition-transform" />
          )}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* Contact CTA in dock */}
        <button
          onClick={() => {
            sounds.playClick(850);
            onOpenContact();
          }}
          className="relative p-2 sm:p-2.5 rounded-full bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25 border border-accent-cyan/30 transition-all group focus:outline-none"
          title="Connect with Sonu"
          aria-label="Connect with Sonu"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-accent-cyan whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Let's Connect
          </span>
        </button>
      </div>
    </aside>
  );
};
