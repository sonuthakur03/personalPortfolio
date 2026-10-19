// src/types/skills.ts
// Strongly-typed definitions for technical skills and categorized competencies

export type SkillCategoryType =
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai-security'
  | 'ai-tools'
  | 'tools'
  | 'fundamentals';

export interface FlatSkillItem {
  id: string;
  name: string;
  category: SkillCategoryType;
  iconClass: string;
  color?: string;
  level?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  readonly title: string;
  readonly skills: readonly {
    readonly name: string;
    readonly level?: string;
    readonly highlight?: boolean;
  }[];
}

