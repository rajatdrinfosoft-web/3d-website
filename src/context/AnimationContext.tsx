import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from '../utils/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineManager } from '../utils/timelineManager';

interface AnimationContextType {
  lenis: Lenis | null;
  isSmoothScrollEnabled: boolean;
  toggleSmoothScroll: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  globalSpeed: number;
  setGlobalSpeed: (speed: number) => void;
  pauseAllAnimations: () => void;
  resumeAllAnimations: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isSmoothScrollEnabled, setIsSmoothScrollEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [globalSpeed, setGlobalSpeedState] = useState(1);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll Engine
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame handler to GSAP ticker
    const gsapTickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(gsapTickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTickerCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync reduced motion preferences with GSAP globally
  useEffect(() => {
    if (reducedMotion) {
      gsap.globalTimeline.timeScale(0.001);
      timelineManager.setGlobalSpeed(0.001);
    } else {
      gsap.globalTimeline.timeScale(globalSpeed);
      timelineManager.setGlobalSpeed(globalSpeed);
    }
  }, [reducedMotion, globalSpeed]);

  const toggleSmoothScroll = () => {
    if (lenisRef.current) {
      if (isSmoothScrollEnabled) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
      setIsSmoothScrollEnabled(!isSmoothScrollEnabled);
    }
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const setGlobalSpeed = (speed: number) => {
    setGlobalSpeedState(speed);
    if (!reducedMotion) {
      gsap.globalTimeline.timeScale(speed);
      timelineManager.setGlobalSpeed(speed);
    }
  };

  const pauseAllAnimations = () => {
    timelineManager.pause();
    gsap.globalTimeline.pause();
  };

  const resumeAllAnimations = () => {
    timelineManager.play();
    gsap.globalTimeline.play();
  };

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenisRef.current && isSmoothScrollEnabled) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimationContext.Provider
      value={{
        lenis,
        isSmoothScrollEnabled,
        toggleSmoothScroll,
        reducedMotion,
        toggleReducedMotion,
        globalSpeed,
        setGlobalSpeed,
        pauseAllAnimations,
        resumeAllAnimations,
        scrollTo,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
};
