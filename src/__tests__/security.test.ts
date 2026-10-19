import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Security & Defense-in-Depth Protocol', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const srcDir = path.resolve(rootDir, 'src');

  // Helper to recursively collect files
  function getFiles(dir: string, ext: string[]): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(fullPath, ext));
      } else if (ext.some((e) => file.endsWith(e))) {
        results.push(fullPath);
      }
    }
    return results;
  }

  it('enforces strict Content Security Policy (CSP) in index.html', () => {
    const indexPath = path.join(rootDir, 'index.html');
    const indexHtml = fs.readFileSync(indexPath, 'utf-8');

    expect(indexHtml).toContain('http-equiv="Content-Security-Policy"');
    expect(indexHtml).toContain("object-src 'none'");
    expect(indexHtml).toContain("base-uri 'self'");
    expect(indexHtml).toContain("default-src 'self'");
  });

  it('rejects any usage of dangerouslySetInnerHTML across all source code', () => {
    const sourceFiles = getFiles(srcDir, ['.ts', '.tsx']);
    const violations: string[] = [];
    const jsxAttrRegex = /dangerouslySetInnerHTML\s*=/;

    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (jsxAttrRegex.test(content)) {
        violations.push(path.relative(rootDir, filePath));
      }
    }

    expect(violations).toEqual([]);
  });

  it('enforces rel="noopener noreferrer" on all external target="_blank" links', () => {
    const componentFiles = getFiles(path.join(srcDir, 'components'), ['.tsx']);
    const linkRegex = /<a[^>]*target=["']_blank["'][^>]*>/g;
    const violations: string[] = [];

    for (const filePath of componentFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(linkRegex);
      if (matches) {
        for (const tag of matches) {
          if (!tag.includes('rel="noopener noreferrer"') && !tag.includes("rel='noopener noreferrer'")) {
            violations.push(`${path.relative(rootDir, filePath)}: ${tag}`);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('verifies zero private API keys or .env credentials are baked into client source', () => {
    const sourceFiles = getFiles(srcDir, ['.ts', '.tsx']);
    const sensitivePatterns = [
      /AIzaSy[A-Za-z0-9_-]{33}/, // Google API key pattern
      /sk-[A-Za-z0-9]{32,}/, // OpenAI key pattern
      /ghp_[A-Za-z0-9]{36}/, // GitHub personal access token
    ];

    const leaks: string[] = [];

    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      for (const pattern of sensitivePatterns) {
        if (pattern.test(content)) {
          leaks.push(`${path.relative(rootDir, filePath)} matches pattern ${pattern.source}`);
        }
      }
    }

    expect(leaks).toEqual([]);
  });
});
