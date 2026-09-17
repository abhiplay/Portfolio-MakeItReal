"use client";

import { Box, Search, Send } from "lucide-react";
import { LoopVideo } from "@/components/ui/loop-video";
import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- Chapter 02 — How I think ----------------
   Mockup layout: numbered label, headline + copy + melting cat video
   left, icon principle rows right. Answers: HOW DOES HE THINK? */

const PRINCIPLES = [
  {
    n: "01",
    icon: Search,
    title: "Get close",
    copy: "Understand people, context and constraints.",
  },
  {
    n: "02",
    icon: Box,
    title: "Make it real",
    copy: "Prototype instead of endlessly discussing.",
  },
  {
    n: "03",
    icon: Send,
    title: "Move forward",
    copy: "Design, test, build, learn, repeat.",
  },
];

export function Mindset() {
  return (
    <section id="mindset" className="py-20 md:py-28">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 lg:text-xl">
        01&nbsp;&nbsp;/&nbsp;&nbsp;How I think
      </p>

      <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-[7vw] lg:text-[5vw]">
            <WordsPullUp text={"I don't need\na perfect brief."} />
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Give me a messy problem, an ambitious idea, or something that
            doesn&apos;t exist yet. I&apos;ll figure out what needs to be built.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 120 14"
            className="mt-4 h-3.5 w-28 text-[#FF4B16]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M3 10 C 30 3, 60 12, 117 6" />
          </svg>

          <div className="relative mt-8">
            <LoopVideo
              src="/art/cat-playing.mp4"
              className="fade-all-sides aspect-video w-full"
            />
            <p className="font-hand absolute -bottom-2 right-2 -rotate-2 whitespace-pre-line text-right text-2xl leading-tight text-[#E1E0CC]/70">
              {"Curiosity\nleads to\nbetter questions."}
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="flex items-center gap-5 py-8 md:gap-7">
              <p.icon
                aria-hidden
                strokeWidth={1.25}
                className="h-10 w-10 shrink-0 text-white lg:h-11 lg:w-11"
              />
              <span className="shrink-0 text-xs tracking-[0.3em] text-neutral-500">
                {p.n}
              </span>
              <div>
                <p className="text-lg font-bold uppercase tracking-wide text-white md:text-xl">
                  {p.title}
                </p>
                <p className="mt-1 text-base text-neutral-400 md:text-lg">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
