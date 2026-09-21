import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

import { Header } from './components/Header';
import { OverviewPage } from './pages/OverviewPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectModal } from './components/modals/ProjectModal';
import { FullScreenParticleCanvas } from './components/3d/FullScreenParticleCanvas';
import { Project, ThemeMode } from './types';

function AnimatedRoutes({
  onSelectProject,
  theme,
  onToggleTheme,
}: {
  onSelectProject: (p: Project) => void;
  theme: ThemeMode;
  onToggleTheme: (t: ThemeMode) => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <OverviewPage
              onSelectProject={onSelectProject}
              theme={theme}
              onToggleTheme={onToggleTheme}
            />
          }
        />
        <Route path="/skills" element={<SkillsPage />} />
        <Route
          path="/projects"
          element={<ProjectsPage onSelectProject={onSelectProject} />}
        />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route
          path="/contact"
          element={<ContactPage theme={theme} onToggleTheme={onToggleTheme} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('divesh_portfolio_theme') as ThemeMode;
    return (saved === 'dark' || saved === 'cyberpunk' || saved === 'light') ? saved : 'dark';
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('divesh_portfolio_theme', theme);
    document.documentElement.className = theme === 'light' ? 'theme-light' : theme === 'cyberpunk' ? 'theme-cyberpunk' : 'theme-dark';
    document.body.className = getThemeClass();
  }, [theme]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
    });
  };

  const getThemeClass = () => {
    if (theme === 'cyberpunk') return 'theme-cyberpunk bg-black text-emerald-400';
    if (theme === 'light') return 'theme-light bg-slate-100 text-slate-900';
    return 'theme-dark bg-slate-950 text-slate-100';
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen w-full transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white flex flex-col justify-between relative overflow-x-hidden ${getThemeClass()}`}>
        {/* Full-Screen Background Three.js Particle System */}
        <FullScreenParticleCanvas theme={theme} />

        <div className="relative z-10 flex flex-col justify-between min-h-screen">
          <div>
            {/* Top Header Navigation with Routing Links */}
            <Header
              theme={theme}
              onToggleTheme={setTheme}
              onTriggerConfetti={triggerConfetti}
            />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 md:pb-6 w-full">
              <AnimatedRoutes
                onSelectProject={setSelectedProject}
                theme={theme}
                onToggleTheme={setTheme}
              />
            </main>
          </div>

          {/* Footer */}
          <footer className="w-full border-t border-slate-900/80 py-6 px-4 text-center text-xs text-slate-500 mt-12">
            <p>© {new Date().getFullYear()} Divesh. Architected with React, Three.js & Tailwind CSS.</p>
          </footer>
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </BrowserRouter>
  );
}
