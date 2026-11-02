import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ---------------- Lenis smooth-scroll singleton ----------------
   One instance for the whole app, kept in sync with ScrollTrigger
   exactly like the reference integration. */

let lenis: Lenis | null = null;

// Tuned to the same long, soft glide as two26.studio: a slower duration with
// a gentler wheel and a stronger touch multiplier for flick scrolling.
const tick = (time: number) => {
  lenis?.raf(time * 1000);
};

export function initLenis(): Lenis {
  if (lenis) return lenis;
  gsap.registerPlugin(ScrollTrigger);
  lenis = new Lenis({
    duration: 1.7,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 2.6,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroyLenis() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
}
