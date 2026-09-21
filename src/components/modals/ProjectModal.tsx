import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Layers, Cpu } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-y-auto shadow-2xl p-6 sm:p-8 custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Image */}
          <div className="relative h-52 sm:h-64 w-full rounded-xl overflow-hidden mb-6 bg-slate-950">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-indigo-600 text-xs font-mono font-bold text-white uppercase">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{project.title}</h2>
                <p className="text-sm text-indigo-300 font-medium">{project.subtitle}</p>
              </div>

              <span className="px-3 py-1.5 rounded-lg bg-slate-950/90 text-xs font-mono font-bold text-white border border-indigo-500/40">
                {project.metrics}
              </span>
            </div>
          </div>

          {/* Body Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Overview</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Highlights List */}
            {project.highlights && (
              <div>
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Key Innovations & Engineering Highlights</h3>
                <div className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-indigo-300 font-mono border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all"
              >
                Launch Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all"
              >
                Source Code
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
