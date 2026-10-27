"use client";

import type * as React from "react";
import { WordsPullUp } from "@/components/ui/prisma-hero";

/* ---------------- About ----------------
   Cream editorial band directly below the hero, per reference:
   numbered header, condensed statement, body copy, sign-off,
   overlapping polaroids from one shared photo, mountain artwork.
   Answers: WHO IS THIS PERSON, UP CLOSE? */

const PHOTO = "/art/about-photos.webp";

function hideOnError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

export function About() {
  return (
    <section
      id="about"
      data-hp-stage="about"
      className="relative ml-[calc(50%-50vw)] w-screen snap-start overflow-hidden bg-[#F4F0E8] text-neutral-900"
    >
      <div className="relative z-10 px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="flex items-baseline gap-4">
          <span aria-hidden className="font-hand text-4xl text-[#FF4B16] md:text-5xl">
            01
          </span>
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-900">
            About
          </span>
          <span aria-hidden className="h-px max-w-md flex-1 bg-black/50" />
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-hp="about-head">
            <h2 className="font-condensed max-w-xl text-[clamp(2.75rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-tight text-neutral-950">
              <WordsPullUp text={"I LIKE GETTING\nCLOSE TO\nTHE WORK."} />
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-neutral-800 md:text-lg">
              <p>
                I&apos;m a product designer who works across UX, product
                thinking, interaction, prototyping and emerging technology.
              </p>
              <p>
                I like getting involved early — when the question is still
                unclear, the constraints are real, and there&apos;s more to
                figure out than to design.
              </p>
              <p>
                I move between research, flows, interfaces, prototypes,
                systems and sometimes code to turn rough ideas into products
                people can actually use.
              </p>
            </div>

            <p className="font-hand mt-10 whitespace-pre-line text-3xl leading-snug text-neutral-900 md:text-4xl">
              {"Curious by default.\nSlightly obsessed with\nfiguring things out."}
            </p>
            <svg
              aria-hidden
              viewBox="0 0 120 14"
              className="mt-2 h-3.5 w-28 text-[#FF4B16]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 10 C 30 3, 60 12, 117 6" />
            </svg>
          </div>

          <div className="relative" data-hp="about-polaroids">
            <p className="font-hand absolute -top-14 right-2 hidden w-40 -rotate-3 whitespace-pre-line text-right text-2xl leading-tight text-neutral-800 sm:block">
              {"Ideas\nSketches\nCoffee\nProgress"}
            </p>
            <svg
              aria-hidden
              viewBox="0 0 60 60"
              className="absolute -top-4 right-44 hidden h-14 w-14 text-neutral-800 sm:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 6 C 30 10, 48 22, 50 48" />
              <path d="M42 40 L50 49 L54 38" />
            </svg>

            <div className="w-full max-w-md rotate-[1.5deg] bg-white p-3 pb-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <img
                src={PHOTO}
                alt="Wall of sketches, wireframes and sticky notes"
                loading="lazy"
                onError={hideOnError}
                className="aspect-[4/3] w-full object-cover"
                style={{ objectPosition: "72% 22%" }}
              />
              <p className="font-hand whitespace-pre-line px-1 pt-3 text-2xl leading-tight text-neutral-800">
                {"Same curiosity.\nDifferent problems."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/art/about-mountains.webp"
        alt=""
        aria-hidden
        loading="lazy"
        data-hp="about-mountains"
        onError={hideOnError}
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[min(620px,52vw)] lg:block"
      />
    </section>
  );
}
