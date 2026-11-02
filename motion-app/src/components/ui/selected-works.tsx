"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "motion/react";

/* Selected Work, styled after the two26.studio projects section: three
   451px portrait cards in a row with square corners, a 74px caption row with a
   round badge, a bold uppercase name, an orange category line and an orange
   arrow button. On hover a wide brush stroke draws down the card in that
   card's own colour, then a mask reveals the hover image through the same
   stroke. Each card's image opens from a clip mask as it scrolls in. The
   closing block rises line by line with tilted tags and a pill button.
   Content comes from the caller, so this file ships no third-party projects,
   images or copy.

   Sizes are pixel values on purpose: the portfolio's root font size is 14px,
   so rem-based utilities would render smaller than the reference. */

export interface SelectedWorkItem {
  title: string;
  tag: string;
  img: string;
  /** Shown through the brush on hover. Falls back to a zoomed `img`. */
  hoverImg?: string;
  /** Brush colour for this card's hover. Defaults to a palette entry by position. */
  brushColor?: string;
}

interface SelectedWorksProps {
  items: SelectedWorkItem[];
  href?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const ORANGE = "#FF5400";
const CLIP_HIDDEN = "inset(42.5% 42.5% 42.5% 42.5% round 36px)";
// Two26 settles every image on a 16px corner radius once the reveal finishes.
const CARD_RADIUS = 16;
const CLIP_SHOWN = `inset(0% 0% 0% 0% round ${CARD_RADIUS}px)`;

// One brush colour per card, cycled by position, so each hover reads differently.
const BRUSH_PALETTE = ["#FDE1FD", "#1A54E4", "#F25525", "#8134CD", "#153FE3", "#E5C9DF"];

// Wavy S-curve the brush follows, drawn in a 709 x 1012 card space.
const BRUSH_D =
  "M25.007 729.507C25.007 729.507 136.507 1065.7 290.007 969.007C506.711 832.495 -164.765 175.16 89.5069 44.5066C315.057 -71.3883 462.507 559.507 615.507 515.007C768.507 470.507 615.507 25.0068 615.507 25.0068";

// Brush starts at zero width and undrawn. On hover it draws top to bottom
// and widens to cover the card, then reverses on leave.
const BRUSH_HIDDEN = "[stroke-dasharray:1_1] [stroke-dashoffset:1] [stroke-width:0]";
const BRUSH_SHOWN = "group-hover:[stroke-dashoffset:0] group-hover:[stroke-width:1200]";

function WorkCard({ item, delay, brush }: { item: SelectedWorkItem; delay: number; brush: string }) {
  // Trigger from the card itself: the clip mask hides most of the image, so
  // observing the masked element would never reach the visibility threshold.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const maskId = `work-mask-${useId().replace(/:/g, "")}`;
  const hoverSrc = item.hoverImg ?? item.img;
  // Without a dedicated hover image, zoom the main one around the card centre.
  const hoverTransform = item.hoverImg
    ? undefined
    : "translate(354.5 506) scale(1.08) translate(-354.5 -506)";

  return (
    <motion.article
      ref={ref}
      className="group w-full md:w-[451px]"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <motion.div
        className="relative aspect-[451/520] overflow-hidden rounded-[16px] bg-neutral-300"
        initial={{ clipPath: CLIP_HIDDEN }}
        animate={{ clipPath: inView ? CLIP_SHOWN : CLIP_HIDDEN }}
        transition={{ duration: 1.25, ease: EASE }}
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Brush layer: a coloured stroke that leads the reveal */}
        <svg
          aria-hidden
          viewBox="0 0 709 1012"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
        >
          <path
            d={BRUSH_D}
            pathLength={1}
            fill="none"
            stroke={brush}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${BRUSH_HIDDEN} ${BRUSH_SHOWN} transition-[stroke-dashoffset,stroke-width] duration-[950ms] ease-in-out`}
          />
        </svg>

        {/* Mask layer: the hover image shows only where the brush has passed */}
        <svg
          aria-hidden
          viewBox="0 0 709 1012"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 z-[3] h-full w-full overflow-visible"
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1109" height="1412">
              <path
                d={BRUSH_D}
                pathLength={1}
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${BRUSH_HIDDEN} ${BRUSH_SHOWN} transition-[stroke-dashoffset,stroke-width] duration-[1050ms] ease-in-out group-hover:delay-[350ms]`}
              />
            </mask>
          </defs>
          <image
            href={hoverSrc}
            width={709}
            height={1012}
            preserveAspectRatio="xMidYMid slice"
            mask={`url(#${maskId})`}
            transform={hoverTransform}
          />
        </svg>
      </motion.div>

      <div className="mt-3 flex h-[74px] items-center justify-between gap-[16px] pr-[16px]">
        <div className="flex min-w-0 items-center gap-[16px]">
          <span
            aria-hidden
            className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full text-[18px] font-bold text-white"
            style={{ backgroundColor: brush }}
          >
            {item.title.charAt(0)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[24px] font-bold uppercase leading-[1.1] tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] font-normal uppercase leading-[1.1]" style={{ color: ORANGE }}>
              {item.tag}
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: ORANGE }}
        >
          <svg className="work-arrow h-[16px] w-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}

const CLOSING_LINES = ["I COULD KEEP", "GOING, BUT THERE’S A", "WHOLE PAGE FOR THAT."];

// Tags sit on the text block: left and top are fractions of its width and height.
const CLOSING_TAGS = [
  { label: "Built, not just drawn", left: "36%", top: "13%", rotate: -4, delay: 0.9 },
  { label: "Starts with the problem", left: "66%", top: "59%", rotate: -4, delay: 1.05 },
  { label: "Work in progress", left: "13%", top: "87%", rotate: 3, delay: 1.2 },
];

/* Closing block: each line rises from behind its own mask with a slight
   overshoot, then the tags pop in, then the button. Lines and tags are
   staggered like two26's closing copy. */
function ClosingBlock({ href }: { href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="mx-auto max-w-[900px] text-center">
      <div className="relative mx-auto w-fit">
        <p
          className="font-display text-[56px] font-bold uppercase leading-[0.95] tracking-[-0.02em] md:text-[80px]"
          style={{ color: ORANGE }}
        >
          {CLOSING_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block"
                style={{
                  transform: inView ? "translateY(0%)" : "translateY(115%)",
                  opacity: inView ? 1 : 0,
                  transition: `transform 1130ms cubic-bezier(0.3,1.35,0.6,1) ${i * 160}ms, opacity 1130ms ease ${i * 160}ms`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </p>

        {CLOSING_TAGS.map((tag, i) => (
          <span
            key={tag.label}
            className="closing-tag-float absolute hidden whitespace-nowrap rounded-full bg-white px-[20px] py-[10px] text-[16px] font-medium text-black md:inline-block"
            style={{
              left: tag.left,
              top: tag.top,
              transform: inView ? `rotate(${tag.rotate}deg) scale(1)` : `rotate(${tag.rotate}deg) scale(0.4)`,
              opacity: inView ? 1 : 0,
              transition: `transform 550ms cubic-bezier(0.34,1.56,0.64,1) ${tag.delay * 1000}ms, opacity 550ms ease ${tag.delay * 1000}ms`,
              // Each tag drifts on its own speed and phase so they don't move in step.
              animation: `closing-tag-float ${6 + i * 1.5}s ease-in-out ${-i * 2}s infinite`,
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <a
        href={href}
        className="mt-[56px] inline-flex items-center gap-[12px] rounded-full bg-white py-[8px] pl-[24px] pr-[8px] text-[14px] font-semibold uppercase tracking-wide text-black glass-hover"
      >
        See all projects
        <span
          aria-hidden
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-white"
          style={{ backgroundColor: ORANGE }}
        >
          <svg className="h-[16px] w-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </a>
    </div>
  );
}

export function SelectedWorks({ items, href = "/allprojects" }: SelectedWorksProps) {
  return (
    <section
      id="work"
      className="-mx-6 bg-background px-6 pb-[96px] pt-[96px] sm:-mx-8 sm:px-8 md:-mx-[120px] md:px-[8px]"
    >
      <div className="relative mb-[40px] text-center">
        <p className="mb-[16px] text-[18px] font-medium uppercase text-foreground md:absolute md:left-[12px] md:top-0 md:mb-0 md:text-left">
          Featured Projects
        </p>
        <h2 className="font-condensed text-[52px] uppercase leading-[0.85] tracking-tight text-foreground sm:text-[64px] md:text-[100px]">
          Selected
          <br />
          Works
        </h2>
        <p className="mx-auto mt-[16px] max-w-[520px] text-[16px] leading-relaxed text-neutral-300">
          Products I&apos;ve designed for real problems, from the first question to the final screens.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-[32px] gap-y-[64px] md:grid-cols-[451px_451px_451px] md:justify-center">
        {items.map((item, idx) => (
          <WorkCard
            key={item.title}
            item={item}
            delay={(idx % 3) * 0.1}
            brush={item.brushColor ?? BRUSH_PALETTE[idx % BRUSH_PALETTE.length]}
          />
        ))}
      </div>

      <div className="mt-[96px]">
        <ClosingBlock href={href} />
      </div>
    </section>
  );
}
