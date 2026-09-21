import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PanelId, ThemeMode, Project } from '../../types';
import { HeroPanel } from '../panels/HeroPanel';
import { SkillsPanel } from '../panels/SkillsPanel';
import { ProjectsPanel } from '../panels/ProjectsPanel';
import { TerminalContactPanel } from '../panels/TerminalContactPanel';

interface FullPanelModalProps {
  panelId: PanelId | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onNavigateProjects: () => void;
  onNavigateContact: () => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
}

export const FullPanelModal: React.FC<FullPanelModalProps> = ({
  panelId,
  onClose,
  onSelectProject,
  onNavigateProjects,
  onNavigateContact,
  theme,
  onToggleTheme,
}) => {
  if (!panelId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4"
        >
          {/* Top Close Bar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 shadow-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full h-full overflow-y-auto">
            {panelId === 'hero' && (
              <HeroPanel
                onNavigateProjects={onNavigateProjects}
                onNavigateContact={onNavigateContact}
                onExpandPanel={onClose}
              />
            )}
            {panelId === 'skills' && (
              <SkillsPanel onExpandPanel={onClose} />
            )}
            {panelId === 'projects' && (
              <ProjectsPanel
                onSelectProject={onSelectProject}
                onExpandPanel={onClose}
              />
            )}
            {panelId === 'terminal' && (
              <TerminalContactPanel
                onExpandPanel={onClose}
                theme={theme}
                onToggleTheme={onToggleTheme}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
