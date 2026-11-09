import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight, LayoutGrid, MessageCircle, Pencil } from "lucide-react";
import type { WorkItem } from "@/App";
import { CBL_MOTION_CSS, drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";

/* "05 The Teacher Experience", from the reference. A looping device carousel: the current screen sits on a laptop in
   the centre, and the screens either side sit on two angled tablets. Arrows, dots, the keyboard and a swipe all move
   between screens. The screens are the project's gallery screenshots, shown whole. Below lg the carousel shows the
   current laptop only, and the features stack. On lg and up the box keeps the reference's 3:2 ratio. */

const ORANGE = "#F98F17";
const INK = "#1D083F";
const BODY = "#3A2F55";
const NORMAL_WIDTH = { fontStretch: "100%" };

const FEATURES = [
  { icon: LayoutGrid, title: "See assigned work", text: "All your tasks in one place.", tile: "bg-[#E9E2FA]", color: "text-[#6939B5]" },
  { icon: Pencil, title: "Create with guidance", text: "Use structured templates and resources.", tile: "bg-[#FFE7D2]", color: "text-[#F98F17]" },
  { icon: MessageCircle, title: "Act on feedback", text: "Review comments, make changes and resubmit.", tile: "bg-[#E9E2FA]", color: "text-[#6939B5]" },
  { icon: CheckCircle2, title: "Track your progress", text: "Know what's in progress, under review or approved.", tile: "bg-[#FFE7D2]", color: "text-[#F98F17]" },
];

// Offset of slide i from the current slide, wrapped so the carousel loops. 0 is the centre, -1 and 1 the sides.
function offsetOf(i: number, index: number, n: number): number {
  let d = (((i - index) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

// Where each offset sits in the stage, in % of its width, and how it is scaled and turned. Anything further out is hidden.
function placeOf(d: number) {
  if (d === 0) return { left: 50, scale: 1, rotate: 0, opacity: 1, z: 30 };
  if (d === 1) return { left: 83.7, scale: 0.42, rotate: -12, opacity: 1, z: 20 };
  if (d === -1) return { left: 16.3, scale: 0.42, rotate: 12, opacity: 1, z: 20 };
  return { left: d > 0 ? 112 : -12, scale: 0.3, rotate: 0, opacity: 0, z: 0 };
}

export function TeacherExperience({ p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  const images = p.gallery ?? [];
  const n = images.length;
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  if (n === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + n) % n);
  const next = () => setIndex((i) => (i + 1) % n);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  const glide = reduce ? "none" : "left 0.7s, transform 0.7s, opacity 0.7s";

  return (
    <section
      aria-labelledby="teacher-experience-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#FAF7FD] to-[#F3EEFB] px-6 py-16 text-[#1D083F] sm:px-8 lg:p-0"
      style={{ color: INK }}
    >
      <style>{CBL_MOTION_CSS}</style>

      <div className="@container relative lg:aspect-[3/2]">
        <motion.p
          className="flex items-center gap-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-[#7649BE] lg:absolute lg:left-[4.1%] lg:top-[5.2%] lg:w-[35%] lg:text-[clamp(12px,1.0cqw,16px)]"
          {...inView(reduce, 0)}
        >
          <span>05</span>
          <span>The Teacher Experience</span>
          <span aria-hidden className="hidden h-px flex-1 bg-[#B9A7DC] lg:block" />
        </motion.p>

        <h2
          id="teacher-experience-title"
          className="mt-6 font-display text-[clamp(30px,8vw,44px)] font-bold leading-[1.04] tracking-[-0.02em] lg:absolute lg:left-[4.1%] lg:top-[9.8%] lg:mt-0 lg:text-[clamp(30px,3.9cqw,62px)]"
          style={NORMAL_WIDTH}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            A focused workspace
          </motion.span>
          <motion.span className="relative block" {...inView(reduce, 0.2)}>
            for{" "}
            <span className="relative inline-block">
              teachers.
              <svg
                aria-hidden
                viewBox="0 0 224 16"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.3em] left-[0%] hidden h-[0.22em] w-[100%] overflow-visible lg:block"
              >
                <motion.path
                  d="M3 9 C 40 3, 90 2, 130 5 S 200 11, 220 7"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
            </span>
          </motion.span>
        </h2>

        <motion.span
          aria-hidden
          className="hidden lg:absolute lg:left-[46.6%] lg:top-[9.6%] lg:block lg:h-[9.9%] lg:w-px lg:bg-[#CFC3E6]"
        />

        <motion.p
          className="mt-5 text-[16px] leading-[1.6] lg:absolute lg:left-[50.7%] lg:top-[9.8%] lg:mt-0 lg:w-[40%] lg:text-[clamp(15px,1.4cqw,22px)] lg:leading-[1.5]"
          style={{ color: BODY }}
          {...inView(reduce, 0.15)}
        >
          A simple, guided experience that helps teachers manage their assigned tasks, create learning activities, submit work,
          and act on feedback — without the complexity.
        </motion.p>

        <motion.div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${p.title} screens`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="@container relative mt-10 aspect-[5/4] touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-[#FF5400] lg:absolute lg:inset-x-0 lg:top-[24%] lg:aspect-auto lg:h-[52%]"
          style={{ perspective: "1600px" }}
          {...inView(reduce, 0.2, 32)}
        >
          {images.map((src, i) => {
            const d = offsetOf(i, index, n);
            const pos = placeOf(d);
            const isCentre = d === 0;
            return (
              <div
                key={src}
                aria-hidden={!isCentre}
                className={`absolute top-1/2 w-[84%] lg:w-[48.2%] ${isCentre ? "" : "max-lg:hidden"}`}
                style={{
                  left: `${pos.left}%`,
                  transform: `translate(-50%, -50%) scale(${pos.scale}) rotateY(${pos.rotate}deg)`,
                  opacity: pos.opacity,
                  zIndex: pos.z,
                  transition: glide,
                }}
              >
                <div className="relative rounded-[1.4cqw] bg-[#2B2A35] p-[0.9cqw] shadow-[0_40px_80px_-30px_rgba(40,20,60,0.5)]">
                  <div className="aspect-[1.66] overflow-hidden rounded-[0.7cqw] bg-[#F4F1FA]">
                    <img
                      src={src}
                      alt={isCentre ? `${p.title} screen ${i + 1}` : ""}
                      loading="eager"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  {isCentre && (
                    <div
                      aria-hidden
                      className="absolute -bottom-[2.2cqw] left-[-6%] right-[-6%] h-[1.6cqw] rounded-b-[1cqw] bg-gradient-to-b from-[#D9D6E4] to-[#A9A6B8] shadow-[0_18px_30px_-18px_rgba(40,20,60,0.5)]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-6 flex items-center justify-between gap-4 lg:contents">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screen"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E2D8F5] bg-white shadow-[0_10px_24px_-14px_rgba(60,30,100,0.5)] transition-[scale] duration-300 motion-safe:hover:scale-105 lg:absolute lg:left-[3.4%] lg:top-[49%] lg:-translate-y-1/2 lg:h-[3.4cqw] lg:w-[3.4cqw]"
          >
            <ChevronLeft className="h-5 w-5 text-[#6939B5] lg:h-[1.4cqw] lg:w-[1.4cqw]" aria-hidden />
          </button>

          <div className="flex items-center gap-2.5 lg:absolute lg:left-1/2 lg:top-[76%] lg:-translate-x-1/2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screen ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#6B3FD8]" : "w-2.5 bg-[#D7CCF0] hover:bg-[#B9A7DC]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next screen"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E2D8F5] bg-white shadow-[0_10px_24px_-14px_rgba(60,30,100,0.5)] transition-[scale] duration-300 motion-safe:hover:scale-105 lg:absolute lg:right-[3.4%] lg:top-[49%] lg:-translate-y-1/2 lg:h-[3.4cqw] lg:w-[3.4cqw]"
          >
            <ChevronRight className="h-5 w-5 text-[#6939B5] lg:h-[1.4cqw] lg:w-[1.4cqw]" aria-hidden />
          </button>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:absolute lg:left-[4.9%] lg:right-[4.9%] lg:top-[83%] lg:mt-0 lg:grid-cols-4 lg:gap-0">
          {FEATURES.map(({ icon: Icon, title, text, tile, color }, i) => (
            <motion.li
              key={title}
              className={`flex items-start gap-4 lg:items-center lg:gap-[1.2cqw] lg:px-[2cqw] ${
                i > 0 ? "lg:border-l lg:border-[#D8CDE8]" : "lg:pl-0"
              }`}
              {...inView(reduce, 0.3 + i * 0.12)}
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] ${tile} lg:h-[4.7cqw] lg:w-[4.7cqw] lg:rounded-[1.1cqw]`}>
                <Icon className={`h-6 w-6 ${color} lg:h-[2.1cqw] lg:w-[2.1cqw]`} strokeWidth={1.75} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[18px] font-bold leading-[1.2] lg:text-[clamp(15px,1.45cqw,22px)]" style={NORMAL_WIDTH}>
                  {title}
                </span>
                <span className="mt-1 block text-[15px] leading-[1.45] lg:text-[clamp(13px,1.12cqw,17px)]" style={{ color: BODY }}>
                  {text}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

    </section>
  );
}
