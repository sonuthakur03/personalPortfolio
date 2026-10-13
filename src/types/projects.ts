// src/types/projects.ts

export type ProjectCategory = 'ai-systems' | 'fullstack-mern' | 'civic-tech' | 'uiux-design' | 'interactive-web';

export interface ArchifyDiagramRef {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
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

export interface ProjectCaseStudy {
  readonly id: string;
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly period?: string;
  readonly summary: string;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly figmaUrl?: string;
  readonly architectureDiagram: ArchifyDiagramRef;
  readonly securityHardening: readonly SecurityMilestone[];
  readonly techStack: readonly string[];
  readonly metrics: readonly string[];
  readonly image?: string;
  readonly isDraft?: boolean;
  readonly isHidden?: boolean;
}
