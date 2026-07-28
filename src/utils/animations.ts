import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Standard Cinematic Easing Presets
export const EASES = {
  expoOut: 'power4.out',
  expoInOut: 'power4.inOut',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  elastic: 'back.out(1.7)',
  slowMo: 'power2.out',
};

/**
 * Text Splitting Helper with GSAP Stagger Reveal
 */
export const createSplitTextReveal = (
  element: HTMLElement | string,
  options?: {
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return null;

  const type = options?.type || 'words';
  const split = new SplitType(el as HTMLElement, { types: type });

  const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

  if (!targets) return split;

  const tl = gsap.timeline({
    scrollTrigger: options?.scrollTrigger
      ? {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTrigger,
        }
      : undefined,
  });

  tl.fromTo(
    targets,
    {
      opacity: 0,
      y: 30,
      rotateX: -45,
      filter: 'blur(10px)',
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: options?.duration || 0.8,
      stagger: options?.stagger || 0.03,
      delay: options?.delay || 0,
      ease: EASES.smooth,
    }
  );

  return { split, timeline: tl };
};

/**
 * Magnetic Element Attractor Helper
 */
export const applyMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};

/**
 * Parallax Scroll Element Helper
 */
export const createParallaxEffect = (
  element: HTMLElement | string,
  speed: number = 0.2
) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return null;

  return gsap.to(el, {
    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
};

export { gsap, ScrollTrigger, SplitType };
