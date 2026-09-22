"use client";

import type * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { LoopVideo } from "@/components/ui/loop-video";
import { cn } from "@/lib/utils";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
  /** Words rendered with `accentClassName` (exact match, e.g. ["problem"]). */
  accentWords?: string[];
  accentClassName?: string;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style, accentWords = [], accentClassName = "" }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  // "\n" forces a line break, so titles like "I go where the\nproblem is."
  // keep their two-line shape at every viewport.
  const lines = text.split("\n");
  let wordIndex = 0;

  return (
    <div ref={ref} className={`flex flex-col ${className}`} style={style}>
      {lines.map((line, li) => (
        <span key={li} className="inline-flex flex-wrap">
          {line
            .split(" ")
            .filter(Boolean)
            .map((word, i, words) => {
              const isLast = li === lines.length - 1 && i === words.length - 1;
              const delay = wordIndex++ * 0.08;
              const accented = accentWords.includes(word);
              return (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block relative ${accented ? accentClassName : ""}`}
                  style={{ marginRight: isLast ? 0 : "0.25em" }}
                >
                  {word}
                  {showAsterisk && isLast && (
                    <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
                  )}
                </motion.span>
              );
            })}
        </span>
      ))}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface HeroCta {
  label: string;
  href: string;
}

interface PrismaHeroProps {
  eyebrow?: string;
  /** Accepts rich content (e.g. hover-preview links) so callers keep their copy interactions. */
  description?: React.ReactNode;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta | null;
  backgroundVideo?: string;
  backgroundImage?: string;
  marginNote?: string;
  scrollTarget?: string;
  className?: string;
}

/* Ease-in cubic: slow start, accelerating into the target. */
const easeInCubic = (t: number) => t * t * t;

/* Smooth-scrolls to an in-page anchor with ease-in. Returns false for
   external links (mailto etc.) or missing targets so default behavior applies. */
export function smoothScrollToHref(href: string): boolean {
  if (!href.startsWith("#") || href.length < 2) return false;
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const el = document.querySelector(href);
  if (!el) return false;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return true;
  }
  const startY = window.scrollY;
  const dist = targetY - startY;
  const duration = 900;
  let start: number | null = null;
  const step = (now: number) => {
    if (start === null) start = now;
    const t = Math.min((now - start) / duration, 1);
    window.scrollTo(0, startY + dist * easeInCubic(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return true;
}

const DEFAULT_DESCRIPTION =
  "Forward-deployed product designer turning ambiguity into something real — product thinking, UX, AI and code, from first question to shipped outcome.";

/* Hero overlay grade (mockup match). Tune stops here — one-line changes.
   Mobile extends the horizontal release since text covers more frame. */
const GRADE = {
  horizontal:
    "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.18) 52%, transparent 72%)",
  horizontalMobile:
    "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 65%, transparent 85%)",
  vertical:
    "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 38%, color-mix(in oklch, var(--background) 60%, transparent) 62%, var(--background) 88%)",
  vignette:
    "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
};

const PrismaHero = ({
  eyebrow = "Forward-deployed\nProduct Designer",
  description = DEFAULT_DESCRIPTION,
  primaryCta = { label: "View work", href: "#work" },
  secondaryCta = null,
  backgroundVideo = "/art/hero-video.mp4",
  backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=2400&auto=format&fit=crop&q=80",
  marginNote = "Some Curiosity\nDifferent Problems.",
  scrollTarget = "#mindset",
  className,
}: PrismaHeroProps) => {
  return (
    <section className={cn("w-full", className)}>
      <div className="relative h-[100vh] min-h-[620px] w-full overflow-hidden snap-start">

        {/* Background image (fallback / poster underneath the video) */}
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover [object-position:50%_15%] max-sm:[object-position:63%_15%]"
        />

        {/* Background video — dips to black before each loop restart */}
        <LoopVideo
          src={backgroundVideo}
          poster={backgroundImage}
          fadeToBlack={0.8}
          className="absolute inset-0 h-full w-full"
          videoClassName="[object-position:50%_15%] max-sm:[object-position:63%_15%]"
        />

        {/* Overlay grade — horizontal linear scrim (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{ background: GRADE.horizontal }}
        />

        {/* Overlay grade — horizontal linear scrim (mobile, extended release) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 sm:hidden"
          style={{ background: GRADE.horizontalMobile }}
        />

        {/* Overlay grade — vertical linear melt (nav shade + base dissolve) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: GRADE.vertical }}
        />

        {/* Overlay grade — vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: GRADE.vignette }}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Handwritten margin note — mockup voice, desktop only */}
        <p
          aria-hidden
          className="font-hand absolute right-6 top-24 hidden w-32 rotate-3 whitespace-pre-line text-right text-2xl leading-tight text-[#E1E0CC]/60 lg:block lg:right-[120px]"
        >
          {marginNote}
        </p>

        {/* Hero content — title top, description + CTAs bottom-right */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 pt-32 pb-6 sm:px-8 sm:pb-8 sm:pt-32 md:px-[120px] md:pb-12 md:pt-40">

          <div>
            <p
              className="font-hand mb-5 ml-1 -rotate-[4deg] origin-left whitespace-pre-line text-2xl leading-tight md:text-3xl"
              style={{ color: "rgba(225, 224, 204, 0.85)" }}
            >
              {eyebrow}
            </p>
          </div>

          <div className="flex justify-end">
            <div className="flex w-full flex-col gap-5 md:w-2/3 lg:w-1/3">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href={primaryCta.href}
                  onClick={(e) => {
                    if (smoothScrollToHref(primaryCta.href)) e.preventDefault();
                  }}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                >
                  {primaryCta.label}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </a>
                {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center self-start rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-base"
                >
                  {secondaryCta.label}
                </a>
                ) : null}
              </motion.div>

            </div>
          </div>
        </div>

        {/* Scroll cue — bottom-left, eased scroll into the next chapter */}
        <button
          onClick={() => smoothScrollToHref(scrollTarget)}
          className="absolute bottom-6 left-6 z-10 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/55 transition-colors hover:text-[#E1E0CC] sm:bottom-8 sm:left-8 md:bottom-12 md:left-[120px]"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#FF4B16]/60">
            <span
              aria-hidden
              className="scroll-cue-ring absolute inset-0 rounded-full border border-[#FF4B16]/50"
            />
            <ArrowDown className="scroll-cue-arrow h-5 w-5 text-[#FF4B16]" strokeWidth={1.75} />
          </span>
          Scroll to explore
        </button>
      </div>
    </section>
  );
};

export { PrismaHero };
