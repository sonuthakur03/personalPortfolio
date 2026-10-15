// src/pages/AdminPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Plus, Trash2, Save, Download, RotateCcw, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import type { ProjectCaseStudy, ProjectCategory } from '../types/projects';
import type { Achievement, AchievementCategory } from '../types/achievements';

const createInitialProjectState = (): Partial<ProjectCaseStudy> => ({
  id: `project-${Date.now()}`,
  title: '',
  role: 'Lead Full-Stack Developer',
  category: 'ai-systems',
  summary: '',
  techStack: ['React', 'Node.js', 'MongoDB'],
  metrics: ['Production Deployed'],
  securityHardening: [],
  architectureDiagram: {
    id: `arch-${Date.now()}`,
    title: 'System Architecture',
    subtitle: 'Component Architecture',
    type: 'architecture',
    path: '/architectures/project-loop.html',
    keyHighlights: ['Automated Dataflow'],
  },
  isDraft: false,
  isHidden: false,
});

const createInitialAchievementState = (): Partial<Achievement> => ({
  id: `ach-${Date.now()}`,
  title: '',
  organization: '',
  date: '2026',
  rankOrAward: 'Winner / 1st Place',
  description: '',
  category: 'hackathon',
  badge: 'Hackathon Winner',
  isDraft: true,
  isHidden: true,
});

const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    profile,
    updateProfile,
    projects,
    addProject,
    deleteProject,
    toggleProjectVisibility,
    achievements,
    addAchievement,
    deleteAchievement,
    toggleAchievementVisibility,
    resetToDefaults,
    exportDataAsJSON,
  } = usePortfolioContent();

  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'achievements' | 'sync'>('projects');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState(profile);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddAchievement, setShowAddAchievement] = useState(false);

  // New project state (lazy initialized to prevent impure function calls during render)
  const [newProject, setNewProject] = useState<Partial<ProjectCaseStudy>>(createInitialProjectState);

  // New achievement state (lazy initialized)
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>(createInitialAchievementState);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(passkeyInput)) {
      setAuthError(false);
      setPasskeyInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profile information updated successfully!');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.summary) return;
    addProject(newProject as ProjectCaseStudy);
    setNewProject(createInitialProjectState());
    setShowAddProject(false);
    showToast(`Project "${newProject.title}" created successfully!`);
  };

  const handleCreateAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievement.title || !newAchievement.organization) return;
    addAchievement(newAchievement as Achievement);
    setNewAchievement(createInitialAchievementState());
    setShowAddAchievement(false);
    showToast(`Achievement "${newAchievement.title}" saved!`);
  };

  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportDataAsJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sonu_portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded successfully!');
  };

  // If not authenticated, display login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-surface border border-subtle shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 text-accent-emerald mx-auto flex items-center justify-center border border-accent-emerald/30">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Admin Control Console
            </h1>
            <p className="text-xs font-mono text-muted-foreground">
              Enter your admin passkey to manage projects, toggle drafts, and edit portfolio sections.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">
                Passkey / Security PIN
              </label>
              <input
                type="password"
                placeholder="Enter passkey (e.g. sonu2026)"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
                autoFocus
              />
              {authError && (
                <p className="text-xs font-mono text-accent-rose mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passkey. Hint: sonu2026</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Authenticate & Unlock Console
            </button>
          </form>

          <div className="pt-4 border-t border-border text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Admin Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-1.5 rounded bg-background border border-border text-muted-foreground hover:text-foreground"
            title="Return to Live Site"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="font-display font-bold text-sm text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-emerald" />
              <span>Sonu Thakur Admin Console</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                Active Session
              </span>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground hidden sm:block">
              Dynamic Section Editor & Draft Control
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border text-xs font-mono text-foreground hover:border-primary transition-colors"
          >
            <span>Live Portfolio View</span>
          </Link>
          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-md bg-accent-rose/10 border border-accent-rose/30 text-accent-rose font-mono text-xs hover:bg-accent-rose/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Toast Alert */}
        {saveToast && (
          <div className="mb-6 p-3 rounded-lg bg-accent-emerald/15 border border-accent-emerald/40 text-accent-emerald font-mono text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-border text-xs font-mono">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Projects & Architecture ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'achievements'
                ? 'bg-accent-amber text-black font-semibold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Achievements & Hackathons ({achievements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Hero & Profile Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'sync'
                ? 'bg-accent-cyan text-black font-semibold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Git Sync & Export</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Projects & System Blueprints
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  Manage projects, toggle draft status, and connect Archify diagrams.
                </p>
              </div>
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-90"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Add Project Form Drawer */}
            {showAddProject && (
              <form onSubmit={handleCreateProject} className="p-5 rounded-xl bg-surface border border-primary/40 space-y-4">
                <h3 className="font-display font-bold text-base text-foreground">
                  Create New Project
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-muted-foreground mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. My New AI Project"
                      value={newProject.title || ''}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Full-Stack Engineer"
                      value={newProject.role || ''}
                      onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as ProjectCategory })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    >
                      <option value="ai-systems">ai-systems</option>
                      <option value="fullstack-mern">fullstack-mern</option>
                      <option value="civic-tech">civic-tech</option>
                      <option value="interactive-web">interactive-web</option>
                      <option value="uiux-design">uiux-design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Archify HTML Path</label>
                    <input
                      type="text"
                      placeholder="/architectures/project-loop.html"
                      value={newProject.architectureDiagram?.path || ''}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          architectureDiagram: {
                            ...newProject.architectureDiagram!,
                            path: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-muted-foreground mb-1">Summary</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Describe the system architecture, business problem, and impact..."
                      value={newProject.summary || ''}
                      onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="px-3 py-1.5 rounded bg-surface border border-border text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-xs font-mono font-semibold"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="space-y-3">
              {projects.map((project) => {
                const isHidden = project.isHidden || project.isDraft;
                return (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl bg-surface border border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-foreground">
                          {project.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isHidden
                              ? 'bg-accent-amber/10 text-accent-amber border-accent-amber/30'
                              : 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30'
                          }`}
                        >
                          {isHidden ? 'DRAFT / HIDDEN' : 'PUBLISHED'}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {project.role} · <span className="text-primary">{project.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          toggleProjectVisibility(project.id);
                          showToast(`Visibility updated for "${project.title}"`);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                          isHidden
                            ? 'bg-accent-amber/15 border-accent-amber text-accent-amber'
                            : 'bg-surface border-border text-muted-foreground hover:text-foreground'
                        }`}
                        title={isHidden ? 'Click to Publish' : 'Click to Hide'}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isHidden ? 'Publish' : 'Hide'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            deleteProject(project.id);
                            showToast(`Deleted "${project.title}"`);
                          }
                        }}
                        className="p-2 rounded-lg bg-surface border border-border text-muted-foreground hover:text-accent-rose hover:border-accent-rose/40 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ACHIEVEMENTS & HACKATHONS */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Achievements, Hackathons & CTF
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  Manage awards. Keep recent hackathons in draft mode until ready to announce publicly.
                </p>
              </div>
              <button
                onClick={() => setShowAddAchievement(!showAddAchievement)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent-amber text-black font-mono text-xs font-semibold hover:opacity-90"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Achievement / Hackathon</span>
              </button>
            </div>

            {/* Add Achievement Form */}
            {showAddAchievement && (
              <form onSubmit={handleCreateAchievement} className="p-5 rounded-xl bg-surface border border-accent-amber/40 space-y-4">
                <h3 className="font-display font-bold text-base text-foreground">
                  Add Achievement / Hackathon Win
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-muted-foreground mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Recent Hackathon Championship"
                      value={newAchievement.title || ''}
                      onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Organization / Event</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swoyambhu International / Embark"
                      value={newAchievement.organization || ''}
                      onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Rank or Award</label>
                    <input
                      type="text"
                      placeholder="e.g. 1st Place Winner"
                      value={newAchievement.rankOrAward || ''}
                      onChange={(e) => setNewAchievement({ ...newAchievement, rankOrAward: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Category</label>
                    <select
                      value={newAchievement.category}
                      onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value as AchievementCategory })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    >
                      <option value="hackathon">hackathon</option>
                      <option value="security-ctf">security-ctf</option>
                      <option value="academic">academic</option>
                      <option value="training">training</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-muted-foreground mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Describe the solution built, problem statement solved..."
                      value={newAchievement.description || ''}
                      onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDraftCheck"
                      checked={newAchievement.isDraft ?? true}
                      onChange={(e) => setNewAchievement({ ...newAchievement, isDraft: e.target.checked, isHidden: e.target.checked })}
                      className="rounded border-border text-primary"
                    />
                    <label htmlFor="isDraftCheck" className="text-muted-foreground">
                      Keep as Draft (Hidden from public portfolio until toggled)
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAchievement(false)}
                    className="px-3 py-1.5 rounded bg-surface border border-border text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-accent-amber text-black text-xs font-mono font-semibold"
                  >
                    Save Achievement
                  </button>
                </div>
              </form>
            )}

            {/* Achievements List */}
            <div className="space-y-3">
              {achievements.map((ach) => {
                const isHidden = ach.isHidden || ach.isDraft;
                return (
                  <div
                    key={ach.id}
                    className="p-4 rounded-xl bg-surface border border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-foreground">
                          {ach.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isHidden
                              ? 'bg-accent-amber/10 text-accent-amber border-accent-amber/30'
                              : 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30'
                          }`}
                        >
                          {isHidden ? 'DRAFT / HIDDEN' : 'PUBLISHED'}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {ach.organization} · <span className="text-accent-amber font-semibold">{ach.rankOrAward}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          toggleAchievementVisibility(ach.id);
                          showToast(`Visibility toggled for "${ach.title}"`);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                          isHidden
                            ? 'bg-accent-amber/15 border-accent-amber text-accent-amber'
                            : 'bg-surface border-border text-muted-foreground hover:text-foreground'
                        }`}
                        title={isHidden ? 'Click to Publish on Public Site' : 'Click to Hide'}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isHidden ? 'Publish' : 'Hide'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete achievement "${ach.title}"?`)) {
                            deleteAchievement(ach.id);
                            showToast(`Deleted "${ach.title}"`);
                          }
                        }}
                        className="p-2 rounded-lg bg-surface border border-border text-muted-foreground hover:text-accent-rose hover:border-accent-rose/40 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-6 rounded-xl bg-surface border border-subtle space-y-6 max-w-3xl">
            <h2 className="font-display font-bold text-xl text-foreground">
              Edit Hero & Profile Information
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1">Headline</label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground mb-1">Academic Distinction</label>
                  <input
                    type="text"
                    value={profileForm.academic}
                    onChange={(e) => setProfileForm({ ...profileForm, academic: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1">Security / CTF Distiction</label>
                  <input
                    type="text"
                    value={profileForm.ctfAchievement}
                    onChange={(e) => setProfileForm({ ...profileForm, ctfAchievement: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1">Email</label>
                  <input
                    type="text"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-90 flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: SYNC & EXPORT */}
        {activeTab === 'sync' && (
          <div className="p-6 rounded-xl bg-surface border border-subtle space-y-6 max-w-3xl">
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">
                SDLC Version Control & Git Export
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                Your portfolio supports the full software development lifecycle. Download backups or export changes to commit directly to GitHub.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-elevated/40 border border-border space-y-3">
              <div className="font-mono text-xs font-semibold text-foreground">
                Backup & JSON Export
              </div>
              <p className="text-xs text-muted-foreground font-sans">
                Export all custom projects, achievements, and drafts as a portable JSON file.
              </p>
              <button
                onClick={downloadJSON}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan text-black font-mono text-xs font-semibold hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Portfolio Backup JSON</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-accent-rose/5 border border-accent-rose/30 space-y-3">
              <div className="font-mono text-xs font-semibold text-accent-rose">
                Reset to Code Base Defaults
              </div>
              <p className="text-xs text-muted-foreground font-sans">
                Clears all local browser overrides and resets the portfolio to the original code data stored in `src/data/`.
              </p>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data to original code defaults?')) {
                    resetToDefaults();
                    showToast('Portfolio reset to original code data.');
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-rose/15 border border-accent-rose/40 text-accent-rose font-mono text-xs font-semibold hover:bg-accent-rose/25"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Local Overrides</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
