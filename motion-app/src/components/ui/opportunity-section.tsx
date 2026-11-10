import { motion } from "motion/react";
import { BarChart3, CalendarDays, Layers, RefreshCw, Users } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { SECTION_BG, TOP_BOTTOM_FADE, fadeStyle } from "@/lib/section-fade";

/* Mother's Grace "03 The Opportunity" section, rebuilt from the reference. The art is the reference with its copy, the
   five option cards, the five role labels and the wordmark removed (public/projects/mothers-grace-opportunity-plate.webp).
   The laptop, desk, books, plant, orbit, lotus and the five avatars stay in the art. Copy, the underline, the sparkle,
   the role labels, the wordmark and the cards are live. On lg and up the art box keeps the reference's 1672:941 ratio,
   so positions are percentages of that box. Below lg the copy stacks, then the role names, the laptop and the cards. */

const PLATE = "/projects/mothers-grace-opportunity-plate.webp";

const INK = "#120D28";
const BODY = "#1F1A33";
const PURPLE = "#7734E6";
const EYEBROW_PURPLE = "#7E48DF";
const ORANGE = "#F99A12";
const LABEL_INK = "#1B1640";
const CARD_INK = "#130D2B";
const CARD_BODY = "#3A3550";
const NORMAL_WIDTH = { fontStretch: "100%" };

// Role labels sit on the avatar pills in the art. Positions are % of the 1672:941 box, to the top-left of each label.
const ROLES = [
  { label: ["Clinical", "Psychologist"], pos: "xl:left-[72.3%] xl:top-[14.0%]" },
  { label: ["COE Admin"], pos: "xl:left-[60.0%] xl:top-[25.2%]" },
  { label: ["Therapist /", "Special Educator"], pos: "xl:left-[88.6%] xl:top-[24.1%]" },
  { label: ["Super", "Admin"], pos: "xl:left-[55.1%] xl:top-[41.8%]" },
  { label: ["Case", "Manager"], pos: "xl:left-[93.4%] xl:top-[41.9%]" },
];

const CARDS = [
  {
    icon: Layers,
    title: "Centralised Student Records",
    text: "Maintain student information, assessments, reports and documentation digitally.",
    tile: "bg-[#EEE2FD]",
    color: "text-[#7A22D0]",
  },
  {
    icon: Users,
    title: "Connected Workflows",
    text: "Give different teams access to the information and actions relevant to their responsibilities.",
    tile: "bg-[#FFE9D9]",
    color: "text-[#F4851A]",
  },
  {
    icon: CalendarDays,
    title: "Structured Session Management",
    text: "Simplify scheduling, rescheduling and recurring appointments.",
    tile: "bg-[#DDF7E7]",
    color: "text-[#0EAC56]",
  },
  {
    icon: BarChart3,
    title: "Progress Visibility",
    text: "Organise goals, session history, attendance and progress information.",
    tile: "bg-[#ECE5FD]",
    color: "text-[#6C26E1]",
  },
  {
    icon: RefreshCw,
    title: "Continuity of Care",
    text: "Make relevant student information more accessible when responsibilities or centre assignments change.",
    tile: "bg-[#DDEBFD]",
    color: "text-[#0E68ED]",
    wide: true,
  },
];

export function OpportunitySection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="opportunity-title"
      className="relative -mt-px isolate overflow-hidden px-6 py-16 sm:px-8 md:px-[120px] xl:p-0"
      style={{ backgroundColor: SECTION_BG, color: BODY }}
    >
      <div className="@container relative xl:aspect-[1672/941]">
        <motion.img
          src={PLATE}
          alt="The Mother's Grace dashboard on a laptop, on a desk beside books and a plant"
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          style={fadeStyle(TOP_BOTTOM_FADE)}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:left-[4.4%] xl:top-[5.9%] xl:gap-[1.2cqw] xl:text-[clamp(12px,1.08cqw,18px)]"
          style={{ color: INK }}
          {...inView(reduce, 0)}
        >
          <span style={{ color: EYEBROW_PURPLE }}>03</span>
          <span>The Opportunity</span>
        </motion.p>

        {/* The short rule under the eyebrow. Desktop only, as in the reference. */}
        <span
          aria-hidden
          className="mt-4 hidden h-[3px] w-12 rounded-full xl:absolute xl:left-[4.4%] xl:top-[10.0%] xl:mt-0 xl:block xl:w-[2.4%]"
          style={{ background: EYEBROW_PURPLE }}
        />

        <h2
          id="opportunity-title"
          className="mt-6 font-display text-[clamp(30px,8.4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em] xl:absolute xl:left-[4.4%] xl:top-[15.2%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(24px,2.92cqw,50px)] xl:leading-[1.2]"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            What if every student’s journey
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            could live in one{" "}
            <span className="relative inline-block" style={{ color: PURPLE }}>
              connected platform?
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.3em] left-[8%] h-[0.3em] w-[78%] overflow-visible"
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
              {/* Three short strokes fanning out from the question mark: the sparkle from the reference. */}
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                className="pointer-events-none absolute left-[calc(100%-0.15em)] top-[-0.92em] h-[1em] w-[0.96em] overflow-visible"
              >
                <motion.path
                  d="M2 23 L12 2"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={5}
                  strokeLinecap="round"
                  {...drawIn(reduce, 0.9, 0.5)}
                />
                <motion.path
                  d="M14.5 32 L33.3 18"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={5}
                  strokeLinecap="round"
                  {...drawIn(reduce, 1.0, 0.5)}
                />
                <motion.path
                  d="M21 43 L41 41.7"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={5}
                  strokeLinecap="round"
                  {...drawIn(reduce, 1.1, 0.5)}
                />
              </svg>
            </span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[4.4%] xl:top-[30.0%] xl:mt-0 xl:w-[46%] xl:text-[clamp(13px,1.28cqw,22px)] xl:leading-[1.5]"
          style={{ color: BODY }}
          {...inView(reduce, 0.25)}
        >
          The opportunity was to move beyond digitising individual documents. We needed a platform that could bring
          student information, people and processes together — and support the complete care journey.
        </motion.p>

        {/* Role labels. On lg they sit on the avatar pills in the art; on phones they are a row above the laptop. */}
        <ul className="mt-8 flex flex-wrap gap-2 xl:sr-only">
          {ROLES.map((r) => (
            <li
              key={r.label.join(" ")}
              className="rounded-full bg-white/70 px-4 py-2 text-[14px] font-semibold"
              style={{ color: LABEL_INK }}
            >
              {r.label.join(" ")}
            </li>
          ))}
        </ul>
        {ROLES.map((r, i) => (
          <motion.p
            key={`lg-${r.label.join(" ")}`}
            aria-hidden
            className={`hidden whitespace-nowrap font-semibold leading-[1.15] xl:absolute xl:block xl:text-[clamp(12px,1.05cqw,18px)] ${r.pos}`}
            style={{ color: LABEL_INK }}
            {...inView(reduce, 0.5 + i * 0.08)}
          >
            {r.label.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        ))}

        {/* The wordmark in the orbit, above the laptop. Desktop only. */}
        <motion.p
          aria-hidden
          className="hidden whitespace-nowrap font-display font-bold leading-none xl:absolute xl:block xl:left-[73.7%] xl:top-[35.7%] xl:-translate-x-1/2 xl:text-[clamp(15px,1.45cqw,26px)]"
          style={{ ...NORMAL_WIDTH, color: INK }}
          {...inView(reduce, 0.45)}
        >
          Mother’s Grace
        </motion.p>

        {/* Below xl: the same art, labels removed. The role names are the chips above it. */}
        <motion.img
          src={PLATE}
          alt="The Mother's Grace dashboard on a laptop, on a desk beside books and a plant"
          className="mt-8 block h-auto w-full xl:hidden"
          style={fadeStyle(TOP_BOTTOM_FADE)}
          {...inView(reduce, 0.1)}
        />

        <ul className="mt-10 flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:absolute xl:left-[3.0%] xl:top-[43.3%] xl:mt-0 xl:grid xl:w-[45%] xl:grid-cols-2 xl:gap-x-[1.2cqw] xl:gap-y-[1.2cqw]">
          {CARDS.map(({ icon: Icon, title, text, tile, color, wide }, i) => (
            <motion.li
              key={title}
              className={`group flex items-center gap-5 rounded-[20px] bg-white/65 p-4 shadow-[0_18px_40px_-24px_rgba(60,30,100,0.3)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 xl:gap-[0.8cqw] xl:rounded-[1.7cqw] xl:pb-[1.25cqw] xl:pl-[1.0cqw] xl:pr-[1.0cqw] xl:pt-[1.25cqw] ${
                wide ? "lg:col-span-2 xl:max-w-[76%]" : ""
              }`}
              {...inView(reduce, 0.2 + i * 0.1)}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} xl:h-[4.4cqw] xl:w-[4.4cqw]`}
              >
                <Icon className={`h-7 w-7 ${color} xl:h-[2.1cqw] xl:w-[2.1cqw]`} strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3
                  className="font-display text-[19px] font-bold leading-[1.2] xl:text-[clamp(14px,1.04cqw,19px)]"
                  style={{ ...NORMAL_WIDTH, color: CARD_INK }}
                >
                  {title}
                </h3>
                <p
                  className="mt-1.5 text-[15px] leading-[1.5] xl:mt-[0.5cqw] xl:text-[clamp(14px,0.99cqw,17px)] xl:leading-[1.42]"
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
