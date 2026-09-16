"use client";

import type * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
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
              return (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block relative"
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
export interface HeroNavItem {
  label: string;
  href: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

interface PrismaHeroProps {
  navItems?: HeroNavItem[];
  eyebrow?: string;
  title?: string;
  /** Accepts rich content (e.g. hover-preview links) so callers keep their copy interactions. */
  description?: React.ReactNode;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  backgroundVideo?: string;
  backgroundImage?: string;
  className?: string;
}

const DEFAULT_NAV: HeroNavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Contact", href: "mailto:hello@abhinesh.design" },
];

const DEFAULT_DESCRIPTION =
  "Forward-deployed product designer turning ambiguity into something real — product thinking, UX, AI and code, from first question to shipped outcome.";

const PrismaHero = ({
  navItems = DEFAULT_NAV,
  eyebrow = "Abhinesh — Product Designer",
  title = "I go where the\nproblem is.",
  description = DEFAULT_DESCRIPTION,
  primaryCta = { label: "View work", href: "#work" },
  secondaryCta = { label: "Start a project", href: "mailto:hello@abhinesh.design" },
  backgroundVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=2400&auto=format&fit=crop&q=80",
  className,
}: PrismaHeroProps) => {
  return (
    <section className={cn("w-full p-2 md:p-4", className)}>
      <div className="relative h-[94vh] min-h-[620px] w-full overflow-hidden rounded-2xl md:rounded-[2rem]">

        {/* Background image (fallback / poster underneath the video) */}
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={backgroundImage}
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundVideo}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content — title top, description + CTAs bottom-right */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 sm:px-6 md:px-10">

          <div className="mt-20 md:mt-24">
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(225, 224, 204, 0.7)" }}
            >
              {eyebrow}
            </p>
            <h1
              className="font-medium leading-[0.9] tracking-[-0.04em] text-[13vw] sm:text-[11vw] lg:text-[8vw] xl:text-[7vw]"
              style={{ color: "#E1E0CC" }}
            >
              <WordsPullUp text={title} />
            </h1>
          </div>

          <div className="flex justify-end pb-6 md:pb-10">
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
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                >
                  {primaryCta.label}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </a>
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center self-start rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-base"
                >
                  {secondaryCta.label}
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
