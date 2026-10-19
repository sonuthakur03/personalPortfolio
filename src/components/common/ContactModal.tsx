// src/components/common/ContactModal.tsx
// Pop Brutalist Interactive Contact & Inquiry Modal:
// - Heavy 3px solid black borders, shadow-brutal-xl (10px 10px 0 #111)
// - Yellow (#FFE14D) pop backdrop with crisp white & dark paper containers
// - High-contrast tactile inputs and pink (#FF6FB5) action button
// - 1-Click direct email copy with instant audio feedback
// - Kathmandu UTC+5:45 timezone indicator

import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, MapPin, FileText } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { useModalDismiss } from '../../hooks/useModalDismiss';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import {
  DEFAULT_EMAIL,
  DEFAULT_GITHUB,
  DEFAULT_LINKEDIN,
  DEFAULT_INSTAGRAM,
  STANDARD_RESUME_URL,
} from '../../data/profileData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { profile } = usePortfolioContent();
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useModalDismiss({ isOpen, onClose });

  if (!isOpen) return null;

  const email = profile?.email || DEFAULT_EMAIL;
  const github = profile?.github || DEFAULT_GITHUB;
  const linkedin = profile?.linkedin || DEFAULT_LINKEDIN;
  const instagram = profile?.instagram || DEFAULT_INSTAGRAM;
  const resumeUrl = profile?.resumeUrl || STANDARD_RESUME_URL;

  const handleCopy = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject || `Engineering Inquiry from ${name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Hello Sonu,\n\n${message}\n\nBest regards,\n${name}`
    )}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FFE14D] dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl p-6 sm:p-8 space-y-6 text-[#111111] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] font-spaceMono font-bold text-xs uppercase mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#17A34A] border border-[#111111]" />
              <span>Available for 2026 Roles</span>
            </div>
            <h2 className="font-archivoBlack uppercase text-3xl sm:text-4xl text-[#111111] dark:text-white tracking-tight leading-none">
              Get in Touch
            </h2>
            <p className="text-sm font-archivo font-medium text-[#111111]/85 dark:text-zinc-300 mt-2">
              Full-stack MERN, applied AI pipelines (Gemini SDK), and transactional systems.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 bg-white text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:bg-[#FF6FB5] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Email Card with 1-Click Copy */}
        <div className="p-4 bg-white dark:bg-[#1e202c] border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 bg-[#7C9BFF] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="block text-[10px] font-spaceMono font-bold text-zinc-500 uppercase tracking-wider">
                Direct Inbox
              </span>
              <span className="block font-spaceMono text-xs sm:text-sm text-[#111111] dark:text-white font-bold truncate select-all">
                {email}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[4px_4px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none text-xs font-spaceMono font-bold uppercase transition-all cursor-pointer shrink-0"
            title="Copy Email Address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Message Composer */}
        <form onSubmit={handleSubmit} className="space-y-3.5 font-spaceMono text-xs">
          <div>
            <label className="block text-[#111111] dark:text-zinc-300 font-bold mb-1 text-xs uppercase">
              Your Name / Team
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Mercer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-[#111111] shadow-[2px_2px_0_#111111] focus:shadow-[4px_4px_0_#FF6FB5] text-[#111111] dark:text-white font-spaceMono text-sm focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#111111] dark:text-zinc-300 font-bold mb-1 text-xs uppercase">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Full-Stack / Applied AI Role Inquiry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-[#111111] shadow-[2px_2px_0_#111111] focus:shadow-[4px_4px_0_#FF6FB5] text-[#111111] dark:text-white font-spaceMono text-sm focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#111111] dark:text-zinc-300 font-bold mb-1 text-xs uppercase">
              Message
            </label>
            <textarea
              rows={3}
              required
              placeholder="Hi Sonu, I reviewed your selected works and BugV CTF defense writeup..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-[#111111] shadow-[2px_2px_0_#111111] focus:shadow-[4px_4px_0_#FF6FB5] text-[#111111] dark:text-white font-spaceMono text-sm focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FF6FB5] hover:bg-[#ff55a6] text-[#111111] font-archivoBlack uppercase text-sm border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] hover:shadow-[7px_7px_0_#111111] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Launch Email Client</span>
          </button>
        </form>

        {/* Quick CV Download Option */}
        <div className="p-3 bg-white dark:bg-[#1e202c] border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center justify-between gap-3 text-xs font-spaceMono">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="w-4 h-4 text-[#111111] dark:text-[#FFE14D] shrink-0" />
            <span className="font-bold text-[#111111] dark:text-zinc-200 truncate">
              Need full resume first?
            </span>
          </div>
          <a
            href={resumeUrl}
            download="Sonu_Thakur_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick(750)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:shadow-[3px_3px_0_#111111] hover:-translate-y-0.5 active:translate-y-0.5 font-bold uppercase text-[11px] shrink-0 transition-all cursor-pointer"
          >
            <span>Download CV</span>
            <span>↗</span>
          </a>
        </div>

        {/* Geolocation & Socials */}
        <div className="pt-3 border-t-2 border-[#111111]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-spaceMono font-bold text-[#111111] dark:text-zinc-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF6FB5]" />
            <span>Kathmandu, Nepal (NPT / UTC+5:45)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 hover:text-[#FF6FB5] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 hover:text-[#FF6FB5] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 hover:text-[#FF6FB5] transition-colors"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
