import { motion } from "motion/react";
import { ArrowLeftRight, CalendarDays, Layers, Search, Users } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { BOTTOM_FADE, SECTION_BG, fadeStyle } from "@/lib/section-fade";

/* Mother's Grace "02 The Beginning" section, rebuilt from the reference. The art is the reference with its copy, the
   orange underline, the sparkle marks and the five option cards removed (public/projects/mothers-grace-beginning-plate.webp).
   The photo (the binder, papers, desk and drawing) and the leaves are part of the illustration and stay in it. Copy,
   the underline, the sparkles, the rule and the cards are live. On lg and up the art box keeps the reference's
   1672:941 ratio, so positions are percentages of that box. Below lg the copy stacks above the photo, then the cards. */

const PLATE = "/projects/mothers-grace-beginning-plate.webp";
const PHOTO = "/projects/mothers-grace-beginning-photo.webp";

const INK = "#140F2E";
const BODY = "#2A2542";
const PURPLE = "#7E3BE6";
const ORANGE = "#F98F17";
const CARD_INK = "#130D2B";
const CARD_BODY = "#3A3550";
const NORMAL_WIDTH = { fontStretch: "100%" };

// Icon tiles and icon colours, sampled from the reference.
const CARDS = [
  {
    icon: Layers,
    title: "Paper-based documentation",
    text: "Student assessments, reports and session records were maintained in physical files.",
    tile: "bg-[#FDE5DD]",
    color: "text-[#9A3F1F]",
  },
  {
    icon: Search,
    title: "Difficult information retrieval",
    text: "Finding historical information required locating and reviewing physical documentation.",
    tile: "bg-[#E9DFFE]",
    color: "text-[#5F2BC8]",
  },
  {
    icon: ArrowLeftRight,
    title: "Discontinuity between centres",
    text: "When a child transferred, accessing previous records was difficult, often leading to repeated screening.",
    tile: "bg-[#E3F9ED]",
    color: "text-[#1E9B66]",
  },
  {
    icon: CalendarDays,
    title: "Manual session coordination",
    text: "Managing specialist availability, appointments and session records involved additional administrative effort.",
    tile: "bg-[#FEE7F6]",
    color: "text-[#A3208A]",
  },
  {
    icon: Users,
    title: "Limited operational visibility",
    text: "Different professionals managed different parts of a student’s journey, making coordination more complex.",
    tile: "bg-[#DAE6FE]",
    color: "text-[#1B4FC4]",
  },
];

export function BeginningSection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="beginning-title"
      className="relative -mt-px isolate overflow-hidden px-6 py-16 sm:px-8 md:px-[120px] lg:p-0"
      style={{ backgroundColor: SECTION_BG, color: BODY }}
    >
      <div className="@container relative lg:aspect-[1672/941]">
        <motion.img
          src={PLATE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
          style={fadeStyle(BOTTOM_FADE)}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] lg:absolute lg:left-[4.7%] lg:top-[5.1%] lg:gap-[1.2cqw] lg:text-[clamp(12px,1.08cqw,18px)]"
          style={{ color: INK }}
          {...inView(reduce, 0)}
        >
          <span style={{ color: PURPLE }}>02</span>
          <span>The Beginning</span>
        </motion.p>

        {/* The short rule under the eyebrow. Desktop only: on phones the eyebrow stands alone. */}
        <span
          aria-hidden
          className="mt-4 hidden h-[3px] w-12 rounded-full lg:absolute lg:left-[4.6%] lg:top-[9.9%] lg:mt-0 lg:block lg:w-[2.4%]"
          style={{ background: PURPLE }}
        />

        <h2
          id="beginning-title"
          className="mt-6 font-display text-[clamp(30px,8.4vw,44px)] font-bold leading-[1.06] tracking-[-0.02em] lg:absolute lg:left-[4.7%] lg:top-[13.2%] lg:mt-0 lg:whitespace-nowrap lg:text-[clamp(28px,3.1cqw,56px)] lg:leading-[1.135]"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            Care was happening. But managing
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            the information was{" "}
            <span className="relative inline-block" style={{ color: PURPLE }}>
              a challenge.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.28em] left-[18%] h-[0.3em] w-[72%] overflow-visible"
              >
                <motion.path
                  d="M3 14 C 40 6, 90 2, 130 6 S 190 14, 210 8"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
              {/* Two short strokes beside the full stop: the sparkle from the reference. */}
              <svg
                aria-hidden
                viewBox="0 0 32 34"
                className="pointer-events-none absolute left-[calc(100%+0.23em)] top-[0.85em] h-[0.654em] w-[0.615em] overflow-visible"
              >
                <motion.path
                  d="M2 12 L30 4"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={4.5}
                  strokeLinecap="round"
                  {...drawIn(reduce, 0.9, 0.5)}
                />
                <motion.path
                  d="M2 25 L27 32"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={4.5}
                  strokeLinecap="round"
                  {...drawIn(reduce, 1.0, 0.5)}
                />
              </svg>
            </span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] lg:absolute lg:left-[4.7%] lg:top-[30.9%] lg:mt-0 lg:w-[50%] lg:text-[clamp(13px,1.2cqw,21px)] lg:leading-[1.6]"
          style={{ color: BODY }}
          {...inView(reduce, 0.25)}
        >
          Before Mother’s Grace, therapists and special educators relied heavily on physical files to document student
          information, assessments, session records and progress. Over time, these files became difficult to organise,
          retrieve and share — especially when a child moved to another centre.
        </motion.p>

        {/* Mobile only: the photo, cut from the same art. On lg it is the background. */}
        <motion.img
          src={PHOTO}
          alt="Stacked student files and assessment papers on a desk, with a child's drawing and a pen"
          className="mt-8 block h-auto w-full lg:hidden"
          style={fadeStyle(BOTTOM_FADE)}
          {...inView(reduce, 0.1)}
        />

        <ul className="mt-10 flex flex-col gap-3 lg:absolute lg:left-[59.8%] lg:top-[12.4%] lg:mt-0 lg:w-[39.6%] lg:gap-[0.72cqw]">
          {CARDS.map(({ icon: Icon, title, text, tile, color }, i) => (
            <motion.li
              key={title}
              className="group flex items-center gap-5 rounded-[20px] bg-white/50 p-4 shadow-[0_14px_30px_-18px_rgba(60,30,100,0.32)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 lg:gap-[1.5cqw] lg:rounded-[1.5cqw] lg:px-[1.25cqw] lg:py-[1.45cqw] lg:pr-[1.1cqw]"
              {...inView(reduce, 0.2 + i * 0.1)}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} lg:h-[4.8cqw] lg:w-[4.8cqw] lg:rounded-[1.1cqw]`}
              >
                <Icon className={`h-7 w-7 ${color} lg:h-[2.2cqw] lg:w-[2.2cqw]`} strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3
                  className="font-display text-[19px] font-bold leading-[1.2] lg:text-[clamp(14px,1.45cqw,26px)]"
                  style={{ ...NORMAL_WIDTH, color: CARD_INK }}
                >
                  {title}
                </h3>
                <p
                  className="mt-1.5 text-[15px] leading-[1.5] lg:mt-[0.45cqw] lg:text-[clamp(12.5px,1.05cqw,18px)] lg:leading-[1.45]"
                  style={{ color: CARD_BODY }}
                >
                  {text}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
