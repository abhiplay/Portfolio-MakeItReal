"use client";

import type * as React from "react";
import { motion } from "motion/react";

/* ---------------- Animated principle icons ----------------
   The three hand-drawn Section 2 marks. Each stroke draws itself
   (pathLength) the first time it scrolls into view; the dashed
   magnifier ring fades in since dashes can't draw. */

interface IconProps {
  className?: string;
}

const DRAW = (delay: number, duration = 0.9) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration, delay, ease: "easeOut" as const },
});

const FADE = (delay: number) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay },
});

function Base({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function DiscoverIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <motion.circle cx="108" cy="108" r="68" strokeDasharray="18 14" {...FADE(0.5)} />
      <motion.path d="M158 158l54 54" {...DRAW(0)} />
      <motion.path
        d="M174 78l7 18 18 7-18 7-7 18-7-18-18-7 18-7z"
        {...DRAW(0.35, 0.7)}
      />
    </Base>
  );
}

export function BuildIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <motion.path d="M128 28l76 44v88l-76 44-76-44V72z" {...DRAW(0)} />
      <motion.path d="M52 72l76 45 76-45" {...DRAW(0.3, 0.7)} />
      <motion.path d="M128 117v87" {...DRAW(0.55, 0.6)} />
      <motion.path d="M128 28v42" {...DRAW(0.7, 0.5)} />
    </Base>
  );
}

export function ShipIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <motion.path d="M35 91l174-53-56 177-43-73z" {...DRAW(0)} />
      <motion.path d="M35 91l118 51" {...DRAW(0.35, 0.7)} />
      <motion.path d="M153 142l56-104" {...DRAW(0.55, 0.6)} />
      <motion.path d="M78 142l-28 36" {...DRAW(0.7, 0.5)} />
      <motion.path d="M61 185l-28 8" {...DRAW(0.8, 0.4)} />
      <motion.path d="M92 201l-8 27" {...DRAW(0.88, 0.4)} />
    </Base>
  );
}
