# Changelog

All notable changes to the **Sonu Thakur Personal Portfolio** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
