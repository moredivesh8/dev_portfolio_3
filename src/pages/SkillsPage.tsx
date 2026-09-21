import React from 'react';
import { motion } from 'motion/react';
import { SkillsPanel } from '../components/panels/SkillsPanel';

export const SkillsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <SkillsPanel isStandalonePage={true} />
    </motion.div>
  );
};
