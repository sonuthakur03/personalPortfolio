// src/context/PortfolioContentContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ProjectCaseStudy } from '../types/projects';
import type { Achievement } from '../types/achievements';
import type { ProfileData } from '../types/profile';
import type { AICounterpart } from '../types/aiCounterparts';
import type { SkillCategory } from '../data/skillsData';
import { projectsData } from '../data/projectsData';
import { initialAchievementsData } from '../data/achievementsData';
import { initialProfileData } from '../data/profileData';
import { initialAICounterparts } from '../data/aiCounterpartsData';
import { initialSkillsData } from '../data/skillsData';

interface ContentContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  profile: ProfileData;
  updateProfile: (updated: ProfileData) => void;
  projects: readonly ProjectCaseStudy[];
  visibleProjects: readonly ProjectCaseStudy[];
  addProject: (project: ProjectCaseStudy) => void;
  updateProject: (id: string, updated: Partial<ProjectCaseStudy>) => void;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;
  achievements: readonly Achievement[];
  visibleAchievements: readonly Achievement[];
  addAchievement: (achievement: Achievement) => void;
  updateAchievement: (id: string, updated: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  toggleAchievementVisibility: (id: string) => void;
  aiCounterparts: readonly AICounterpart[];
  skills: readonly SkillCategory[];
  resetToDefaults: () => void;
  exportDataAsJSON: () => string;
}

const STORAGE_KEYS = {
  THEME: 'sonu_portfolio_theme',
  PROFILE: 'sonu_portfolio_profile',
  PROJECTS: 'sonu_portfolio_projects',
  ACHIEVEMENTS: 'sonu_portfolio_achievements',
};

const PortfolioContentContext = createContext<ContentContextType | undefined>(undefined);

export const PortfolioContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Profile state
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfileData;
  });

  const updateProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  };

  // Projects state
  const [projects, setProjects] = useState<readonly ProjectCaseStudy[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : projectsData;
  });

  const visibleProjects = projects.filter((p) => !p.isHidden);

  const addProject = (project: ProjectCaseStudy) => {
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const updateProject = (id: string, updatedFields: Partial<ProjectCaseStudy>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const toggleProjectVisibility = (id: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p));
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  // Achievements state
  const [achievements, setAchievements] = useState<readonly Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievementsData;
  });

  const visibleAchievements = achievements.filter((a) => !a.isHidden);

  const addAchievement = (achievement: Achievement) => {
    const updated = [achievement, ...achievements];
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  };

  const updateAchievement = (id: string, updatedFields: Partial<Achievement>) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, ...updatedFields } : a));
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  };

  const toggleAchievementVisibility = (id: string) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, isHidden: !a.isHidden } : a));
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  };

  // AI Counterparts & Skills (Read-only managed domain objects)
  const [aiCounterparts] = useState<readonly AICounterpart[]>(initialAICounterparts);
  const [skills] = useState<readonly SkillCategory[]>(initialSkillsData);

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    setProfile(initialProfileData);
    setProjects(projectsData);
    setAchievements(initialAchievementsData);
  };

  const exportDataAsJSON = (): string => {
    return JSON.stringify(
      {
        profile,
        projects,
        achievements,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  return (
    <PortfolioContentContext.Provider
      value={{
        theme,
        toggleTheme,
        profile,
        updateProfile,
        projects,
        visibleProjects,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectVisibility,
        achievements,
        visibleAchievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        toggleAchievementVisibility,
        aiCounterparts,
        skills,
        resetToDefaults,
        exportDataAsJSON,
      }}
    >
      {children}
    </PortfolioContentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolioContent = () => {
  const context = useContext(PortfolioContentContext);
  if (!context) {
    throw new Error('usePortfolioContent must be used within a PortfolioContentProvider');
  }
  return context;
};
