// src/pages/BlogDetailPage.tsx
// Dedicated Deep-Dive Reading Page for Sonu Thakur's Technical Articles
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Check,
  Calendar,
  Clock,
  Tag,
  AlertTriangle,
  FileText,
  Bookmark,
} from 'lucide-react';
import { getAllBlogPosts } from '../utils/blogLoader';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { ScrollProgressBar } from '../components/common/ScrollProgressBar';
import { PullCordTheme } from '../components/common/PullCordTheme';
import { Footer } from '../components/common/Footer';
import { GithubIcon, LinkedinIcon } from '../components/common/BrandIcons';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { STANDARD_RESUME_URL, DEFAULT_GITHUB, DEFAULT_LINKEDIN } from '../data/profileData';
import { sounds } from '../utils/soundEffects';
import type { BlogPost, BlogCategory } from '../types/blogs';

const CATEGORY_THEMES: Record<BlogCategory, { bg: string; text: string; label: string }> = {
  architecture: { bg: 'bg-[#FFE14D]', text: 'text-[#111111]', label: 'SYSTEM ARCHITECTURE' },
  'ai-systems': { bg: 'bg-[#FF6FB5]', text: 'text-[#111111]', label: 'APPLIED AI' },
  security: { bg: 'bg-[#7DFFA6]', text: 'text-[#111111]', label: 'APPSEC & CTF' },
  fullstack: { bg: 'bg-[#7C9BFF]', text: 'text-[#111111]', label: 'FULL-STACK MERN' },
  career: { bg: 'bg-[#C4B5FD]', text: 'text-[#111111]', label: 'ENGINEERING CAREER' },
};

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const post: BlogPost | undefined = allPosts[currentIndex];

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  useDocumentHead({
    title: post ? `${post.title} | Sonu Thakur` : 'Article Not Found | Sonu Thakur',
    description: post?.summary,
    canonicalUrl: post ? `https://sonuthakur.info.np/blog/${post.slug}` : undefined,
    ogImage: post?.coverImage || 'https://sonuthakur.info.np/og-image.png',
  });

  // Safely inject Schema.org BlogPosting without dangerouslySetInnerHTML
  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-posting-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      url: `https://sonuthakur.info.np/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: 'https://sonuthakur.info.np',
      },
      publisher: {
        '@type': 'Person',
        name: 'Sonu Thakur',
        url: 'https://sonuthakur.info.np',
      },
      image: post.coverImage || 'https://sonuthakur.info.np/og-image.png',
      keywords: post.tags.join(', '),
    });
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('blog-posting-schema');
      if (existing) {
        existing.remove();
      }
    };
  }, [post]);

  const handleShare = async () => {
    sounds.playClick(880);
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.summary,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // If article not found
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal-xl">
          <div className="inline-block p-4 bg-[#FF6FB5] border-2 border-[#111111] shadow-brutal mb-4">
            <AlertTriangle className="w-8 h-8 text-[#111111]" />
          </div>
          <h1 className="font-archivoBlack text-2xl uppercase mb-2">Article Not Found</h1>
          <p className="font-spaceMono text-sm text-neutral-600 dark:text-neutral-300 mb-6">
            The requested engineering article could not be located in the repository.
          </p>
          <Link
            to="/blog"
            className="pop-btn px-5 py-2.5 bg-[#FFE14D] text-[#111111] font-spaceMono font-bold text-xs uppercase shadow-brutal inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Blog Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const theme = CATEGORY_THEMES[post.category] || CATEGORY_THEMES.fullstack;

  // Extract table of contents headers from markdown
  const headings = post.content
    .split('\n')
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const isH3 = line.startsWith('### ');
      const text = line.replace(/^#{2,3}\s+/, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return { text, id, isH3 };
    });

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-[#FFE14D] selection:text-[#111111] overflow-x-hidden pb-24">
      {/* Ceiling Pull-Cord Theme Switcher */}
      <PullCordTheme />

      {/* Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Top Header / Breadcrumbs Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 dark:bg-[#0D0E12]/95 backdrop-blur-md border-b-[3px] border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              onClick={() => sounds.playClick(600)}
              className="pop-btn px-3 py-1.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Articles</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <span className="text-neutral-400 dark:text-neutral-600 font-spaceMono text-xs hidden sm:inline">/</span>

            <span className="font-spaceMono text-xs font-bold uppercase truncate max-w-[180px] sm:max-w-xs text-[#111111] dark:text-white">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="pop-btn px-2.5 py-1.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm inline-flex items-center gap-1"
              title="Share Article"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#17A34A]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Post Metadata Header */}
        <header className="mb-10 pb-8 border-b-[3px] border-[#111111]">
          {/* Category & Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 ${theme.bg} ${theme.text} border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal-sm`}
            >
              {theme.label}
            </span>

            <div className="flex items-center gap-3 text-xs font-spaceMono text-neutral-600 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishedAt}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-archivoBlack uppercase text-2xl sm:text-4xl md:text-5xl text-[#111111] dark:text-white leading-[1.08] tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Subtitle / Summary Lead */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed mb-6">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 border border-[#111111] text-xs font-spaceMono font-bold text-neutral-800 dark:text-neutral-200"
              >
                <Tag className="w-3 h-3 opacity-60" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>

          {/* Author Card */}
          <div className="p-4 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-[#111111] object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5 font-archivoBlack uppercase text-sm sm:text-base text-[#111111] dark:text-white">
                  <span>{post.author.name}</span>
                  <span className="px-1.5 py-0.2 bg-[#FFE14D] text-[#111111] text-[9px] font-spaceMono font-bold rounded">
                    AUTHOR
                  </span>
                </div>
                <p className="font-spaceMono text-xs text-neutral-600 dark:text-neutral-400">
                  {post.author.role} · Tribhuvan University BCA Rank 1
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={DEFAULT_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-[#111111] bg-white dark:bg-neutral-800 hover:bg-[#FFE14D] transition-colors shadow-brutal-sm"
                title="Sonu Thakur GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={DEFAULT_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-[#111111] bg-white dark:bg-neutral-800 hover:bg-[#7C9BFF] transition-colors shadow-brutal-sm"
                title="Sonu Thakur LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Cover Image (if available) */}
        {post.coverImage && (
          <div className="mb-10 border-[3px] border-[#111111] shadow-brutal-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Table of Contents (if 2 or more headings exist) */}
        {headings.length >= 2 && (
          <aside className="mb-10 p-5 bg-[#FFE14D]/10 dark:bg-neutral-900 border-[3px] border-[#111111] shadow-brutal">
            <div className="flex items-center gap-2 font-spaceMono text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-white mb-3">
              <Bookmark className="w-3.5 h-3.5 text-[#FF6FB5]" />
              <span>Table of Contents</span>
            </div>
            <nav className="space-y-1.5">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#${h.id}`}
                  className={`block text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 hover:text-[#111111] dark:hover:text-[#FFE14D] hover:underline transition-colors ${
                    h.isH3 ? 'pl-4 text-xs opacity-90' : 'font-semibold'
                  }`}
                >
                  ✦ {h.text}
                </a>
              ))}
            </nav>
          </aside>
        )}

        {/* Rendered Markdown Article Body */}
        <div className="prose-container">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Author Bio Box */}
        <section
          aria-label="Author Profile"
          className="mt-14 p-6 sm:p-8 bg-[#FFE14D] border-[3px] border-[#111111] shadow-brutal text-[#111111]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full border-[3px] border-[#111111] object-cover bg-white shrink-0"
              />
              <div>
                <h3 className="font-archivoBlack uppercase text-lg sm:text-xl">
                  Written by {post.author.name}
                </h3>
                <p className="font-spaceMono text-xs font-semibold leading-relaxed max-w-lg mt-1">
                  Full-Stack MERN Developer specializing in ACID-compliant backends, Applied AI pipelines, and AppSec.
                  1st Place Winner at IdeaX Hackathon 2026 and Tribhuvan University BCA Rank 1 Topper.
                </p>
              </div>
            </div>

            <a
              href={STANDARD_RESUME_URL}
              download="Sonu_Thakur_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pop-btn px-4 py-2 bg-white text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal-sm inline-flex items-center gap-1.5 shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </section>

        {/* Previous & Next Article Navigation */}
        <nav aria-label="Adjacent Articles" className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              type="button"
              onClick={() => {
                sounds.playClick(700);
                navigate(`/blog/${prevPost.slug}`);
              }}
              className="text-left p-4 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <span className="font-spaceMono text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                ← Previous Article
              </span>
              <p className="font-archivoBlack uppercase text-sm sm:text-base text-[#111111] dark:text-white line-clamp-1">
                {prevPost.title}
              </p>
            </button>
          ) : (
            <div />
          )}

          {nextPost && (
            <button
              type="button"
              onClick={() => {
                sounds.playClick(750);
                navigate(`/blog/${nextPost.slug}`);
              }}
              className="text-right p-4 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal hover:-translate-y-1 transition-transform cursor-pointer sm:col-start-2"
            >
              <span className="font-spaceMono text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                Next Article →
              </span>
              <p className="font-archivoBlack uppercase text-sm sm:text-base text-[#111111] dark:text-white line-clamp-1">
                {nextPost.title}
              </p>
            </button>
          )}
        </nav>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
