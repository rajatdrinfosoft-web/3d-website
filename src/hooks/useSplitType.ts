import { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import { createSplitTextReveal } from '../utils/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseSplitTypeOptions {
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: ScrollTrigger.Vars;
  autoReveal?: boolean;
}

/**
 * Hook to split typography into chars, words, or lines and optionally trigger GSAP reveal
 */
export function useSplitType<T extends HTMLElement = HTMLHeadingElement>(
  options: UseSplitTypeOptions = {}
) {
  const targetRef = useRef<T | null>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    if (options.autoReveal !== false) {
      const res = createSplitTextReveal(targetRef.current, {
        type: options.type || 'words',
        stagger: options.stagger,
        duration: options.duration,
        delay: options.delay,
        scrollTrigger: options.scrollTrigger,
      });

      if (res && 'split' in res && 'timeline' in res) {
        splitRef.current = res.split;
        setIsReady(true);
        return () => {
          res.timeline.kill();
          res.split.revert();
          splitRef.current = null;
          setIsReady(false);
        };
      }
    } else {
      const split = new SplitType(targetRef.current, {
        types: options.type || 'words',
      });
      splitRef.current = split;
      setIsReady(true);

      return () => {
        split.revert();
        splitRef.current = null;
        setIsReady(false);
      };
    }
  }, [
    options.type,
    options.stagger,
    options.duration,
    options.delay,
    options.autoReveal,
    options.scrollTrigger,
  ]);

  return { targetRef, splitInstance: splitRef.current, isReady };
}

