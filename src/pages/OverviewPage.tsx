import React from 'react';
import { motion } from 'motion/react';
import { HeroPanel } from '../components/panels/HeroPanel';
import { Project, ThemeMode } from '../types';

interface OverviewPageProps {
  onSelectProject?: (p: Project) => void;
  theme?: ThemeMode;
  onToggleTheme?: (t: ThemeMode) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <HeroPanel isStandalonePage={true} />
    </motion.div>
  );
};
