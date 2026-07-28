import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050505]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full shadow-lg animate-pulse"
              style={{ backgroundColor: project.planetColor }}
            />
            <div>
              <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
                PLANET PROJECT
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                {project.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-body">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {project.description}
          </p>

          {/* Metric Badge */}
          {project.metrics && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              <span>Technologies & Architecture</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-800/80 bg-slate-900/50 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            Aarav Sharma • Open Source Engineering
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-slate-600 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#38BDF8] text-[#050505] font-mono font-bold text-xs hover:bg-[#7dd3fc] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Experience</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
