"use client";

import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- Chapter 05 — The lab ----------------
   Compact sketchbook strip. Grows later; answers:
   WHAT IS HE EXPLORING? */

const TOPICS = [
  "AI × Product",
  "Interaction experiments",
  "Prototypes",
  "Creative coding",
  "Design systems",
  "MVP concepts",
  "Motion",
];

export function Lab() {
  return (
    <section id="lab" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
        The lab — a digital sketchbook
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
        <WordsPullUp text={"Things I'm\nfiguring out."} />
      </h2>

      <ul className="mt-10 flex flex-wrap gap-3">
        {TOPICS.map((topic) => (
          <li
            key={topic}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-neutral-300"
          >
            <span aria-hidden className="h-1.5 w-1.5 bg-[#FF4B16]" />
            {topic}
          </li>
        ))}
      </ul>
    </section>
  );
}
