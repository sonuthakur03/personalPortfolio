# Product Requirements Document (PRD) — Sonu Thakur Personal Portfolio

---

## 1. Executive Summary & Vision

### 1.1 Overview
The **Sonu Thakur Personal Portfolio** is a high-performance web platform designed to present Sonu Thakur's engineering profile to top tech leads, hiring managers, and collaborators. Rather than a static catalog of resume points, this application acts as an interactive technical portfolio demonstrating mastery in **Full-Stack MERN Architecture**, **Applied AI Engineering (Gemini AI SDK)**, **Application Security (BugV CTF 2026 3rd Place)**, and **Disciplined SDLC Practices**.

### 1.2 Core Problem Statement
* **Industry Dilemma:** Most entry-level developer portfolios are generic, cookie-cutter templates with trivial CRUD projects that fail to prove architectural depth, security instincts, or systems-level thinking.
* **Sonu's Unfair Advantage:** Sonu has real production intern experience building an AI customer feedback intelligence platform (**Project LOOP**), won 3rd place in a competitive solo Capture-The-Flag security tournament (**BugV CTF 2026**), and has built complex real-time and payment-integrated platforms (**CricketNepal**, **PublicCare**).
* **The Solution:** A portfolio that presents deep **visual system architecture breakdowns** (via Archify), **security threat models**, and **AI engineering counterpart mappings** directly alongside the code.

### 1.3 Target Personas
1. **Engineering Managers & Tech Leads:** Seeking candidates who understand ACID guarantees, distributed state, API security, and AI integrations beyond simple API wrappers.
2. **Technical Recruiters:** Looking for clear, high-signal proof of competence, academic excellence (BCA Rank 1, 3.63 CGPA), and live demonstrated projects.
3. **Open-Source Collaborators & Peers:** Exploring architecture visuals, system design blueprints, and security insights.

---

## 2. Goals & Success Metrics

### 2.1 Measurable Goals
* **Lighthouse Performance Score:** >= 95 in Performance, Accessibility, Best Practices, and SEO.
* **Zero Security Violations:** Strict Content Security Policy (CSP), zero exposed credentials, and sanitized outbound interactions.
* **Interactive Visual Engagement:** 100% of flagship projects (*Project LOOP*, *CricketNepal*, *PublicCare*) backed by verified Archify diagrams and technical deep dives.
* **Clean Build & Type Safety:** 0 TypeScript compile errors, 0 ESLint warnings.

### 2.2 Non-Goals
* No complex client-side CMS or heavy databases; content is version-controlled directly in code.
* No live paid LLM key exposure on the frontend; AI interactions use backend proxies or simulated deterministic sandboxes.

---

## 3. Functional Requirements

### 3.1 Feature Area 1: Hero & Command Center
* **REQ-1.1:** Hero section presenting high-impact identity: Full-Stack Engineer, AI Systems Integrator, and AppSec Enthusiast.
* **REQ-1.2:** Key achievement tags: BCA Rank 1 (Tribhuvan University), BugV CTF 2026 3rd Place, Full-Stack Intern @ Zidio Development.
* **REQ-1.3:** Quick-action Command Palette (`Ctrl+K` / `Cmd+K`) allowing instant search across projects, architecture diagrams, skills, and contact links.

### 3.2 Feature Area 2: Flagship Architectural Case Studies
* **REQ-2.1:** **Project LOOP (AI Customer Feedback Intelligence):**
  * Embedded interactive Archify diagram showing Gemini SDK ingestion, sentiment classification, VOC risk matrix, and ACID MongoDB operations.
  * Deep-dive tabs: *System Design*, *Security Hardening (Rate Limiting, XSS, Helmet)*, *AI Counterpart Pipeline*, and *Production Deployment*.
* **REQ-2.2:** **CricketNepal (Multi-role MERN eCommerce):**
  * Architectural breakdown of multi-role access (buyer/seller/admin), 3-gateway payment integration (Khalti, eSewa, Stripe), and server-side inventory reservation state machine.
* **REQ-2.3:** **PublicCare (Civic Tech & Tender Management):**
  * Real-time WebSocket architecture, GPS verification pipeline, automated priority escalation, and hackathon security pass.

### 3.3 Feature Area 3: AI Counterparts & Concepts Explorer
* **REQ-3.1:** Interactive visual guide mapping traditional software engineering primitives to modern AI engineering counterparts:
  * SQL Queries ➔ Semantic Retrieval & Vector Embeddings
  * Redis Cache ➔ Semantic / Prompt KV Caching
  * Deterministic Controllers ➔ Prompt Chains & Function/Tool Calling
  * HTTP Sessions ➔ Multi-turn Context Windows & Sliding Memory
  * Input Sanitization ➔ Prompt Injection Defense & Output Guardrails

### 3.4 Feature Area 4: Security & CTF Showcase
* **REQ-4.1:** Dedicated breakdown of BugV CTF 2026 (3rd place finish):
  * Vulnerability categories solved (Web exploitation, reverse engineering, forensic analysis).
  * Defensive takeaways implemented across personal projects (OWASP Top 10, rate limiting, defense in depth).

### 3.5 Feature Area 5: Skills Matrix & Verified Credentials
* **REQ-5.1:** Categorized taxonomy: Languages, Frontend, Backend, Databases, CS Fundamentals, and AI Tooling.
* **REQ-5.2:** Filterable views based on technology stack and project usage.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Responsiveness
* Static bundle size kept under 250 KB (gzip).
* Full responsive support across mobile (360px+), tablet, and desktop viewports.
* Instant theme toggling (Dark / Light) with CSS custom properties and zero flicker.

### 4.2 Security & Integrity
* All external links enforce `rel="noopener noreferrer"`.
* Strict CSP headers preventing script injection or unauthorized frame ancestors.
* Complete validation of all client-side inputs.

---

## 5. Phased SDLC Roadmap

| Milestone | Target Scope | Acceptance Criteria |
| :--- | :--- | :--- |
| **Phase 1: Foundation & Specs** | Governance files (`AGENTS.md`, `PRD.md`, `DESIGN.md`), Archify Project LOOP visual | All documentation approved, Archify gates passing |
| **Phase 2: Visual System Blueprints** | CricketNepal & PublicCare Archify architecture diagrams | Planar diagrams finalized with zero crossover diagnostics |
| **Phase 3: Core UI & Case Study Engine** | Interactive case study modals, hero, theme provider, router setup | Responsive layout running locally with fast HMR |
| **Phase 4: Security & AI Concept Visualizers** | Command palette, AI counterpart interactive table, BugV CTF section | Clean verification, strict type checking, accessible navigation |
| **Phase 5: Automated Testing & CI/CD** | Vitest unit tests, ESLint clean pass, GitHub Actions CI workflow | 100% test pass rate, build verified |
