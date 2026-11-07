// src/components/blog/BlogCard.tsx
// Pop Brutalist Blog Card component for the /blog directory
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import type { BlogPost, BlogCategory } from '../../types/blogs';
import { sounds } from '../../utils/soundEffects';

interface BlogCardProps {
  readonly post: BlogPost;
  readonly isFeatured?: boolean;
}

const CATEGORY_THEMES: Record<BlogCategory, { bg: string; text: string; label: string }> = {
  architecture: { bg: 'bg-[#FFE14D]', text: 'text-[#111111]', label: 'SYSTEM ARCHITECTURE' },
  'ai-systems': { bg: 'bg-[#FF6FB5]', text: 'text-[#111111]', label: 'APPLIED AI' },
  security: { bg: 'bg-[#7DFFA6]', text: 'text-[#111111]', label: 'APPSEC & CTF' },
  fullstack: { bg: 'bg-[#7C9BFF]', text: 'text-[#111111]', label: 'FULL-STACK MERN' },
  career: { bg: 'bg-[#C4B5FD]', text: 'text-[#111111]', label: 'ENGINEERING CAREER' },
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
  const theme = CATEGORY_THEMES[post.category] || CATEGORY_THEMES.fullstack;

  return (
    <article
      className={`group relative flex flex-col justify-between bg-white dark:bg-[#15161C] border-[3px] border-[#111111] shadow-brutal transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-xl ${
        isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div>
        {/* Cover Image (if available) */}
        {post.coverImage && (
          <div className="relative aspect-[16/8] w-full overflow-hidden border-b-[3px] border-[#111111] bg-neutral-100 dark:bg-neutral-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              loading="lazy"
            />
            {isFeatured && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#FF6FB5] text-[#111111] font-spaceMono font-bold text-xs uppercase border-2 border-[#111111] shadow-brutal-sm">
                ✦ Featured Story
              </span>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6 lg:p-7">
          {/* Metadata Row: Category & Read Time */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
            <span
              className={`px-2.5 py-1 ${theme.bg} ${theme.text} border-2 border-[#111111] font-spaceMono text-[10px] sm:text-xs font-bold uppercase shadow-brutal-sm`}
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
          <h3 className="font-archivoBlack uppercase text-lg sm:text-xl md:text-2xl text-[#111111] dark:text-white leading-tight mb-2.5 group-hover:text-[#FF6FB5] transition-colors">
            <Link
              to={`/blog/${post.slug}`}
              onClick={() => sounds.playClick(700)}
              className="focus:outline-none"
            >
              {post.title}
            </Link>
          </h3>

          {/* Subtitle / Summary */}
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4 font-normal">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 border border-[#111111] text-[10px] font-spaceMono font-semibold text-neutral-700 dark:text-neutral-300"
              >
                <Tag className="w-2.5 h-2.5 opacity-60" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 pt-2 border-t border-[#111111]/20 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-6 h-6 rounded-full border border-[#111111] object-cover"
          />
          <span className="font-spaceMono text-xs font-bold text-[#111111] dark:text-neutral-200">
            {post.author.name}
          </span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          onClick={() => sounds.playClick(800)}
          className="pop-btn px-3.5 py-1.5 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] font-spaceMono text-xs font-bold uppercase shadow-brutal-sm inline-flex items-center gap-1.5 hover:bg-[#FFD700]"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
