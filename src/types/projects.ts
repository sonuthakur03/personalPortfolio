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

export interface ApiEndpointSpec {
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly path: string;
  readonly description: string;
  readonly payloadOrParams?: string;
  readonly responseCode: string;
}

export interface DatabaseCollectionSpec {
  readonly name: string;
  readonly purpose: string;
  readonly keyFields: readonly string[];
}

export interface SystemArchitectureSpec {
  readonly backendFlow: readonly string[];
  readonly databaseOverview?: string;
  readonly collections?: readonly DatabaseCollectionSpec[];
  readonly apiEndpoints?: readonly ApiEndpointSpec[];
}

export interface AiAssistedEngineeringSpec {
  readonly individualOwnership: string;
  readonly aiToolsUsed: readonly string[];
  readonly aiWorkflowDescription: string;
  readonly humanVerificationRhythm: string;
}

export interface ProjectStatusSpec {
  readonly completed: readonly string[];
  readonly inProgressOrMocked: readonly string[];
  readonly futureRoadmap: readonly string[];
}

export interface VerifiableFeatureSpec {
  readonly feature: string;
  readonly howToVerify: string;
  readonly status: 'verified-live' | 'verifiable-repo' | 'interactive-demo';
}

export interface ProjectCaseStudy {
  readonly id: string;
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly period?: string;
  readonly summary: string;
  readonly isFeatured?: boolean;
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

  // Deep-Dive Case Study Specifications
  readonly problemStatement?: {
    readonly problem: string;
    readonly challenges: readonly string[];
  };
  readonly architectureSpec?: SystemArchitectureSpec;
  readonly aiEngineering?: AiAssistedEngineeringSpec;
  readonly projectStatus?: ProjectStatusSpec;
  readonly workingEvidence?: {
    readonly demoNote?: string;
    readonly verifiableFeatures: readonly VerifiableFeatureSpec[];
  };
  readonly outcomes?: {
    readonly keyResults: readonly string[];
    readonly impact: string;
  };
}
