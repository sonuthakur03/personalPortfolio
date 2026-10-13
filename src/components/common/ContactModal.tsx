// src/components/common/ContactModal.tsx
// Minimalist pure-black contact dialog matching adithyakrishnan.com aesthetic

import React, { useState, useEffect } from 'react';
import { X, Mail, Copy, Check, Send, MapPin } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const email = 'sonuthakur9824@gmail.com';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-white/15 p-6 sm:p-8 space-y-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>Available for Roles · Kathmandu, Nepal</span>
            </div>
            <h2 className="font-display font-light text-2xl text-white">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-400 mt-1 font-light">
              Reach out for full-stack engineering, applied AI pipelines, or technical collaboration.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Email Card with 1-Click Copy */}
        <div className="p-4 border border-white/10 bg-black flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 border border-white/10 text-zinc-300 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                DIRECT INBOX
              </span>
              <span className="block font-mono text-xs sm:text-sm text-white font-medium truncate select-all">
                {email}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white text-xs font-mono text-white transition-colors cursor-pointer"
            title="Copy Email Address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Message Composer */}
        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          <div>
            <label className="block text-zinc-400 mb-1 text-[11px]">Your Name / Team</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Mercer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white font-mono focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 text-[11px]">Subject</label>
            <input
              type="text"
              required
              placeholder="e.g. Full-Stack / Applied AI Role Inquiry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white font-mono focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 text-[11px]">Message</label>
            <textarea
              rows={3}
              required
              placeholder="Hi Sonu, I reviewed your selected works and BugV CTF defense writeup..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 bg-black border border-white/10 text-white font-mono focus:outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-white text-black font-mono font-medium text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Launch Email Client</span>
          </button>
        </form>

        {/* Geolocation & Socials */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>Kathmandu, Nepal (NPT / UTC+5:45)</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/sonuthakur03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/sonuthakur03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
