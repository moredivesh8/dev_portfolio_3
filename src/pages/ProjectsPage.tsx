import React from 'react';
import { motion } from 'motion/react';
import { ProjectsPanel } from '../components/panels/ProjectsPanel';
import { Project } from '../types';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <ProjectsPanel onSelectProject={onSelectProject} isStandalonePage={true} />
    </motion.div>
  );
};
