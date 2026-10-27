import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

/* ---------------- Hero ↔ About scroll parallax ----------------
   One continuous scrubbed choreography across both stages: the hero
   video drifts slow, hero copy lifts and dissolves faster, and the
   About band's inner layers travel on staggered ratios. Scrubbed, so
   scrolling back up reverses everything for free. */

export function useHeroAboutParallax() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-hp-stage='hero']");
      if (hero) {
        const q = gsap.utils.selector(hero);
        gsap.set(q("[data-hp='hero-video']"), { scale: 1.2 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          })
          .to(q("[data-hp='hero-video']"), { yPercent: 8, ease: "none" }, 0)
          .to(q("[data-hp='hero-copy']"), { yPercent: -12, ease: "none" }, 0)
          .to(q("[data-hp='hero-cue']"), { opacity: 0, ease: "none" }, 0);
      }

      const about = document.querySelector("[data-hp-stage='about']");
      if (about) {
        const q = gsap.utils.selector(about);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: about,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          })
          .fromTo(
            q("[data-hp='about-head']"),
            { yPercent: 14 },
            { yPercent: -6, ease: "none" },
            0,
          )
          .fromTo(
            q("[data-hp='about-polaroids']"),
            { yPercent: 10 },
            { yPercent: -8, ease: "none" },
            0,
          )
          .fromTo(
            q("[data-hp='about-mountains']"),
            { yPercent: 18 },
            { yPercent: -10, ease: "none" },
            0,
          );
      }
    });

    return () => ctx.revert();
  }, [reduce]);
}
