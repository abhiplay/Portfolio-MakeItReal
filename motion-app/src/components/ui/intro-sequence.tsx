"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/* ---------------- Intro autoplay sequence ----------------
   Full-screen preloader matching the Figma filmstrip:
   scene + headline → MESSY → UNCLEAR → line-art + NOT FIGURED OUT →
   fades out to reveal the hero (already playing underneath).
   Skippable; reduced-motion skips everything. */

const HOLD_1 = 3200;
const HOLD_2 = 2000;
const HOLD_3 = 2000;
const HOLD_4 = 3000;
const XFADE = 800;
const EXIT_FADE = 1000;

const T1 = HOLD_1;
const T2 = T1 + XFADE + HOLD_2;
const T3 = T2 + XFADE + HOLD_3;
const T_EXIT = T3 + XFADE + HOLD_4;
const T_DONE = T_EXIT + EXIT_FADE;

interface IntroSequenceProps {
  onDone: () => void;
  className?: string;
}

export function IntroSequence({ onDone, className }: IntroSequenceProps) {
  const [beat, setBeat] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduce = useReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      doneRef.current();
      return;
    }
    const timers: number[] = [
      window.setTimeout(() => setBeat(1), T1),
      window.setTimeout(() => setBeat(2), T2),
      window.setTimeout(() => setBeat(3), T3),
      window.setTimeout(() => setExiting(true), T_EXIT),
      window.setTimeout(() => doneRef.current(), T_DONE),
    ];
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  // Lock page scroll while the takeover is mounted.
  useEffect(() => {
    if (reduce) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = prev;
      getLenis()?.start();
    };
  }, [reduce]);

  if (reduce) return null;

  const skip = () => {
    doneRef.current();
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Introduction"
      className={cn("fixed inset-0 z-[100] bg-black", className)}
      initial={{ opacity: 0, filter: "blur(0px)" }}
      animate={{ opacity: exiting ? 0 : 1, filter: exiting ? "blur(18px)" : "blur(0px)" }}
      transition={{ duration: exiting ? EXIT_FADE / 1000 : 0.5, ease: "easeOut" }}
    >
      {/* Beat 1 — scene + headline (slow in, slow out, never snappy) */}
      <motion.img
        src="/art/intro-frame-1.webp"
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: beat === 0 ? 1 : 0, scale: 1 }}
        transition={{
          opacity: { duration: 1.2, ease: "easeInOut" },
          scale: { duration: 9, ease: "linear" },
        }}
      />
      {/* Radial black fill — holds the frame's edges in darkness */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.7) 100%)",
        }}
        initial={false}
        animate={{ opacity: beat === 0 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-[16%] px-6 md:px-[120px]">
        <BlurReveal
          trigger={beat === 0}
          as="span"
          delay={1.0}
          speedReveal={0.85}
          speedSegment={0.6}
          className="block font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
        >
          I go where the
        </BlurReveal>
        <span className="flex items-baseline gap-[0.28em]">
          <BlurReveal
            trigger={beat === 0}
            as="span"
            delay={1.5}
            speedReveal={0.85}
            speedSegment={0.6}
            className="inline-block font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[#FF4B16]"
          >
            Problem
          </BlurReveal>
          <BlurReveal
            trigger={beat === 0}
            as="span"
            delay={1.75}
            speedReveal={0.85}
            speedSegment={0.6}
            className="inline-block font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
          >
            is
          </BlurReveal>
        </span>
      </div>

      {/* Beat 4 — line-art backdrop (mounts early so it is decoded in time) */}
      {(beat === 3 || exiting) && (
        <motion.img
          src="/art/intro-lineart.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: (XFADE + 300) / 1000, ease: "easeInOut" },
            scale: { duration: 9, ease: "linear" },
          }}
        />
      )}

      {/* Beats 2–4 — handwritten statements, blurred in and out */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <BlurReveal
          trigger={beat === 1}
          delay={0.35}
          speedReveal={0.7}
          speedSegment={0.45}
          className="font-beat text-[clamp(1.75rem,3.5vw,3.5rem)] leading-tight text-white"
        >
          WHERE IT&apos;S MESSY.
        </BlurReveal>
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <BlurReveal
          trigger={beat === 2}
          delay={0.35}
          speedReveal={0.7}
          speedSegment={0.45}
          className="font-beat text-[clamp(1.75rem,3.5vw,3.5rem)] leading-tight text-white"
        >
          WHERE IT&apos;S UNCLEAR.
        </BlurReveal>
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <BlurReveal
          trigger={beat === 3}
          delay={0.4}
          speedReveal={0.7}
          speedSegment={0.45}
          className="font-beat max-w-5xl text-[clamp(1.6rem,3.4vw,3.4rem)] leading-tight text-white"
        >
          WHERE IT ISN&apos;T FIGURED OUT YET.
        </BlurReveal>
      </div>

      {/* Cinematic grain */}
      <div
        aria-hidden
        className="noise-overlay pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
      />

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70 glass-hover"
      >
        Skip
      </button>
    </motion.div>
  );
}
