import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number; // screen px
  y: number; // screen px
  normX: number; // -1 to 1
  normY: number; // -1 to 1
  hoveredElement: string | null;
  cursorText: string | null;
  cursorVariant: 'default' | 'hover' | 'explore' | 'link' | 'crystal';
}

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: -100,
    y: -100,
    normX: 0,
    normY: 0,
    hoveredElement: null,
    cursorText: null,
    cursorVariant: 'default',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMousePos((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        normX,
        normY,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setCursorState = (
    variant: MousePosition['cursorVariant'],
    text: string | null = null,
    elementId: string | null = null
  ) => {
    setMousePos((prev) => ({
      ...prev,
      cursorVariant: variant,
      cursorText: text,
      hoveredElement: elementId,
    }));
  };

  return { mousePos, setCursorState };
}
