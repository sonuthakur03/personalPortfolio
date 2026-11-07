// src/pages/BlogListingPage.tsx
// Technical Writing & Engineering Blog Directory for Sonu Thakur
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Tag, BookOpen, Sparkles, Filter, X } from 'lucide-react';
import { getAllBlogPosts, getAllBlogTags } from '../utils/blogLoader';
import { BlogCard } from '../components/blog/BlogCard';
import { PullCordTheme } from '../components/common/PullCordTheme';
import { Footer } from '../components/common/Footer';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { sounds } from '../utils/soundEffects';
import type { BlogCategory } from '../types/blogs';

const CATEGORIES: { readonly id: 'all' | BlogCategory; readonly label: string }[] = [
  { id: 'all', label: 'ALL WRITINGS' },
  { id: 'architecture', label: 'SYSTEM ARCHITECTURE' },
  { id: 'ai-systems', label: 'APPLIED AI' },
  { id: 'security', label: 'APPSEC & CTF' },
  { id: 'fullstack', label: 'FULL-STACK MERN' },
];

const BlogListingPage: React.FC = () => {
  useDocumentHead({
    title: 'Blog — Engineering Notes & System Design | Sonu Thakur',
    description:
      'In-depth engineering notes, system design teardowns, applied AI architectures, and application security takeaways by Sonu Thakur.',
    canonicalUrl: 'https://sonuthakur.info.np/blog',
    ogImage: 'https://sonuthakur.info.np/og-image.png',
  });

  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const allTags = useMemo(() => getAllBlogTags(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inSummary = post.summary.toLowerCase().includes(q);
        const inTags = post.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inSummary || inTags;
      }
      return true;
    });
  }, [allPosts, selectedCategory, selectedTag, searchQuery]);

  const featuredPost = filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-[#FFE14D] selection:text-[#111111] overflow-x-hidden">
      {/* Ceiling Pull-Cord Theme Switcher */}
      <PullCordTheme />

      {/* Top Breadcrumb Navigation */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 dark:bg-[#0D0E12]/95 backdrop-blur-md border-b-[3px] border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => sounds.playClick(600)}
            className="pop-btn px-3 py-1.5 bg-white dark:bg-[#181A20] text-[#111111] dark:text-white border-2 border-[#111111] text-xs font-spaceMono font-bold shadow-brutal-sm inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-brutal-sm font-spaceMono text-xs font-bold uppercase hidden sm:inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{allPosts.length} Articles Published</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Hero Section */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6FB5] border-[3px] border-[#111111] shadow-brutal font-spaceMono text-xs font-bold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>Engineering Notes &amp; Architecture Insights</span>
          </div>

          <h1 className="font-archivoBlack uppercase text-3xl sm:text-5xl lg:text-6xl text-[#111111] dark:text-white leading-[1.05] tracking-tight mb-4">
            Technical <span className="text-[#FF6FB5]">Writings</span> &amp; Architecture.
          </h1>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
            Concrete system architecture teardowns, applied AI pipelines, transactional ledger engineering,
            and application security takeaways grounded in real production builds.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <section aria-label="Search and filters" className="mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword (e.g. ACID, Gemini, CTF)..."
              className="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal text-xs sm:text-sm font-spaceMono font-bold text-[#111111] dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFE14D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#111111] dark:hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <div className="inline-flex items-center gap-1.5 font-spaceMono text-xs font-bold text-neutral-500 uppercase mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sounds.playClick(650);
                  setSelectedCategory(cat.id);
                }}
                className={`pop-pill text-xs font-spaceMono font-bold uppercase transition-transform cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] scale-102'
                    : 'bg-white dark:bg-[#181A20] text-[#111111] dark:text-neutral-300 hover:bg-[#FFE14D] dark:hover:bg-[#FFE14D] dark:hover:text-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tag Filter Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-spaceMono text-[11px] text-neutral-500 uppercase mr-1">Filter by tag:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    sounds.playClick(600);
                    setSelectedTag(selectedTag === tag ? null : tag);
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[11px] font-spaceMono font-semibold transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#FF6FB5] text-[#111111] border-[#111111] font-bold shadow-brutal-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-[#111111]'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  <span>#{tag}</span>
                  {selectedTag === tag && <X className="w-3 h-3 ml-0.5" />}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Active Filter Clear Bar */}
        {(selectedCategory !== 'all' || selectedTag || searchQuery) && (
          <div className="mb-6 p-3 bg-[#FFE14D]/20 border-2 border-[#111111] flex items-center justify-between text-xs font-spaceMono font-bold">
            <span>
              Showing {filteredPosts.length} of {allPosts.length} articles
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="text-[#FF6FB5] underline uppercase hover:text-[#111111] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Blog Posts Display */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center border-[3px] border-[#111111] bg-white dark:bg-[#15161C] shadow-brutal-lg my-8">
            <p className="font-archivoBlack uppercase text-xl text-[#111111] dark:text-white mb-2">
              No matching articles found
            </p>
            <p className="font-spaceMono text-xs text-neutral-600 dark:text-neutral-400 mb-6">
              Try adjusting your search terms or clearing your category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="pop-btn px-4 py-2 bg-[#FFE14D] text-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Post Card (if present) */}
            {featuredPost && (
              <div>
                <BlogCard post={featuredPost} isFeatured />
              </div>
            )}

            {/* Grid of Remaining Posts */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogListingPage;
