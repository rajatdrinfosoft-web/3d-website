import { useState, useEffect, useCallback } from 'react';

export interface ScrollState {
  progress: number; // 0 to 1
  rawProgress: number;
  chapterIndex: number; // 0 to 7
  scrollSpeed: number; // calculated delta speed
  isScrolling: boolean;
}

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    rawProgress: 0,
    chapterIndex: 0,
    scrollSpeed: 0,
    isScrolling: false,
  });

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? scrollTop / scrollHeight : 0));

    // Calculate chapter (8 chapters, each taking roughly 1/8th of progress)
    const totalChapters = 8;
    const chapterIndex = Math.min(totalChapters - 1, Math.floor(progress * totalChapters));

    setScrollState((prev) => {
      const speed = Math.abs(progress - prev.progress);
      return {
        progress,
        rawProgress: scrollTop,
        chapterIndex,
        scrollSpeed: speed,
        isScrolling: speed > 0.0001,
      };
    });
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let timeoutId: NodeJS.Timeout;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? currentScrollY / scrollHeight : 0));
      const totalChapters = 8;
      const chapterIndex = Math.min(totalChapters - 1, Math.floor(progress * totalChapters));
      const delta = Math.abs(currentScrollY - lastScrollY);

      setScrollState({
        progress,
        rawProgress: currentScrollY,
        chapterIndex,
        scrollSpeed: Math.min(delta / 20, 5), // capped velocity factor
        isScrolling: delta > 0.5,
      });

      lastScrollY = currentScrollY;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollState((prev) => ({ ...prev, scrollSpeed: 0, isScrolling: false }));
      }, 150);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToChapter = (index: number) => {
    if (typeof window === 'undefined') return;
    const totalChapters = 8;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / totalChapters) * scrollHeight + (scrollHeight / (totalChapters * 2));
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return { ...scrollState, scrollToChapter };
}
