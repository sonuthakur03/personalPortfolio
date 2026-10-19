// src/types/education.ts
import type { ElementType } from 'react';

export interface CourseModule {
  readonly code: string;
  readonly name: string;
  readonly keyTopics: string;
  readonly gradeBadge: string;
}

export interface CurriculumPillar {
  readonly id: string;
  readonly title: string;
  readonly icon: ElementType;
  readonly modules: readonly CourseModule[];
}
