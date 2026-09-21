import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Copy, Check, Award, Calendar, Hash } from 'lucide-react';
import { Certification } from '../../types';

interface CertificationModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ certification, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!certification) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(certification.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Banner with Gradient */}
          <div className={`h-28 w-full bg-gradient-to-r ${certification.gradient} relative flex items-end p-6`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/50 text-white hover:bg-slate-950/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Credential Verified
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Issuer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold uppercase text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {certification.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{certification.issuer}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {certification.title}
                </h3>
              </div>
            </div>

            {/* Credential Meta Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-indigo-400" />
                  Credential ID:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-slate-200 font-medium">
                  {certification.credentialId}
                  <button
                    onClick={handleCopyId}
                    title="Copy Credential ID"
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Validity Period:
                </span>
                <span className="font-mono text-slate-200 font-medium">{certification.issueDate}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {certification.description}
            </p>

            {/* Verified Skills Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                Verified Competencies & Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certification.skillsVerified.map((skill, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {certification.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Verification Link Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>

              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                Verify on Official Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
