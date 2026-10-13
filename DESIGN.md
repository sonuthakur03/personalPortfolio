# System Architecture & Technical Design Document — Sonu Thakur Personal Portfolio

---

## 1. System Overview & Architectural Style

The application is structured as a **Modern Client-Side Single Page Application (SPA)** built with React 19, TypeScript, Vite, and Tailwind CSS. It is engineered with a **unidirectional data flow**, strongly-typed domain boundaries, and an integrated **Archify Visual Architecture Layer**.

```text
┌─────────────────────────────────────────────────────────────────┐
│                      Client Layer (Browser)                     │
│                                                                 │
│  ┌──────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │   Page Views     │    │ Command Palette │    │ Case Study  │ │
│  │ (Home/Projects)  │ ──►│    (Ctrl + K)   │ ──►│   Modals    │ │
│  └──────────────────┘    └─────────────────┘    └─────────────┘ │
│           │                                            ▲        │
│           ▼                                            │        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │               Domain Models & Central Data                 │ │
│  │  (Projects, Archify Embeds, AI Counterparts, CTF Logs)     │ │
│  └────────────────────────────────────────────────────────────┘ │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                    ┌────────────────────┐ │
│  │  Theme Engine    │                    │  Archify Visuals   │ │
│  │ (CSS Tokens/Dark)│                    │  (SVG/HTML Vector) │ │
│  └──────────────────┘                    └────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Components & Responsibilities

### 2.1 Router & Shell Layout
* **Location:** [`src/router/AppRouter.tsx`](file:///e:/codes/PersonalPortfolio/src/router/AppRouter.tsx), [`src/layouts/`](file:///e:/codes/PersonalPortfolio/src/layouts/)
* **Purpose:** Manages page route resolution, client-side navigation with React Router 7, persistent navigation headers, and responsive footers.
* **Dependencies:** React Router 7, Theme Provider.

### 2.2 Case Study Engine
* **Location:** `src/components/case-studies/`
* **Purpose:** Displays interactive deep-dives into flagship projects (*Project LOOP*, *CricketNepal*, *PublicCare*).
* **Key Features:** Tabbed views for Architecture (interactive Archify viewport), Security Threat Analysis, System Metrics, and Code Walkthrough.
* **Contract:** Consumes strongly-typed `ProjectCaseStudy` interfaces.

### 2.3 AI Counterparts Explorer
* **Location:** `src/components/ai-counterparts/`
* **Purpose:** Educates visitors and recruiters by drawing side-by-side technical parallels between traditional software engineering concepts (SQL, Redis, Sessions, Rate Limiters) and modern AI systems (Vector Search, Semantic Cache, Context Windows, Model Cascades).

### 2.4 Command Palette (`Ctrl+K`)
* **Location:** `src/components/common/CommandPalette.tsx`
* **Purpose:** Accessible keyboard navigation enabling instantaneous jumping between case studies, security writeups, skills, and resume downloads.

### 2.5 Archify Integration Layer
* **Location:** `.archify/` and `src/data/architectures.ts`
* **Purpose:** Hosts production-grade SVG/HTML architecture diagrams generated via the `.agents/skills/archify` skill suite. Diagrams are verified through headless browser checks before linking into the frontend presentation layer.

---

## 3. Data Models & Type System

All entities are immutable, strongly-typed TypeScript models located in `src/types/`:

```typescript
// Example Domain Model Contract
export type ProjectCategory = 'ai-systems' | 'fullstack-mern' | 'civic-tech' | 'security-ctf';

export interface ArchifyDiagramRef {
  readonly id: string;
  readonly title: string;
  readonly type: 'architecture' | 'workflow' | 'sequence' | 'dataflow' | 'lifecycle';
  readonly path: string;
  readonly keyHighlights: readonly string[];
}

export interface SecurityMilestone {
  readonly title: string;
  readonly threatMitigated: string;
  readonly implementation: string;
  readonly ctfTakeaway?: string;
}

export interface AICounterpartMapping {
  readonly traditionalConcept: string;
  readonly aiCounterpart: string;
  readonly description: string;
  readonly loopImplementationExample: string;
}

export interface ProjectCaseStudy {
  readonly id: string;
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly architectureDiagram: ArchifyDiagramRef;
  readonly securityHardening: readonly SecurityMilestone[];
  readonly techStack: readonly string[];
  readonly metrics: readonly string[];
}
```

---

## 4. Security Architecture & Threat Mitigation

| Threat Vector | Mitigation Strategy in Portfolio |
| :--- | :--- |
| **API Key Exposure** | Zero client-side API keys. Any LLM interactions rely on offline sandbox fixtures or dedicated backend proxies. |
| **Cross-Site Scripting (XSS)** | React JSX auto-escaping; strict avoidance of `dangerouslySetInnerHTML`. User feedback inputs are strictly client-side sanitized. |
| **Reverse Tabnabbing** | All outbound hyperlinks (`target="_blank"`) enforce `rel="noopener noreferrer"`. |
| **Clickjacking & Framing** | Strict CSP headers configured to disallow arbitrary embedding (`X-Frame-Options: SAMEORIGIN` / `frame-ancestors 'self'`). |
| **Dependency Vulnerabilities** | Automated npm audit checks and version pin discipline. |

---

## 5. Architectural Trade-offs & Rationales

1. **Vite + React 19 SPA vs. Next.js SSR:**
   * *Decision:* Vite SPA with React Router 7.
   * *Rationale:* Portfolio is fully client-side and static-asset friendly, enabling zero-cost instant hosting on GitHub Pages / Vercel with lightning-fast HMR and minimal operational overhead. No Node server maintenance required.
2. **Archify Static HTML/SVG Embeds vs. Dynamic Canvas/WebGL:**
   * *Decision:* Archify SVG/HTML standalone artifacts.
   * *Rationale:* Archify generates verified, accessible, responsive SVG diagrams that render crisply on high-DPI displays without the heavy GPU memory footprint of WebGL or runtime diagram lag.
3. **Tailwind CSS with CSS Variable Tokens vs. CSS-in-JS:**
   * *Decision:* Tailwind CSS v3 with CSS custom properties (`--background`, `--foreground`, `--primary`).
   * *Rationale:* Eliminates runtime style recalculation overhead, guarantees instant dark/light mode toggle with zero flicker, and maintains strict token consistency.
