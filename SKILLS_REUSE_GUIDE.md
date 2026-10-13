# Cross-Project Skills & Antigravity Global Setup Guide

This guide explains how to use your installed skills across different projects and how to register them directly into **Antigravity** so they are available machine-wide without needing to re-copy files into every new repository.

---

## 1. Catalog of Installed Skills

The following 8 skills are currently installed and ready in your workspace:

| Skill | Purpose | When to Use / Trigger Phrases |
| :--- | :--- | :--- |
| **`archify`** | Interactive HTML & SVG architecture & system diagrams | *"Diagram this system"*, *"create interactive architecture map"*, *"visualize request lifecycle"*, *"convert Mermaid to interactive HTML"* |
| **`init-ai`** | Project initialization & AI governance | *"Initialize project documentation"*, *"create AGENTS.md, PRD, and design docs"*, *"scaffold new project with AI rules"* |
| **`ui-ux-pro-max`** | Design intelligence & BM25 guideline search | *"Search UI style for dashboard"*, *"find color palette for fintech"*, *"check UX guidelines for forms"*, *"accessible button contrast"* |
| **`frontend-design`** | Distinctive, intentional aesthetic art direction | *"Design a unique hero section"*, *"create a non-generic UI layout"*, *"choose bespoke typography"*, *"avoid cookie-cutter designs"* |
| **`motion-patterns`** | React & Next.js production motion patterns | *"Add stagger animation to list"*, *"modal exit transition"*, *"scroll-reveal cards"*, *"page transition in App Router"* |
| **`gsap-plugins`** | Official GSAP plugins & animations | *"Register ScrollSmoother"*, *"flip layout transition"*, *"Draggable with Inertia"*, *"SplitText animated headlines"* |
| **`grill-me`** | Plan & design stress-testing interview | *"Grill me on this design"*, *"challenge my architectural plan"*, *"identify edge-case blindspots before building"* |
| **`skill-creator`** | Create, benchmark & optimize skills | *"Create a new skill"*, *"benchmark skill accuracy"*, *"improve skill description"*, *"write evals for a workflow"* |

---

## 2. Can You Add Them to Antigravity Directly?

**YES!** Antigravity has first-class built-in support for both **Global (Machine-Wide)** and **Workspace (Project-Specific)** skill discovery.

### How Antigravity Discovers Skills (Loading Priority)

```text
Priority 1: Workspace Customizations (<project-root>/.agents/skills/<skill-name>/SKILL.md)
              ▲
Priority 2: Global Customizations (~/.gemini/config/skills/<skill-name>/SKILL.md)
              ▲
Priority 3: Global Bundled Plugins (~/.gemini/config/plugins/<plugin-name>/skills/)
              ▲
Priority 4: Built-in IDE Skills (builtin/skills/)
```

---

## 3. Method A: Install Machine-Wide in Antigravity (Available Everywhere)

If you place your skills in the **Global Customization Root**, they become instantly active across **all projects and workspaces** on your machine. You will never need to install or copy them again into new projects.

### Global Path:
```text
C:\Users\Acer\.gemini\config\skills\
```

### Steps to Register Skills Globally:

1. Open PowerShell and create the global skills directory if it does not already exist:
   ```powershell
   New-Item -ItemType Directory -Force -Path "$HOME\.gemini\config\skills"
   ```

2. Copy all your skills from this repository into the global directory:
   ```powershell
   $sourceDir = "e:\codes\vibe-coded\FinTrace\.agents\skills"
   $globalDir = "$HOME\.gemini\config\skills"
   
   Get-ChildItem -Directory $sourceDir | ForEach-Object {
       Copy-Item -Recurse -Force $_.FullName (Join-Path $globalDir $_.Name)
       Write-Host "Globally installed: $($_.Name)"
   }
   ```

3. **Verify:** Open any project in Antigravity. The agent will automatically see `init-ai`, `ui-ux-pro-max`, `frontend-design`, `gsap-plugins`, `motion-patterns`, `grill-me`, and `skill-creator` in its available skills inventory.

---

## 4. Method B: Using Skills in Another Specific Project

If you prefer keeping skills inside specific project repositories (e.g., committed to Git so teammates also have access):

### Option 1: Fast Copy via PowerShell / Terminal
Inside your new project directory:
```powershell
# In your new project folder:
mkdir -p .agents/skills

# Copy any skill(s) you need:
Copy-Item -Recurse "e:\codes\vibe-coded\FinTrace\.agents\skills\init-ai" .agents\skills\
Copy-Item -Recurse "e:\codes\vibe-coded\FinTrace\.agents\skills\ui-ux-pro-max" .agents\skills\
Copy-Item -Recurse "e:\codes\vibe-coded\FinTrace\.agents\skills\frontend-design" .agents\skills\
```

### Option 2: Using the `npx skills` Package Manager
If you want to install directly from the upstream sources into any new project:
```bash
# In your new project folder:
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max -y
```

Or install globally using `-g`:
```bash
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max -g
```

---

## 5. Method C: Create a Custom Antigravity Plugin

You can bundle multiple related skills into a single **Antigravity Plugin**:

### Location:
```text
C:\Users\Acer\.gemini\config\plugins\my-design-suite\
├── plugin.json
└── skills\
    ├── frontend-design\
    ├── gsap-plugins\
    ├── motion-patterns\
    └── ui-ux-pro-max\
```

### `plugin.json` Example:
```json
{
  "name": "my-design-suite",
  "version": "1.0.0",
  "description": "Comprehensive UI/UX design intelligence and animation patterns",
  "author": "User"
}
```
Any skills placed inside `plugins/<plugin-name>/skills/` are automatically available in Antigravity across all conversations.

---

## 6. Recommended Workflow for New Projects

When starting any brand new project:

1. **Step 1: Bootstrap Governance with `init-ai`**
   Tell Antigravity:
   > *"Use the `init-ai` skill to initialize my new project. It is a TypeScript Next.js web application called FinDashboard."*
   
   *Result:* Scaffolds `AGENTS.md`, `PRD.md`, `DESIGN.md`, `USAGE.md`, and `CHANGELOG.md`.

2. **Step 2: Challenge the Architecture with `grill-me`**
   Tell Antigravity:
   > *"Grill me on the PRD and system architecture we just created."*
   
   *Result:* A relentless interview identifying hidden edge cases and architectural bottlenecks.

3. **Step 3: Generate Interactive Architecture Diagrams with `archify`**
   Tell Antigravity:
   > *"Use archify to create an interactive architecture map of our system showing the client, API gateway, cache, and database layers."*

   *Result:* Compiles an interactive, dark-mode `.html` diagram with pan, zoom, and animated trace motion.

4. **Step 4: Define Visual Identity with `frontend-design` & `ui-ux-pro-max`**
   Tell Antigravity:
   > *"Search ui-ux-pro-max for a dark mode dashboard palette, and apply frontend-design principles to create a distinctive, non-generic landing page layout."*

5. **Step 5: Implement Micro-Interactions with `motion-patterns` & `gsap-plugins`**
   Tell Antigravity:
   > *"Add accessible stagger entrance animations and an accordion layout transition using motion-patterns."*

