# Sonu Thakur — Interactive Engineering Portfolio & System Design Showcase

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88ce02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

> **Live Preview:** [http://localhost:4173/](http://localhost:4173/)  
> **Production Stack:** TypeScript 6.0+, React 19, Vite 8, Tailwind CSS v3, GSAP 3 (ScrollTrigger & Flip), Motion (motion/react), Web Audio API.

---

## 🚀 Overview

**Sonu Thakur Personal Portfolio** is an interactive engineering portfolio and system design showcase built to demonstrate production-grade competence across **Full-Stack MERN Architecture**, **Applied AI Engineering (Gemini AI SDK)**, **Application Security (BugV CTF 2026 3rd Place)**, and **Modern Interactive Web Design**.

Moving far beyond generic resume websites, every project, skill, and credential is backed by **interactive architectural blueprints (Archify)**, **security threat models (OWASP)**, and **real-time system telemetry**.

---

## ✨ Key Architectural Features

### 1. 🧩 Interlocking Jigsaw Puzzle Skills Matrix
* **Bi-Directional Scroll Scrub:** Powered by GSAP `ScrollTrigger` with `scrub: 1.2` — as you scroll down, 16 scattered technology puzzle pieces fly inward and lock together into a razor-flat solid square; scrolling back up smoothly scatters them into space (*"scroll a little, assemble a little and vice versa"*).
* **Zero-Gap Jigsaw Geometry Math:** Parametric cubic-bezier edge generator ensuring exact complementary interlocking between adjacent tabs (`+normal`) and holes (`-normal`), with clean flat exterior boundaries.
* **4x4 Core Architecture Grid:** 16 battle-tested technologies organized into 4 architectural tiers:
  * **Frontend & Core:** TypeScript, React 19, Next.js, Tailwind CSS
  * **Backend & Realtime:** Node.js, Express.js, FastAPI / REST, WebSockets
  * **Databases & DevOps:** MongoDB, PostgreSQL, Redis Streams, Docker
  * **Applied AI & AppSec:** Python, Gemini AI SDK, BugV CTF (3rd Place), Git & GitHub
* **Interactive HUD & Controls:** Manual progress slider (`0%` to `100%`), quick "Snap Lock" & "Scatter" triggers with spring physics, and an interactive Piece Inspector revealing architectural roles and project case studies.

### 2. 🔬 Developer Laboratory & Engineering Workspace (Selected Work)
* **Swiss Engineering Layout:** Two-column desktop workstation inspired by digital blueprints, engineering documentation, and minimalist developer workstations.
* **Vertical Project Index:** Typography-driven index (`01` to `06`) with thin hairline dividers, active status marker (`01 ● PROJECT LOOP`), and keyboard/hover navigation with soft tactile Web Audio clicks.
* **Interactive Laboratory Workbench Preview:** Large CAD-framed inspection canvas with precision corner crosshairs (`+`), live system schematics (AI pipeline telemetry, inventory mutex lock states, 2dsphere geospatial clusters, daemon digests), and subtle cursor follower (`[LIVE SYSTEM ↗]`).
* **Swiss Metadata Grid:** Crisp technical specification panel (`TYPE`, `ROLE`, `STACK` formatted as plain text with `·` dividers, `YEAR`), plus direct action triggers for source code, live deployments, and interactive Archify blueprints.
* **Mobile Responsive Stream:** Clean sequential vertical inspection layout tailored for mobile devices.

### 3. 🌐 Aakarsh DevHQ Inspired Visual Components
* **Liquid Wave Technical Skills:** 28+ categorized skills with rotating SVG bezier liquid waves that fill cards from the bottom on hover.
* **Certifications Showcase:** 16:9 credentials cards featuring dark blur hover states, animated sweep-light buttons, and full-resolution verification modals.
* **Dev Network & Presence:** 3D Y-axis flip cards (`rotateY(360deg)`) for LinkedIn, GitHub, BugV CTF, and LeetCode, anchored by an avatar with a continuously rotating conic-gradient energy border.

### 4. ⚡ Dennis Snellenberg & Aadarsh Rai Minimalist Preloader
* **Multilingual Greeting Sequence:** Smoothly cycles greetings across 10 global languages (English, Hindi, Nepali, Japanese, French, Spanish, German, Mandarin, Russian, Arabic).
* **Circular Geometric Arc Exit:** Upward fade-up where bottom corner radii dynamically expand from `0vw` to `50vw`, forming a sleek circular dome exit over pure matte black.

### 5. 🔊 Synthesized Tactile Web Audio
* Zero external audio files and zero latency — synthesized on-the-fly via browser `AudioContext` (oscillators + exponential gain envelopes) providing tactile clicks, keyboard ticks, hover feedback, and victory chimes.

### 6. 🛡️ Application Security & CTF Showcase
* Highlighting Sonu's **3rd Place at BugV CTF 2026** (National solo cybersecurity tournament), with interactive writeups covering XSS mitigation, CSRF tokens, strict CSP headers, JWT & RBAC defenses, and input sanitization.

---

## 📁 Repository Structure

```text
PersonalPortfolio/
├── .agents/                    # Custom agent instructions & Archify skill toolset
│   └── skills/archify/         # SVG/HTML system design diagram compiler
├── .archify/                   # Compiled architectural diagrams & candidates
├── public/
│   ├── certificates/           # High-resolution verified credential images
│   └── resume.pdf              # Sonu Thakur Official Curriculum Vitae
├── src/
│   ├── components/
│   │   ├── case-studies/       # Creations Bento grid & Archify modal triggers
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── CaseStudyModal.tsx
│   │   ├── certifications/     # 16:9 credentials grid & credential modal
│   │   ├── common/             # Preloader, Constellation background, BrandIcons
│   │   ├── hero/               # Command center hero & animated headline
│   │   ├── security/           # BugV CTF showcase & OWASP defense matrix
│   │   ├── skills/             # Jigsaw Puzzle board & liquid wave cards
│   │   │   ├── PuzzleSkillsBoard.tsx
│   │   │   └── SkillsSection.tsx
│   │   ├── social/             # 3D flip profile network cards
│   │   └── timeline/           # Educational & professional journey timeline
│   ├── data/                   # Strongly-typed domain models & data records
│   │   ├── projectsData.ts
│   │   ├── puzzleSkillsData.ts
│   │   ├── skillsData.ts
│   │   └── certificatesData.ts
│   ├── lib/                    # Motion tokens, easing curves & spring physics
│   ├── types/                  # TypeScript interfaces (strict: true, zero any)
│   ├── utils/                  # Jigsaw geometry math & synthesized sound manager
│   ├── App.tsx                 # Root layout & route container
│   ├── index.css               # Tailwind tokens & custom CSS keyframes
│   └── main.tsx                # Application mount point
├── index.html                  # Strict CSP directives & Devicon stylesheet
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Extended theme tokens & custom animation keyframes
└── tsconfig.json               # Strict TypeScript configuration
```

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Core Framework** | React 19 (`react`, `react-dom`), TypeScript 6.0+ |
| **Build Tooling** | Vite 8, Rolldown engine, PostCSS, Autoprefixer |
| **Animation & Motion** | GSAP 3 (`ScrollTrigger`, `Flip`), Motion (`motion/react`) |
| **Styling** | Tailwind CSS v3, Vanilla CSS Custom Properties, Glassmorphism |
| **Icons & Media** | Lucide React, Devicon v2.16+, Custom SVG Brand Glyphs |
| **Audio Engine** | Synthesized Web Audio API (`AudioContext`) |
| **System Design** | Archify Architecture & Workflow Engine |

---

## 🚦 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sonuthakur03/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Run type-checking and linter:**
   ```bash
   npm run lint
   npx tsc --noEmit
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production bundle:**
   ```bash
   npm run preview -- --port 4173
   ```
   Open [http://localhost:4173/](http://localhost:4173/) in your browser.

---

## 🔒 Security Protocols

This portfolio enforces strict engineering and security standards governed by [`AGENTS.md`](file:///e:/codes/PersonalPortfolio/AGENTS.md):
1. **Zero Secret Leaks:** No API keys, credentials, or private LLM tokens in client bundles.
2. **Reverse Tabnabbing Protection:** All external links (`target="_blank"`) enforce `rel="noopener noreferrer"`.
3. **Strict Content Security Policy (CSP):** Verified script and frame directives in `index.html`.
4. **XSS Defense:** Zero use of un-sanitized `dangerouslySetInnerHTML`.

---

## 👤 Author

**Sonu Thakur**  
*Full-Stack Software Engineer · Applied AI Developer · Security Enthusiast*  
*Tribhuvan University (BCA Rank 1, 3.63 CGPA) · BugV CTF 2026 (3rd Place)*  

* **GitHub:** [@sonuthakur03](https://github.com/sonuthakur03)
* **LinkedIn:** [Sonu Thakur](https://linkedin.com/in/sonuthakur03)
* **Email:** [sonuthakur.dev@gmail.com](mailto:sonuthakur.dev@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn, and draw inspiration from the architecture and components!
