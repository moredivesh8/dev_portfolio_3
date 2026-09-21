import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { SKILL_NODES } from '../../data/portfolioData';
import { Bracket3DCanvas } from '../3d/Bracket3DCanvas';
import { SkillNode } from '../../types';

interface SkillsPanelProps {
  onExpandPanel?: () => void;
  isStandalonePage?: boolean;
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ onExpandPanel, isStandalonePage = false }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(SKILL_NODES[1]); // Default Three.js
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const activeSkillForCanvas = hoveredSkill?.id || selectedSkill?.id;

  const filteredSkills = filterCategory === 'ALL' 
    ? SKILL_NODES 
    : SKILL_NODES.filter(s => s.category.toUpperCase() === filterCategory);

  const isConnected = (sourceId: string, targetId: string) => {
    if (!selectedSkill) return false;
    if (selectedSkill.id === sourceId || selectedSkill.id === targetId) {
      return selectedSkill.connections.includes(sourceId) || selectedSkill.connections.includes(targetId);
    }
    return false;
  };

  return (
    <div className={`relative w-full rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800/80 p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group ${
      isStandalonePage ? 'min-h-[calc(100vh-140px)]' : 'h-full'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            CORE SKILLS & TECH MAP
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono">
            Interactive Graph
          </span>
        </div>

        {onExpandPanel && (
          <button
            onClick={onExpandPanel}
            title="Expand Panel Fullscreen"
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 z-10 mb-4">
        {['ALL', 'LANGUAGES', 'FRAMEWORKS', 'SYSTEMS', 'TOOLS'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold transition-all touch-manipulation ${
              filterCategory === cat
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 font-bold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Graph Left/Center, 3D Brackets Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto z-10 min-h-[280px]">
        {/* Graph Area */}
        <div className={`lg:col-span-8 relative w-full bg-slate-950/60 rounded-xl border border-slate-800/80 p-4 overflow-hidden ${
          isStandalonePage ? 'h-[340px] sm:h-[420px]' : 'h-[280px] sm:h-[300px]'
        }`}>
          {/* Canvas Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {SKILL_NODES.map(skill => {
              return skill.connections.map(targetId => {
                const targetNode = SKILL_NODES.find(n => n.id === targetId);
                if (!targetNode) return null;
                const active = isConnected(skill.id, targetId);
                return (
                  <line
                    key={`${skill.id}-${targetId}`}
                    x1={`${skill.x}%`}
                    y1={`${skill.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={active ? '#a855f7' : '#334155'}
                    strokeWidth={active ? '2.5' : '1'}
                    strokeDasharray={active ? '4' : 'none'}
                    className={active ? 'animate-pulse' : 'opacity-40'}
                  />
                );
              });
            })}
          </svg>

          {/* Interactive Skill Nodes */}
          {filteredSkills.map(skill => {
            const isSelected = selectedSkill?.id === skill.id;
            const isConn = selectedSkill && selectedSkill.connections.includes(skill.id);

            return (
              <motion.button
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.95 }}
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-violet-600/50 ring-2 ring-violet-300 scale-110 z-20'
                    : isConn
                    ? 'bg-indigo-600/80 text-white shadow-indigo-500/30 ring-1 ring-indigo-400'
                    : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                {skill.name}
              </motion.button>
            );
          })}
        </div>

        {/* 3D Code Bracket Graphic */}
        <div className={`lg:col-span-4 relative flex items-center justify-center ${
          isStandalonePage ? 'h-[300px]' : 'h-[220px]'
        }`}>
          <Bracket3DCanvas activeSkill={activeSkillForCanvas} />
        </div>
      </div>

      {/* Selected Skill Details Card */}
      <AnimatePresence mode="wait">
        {selectedSkill && (
          <motion.div
            key={selectedSkill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{selectedSkill.name}</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                  {selectedSkill.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{selectedSkill.description}</p>
            </div>

            {/* Proficiency Meter */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-sm font-mono font-bold text-violet-400">{selectedSkill.level}%</span>
                <span className="text-[10px] text-slate-400">Mastery</span>
              </div>
              <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full transition-all duration-500"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
