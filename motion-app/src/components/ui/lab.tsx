"use client";

import { ArrowRight } from "lucide-react";
import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- Chapter 05 — The lab ----------------
   Reference layout: numbered label, headline + copy left, explore link
   right, six thumbnail cards. Answers: WHAT IS HE EXPLORING? */

const TOPICS = [
  {
    label: "AI × Product",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Interaction Experiments",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Prototypes",
    img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Creative Coding",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Design Systems",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "MVP Concepts",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=70",
  },
];

export function Lab() {
  return (
    <section id="lab" className="py-20 md:py-28 snap-start">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 lg:text-xl">
            04&nbsp;&nbsp;/&nbsp;&nbsp;The lab
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            <WordsPullUp text={"Things I'm\nfiguring out."} />
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            A space for experiments, ideas, and creative detours.
          </p>
        </div>
        <a
          href="#"
          className="hidden shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-300 underline underline-offset-8 transition-colors hover:text-white sm:inline-flex"
        >
          Explore the lab
          <ArrowRight className="h-4 w-4 text-[#FF4B16]" />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {TOPICS.map((topic) => (
          <a
            key={topic.label}
            href="#"
            className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm transition-colors hover:border-white/25"
          >
            <p className="flex items-center gap-2 px-4 pt-3 text-[11px] font-medium text-neutral-300">
              <span aria-hidden className="h-1.5 w-1.5 bg-[#FF4B16]" />
              {topic.label}
            </p>
            <div className="overflow-hidden px-3 pb-3 pt-2">
              <img
                src={topic.img}
                alt=""
                loading="lazy"
                className="aspect-[4/5] w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
