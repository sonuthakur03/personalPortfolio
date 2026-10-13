// src/components/certifications/CertificationsSection.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initialCertificatesData } from '../../data/certificatesData';
import type { CertificateItem, CertificateCategory } from '../../types/certificates';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

type FilterCategory = 'All' | CertificateCategory;

export const CertificationsSection: React.FC = () => {
  const [certificates] = useState<CertificateItem[]>(initialCertificatesData);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  // Compute category counts
  const categories = useMemo(() => {
    const list: FilterCategory[] = ['All', 'Hackathon', 'Security', 'Academic', 'Full-Stack', 'Design', 'Workshop'];
    return list;
  }, []);

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'All') return certificates;
    return certificates.filter((c) => c.category === activeFilter);
  }, [certificates, activeFilter]);

  const selectedCert = selectedCertIndex !== null ? filteredCertificates[selectedCertIndex] : null;

  // Handle modal navigation
  const handlePrev = useCallback(() => {
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredCertificates.length - 1 : prev - 1) : null
    );
  }, [selectedCertIndex, filteredCertificates.length]);

  const handleNext = useCallback(() => {
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) =>
      prev !== null ? (prev === filteredCertificates.length - 1 ? 0 : prev + 1) : null
    );
  }, [selectedCertIndex, filteredCertificates.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCertIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCertIndex, handlePrev, handleNext]);

  // Category badge color mapper
  const getCategoryBadgeClass = (category: CertificateCategory) => {
    switch (category) {
      case 'Hackathon':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Security':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30';
      case 'Academic':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Full-Stack':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Design':
        return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30';
      case 'Workshop':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30';
      default:
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20';
    }
  };

  return (
    <section id="certifications" className="py-24 sm:py-32 relative overflow-hidden bg-background border-t border-border/40">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Learning Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground tracking-tight">
              Certifications —{' '}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Verified Credentials
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans max-w-2xl mx-auto">
              Hackathon podium finishes, CTF honors, academic distinctions, and professional training.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count = cat === 'All' ? certificates.length : certificates.filter((c) => c.category === cat).length;
            if (count === 0 && cat !== 'All') return null;
            const isActive = activeFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedCertIndex(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.35)] scale-105'
                    : 'bg-surface/60 hover:bg-surface text-muted-foreground hover:text-foreground border-border/80'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group relative rounded-2xl overflow-hidden bg-surface/80 backdrop-blur-md border border-border hover:border-purple-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_25px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(168,85,247,0.2)] flex flex-col"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setSelectedCertIndex(index)}
                className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden bg-neutral-900/40 dark:bg-black/60 border-b border-border cursor-pointer"
              >
                <CertificateGraphic cert={cert} />

                {/* Hover overlay with Quick Actions */}
                <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertIndex(index);
                    }}
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-white bg-purple-600/90 border border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-purple-500 overflow-hidden"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect Certificate</span>
                  </button>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-mono text-purple-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Verify Online</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Certificate Information */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-surface/40">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                        cert.category
                      )}`}
                    >
                      {cert.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{cert.date}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedCertIndex(index)}
                    className="font-display font-bold text-base sm:text-lg text-foreground mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs font-mono text-purple-600 dark:text-purple-400/90 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-foreground/75 dark:text-gray-300/80 font-sans leading-relaxed line-clamp-3 mb-4">
                    {cert.description}
                  </p>
                </div>

                <div>
                  {/* Skills tags */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Footer Inspect Trigger */}
                  <div className="mt-4 pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedCertIndex(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 hover:text-purple-500 font-medium transition-colors"
                    >
                      <span>Enlarge Credential</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {cert.credentialId && (
                      <span className="text-[10px] font-mono text-muted-foreground/70 truncate max-w-[120px]">
                        ID: {cert.credentialId.split('-')[0]}...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Lightbox / Modal for High-Resolution Certificate Viewing */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCertIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-surface border border-purple-500/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-elevated/70">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span
                  className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                    selectedCert.category
                  )}`}
                >
                  {selectedCert.category}
                </span>
                <h3 className="text-sm sm:text-base font-display font-bold text-foreground truncate">
                  {selectedCert.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                  {(selectedCertIndex ?? 0) + 1} of {filteredCertificates.length}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCertIndex(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area with Navigation Buttons */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[420px] max-h-[65vh] flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 overflow-hidden">
              {/* Previous Button */}
              {filteredCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 shadow-lg transition-transform hover:scale-110"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Scanned Certificate Image */}
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {/* Next Button */}
              {filteredCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 shadow-lg transition-transform hover:scale-110"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-border bg-surface/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 font-mono text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-foreground font-medium">{selectedCert.issuer}</span>
                  <span>·</span>
                  <span>{selectedCert.date}</span>
                  {selectedCert.credentialId && (
                    <>
                      <span>·</span>
                      <span className="text-purple-500 font-mono">ID: {selectedCert.credentialId}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{selectedCert.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <a
                  href={selectedCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-mono text-xs border border-border transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Image</span>
                </a>

                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-medium shadow-sm transition-colors"
                  >
                    <span>Verify Link</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Component for rendering certificate artwork preview
const CertificateGraphic: React.FC<{ cert: CertificateItem }> = ({ cert }) => {
  const [imageError, setImageError] = useState(false);

  if (cert.imageUrl && !imageError) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-black/40 p-2">
        <img
          src={cert.imageUrl}
          alt={cert.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#12131c] via-[#0d0e14] to-[#181a26]">
      <div className="absolute inset-2 rounded-lg border border-purple-500/20 pointer-events-none" />
      <div className="absolute inset-3 rounded-md border border-dashed border-white/10 pointer-events-none" />

      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 border border-white/15 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <Award className="w-6 h-6 text-purple-300" />
      </div>

      <div className="text-center z-10 px-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-purple-400 mb-1">
          {cert.issuer}
        </div>
        <div className="text-xs font-display font-semibold text-white/90 line-clamp-1">
          {cert.title}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground mt-1 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Verified Credential · {cert.date}</span>
        </div>
      </div>
    </div>
  );
};
