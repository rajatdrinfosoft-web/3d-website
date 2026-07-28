import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "> Booting Developer...",
  "> Loading Experience...",
  "> Building Universe...",
  "> Welcome."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (currentLineIndex < BOOT_LINES.length) {
      const targetLine = BOOT_LINES[currentLineIndex];

      if (charIndex < targetLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const next = [...prev];
            if (!next[currentLineIndex]) {
              next[currentLineIndex] = "";
            }
            next[currentLineIndex] += targetLine[charIndex];
            return next;
          });
          setCharIndex((c) => c + 1);
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((l) => l + 1);
          setCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Completed terminal typing
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 500);
      return () => clearTimeout(fadeTimeout);
    }
  }, [currentLineIndex, charIndex, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] font-mono text-[#38BDF8] transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md px-6 py-8 rounded-lg border border-slate-800/80 bg-slate-950/90 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800 text-xs text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          <span className="ml-2 font-semibold tracking-wider text-slate-400">UNIVERSE_KERNEL_v4.2</span>
        </div>

        <div className="space-y-3 min-h-[140px] text-sm md:text-base leading-relaxed">
          {displayedText.map((line, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={idx === BOOT_LINES.length - 1 ? 'text-emerald-400 font-bold' : 'text-[#38BDF8]'}>
                {line}
              </span>
              {idx === currentLineIndex && (
                <span className="inline-block w-2 h-4 bg-[#38BDF8] animate-pulse"></span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>AARAV SHARMA PORTFOLIO</span>
          <span className="text-[#38BDF8] font-mono font-semibold">
            {Math.min(100, Math.round(((currentLineIndex + 1) / BOOT_LINES.length) * 100))}%
          </span>
        </div>
      </div>
    </div>
  );
};
