import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Eye } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { Project, CategoryFilter } from '../../types';

interface ProjectsPanelProps {
  onSelectProject: (project: Project) => void;
  onExpandPanel?: () => void;
  isStandalonePage?: boolean;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({
  onSelectProject,
  onExpandPanel,
  isStandalonePage = false,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');

  const filteredProjects = activeFilter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  return (
    <div className={`relative w-full rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800/80 p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group ${
      isStandalonePage ? 'min-h-[calc(100vh-140px)]' : 'h-full'
    }`}>
      {/* Background light glow */}
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
            FEATURED PROJECTS & SYSTEMS
          </h2>
          <p className="text-xs text-slate-400">Handcrafted spatial engines, AI visualizers, and web applications</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {(['ALL', 'WEB', 'SYSTEMS', 'AI'] as CategoryFilter[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-2 min-h-[40px] rounded-lg text-xs font-bold tracking-wider uppercase transition-all touch-manipulation ${
                activeFilter === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}

          {onExpandPanel && (
            <button
              onClick={onExpandPanel}
              title="Expand Panel Fullscreen"
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 transition-colors ml-1"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Card Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-auto z-10 overflow-y-auto pr-1 custom-scrollbar ${
        isStandalonePage ? 'max-h-[none]' : 'max-h-[480px]'
      }`}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onSelectProject(project)}
              className="group/card relative rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/50 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-80 group-hover/card:opacity-100"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Category & Metric Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600/90 text-[10px] font-mono font-bold text-white shadow-md backdrop-blur-md">
                    {project.metrics}
                  </span>
                </div>

                {/* Quick View Hover Icon */}
                <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-black tracking-tight text-white group-hover/card:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap items-center gap-1 mt-3 pt-2 border-t border-slate-800/80">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 font-mono border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 z-10 text-[11px] text-slate-400">
        <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} projects</span>
        <span>Click any card for architecture deep-dive & live demo</span>
      </div>
    </div>
  );
};
