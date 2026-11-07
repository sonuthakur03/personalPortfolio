// src/components/blog/MarkdownRenderer.tsx
// Lightweight, safe, zero-dependency Markdown parser with Pop Brutalist styling.
// Handles headers, code blocks with copy buttons, GitHub alerts, tables, lists, and images.

import React, { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, ShieldAlert, Lightbulb } from 'lucide-react';

interface MarkdownRendererProps {
  readonly content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Split markdown into logical blocks: code fences, tables, blockquotes, headers, lists, paragraphs
  const renderBlocks = () => {
    const lines = content.replace(/\r\n/g, '\n').split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let codeBlockCounter = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // 1. Code Fence (```lang ... ```)
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3).trim() || 'text';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        const rawCode = codeLines.join('\n');
        const codeIndex = codeBlockCounter++;
        const isCopied = copiedCodeIndex === codeIndex;

        elements.push(
          <div
            key={`code-${codeIndex}`}
            className="my-6 border-[3px] border-[#111111] shadow-brutal bg-[#111111] text-neutral-100 overflow-hidden"
          >
            {/* Code Block Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1A1C23] border-b-[2px] border-neutral-700 text-xs font-spaceMono font-bold">
              <span className="uppercase text-[#FFE14D] tracking-wider">{lang}</span>
              <button
                type="button"
                onClick={() => handleCopyCode(rawCode, codeIndex)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 rounded text-xs transition-colors cursor-pointer"
                title="Copy code"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#17A34A]" />
                    <span className="text-[#17A34A]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {/* Code Text */}
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
              <code>{rawCode}</code>
            </pre>
          </div>
        );
        continue;
      }

      // 2. Headings (#, ##, ###, ####)
      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const headingText = headingMatch[2].trim();
        const anchorId = headingText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        if (level === 1) {
          elements.push(
            <h1
              key={`h1-${i}`}
              id={anchorId}
              className="font-archivoBlack uppercase text-2xl sm:text-3xl md:text-4xl text-[#111111] dark:text-white mt-10 mb-4 pb-2 border-b-[3px] border-[#111111] dark:border-neutral-700 tracking-tight"
            >
              <a href={`#${anchorId}`} className="hover:underline">
                {headingText}
              </a>
            </h1>
          );
        } else if (level === 2) {
          elements.push(
            <h2
              key={`h2-${i}`}
              id={anchorId}
              className="font-archivoBlack uppercase text-xl sm:text-2xl md:text-3xl text-[#111111] dark:text-white mt-8 mb-3.5 pb-1.5 border-b-2 border-[#111111]/30 dark:border-neutral-700 tracking-tight"
            >
              <a href={`#${anchorId}`} className="hover:underline">
                {headingText}
              </a>
            </h2>
          );
        } else if (level === 3) {
          elements.push(
            <h3
              key={`h3-${i}`}
              id={anchorId}
              className="font-archivoBlack uppercase text-lg sm:text-xl text-[#111111] dark:text-white mt-6 mb-2.5 tracking-tight"
            >
              <a href={`#${anchorId}`} className="hover:underline">
                {headingText}
              </a>
            </h3>
          );
        } else {
          elements.push(
            <h4
              key={`h4-${i}`}
              id={anchorId}
              className="font-archivo text-base sm:text-lg font-bold uppercase text-[#111111] dark:text-white mt-5 mb-2"
            >
              {headingText}
            </h4>
          );
        }
        i++;
        continue;
      }

      // 3. Blockquotes & GitHub Alerts (> [!NOTE], > [!TIP], > [!WARNING], > [!SECURITY])
      if (line.trim().startsWith('>')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        const firstLine = quoteLines[0] || '';
        const alertMatch = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|SECURITY)\]/i);

        if (alertMatch) {
          const type = alertMatch[1].toUpperCase();
          const alertBody = [firstLine.replace(/^\[!.*?\]\s?/, ''), ...quoteLines.slice(1)].join('\n').trim();

          const alertStyles: Record<string, { bg: string; border: string; icon: React.ReactNode; label: string }> = {
            NOTE: {
              bg: 'bg-blue-50 dark:bg-blue-950/30',
              border: 'border-blue-500',
              icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
              label: 'NOTE',
            },
            TIP: {
              bg: 'bg-emerald-50 dark:bg-emerald-950/30',
              border: 'border-emerald-500',
              icon: <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
              label: 'TIP',
            },
            WARNING: {
              bg: 'bg-amber-50 dark:bg-amber-950/30',
              border: 'border-amber-500',
              icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
              label: 'WARNING',
            },
            SECURITY: {
              bg: 'bg-rose-50 dark:bg-rose-950/30',
              border: 'border-rose-500',
              icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
              label: 'SECURITY PROTOCOL',
            },
          };

          const config = alertStyles[type] || alertStyles.NOTE;

          elements.push(
            <div
              key={`alert-${i}`}
              className={`my-5 p-4 border-[3px] border-[#111111] shadow-brutal ${config.bg} flex gap-3.5 items-start`}
            >
              <div className="shrink-0 pt-0.5">{config.icon}</div>
              <div className="flex-1">
                <span className="font-spaceMono text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  {config.label}
                </span>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                  {renderInlineFormatting(alertBody)}
                </p>
              </div>
            </div>
          );
        } else {
          // Standard Brutalist Blockquote
          elements.push(
            <blockquote
              key={`quote-${i}`}
              className="my-5 p-4 bg-[#FFE14D]/15 dark:bg-[#FFE14D]/5 border-l-[6px] border-[#FFE14D] border-y-[2px] border-r-[2px] border-[#111111] dark:border-neutral-700 text-sm sm:text-base italic font-serif leading-relaxed"
            >
              {renderInlineFormatting(quoteLines.join(' '))}
            </blockquote>
          );
        }
        continue;
      }

      // 4. Unordered Lists (- or *)
      if (line.trim().match(/^[-*]\s+/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].trim().match(/^[-*]\s+/)) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2 pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-base leading-relaxed">
                <span className="inline-block w-2 h-2 bg-[#FFE14D] border border-[#111111] shrink-0 mt-2 shadow-brutal-sm" />
                <span>{renderInlineFormatting(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // 5. Ordered Lists (1., 2., 3.)
      if (line.trim().match(/^\d+\.\s+/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-4 space-y-2 pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm md:text-base leading-relaxed">
                <span className="font-spaceMono text-xs font-bold px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 border border-[#111111] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{renderInlineFormatting(item)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // 6. Standalone Image (![alt](url))
      const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <figure key={`img-${i}`} className="my-6">
            <div className="border-[3px] border-[#111111] shadow-brutal overflow-hidden bg-white dark:bg-neutral-900">
              <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[500px]" loading="lazy" />
            </div>
            {alt && (
              <figcaption className="mt-2 text-center font-spaceMono text-xs text-neutral-500 dark:text-neutral-400">
                ✦ {alt}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }

      // 7. Regular Paragraph
      elements.push(
        <p key={`p-${i}`} className="my-3.5 text-xs sm:text-sm md:text-base leading-relaxed font-normal text-neutral-800 dark:text-neutral-200">
          {renderInlineFormatting(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  // Helper for inline markdown: bold (**), italic (*), inline code (`), and links ([text](url))
  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Regex splits text by links, code spans, bold, and italic
    const parts = text.split(/(`[^`]+`|!\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      // Code span
      if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
        return (
          <code
            key={index}
            className="font-mono bg-neutral-200 dark:bg-neutral-800 text-[#111111] dark:text-[#FFE14D] px-1.5 py-0.5 border border-[#111111]/40 dark:border-neutral-700 text-xs sm:text-sm font-semibold rounded mx-0.5"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Bold
      if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
        return <strong key={index} className="font-bold text-[#111111] dark:text-white">{part.slice(2, -2)}</strong>;
      }

      // Italic
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={index} className="italic">{part.slice(1, -1)}</em>;
      }

      // Links: [label](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];
        const isExternal = linkUrl.startsWith('http');
        return (
          <a
            key={index}
            href={linkUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-[#111111] dark:text-[#FFE14D] underline decoration-2 decoration-[#FF6FB5] underline-offset-2 font-semibold hover:bg-[#FFE14D] hover:text-[#111111] transition-colors"
          >
            {linkText}
          </a>
        );
      }

      return part;
    });
  };

  return <article className="blog-content font-archivo max-w-none">{renderBlocks()}</article>;
};
