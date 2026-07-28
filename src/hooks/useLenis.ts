import { useEffect } from 'react';
import { useAnimationContext } from '../context/AnimationContext';

/**
 * Hook to access Lenis smooth scroll controls and subscribe to scroll events
 */
export function useLenis(
  callback?: (e: { scroll: number; limit: number; velocity: number; direction: number }) => void
) {
  const { lenis, scrollTo, toggleSmoothScroll, isSmoothScrollEnabled } = useAnimationContext();

  useEffect(() => {
    if (!lenis || !callback) return;

    // Subscribe to Lenis scroll updates
    lenis.on('scroll', callback);

    return () => {
      lenis.off('scroll', callback);
    };
  }, [lenis, callback]);

  return {
    lenis,
    scrollTo,
    toggleSmoothScroll,
    isSmoothScrollEnabled,
  };
}
