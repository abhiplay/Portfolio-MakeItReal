"use client";

import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";

/* Stacked testimonial cards, styled after two26's testimonial deck.
   - Click the top half of the stack for the next card, the bottom half for the previous one.
   - On touch screens, swipe up for next and down for previous.
   - On fine pointers, an arrow follows the cursor: up over the top half, down over the bottom.
   - Ticks on the right show which card is active. */

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
}

// Each card rests at its own tilt, so the stack looks hand-dropped.
const ANGLES = [-7.5, 6.8, -5.5, 8.2, -8.5, 6.2, -7.0, 7.8];
const angleOf = (i: number) => ANGLES[i % ANGLES.length];

export function TestimonialStack({ testimonials }: TestimonialStackProps) {
  const total = testimonials.length;
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const busy = useRef(false);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [coarse, setCoarse] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dir, setDir] = useState<"up" | "down">("up");
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Touch swipes also fire a click, so swipes set this flag to ignore it.
  const touchStart = useRef({ x: 0, y: 0 });
  const suppressClick = useRef(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 992);
  }, []);

  const goNext = async () => {
    if (busy.current || total <= 1) return;
    busy.current = true;
    const outIdx = currentRef.current;
    const nextIdx = (outIdx + 1) % total;
    const outCard = cardEls.current[outIdx];
    const inCard = cardEls.current[nextIdx];
    // The incoming card straightens as it becomes the front card.
    if (inCard) animate(inCard, { rotate: 0 }, { duration: 0.35, ease: "easeOut" });
    // The outgoing card lifts out of the stack, then drops back to the bottom.
    if (outCard) {
      await animate(
        outCard,
        { y: "-140%", rotate: angleOf(outIdx) + (outIdx % 2 === 0 ? 9 : -9) },
        { duration: 0.38, ease: "easeInOut" },
      );
    }
    currentRef.current = nextIdx;
    setCurrent(nextIdx);
    if (outCard) {
      await animate(outCard, { y: "0%", rotate: angleOf(outIdx) }, { duration: 0.38, ease: "easeOut" });
    }
    busy.current = false;
  };

  const goPrev = async () => {
    if (busy.current || total <= 1) return;
    busy.current = true;
    const outIdx = currentRef.current;
    const prevIdx = (outIdx - 1 + total) % total;
    const outCard = cardEls.current[outIdx];
    const inCard = cardEls.current[prevIdx];
    if (outCard) animate(outCard, { rotate: angleOf(outIdx) }, { duration: 0.35, ease: "easeOut" });
    // The card from the bottom of the stack rises to the front.
    if (inCard) {
      await animate(
        inCard,
        { y: "120%", rotate: angleOf(prevIdx) + (prevIdx % 2 === 0 ? 8 : -8) },
        { duration: 0.38, ease: "easeInOut" },
      );
    }
    currentRef.current = prevIdx;
    setCurrent(prevIdx);
    if (inCard) {
      await animate(inCard, { y: "0%", rotate: 0 }, { duration: 0.38, ease: "easeOut" });
    }
    busy.current = false;
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (suppressClick.current) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientY - rect.top < rect.height / 2) goNext();
    else goPrev();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 30) {
      suppressClick.current = true;
      window.setTimeout(() => (suppressClick.current = false), 300);
      if (dy < 0) goNext();
      else goPrev();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
    const nextDir = e.clientY - rect.top < rect.height / 2 ? "up" : "down";
    setDir((prev) => (prev === nextDir ? prev : nextDir));
  };

  if (!total) return null;

  return (
    <div
      ref={containerRef}
      className={`testimonial-deck relative mx-auto mt-[40px] h-[400px] w-full max-w-[640px] select-none md:h-[340px] ${
        coarse ? "" : "cursor-none"
      }`}
      onClick={handleClick}
      onMouseMove={coarse ? undefined : handleMouseMove}
      onMouseEnter={coarse ? undefined : () => setHovering(true)}
      onMouseLeave={coarse ? undefined : () => setHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {testimonials.map((t, i) => {
        const order = (i - current + total) % total;
        return (
          <motion.div
            key={t.id}
            ref={(el) => {
              cardEls.current[i] = el;
            }}
            className="testimonial-card glass-effect backdrop-blur-xl"
            initial={{ rotate: i === 0 ? 0 : angleOf(i), y: "0%" }}
            style={{ zIndex: total - order }}
          >
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white"
                  style={{ background: t.avatarGradient }}
                >
                  {t.initials}
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-card-foreground">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <blockquote className="mb-2 text-[17px] leading-[1.6] text-card-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        );
      })}

      {/* Side ticks: the active one is longer */}
      <div className="pointer-events-none absolute -right-[56px] top-1/2 flex -translate-y-1/2 flex-col items-end gap-[1em]">
        {testimonials.map((_, i) => (
          <motion.div
            key={i}
            className="h-[2px] rounded-full bg-white"
            animate={{ width: i === current ? 34 : 14, opacity: i === current ? 1 : 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Custom cursor arrow: up over the top half, down over the bottom half */}
      {!coarse && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-[999] flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "backOut" }}
        >
          {dir === "up" ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
        </motion.div>
      )}
    </div>
  );
}
