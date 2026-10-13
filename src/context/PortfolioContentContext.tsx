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
  isAdminAuthenticated: boolean;
  authenticateAdmin: (passkey: string) => boolean;
  logoutAdmin: () => void;
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
  ADMIN_AUTH: 'sonu_portfolio_admin_auth',
  PROFILE: 'sonu_portfolio_profile',
  PROJECTS: 'sonu_portfolio_projects',
  ACHIEVEMENTS: 'sonu_portfolio_achievements',
};

// Default Admin passkey is 'sonu2026' or 'admin'
const ADMIN_PASSKEY = 'sonu2026';

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

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const authenticateAdmin = (passkey: string): boolean => {
    if (passkey.trim() === ADMIN_PASSKEY || passkey.trim() === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
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

  const saveProjects = (nextProjects: readonly ProjectCaseStudy[]) => {
    setProjects(nextProjects);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(nextProjects));
  };

  const addProject = (project: ProjectCaseStudy) => {
    saveProjects([project, ...projects]);
  };

  const updateProject = (id: string, updated: Partial<ProjectCaseStudy>) => {
    saveProjects(
      projects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter((p) => p.id !== id));
  };

  const toggleProjectVisibility = (id: string) => {
    saveProjects(
      projects.map((p) =>
        p.id === id ? { ...p, isHidden: !p.isHidden, isDraft: !p.isDraft } : p
      )
    );
  };

  // Filtered public view: hide drafts and hidden items
  const visibleProjects = projects.filter((p) => !p.isHidden && !p.isDraft);

  // Achievements state
  const [achievements, setAchievements] = useState<readonly Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievementsData;
  });

  const saveAchievements = (next: readonly Achievement[]) => {
    setAchievements(next);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(next));
  };

  const addAchievement = (achievement: Achievement) => {
    saveAchievements([achievement, ...achievements]);
  };

  const updateAchievement = (id: string, updated: Partial<Achievement>) => {
    saveAchievements(
      achievements.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const deleteAchievement = (id: string) => {
    saveAchievements(achievements.filter((a) => a.id !== id));
  };

  const toggleAchievementVisibility = (id: string) => {
    saveAchievements(
      achievements.map((a) =>
        a.id === id ? { ...a, isHidden: !a.isHidden, isDraft: !a.isDraft } : a
      )
    );
  };

  // Filtered public view
  const visibleAchievements = achievements.filter((a) => !a.isHidden && !a.isDraft);

  // Static reference lists
  const aiCounterparts = initialAICounterparts;
  const skills = initialSkillsData;

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    setProfile(initialProfileData);
    setProjects(projectsData);
    setAchievements(initialAchievementsData);
  };

  const exportDataAsJSON = () => {
    return JSON.stringify(
      {
        profile,
        projects,
        achievements,
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
        isAdminAuthenticated,
        authenticateAdmin,
        logoutAdmin,
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
