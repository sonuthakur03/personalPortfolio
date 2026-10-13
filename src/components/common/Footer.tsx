import React from 'react';
import { Mail, Shield, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { profile } = usePortfolioContent();

  return (
    <footer className="border-t border-border bg-surface/50 backdrop-blur-sm mt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-surface border border-subtle flex items-center justify-center font-display font-bold text-primary text-sm">
                ST
              </div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md font-sans">
              {profile.bio}
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-background border border-border text-[11px] font-mono text-accent-emerald">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-ping" />
              <span>{profile.activeStatus}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Engineering Proof
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Archify System Designs (6)
                </a>
              </li>
              <li>
                <a href="#journey" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Academic Merit &amp; Career Journey
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-accent-emerald transition-colors">
                  Technical Skills &amp; Stack
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3 text-accent-amber" />
                  <span>Admin Control Console</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Connect & Verify
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-mono">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/sonuthakur03</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>linkedin.com/in/sonuthakur03</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
              <div className="text-[11px] text-muted-foreground pt-1">
                📍 {profile.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Built with React 19, TypeScript 6, Tailwind CSS & Archify System Engine</span>
          </div>
          <div>
            © {new Date().getFullYear()} Sonu Thakur. Strict AppSec & SDLC Discipline.
          </div>
        </div>
      </div>
    </footer>
  );
};
