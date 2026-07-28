import React from 'react';
import { X, Award, Calendar, Building, Sparkles } from 'lucide-react';
import { TimelineMilestone } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface CrystalModalProps {
  milestone: TimelineMilestone | null;
  onClose: () => void;
}

export const CrystalModal: React.FC<CrystalModalProps> = ({ milestone, onClose }) => {
  if (!milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050505]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-sm rotate-45 shadow-lg animate-pulse"
              style={{ backgroundColor: milestone.color }}
            />
            <div>
              <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
                MILESTONE CRYSTAL • {milestone.year}
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                {milestone.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{milestone.year}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <Building className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{milestone.organization}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {milestone.description}
          </p>

          {/* Key Achievements */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#38BDF8]" />
              <span>Key Achievements & Milestones</span>
            </h4>
            <ul className="space-y-2.5">
              {milestone.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800/80 bg-slate-900/50 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-mono text-xs hover:bg-slate-700 transition-all"
          >
            CLOSE CRYSTAL
          </button>
        </div>
      </div>
    </div>
  );
};
