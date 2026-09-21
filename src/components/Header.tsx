import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Terminal, Code2, FolderGit2, Sparkles, Moon, Monitor, Sun, Award } from 'lucide-react';
import { ThemeMode } from '../types';
import { Magnetic } from './common/Magnetic';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
  onTriggerConfetti: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onTriggerConfetti,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 dark:bg-slate-950/90 border-b border-slate-800/80 px-4 lg:px-8 py-2.5 sm:py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group text-left focus:outline-none min-h-[44px]"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-lg text-white">
                  ▲
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-white text-base">DIVESH</span>
                  <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Core v2.4
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-tight">Full-Stack & Systems Engineer</p>
              </div>
            </Link>

            {/* Status Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Hire
            </div>
          </div>

          {/* Desktop Multi-Page Navigation Routes (hidden on mobile below 768px, replaced by fixed bottom bar) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="/skills"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Skills</span>
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Projects</span>
            </NavLink>

            <NavLink
              to="/certifications"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certifications</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Contact / CLI</span>
            </NavLink>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Confetti Celebration Button */}
            <button
              onClick={onTriggerConfetti}
              title="Trigger celebration particles"
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Theme Mode Toggle Switcher */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
              <button
                onClick={() => onToggleTheme('dark')}
                className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Dark Midnight Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onToggleTheme('cyberpunk')}
                className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
                  theme === 'cyberpunk'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/40'
                    : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60'
                }`}
                title="Cyberpunk Matrix Mode"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onToggleTheme('light')}
                className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
                  theme === 'light'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/40'
                    : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/60'
                }`}
                title="Clean Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contact Direct CTA */}
            <Magnetic intensity={0.25}>
              <button
                onClick={() => navigate('/contact')}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
              >
                Let's Talk
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Mobile Glassmorphic Fixed Bottom Navigation Bar (< 768px) */}
      <nav 
        aria-label="Mobile Navigation" 
        className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-2xl flex items-center justify-around md:hidden"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 px-1 rounded-xl text-[10px] font-semibold tracking-tight transition-all ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Sparkles className="w-4 h-4" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 px-1 rounded-xl text-[10px] font-semibold tracking-tight transition-all ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Code2 className="w-4 h-4" />
          <span>Skills</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 px-1 rounded-xl text-[10px] font-semibold tracking-tight transition-all ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/certifications"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 px-1 rounded-xl text-[10px] font-semibold tracking-tight transition-all ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Award className="w-4 h-4" />
          <span>Certs</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 px-1 rounded-xl text-[10px] font-semibold tracking-tight transition-all ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Terminal className="w-4 h-4" />
          <span>Contact</span>
        </NavLink>
      </nav>
    </>
  );
};
