import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Search, Award, ExternalLink, Filter, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Certification } from '../types';
import { CertificationModal } from '../components/modals/CertificationModal';

export const CertificationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCertification, setActiveCertification] = useState<Certification | null>(null);

  const filteredCertifications = CERTIFICATIONS_DATA.filter(cert => {
    const matchesCategory = selectedCategory === 'ALL' || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-8 py-2"
    >
      {/* Top Banner Header */}
      <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Industry Verified
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                {CERTIFICATIONS_DATA.length} Accreditation Badges
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              CERTIFICATIONS & CREDENTIALS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Verified technical accreditations in cloud architecture, distributed systems, deep learning frameworks, and advanced front-end engineering.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-lg font-mono font-bold text-indigo-400">AWS / GCP</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Cloud Pro</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-lg font-mono font-bold text-emerald-400">CNCF CKA</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Kubernetes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtering & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'CLOUD', 'AI', 'WEB', 'SYSTEMS'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'ALL CREDENTIALS' : cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search credentials or tech..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition-all"
          />
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
          >
            {/* Background Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.gradient}`} />

            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {cert.category}
                  </span>
                  <div className="text-xs font-medium text-slate-400 mt-1">{cert.issuer}</div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5 text-indigo-400" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                {cert.title}
              </h3>

              {/* Description Preview */}
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {cert.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 text-slate-300 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                {cert.issueDate}
              </div>

              <button
                onClick={() => setActiveCertification(cert)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold border border-indigo-500/20 hover:border-indigo-600 transition-all"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty Search State */}
      {filteredCertifications.length === 0 && (
        <div className="text-center py-16 px-4 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <Award className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No certifications found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query or filter settings.</p>
        </div>
      )}

      {/* Certification Verification Modal */}
      <CertificationModal
        certification={activeCertification}
        onClose={() => setActiveCertification(null)}
      />
    </motion.div>
  );
};
