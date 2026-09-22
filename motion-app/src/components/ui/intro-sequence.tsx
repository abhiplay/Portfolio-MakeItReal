"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ---------------- Intro autoplay sequence ----------------
   Full-screen preloader: color scene → line-art sketch → fades out to
   reveal the hero (already playing underneath). Skippable, once the
   exit fade completes `onDone` unmounts it. Reduced-motion skips all. */

const FRAME_1_HOLD = 1200;
const XFADE = 700;
const FRAME_2_HOLD = 1400;
const EXIT_FADE = 900;

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
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => setBeat(1), FRAME_1_HOLD + XFADE),
      window.setTimeout(() => setExiting(true), FRAME_1_HOLD + XFADE + FRAME_2_HOLD),
      window.setTimeout(
        () => doneRef.current(),
        FRAME_1_HOLD + XFADE + FRAME_2_HOLD + EXIT_FADE,
      ),
    );
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  // Lock page scroll while the takeover is mounted.
  useEffect(() => {
    if (reduce) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  if (reduce) return null;

  const skip = () => {
    doneRef.current();
  };

  return (
    <motion.div
      onClick={skip}
      aria-hidden
      className={cn("fixed inset-0 z-[100] cursor-pointer bg-black", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: exiting ? EXIT_FADE / 1000 : 0.6, ease: "easeOut" }}
    >
      <motion.img
        src="/art/intro-frame-1.webp"
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 0.6 }, scale: { duration: 4, ease: "linear" } }}
      />
      {beat >= 1 && (
        <motion.img
          src="/art/intro-lineart.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: XFADE / 1000, ease: "easeOut" },
            scale: { duration: 4, ease: "linear" },
          }}
        />
      )}
      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:border-white/60 hover:text-white"
      >
        Skip
      </button>
    </motion.div>
  );
}
