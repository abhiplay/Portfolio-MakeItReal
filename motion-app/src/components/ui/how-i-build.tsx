"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- Chapter 04 — How I build ----------------
   Statement + copy + 5-step process line as type, not a diagram.
   Answers: HOW DOES HE WORK? */

const STEPS = ["Think", "Make", "Test", "Build", "Ship"];

const TOOLKIT = [
  "Figma",
  "Framer",
  "ProtoPie",
  "Rive",
  "AI tools",
  "HTML / CSS / JS",
  "Design systems",
  "Prototyping",
];

export function HowIBuild() {
  return (
    <section id="build" className="mx-auto max-w-6xl py-20 md:py-28">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
        How I build
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
        <WordsPullUp text={"Design isn't\nthe finish line."} />
      </h2>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
        I like getting close to the messy middle — where product decisions,
        technology, people and constraints collide.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        {STEPS.map((step, i) => (
          <span key={step} className="flex items-center gap-4">
            <motion.span
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base"
            >
              {step}
            </motion.span>
            {i < STEPS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.04 }}
                aria-hidden
              >
                <ArrowRight className="h-4 w-4 text-neutral-600" />
              </motion.span>
            )}
          </span>
        ))}
      </div>

      <div className="mt-14 border-t border-white/10 pt-8">
        <p className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
          Tools are not the skill.
          <br />
          Thinking is.
        </p>
        <p className="mt-4 text-[11px] uppercase leading-loose tracking-[0.2em] text-neutral-500">
          {TOOLKIT.join("  ·  ")}
        </p>
      </div>
    </section>
  );
}
