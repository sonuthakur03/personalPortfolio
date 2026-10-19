# Changelog

All notable changes to the **Sonu Thakur Personal Portfolio** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.2] - 2026-10-19

- **Technical Stack & Skills Arsenal Realignment (`skillsData.ts`, `SkillsSection.tsx`)**:
  - Implemented strict 25-item decision matrix matching verified competencies and technical CV priorities:
    - **Core Languages & Web:** `JavaScript` (Advanced), `TypeScript` (Intermediate), `React 19` (Advanced), `Next.js` (Intermediate).
    - **Consolidated Frontend & Backend:** `HTML5 + CSS3 + Tailwind CSS` grouped as `Frontend development`; `Node.js + Express.js` grouped as `Backend development`.
    - **Databases & Fundamentals:** Prioritized `MongoDB` (Advanced), `MySQL` (Intermediate), `PostgreSQL` (Intermediate), renamed ACID & DBMS to `Database fundamentals` (`ACID & Relational`), downgraded `Redis Streams` to `Beginner (Optional)`.
    - **Architectural & Security Renaming:** Renamed JWT Auth & RBAC to `Authentication & Authorization`, Khalti / eSewa / Stripe to `Payment gateway integration`, and retained `Application Security` as `Intermediate (Evidence)`.
    - **AI & Development Tooling Separation:** Segregated `Claude Code / Antigravity` into dedicated category `AI-assisted development tools`; retained `AI SDK` conditionally as `AI application integration — Beginner`.
    - **Demonstrable Frameworks & Languages:** Updated `Python` and `Django` to `Certified · Demonstrable`; condensed Java, C/C++, PHP, C#/.NET into `Academic experience`.
    - **Protocol Downgrade:** Reclassified `WebSockets` to `Beginner`.
    - **DevOps, Collaboration & Testing:** Grouped `Git / GitHub / GitLab` under `Version control & collaboration`, `Vercel / Render` under `Deployment & hosting`, retained `Postman` for `API testing`, `Linux` as `Intermediate (Secondary)`, and `Figma` for `UI/UX design`.
    - **CS Fundamentals:** Relocated `Data Structures & Algorithms` out of main stack into dedicated `Computer Science Fundamentals` category.
    - **Pruned Items:** Removed `Docker` and `BugV CTF` from skills catalog (BugV CTF preserved across verified achievements, certificates, and timeline).
    - **Filter Pill Expansion:** Added `AI Dev Tools` and `CS Fundamentals` filter pills in [SkillsSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/skills/SkillsSection.tsx) with animated category count badges.
- **Pre-Deployment Dead Code Pruning & Asset Optimization**:
  - **Dead Code & Obsolete Types Elimination**:
    - Pruned dead jigsaw puzzle types (`PuzzleSkillPiece`, `JigsawEdgeType`, `JigsawEdges`, `PuzzleGridConfig`) in [types/skills.ts](file:///e:/codes/PersonalPortfolio/src/types/skills.ts) and replaced with canonical `SkillCategoryType`, `FlatSkillItem`, and `SkillCategory`.
    - Pruned redundant SVG wrapper icons (`MailIcon`, `ExternalLinkIcon`, `ArrowRightIcon`, `FileTextIcon`) in [BrandIcons.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/BrandIcons.tsx), centralizing exclusively on brand icons (`GithubIcon`, `LinkedinIcon`, `InstagramIcon`) while consuming Lucide for generic UI icons.
    - Extended `useModalDismiss` hook to [CommandPalette.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/CommandPalette.tsx) to unify Escape key listening and body scroll locking across all modals.
  - **Asset Weight Budget & Modern WebP Migration**:
    - Converted all 6 flagship project preview images in `public/projects/` to `.webp`, cutting average asset sizes by 80–90% (e.g. `CricketNepal.png` reduced from 609 KB to 58 KB; `QuizBizz.png` reduced from 517 KB to 89 KB).
    - Compressed all 12 certificate scans in `public/certificates/` with `mozjpeg`, decreasing total certificate payload from 4,070 KB to 752 KB (-81.5%) while maintaining 1400px high-resolution legibility.
    - Deleted obsolete `.png` duplicates in `public/projects/`.
  - **Production Bundle & Chunk Verification**:
    - Verified all production JavaScript chunks are strictly under the 300 kB budget (largest vendor chunk: 275 kB, main bundle: 191 kB, gzipped CSS: 10.45 kB).
    - Clean passes on all 13 Vitest tests (`npm run test`), ESLint (`npm run lint`), and Vite build (`npm run build`).
- **Footer CTA Dimensional Alignment (`Footer.tsx`)**:
  - Resolved height and text wrapping mismatch on the "Send Message" action box (`height: 78px` vs `height: 58px` on the email box caused by unconstrained text wrapping).
  - Standardized both buttons to `h-[58px]`, `whitespace-nowrap`, `gap-2.5`, `shrink-0` icon constraints, and identical baseline alignment across desktop and mobile viewports.
- **System-Wide DRY (Don't Repeat Yourself) Architectural Refactoring**:
  - **Eliminated Project Data Redundancy (`labProjectsData.ts` & `projectsData.ts`)**:
    - Transformed `labProjects` to derive dynamically from canonical `projectsData`, removing ~100 lines of duplicated summaries, roles, links, and technology arrays.
    - Consolidated project color schemes into a single `getProjectTheme(id)` helper with automatic hyphenation normalization.
  - **Decoupled Curriculum Pillars (`educationData.ts` & `types/education.ts`)**:
    - Extracted 4 large curriculum pillars (`systems`, `data`, `software`) from `EducationSection.tsx` into a typed, static data store, preventing memory reallocation on every component re-render.
  - **Reusable Modal Dismiss Hook (`hooks/useModalDismiss.ts`)**:
    - Centralized Escape key dismiss logic and `document.body.style.overflow` scroll locking into a single hook used across [ContactModal.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/ContactModal.tsx) and [CaseStudyModal.tsx](file:///e:/codes/PersonalPortfolio/src/components/case-studies/CaseStudyModal.tsx).
  - **Centralized Profile Constants & Link Synchronization**:
    - Exported canonical constants in `profileData.ts` (`DEFAULT_EMAIL`, `DEFAULT_GITHUB`, `DEFAULT_LINKEDIN`, `DEFAULT_INSTAGRAM`, `DEFAULT_RESUME_URL`, `STANDARD_RESUME_URL`).
    - Wired `ContactModal.tsx`, `Footer.tsx`, `FloatingDock.tsx`, `CommandPalette.tsx`, and `WebPresenceSection.tsx` to consume central profile data and fallbacks.
- **Hero Sticker Pill Update (`HeroSection.tsx`)**:
  - Replaced `ACID` sticker badge with `PYTHON` in the hero polaroid sticker cluster alongside `MERN`, `APPLIED AI`, `TYPESCRIPT`, `HACKATHON WINNER 🏆`, and `TU BCA RANK 1`.
- **Web Presence & Dev Network Reconfiguration (`WebPresenceSection.tsx`, `BrandIcons.tsx`)**:
  - Added Instagram profile (`https://www.instagram.com/not_sonuthakur?srtk=MWNpZmwzcnN0cWV5aA==`) with custom SVG `InstagramIcon`.
  - Focused the Dev Network grid into 5 high-impact cards: **LinkedIn**, **GitHub**, **Instagram**, **Direct Email**, and **Verified Technical CV** (`lg:grid-cols-5`).
  - Added Instagram links to [ContactModal.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/ContactModal.tsx), [Footer.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/Footer.tsx), and [CommandPalette.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/CommandPalette.tsx).
- **Official CV Distribution Across the Entire Website (`public/cv/`)**:
  - Provisioned official curriculum vitae variants in `public/cv/`:
    - `Sonu_Thakur_CV.pdf` (standard 2-page CV)
    - `Sonu_Thakur_CV_2page.pdf` (2-page technical deep-dive)
    - `Sonu_Thakur_CV_1page.pdf` (concise 1-page summary)
  - Integrated 7 intuitive, high-visibility CV download entry points:
    1. **Hero Header Navigation**: `[ CV ]` pill with `FileText` icon alongside section pills.
    2. **Hero Main CTA**: High-contrast Pop Brutalist yellow `[ Download CV ]` button alongside `Explore my work` and `Get in touch`.
    3. **Floating Bottom Dock**: Tactile CV download icon button with `CV (PDF)` hover tooltip and audio feedback.
    4. **Web Presence / Social Grid**: 6th interactive card "Verified CV" with "Download PDF →" action.
    5. **Contact & Inquiry Modal**: "Need full resume first? [Download CV ↗]" quick-access bar for recruiters.
    6. **Footer Navigation**: High-visibility "Download CV (PDF)" button replacing dev `/admin` link in production.
    7. **Command Palette (`Ctrl+K` / `⌘K`)**: Instant searchable "Download CV / Resume (PDF)" item.
- **Fixed Project Color Mapping Defect (`ProjectsSection.tsx`)**:
  - Resolved mismatch where unhyphenated keys in `projectColors` caused `cricket-nepal`, `public-care`, `study-track`, and `travel-np` to fall back to generic yellow.
  - All 6 projects now render their distinct, vibrant Pop Brutalist color themes across both Grid Feed and Cinematic Stage views.
- **Preloader Delay Optimization (`LanguagePreloader.tsx`)**:
  - Added `sessionStorage` caching (`sonu_preloader_seen`) to run the animated multi-lingual preloader on first entry while skipping subsequent in-session refreshes.
- **Test Suite Expansion (`content-accuracy.test.ts`)**:
  - Added automated test ensuring the physical existence, accessibility, and byte validity (>10 KB) of all CV PDF variants in `public/cv/` (13/13 tests passing).
- **Hero Sticker Accuracy (`HeroSection.tsx`)**:
  - Replaced obsolete `GSAP` sticker badge with `TYPESCRIPT` to accurately reflect the active architecture and pruned dependencies.
- **CSS Dead Weight Cleanup (`src/index.css`)**:
  - Purged over 140 lines of obsolete CSS rules and duplicate keyframes (duplicate `@keyframes skillWave`, dead `getlayers-*`, `solarPulse`, `floatProfile`, and unreferenced glassmorphism classes).
- **CI/CD Quality Gate (`.github/workflows/deploy.yml`)**:
  - Added automated `npm run test` step in the GitHub Pages deployment pipeline prior to production bundling.

---

## [1.1.1] - 2026-10-19

### Nano Banana Pop Brutalist Favicon & Deep Forensic Dead Code Purge
- **Nano Banana Pop Brutalist Favicon Suite**:
  - Generated iconic Pop Brutalist "ST" monogram favicon using Nano Banana (Gemini image model).
  - Features bold brutalist typography, split diagonal yellow (`#FFE14D`) and pink (`#FF6FB5`) backdrop, and chunky black offset drop shadow.
  - Exported multi-resolution production favicons via `sharp`:
    - `public/favicon.svg`: Ultra-crisp vector SVG with halftone retro dots and hard shadow.
    - `public/favicon.png`: 192x192 high-DPI raster icon.
    - `public/favicon-64.png`: 64x64 desktop browser icon.
    - `public/favicon-32.png`: 32x32 standard tab icon.
    - `public/apple-touch-icon.png`: 180x180 iOS home screen icon.
  - Updated [index.html](file:///e:/codes/PersonalPortfolio/index.html) with complete modern favicon and apple-touch-icon tags.
- **Deep Dead Code Purge (>15 MB Reclaimed)**:
  - Purged obsolete external template directory `B · Pop Brutalist-html` (template files and react vendor duplicates).
  - Purged unused `src/assets/` directory containing 14.92 MB of unreferenced high-resolution mockup PNGs (`about pagee.png`, `contact.png`, `porftfolio home page.png`, `projects page.png`, and `design/`).
- **Header Navigation Enhancement**:
  - Wired up `onOpenCommandPalette` prop in [HeroSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/hero/HeroSection.tsx) to render a stylish `⌘K` Pop Brutalist search pill in the header navigation bar.

---

## [1.1.0] - 2026-10-19

### Comprehensive Website Audit, Test Suite & Performance Optimization
- **Automated Testing Suite (`src/__tests__/`)**:
  - Integrated Vitest, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` with `npm run test` script.
  - Implemented 12 automated unit/integration tests across 3 core suites:
    - `security.test.ts`: Validates CSP headers, zero `dangerouslySetInnerHTML`, safe external link attributes (`rel="noopener noreferrer"`), and zero hardcoded LLM secrets.
    - `content-accuracy.test.ts`: Verifies CV alignment (Rank 1 TU, 3.63 CGPA, IdeaX FinTech track winner, BugV CTF 3rd place), all 6 project images and architecture blueprints (`/architectures/*.html`), and verified physical certificate scans.
    - `components.test.tsx`: Validates component rendering and user interaction across `HeroSection`, `FloatingDock`, `SkillsSection`, `EducationSection`, and `CertificationsSection`.
- **Dead Code & Dependency Purge**:
  - Uninstalled unused packages: `three`, `@types/three`, and `gsap` (removed 9 dependencies).
  - Deleted 10 orphan prototype files: `AsciiPandaCanvas.tsx`, `Sonu3DWorkstation.tsx`, `AntigravityCharacter.tsx`, `ConstellationCanvas.tsx`, `Magnetic.tsx`, `SplitText.tsx`, `PuzzleSkillsBoard.tsx`, `jigsawGeometry.ts`, `puzzleSkillsData.ts`, and `LabProjectVisual.tsx`.
  - Removed 4 unused page stubs: `AboutPage.tsx`, `ContactPage.tsx`, `ProjectsPage.tsx`, and `SkillsPage.tsx`.
  - Deleted dead 3D models and unused mockups: `readyplayer.me.glb` (1.84 MB), `antigravity_hero_mockup.jpg`, `sonu_character_sheet.jpg`, and `crop_test.jpg`.
  - Deleted redundant root `assets/` folder (~10 MB) in favor of the active, served `public/` directory.
- **Asset & Bundle Performance**:
  - Converted oversized `public/projects/TravelNP.png` (2.31 MB) to high-fidelity WebP (`TravelNP.webp`, 224 KB, **90.3% file size reduction**).
  - Implemented Rollup vendor chunking (`vendor-react`, `vendor-motion`, `vendor-icons`), dropping the main application bundle from monolithic size down to **189.66 kB**.
  - Modernized OpenGraph and Twitter meta descriptions in `index.html` to reflect IdeaX FinTech hackathon win, Applied AI systems, and security credentials.
- **Auditing Skill Installed**:
  - Created standardized operating skill at `.agents/skills/portfolio-audit-and-test/SKILL.md` enforcing the 5-point audit standard.

---

## [1.0.7] - 2026-10-19

### Dark Mode Hover Text Contrast Fix across Curriculum & Action Cards
- **Fixed Curriculum Pillars & Module Cards (`EducationSection.tsx`)**:
  - Resolved Tailwind specificity collision where `hover:text-[#111111]` caused module card text to turn pitch black against dark backgrounds.
  - In dark mode, cards now retain `dark:hover:text-white` while elevating with `dark:hover:bg-[#1E222D]` and yellow Pop Brutalist accent borders (`dark:hover:border-[#FFE14D]`).
  - Added `dark:hover:bg-[#FF6FB5] dark:hover:text-[#111111]` to curriculum pillar tab buttons and `dark:bg-[#FFE14D] dark:text-[#111111]` for active state.
- **Fixed Dark Mode Hover Across Related Sections (`JourneyTimeline.tsx`, `SkillsSection.tsx`, `CertificationsSection.tsx`)**:
  - Aligned dark hover background styles so buttons and filter pills cleanly pair hover background transitions with high-contrast text.

---

## [1.0.6] - 2026-10-19

### Foldable Pop Brutalist Floating Navigation Dock
- **Fold/Unfold Capability (`FloatingDock.tsx`)**:
  - Integrated a dedicated Fold button (`ChevronDown`) on the right side of the floating navigation dock.
  - When folded, the dock collapses with a spring animation (`motion.div` + `AnimatePresence`) into a minimal, compact Pop Brutalist capsule: `[ 🧭 NAV  CURRENT-SECTION  ⌃ ]`.
  - Clicking the folded capsule immediately unfolds the dock back with sound feedback (`sounds.playClick`).
  - Keeps reading space unobscured while retaining live active section context and instant 1-click access.

---

## [1.0.5] - 2026-10-19

### Hero Section Bio Personalization
- **Updated Hero Bio Description (`HeroSection.tsx`)**:
  - Replaced the placeholder fragment ("MERN products, ACID-safe transactional backends... Click the highlighted word...") with an authentic, comprehensive description of Sonu Thakur.
  - Clearly highlights full-stack engineering expertise, production-grade MERN web apps, ACID-compliant transactional APIs, Applied AI systems with the Gemini SDK, IdeaX FinTech Hackathon win, and BCA Rank 1 at Tribhuvan University.

---

## [1.0.4] - 2026-10-18

### Removed Redundant Verified Stack Badges Container
- **Excised Bottom Verified Badges Container (`SkillsSection.tsx`)**:
  - Completely excised the bottom container (`Verified across Full-Stack, Applied AI, and Application Security` and its 6 duplicate badges) from the bottom of the Technical Arsenal section as requested.
  - Cleaned up unused Lucide imports (`Sparkles`, `CheckCircle2`) to ensure strict zero-warning builds.
- **Preserved Hero Sticker Cluster (`HeroSection.tsx`)**:
  - Maintained the playful Pop Brutalist sticker cluster (`MERN`, `ACID`, `GEMINI SDK`, `GSAP`, `HACKATHON WINNER 🏆`, `TU BCA RANK 1`) beneath the polaroid frame.

---

## [1.0.3] - 2026-10-18

### 3s Certificate Carousel, Unique Tech Stack Liquid Colors, High-Contrast Text, & Timeline Reordering
- **Faster 3-Second Certificate Carousel (`CertificationsSection.tsx`)**:
  - Decreased the auto-cycle interval from 4s to 3s (`3000ms`) and synchronized the top countdown progress bar transition.
- **Unique Liquid Wave Color per Tech Stack Card (`SkillsSection.tsx`)**:
  - Configured 10 distinct, vibrant Pop Brutalist gradient wave palettes cycling across the skill cards so each card has its own signature fluid tone.
- **High Text & Level Contrast Before Hover (`SkillsSection.tsx`)**:
  - Positioned the resting liquid wave well below the card (`top: 195px`) so no fluid tips bleed onto the card before hovering.
  - Ensured all card text, typography (`text-[#111111] dark:text-white`), icons, and level pills (`text-[#111111] dark:text-neutral-200 bg-neutral-100 dark:bg-black/60`) have crisp, high-contrast visibility prior to hover.
- **Reordered Experience Timeline & Hackathon Winner Wording (`JourneyTimeline.tsx`, `HeroSection.tsx`, `AntigravityCanvas.tsx`, `Footer.tsx`)**:
  - Reordered the bento timeline so the **IdeaX Hackathon FinTech Track Winner** card appears as **Cell 2** (before BugV National CTF in Cell 3).
  - Updated all badges, stickers, and marquee tickers to accurately read `"HACKATHON WINNER 🏆"` and `"IDEAX HACKATHON WINNER (FINTECH)"`.

---

## [1.0.2] - 2026-10-18

### Liquid Tech Stack Filling, Black Hello Screen, Carousel Certificates, & IdeaX FinTrace 1st Place Win
- **Liquid Wave Filling Effect on Tech Stack Cards (`SkillsSection.tsx`, `src/index.css`)**:
  - Re-introduced the signature liquid filling wave animation to every skill card on hover.
  - Added `@keyframes skillWave` in `src/index.css` rotating the fluid boundary (`borderRadius: 45% 55% 40% 60% / 55% 60% 35% 45%`) as the liquid rises from the card bottom to the top on hover (`top: 165px` -> `top: -45%`).
- **Cinematic Black "Hello" Screen Preloader (`LanguagePreloader.tsx`)**:
  - Restyled the initial multilingual intro greeting screen from bright yellow to pure matte black (`#090A0D`) with crisp white display typography, a minimal white dot, and dark brutalist language pill, delivering a dramatic and sophisticated first impression.
- **Auto-Cycling Carousel for Certificates Stage (`CertificationsSection.tsx`)**:
  - Transformed the exhibition stage into an auto-advancing carousel cycling every 4 seconds by default.
  - Added an animated brutalist progress bar across the top of the stage indicating countdown to the next slide.
  - Implemented pause-on-hover interaction so visitors can read and inspect certificates without unexpected advances.
  - Added slide animations using `AnimatePresence` and `motion.img`, along with interactive bottom dot indicators and slide counter.
- **IdeaX 2026 FinTech Track Winner (FinTrace) Integration Across Portfolio**:
  - **Hero Section (`HeroSection.tsx`)**: Replaced `BUGV CTF 3RD` sticker badge with `FINTRACE 1ST 🏆` and updated marquee ticker to `✦ FINTRACE 1ST PLACE · IDEAX`.
  - **Antigravity Backdrop (`AntigravityCanvas.tsx`)**: Replaced the floating CTF badge with `★ FINTRACE 1ST PLACE · IDEAX`.
  - **Skills Section (`SkillsSection.tsx`)**: Updated bottom verified highlight badge to `'IdeaX Winner — FinTrace (1st Place)'`.
  - **Footer Ticker (`Footer.tsx`)**: Updated ticker tape to `✦ FINTRACE 1ST PLACE WIN · IDEAX`.
  - **Journey Timeline (`JourneyTimeline.tsx`)**: Upgraded Cell 3 to prominently feature the **IdeaX Hackathon 2026 1st Place Win with FinTrace** (36-Hour Hackathon · Real-Time Algorithmic Ledger).
  - **Domain Records (`achievementsData.ts`, `profileData.ts`, `profile.ts`)**: Published `ideax-fintrace-winner-2026` as an active achievement and added `hackathonWin` to profile metadata.

---

## [1.0.1] - 2026-10-18

### Hero Viewport Fitting & Automatic Reload Color Rotation
- **Automatic Accent Color Change on Each Reload (`HeroSection.tsx`)**:
  - Implemented dynamic accent color selection on mount/refresh using `sessionStorage` exclusion pool (`#FFE14D` Yellow, `#7DFFA6` Mint, `#FF6FB5` Pink, `#7C9BFF` Blue, `#FFB38A` Peach, `#C4B5FD` Lavender).
  - Guarantees that each reload picks a distinctly different vibrant color from the previous view.
  - Added quick-shuffle dice button in the header palette picker and dynamic contrast color mapping for the "Hire me" button and interactive word cycler button so they always stand out against any background tone.
  - Synchronized the active accent color to the document CSS variable `--pop-hero-accent`.
- **Responsive Viewport-Fitting Layout (`HeroSection.tsx`)**:
  - Replaced hard-coded `min-h-[900px]` with fluid responsive constraints (`min-h-screen lg:min-h-0 lg:h-screen lg:max-h-[880px] xl:max-h-[920px] 2xl:max-h-[960px]`).
  - Balanced padding and font scaling (`text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.5rem] 2xl:text-[5rem]`) so all hero elements—header, headline, cycler, bio, buttons, polaroid card, sticker badges, and bottom marquee—fit seamlessly inside the initial viewport across laptop, desktop, and mobile displays without being cut off or overly zoomed in.

---

## [1.0.0] - 2026-10-18

### Full-Website Redesign to "B · Pop Brutalist" & Nano Banana Pro Custom Avatars
- **Global Pop Brutalist Design System (`tailwind.config.js`, `src/index.css`, `index.html`)**:
  - Integrated Google Fonts: **Archivo Black** for display headlines, **Archivo** (400/600) for body/labels, and **Space Mono** (400/700) for telemetry, timestamps, and data tags.
  - Implemented high-contrast 3px solid black borders (`border-[#111111]`), zero-blur hard drop shadows (`shadow-brutal-sm`, `shadow-brutal`, `shadow-brutal-md`, `shadow-brutal-lg`, `shadow-brutal-xl`), and tactile button states with physical hover/active offsets (`translate(-3px, -3px)` and `translate(4px, 4px)`).
  - Configured vibrant Pop Brutalist color palette tokens: `#FFE14D` (Yellow), `#FF6FB5` (Pink), `#7DFFA6` (Mint), `#7C9BFF` (Blue), `#FFB38A` (Peach), `#B9C8FF` (Lavender), and `#111111` (Heavy Dark).
- **Nano Banana Pro Avatars & Custom Illustrations**:
  - Generated full-body developer workspace illustration with custom bucket hat, raglan shirt, and laptop in transparent PNG format (`public/character/sonu_workspace_sitting.png`).
  - Created circular tech emblem badge avatar (`public/character/sonu_avatar_badge.png`) with code syntax and git branch graphics.
- **Hero Section Overhaul (`HeroSection.tsx`)**:
  - Faithful implementation of the `B · Pop Brutalist` design specification (`Brutalist.dc.html`).
  - Massive Archivo Black headline with white stroke-fill outline effect (`developer`).
  - Interactive rotating word button (`building [ scalable / secure / smart / fast ] apps`) with 2.4s auto-cycler and tactile click advance.
  - Tilted polaroid card with live Kathmandu clock (`Space Mono`), dual-avatar toggle (Workspace vs Badge view), and sticker cluster (`MERN`, `ACID`, `GEMINI SDK`, `GSAP`, `BUGV CTF 3RD`, `TU BCA RANK 1`).
  - Interactive 5-color accent picker (`#FFE14D`, `#7DFFA6`, `#FF6FB5`, `#7C9BFF`, `#FFB38A`) and running marquee banner.
- **Projects & Case Studies Showcase (`ProjectsSection.tsx`, `CaseStudyModal.tsx`)**:
  - Color-blocked Pop Brutalist project cards with dual view modes: Feed View vs Cinematic Stage.
  - Interactive "Surprise Me" quick-discovery randomizer.
  - Re-architected `CaseStudyModal.tsx` with yellow `#FFE14D` header, brutalist tabs, and integrated Archify SVG architecture viewports.
- **Career Journey & Experience (`JourneyTimeline.tsx`)**:
  - Asymmetric Pop Brutalist bento cards for Zidio Development, BugV National CTF podium (3rd place), Embark Hackathon radar, and Production Systems node matrix.
- **Education & Academic Distinction (`EducationSection.tsx`)**:
  - Vibrant yellow `#FFE14D` TU BCA Rank 1 topper card (`3.63 / 4.0`), Viswa Niketan +2 card, and interactive semester curriculum explorer.
- **Skills & Certifications (`SkillsSection.tsx`, `CertificationsSection.tsx`)**:
  - Interactive Pop Brutalist Sticker Pack with alternating card tilts and verified CV badges.
  - Interactive Exhibition Stage & Archival Gallery for Certifications (`CertificationsSection.tsx`): Replaced the restrictive bento grid with an Exhibition Stage and Uniform Grid view. High-resolution landscape certificate display on the left (60%) paired with a dedicated non-clipping metadata panel on the right (40%) with full descriptions, skills pills, and 1-click credential ID copy. Removed the academic marksheet (`cert-tu-bca-sgpa-381`), added horizontal filmstrip deck navigation, keyboard arrow support, and "Surprise Me" award randomizer.
  - Developer Workspace Illustration (`HeroSection.tsx`, `public/character/sonu_workspace_sitting.png`): Restored the full-body developer workspace illustration (sitting with laptop in ergonomic chair, bucket hat, and drop shadow) as the default hero image inside the polaroid card frame, with the toggle button allowing switching to the tech emblem badge.
- **Web Presence & Dev Network (`WebPresenceSection.tsx`, `Footer.tsx`, `FloatingDock.tsx`)**:
  - Nano Banana Pro circular avatar emblem centerpiece with high-contrast dev cards (LinkedIn, GitHub, BugV, LeetCode, Email).
  - Pop Brutalist floating dock with `border-[3px] border-[#111111]` and `shadow-brutal-md`.
  - Massive footer banner with one-click copy email button and running marquee.
- **Interactive Pop Brutalist Backdrop (`AntigravityCanvas.tsx`)**:
  - Replaced soft blurry gradient spheres with a crisp 32px dot-matrix graph paper background and floating Pop Brutalist stamps/stickers (`★ FULL-STACK MERN`, `ACID-SAFE TRANSACTIONS`, `GEMINI AI SDK PRO`, `BUGV CTF 3RD PLACE`, `TU BCA 3.63 CGPA`) with smooth spring mouse parallax.

---

## [0.9.47] - 2026-10-16

### Slower Non-Sequential Letter Drop (O -> U -> S -> N) & Hero SFX Removal
- **Non-Sequential Slower Letter Drop (`HeroSection.tsx`)**:
  - Replaced linear index delays with an asynchronous, non-sequential sequence: **'O'** drops first (`0.15s`), followed by **'U'** (`0.45s`), then **'S'** (`0.75s`), and finally **'N'** (`1.05s`) completing the wordmark.
  - Slowed down spring physics (`stiffness: 38`, `damping: 14`, `mass: 1.8`) to create a heavier, more majestic trajectory and a soft physical bounce upon floor impact.
  - Retained multi-revisit triggers so the non-sequential drop gracefully replays on page reload, tab revisit, window focus, brand click, or scrolling back to top.
- **Removed Hero SFX Audio & Toggle (`HeroSection.tsx`)**:
  - Completely removed the SFX audio toggle button from the navbar.
  - Removed all synthesizer click sound triggers from hero navigation links, CTA buttons, and brand anchors for a silent, distraction-free hero experience.

---

## [0.9.46] - 2026-10-16

### Sky-High SONU Letter Drop, Hero Liveness Enhancements & Project Filter Removal
- **Sky-High Cascading Letter Drop with Multi-Revisit Triggers (`HeroSection.tsx`)**:
  - Re-engineered the "SONU" letter drop animation so each character (`S`, `O`, `N`, `U`) plunges from above the viewport (`y: '-120vh'`) all the way down to its grounded bottom resting position.
  - Removed container clipping so the letters visibly travel across the full hero stage with authentic spring dynamics (`damping: 10`, `stiffness: 75`, `mass: 1.2`) producing a satisfying physical impact and subtle bounce.
  - Implemented multi-revisit triggers (`dropKey` counter with 1-second debounce): replays seamlessly on initial page load, window focus, tab-switching (`visibilitychange`), clicking the "SONU" brand logo, and scrolling away and back up to the hero stage.
- **Hero Section Liveness & Ambient Micro-Interactions (`HeroSection.tsx`)**:
  - **Mouse-Following Spotlight Aura**: Added a smooth spring-lerped radial glow (`smoothX`, `smoothY` with `damping: 28`) that organically follows the cursor across the canvas.
  - **Live Kathmandu Clock & Beacon**: Integrated a real-time ticking Nepal time clock (`UTC+5:45`) and an animated pulsing availability pill (`Available for 2026 Roles`) in the identity eyebrow.
  - **Tactile Sound FX Toggle**: Added a dedicated audio state toggle in the top header (`SFX ON / OFF`) with animated speaker waves and tactile click feedback.
- **Removed Category Filter Bar in Projects (`ProjectsSection.tsx`)**:
  - Completely removed the category pill filter row from the Projects section for a sleeker, unencumbered presentation.
  - Unified grid and cinematic views to stream directly into the full lab projects catalog.

---

## [0.9.45] - 2026-10-16

### Minimal Project Dots Navigation with Sneak Peek & Cascading Hero Wordmark Drop
- **Minimal Project Dots Navigation with On-Hover Sneak Peek (`ProjectsSection.tsx`)**:
  - Replaced bulky 6-thumbnail card grid with a pure minimal, centered floating glass pill navigation dock.
  - Active project indicator smoothly expands into an elongated glowing pill (`w-7 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]`), while inactive dots provide subtle circular targets.
  - Implemented floating micro-preview tooltip cards with spring motion physics (`scale: 0.94 -> 1`, `y: 10 -> 0`) that appear on dot hover.
  - Each sneak peek card displays the project's aspect-ratio screenshot, monospace number & year badges (`01 // 2026`), bold title, and category status dot.
  - Integrated acoustic feedback (`sounds.playHover`, `sounds.playClick`) and minimal keyboard navigation indicator.
- **Cascading Letter Drop Entry for "SONU" Wordmark (`HeroSection.tsx`)**:
  - Transformed the massive static "SONU" backdrop into a dynamic cascading letter drop animation using Framer Motion.
  - Each individual letter (`S`, `O`, `N`, `U`) drops sequentially from above (`y: -140` -> `0`) with staggered timing (`staggerChildren: 0.1`) and spring physics (`damping: 14`, `stiffness: 110`, `mass: 0.8`) creating a subtle bounce.
  - Preserved exact typography scale (`27vw - 32vw`), tight kerning, and dark mode contrast with zero layout shift.

---

## [0.9.44] - 2026-10-16

### Linear/Vercel Asymmetric Bento Grid Refactor for Experience (`JourneyTimeline.tsx`)
- **Strict Anti-AI Design Overhaul**:
  - Eliminated repetitive identical card templates (`[Icon -> Title -> Description -> 2 Checkmarks -> Tech Pills]`).
  - Removed glowing neon borders and boxed icon containers in favor of authentic `1px solid rgba(255,255,255,0.07)` borders, `#090A0F` dark matte surfaces, and top-edge inner highlights (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`).
  - Replaced tech pill overload with refined monospace dot-separated strings (e.g. `Gemini SDK · Node.js · React · MongoDB ACID · Vercel`).
- **Asymmetric 4-Cell Bento Architecture (`grid-cols-1 lg:grid-cols-12 gap-4`)**:
  - **Cell 1 (`lg:col-span-7` — Zidio Development / Full Stack Developer Intern)**:
    - Split internal layout: Left side contains role title, pulsing active production dot, Project LOOP engineering summary, and monospace stack string; Right side features a vertical telemetry stack with large architectural numbers (`<120ms` P99 Latency, `94.2%` VoC Risk Accuracy, `ACID` Concurrency Safety).
  - **Cell 2 (`lg:col-span-5` — BugV National CTF 2026 / Solo 3rd Podium)**:
    - Low-level security terminal card featuring a large `#03` background watermark, realistic terminal window (`$ ./verify_exploit.sh`), and executed exploit traces (`[+] BOLA privilege escalation bypassed`, `[+] JWT signature forgery & LLM delimiter defense`).
  - **Cell 3 (`lg:col-span-5` — Embark Innovation Hackathon / PublicCare)**:
    - Compact architectural card featuring a geospatial radar pulse graphic, `72h Sprint` monospace tag, and a 2-step pipeline diagram (`01. GPS Clustering` -> `02. WebSocket Bids`).
  - **Cell 4 (`lg:col-span-7` — Production Systems & Open Source / 6 Live Platforms)**:
    - 2-column internal layout: Left side highlights Full-Stack Systems Engineer track record; Right side renders an interactive 2x3 "Live Node Matrix" grid displaying the 6 deployed systems (`CricketNepal`, `StudyTrack`, `PublicCare`, `Project LOOP`, `Quizify`, `TravelNP`) with live/design status dots and gateway telemetry.

---

## [0.9.43] - 2026-10-16

### Experience Bento Streamlining, Skills Logos Restoration & Bottom Dock Prominence
- **Streamlined Experience Bento Boxes (`JourneyTimeline.tsx`)**:
  - Significantly reduced the vertical footprint and padding of the Experience bento cards (`p-4 sm:p-5`), creating a tighter, more cohesive grid.
  - Replaced verbose paragraphs and heavy multi-box widgets with compact, high-signal telemetry pills (e.g. `<120ms Latency · 94.2% Risk Acc · ACID Concurrency`).
  - Summarized deliverables into 2 concise, punchy bullet points per card with focused 4–5 technology chips.
  - Removed redundant lower summary strip to reduce visual clutter and keep cards focused.
- **Restored Skills Devicon Brand Logos (`index.html`, `src/index.css`)**:
  - Updated Content Security Policy (CSP) `font-src` directive in `index.html` to permit `https://cdn.jsdelivr.net`, unblocking Devicon font icon loading.
  - Added CSS rules in `src/index.css` preserving full-color brand visibility and dark-mode contrast for monochrome devicons (`nextjs`, `express`, `github`, `vercel`, `bash`).
- **Enhanced Bottom Floating Navbar Prominence (`FloatingDock.tsx`)**:
  - Elevated the bottom dock position (`bottom-6 sm:bottom-7`) with a more substantial, tactile pill silhouette (`px-2.5 sm:px-3.5 py-2 sm:py-2.5`).
  - Strengthened glassmorphism and shadow backdrop (`shadow-[0_20px_50px_rgba(0,0,0,0.2),0_0_35px_rgba(37,99,235,0.18)]` in light mode, `dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(37,99,235,0.25)]` in dark mode).
  - Scaled navigation icons to `w-4 h-4 sm:w-4.5 sm:h-4.5` with enhanced hover states and high-contrast tooltip pills.
  - Added a dedicated, prominent blue "Contact" action pill at the end of the dock with an explicit text label on desktop.

---

## [0.9.42] - 2026-10-16

### Remade Experience Layout (Vibrant Bento Grid Architecture)
- **Completely Redesigned Experience Section (`JourneyTimeline.tsx`)**:
  - Replaced the previous single-column vertical timeline line with an interactive **Vibrant Bento Grid Architecture** matching Projects and Education.
  - **Zidio Development AI Spotlight Bento (Span 8)**:
    - Dedicated role telemetry bar, active internship badge, Google Gemini AI SDK VoC pipeline overview, and multi-turn conversational AI.
    - 4-column metric grid (`<120ms` Token Latency, `94.2%` VoC Risk Accuracy, `ACID` Concurrency Safety, `2 Devs` Core Team).
    - Deliverable checklists, tech chips, and direct links to GitHub and the Project LOOP Archify blueprint.
  - **BugV National CTF Cyber Defense Terminal Bento (Span 4)**:
    - High-contrast cyber terminal aesthetic with verified exploit scanline, command prompts (`./verify_exploit.sh`), and nationwide solo 3rd place podium badge.
    - Exploit & defense chips: BOLA privilege escalation, JWT forgery, and LLM prompt delimiter isolation.
  - **Embark Innovation Hackathon Bento (Span 6)**:
    - PublicCare civic infrastructure mesh, automated GPS radius clustering, and real-time WebSocket contractor tendering room.
  - **Production Systems & Open Source Bento (Span 6)**:
    - 6 live deployed systems overview featuring triple payment gateways (Khalti, eSewa, Stripe in CricketNepal), automated node-cron digests (StudyTrack), and dynamic caching.
  - **Interactive Category Filtering**:
    - Filter pills (`All Roles`, `Applied AI`, `AppSec / CTF`, `Systems & Hackathons`) with audio click feedback (`sounds.playClick`).
  - **Core Specialization Summary Strip**:
    - 3-card bottom strip summarizing Full-Stack MERN, Applied Generative AI, and Application Security competencies.

---

## [0.9.41] - 2026-10-16

### Remade Education Section (Vibrant Bento Standard)
- **Created Dedicated, Unique Education Bento Showcase (`EducationSection.tsx`)**:
  - **Tribhuvan University BCA Rank 1 Spotlight**:
    - Animated SVG circular CGPA dial (`3.63 / 4.00` · 90.75% academic distinction) with glowing Royal Blue gradient stroke.
    - Verified board exam merit badges: Rank 1 in every internal and central board exam, Dean's Honor List across all 8 semesters, and academic gold medal standing.
    - Swoyambhu International College affiliation & Batch 2022-2026 degree status.
  - **Interactive Curriculum Explorer**:
    - 4 selectable pillars: *Systems & Architecture*, *Data & Algorithms*, *Software Engineering*, and *Web & Applied AI*.
    - Displays official course codes (`CSC-204`, `CSC-201`, `CSC-252`, `CSC-401`, etc.), grade achievements, and real-world engineering topics with sound feedback (`sounds.playClick`).
  - **Viswa Niketan Secondary School (+2 / NEB) Foundation Card**:
    - Highlights computer science major, first division standing, procedural C programming, Boolean logic, and relational data basics.
  - **Academic Rigor & Scholarship Metric Cards**:
    - 100% Rank 1 examination streak, academic peer mentorship in Web Architecture, and direct theory-to-production translation.
- **Refined Experience & Journey Architecture**:
  - Streamlined [JourneyTimeline.tsx](file:///e:/codes/PersonalPortfolio/src/components/timeline/JourneyTimeline.tsx) to focus purely on professional internships (Zidio Development / Project LOOP), CTF competitions (BugV 3rd Place), hackathons (Embark Finalist / PublicCare), and production systems.
  - Integrated `#education` anchors across [HomePage.tsx](file:///e:/codes/PersonalPortfolio/src/pages/HomePage.tsx), [HeroSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/hero/HeroSection.tsx) top navbar, [FloatingDock.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/FloatingDock.tsx) (with `GraduationCap` icon), and [Footer.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/Footer.tsx).

---

## [0.9.40] - 2026-10-16

### Projects Section Refinements: Cinematic Default & Minimalist Title
- **Cinematic 3D Perspective Stage as Default**:
  - Configured default `viewMode` in [ProjectsSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/case-studies/ProjectsSection.tsx) to `'stage'`, launching directly into the widescreen 3D perspective flip carousel with auto-advance countdown and thumbnail quick-jump strip.
  - Connected category filter pills to immediately navigate the stage carousel to the first project in the selected category.
  - Enhanced the "Surprise Me" action to automatically jump the stage carousel to the randomly chosen project before launching its architectural blueprint modal.
- **Minimalist, Compact Section Header**:
  - Shortened the title from the previous verbose heading to a clean 1-word heading: `Projects` (`text-2xl sm:text-3xl font-display font-bold`).
  - Simplified the eyebrow pill from `ENGINEERING WORKSPACE // SYSTEM ARCHITECTURES` to a clean `Featured` tag.
  - Streamlined the descriptive subtitle for higher visual breathing room.

---

## [0.9.39] - 2026-10-16

### Color System Elevation: Cyan to Electric Royal Blue / Vibrant Cobalt
- **Eliminated Cyan Accents Across Entire Portfolio**:
  - Replaced all cyan text, badges, borders, icons, and highlights with **Electric Royal Blue / Vibrant Cobalt** (`#2563EB` / `#3074FE` / `blue-600` / `blue-500` / `blue-400`).
  - **Design Rationale**: Matches the signature accent from vibrant.design and top Coolors developer palettes (Cyber-Minimalist / Modern Light), delivering crisp contrast, professional engineering authority, and eliminating harsh neon green/cyan tints.
- **Components Updated**:
  - [ProjectsSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/case-studies/ProjectsSection.tsx): Category pills, project numbers (`01`, `02`), card hover borders, live telemetry status dots, and "Archify Blueprint" text.
  - [HeroSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/hero/HeroSection.tsx): Top navbar brand dot and ambient background glow gradient (`from-blue-500/10 via-indigo-500/5`).
  - [HomePage.tsx](file:///e:/codes/PersonalPortfolio/src/pages/HomePage.tsx): Text selection highlight updated from cyan to royal blue (`selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-300`).
  - [SkillsSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/skills/SkillsSection.tsx): Technical stack header icons, core specialization highlight dots, and gradient heading.
  - [CertificationsSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/certifications/CertificationsSection.tsx): Category pill badges, radial glow background, and ShieldCheck verification icons.
  - [WebPresenceSection.tsx](file:///e:/codes/PersonalPortfolio/src/components/social/WebPresenceSection.tsx): Heading gradient, rotating avatar conic ring, fallback avatar background, and mail icon.
  - [JourneyTimeline.tsx](file:///e:/codes/PersonalPortfolio/src/components/timeline/JourneyTimeline.tsx): AI milestone icons and timeline hover bullets.
  - [CaseStudyModal.tsx](file:///e:/codes/PersonalPortfolio/src/components/case-studies/CaseStudyModal.tsx): Figma action button, metrics tab active state, and CTF takeaway indicator.
  - [FloatingDock.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/FloatingDock.tsx) & [Footer.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/Footer.tsx): Dock contact CTA and footer navigation links.
  - [ConstellationCanvas.tsx](file:///e:/codes/PersonalPortfolio/src/components/common/ConstellationCanvas.tsx): Replaced cyan particle rgba with royal blue (`rgba(37, 99, 235, ...)`).
  - [AntigravityCharacter.tsx](file:///e:/codes/PersonalPortfolio/src/components/hero/AntigravityCharacter.tsx): Ambient background glow, React orb levitation aura, tech badge shadow, and pill text.
  - [Sonu3DWorkstation.tsx](file:///e:/codes/PersonalPortfolio/src/components/hero/Sonu3DWorkstation.tsx): Radial spotlight aura, laptop telemetry icon, and greeting spark icon.
  - [PuzzleSkillsBoard.tsx](file:///e:/codes/PersonalPortfolio/src/components/skills/PuzzleSkillsBoard.tsx): Hint pill pulsating indicator dot.
  - [tailwind.config.js](file:///e:/codes/PersonalPortfolio/tailwind.config.js) & [index.css](file:///e:/codes/PersonalPortfolio/src/index.css): Re-anchored `--primary` and `accent.blue`/`accent.cyan` to `#2563EB` and `#3B82F6`.

---

## [0.9.38] - 2026-10-16

### Visual Design & Projects Section Redesign (Inspired by vibrant.design)
- **Darkened SONU Wordmark in Light Mode (`HeroSection.tsx`)**:
  - Increased light mode opacity of the background `SONU` wordmark from `text-neutral-900/[0.16]` to `text-neutral-900/[0.30]`, dramatically improving contrast, visual weight, and legibility while preserving subtle dark mode balance (`dark:text-white/[0.22]`).
- **Complete Projects Section Redesign Inspired by `vibrant.design` (`ProjectsSection.tsx`)**:
  - **Vibrant Category Filter Pills**: Integrated responsive pill navigation (`All Systems`, `AI Systems`, `Full-Stack MERN`, `Civic Tech & IoT`, `Interactive Web`, `UI/UX Architecture`) with dynamic project count badges and active pill highlighting.
  - **"Surprise Me" Discovery Action**: Added vibrant.design's iconic "Surprise Me" feature, which picks a random project, highlights it with spring physics, and triggers its interactive architectural blueprint.
  - **Dual Presentation Modes**:
    - **Vibrant Bento Grid Feed (Default)**: Multi-column card showcase with 16:10 aspect ratio screenshot previews, top domain badges (`https://...`), live telemetry status chips with pulsing indicators, tech stack chips, and top-right floating quick-action buttons (GitHub, Live URL, Archify Blueprint).
    - **Cinematic 3D Perspective Stage (Toggleable)**: Retained the interactive widescreen 3D perspective flip carousel with auto-advance countdown timer, play/pause toggle, and thumbnail selector strip.
  - **Motion Patterns & Acoustics**:
    - Implemented layout animations with spring physics via `motion/react`.
    - Integrated audio feedback (`sounds.playClick`) on category changes, mode toggles, and modal reveals.
    - Maintained strict zero-emoji engineering standards and TypeScript strict mode.

---

## [0.9.37] - 2026-10-15

### Security, Performance & Codebase Hardening (Audit via `/grill-me`)
- **Email Consistency & Communication Flow**:
  - Unified all portfolio contact points (`ContactModal.tsx`, `WebPresenceSection.tsx`, `profileData.ts`) to `rsonuth789@gmail.com` as the single source of truth, eliminating mismatched recipient addresses.
- **Security & Bundle Optimization (`AppRouter.tsx`)**:
  - Code-split `AdminPage.tsx` using `React.lazy` and `Suspense`, shaving 26 kB off the primary bundle downloaded by regular portfolio visitors.
  - Restricted `/admin` to development mode only (`import.meta.env.DEV`), routing unauthorized production requests directly to `NotFoundPage` to mitigate client-side passkey inspection risks.
- **Security & Rich Sharing Metadata (`index.html` & `public/favicon.svg`)**:
  - Injected strict Content Security Policy (CSP) meta directives covering script, style, font, connect, and framing permissions.
  - Created and linked a bespoke terminal-inspired SVG favicon (`/favicon.svg`), eliminating browser 404 console errors.
  - Added full Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:site_name`) and Twitter Card metadata for rich social previews.
- **Mobile UX & Gesture Navigation (`ProjectsSection.tsx`)**:
  - Added touch swipe gesture detection (left/right swipe) to the 3D perspective projects carousel.
  - Integrated automatic pause-on-touch so mobile and tablet visitors can examine architectural blueprints and code metrics without sudden auto-advance.
- **Dead Code & Asset Purge**:
  - Purged unused `CelestialHorizon.tsx` and unreferenced `celestial_planet_horizon.jpg` asset.

---

## [0.9.36] - 2026-10-15

### Revert & Refinement
- **Reverted Hero Section without Horizon (`HeroSection.tsx`)**:
  - Reverted the hero stage to the clean, typography-led layout without the horizon.
  - Retained the elevated semi-transparent `SONU` wordmark, subtle ambient upper glow, and single/two-line kinetic `SplitText` headline.
  - Preserved the top navbar and ceiling pull-cord (`PullCordTheme.tsx`) completely intact.

---

## [0.9.35] - 2026-10-15

### Visual & Architectural Realization
- **Exact Flagship Celestial Planet Horizon & Hero Composition (`HeroSection.tsx` & `CelestialHorizon.tsx`)**:
  - Implemented the exact composition from the user's reference screenshot:
    - **Realistic Planet Earth Curved Horizon**: Rendered high-definition Earth curvature along the bottom viewport with radiant electric cyan and turquoise atmospheric rim.
    - **Solar Starburst & Lens Flare**: Embedded a brilliant white starburst flare positioned at ~65% across the horizon with anamorphic light rays and glowing coronal stardust.
    - **Behind-the-Horizon "SONU" Wordmark**: Positioned the massive neutral semi-transparent `SONU` wordmark (`z-0`) so its lower half is eclipsed by the planet horizon (`z-10`), while its upper half stands proudly in deep space.
    - **Single-Line Editorial Headline**: Set `Full Stack Developer.` on a single responsive line with kinetic `SplitText`.
    - **Cyan Glow Identity Capsule**: Enhanced eyebrow badge with glowing cyan dot and aura matching the reference.
    - **Strict Preservation**: Maintained the ceiling pull-cord (`PullCordTheme.tsx`) and the top glass capsule navbar completely intact without alterations.

---

## [0.9.34] - 2026-10-15

### Refined & Architectural Polish
- **Monochrome SONU & Elevated Taller Celestial Horizon (`CelestialHorizon.tsx` & `HeroSection.tsx`)**:
  - Eliminated all color flares, radial gradient fills (`skyFlare`, `coreFlare`), and mask rects that caused color bleeding onto the background "SONU" text.
  - Heightened the celestial horizon arc from `h-[150px]-h-[230px]` to `h-[260px]-h-[420px]` with an arched curve (`M 0 380 Q 600 80, 1200 380`).
  - Rendered the horizon as a pure luminous line filament using theme-adaptive monochrome `currentColor` gradients (radiant white in dark mode; deep slate in light mode) with soft bloom and razor-sharp edge filters.
  - Changed stardust particle canvas color to clean monochrome white/slate.
  - Ensured the background `SONU` wordmark remains strictly neutral monochrome with zero color tinting.
- **Black & Grey Circular Backdrop for Lower Website (`AntigravityCanvas.tsx` & `HomePage.tsx`)**:
  - Removed circular backdrop completely from `HeroSection.tsx`, leaving the landing hero clean.
  - Restyled circular floating backdrop in `AntigravityCanvas.tsx` strictly in **black and grey shades** (charcoal, obsidian, smoky zinc, slate, and translucent silver mist).
  - Positioned the monochrome circular backdrop in `HomePage.tsx` across all subsequent sections (`ProjectsSection`, `JourneyTimeline`, `SkillsSection`, `CertificationsSection`, `WebPresenceSection`), setting section backgrounds to `bg-transparent` so the monochrome floating spheres drift gracefully down the page.

---

## [0.9.33] - 2026-10-15

### Added & Refined
- **Overlapping Theme-Colored Circles Backdrop (`AntigravityCanvas.tsx`)**:
  - Implemented large, intersecting circular layers matching user reference geometry with distinct curved boundaries and soft dispersion (`blur-2xl` / `blur-3xl`).
  - Restyled using the portfolio's native brand palette: cyan, deep purple, sky, indigo, and teal (translucent deep aura in dark mode; soft airy pastel tones in light mode).
  - Integrated slow floating sine-wave drift, breathing scale, and interactive spring cursor parallax.
- **Compact Celestial Horizon Arc & Stardust (`CelestialHorizon.tsx` & `HeroSection.tsx`)**:
  - Re-introduced a sleek, compact celestial horizon arc along the bottom viewport (`h-[150px]` to `h-[230px]`).
  - Themed flare and neon horizon filament to cyan/sky/purple/white radiant gradients with stardust particle canvas.
  - Kept all headline, bio, CTA buttons, and elevated `SONU` wordmark layout strictly intact.

---

## [0.9.32] - 2026-10-15

### Added & Refined
- **Fluid Morphing Blurred Shapes Background (`AntigravityCanvas.tsx` & `HeroSection.tsx`)**:
  - Replaced wireframe geometries with GPU-accelerated organic solid blurred shapes (circles, ovals, and fluid droplets) continuously morphing in geometry, scale, and position.
  - **Dynamic Organic Morphing**: Animated continuous `borderRadius` deforming across 5 keyframe sets (`60% 40% 30% 70% / 60% 30% 70% 40%` -> `30% 60% 70% 40% / 50% 60% 30% 60%`, etc.) with continuous scale breathing (`scale: 0.9` to `1.28`).
  - **Luminous Aurora Palette**: Crafted 4 overlapping luminous fluid bodies across cyan/teal, purple/violet, sky/indigo, and soft emerald with deep Gaussian dispersion (`blur-[80px]` to `blur-[150px]`).
  - **Spring-Physics Cursor Parallax**: Integrated smooth spring tracking (`stiffness: 45, damping: 20`) providing responsive organic depth without performance impact.
  - Removed redundant static ambient glow from `HeroSection.tsx`, letting the dynamic morphing blobs serve as the glowing atmosphere.

---

## [0.9.31] - 2026-10-15

### Added & Refined
- **Floating 3D Geometric Shapes Background (`AntigravityCanvas.tsx` & `HeroSection.tsx`)**:
  - Implemented an animated HTML5 Canvas backdrop featuring rotating 3D wireframe polyhedra (cubes, octahedrons, tetrahedrons, icosahedrons, and rings) drifting with weightless zero-gravity sine wave physics.
  - **Dynamic Cursor Parallax & Projection**: Projected 3D vertices using real-time perspective division (`fov: 320`) with smooth mouse-lag parallax tracking that shifts depth layers as the user moves their cursor.
  - **Theme-Reactive Luminescence**: In dark mode, shapes glow with translucent cyan, purple, sky, and emerald edges with specular vertex dots; in light mode, shapes render with crisp, subtle slate and indigo lines.
  - **Ambient Micro-Particles**: Subtle glowing particles drifting upward to emphasize an authentic "Antigravity" engineering atmosphere while keeping foreground copy completely crisp and legible.

---

## [0.9.30] - 2026-10-15

### Added & Redesigned
- **Flagship 3D Perspective Flip Carousel (`ProjectsSection.tsx`)**:
  - Transformed the projects showcase into an interactive auto-advancing carousel modeled after the flagship **Project LOOP** interface.
  - **Dynamic 3D Perspective Transitions**: Utilized CSS 3D perspective (`perspective: 1200px`) with hardware-accelerated rotational flip animations (`rotateY: ±14deg`, `scale: 0.94 -> 1.0`, spring easing `[0.16, 1, 0.3, 1]`) via Framer Motion / Motion.
  - **6-Second Linear Countdown Timer**: Smooth visual progress line indicating time remaining per project, with **automatic pause-on-hover** allowing visitors to read architectural specs without interruption.
  - **Interactive Top Toolbar**: Added play/pause toggle button, active slide counter (`01 / 06`), and manual previous/next chevron navigation controls with sound effects (`sounds.playClick`).
  - **Interactive 6-System Thumbnail Strip**: Responsive miniature card selector below the stage showing real screenshots, system numbers, titles, and live status dots, enabling instant jump to any project.
  - **Full Keyboard Accessibility**: ArrowLeft / ArrowRight navigation and Spacebar play/pause shortcuts.
  - Zero emojis, strict TypeScript types, zero lint errors.

---

## [0.9.29] - 2026-10-15

### Added & Redesigned
- **Hero Section Minimalist Precision (`HeroSection.tsx`)**:
  - Removed the horizontal 3-column credentials strip from the hero stage per user feedback, leaving the hero section pristine, uncrowded, and focused on the primary typography, bio, and magnetic actions.
- **Complete Projects Section Overhaul (`ProjectsSection.tsx`)**:
  - Replaced the constrained 2-column IDE file-explorer layout with an expansive, visually engaging engineering showcase.
  - **Flagship Spotlight Widescreen Showcases**: Spotlighted the top 2 flagship engineering platforms (**Project LOOP** & **CricketNepal**) across full 12-column showcase layouts with browser mockup frames, simulated URL bars, and high-res screenshot previews.
  - **Balanced 2-Column Systems Grid**: Positioned complementary engineering systems (**PublicCare**, **StudyTrack Nepal**, **Quizify**, and **TravelNP**) in a responsive, modern card grid with live status telemetry badges.
  - **Interactive Category Filtering**: Implemented instantaneous domain filtering (`All Systems`, `Applied AI & Cloud`, `Full-Stack MERN`, `Civic & Interactive`) with animated count badges.
  - **Direct Multi-Action Bar**: Integrated instant access to source code on GitHub (`GithubIcon`), live deployments (`ArrowUpRight`), and deep-dive Archify architectural blueprints (`Layers`).
  - Maintained zero-emoji policy, strict TypeScript compliance, and fluid responsive styling.

---

## [0.9.28] - 2026-10-15

### Added & Refined
- **Elevated Backdrop Typography (`HeroSection.tsx`)**:
  - Lifted the giant **`SONU`** background wordmark slightly up (`bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10`) and eliminated clipping offset (`translate-y-0`), allowing the full letters to float comfortably above the screen bezel.
- **Author Identity & High-Value Credential Presentation (`HeroSection.tsx`)**:
  - Integrated an editorial identity kicker introducing **`Sonu Thakur / Full-Stack Engineer & Applied AI Builder`** with an animated pulsing indicator.
  - Rewrote the core value proposition to crisply articulate domain mastery across scalable MERN systems, ACID-compliant backends, and applied AI pipelines (Gemini SDK).
  - Designed an architectural, high-value credential highlight strip with luminous status accents and hairline dividers spotlighting **`Tribhuvan University Topper (BCA Rank 1 · CGPA 3.63)`**, **`BugV CTF 3rd Place (AppSec & Defense)`**, and **`Production Full-Stack (MERN + Applied AI)`** without using pills or emojis.
- **Refined CTA Aesthetics**:
  - Upgraded tactile contrast and backdrop blur on secondary and primary interactive buttons.

---

## [0.9.27] - 2026-10-15

### Changed & Refined
- **Streamlined Hero Layout (`HeroSection.tsx`)**:
  - Removed top "Available for High-Impact Roles" pill badge for an unencumbered, high-impact headline presentation.
  - Removed bottom tech and achievement pill tags ("BCA Rank 1 · TU", "BugV CTF 3rd", etc.) to let the primary value proposition and call-to-action buttons breathe with maximum negative space.
- **Enhanced Dark Mode Typography (`HeroSection.tsx`)**:
  - Increased background display wordmark opacity in dark mode (`dark:text-white/[0.22]`) to provide distinct, elegant visibility on dark backgrounds while maintaining perfect contrast against foreground text.

---

## [0.9.26] - 2026-10-15

### Added & Refined
- **Grounded Bottom Backdrop Typography (`HeroSection.tsx`)**:
  - Re-anchored the giant **`SONU`** display wordmark flush against the bottom edge of the hero viewport (`bottom-0` with `leading-[0.76]`), creating a bold typographic foundation across the screen floor.
- **Clean Ambient Atmosphere (Zero Dots / Grid Noise)**:
  - Removed dots canvas background in favor of an ultra-clean, minimalist ambient gradient vignette.
  - Removed `ConstellationCanvas` from `HomePage.tsx` for a distraction-free, high-end editorial feel.
- **Zero-Emoji Architecture Across All Files**:
  - Audited and eliminated all emojis across `achievementsData.ts`, `JourneyTimeline.tsx`, `Footer.tsx`, `CaseStudyModal.tsx`, `AdminPage.tsx`, and `Sonu3DWorkstation.tsx`.
  - Replaced all visual markers with professional Lucide SVG icons (`Shield`, `Lightbulb`, `CheckCircle`, `MapPin`, etc.) in strict compliance with UI/UX Pro Max standards.

---

## [0.9.25] - 2026-10-15

### Added & Refined
- **Fixed & Elevated Backdrop Typography (`HeroSection.tsx`)**:
  - Elevated the background **`SONU`** wordmark to `top-[35%]` to frame the upper hero stage.
  - Removed all cursor parallax and translation transforms, locking the wordmark completely fixed and static in place.
- **Connecting Dots Network Canvas (`AntigravityCanvas.tsx`)**:
  - Removed background grid lines entirely.
  - Implemented an interactive connecting dots constellation network with proximity line links between floating nodes and reactive cursor tethering.
- **Automated GitHub Pages Deployment Workflow (`.github/workflows/deploy.yml`)**:
  - Added official GitHub Actions workflow to build the production Vite bundle and deploy `dist/` directly to GitHub Pages, resolving the issue where the hosted domain (`sonuthakur03.com.np`) was serving raw uncompiled TypeScript source files.

---

## [0.9.24] - 2026-10-15

### Changed & Refined
- **Hero Section Minimalist Typography Focus (`HeroSection.tsx`)**:
  - Removed the 3D character cutout (`AntigravityCharacter`) to eliminate visual clutter and achieve an unobstructed, editorial visual balance.
  - Enlarged the ghosted background **`SONU`** display wordmark from `26vw` to `35vw` (`text-[30vw] sm:text-[32vw] md:text-[34vw] lg:text-[35vw]`), establishing it as the majestic typographic centerpiece of the hero section.
  - Enhanced 2-axis mouse parallax physics (`backdropX` and `backdropY`), allowing the backdrop wordmark to float responsively in the antigravity canvas environment.
  - Expanded the foreground engineering copy and tech micro-ribbon into an expansive, bold left-anchored layout.

---

## [0.9.23] - 2026-10-13

### Added & Redesigned
- **Hero Section Overhaul (`HeroSection.tsx`)**:
  - Redesigned with guidance from `/frontend-design`, `/gsap-plugins`, `/motion-patterns`, and `/ui-ux-pro-max`.
  - **Kinetic SplitText (`SplitText.tsx`)**: Character-by-character staggered typography for `"Full Stack Developer."` with GPU-accelerated spring physics and subtle initial blur dissipation.
  - **ReactBits-Style Magnetic Interaction (`Magnetic.tsx`)**: Wrapped all primary and secondary CTAs as well as brand logo in spring-physics cursor attraction.
  - **Credential Floating Pills (`AntigravityCharacter.tsx`)**: Integrated floating micro-cards (`BCA Rank 1 · TU Topper` and `BugV CTF 3rd · AppSec`) with 3D translation layers flanking the subject.
  - **Ambient Spotlight & Parallax Watermark**: Interactive radial spotlight aura behind the floating cutout and mouse parallax on the giant ghosted `"SONU"` backdrop wordmark.
  - **Availability Badge**: Pulsing emerald indicator with `Available for High-Impact Roles`.
- **Repository Integration & Push**:
  - Connected and synchronized with `https://github.com/sonuthakur03/personalPortfolio.git`.
  - Resolved merge conflicts, preserved custom domain (`CNAME: sonuthakur03.com.np`), cleaned legacy 2024 static files, and cleanly pushed the modern portfolio.

---


### Added & Enhanced
- **Floating Technology Orbs in Character Palms (`AntigravityCharacter.tsx`)**:
  - Implemented dynamic 3D floating technology badges levitating directly above Sonu's open palms:
    - **Left Hand (Viewer Left)**: Floating spinning cyan **React** atom with glowing radiant aura and glassmorphic badge.
    - **Right Hand (Viewer Right)**: Floating monochrome **Next.js** badge with glowing ambient halo and glassmorphic badge.
    - Both tech orbs float on independent sine-wave levitation loops (`y: [0, -7, 0]`) and tilt in 3D parallax with mouse cursor movements directly in sync with the floating character.
- **Enhanced Background SONU Typography Contrast (`HeroSection.tsx`)**:
  - Darkened the massive ghosted backdrop **`SONU`** display wordmark from `0.045` to `0.14` in Light Mode and `0.035` to `0.12` in Dark Mode, ensuring strong visibility and legibility while maintaining layered architectural depth behind the floating subject.

---

## [0.9.21] - 2026-10-11

### Fixed & Polished
- **Character Dark Mode Alpha Matting & Defringing (`sonu_antigravity_floating.png`)**:
  - Identified root cause of dark mode visual discrepancy: previous naive threshold keyed out white pixels inside the character (causing white raglan shoulder stripes and teeth to become transparent on black backgrounds) and left white perimeter fringing with stray wind marks.
  - Implemented boundary-seeded BFS flood-fill segmentation with perimeter defringing:
    - Preserved 100% solid, opaque white fills on Sonu's raglan shoulder stripes and smile.
    - Completely eliminated edge halos and removed disconnected stray wind markings around the boots.
    - Result: Identical, clean, crisp character rendering across both Light and Dark themes.
- **Antigravity Hero Streamlining (`AntigravityCharacter.tsx`)**:
  - Removed click handler, click counter, audio click triggers, and the "Antigravity ⚡" pop-up spark.
  - Removed all floating clutter widgets (`antigravity.ts` code snippet card, `< MERN + AI />` code tag, and `Antigravity Active` status chip) for a minimalist aesthetic focused purely on the floating subject and typography.
  - Cleaned up ground drop shadow and energy glows for a natural neutral grounding effect in both themes.

---

## [0.9.20] - 2026-10-09

### Added & Delivered
- **Antigravity Hero Section Implementation (`HeroSection.tsx`, `AntigravityCanvas.tsx`, `AntigravityCharacter.tsx`)**:
  - Implemented the full high-fidelity Antigravity UI directly matching the approved mockup:
    - **Antigravity Canvas & Grid Atmosphere (`AntigravityCanvas.tsx`)**: Warm off-white/cream (`#f7f6f2`) in light mode and deep obsidian (`#09090b`) in dark mode, with subtle minimalist grid lines, upward-drifting 3D wireframe cubes, octahedrons, and glowing digital code nodes with mouse velocity repulsion.
    - **Massive Ghosted Backdrop Typography**: Giant ultra-bold, faint-opacity display text **`SONU`** (`text-[22vw]`) spanning the middle-to-back behind the floating character.
    - **Minimalist Top Header**: Clean brand wordmark **`SONU`**, sleek navigation (`About`, `Skills`, `Work`, `Experience`, `Contact`), and a rounded pill CTA button (`Get in touch`).
    - **Lower-Left Typography Hierarchy**: Micro-label **`SONU`**, monumental **`Full Stack Developer.`** headings in heavy dark slate sans-serif, tagline *"Creative developer - AI & web technology"*, and interactive pill action buttons.
    - **Interactive Antigravity Floating Character (`AntigravityCharacter.tsx`)**:
      - Suspended floating Sonu character cutout with his signature light blue bucket hat, black & white athletic raglan shirt, dark cargo pants, and tan-brown trekking boots.
      - Smooth organic floating motion (`y: [0, -22, 0]`) with responsive physics-based floor drop shadow that scales (`scale: [1, 0.82, 1]`) and blurs as he rises and falls.
      - Floating holographic code widgets (mini `antigravity.ts` code snippet card, `< MERN + AI />` badge, and `Antigravity Active` status chip).
      - Real-time 3D cursor perspective tilt and parallax offset via spring physics.
      - Interactive click bounce with audio chime and celebratory sparks (`Antigravity ⚡`).
  - Bundle size optimized from 1,334 kB to 719 kB (46% faster initial load time).

---

## [0.9.19] - 2026-10-09

### Added & Upgraded
- **Ready Player Me Photorealistic 3D Human Avatar Integration (`Sonu3DWorkstation.tsx`)**:
  - Replaced procedural geometric primitives with a **real humanoid 3D model** (`readyplayer.me.glb`) loaded via Three.js `GLTFLoader`:
    - **Anatomical Bone Rigging & Articulation**: Discovered and rigged skeletal hierarchy (`Hips`, `Spine`, `Spine1`, `Spine2`, `Neck`, `Head`, `LeftArm`, `RightArm`, `LeftForeArm`, `RightForeArm`, `LeftUpLeg`, `RightUpLeg`, `LeftLeg`, `RightLeg`).
    - **Real-Time 3D Cursor Tracking via Bone Kinematics**:
      - `Head` bone turns smoothly left/right (`mx * 0.72`), tilts up/down (`-my * 0.42`), and applies subtle lateral tilt (`-mx * 0.08`) tracking user's cursor across the entire screen.
      - `Neck` bone shares 35% of the angular rotation for organic, lifelike articulation.
      - `Spine` executes harmonic sine breathing wave (`Math.sin(elapsedTime * 2.0) * 0.008`) and perspective torso lean.
    - **Facial Morph Targets & Expressions**: Connected `Wolf3D_Head` facial morph target `mouthSmile` (resting friendly smile at 0.35, widening to 0.85 when waving/interacting).
    - **Photorealistic PBR Textures & Sonu Brand Theming**:
      - Light blue bucket hat tinted to `#93c5fd` with custom roughness.
      - Athletic dark raglan top (`#18181b`) and dark cargo bottom (`#27272a`).
      - High-fidelity human skin and facial beard shaders with ACESFilmic tone mapping.
    - **Seated Developer Workstation Stance**: Legs posed under the desk on ergonomic studio chair, left arm on keyboard, and right arm rigged for interactive greeting wave.
    - **Studio 3-Point Lighting**: Warm key directional light with soft shadows, neon rim back light, cursor-following point light, and laptop screen glow illuminating face and hands.
- **Vite & Three.js Optimization (`vite.config.ts`)**:
  - Added `optimizeDeps` for `three` and `three/addons/loaders/GLTFLoader.js` preventing duplicate module instances and ensuring seamless asset bundling.

---

## [0.9.18] - 2026-10-09

### Added & Redesigned
- **Procedural 3D Mesh Workstation Model (`Sonu3DWorkstation.tsx`)**:
  - Implemented a complete 3D Three.js mesh model of Sonu sitting at a developer workstation desk following the visitor's cursor:
    - **Developer Workstation Desk**: Beveled tabletop, 4 cylindrical steel legs, mechanical keyboard, trackpad, pink coffee mug, and glowing laptop with dynamic screen light and pulsing shader glow.
    - **Ergonomic Studio Chair**: High-density cushion, curved backrest, and gas-lift metal post.
    - **Sculpted 3D Sonu Character (from Character Reference Sheet)**:
      - **Signature Light Blue Bucket Hat**: Cylindrical tapered crown, curved dome top, and downward-flared brim (`#93c5fd`).
      - **Black & White Athletic Raglan Shirt**: Jet black athletic fabric with white shoulder stripes and textured chest backpack straps.
      - **Dark Charcoal Cargo Pants & Trekking Boots**: Sitting seated leg geometry with knees bent under the desk and tan brown hiking boots (`#854d0e`).
      - **Facial Hair & Friendly Expression**: Sculpted 3D beard, moustache, warm skin tone (`#c68b59`), and specular eyes.
    - **Real-Time 3D Cursor Tracking**: Head and neck pivot in 3D space (`headGroup.rotation.y = mx * 0.65`, `headGroup.rotation.x = -my * 0.42`), while torso subtly leans and a point spotlight tracks mouse coordinates.
    - **Interactive Gesture & Feedback**: Clicking the 3D model triggers an arm wave animation, audio feedback chime, cycling telemetry status bubbles, and celebratory spark particles.
    - **Ambient 3D Stardust & Holographic Pedestal**: 50 orbiting embers and a slowly rotating ground ring with adaptive dark/light mode shading.
- **Hero Section Layout & Copy Polish (`HeroSection.tsx`)**:
  - Removed "Namaste" greeting and the "~ turning complex problems into elegant software" tagline per user request.
  - Shifted typography firmly to the left side (`lg:col-span-5 text-left`) with giant `Kavivanar` name display and clean bio.
  - Centered the 3D Workstation model (`lg:col-span-7 flex justify-center items-center`) for optimal visual balance.
  - Eliminated dead files (`InteractiveSonuModel.tsx` removed).

---

## [0.9.17] - 2026-10-09

### Added & Delivered
- **Interactive 3D Cursor-Reactive Sonu Character Model (`InteractiveSonuModel.tsx`)**:
  - Implemented the viral cursor-reactive 3D hero model inspired by the Instagram reel reference ([@ovhayee](https://www.instagram.com/reel/Ddy2Ny2oZeG/)) and the user's authentic character sheet (light blue bucket hat, black & white raglan athletic shirt, backpack, cargo pants):
    - **Real-Time 3D Cursor / Head Tracking**: Character head and torso rotate (`rotY`, `rotX`, `rotZ`) and translate in 3D perspective following the visitor's cursor across the screen via smooth spring lerp physics (`Three.js`).
    - **Studio Lighting & Dynamic Specular Cursor Light**: Features directional key light, colored neon rim light, and a dynamic point light that glides across the character following the cursor.
    - **Interactive Click & Pose Switching**: Clicking the character toggles between **Thumbs-Up Wink** (`sonu_thumbs_up.png`) and **Warm Smile** (`sonu_portrait.png`) with tactile audio feedback and celebratory particle effects.
    - **Speech Bubble & Micro-HUD**: Animated floating speech bubble with rotating developer greetings (*"Namaste! Move your cursor to look around ✨"*, *"MERN apps + Applied Gemini AI in production ⚡"*), a 3D cursor-reactive badge, and a manual pose switcher.
    - **Orbiting 3D Stardust Sparks**: 65 floating stardust embers drifting in 3D space with an illuminated holographic ground pedestal.
    - **Seamless Theme Adaptability**: Automatically inverts lighting and glow between Light and Dark modes.
  - Positioned in a balanced 12-column hero layout (`lg:grid-cols-12`) alongside the `Kavivanar` and `Shadows Into Light` typography.

---

## [0.9.16] - 2026-10-09

### Redesigned & Polished
- **Creative Typography Overhaul (`Kavivanar` & `Shadows Into Light`)**:
  - Imported Google Fonts `Kavivanar` and `Shadows Into Light` in `index.html` and mapped `font-kavivanar` and `font-shadows` in `tailwind.config.js`.
  - Re-architected hero typography:
    - Whimsical handwritten greeting in `Shadows Into Light` (*"✨ Namaste, I am"*).
    - Expressive, fluid, sculpted 2-line title in `Kavivanar` (*"Sonu \n Thakur"*).
    - Bio with highlighted keywords in `Kavivanar` (*"Lalitpur, Nepal"*, *"MERN"*).
    - Playful handwritten engineering motto in `Shadows Into Light` (*"~ turning complex problems into elegant software"*).
- **Full Navbar Route Integration (`HeroSection.tsx`)**:
  - Expanded the top navbar to include all portfolio routes and sections:
    - `Work` (`#projects`)
    - `Experience` (`#experience`)
    - `Skills` (`#skills`)
    - `Certifications` (`#certifications`)
    - `Contact` (`#contact`)
    - `Get in touch` (Pill button with interactive modal trigger).
  - Maintained safe clearance margin for the ceiling pull-cord theme switcher.
- **Hero Streamlining & Dead Code Elimination**:
  - Removed the right-side developer terminal card (`HeroTerminalCard.tsx` deleted).
  - Removed the bottom telemetry status bar ("Alive · Available for Roles") for a clean, distraction-free aesthetic.
  - Retained the signature `CelestialHorizon` stardust backdrop and glowing eclipse arc across light and dark modes.

---

## [0.9.15] - 2026-10-09

### Added & Enhanced
- **Creative Hero Typography (Syne Font Family)**:
  - Imported Google Font `Syne` (`wght@700;800;900`) and mapped `font-creative` into `tailwind.config.js`.
  - Upgraded "Sonu Thakur" title with sculptural, avant-garde geometric curves (`font-creative font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[6.8vw] leading-[0.88]`), giving the hero section a creative design studio identity.
- **Right-Side Live Developer Terminal & Telemetry Card (`HeroTerminalCard.tsx`)**:
  - Implemented a floating glassmorphic terminal card on the right side of the hero section:
    - macOS colored window controls and live status pulsing green badge (`Live • 14ms`).
    - Base station telemetry: `📍 Lalitpur, Nepal (27.6674° N, 85.3206° E)`.
    - Primary focus status: `MERN • Gemini VoC • OWASP Security`.
    - Interactive stack chips with hover accent lighting (`React 19`, `Node.js`, `TypeScript`, `MongoDB ACID`, `Gemini AI SDK`, `AppSec / CTF`).
    - 1-Click interactive terminal command box: `$ npx sonuthakur` with audio feedback and copy state animation.
  - Formatted the hero section into a balanced, responsive 12-column grid (`lg:grid-cols-12`).
  - Preserved the signature `CelestialHorizon` stardust canvas and atmosphere glow backdrop.

---

## [0.9.14] - 2026-10-09

### Redesigned & Enhanced
- **Custom Top Navbar (`HeroSection.tsx`)**:
  - Implemented the top navigation header directly modeled after the user's specification:
    - Left side: Prominent brand typography `Sonu Thakur` linking to top with smooth reset.
    - Right side: Clean navigation items `Work` (`#projects`), `Experience` (`#experience`), `Skills` (`#skills`), and a solid pill CTA button `Get in touch` triggering the interactive contact inquiry modal.
    - Preserved generous right-side clearance (`pr-14 sm:pr-20 md:pr-24`) to ensure harmonious coexistence with the ceiling pull-cord theme switcher.
- **Hero Section Text & Layout Alignment**:
  - Maintained the rich `CelestialHorizon` stardust canvas, horizon eclipse arc, and ambient glow backdrop.
  - Replaced center typography with the specified 2-line massive grotesk title:
    ```
    Sonu
    Thakur
    ```
  - Added the exact requested bio copy: *"Full stack developer from Lalitpur, Nepal. I build MERN apps with real payments, real auth and AI features that hold up in production."*
  - Replaced CTA buttons with:
    - Primary Crimson Pill Button: **"See my work"** (smooth scrolls to `#projects`).
    - Secondary Outlined Pill Button: **"GitHub profile"** (external link to GitHub with secure attributes).
  - **Strict Exclusions Enforced**: Strictly omitted the Nepal flag graphic and the 4 bullet points beneath it as requested.
- **Anchor Harmonization (`HomePage.tsx`, `JourneyTimeline.tsx`, `WebPresenceSection.tsx`)**:
  - Added `#experience` anchor alias to `JourneyTimeline.tsx`.
  - Added `#contact` anchor alias to `WebPresenceSection.tsx`.
  - Passed `onOpenContact` prop into `HeroSection` in `HomePage.tsx`.

---

## [0.9.13] - 2026-10-09

### Added & Updated
- **Official Scanned Credentials Integration (`/public/certificates/`)**:
  - Processed and converted 11 authentic scanned credential certificates from the user's archives into clean web-ready RGB JPEG assets:
    1. `IDEAXTrackWinnerScanned.jpeg`: MBMC IdeaX Hackathon 2026 — FinTech Track Winner (Team FinTrace).
    2. `Bugv3rdScanned.jpeg`: BugV Capture The Flag (CTF) — 3rd Position Nationwide Award.
    3. `BCA2ndSemScanned.jpeg`: Tribhuvan University BCA SGPA 3.81 Academic Distinction Grade-Sheet.
    4. `EmbarkHackathonScanned.jpeg`: Embark Community Innovation Hackathon Participation.
    5. `DjangoTrainingScanned.jpeg`: Python with Django 30-Hour Intensive Training (TechAxis & Swoyambhu College).
    6. `UI_UXTrainingScanned.jpeg`: UI/UX Design 30-Hour Professional Course (TechAxis & Swoyambhu College).
    7. `IDEAXParticipation.jpeg`: MBMC IdeaX Hackathon 2026 36-Hour Sprint Participation (Team FinTrace).
    8. `UI_UXworkshopScanned.jpeg`: UI/UX Design Workshop (Swoyambhu International College).
    9. `JSPracticals.jpeg`: Javascript Practicals Crash Course (Udemy / Proper Dot Institute).
    10. `SummerWorkshop.jpeg`: GeeksforGeeks Summer Workshop in Algorithms & Core CS.
    11. `DigitalMarketingScanned.jpeg`: Digital Marketing Workshop (TechAxis & Swoyambhu College).
  - **Strict Cricket Exclusion Rule Maintained**: Explicitly excluded `CricketCollegeScanned.jpeg` as instructed by the user.
- **Interactive Credential Lightbox / Modal (`CertificationsSection.tsx`)**:
  - Implemented high-resolution modal preview on certificate click with backdrop blur, full-bleed image zoom, keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), and next/previous arrows.
  - Added interactive category filter pills (`All`, `Hackathon`, `Security`, `Academic`, `Full-Stack`, `Design`, `Workshop`) with active count badges.
  - Added external verification links for Udemy, BugV, TU, and GeeksforGeeks where applicable.
  - Standardized theme tokens across Light Mode and Dark Mode for high contrast and readability.

---

## [0.9.12] - 2026-10-09

### Added & Redesigned
- **Rameshwar Bhagwat Hero Section Architecture (`rameshwarbhagwat.me` Inspiration)**:
  - **Glowing Celestial Horizon Arc (`CelestialHorizon.tsx`)**: Replicated the signature curved horizon SVG with dual radial sky/core gradients (`#d35400`, `#ff9100`, `#ff3c00`), soft and line Gaussian blur filters, and multi-layered glowing arc strokes.
  - **Ambient Stardust Canvas**: Added interactive twinkling stardust particle animation across the upper atmosphere with twinkle phase oscillation.
  - **Corner Technical Annotations**: Added high-precision technical telemetry badges in the top-left and bottom-right corners (`SONU THAKUR • ARCHITECTING MODERN, SCALABLE FULL-STACK & APPLIED AI SYSTEMS WITH PRECISION LOGIC`).
  - **Massive 3-Line Kinetic Title with Alternating Inline Badges**:
    - Line 1: `AI & WEB` + Inline interactive GitHub badge.
    - Line 2: Inline interactive LinkedIn badge + `SOFTWARE`.
    - Line 3: `DEVELOPER` + Inline interactive Email badge.
    - Features large-scale editorial grotesk typography (`text-[7.4vw] font-black leading-[0.92]`) with subtle glow and masked gradient bottom fade.
  - **Glowing "View Resume" CTA Button**:
    - Integrated glowing sweep-light pill button linking directly to `/Sonu_Thakur_Resume.pdf` with animated directional arrow.
    - Copied Sonu's verified CV to `public/Sonu_Thakur_Resume.pdf`.
    - Secondary "Explore Systems" action button scrolling to `#projects`.
  - **Live Kathmandu Clock Telemetry**: Maintained real-time live UTC+5:45 clock status badge.

### Cleaned & Refactored (DRY & Dead Code Removal)
- **Dead Code Purge**:
  - Removed unreferenced `ProjectCard.tsx` (23 KB dead code from previous card grid).
  - Removed deprecated `src/components/security/` (`SecuritySection.tsx`, `CTFTerminal.tsx`).
  - Removed deprecated `src/components/ai-counterparts/` (`AICounterpartsSection.tsx`).
  - Removed deprecated `src/components/common/Navbar.tsx`.
  - Removed unused `src/layouts/RootLayout.tsx` and `src/components/Layout/` (`Header.tsx`, `FooterBelt.tsx`).
  - Removed empty 0-byte directories and files (`src/components/UI/`, `src/store/`, `src/hooks/`).
  - **Performance Impact**: Reduced client production bundle size from 1,236 kB down to 705 kB (-531 kB / -43%)!
- **DRY Principles Applied**:
  - Centralized all brand and action icons in `src/components/common/BrandIcons.tsx` (`GithubIcon`, `LinkedinIcon`, `MailIcon`, `ExternalLinkIcon`, `ArrowRightIcon`, `FileTextIcon`).
  - Eliminated duplicate inline SVGs and standardized audio feedback helpers.

---

## [0.9.11] - 2026-10-08

### Added & Enhanced
- **Interactive Ceiling Pull-Cord Theme Switcher (`abdulrehmanwaseem.me` Inspiration)**:
  - Installed and integrated the `pullcord` package with physics-based rope pulling, spring inertia, and dynamic cord state (`<PullCordTheme />`).
  - Added the exact curved Bézier arrow and handwritten **"pull the cord!"** annotation using Google Font `Caveat`.
  - Added mechanical click sound effect (`sounds.playClick(920)`) upon pulling the cord.
  - Positioned fixed at the top right of the viewport (`--pullcord-right: 3.5rem; --pullcord-top: 0px; --pullcord-z: 45`).
- **Harmonized Light & Dark Mode Color Palette**:
  - **Light Mode**: Pure crisp white (`#ffffff`), deep charcoal text (`#09090b`), zinc-200 hairlines (`#e4e4e7`), elevated zinc surfaces (`#f4f4f5`), and light blueprint grid.
  - **Dark Mode**: Pure pitch black (`#000000`), zinc-100 text (`#f4f4f5`), zinc-800 hairlines (`#27272a`), deep surfaces (`#09090b`), and dark blueprint grid.
- **Dynamic 3D ASCII Panda Mascot Inversion (`AsciiPandaCanvas.tsx`)**:
  - Canvas background seamlessly flips between `#ffffff` (light mode) and `#000000` (dark mode).
  - Real-time ASCII luminance rasterizer dynamically inverts glyph density in light mode: black fur (ears, eye patches, nose, limbs) is rendered with dense dark ink glyphs (`@ # % 8 &`), while white fur (face, head, belly) is rendered with subtle contour glyphs (`. : - = +`).
- **Floating Dock Theme Toggle (`FloatingDock.tsx`)**:
  - Added a responsive Sun/Moon theme toggle button to the bottom dock for quick access across mobile and desktop.
- **Section-Wide Semantic Color Token Refinement**:
  - Updated `HeroSection.tsx`, `ProjectsSection.tsx`, `SkillsSection.tsx`, `CertificationsSection.tsx`, and `WebPresenceSection.tsx` to automatically adapt between crisp light mode and deep pitch-black dark mode.

---

## [0.9.10] - 2026-10-08

### Changed & Streamlined
- **Project Showcase Photos (`LabProjectVisual.tsx`)**:
  - Replaced text-only schematic mockups with high-resolution, actual project photos (`Loop.png`, `CricketNepal.png`, `PublicCare.png`, `StudyTrack.png`, `QuizBizz.png`, `TravelNP.png`).
  - Implemented Swiss engineering workbench framing with CAD corner crosshairs `+`, hover zoom transitions (`group-hover:scale-105`), subtle lighting vignettes, tech stack pills, and live deployment telemetry.
- **Top Navbar Removal (`HomePage.tsx`)**:
  - Removed persistent top sticky floating navbar (`<Navbar />`), ensuring only the bottom floating navigation dock (`FloatingDock.tsx`) provides site-wide page navigation.
- **Section Streamlining**:
  - **Removed AI Counterparts (`AICounterpartsSection.tsx`)**: Unmounted from `HomePage.tsx`.
  - **Removed Applications & Security CTF Lab (`SecuritySection.tsx`)**: Unmounted the CTF writeups and interactive CTF terminal from `HomePage.tsx`.
- **Navigation & Footer Updates**:
  - **Floating Dock (`FloatingDock.tsx`)**: Removed `ai-systems` and `security` navigation items and scroll spy tracking.
  - **Footer (`Footer.tsx`)**: Updated engineering proof links to point to Career Journey (`#journey`) and Technical Skills (`#skills`); replaced terminal icon with code symbol.
- **Newari Greeting in Preloader (`LanguagePreloader.tsx`)**:
  - Added the traditional Newari (Nepal Bhasa) greeting **"ज्वजलपा"** (*Jwajalapa*) to the multi-language greeting sequence on initial site boot, celebrating Kathmandu Valley's heritage alongside Nepali and global greetings.

---

## [0.9.9] - 2026-10-08

### Changed & Retained
- **Hero Section Preservation & Pure Black Theme Harmonization**:
  - **Preserved Hero Section (`HeroSection.tsx`, `AsciiPandaCanvas.tsx`)**: Kept the full 3D interactive ASCII Panda mascot canvas, mouse/head tracking, physics rotation, and minimalist black header with quote and live Kathmandu clock.
  - **Reverted Portfolio Sections to Original Architecture**:
    - **Developer Laboratory Projects (`ProjectsSection.tsx`)**: Restored the 2-column workstation layout with vertical project index, interactive CAD workbenches, 3D tilt, and GetLayers lighting.
    - **Skills & Core Competencies (`SkillsSection.tsx`)**: Restored the comprehensive skill filters and verified CV stack cards.
    - **Certifications & Milestones (`CertificationsSection.tsx`)**: Restored accredited milestone cards with credential verification links.
    - **Security & CTF Lab (`SecuritySection.tsx`)**: Restored the interactive BugV CTF terminal and defense vectors.
    - **AI Systems Taxonomy (`AICounterpartsSection.tsx`)**: Restored the comparative benchmark simulator.
    - **Career Journey (`JourneyTimeline.tsx`)**: Restored milestone badges and academic topper recognition.
    - **Web Presence (`WebPresenceSection.tsx`)**: Restored interactive social profile cards.
    - **Interactive Backdrops & Docks**: Restored `ConstellationCanvas.tsx` and `FloatingDock.tsx`.
    - **Persistent Navbar & Footer (`Navbar.tsx`, `Footer.tsx`)**: Restored full brand identity and navigation controls.
  - **Theme Update (`src/index.css`)**:
    - Harmonized dark mode `--background` to pure pitch black `#000000` (matching the hero section) with deep zinc surfaces (`--surface: #09090b`, `--elevated: #121215`, `--border: #27272a`).

---

## [0.9.8] - 2026-10-08

### Added & Redesigned
- **Adithya Krishnan-Styled Hero Section & Interactive ASCII Panda Mascot (`HeroSection.tsx`, `AsciiPandaCanvas.tsx`)**:
  - Re-engineered the hero section to match the minimalist pure-black (`#000000`) editorial design inspired by `adithyakrishnan.com`.
  - **Top Navigation Bar**:
    - Left brand mark: `Sonu` (minimalist lowercase tracking).
    - Right quick links: `github`, `linkedin`, `email`, and command palette trigger `[ ⌘K ]` with hairline borders.
  - **3D ASCII Panda Mascot Canvas (`AsciiPandaCanvas.tsx`)**:
    - Replaced the ghost mascot with a procedural 3D panda built using Three.js (round ears, angled dark eye patches, catchlight pupils, snout, body, arms, sitting legs, and bamboo shoot).
    - Real-time offscreen luminance downsampling converting WebGL pixel buffers to crisp monochrome ASCII glyphs (`" .·:+=*#"`) drawn onto a responsive 2D canvas.
    - Interactive physics: Head & body cursor tracking, smooth drag-to-rotate inertia, natural breathing/floating motion, ear wiggles, and procedural eye blinks every 3-4s.
  - **Editorial Typography**:
    - Hero statement: *"I’m Sonu — a Full-Stack & Applied AI Software Engineer, building for the web, cloud, and everything in between."*
    - Edward Elric quote block: *"Like I always say, can't find a door? Make your own."*
  - **Status Footer**:
    - Live Kathmandu time (`HH:MM:SS NPT`) with pulsing emerald beacon (`Alive · Available for Roles`).
    - Subtitle: `Software Engineer · Tribhuvan University · Kathmandu, Nepal`.
    - Minimal scroll-down trigger (`↓`) smoothly linking into the Developer Laboratory projects section.
  - **Scroll Synchronized Navbar (`Navbar.tsx`)**:
    - Header starts hidden at top of viewport for an uncluttered hero experience and smoothly transitions in when the user scrolls past the hero section.

---

## [0.9.7] - 2026-10-08

### Added & Redesigned
- **Developer Laboratory & Engineering Workspace (`ProjectsSection.tsx`, `LabProjectVisual.tsx`, `labProjectsData.ts`)**:
  - Transformed the projects showcase into a **Developer Laboratory / Engineering Workspace** following Swiss graphic design principles, technical documentation hierarchy, and minimal engineering aesthetics.
  - **Header Hierarchy**: Clean architectural heading `PROJECTS / SELECTED WORK` with subtitle `A selection of systems, experiments, and products I've designed and built.`
  - **Two-Column Desktop Workstation Layout**:
    - **Left Column — Project Index**:
      - Vertically stacked index with hair-line dividers (`border-b border-zinc-800`).
      - Projects numbered `01` to `06` with project name, year, domain, and short summary.
      - Active item highlighted with high-contrast typography, status indicator dot `●`, and subtle status marker.
      - Smooth hover and keyboard arrow navigation (`↑`/`↓`, `Enter` for Archify blueprint) with soft Web Audio mechanical feedback.
    - **Right Column — Interactive Laboratory Workbench Preview**:
      - Large inspection canvas framed with CAD corner crosshairs `+`, system header (`SYSTEM: [NAME] / WORKBENCH`), build identifiers, and blueprint grid background.
      - Project-specific realistic schematics:
        - `PROJECT LOOP`: Gemini AI VOC ingestion pipeline, ACID replica session locks, rate-limited proxy perimeter, and query terminal.
        - `CRICKETNEPAL`: Atomic inventory mutex counter (`MUTEX ACTIVE: ZERO OVERSELL`), tri-gateway payment router, and Cloudinary CDN pipeline.
        - `PUBLICCARE`: 2dsphere geospatial cluster radar, automated tender escalation, and Socket.io bi-directional bidding stream.
        - `STUDYTRACK NEPAL`: 14-day streak evaluation, node-cron 09:00 AM daemon state, and Nodemailer SMTP digest dispatch.
        - `QUIZIFY`: Security-hardened client engine, DOMParser XSS-safe pipeline, and duplicate-proof session token management.
        - `TRAVELNP`: Dual-persona user flow specification (tourist explorer vs hotel self-registration) and geo-proximity mapping.
      - Unobtrusive custom cursor badge: `[LIVE SYSTEM ↗]`, `[FIGMA SPEC ↗]`, or `[INSPECT REPO ↗]` following mouse coordinates over the preview canvas.
      - Technical metadata Swiss grid: `TYPE`, `ROLE`, `STACK` (plain text with `·` dividers, zero colorful pill badges), and `YEAR`.
      - Technical action bar: `[SOURCE CODE ↗]`, `[LIVE DEPLOYMENT ↗]`, and `[SYSTEM BLUEPRINT ↗]` (linking directly to interactive Archify modals).
  - **Mobile Responsive Stream**:
    - Re-architected mobile experience into a clean sequential stream where each project features its index number, title, technical preview frame, summary, metadata grid, and action buttons separated by hairline dividers.

---

## [0.9.6] - 2026-10-08

### Added & Redesigned
- **Oluwatobi Oluwafemi Dribbble Portfolio Projects Redesign (`ProjectsSection.tsx`, `ProjectCard.tsx`)**:
  - Implemented the exact design language, layout, and visual rhythm of the reference shot ([Dribbble #25788866](https://dribbble.com/shots/25788866-Portfolio-Website-UI-Design)).
  - **Dribbble Header Hierarchy**: Elegant `Featured Projects` typographic treatment (subtle muted `Featured` paired with bold high-contrast `Projects`), `Recent Works` uppercase sub-lead, and interactive GSAP Flip-animated category pill filters.
  - **2-Column Framed Device Mockup Grid**:
    - High-contrast rounded cards (`bg-[#0f111a]`, `border-white/10`) featuring top project title, role subtitle, and category pills.
    - Framed realistic device/UI mockup canvas (`aspect-[16/10]`) tailored for each of Sonu's projects:
      - **Project LOOP**: Gemini 1.5 Pro AI voice-of-customer analytics dashboard, latency telemetry, and interactive sentiment widget.
      - **CricketNepal**: Full-stack MERN eCommerce storefront with bat gear cards, stock mutex reservation tag, and tri-gateway checkout badges.
      - **PublicCare**: Civic Tech GPS civic complaint map, real-time WebSockets tender bidding desk, and road hazard reporting.
      - **StudyTrack Nepal**: 14-day study streak flame HUD, node-cron automated email digests, and BCA syllabus progress tracker.
      - **Quizify**: Real-time multiplayer trivia battle arena with sanitization engine and XSS-safe DOM parser.
      - **TravelNP**: Dual-persona Figma UX prototype with trekking package booking and guide verification.
    - Bottom action row with technology stack tags and direct outbound links (`Code`, `Live`, `Figma`, `Blueprint`).
    - Centered "View All Projects" pill button with arrow micro-interaction.
  - **Dedicated "Projects Showcase" Deep-Dive Case Study Panel**:
    - Top visual hero banner pairing large editorial typography (`PROJECT LOOP SYSTEM ARCHITECTURE`), architecture badges (`ROLE`, `SAFETY: ACID COMPLIANT`, `TIMELINE`), and an elevated 3D framed device mockup.
    - Bottom details panel with boxed architecture & system impact description, 4-column metadata grid (`Category`, `Timeline`, `Security`, `Deployment`), and primary action triggers.
    - Interactive synchronization: clicking any card in the Featured Projects grid dynamically updates the deep-dive showcase with that project's architecture, security highlights, and Archify blueprint modal trigger.

---

## [0.9.5] - 2026-10-08

### Changed
- **Restored Aakarsh DevHQ Signature Skills Grid on Website (`SkillsSection.tsx`)**:
  - Replaced the experimental puzzle board on the live website with the direct, high-impact 6-column **Liquid Wave Card Grid** inspired by Aakarsh DevHQ.
  - Interactive category pill filters (`All Stack`, `Languages`, `Frontend`, `Backend`, `Databases`, `AI & Security`, `Tools & DevOps`) with dynamic skill count badges and audio click feedback.
  - Interactive liquid wave hover animation (`animate-[skillWave_6s_linear_infinite]`), cyan status dots for core CV specializations, large Devicon brand icons, bold titles, and styled proficiency level badges.
- **Preserved Puzzle Board Code in Repository**:
  - Retained `PuzzleSkillsBoard.tsx`, `puzzleSkillsData.ts`, and `jigsawGeometry.ts` intact in the codebase for modular reuse or standalone demonstration.
- **100% Authentic Skills from Sonu Thakur's CV (`skillsData.ts`)**:
  - Enriched catalog with all verified technologies and domains directly from `Sonu_Thakur_CV_2page.pdf`:
    - **Languages**: JavaScript (ES6+), TypeScript, Python (Django 30h Certified), Java (TU BCA), C / C++, PHP.
    - **Frontend**: React 19, Next.js, Tailwind CSS, HTML5 & CSS3, Figma UI/UX (30h Certified).
    - **Backend**: Node.js, Express.js, Django (30h Certified), .NET Framework, REST APIs, JWT Auth & RBAC, WebSockets (Socket.io), Tri-Gateway Payments (Khalti, eSewa, Stripe).
    - **Databases**: MongoDB (Mongoose & ACID), MySQL, Prisma ORM, DBMS Fundamentals & Relational Normalization, PostgreSQL, Redis Streams.
    - **AI & Security / CS**: Google Gemini AI SDK (Project LOOP), Claude & Antigravity Tooling, BugV CTF Solo 3rd Place Podium, Application Security (OWASP Defense), Data Structures & Algorithms (TU Rank 1).
    - **Tools & DevOps**: Git & GitHub, Cloudinary Media API, Postman, Linux OS, Vercel & Render, Docker.

---

## [0.9.4] - 2026-10-08

### Enhanced
- **Massively Expanded 160px Puzzle Board Geometry (`PUZZLE_PIECE_SIZE = 160`)**:
  - Increased individual piece grid units from `120px` to **`160px`**, expanding the total assembled grid from `480x480` to **`640x640`** (+78% interior surface area per card).
  - Scaled showcase board wrapper to **`max-w-[1240px]`** on desktop, maximizing visual scale and dramatic prominence.
  - Recalibrated SVG viewBox to `viewBox="-100 -100 840 840"` with `PUZZLE_COLS * PUZZLE_PIECE_SIZE` dynamic bounding guides, ensuring 76% of the SVG viewport is occupied by the assembled board with zero edge clipping.
- **Crystal-Clear Card Interior (Zero Badge Overlap)**:
  - Eliminated any cramped internal badge text from inside the card; cards now feature an oversized brand icon (`text-4xl sm:text-5xl md:text-6xl`) and crisp, bold technology name (`text-sm sm:text-base md:text-lg font-extrabold text-white`).
- **Precision Floating Cursor Follower HUD (`PuzzleSkillsBoard.tsx`)**:
  - Engineered hardware-accelerated cursor follower powered by `gsap.quickTo` (`x`, `y` with 0.16s fluid spring inertia).
  - Implemented smart viewport boundary flipping (`getBoundedCursorPos`), flipping horizontally and vertically when nearing screen edges so the floating HUD is never clipped or occluded.
  - Rich glassmorphic HUD badge displays glowing Devicon icon, technology name, styled proficiency level pill (`Intermediate`, `Advanced`, `Production`, `National 3rd`), category/experience, architectural role from Sonu's CV, and associated portfolio projects.
  - Zero React transform collisions: removed inline transform styles from JSX to guarantee continuous 120fps tracking without flickering.

---

## [0.9.3] - 2026-10-07

### Added
- **Enlarged Puzzle Board Canvas (`PuzzleSkillsBoard.tsx`)**:
  - Expanded puzzle wrapper container width up to **`max-w-[1040px]`**, giving the 4x4 matrix maximum physical presence and visual grandeur across desktop viewports.
- **Crystal-Clear Card Typography (Zero Badge Overlap)**:
  - Removed internal level badges ("intermediate/advanced") from inside the puzzle cards to completely eliminate text collision.
  - Cards now dedicate 100% of their interior space to a large, vibrant Devicon brand icon (`text-4xl md:text-5xl`) and bold, high-contrast technology name (`text-sm sm:text-base font-bold text-white`), ensuring complete legibility from any distance.
- **Dynamic Floating Cursor Tooltip (Mouse Follower)**:
  - Implemented high-performance GSAP `quickTo` cursor tracking that smoothly floats a sleek, glassmorphic HUD badge right beside the mouse cursor when hovering over any piece.
  - Cursor tooltip reveals the technology icon, bold name, colored level badge (e.g. `Intermediate`, `Advanced`, `Production`), and category/experience breakdown with zero latency.

---

## [0.9.2] - 2026-10-07

### Added
- **Real Verified Skills Directly from Sonu's CV (`puzzleSkillsData.ts`, `skillsData.ts`)**:
  - Extracted authentic skills from `Sonu_Thakur_CV_2page.pdf` (Tribhuvan University Rank 1, Zidio Development, BugV CTF 3rd Place):
    - *Row 0 (Languages & Frontend)*: JavaScript (ES6+), React 19, Next.js, Tailwind CSS.
    - *Row 1 (Backend & Frameworks)*: Node.js, Express.js, Django (30h Certified), .NET Framework.
    - *Row 2 (Databases & APIs)*: MongoDB (ACID), MySQL, Prisma ORM, REST APIs & JWT Auth.
    - *Row 3 (AI, Security & Core)*: Python, Java & C, Google Gemini AI SDK (Project LOOP), AppSec & BugV CTF (Solo 3rd Podium).
  - Also added `.NET` and `Khalti / eSewa / Stripe Payment Gateways` to the comprehensive 28-technology catalog.
- **Ultra-Sensitive Bi-Directional Scroll Scrub (`PuzzleSkillsBoard.tsx`)**:
  - Tightened GSAP `ScrollTrigger` scrub response from `1.2` down to **`0.35`**, giving instant, responsive tactile feedback to even subtle wheel notches or trackpad gestures.
  - Adjusted trigger thresholds (`top 85%` to `center 45%`) so pieces begin converging the moment the section enters the viewport.
- **Cinematic 3D Perspective & Tumbling Motion Effects**:
  - Added full 3D perspective (`perspective: 1200px`) and non-linear multi-axis tumbling vectors (`scatterZ`, `scatterRotX`, `scatterRotY`, `scatterRotZ`) so pieces dynamically tumble through 3D space before flattening into the 2D plane as they interlock.
  - Interactive 3D mouse parallax tilt on the puzzle board (`rotateX`, `rotateY` tracking cursor offset).
  - Dynamic ambient lighting behind the puzzle that scales, sharpens, and transitions hues in real time according to scroll progress.
- **Reverted Constellation Nodes to Original Settings**:
  - Restored subtle background opacity (`60%`) and balanced particle count (95) on `ConstellationCanvas.tsx`.
  - Re-applied `bg-background` to sections, preserving the original dark aesthetic without bleeding over other sections.

---

## [0.9.1] - 2026-10-07

### Added
- **Full-Page Constellation Canvas Backdrop (`ConstellationCanvas.tsx`, `HomePage.tsx`)**:
  - Converted opaque section backgrounds (`SkillsSection`, `ProjectsSection`, `CertificationsSection`, `WebPresenceSection`) from `bg-background` to `bg-transparent`.
  - Elevated particle density (`particleCount = 135`), boosted canvas opacity to `85%`, and increased connection filament alpha so glowing constellation nodes and cursor links float seamlessly across the entire page from top to bottom.
- **Cinematic Large-Scale Puzzle Redesign (`PuzzleSkillsBoard.tsx`, `SkillsSection.tsx`)**:
  - **Removed Test Interface Elements**: Completely removed the upper manual scrub slider, test mode buttons ("Snap Lock", "Scatter", "Sync Scroll"), and status indicator.
  - **Removed Right Sidebar**: Eliminated the 4-column side inspector panel, allowing the puzzle to expand to full width as the undisputed centerpiece.
  - **Big Centered Board**: Scaled the puzzle canvas to `max-w-[840px]` with high-impact SVG viewBox and deep radial spotlight glow.
  - **Skill Name on Hover**: Focused exclusively on the skill icon and name. Each piece displays a prominent technology icon (`text-4xl md:text-5xl`), and hovering over a piece dynamically scales it, lifts it above neighboring edges, activates a brand-color neon drop shadow, and reveals an elegant floating HUD badge with the skill name and proficiency level.

---

## [0.9.0] - 2026-10-07

### Added
- **Interlocking Jigsaw Puzzle Skills Showcase (`PuzzleSkillsBoard.tsx`, `jigsawGeometry.ts`, `puzzleSkillsData.ts`)**:
  - **Scroll-Tied Scrub Animation**: Integrated GSAP `ScrollTrigger` with `scrub: 1.2`, providing a bi-directional scrub where scrolling down converges scattered puzzle pieces into a solid, connected 4x4 square, and scrolling up scatters them outward into space (*"scroll a little, add a little and vice versa"*).
  - **Zero-Gap Jigsaw Geometry Math**: Built cubic-bezier mathematical edge generator (`createJigsawEdge`, `generateGlobalPiecePath`) guaranteeing complementary interlocking between adjacent tabs (+normal) and holes (-normal), while creating razor-flat external borders for the assembled square.
  - **4x4 Core Architecture Matrix (16 Technologies)**:
    - *Row 0 (Frontend)*: TypeScript, React 19, Next.js, Tailwind CSS.
    - *Row 1 (Backend & Realtime)*: Node.js, Express.js, FastAPI / REST, WebSockets.
    - *Row 2 (Persistence & DevOps)*: MongoDB, PostgreSQL, Redis Streams, Docker.
    - *Row 3 (AI, Security & Automation)*: Python, Gemini AI SDK, BugV CTF (3rd), Git & GitHub.
  - **Interactive Controls & Inspector HUD**:
    - Interactive scrub slider for manual dragging between 0% (Scattered) and 100% (Locked).
    - Quick "Scatter Pieces" and "Snap Lock" buttons with back-easing spring physics.
    - Dynamic status indicator with connection ratio counter.
    - Interactive Inspector Card displaying the selected piece's system architecture role, experience rating, and direct links to corresponding case study projects.
    - Category highlight filters (Frontend, Backend, Databases, AI & Security).
  - **Tactile Audio Feedback**: Integrated Web Audio API synthesized sound cues (`playHover()`, `playClick()`, and `playSuccess()` celebration chime upon 100% snap lock).
- **Hybrid Skills Layout (`SkillsSection.tsx`)**:
  - Features the scroll-scrubbed jigsaw puzzle matrix as the hero interactive centerpiece, paired with an expandable 28-technology inventory featuring liquid wave cards.

---

## [0.8.0] - 2026-10-07

### Added
- **Saad Arqam Inspired Creations Showcase (`ProjectsSection.tsx`, `ProjectCard.tsx`)** *(modeled after `saadarqam.vercel.app/projects`)*:
  - **Editorial Header**: Bold title `Creations` paired with the Japanese Kanji subtitle `「創造は魂の言語」` (*"Creation is the language of the soul"*), accompanied by an ambient spotlight glow.
  - **3-Column Asymmetric Bento Grid**: Mathematical distribution (`2+1`, `1+2`, `2+1` span pattern) across 6 engineering projects using `aspect-[2/1]` on wide cards and `aspect-square` on single cards.
  - **Full-Bleed Visual Schematics**: Custom visual backdrops for each project:
    - *Project LOOP*: Gemini 1.5 Pro VOC pipeline flow diagram with zero-loss queue and MongoDB replica ACID indicator.
    - *CricketNepal*: 3-gateway payment router telemetry (Khalti, eSewa, Stripe) and active stock mutex lock.
    - *PublicCare*: 2dsphere geo-proximity triage with active socket radar animation.
    - *StudyTrack*: Node-cron timezone streak synchronizer and email digest dispatch monitor.
    - *Quizify*: DOMParser XSS-free trivia state machine with session token tracker.
    - *TravelNP*: Interactive dual-persona hotel onboarding and guide escrow prototype.
  - **Floating Glassmorphic Bottom Drawer**: Bottom drawer (`backdrop-blur-md`, `border-white/10`) with smooth hover slide-up transition (`translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100` on desktop, always visible on mobile).
  - **Interactive Action Links**: Direct links to GitHub repositories, live deployments, and modal trigger for deep Archify interactive architecture blueprints.
- **Synthesized Audio Interaction (`soundEffects.ts`)**:
  - Added lightweight Web Audio API `playHover(freq = 750)` method providing micro-tactile sound feedback when hovering over creation cards.

---

## [0.7.0] - 2026-10-07

### Added
- **Interactive Technical Skills Grid (`SkillsSection.tsx`)** *(directly inspired by `aakarsh-devhq.vercel.app`)*:
  - Category pill filter bar (`All`, `Languages`, `Frontend`, `Backend`, `Databases`, `AI & Security`, `Tools`) with smooth scale and glow states.
  - 5-column responsive grid featuring 28+ battle-tested technologies.
  - Signature liquid wave hover animation (`@keyframes skillWave`) that fills cards from the bottom with rotating dynamic bezier geometry.
  - Devicon colored branding icons with smooth elevation transitions.
- **Certifications Showcase Section (`CertificationsSection.tsx`)** *(directly inspired by `aakarsh-devhq.vercel.app`)*:
  - 3-column responsive grid displaying verified credentials (BugV CTF 3rd Place, TU Rank 1, Zidio AI, OWASP AppSec, MERN, Civic Tech).
  - 16:9 aspect image wrapper with dark blur hover overlay and animated sweep-light "View Credentials" pill buttons.
  - Strongly-typed `src/types/certificates.ts` and `src/data/certificatesData.ts`, plus `/public/certificates/` picture upload directory with automatic cryptographic badge fallback.
- **Web Presence & Dev Network Section (`WebPresenceSection.tsx`)** *(directly inspired by `aakarsh-devhq.vercel.app`)*:
  - Floating circular avatar (`@keyframes floatProfile`) with animated rotating conic-gradient border (`@keyframes rotateBorder`).
  - Interactive profile cards (LinkedIn, GitHub, BugV CTF, LeetCode, Direct Email) with 3D Y-axis flip icon animation (`rotateY(360deg)`).
  - Continuous gradient text shimmer footer note.
- **Navigation Integration**:
  - Added direct links to `#certifications` and `#profiles` in `Navbar.tsx`, `FloatingDock.tsx`, and `CommandPalette.tsx`.

---

## [0.6.3] - 2026-10-07

### Added
- **Basic Black Monochrome Theme & Relaxed Pacing (`LanguagePreloader.tsx`)**:
  - Transformed preloader aesthetic to pure matte black (`bg-black`) with zero blue or cyan glows, matching Dennis Snellenberg and Aadarsh Rai editorial minimalism.
  - Replaced cyan accent dot with a clean, iconic monochrome white dot (`bg-white`).
  - Swapped colored status badge for clean, subtle monospace metadata (`text-white/40`).
  - Relaxed greeting transition timing to a comfortable 340ms interval with smooth 150ms ease-out slides, allowing ample time to read each language.
  - Preserved upward fade-up with geometric circular bottom radius expansion (`0vw → 50vw`) with clean, uncolored shadow elevation.

---

## [0.6.2] - 2026-10-07

### Added
- **Upward Fade-Up with Circular Bottom Radius Arc (`LanguagePreloader.tsx`)**:
  - Re-architected exit transition so the dark preloader translates and fades upwards (`y: -105%`, `opacity: 1 → 0`).
  - Animated `borderBottomLeftRadius` and `borderBottomRightRadius` (`0vw → 35vw → 50vw`), dynamically forming a curved circle dome along the bottom edge as it lifts up.
  - Added glowing neon cyan bottom border (`#06b6d4`) and atmospheric elevation glow (`0 25px 60px rgba(6,182,212,0.4)`) outlining the bottom circular arc during exit.
  - Tuned greeting cycles to high-tempo 180ms per word with snappy 80ms micro-transitions, eliminating blurry strobe artifacts while retaining high velocity and readability.

---

## [0.6.1] - 2026-10-07

### Added
- **Circular Iris & Kinetic Motion Preloader Upgrade (`LanguagePreloader.tsx`)**:
  - Upgraded exit animation to a circular transformation using `motion/react` and `motion-tokens`.
  - Replaced linear curtain lift with a hardware-accelerated circular morph: full-screen rectangle contracts into a centered circle (`clipPath: circle(150%) → circle(46%) → circle(0%)`) with `borderRadius: 0% → 50%` and `scale: 1 → 0`.
  - Added radiant cyan perimeter energy ring (`#06b6d4`) hugging the contracting circular aperture with deep neon drop-shadows.
  - Implemented `motion-patterns` text transitions via `<AnimatePresence mode="wait">` for every international greeting word, featuring smooth spring kinematics, subtle vertical shifts (`y: 16 → 0 → -16`), and letter blur/unblur smoothing.
  - Built `src/lib/motion-tokens.ts` defining strict foundation tokens for springs, easings, durations, distances, and scales.
  - Added instant keyboard bypass (`[ESC]`) and tactile acoustic sound chime on exit completion.

---

## [0.6.0] - 2026-10-07

### Added
- **Multi-Language Greeting Preloader (`LanguagePreloader.tsx`)** *(directly inspired by `aadarshrai.vercel.app`)*:
  - High-velocity greeting cycle transitioning smoothly across 9 international languages (`Hello`, `Bonjour`, `नमस्ते`, `Ciao`, `Olá`, `こんにちは`, `Hallå`, `Guten Tag`, `Namaste`).
  - Pulsing cyan indicator beacon, localized phonetic script badges, and subtle acoustic chime on boot completion.
  - Liquid SVG quadratic bezier curve curtain pull-up animation driven by GSAP (`power4.inOut`), lifting up to seamlessly reveal the portfolio.
  - Complete scroll lock during boot sequence and auto-dismiss memory cleanup.
- **Enhanced Ambient Constellation Canvas (`ConstellationCanvas.tsx`)**:
  - Increased particle density from 45 to ~95 interconnected nodes (`window.innerWidth / 16`).
  - Broadened filament connection radius from 120px to 160px and mouse attraction radius to 190px.
  - Elevated line opacity and dot sheen for a deeply immersive, responsive cosmic engineering background.

---

## [0.5.0] - 2026-10-06

### Added
- **Distilled Inspirations from 4 Benchmark Portfolios (Aakarsh, Sawad, Redoyanul, Aadarsh)**:
  - **Scroll Progress Bar (`ScrollProgressBar.tsx`)** *(from `aakarsh-devhq.vercel.app`)*:
    - Fixed top luminous gradient bar (`primary → cyan → emerald`) displaying real-time viewport read progress.
  - **Interactive Constellation Canvas (`ConstellationCanvas.tsx`)** *(from `aakarsh-devhq` & `redoyanulhaque.me`)*:
    - HTML5 2D canvas with drifting ambient particles and interactive dynamic line connectors that follow the cursor across the dark space.
  - **Dynamic Typewriter / Role Cycler in Hero** *(from `aakarsh-devhq`)*:
    - Smoothly cycles through Sonu's engineering domains (`AI Ingestion Pipelines`, `Concurrency-Safe MERN`, `Offensive & Defensive AppSec`, `Civic Real-Time Systems`) with a blinking cursor.
  - **Floating Glassmorphic Bottom Dock (`FloatingDock.tsx`)** *(from `aakarsh-devhq` & `sawad.framer.website`)*:
    - Bottom pill navigation dock with active section tracking, smooth scroll links, icon tooltips, and instant "Let's Connect" launcher.
  - **Interactive Contact & Collaboration Modal (`ContactModal.tsx`)** *(from `aakarsh-devhq` & `sawad.framer.website`)*:
    - 1-click email copy with tactile chime, pre-formatted mailto composer, Kathmandu time zone availability, and social links.
  - **High-Contrast Editorial Typography & Minimal Dark Palette** *(from `aadarshrai.vercel.app`)*:
    - Deep dark theme with crisp monospace metadata tags, high-signal metric badges, and clear hierarchy.

---

## [0.4.0] - 2026-10-06

### Added
- **Top-Tier Creative & Visual Overhaul (Inspired by emmabostian/developer-portfolios)**:
  - **Asymmetric Visual Hero Bento Grid**:
    - Live ticking Kathmandu digital clock (`UTC+5:45`) and active status beacon.
    - Tribhuvan University BCA Rank 1 Card with animated SVG circular CGPA progress ring (`3.63 / 4.00`).
    - BugV CTF 2026 Podium Card highlighting 3rd place solo cybersecurity ranking.
    - Project LOOP Telemetry Card featuring an animated Gemini 1.5 Pro token streaming pipeline simulator and VoC Sentiment Risk score bar (`94.2% precision`).
  - **Ultra-Visual IDE Window Project Cards**:
    - macOS / Linux dark window frame header with traffic light controls (`● ● ●`), route paths, and glowing status pills.
    - Custom animated SVG system architecture miniature schematics embedded directly on each project card (e.g. VoC Voice -> Gemini Pro -> Risk Matrix -> MongoDB ACID; Mutex Stock Lock -> 3-Payment Gateway Router).
    - Dynamic cursor-tracking radial spotlight glow (`onMouseMove`).
    - Key architectural metrics HUD and direct Archify blueprint launcher triggers.
  - **Interactive BugV Security CTF Terminal (`CTFTerminal`)**:
    - Embedded interactive terminal shell (`sonu@bugv-ctf:~$`) with quick command pills and direct keyboard typing.
    - Interactive commands: `cat flag.txt` (reveals BugV flag with matrix glow & chime), `run-audit` (OWASP security checklist), `whoami`, `ctf-vectors`, `help`, and `clear`.
  - **Interactive AI Systems Comparative Simulator**:
    - Added "Run Comparative Test" in the AI Counterparts section that executes side-by-side benchmark telemetry comparing traditional regex engines to Gemini 1.5 Pro semantic pipelines.
  - **Visual Career Journey & Academic Merit Timeline (`JourneyTimeline`)**:
    - Clean visual roadmap detailing Tribhuvan University Rank 1, BugV CTF podium finish, Zidio AI internship on Project LOOP, and open-source civic platforms.
  - **Tactile Web Audio API Sound Effects (`soundEffects.ts`)**:
    - Lightweight, zero-dependency mechanical keystroke and success chimes with a dedicated `Volume2` / `VolumeX` toggle in the navigation bar.

---

## [0.3.0] - 2026-10-06

### Added
- **Complete Interactive Frontend Prototype**:
  - Hero section highlighting Tribhuvan University BCA Rank 1 (CGPA 3.63), Project LOOP AI development, and BugV CTF Solo 3rd Place.
  - Interactive Project Showcase for all 6 projects with Category filtering (`All`, `AI Systems`, `Full-Stack MERN`, `Civic Tech`, `Interactive Web`).
  - Interactive Archify System Blueprint Viewer modal embedding validated standalone SVG architecture diagrams directly within the UI.
  - Applied AI Engineering Counterpart Matrix contrasting traditional SWE concepts with production LLM equivalents (Gemini SDK, streaming tokens, context budgets, prompt injection defenses).
  - Security Lab Showcase highlighting BugV CTF 2026 3rd place solo achievement, OWASP Top 10 remediation, and cryptographic session hygiene.
  - Full-featured Command Palette (`Ctrl+K` / `Cmd+K`) with instant keyboard navigation, live project search, and external links.
- **Admin Control Console (`/admin`)**:
  - Secure passkey authentication gate (PIN: `sonu2026`).
  - Dynamic Draft & Hidden state management: Allows keeping the recent hackathon win in draft mode until ready to announce publicly.
  - Project management: Add new projects, toggle visibility between draft and published, and connect new Archify blueprint URLs.
  - Achievement management: Add new hackathon victories and toggle visibility.
  - Profile and bio editor with persistent browser storage (`localStorage`).
  - Git Sync & JSON export utility for committing admin updates directly to repository data models.
- **Strict Code Health & Verification**:
  - 100% clean TypeScript build (`tsc -b && vite build`) with zero type errors.
  - 100% clean ESLint compliance (`npm run lint`) with zero warnings and zero errors.

---

## [0.2.0] - 2026-10-06

### Added
- Authored and verified full visual system architecture suite for all 6 CV projects via Archify (`validate`, `deliver`, `check`, `browser-check` all passing with 0 diagnostics):
  - **Project LOOP**: AI Ingestion, Gemini SDK, VOC Risk Matrix, ACID Transactions.
  - **CricketNepal**: Multi-Role eCommerce, Concurrency Stock Lock, 3-Gateway Payment Router (Khalti, eSewa, Stripe).
  - **PublicCare**: Civic Issue Escalation, GPS Clustering, WebSockets, Contractor Tendering.
  - **StudyTrack Nepal**: MERN Progress Tracker, Automated Streak Engine, Node-Cron Email Digests.
  - **Quizify**: Dynamic Trivia Engine, Open Trivia DB API, Session Token Guard, LocalStorage Caching.
  - **TravelNP**: Dual-Persona Travel Discovery, Geo-Proximity Engine, Hotel Self-Listing & Guide Scheduling.

## [0.1.0] - 2026-09-29

### Added
- Standardized AI governance suite initialized via `init-ai`:
  - [`AGENTS.md`](file:///e:/codes/PersonalPortfolio/AGENTS.md): Developer & AI agent operating instructions, security rules, and SDLC guidelines.
  - [`PRD.md`](file:///e:/codes/PersonalPortfolio/PRD.md): Product Requirements Document detailing goals, personas, and feature specifications.
  - [`DESIGN.md`](file:///e:/codes/PersonalPortfolio/DESIGN.md): System Architecture and Technical Design Document.
  - [`USAGE.md`](file:///e:/codes/PersonalPortfolio/USAGE.md): User and developer handbook for local execution, Archify generation, and project extensions.
  - [`CHANGELOG.md`](file:///e:/codes/PersonalPortfolio/CHANGELOG.md): Initial audit and release notes.
- Initial **Project LOOP** System Architecture diagram authored and verified via Archify (`validate`, `deliver`, `check`, `browser-check` all passing).
- Verified Archify environment readiness using `doctor` runtime checks.
