import { useReducedMotion, type MotionProps } from "motion/react";

/* Shared motion for the CBL CBA page. Entrances use transform and opacity only, play once when a block scrolls in
   (or on load for the hero), and are switched off for reduced motion, where the final state shows straight away.
   Loops are limited to the hero halo and the "Available to all teachers" pill ring. Hover effects are written in the
   components with Tailwind's motion-safe: variant, so they are also off for reduced motion. */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function useCblReduce(): boolean {
  return useReducedMotion() ?? false;
}

/* Rise and fade in when the element first scrolls into view. */
export function inView(reduce: boolean, delay = 0, y = 24, duration = 0.8): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/* Rise and fade in on page load, for content already in view (the hero). */
export function onLoad(reduce: boolean, delay = 0, y = 24, duration = 0.9): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/* Draw a stroke from nothing to full length when it first scrolls into view. */
export function drawIn(reduce: boolean, delay = 0, duration = 1.1): MotionProps {
  if (reduce) return {};
  return {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/* Draw a stroke on page load, for strokes already in view (the hero). */
export function drawOnLoad(reduce: boolean, delay = 0, duration = 1.1): MotionProps {
  if (reduce) return {};
  return {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/* Grow from a point along one axis, for dividers and rules. */
export function growIn(reduce: boolean, delay = 0): MotionProps {
  if (reduce) return {};
  return {
    initial: { scaleY: 0 },
    whileInView: { scaleY: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  };
}

/* Pop in with a small overshoot, for number badges and dots. */
export function popIn(reduce: boolean, delay = 0): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, scale: 0.4 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { type: "spring", stiffness: 380, damping: 18, delay },
  };
}

/* The one-time flicker of step 6's rays. Under reduced motion it is empty, so the rays show at full opacity. */
export function flicker(reduce: boolean, delay = 1.0): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: [0, 1, 0.35, 1] },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 1.1, delay },
  };
}

/* The loops. Each is a transform and opacity animation, and reduced motion stops them. */
export const CBL_MOTION_CSS = `
.cbl-halo { animation: cbl-halo 2.6s ease-out infinite; }
@keyframes cbl-halo { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(3.2); opacity: 0; } }
.cbl-ring { animation: cbl-ring 2.8s ease-out infinite; border: 2px solid rgba(98, 32, 184, 0.35); border-radius: inherit; }
@keyframes cbl-ring { 0% { transform: scale(1); opacity: 0.6; } 70%, 100% { transform: scale(1.14); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .cbl-halo, .cbl-ring { animation: none; }
  .cbl-halo, .cbl-ring { opacity: 0; }
}
`;
