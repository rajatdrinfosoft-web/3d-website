import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Reusable hook for managing GSAP animation lifecycle with auto-cleanup context
 */
export function useGSAP(
  effect: (context: gsap.Context) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((context) => {
      effect(context);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}

/**
 * Hook to create a registered timeline in GSAP context
 */
export function useGSAPTimeline(
  id: string,
  config?: gsap.TimelineVars,
  dependencies: React.DependencyList = []
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline(config);
    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return timelineRef;
}
