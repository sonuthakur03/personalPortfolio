// src/__tests__/blog.test.ts
import { describe, it, expect } from 'vitest';
import { getAllBlogPosts, getBlogPostBySlug, getAllBlogTags } from '../utils/blogLoader';

describe('Blog System & Loader', () => {
  it('loads all markdown blog posts from the root /blog/ folder', () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBeGreaterThanOrEqual(3);

    posts.forEach((post) => {
      expect(post.id).toBeDefined();
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.summary).toBeTruthy();
      expect(post.content).toBeTruthy();
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readTime).toMatch(/\d+\s+min read/);
      expect(post.author.name).toBe('Sonu Thakur');
      expect(post.tags.length).toBeGreaterThan(0);
    });
  });

  it('guarantees unique slugs across all blog posts', () => {
    const posts = getAllBlogPosts();
    const slugs = posts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it('correctly finds posts by slug and handles non-existent slugs', () => {
    const acidPost = getBlogPostBySlug('designing-acid-compliant-ledger');
    expect(acidPost).toBeDefined();
    expect(acidPost?.title).toContain('ACID');
    expect(acidPost?.category).toBe('architecture');

    const nonExistent = getBlogPostBySlug('non-existent-blog-slug-123');
    expect(nonExistent).toBeUndefined();
  });

  it('collects unique tags across all published articles', () => {
    const tags = getAllBlogTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(tags).toContain('MongoDB');
    expect(tags).toContain('Security');
  });
});
