import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Maximize2, Github, Linkedin, Mail } from 'lucide-react';
import { HeroCanvas3D } from '../3d/HeroCanvas3D';
import { HERO_DATA } from '../../data/portfolioData';
import { Magnetic } from '../common/Magnetic';
import { CountUpNumber } from '../common/CountUpNumber';

interface HeroPanelProps {
  onNavigateProjects?: () => void;
  onNavigateContact?: () => void;
  onExpandPanel?: () => void;
  isStandalonePage?: boolean;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({
  onNavigateProjects,
  onNavigateContact,
  onExpandPanel,
  isStandalonePage = false,
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 25 });

  // Mouse move handler for card tilt & border lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleProjectsClick = () => {
    if (onNavigateProjects) {
      onNavigateProjects();
    } else {
      navigate('/projects');
    }
  };

  const handleContactClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full rounded-2xl bg-white/90 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 p-6 lg:p-8 flex flex-col justify-between overflow-hidden backdrop-blur-2xl transition-shadow duration-300 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15),0_10px_30px_-10px_rgba(6,182,212,0.18)] dark:shadow-[0_10px_50px_-10px_rgba(0,0,0,0.7)] group ${
          isStandalonePage ? 'min-h-[calc(100vh-140px)]' : 'h-full'
        }`}
      >
        {/* Background ambient radial lighting */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-400/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic mouse gradient border line */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-500/20 pointer-events-none transition-colors duration-500" />

        {/* Top Bar with Expand Control */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
              Overview // Interactive 3D Spatial Canvas
            </span>
          </div>
          {onExpandPanel && (
            <Magnetic intensity={0.2}>
              <button
                onClick={onExpandPanel}
                title="Expand Panel Fullscreen"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/50 transition-colors shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          )}
        </div>

        {/* Main Grid Content: Text Left, 3D Canvas Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                DIVESH <span className="text-indigo-500 dark:text-indigo-400 font-light">|</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-blue-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  INNOVATIVE ENGINEER
                </span>
              </h1>
            </motion.div>

            {/* Tagline text with increased vertical spacing (leading-7) */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-7 max-w-xl">
              {HERO_DATA.tagline}
            </p>

            {/* Action CTA Buttons with Magnetic Snap */}
            <div className="flex flex-wrap items-center gap-4 pt-2 mb-2">
              <Magnetic intensity={0.3}>
                <button
                  onClick={handleProjectsClick}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 dark:hover:bg-slate-900 border border-slate-800 text-white font-semibold text-xs tracking-wider uppercase shadow-xl hover:border-indigo-500/50 transition-all group/btn"
                >
                  VIEW PROJECTS
                  <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic intensity={0.3}>
                <button
                  onClick={handleContactClick}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-semibold text-xs tracking-wider uppercase hover:text-slate-950 dark:hover:text-white transition-all shadow-sm"
                >
                  LET'S TALK
                </button>
              </Magnetic>
            </div>

            {/* Social Quick Links with Magnetic Snap */}
            <div className="flex items-center gap-3 pt-1">
              <Magnetic intensity={0.35}>
                <a
                  href={HERO_DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/40 transition-colors shadow-sm block"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic intensity={0.35}>
                <a
                  href={HERO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/40 transition-colors shadow-sm block"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic intensity={0.35}>
                <a
                  href={`mailto:${HERO_DATA.socials.email}`}
                  title="Send Email"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/40 transition-colors shadow-sm block"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right 3D Interactive Canvas Column */}
          <div className="lg:col-span-5 h-[320px] sm:h-[380px] w-full relative flex items-center justify-center overflow-visible">
            <HeroCanvas3D />
          </div>
        </div>

        {/* Bottom Metrics Bar - High contrast distinct footer-bar container */}
        <div className="w-full mt-6 pt-4 z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 shadow-inner backdrop-blur-md">
            {HERO_DATA.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  <CountUpNumber value={stat.value} />
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
