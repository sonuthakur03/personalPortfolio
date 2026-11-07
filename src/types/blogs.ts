// src/types/blogs.ts
// Domain models for Sonu Thakur's Engineering Blog

export type BlogCategory = 'architecture' | 'ai-systems' | 'security' | 'fullstack' | 'career';

export interface BlogAuthor {
  readonly name: string;
  readonly avatar: string;
  readonly role: string;
}

export interface BlogPost {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly summary: string;
  readonly content: string;
  readonly coverImage?: string;
  readonly publishedAt: string;
  readonly readTime: string;
  readonly author: BlogAuthor;
  readonly tags: readonly string[];
  readonly category: BlogCategory;
  readonly isFeatured?: boolean;
  readonly isDraft?: boolean;
}
