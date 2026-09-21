import React from 'react';
import { motion } from 'motion/react';
import { TerminalContactPanel } from '../components/panels/TerminalContactPanel';
import { ThemeMode } from '../types';

interface ContactPageProps {
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ theme, onToggleTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <TerminalContactPanel theme={theme} onToggleTheme={onToggleTheme} isStandalonePage={true} />
    </motion.div>
  );
};
