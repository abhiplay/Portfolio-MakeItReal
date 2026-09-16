"use client";

import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- Chapter 02 — How I think ----------------
   Short editorial chapter: statement + copy + three principles.
   Answers: HOW DOES HE THINK? */

const PRINCIPLES = [
  {
    n: "01",
    title: "Get close",
    copy: "Understand people, context and constraints.",
  },
  {
    n: "02",
    title: "Make it real",
    copy: "Prototype instead of endlessly discussing.",
  },
  {
    n: "03",
    title: "Move forward",
    copy: "Design, test, build, learn, repeat.",
  },
];

export function Mindset() {
  return (
    <section id="mindset" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
        How I think
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
        <WordsPullUp text={"I don't need\na perfect brief."} />
      </h2>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
        Give me a messy problem, an ambitious idea, or something that
        doesn&apos;t exist yet. I&apos;ll figure out what needs to be built.
      </p>

      <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {PRINCIPLES.map((p) => (
          <div key={p.n} className="flex items-baseline gap-5 py-5 md:gap-8">
            <span className="shrink-0 text-[11px] tracking-[0.3em] text-neutral-500">
              {p.n}
            </span>
            <div>
              <p className="text-lg font-bold uppercase tracking-tight text-white md:text-xl">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-neutral-400">{p.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
