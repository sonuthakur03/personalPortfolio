# AGENTS.md - Developer & AI Agent Operating Instructions

This document governs the rules, architectural principles, coding standards, and development workflows for any human developer or AI agent (Antigravity, Claude, Cursor) working in the **Sonu Thakur Personal Portfolio** repository.

---

## 1. Project Identity

### What This Project Is
**Sonu Thakur Personal Portfolio** is an elite, interactive engineering portfolio and technical case-study showcase designed to demonstrate mastery across **Full-Stack Engineering (MERN)**, **Applied AI Systems (Gemini AI SDK, VOC pipelines)**, **Application Security (BugV CTF 3rd place, OWASP defense)**, and **Software Development Life Cycle (SDLC)** discipline.

### What This Project Is Not
* **NOT a generic template or cookie-cutter resume site:** Avoid superficial cards with static text. Every project must feature concrete architectural diagrams, security assessments, and engineering trade-offs.
* **NOT an insecure AI wrapper:** Never bake private LLM API keys into client-side bundles. Any live AI counterpart must use backend proxies or deterministic sandbox mocks.
* **NOT an unmaintained monolith:** Avoid unnecessary heavy external libraries. Code must remain clean, modular, strictly typed, and performant.

---

## 2. Architectural Principles

1. **Unidirectional Data Flow & Type Safety:** All portfolio data (projects, skills, CTF achievements, AI concepts) must be defined as strongly-typed, immutable TypeScript structures in `src/data/` and `src/types/`.
2. **Visual-First System Design with Archify:** Every major architectural case study must be accompanied by an interactive SVG/HTML diagram generated using the `.agents/skills/archify` toolset.
3. **Defense in Depth (Security-First):** Treat all external links, user-supplied queries, and potential inputs as untrusted. Enforce strict CSP compliance, XSS prevention, and secure external link attributes (`rel="noopener noreferrer"`).
4. **Modularity & Separation of Concerns:**
   * `src/components/ui/`: Reusable, accessible primitive UI components.
   * `src/components/case-studies/`: Deep-dive architectural and security case study modals.
   * `src/pages/`: Route-level container components.
   * `src/data/`: Centralized domain models and structured case-study content.
   * `src/router/`: Central routing definitions.

---

## 3. Coding Standards

* **Language & Runtime:** TypeScript 6.0+ with React 19 on Vite 8.
* **Strict Type Safety:** `strict: true` in `tsconfig.json`. Zero use of `any`. Explicit interfaces/types for props, state, and domain models.
* **Styling:** Tailwind CSS v3 using defined theme tokens (CSS variables in `src/index.css` for both light and dark mode). Avoid ad-hoc inline styles.
* **Component Architecture:** Functional components with React hooks. Keep components focused, pure, and reusable.
* **Linting & Code Health:** Strict ESLint compliance (`npm run lint`). Code must build cleanly (`npm run build`) with zero TypeScript errors.
* **File Links:** Always reference files using forward-slash markdown links (e.g., `[HomePage.tsx](file:///e:/codes/PersonalPortfolio/src/pages/HomePage.tsx)`).

---

## 4. Security Protocols

1. **Zero Secret Leaks:** Never commit `.env` files, API keys, private tokens, or sensitive credentials. All secrets belong in server-side edge environments.
2. **XSS Prevention:** Avoid `dangerouslySetInnerHTML`. If rendering external markdown or SVG, sanitize through strict schema-aware parsers.
3. **Safe Link Attributes:** All external outbound links (`<a>`) targeting `_blank` must specify `rel="noopener noreferrer"` to mitigate reverse tabnabbing.
4. **Content Security Policy (CSP):** Maintain strict script and frame directives in `index.html`.

---

## 5. Visual System Design Workflow (Archify Protocol)

When creating or modifying architecture visuals for projects (Project LOOP, CricketNepal, PublicCare):
1. Create a dedicated folder: `.archify/<type>-<slug>-<timestamp>/`.
2. Author the typed `candidate.json` using the Archify schema (`architecture`, `workflow`, `sequence`, `dataflow`, or `lifecycle`).
3. Finalize using the CLI:
   ```bash
   node .agents/skills/archify/bin/archify.mjs finalize <type> <candidate.json> <output.html> --quality showcase --json
   ```
4. Verify all 4 gates pass (`validate`, `deliver`, `check`, `browser-check`). Ensure zero crossover diagnostics before publishing.
5. Embed or link the resulting artifact into the corresponding portfolio project modal.

---

## 6. Mandatory Agent Workflow (SDLC Rhythm)

When executing any task or feature:
1. **Inspect:** Examine existing repository state, files, and rules before proposing changes.
2. **Understand:** Review the user's intent, the CV context, and architectural guardrails.
3. **Plan:** Present a concise step-by-step plan.
4. **Implement Minimally:** Write clean, modular, strictly-typed code that directly satisfies requirements.
5. **Verify:** Run type checks and build verification (`npm run build`, `npm run lint`).
6. **Document:** Keep `CHANGELOG.md` and related docs updated.

---

## 7. Scope Protection

Unless explicitly requested by the user:
* Do **NOT** install heavy state-management libraries (e.g., Redux) when React hooks / URL state suffice.
* Do **NOT** introduce backend services unless creating a documented proxy.
* Do **NOT** alter verified `.archify/` JSON schemas without running verification gates.
