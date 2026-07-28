import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<{
    variant: 'default' | 'hover' | 'explore' | 'link';
    label: string | null;
  }>({
    variant: 'default',
    label: null,
  });

  useEffect(() => {
    // Add class to body to suppress default cursor on desktop pointer devices
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.classList.add('custom-cursor-active');
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check target hover elements
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveBtn = target.closest('button, a, input, select, textarea, [data-cursor]');
      const projectCard = target.closest('[data-cursor-type="explore"]');
      const crystalNode = target.closest('[data-cursor-type="crystal"]');

      if (projectCard) {
        setCursorState({ variant: 'explore', label: 'EXPLORE' });
      } else if (crystalNode) {
        setCursorState({ variant: 'explore', label: 'INSPECT' });
      } else if (interactiveBtn) {
        const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a');
        setCursorState({
          variant: isLink ? 'link' : 'hover',
          label: target.getAttribute('data-cursor-label') || null,
        });
      } else {
        setCursorState({ variant: 'default', label: null });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Smooth trailing spring effect for outer magnetic ring
  useEffect(() => {
    let animId: number;
    const followMouse = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(followMouse);
    };
    animId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <>
      {/* Inner Glowing Cursor Dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: cursorState.variant === 'explore' ? '12px' : '8px',
          height: cursorState.variant === 'explore' ? '12px' : '8px',
          backgroundColor:
            cursorState.variant === 'link'
              ? '#818CF8'
              : cursorState.variant === 'explore'
              ? '#38BDF8'
              : '#F5F5F5',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)',
        }}
      />

      {/* Outer Magnetic Ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex"
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          width:
            cursorState.variant === 'explore'
              ? '72px'
              : cursorState.variant === 'hover' || cursorState.variant === 'link'
              ? '48px'
              : '32px',
          height:
            cursorState.variant === 'explore'
              ? '72px'
              : cursorState.variant === 'hover' || cursorState.variant === 'link'
              ? '48px'
              : '32px',
          borderColor:
            cursorState.variant === 'link'
              ? 'rgba(129, 140, 248, 0.8)'
              : cursorState.variant === 'explore'
              ? 'rgba(56, 189, 248, 0.9)'
              : 'rgba(255, 255, 255, 0.25)',
          backgroundColor:
            cursorState.variant === 'explore' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
          backdropFilter: cursorState.variant === 'explore' ? 'blur(4px)' : 'none',
        }}
      >
        {cursorState.label && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#38BDF8] uppercase select-none">
            {cursorState.label}
          </span>
        )}
      </div>
    </>
  );
};
