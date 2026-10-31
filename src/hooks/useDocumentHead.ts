// src/hooks/useDocumentHead.ts
// Dynamic SEO & Metadata Updater for Client-Side Routing
import { useEffect } from 'react';

export interface HeadMetaOptions {
  readonly title: string;
  readonly description?: string;
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
}

const DEFAULT_TITLE = 'Sonu Thakur | Full-Stack Developer';
const DEFAULT_DESC =
  "Explore Sonu Thakur's portfolio featuring full-stack development, AI-powered applications, and software projects.";
const DEFAULT_CANONICAL = 'https://sonuthakur.info.np/';
const DEFAULT_IMAGE = 'https://sonuthakur.info.np/og-image.png';

export function useDocumentHead({
  title,
  description,
  canonicalUrl,
  ogImage,
}: HeadMetaOptions): void {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    const setMeta = (nameOrProp: { name?: string; prop?: string }, content?: string) => {
      if (!content) return;
      const selector = nameOrProp.name
        ? `meta[name="${nameOrProp.name}"]`
        : `meta[property="${nameOrProp.prop}"]`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (nameOrProp.name) el.setAttribute('name', nameOrProp.name);
        if (nameOrProp.prop) el.setAttribute('property', nameOrProp.prop);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta({ name: 'description' }, description);
      setMeta({ prop: 'og:description' }, description);
      setMeta({ name: 'twitter:description' }, description);
    }

    setMeta({ prop: 'og:title' }, title);
    setMeta({ name: 'twitter:title' }, title);

    if (ogImage) {
      setMeta({ prop: 'og:image' }, ogImage);
      setMeta({ prop: 'og:image:secure_url' }, ogImage);
      setMeta({ name: 'twitter:image' }, ogImage);
    }

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalUrl && canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
      setMeta({ prop: 'og:url' }, canonicalUrl);
    }

    return () => {
      document.title = originalTitle || DEFAULT_TITLE;
      setMeta({ name: 'description' }, DEFAULT_DESC);
      setMeta({ prop: 'og:description' }, DEFAULT_DESC);
      setMeta({ name: 'twitter:description' }, DEFAULT_DESC);
      setMeta({ prop: 'og:title' }, DEFAULT_TITLE);
      setMeta({ name: 'twitter:title' }, DEFAULT_TITLE);
      setMeta({ prop: 'og:image' }, DEFAULT_IMAGE);
      setMeta({ prop: 'og:image:secure_url' }, DEFAULT_IMAGE);
      setMeta({ name: 'twitter:image' }, DEFAULT_IMAGE);
      if (canonicalEl) {
        canonicalEl.setAttribute('href', DEFAULT_CANONICAL);
        setMeta({ prop: 'og:url' }, DEFAULT_CANONICAL);
      }
    };
  }, [title, description, canonicalUrl, ogImage]);
}
