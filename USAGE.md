# User & Developer Guide — Sonu Thakur Personal Portfolio

---

## 1. Prerequisites & Environment Setup

### 1.1 Requirements
* **Node.js:** `>= 20.0.0` (Node 22 or 24 recommended)
* **Package Manager:** `npm` (bundled with Node)
* **Operating System:** Windows, macOS, or Linux

### 1.2 Installation & Setup
```bash
# 1. Clone the repository
git clone https://github.com/sonuthakur03/Personal-Portfolio.git
cd Personal-Portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be live at `http://localhost:5173`.

---

## 2. Quick Start & Common Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds production-optimized assets in `dist/`. |
| `npm run preview` | Runs a local static server to preview the production build. |
| `npm run lint` | Runs ESLint to check for code quality and anti-patterns. |

---

## 3. Archify Visual Architecture Workflow

This repository uses [`archify`](file:///e:/codes/PersonalPortfolio/.agents/skills/archify/SKILL.md) to generate standalone, interactive SVG/HTML system diagrams for technical case studies.

### 3.1 Verifying the Archify Tooling
```bash
node .agents/skills/archify/bin/archify.mjs doctor
```

### 3.2 Generating a New Architecture Diagram
1. Create a dedicated folder under `.archify/`:
   ```bash
   # Example: .archify/architecture-<slug>-<timestamp>/
   mkdir -p .archify/architecture-myproject-20260929-120000
   ```
2. Author your `candidate.json` using the schema in `.agents/skills/archify/schemas/architecture.schema.json`.
3. Finalize and validate the diagram:
   ```bash
   node .agents/skills/archify/bin/archify.mjs finalize architecture .archify/architecture-myproject-20260929-120000/candidate.json .archify/architecture-myproject-20260929-120000/output.html --quality showcase --json
   ```
4. Verify that all 4 gates pass (`validate`, `deliver`, `check`, `browser-check`). If crossings occur, adjust node positions and re-run with `--out-dir`.

---

## 4. How to Extend the Portfolio

### 4.1 Adding a New Project Case Study
1. Open [`src/data/projectsData.ts`](file:///e:/codes/PersonalPortfolio/src/data/projectsData.ts).
2. Append a new object conforming to the `ProjectCaseStudy` interface:
   ```typescript
   {
     id: "my-project",
     title: "My Project Title",
     role: "Lead Full-Stack Developer",
     category: "ai-systems",
     summary: "Overview of architecture and impact...",
     architectureDiagram: {
       id: "arch-myproject",
       title: "System Architecture",
       type: "architecture",
       path: "/architectures/my-project.html",
       keyHighlights: ["ACID transactions", "Gemini AI pipeline"]
     },
     securityHardening: [
       {
         title: "Rate Limiting",
         threatMitigated: "API brute force and DDoS",
         implementation: "Token-bucket express-rate-limit middleware"
       }
     ],
     techStack: ["React", "Node.js", "MongoDB", "Gemini SDK"],
     metrics: ["<150ms P95 latency", "Zero data loss"]
   }
   ```

### 4.2 Adding an AI Counterpart Concept
1. Open [`src/data/aiCounterpartsData.ts`](file:///e:/codes/PersonalPortfolio/src/data/aiCounterpartsData.ts).
2. Add a new parallel mapping connecting traditional SWE primitives to AI engineering counterparts.

---

## 5. Troubleshooting & FAQ

* **Issue: Archify reports `browser-check will not replace existing unowned evidence path`**
  * *Fix:* Specify a fresh output directory with `--out-dir <folder>/review-2` as per the Archify delivery contract.
* **Issue: Port 5173 is already in use**
  * *Fix:* Vite automatically falls back to 5174 or specify a custom port: `npm run dev -- --port 3000`.
* **Issue: TypeScript type check failure**
  * *Fix:* Run `npm run build` locally to identify the exact line and type mismatch; ensure all types in `src/types/` are strictly respected.
