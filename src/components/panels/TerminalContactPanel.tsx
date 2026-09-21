import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Send, Terminal as TerminalIcon, CornerDownLeft, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactFormData, TerminalEntry, ThemeMode } from '../../types';
import { INITIAL_TERMINAL_OUTPUT, PROJECTS_DATA, SKILL_NODES, HERO_DATA, CERTIFICATIONS_DATA } from '../../data/portfolioData';

interface TerminalContactPanelProps {
  onExpandPanel?: () => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
  isStandalonePage?: boolean;
}

export const TerminalContactPanel: React.FC<TerminalContactPanelProps> = ({
  onExpandPanel,
  theme,
  onToggleTheme,
  isStandalonePage = false,
}) => {
  // Contact Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Terminal CLI State
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    ...INITIAL_TERMINAL_OUTPUT,
  ]);
  const [commandInput, setCommandInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>(['help', '/projects', '/about']);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Handle Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Trigger celebratory confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.8 },
      });

      // Add record to terminal
      setTerminalHistory(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'input', content: `divesh@portfolio:~$ submit_contact "${formData.subject || 'Inquiry'}"` },
        { id: (Date.now() + 1).toString(), type: 'success', content: `✓ Message dispatched successfully from ${formData.name} <${formData.email}>!` }
      ]);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  // Process CLI Commands
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    // Add command to typed history
    const newEntryInput: TerminalEntry = {
      id: Date.now().toString(),
      type: 'input',
      content: `divesh@portfolio:~$ ${cmd}`
    };

    setPastCommands(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    const cleanCmd = cmd.toLowerCase();

    let outputEntry: TerminalEntry;

    if (cleanCmd === 'help') {
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Available Commands:\n  help            - List terminal commands\n  /projects       - Show engineering projects\n  /about          - View engineer bio & stats\n  /skills         - Output top technical skills\n  /certifications - View verified credentials\n  /contact        - Focus contact form input\n  /clear          - Clear terminal screen\n  /matrix         - Toggle matrix stream effect\n  /theme          - Toggle dark/cyberpunk theme\n  /sudo           - Request administrative access`
      };
    } else if (cleanCmd === '/certifications' || cleanCmd === 'certifications') {
      const certList = CERTIFICATIONS_DATA.map(c => `• ${c.title} (${c.issuer}) -> ID: ${c.credentialId}`).join('\n');
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `VERIFIED CREDENTIALS:\n${certList}`
      };
    } else if (cleanCmd === '/projects' || cleanCmd === 'projects') {
      const projList = PROJECTS_DATA.map(p => `• ${p.title} (${p.category}) -> ${p.metrics}`).join('\n');
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `FEATURED BUILDS:\n${projList}`
      };
    } else if (cleanCmd === '/about' || cleanCmd === 'about' || cleanCmd === 'whoami') {
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `DIVESH | ${HERO_DATA.role}\n${HERO_DATA.tagline}\nLocation: San Francisco, CA\nExperience: 7+ Years | C++, React, WebGPU, Python`
      };
    } else if (cleanCmd === '/skills' || cleanCmd === 'skills') {
      const skillList = SKILL_NODES.map(s => `[${s.category}] ${s.name} - ${s.level}%`).join('\n');
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `SKILL MATRIX:\n${skillList}`
      };
    } else if (cleanCmd === '/contact' || cleanCmd === 'contact') {
      nameInputRef.current?.focus();
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: `Focused contact form input! Enter your message on the left.`
      };
    } else if (cleanCmd === '/clear' || cleanCmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else if (cleanCmd === '/matrix' || cleanCmd === 'matrix') {
      setIsMatrixActive(!isMatrixActive);
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: isMatrixActive ? 'Matrix rain disabled.' : '⚡ Matrix digital stream activated!'
      };
    } else if (cleanCmd === '/theme' || cleanCmd === 'theme') {
      const nextTheme = theme === 'dark' ? 'cyberpunk' : 'dark';
      onToggleTheme(nextTheme);
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: `Theme switched to: ${nextTheme}`
      };
    } else if (cleanCmd.startsWith('/sudo') || cleanCmd === 'sudo') {
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `Permission denied: Divesh system credentials required.`
      };
    } else {
      outputEntry = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `Command not found: "${cmd}". Type "help" for a list of available commands.`
      };
    }

    setTerminalHistory(prev => [...prev, newEntryInput, outputEntry]);
    setCommandInput('');
  };

  // Keyboard Navigation for Command History
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0 && historyIndex < pastCommands.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCommandInput(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setCommandInput(pastCommands[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    }
  };

  return (
    <div className={`relative w-full rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800/80 p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group ${
      isStandalonePage ? 'min-h-[calc(100vh-140px)]' : 'h-full'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with expand option */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Contact & CLI Shell // Interactive Terminal
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

      {/* Dual Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 min-h-[340px]">
        {/* Left Sub-Panel: Contact Form */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 flex items-center justify-between">
              GET IN TOUCH
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </h3>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-4 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Message received! Divesh will respond shortly.
              </motion.div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-slate-900 hover:bg-black border border-slate-700 hover:border-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Dispatching...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-indigo-400" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Sub-Panel: CLI / Terminal */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* macOS Window Titlebar */}
          <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">bash - divesh@portfolio</span>
            </div>
            <TerminalIcon className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Matrix Rain Canvas Overlay */}
          {isMatrixActive && (
            <div className="absolute inset-0 top-8 bg-black/90 z-20 pointer-events-none p-4 font-mono text-emerald-400 text-xs opacity-80 animate-pulse overflow-hidden">
              01000100 01001001 01010110 01000101 01010011 01001000 00100000 01010011 01011001 01010011 01010100
              <br />
              [MATRIX STREAM RUNNING] 01101001 01101110 01101110 01101111 01110110 01100001 01110100 01101001
              <br />
              Wasm / WebGL Shader Cache loaded: 100% OK
            </div>
          )}

          {/* Output History Area */}
          <div className={`p-4 flex-1 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar ${
            isStandalonePage ? 'h-[260px] sm:h-[300px]' : 'h-[200px]'
          }`}>
            {terminalHistory.map(item => (
              <div key={item.id}>
                {item.type === 'input' && (
                  <div className="text-emerald-400 font-semibold">{item.content}</div>
                )}
                {item.type === 'output' && (
                  <div className="text-slate-300 whitespace-pre-wrap pl-2 border-l-2 border-slate-800">{item.content}</div>
                )}
                {item.type === 'system' && (
                  <div className="text-indigo-400 font-mono">{item.content}</div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 font-mono">{item.content}</div>
                )}
                {item.type === 'success' && (
                  <div className="text-cyan-300 font-mono">{item.content}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Command Input Form */}
          <form onSubmit={handleCommandSubmit} className="bg-slate-900/60 border-t border-slate-800 p-2.5 flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-xs font-bold pl-1">divesh@portfolio:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={e => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. help, /projects, /skills)..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
            />
            <button type="submit" className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
