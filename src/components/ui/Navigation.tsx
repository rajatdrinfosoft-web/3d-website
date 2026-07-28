import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, Sparkles, Send, FileText, Menu, X, Compass } from 'lucide-react';
import { CHAPTERS } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface NavigationProps {
  currentChapter: number;
  scrollProgress: number;
  onNavigate: (chapterIndex: number) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentChapter,
  scrollProgress,
  onNavigate,
  reducedMotion,
  onToggleReducedMotion,
  onOpenContact,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const active = soundFx.toggleMute();
    setIsAudioActive(active);
  };

  const handleNavClick = (idx: number) => {
    soundFx.playClick();
    onNavigate(idx);
    setIsMobileMenuOpen(false);
  };

  const activeChapterData = CHAPTERS[Math.min(CHAPTERS.length - 1, currentChapter)] || CHAPTERS[0];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/75 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick(0)}
            className="group flex items-center gap-3 text-left focus:outline-none"
            data-cursor-label="GENESIS"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono text-sm font-bold text-[#38BDF8] group-hover:border-[#38BDF8] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
              AS
            </div>
            <div>
              <span className="font-heading font-semibold text-sm tracking-wider text-slate-100 block group-hover:text-[#38BDF8] transition-colors">
                AARAV SHARMA
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase block">
                B.Tech CSE • Universe
              </span>
            </div>
          </button>

          {/* Current Chapter HUD Indicator */}
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <span className="text-[#38BDF8] font-bold">
              0{activeChapterData.chapter} / 08
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-200 uppercase tracking-wider font-semibold">
              {activeChapterData.title}
            </span>
            <span className="text-slate-500 text-[10px] hidden lg:inline">
              ({activeChapterData.subtitle})
            </span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                isAudioActive
                  ? 'border-[#38BDF8]/60 bg-[#38BDF8]/10 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
              title={isAudioActive ? 'Mute Sound FX' : 'Enable Ambient Sound'}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px] font-medium">
                {isAudioActive ? 'SOUND ON' : 'MUTED'}
              </span>
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={onToggleReducedMotion}
              className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                reducedMotion
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
              title={reducedMotion ? 'Enable Full 3D Motion' : 'Enable Reduced Motion Mode'}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-medium">
                {reducedMotion ? '2D MODE' : '3D FLIGHT'}
              </span>
            </button>

            {/* Resume Link */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Aarav Sharma - Resume PDF downloaded.');
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 text-xs font-mono text-slate-200 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>

            {/* Portal / Contact Trigger */}
            <button
              onClick={() => {
                soundFx.playWarpWhoosh();
                onOpenContact();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8] text-[#050505] font-mono font-semibold text-xs hover:bg-[#7dd3fc] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PORTAL</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-full bg-slate-900/50 h-[2px]">
          <div
            className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#EC4899] h-[2px] transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </header>

      {/* Floating Chapter Navigation Sidebar (Desktop) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
        <div className="p-2 rounded-2xl bg-[#050505]/80 border border-white/10 backdrop-blur-md flex flex-col items-center gap-2 shadow-2xl">
          {CHAPTERS.map((chap, idx) => {
            const isActive = currentChapter === idx;
            return (
              <button
                key={chap.id}
                onClick={() => handleNavClick(idx)}
                className="group relative flex items-center justify-center w-8 h-8 rounded-xl transition-all"
                title={`${chap.chapter}. ${chap.title}`}
              >
                {/* Indicator Dot/Box */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-[#38BDF8] shadow-[0_0_12px_#38BDF8] scale-125'
                      : 'bg-slate-700 group-hover:bg-slate-400'
                  }`}
                />

                {/* Hover Tooltip Popup */}
                <div className="absolute right-12 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono shadow-xl flex items-center gap-2">
                  <span className="text-[#38BDF8] font-bold">0{chap.chapter}</span>
                  <span className="text-slate-200 uppercase">{chap.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl md:hidden flex flex-col p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#38BDF8]" />
              <span className="font-heading font-bold text-lg">CHAPTER NAVIGATOR</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-3">
            {CHAPTERS.map((chap, idx) => {
              const isActive = currentChapter === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleNavClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all ${
                    isActive
                      ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono text-[#38BDF8]">CHAPTER 0{chap.chapter}</div>
                    <div className="font-heading font-semibold text-base text-slate-100">{chap.title}</div>
                    <div className="text-xs text-slate-400">{chap.subtitle}</div>
                  </div>
                  {isActive && <Sparkles className="w-5 h-5 text-[#38BDF8]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 font-mono text-xs">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Aarav Sharma - Resume PDF downloaded.');
              }}
              className="flex-1 py-3 text-center rounded-xl border border-slate-800 bg-slate-900 text-slate-200"
            >
              DOWNLOAD RESUME
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-3 text-center rounded-xl bg-[#38BDF8] text-[#050505] font-bold"
            >
              ENTER PORTAL
            </button>
          </div>
        </div>
      )}
    </>
  );
};
