// src/utils/blogLoader.ts
// Build-time Blog Loader for Vite:
// Reads all markdown files and co-located images from the root /blog/ folder.

import type { BlogPost, BlogCategory, BlogAuthor } from '../types/blogs';

const DEFAULT_AUTHOR: BlogAuthor = {
  name: 'Sonu Thakur',
  avatar: '/character/sonu_avatar_badge.png',
  role: 'Full-Stack Developer & Applied AI Engineer',
};

// Vite import.meta.glob for raw markdown and images
const rawMarkdownFiles = import.meta.glob('/blog/**/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string | { default: string }>;

const imageAssets = import.meta.glob('/blog/**/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

interface ParsedFrontmatter {
  readonly title?: string;
  readonly slug?: string;
  readonly subtitle?: string;
  readonly summary?: string;
  readonly publishedAt?: string;
  readonly readTime?: string;
  readonly category?: BlogCategory;
  readonly tags?: readonly string[];
  readonly coverImage?: string;
  readonly isFeatured?: boolean;
  readonly isDraft?: boolean;
}

/**
 * Extracts and parses YAML frontmatter from raw markdown string
 */
function parseFrontmatterAndContent(raw: string): {
  frontmatter: ParsedFrontmatter;
  content: string;
} {
  const normalized = raw.replace(/\r\n/g, '\n');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = normalized.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: normalized.trim() };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, unknown> = {};

  yamlBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value === 'true') {
      frontmatter[key] = true;
    } else if (value === 'false') {
      frontmatter[key] = false;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      // Parse array e.g. ["tag1", "tag2"]
      try {
        frontmatter[key] = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        frontmatter[key] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
      }
    } else {
      frontmatter[key] = value;
    }
  });

  return { frontmatter: frontmatter as ParsedFrontmatter, content };
}

/**
 * Resolves relative image references (e.g. `./cover.png`) to Vite asset URLs
 */
function resolvePostImages(
  postDir: string,
  rawPath: string | undefined
): string | undefined {
  if (!rawPath) return undefined;
  if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('/')) {
    return rawPath;
  }

  // Clean relative path e.g. './cover.png' -> 'cover.png'
  const cleanRelative = rawPath.replace(/^\.\//, '');
  const targetKey = `${postDir}/${cleanRelative}`;

  return imageAssets[targetKey] || rawPath;
}

/**
 * Replaces Markdown image syntax ![alt](./image.png) with resolved Vite asset URLs
 */
function resolveMarkdownImages(postDir: string, markdownContent: string): string {
  return markdownContent.replace(
    /!\[(.*?)\]\((\.\/[^)]+)\)/g,
    (_match, altText: string, relPath: string) => {
      const cleanRel = relPath.replace(/^\.\//, '');
      const key = `${postDir}/${cleanRel}`;
      const resolved = imageAssets[key] || relPath;
      return `![${altText}](${resolved})`;
    }
  );
}

/**
 * Calculates estimated read time from word count
 */
function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Loads and parses all blog posts from the root /blog/ folder
 */
export function getAllBlogPosts(): readonly BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filePath, rawContent] of Object.entries(rawMarkdownFiles)) {
    // Derive directory path e.g. '/blog/designing-acid-compliant-ledger'
    const parts = filePath.split('/');
    parts.pop(); // Remove file name (index.md or post.md)
    const postDir = parts.join('/');
    const defaultSlug = parts[parts.length - 1] || 'untitled-post';

    const rawString =
      typeof rawContent === 'string'
        ? rawContent
        : (rawContent as { default?: string })?.default || '';
    const { frontmatter, content } = parseFrontmatterAndContent(rawString);

    // Skip drafts in production
    const isProduction = Boolean(import.meta.env.PROD);
    if (isProduction && frontmatter.isDraft) {
      continue;
    }

    const slug = frontmatter.slug || defaultSlug;
    const title = frontmatter.title || slug.replace(/-/g, ' ').toUpperCase();
    const summary = frontmatter.summary || content.slice(0, 160).replace(/[#*`_]/g, '') + '...';
    const publishedAt = frontmatter.publishedAt || new Date().toISOString().split('T')[0];
    const readTime = frontmatter.readTime || calculateReadTime(content);
    const category: BlogCategory = frontmatter.category || 'fullstack';
    const tags = frontmatter.tags || ['Engineering'];
    const coverImage = resolvePostImages(postDir, frontmatter.coverImage);
    const resolvedContent = resolveMarkdownImages(postDir, content);

    posts.push({
      id: `blog-${slug}`,
      slug,
      title,
      subtitle: frontmatter.subtitle,
      summary,
      content: resolvedContent,
      coverImage,
      publishedAt,
      readTime,
      author: DEFAULT_AUTHOR,
      tags,
      category,
      isFeatured: frontmatter.isFeatured ?? false,
      isDraft: frontmatter.isDraft ?? false,
    });
  }

  // Sort descending by publication date
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Look up a single blog post by its URL slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Gets all unique tags across all published blog posts
 */
export function getAllBlogTags(): readonly string[] {
  const posts = getAllBlogPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}
