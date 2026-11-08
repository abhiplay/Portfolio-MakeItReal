"use client";

import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Box,
  Check,
  Layers,
  LayoutGrid,
  MousePointer2,
  Rocket,
  Route,
  Scan,
  ShoppingBag,
  Sliders,
  Target,
  TrendingUp,
} from "lucide-react";
import type { WorkItem } from "@/App";

/* Metadrob case study, built from the approved reference. Wording is the
   reference's own. Only the Metadrob editor render is available as a
   photograph, so other image slots show a labelled placeholder. The +200%
   figure is the only metric in the reference. */

const ACCENT = "#FF5400";

// Each section fades and rises as it scrolls into view. CSS scroll-driven, no JS.
// Switched off for users who prefer reduced motion.
const MOTION_CSS = `
.mb-reveal { animation: mb-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
@keyframes mb-reveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .mb-reveal, .mb-reveal * { animation: none !important; transition: none !important; } }
`;

const Eyebrow = ({ children }: { children: string }) => (
  <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-neutral-400">
    <span aria-hidden className="h-[2px] w-6" style={{ backgroundColor: ACCENT }} />
    {children}
  </p>
);

const Heading = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.02em] text-white ${className}`}>
    {children}
  </h2>
);

const Placeholder = ({ label }: { label: string }) => (
  <div
    role="img"
    aria-label={`${label}: image coming soon`}
    className="flex h-full min-h-[200px] w-full items-center justify-center rounded-[20px] border border-white/10 bg-[linear-gradient(145deg,#1a1a1a,#0b0b0b)]"
  >
    <span className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">Image coming soon</span>
  </div>
);

/* ---------------- Hero ---------------- */
export function MetadrobHero({ p }: { p: WorkItem }) {
  const img = p.heroImg ?? p.img;
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 md:px-[120px] md:pb-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_78%_45%,rgba(124,58,237,0.45),transparent_70%),radial-gradient(40%_40%_at_90%_90%,rgba(255,84,0,0.22),transparent_70%)]"
      />
      <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.15em] text-white">
            <Box className="h-5 w-5" style={{ color: ACCENT }} aria-hidden />
            Metadrob
          </p>
          <h1 className="font-display mt-8 text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.02em] text-white">
            Shopping, as an <span className="italic" style={{ color: ACCENT }}>experience.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-neutral-300">
            As a founding designer at Metadrob, I helped explore how immersive 3D environments could bring the discovery and
            interaction of physical retail into online shopping.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {["Founding Designer", "Product Design", "UI/UX", "Design System"].map((tag, i) => (
              <li
                key={tag}
                className={`rounded-full border px-4 py-2 text-[13px] ${
                  i === 0 ? "border-[#FF5400]/70 text-[#FF5400]" : "border-white/15 text-neutral-300"
                }`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          {img && (
            <img
              src={img}
              alt={`${p.title} virtual store editor`}
              className="relative w-full rounded-[20px] shadow-[0_40px_120px_-30px_rgba(124,58,237,0.6)]"
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sections below the hero ---------------- */
const PROBLEMS = [
  { icon: Scan, title: "Limited exploration", text: "Reduced to scrolling through product grids." },
  { icon: Layers, title: "Missing context", text: "Hard to see products in a real environment." },
  { icon: MousePointer2, title: "Lack of interaction", text: "Can't freely explore as in a physical store." },
  { icon: ShoppingBag, title: "The try-on gap", text: "Experiencing fit or look before buying is still limited." },
];

const ROLE_ITEMS = [
  { icon: Target, label: "Product Vision" },
  { icon: Route, label: "User Journeys" },
  { icon: LayoutGrid, label: "Editor Experience" },
  { icon: Layers, label: "Design System" },
  { icon: Rocket, label: "Go to Market" },
];

const CHALLENGES = [
  { icon: MousePointer2, title: "Simplify creation", text: "Make store-building tasks understandable and easy to get started." },
  { icon: Layers, title: "Connect editing with preview", text: "Help merchants see the impact of changes in real time." },
  { icon: Sliders, title: "Make it predictable", text: "Create consistent controls, feedback, and editing patterns across the product." },
];

const SOLUTION_POINTS = ["Intuitive, no-code editing", "Real-time 3D preview", "Consistent & scalable design system"];

const EXPERIENCE = [
  { title: "Store Creation", text: "Build immersive retail spaces with ease." },
  { title: "Product Placement", text: "Position and organise products within the store." },
  { title: "Customisation", text: "Shape the look and feel of your store." },
  { title: "Virtual Exploration", text: "Let customers explore your store in an immersive way." },
];

export function MetadrobSections({ p }: { p: WorkItem }) {
  const img = p.heroImg ?? p.img;
  return (
    <>
      <style>{MOTION_CSS}</style>

      {/* The Vision */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div>
            <Eyebrow>The Vision</Eyebrow>
            <Heading className="text-[clamp(2rem,3.6vw,3.25rem)]">Beyond the catalogue.</Heading>
          </div>
          <p className="border-white/10 text-[16px] leading-relaxed text-neutral-300 lg:border-l lg:pl-10">
            Online shopping is convenient, but it often lacks the discovery, interaction, and sense of presence that makes
            in-store shopping so engaging. Metadrob was built to bring that experience to the digital world.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Placeholder label="In-store shopping" />
            {img && <img src={img} alt="" aria-hidden className="h-full min-h-[200px] w-full rounded-[20px] object-cover object-top" />}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Eyebrow>The Problem</Eyebrow>
            <Heading className="text-[clamp(2rem,3.6vw,3.25rem)]">Easy to buy. Hard to feel.</Heading>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-neutral-400">
              Traditional e-commerce makes it easy to buy, but hard to truly experience products.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-t border-white/10 pt-6">
                <Icon className="h-7 w-7" style={{ color: ACCENT }} aria-hidden />
                <h3 className="mt-6 text-[18px] font-semibold text-white">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* My Role */}
      <section className="mb-reveal px-6 py-16 sm:px-8 md:px-[120px]">
        <div className="rounded-[24px] border border-white/10 bg-gradient-to-r from-[#1d1b3d] to-[#0b0a1a] p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <Eyebrow>My Role</Eyebrow>
              <Heading className="text-[clamp(2.25rem,4vw,3.5rem)]">Founding Designer</Heading>
            </div>
            <div>
              <p className="text-[16px] leading-relaxed text-neutral-300">
                I shaped Metadrob from an early idea to a usable product, defining the experience, core workflows, and a
                scalable design system for creating immersive stores.
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5">
                {ROLE_ITEMS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex flex-col items-center gap-3 text-center">
                    <Icon className="h-6 w-6" style={{ color: ACCENT }} aria-hidden />
                    <span className="text-[13px] text-neutral-300">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Design Challenge */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>The Design Challenge</Eyebrow>
            <Heading className="text-[clamp(2rem,3.6vw,3.25rem)]">Making 3D stores simple.</Heading>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-neutral-400">
              Building a virtual store involves multiple layers — environments, objects, product placement, and visual
              customisation.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CHALLENGES.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="group flex flex-col rounded-[20px] border border-white/10 bg-[#14122a] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5400]/50"
              >
                <Icon className="h-7 w-7" style={{ color: ACCENT }} aria-hidden />
                <p className="mt-8 flex items-baseline gap-2 text-[18px] font-semibold text-white">
                  <span style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                  {title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The Solution */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>The Solution</Eyebrow>
            <Heading>One unified editor.</Heading>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-neutral-400">
              A streamlined experience that brings the store canvas, editing controls, and real-time preview into one
              cohesive workflow.
            </p>
            <ul className="mt-8 space-y-4">
              {SOLUTION_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[16px] text-white">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT }}>
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[14px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the Editor
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: ACCENT }}>
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[36px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.45),transparent)] blur-2xl"
            />
            {img && (
              <img
                src={img}
                alt="Metadrob editor showing the store canvas and editing panel"
                className="relative w-full rounded-[20px] border border-white/10 object-cover object-top shadow-[0_30px_80px_-30px_rgba(124,58,237,0.5)]"
              />
            )}
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2.4fr] lg:items-end">
          <Eyebrow>The Experience</Eyebrow>
          <Heading className="text-[clamp(2rem,3.6vw,3.25rem)]">Built for creators and shoppers.</Heading>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE.map(({ title, text }) => (
            <li key={title} className="group">
              <div className="overflow-hidden rounded-[20px]">
                <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                  <Placeholder label={title} />
                </div>
              </div>
              <h3 className="mt-5 text-[18px] font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-400">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The Impact */}
      <section className="mb-reveal px-6 py-20 sm:px-8 md:px-[120px] md:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>The Impact</Eyebrow>
            <p className="font-display mt-6 flex items-center gap-4 text-[clamp(4rem,10vw,8.5rem)] font-bold leading-none" style={{ color: ACCENT }}>
              <TrendingUp className="h-[0.5em] w-[0.5em] shrink-0" aria-hidden />
              +200%
            </p>
          </div>
          <p className="max-w-md text-[17px] leading-relaxed text-neutral-300">
            Increase in new registrations for the Virtual Store Editor after launch.
          </p>
        </div>
      </section>

      {/* The Takeaway */}
      <section className="mb-reveal px-6 pb-20 sm:px-8 md:px-[120px] md:pb-28">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#2a1f4d] via-[#14102a] to-[#3a1a0c] p-10 md:p-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#FF5400]/20 blur-3xl" />
          <Eyebrow>The Takeaway</Eyebrow>
          <p className="font-display relative mt-6 max-w-3xl text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.05] text-white">
            Experience, not just transactions.
          </p>
        </div>
      </section>
    </>
  );
}
