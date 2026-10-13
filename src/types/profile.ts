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
  readonly avatarUrl?: string;
}
