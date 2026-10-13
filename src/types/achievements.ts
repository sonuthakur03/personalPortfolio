// src/types/achievements.ts

export type AchievementCategory = 'security-ctf' | 'hackathon' | 'academic' | 'training';

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly date: string;
  readonly rankOrAward: string;
  readonly description: string;
  readonly category: AchievementCategory;
  readonly badge?: string;
  readonly isDraft?: boolean;
  readonly isHidden?: boolean;
}
