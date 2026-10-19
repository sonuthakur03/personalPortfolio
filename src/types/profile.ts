// src/types/profile.ts

export interface ProfileData {
  readonly name: string;
  readonly headline: string;
  readonly bio: string;
  readonly academic: string;
  readonly ctfAchievement: string;
  readonly internship: string;
  readonly location: string;
  readonly github: string;
  readonly linkedin: string;
  readonly email: string;
  readonly activeStatus: string;
  readonly hackathonWin?: string;
  readonly avatarUrl?: string;
  readonly resumeUrl?: string;
  readonly instagram?: string;
  readonly discord?: string;
}
