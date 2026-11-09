"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  siClaude,
  siCss,
  siFramer,
  siHtml5,
  siJavascript,
  siOpencode,
  siRive,
  type SimpleIcon,
} from "simple-icons";
import type { AnimationItem } from "lottie-web";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { WordsPullUp } from "@/components/ui/prisma-hero";
import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";

/* Plays a Lottie animation from a local JSON file. lottie-web is loaded on
   demand so the animation library stays out of the main bundle. */
function LottieIcon({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;
    let cancelled = false;
    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !ref.current) return;
      anim = lottie.loadAnimation({ container: ref.current, renderer: "svg", loop: true, autoplay: true, path: src });
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [src]);

  return <div ref={ref} aria-hidden className="h-full w-full" />;
}

/* ---------------- Chapter 04 — How I build ----------------
   Statement, copy and a five-step process styled after two26's services
   section: a pale track with an orange line drawn over it as you scroll. Each
   step is a node on the line with a large orange label beside it and a small
   rounded description pill underneath. Nodes pop in as the line reaches them.
   On small screens the line becomes a rail and the labels sit beside the
   nodes. Answers: HOW DOES HE WORK? */

interface Step {
  name: string;
  copy: string;
  /** Local Lottie JSON played in the node. */
  animation: string;
  /** Node centre, as a percentage of the process box (desktop layout). */
  x: number;
  y: number;
  /** Which side of the node the label sits on (desktop). */
  side: "left" | "right";
}

const STEPS: Step[] = [
  { name: "Think", copy: "Find the real problem before drawing anything.", animation: "/lottie/brand-identity.json", x: 22, y: 12, side: "left" },
  { name: "Make", copy: "Sketch and prototype fast, then argue with the result.", animation: "/lottie/brand-strategy.json", x: 72, y: 30, side: "right" },
  { name: "Test", copy: "Put it in front of people and watch what they do.", animation: "/lottie/motion-design.json", x: 28, y: 50, side: "left" },
  { name: "Build", copy: "Ship working code alongside the design, not after it.", animation: "/lottie/web-design.json", x: 70, y: 70, side: "right" },
  { name: "Ship", copy: "Launch, measure, and learn what to change next.", animation: "/lottie/packaging.json", x: 46, y: 90, side: "right" },
];

// Winding path through the node centres, in a 100 x 100 box stretched to the
// process area. Runs off the bottom so the line reads as still going.
const PATH_D =
  "M22 12 C50 2 84 14 72 30 C60 46 14 40 28 50 C42 60 88 58 70 70 C52 82 26 84 46 90 L46 100";

// Converts the 100 x 100 path above into pixels for a box of w x h. Numbers
// alternate x, y, so even-indexed values scale by width and odd by height.
function scalePath(d: string, w: number, h: number) {
  let i = 0;
  return d.replace(/-?\d+(\.\d+)?/g, (n) => {
    const v = Number(n);
    const out = i % 2 === 0 ? (v * w) / 100 : (v * h) / 100;
    i++;
    return out.toFixed(1);
  });
}

const ORANGE = "#FF5400";

// Brand logos from simple-icons, in their brand colour. Near-black brands would
// vanish on the black page, so those fall back to the current text colour.
function isTooDark(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 60;
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      fill={isTooDark(icon.hex) ? "currentColor" : `#${icon.hex}`}
      className="h-[26px] w-[26px]"
    >
      <path d={icon.path} />
    </svg>
  );
}

// Brands with no logo in simple-icons are shown as bold wordmarks instead.
function Wordmark({ label }: { label: string }) {
  return <span className="whitespace-nowrap text-[20px] font-bold uppercase tracking-tight">{label}</span>;
}

// Toolkit shown in the marquee, in the order you asked for. Design systems and
// Prototyping aren't brands, so they keep lucide icons.
const TOOLKIT: ReactNode[] = [
  <img key="figma" src="/logos/figma.png" alt="Figma" className="h-[26px] w-[26px] object-contain" />,
  <BrandIcon key="framer" icon={siFramer} />,
  <img key="protopie" src="/logos/protopie.png" alt="ProtoPie" className="h-[26px] w-[26px] object-contain" />,
  <BrandIcon key="rive" icon={siRive} />,
  <BrandIcon key="claude" icon={siClaude} />,
  <BrandIcon key="opencode" icon={siOpencode} />,
  <Wordmark key="codex" label="Codex" />,
  <img key="chatgpt" src="/logos/chatgpt-green.png" alt="ChatGPT" className="h-[26px] w-[26px]" />,
  <img key="lovable" src="/logos/lovable.png" alt="Lovable" className="h-[26px] w-[26px] object-contain" />,
  <span key="html-css-js" className="inline-flex items-center gap-[14px]">
    <BrandIcon icon={siHtml5} />
    <BrandIcon icon={siCss} />
    <BrandIcon icon={siJavascript} />
  </span>,
];

// Name for each TOOLKIT entry, in the same order. Shown under a logo on hover.
const TOOLKIT_LABELS = [
  "Figma",
  "Framer",
  "ProtoPie",
  "Rive",
  "Claude",
  "OpenCode",
  "Codex",
  "ChatGPT",
  "Lovable",
  "HTML, CSS, JS",
];

// Each node starts when the line reaches it, spaced evenly along the scroll.
const nodeStart = (i: number) => 0.12 + i * 0.18;

function ProcessNode({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = nodeStart(index);

  // Icon node expands with a bounce as the line arrives.
  const iconScale = useSpring(useTransform(progress, [start, start + 0.12], [0, 1]), {
    stiffness: 220,
    damping: 12,
  });
  // Label rises into place, so the motion reads the same on desktop and mobile.
  const labelY = useTransform(progress, [start, start + 0.14], [24, 0]);
  const labelOpacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  // Description pill pops in with a slight tilt, like two26's pills.
  const pillScale = useSpring(useTransform(progress, [start + 0.04, start + 0.16], [0.4, 1]), {
    stiffness: 200,
    damping: 14,
  });
  const pillOpacity = useTransform(progress, [start + 0.04, start + 0.14], [0, 1]);
  const pillRotate = useTransform(progress, [start + 0.04, start + 0.16], [0, index % 2 === 0 ? -2 : 2]);

  const nodeStyle = { "--node-x": `${step.x}%`, "--node-y": `${step.y}%` } as CSSProperties;
  const sideRight = step.side === "right";

  return (
    <div
      className="relative flex items-center gap-[20px] md:absolute md:block md:-translate-x-1/2 md:-translate-y-1/2 md:left-(--node-x) md:top-(--node-y)"
      style={nodeStyle}
    >
      <motion.span
        aria-hidden
        className="relative z-[1] flex h-[96px] w-[96px] shrink-0 items-center justify-center"
        style={{ scale: iconScale }}
      >
        <LottieIcon src={step.animation} />
      </motion.span>

      <div
        className={`flex flex-col gap-[12px] md:absolute md:top-1/2 md:w-[320px] md:-translate-y-1/2 ${
          sideRight ? "md:left-[calc(100%+20px)] md:items-start" : "md:right-[calc(100%+20px)] md:items-end md:text-right"
        }`}
      >
        <motion.h3
          className="font-display text-[44px] font-bold uppercase leading-none tracking-tight md:text-[60px]"
          style={{ color: ORANGE, y: labelY, opacity: labelOpacity }}
        >
          {step.name}
        </motion.h3>
        <motion.p
          className="max-w-[300px] rounded-full border border-[#FF5400] bg-white/[0.04] px-[18px] py-[10px] text-[14px] leading-snug text-white/85"
          style={{ scale: pillScale, opacity: pillOpacity, rotate: pillRotate }}
        >
          {step.copy}
        </motion.p>
      </div>
    </div>
  );
}

export function HowIBuild() {
  const processRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll progress across the process box, from its top reaching 70% of the
  // viewport to its bottom reaching 70%. Smoothed so the line glides.
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 70%", "end 70%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // Reduced motion: show the whole process at once, with no scroll binding.
  const fixed = useMotionValue(1);
  const progress = reduce ? fixed : smooth;

  // Draw the orange line from progress: progress 0 hides it, 1 shows all of it.
  // Applied in a layout effect so the first paint already matches the scroll.
  const pathRef = useRef<SVGPathElement>(null);

  // Scale the path to the real box size so the stroke is drawn at true width.
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = processRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pathD = box.w ? scalePath(PATH_D, box.w, box.h) : PATH_D;

  const applyDraw = (p: number) => {
    if (pathRef.current) pathRef.current.style.strokeDashoffset = String(1 - p);
  };
  useMotionValueEvent(progress, "change", applyDraw);
  useLayoutEffect(() => applyDraw(progress.get()), [progress]);

  return (
    <section id="build" className="py-20 md:py-28 snap-start">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
        How I build
      </p>
      <h2 className="font-display mt-4 max-w-4xl text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
        <WordsPullUp text={"Design isn't\nthe finish line."} />
      </h2>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
        I like getting close to the messy middle — where product decisions,
        technology, people and constraints collide.
      </p>

      {/* Process: track + drawn line + nodes. Desktop is a fixed-height
          winding layout; on mobile the nodes stack beside a vertical rail. */}
      <div ref={processRef} className="relative mt-14 md:h-[900px]">
        {/* Desktop: the one orange line, drawn in pixels so the stroke keeps
            its width. It grows only with scroll; nothing shows before that. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
        >
          <path
            ref={pathRef}
            d={pathD}
            pathLength={1}
            fill="none"
            stroke={ORANGE}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1"
            style={{ strokeDashoffset: 1 }}
          />
        </svg>

        {/* Mobile: the orange rail grows with scroll */}
        <motion.div
          aria-hidden
          className="absolute left-[36px] top-[38px] bottom-[38px] w-[4px] origin-top rounded-full md:hidden"
          style={{ backgroundColor: ORANGE, scaleY: progress }}
        />

        <div className="flex flex-col gap-[56px] md:block">
          {STEPS.map((step, i) => (
            <ProcessNode key={step.name} step={step} index={i} progress={progress} />
          ))}
        </div>
      </div>

    </section>
  );
}

const EDGE_FADE = "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";

/* Toolkit strip, shown under the Selected Works. Kept small and muted so the
   tools support the work rather than lead the story. */
export function ToolkitStrip() {
  return (
    <div className="border-t border-white/10 pt-8 opacity-70">
      <h3 className="text-2xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-4xl">
        Tools are not the skill.
        <br />
        Thinking is.
      </h3>
      {/* Logos fade out at both ends of the strip instead of being cut off. */}
      <div
        className="mt-5"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <InfiniteTextMarquee
          link="#build"
          speed={120}
          fontSize="14px"
          textColor="#737373"
          hoverColor="#FFFFFF"
          showTooltip={false}
          items={TOOLKIT}
          itemLabels={TOOLKIT_LABELS}
          // All logos share one grey treatment; each one shows its colour on hover.
          itemClassName="grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100 hover:-translate-y-0.5"
        />
      </div>
    </div>
  );
}
