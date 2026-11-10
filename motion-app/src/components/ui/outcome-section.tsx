import { motion } from "motion/react";
import { BarChart3, CalendarDays, CircleCheck, Layers, LayoutGrid, Network, RefreshCw, Rocket } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { SECTION_BG } from "@/lib/section-fade";

/* Mother's Grace "05 The Outcome" section, rebuilt from the reference. The art is the reference with its copy and the
   orange rays removed (public/projects/mothers-grace-outcome-plate.webp). The laptop, plant, books and mug stay in the
   art. The six cards and the bottom strip are still in the art, so the live cards and strip are opaque and sit exactly
   over them. Copy, the underline, the sparkle, the cards and the strip are live. On xl and up the art box keeps the
   reference's 1672:941 ratio, so positions are percentages of that box. Below xl the section stacks: copy, the laptop
   scene, the cards, then the strip as a list. */

const PLATE = "/projects/mothers-grace-outcome-plate.webp";
const PHONE = "/projects/mothers-grace-outcome-phone.webp";

const INK = "#0A0820";
const BODY = "#1E1A33";
const PURPLE = "#7227FB";
const EYEBROW = "#6D2DE2";
const RULE = "#8C4AE7";
const ORANGE = "#FE9702";
const SEG_TINT = "#F3E6FC";
const STRIP_BG = "#F9F0FF";
const NORMAL_WIDTH = { fontStretch: "100%" };

const CARDS = [
  {
    icon: Layers,
    title: "Documentation",
    first: "Physical files",
    second: "Structured digital records",
    tile: "bg-[#ECDAFD]",
    color: "text-[#7634EC]",
    pos: "xl:left-[2.99%] xl:w-[14.1%]",
  },
  {
    icon: Network,
    title: "Student Information",
    first: "Disconnected records",
    second: "Centralised student profiles",
    tile: "bg-[#FDE9E1]",
    color: "text-[#E87C1A]",
    pos: "xl:left-[18.78%] xl:w-[14.47%]",
  },
  {
    icon: CalendarDays,
    title: "Session Management",
    first: "Manual coordination",
    second: "Digital scheduling workflows",
    tile: "bg-[#D4F9E5]",
    color: "text-[#12B85D]",
    pos: "xl:left-[35.05%] xl:w-[14.47%]",
  },
  {
    icon: RefreshCw,
    title: "Specialist Coordination",
    first: "Separate processes",
    second: "Connected assignment and coordination",
    tile: "bg-[#D5E6FF]",
    color: "text-[#0C6EE7]",
    pos: "xl:left-[51.25%] xl:w-[15.6%]",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    first: "Paper-based records",
    second: "Structured progress information",
    tile: "bg-[#FDE1F7]",
    color: "text-[#D241B3]",
    pos: "xl:left-[68.6%] xl:w-[14.65%]",
  },
  {
    icon: LayoutGrid,
    title: "Operations",
    first: "Manual tasks",
    second: "Role-based digital workflows",
    tile: "bg-[#EFE4FD]",
    color: "text-[#7433E8]",
    pos: "xl:left-[84.98%] xl:w-[12.86%]",
  },
];

export function OutcomeSection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="outcome-title"
      className="relative -mt-px isolate overflow-hidden px-6 py-16 sm:px-8 md:px-[120px] xl:p-0"
      style={{ backgroundColor: SECTION_BG, color: BODY }}
    >
      <div className="@container relative xl:aspect-[1672/941]">
        <motion.img
          src={PLATE}
          alt="A laptop showing the Mother's Grace dashboard, beside a plant, a stack of books and a mug"
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:left-[4.3%] xl:top-[5.4%] xl:gap-[1.2cqw] xl:text-[clamp(12px,0.98cqw,17px)]"
          style={{ color: INK }}
          {...inView(reduce, 0)}
        >
          <span style={{ color: EYEBROW }}>05</span>
          <span>The Outcome</span>
        </motion.p>

        {/* The short rule under the eyebrow. Desktop only, as in the reference. */}
        <span
          aria-hidden
          className="mt-4 hidden h-[3px] w-12 rounded-full xl:absolute xl:left-[4.3%] xl:top-[9.8%] xl:mt-0 xl:block xl:w-[2.4%]"
          style={{ background: RULE }}
        />

        <h2
          id="outcome-title"
          className="mt-6 font-display text-[clamp(30px,8.4vw,44px)] font-bold leading-[1.1] tracking-[-0.02em] xl:absolute xl:left-[4.3%] xl:top-[14.6%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(26px,3.07cqw,56px)] xl:leading-[1.12]"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            A meaningful shift in
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            how{" "}
            <span className="relative inline-block" style={{ color: PURPLE }}>
              care is managed.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.3em] left-[30%] h-[0.32em] w-[73%] overflow-visible"
              >
                <motion.path
                  d="M3 11 C 70 10, 140 10, 211 11"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
              {/* Three short strokes beside the full stop: the sparkle from the reference. */}
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[calc(100%+0.2em)] top-[-0.4em] h-[1.24em] w-[0.95em] overflow-visible"
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
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[4.3%] xl:top-[30.4%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(13px,1.27cqw,22px)] xl:leading-[1.43]"
          style={{ color: BODY }}
          {...inView(reduce, 0.25)}
        >
          Mother’s Grace replaced manual, paper-based processes{" "}
          <br className="hidden xl:inline" />
          with a connected digital platform, giving therapists and{" "}
          <br className="hidden xl:inline" />
          special educators a more structured, efficient and{" "}
          <br className="hidden xl:inline" />
          collaborative way to support each child’s development.
        </motion.p>

        {/* Below xl: the laptop scene, then the cards and the strip. On xl the same art is the background. */}
        <motion.img
          src={PHONE}
          alt="A laptop showing the Mother's Grace dashboard, beside a plant, a stack of books and a mug"
          width={1144}
          height={522}
          className="mt-8 block h-auto w-full xl:hidden"
          style={{ maskImage: "linear-gradient(to right, #000 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, #000 88%, transparent 100%)" }}
          {...inView(reduce, 0.1)}
        />

        <ul className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:contents">
          {CARDS.map(({ icon: Icon, title, first, second, tile, color, pos }, i) => (
            <motion.li
              key={title}
              className={`group relative flex flex-col rounded-[22px] bg-[#FDFAFE] p-5 pt-5 shadow-[0_18px_40px_-26px_rgba(60,30,100,0.3)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 xl:absolute xl:top-[57.2%] xl:h-[21.7%] xl:rounded-[1.4cqw] xl:px-[1.5cqw] xl:pb-[1.2cqw] xl:pt-[4.8cqw] ${pos}`}
              {...inView(reduce, 0.2 + i * 0.07)}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} xl:absolute xl:-top-[1%] xl:left-[1.5cqw] xl:h-[4.2cqw] xl:w-[4.2cqw] xl:rounded-[1.1cqw]`}
              >
                <Icon className={`h-7 w-7 ${color} xl:h-[2.1cqw] xl:w-[2.1cqw]`} strokeWidth={1.75} aria-hidden />
              </span>
              <h3
                className="mt-4 font-display text-[21px] font-bold leading-[1.2] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(14px,1.2cqw,26px)] xl:leading-[1.15]"
                style={{ ...NORMAL_WIDTH, color: INK }}
              >
                {title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.45] xl:mt-[0.5cqw] xl:text-[clamp(13px,1.07cqw,19px)] xl:leading-[1.33]" style={{ color: BODY }}>
                <span className="xl:whitespace-nowrap">{first}{" "}<span aria-hidden="true">→</span></span>
                <br />
                {second}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* The bottom strip. On xl its children are positioned against the strip itself: three segments. Below xl it is a list. */}
        <div
          className="relative mt-8 overflow-hidden rounded-[28px] py-4 xl:absolute xl:left-[3.9%] xl:top-[82.7%] xl:mt-0 xl:h-[12.75%] xl:w-[93.3%] xl:rounded-[3cqw] xl:py-0"
          style={{ backgroundColor: STRIP_BG }}
        >
          <div
            aria-hidden
            className="hidden xl:absolute xl:bottom-0 xl:left-0 xl:top-0 xl:block xl:w-[28.5%] xl:rounded-l-[3cqw]"
            style={{ backgroundColor: SEG_TINT }}
          />
          <span
            aria-hidden
            className="hidden xl:absolute xl:left-[29.2%] xl:top-[18%] xl:block xl:h-[64%] xl:w-px"
            style={{ backgroundColor: "#E6D8F4" }}
          />
          <span
            aria-hidden
            className="hidden xl:absolute xl:left-[63.5%] xl:top-[18%] xl:block xl:h-[64%] xl:w-px"
            style={{ backgroundColor: "#E6D8F4" }}
          />

          <ul className="relative flex flex-col gap-5 px-5 xl:contents">
            <li className="flex items-center gap-4 xl:absolute xl:left-[2.56%] xl:top-[25%] xl:gap-[1.42cqw]">
              <span className="flex w-14 shrink-0 justify-center">
                <Rocket className="h-14 w-14 text-[#762DF4] xl:h-[4.2cqw] xl:w-[4.2cqw]" strokeWidth={1.6} aria-hidden />
              </span>
              <h3
                className="font-display text-[20px] font-bold leading-[1.2] xl:whitespace-nowrap xl:text-[clamp(15px,1.4cqw,28px)]"
                style={{ ...NORMAL_WIDTH, color: INK }}
              >
                Where the product stands
              </h3>
            </li>
            <li className="flex items-start gap-4 xl:absolute xl:left-[31.6%] xl:top-[25%] xl:gap-[1.7cqw]">
              <span className="flex w-14 shrink-0 justify-center xl:relative xl:-top-[0.3cqw] xl:left-[0.3cqw] xl:w-auto">
                <CircleCheck className="mt-1 h-10 w-10 text-[#1FB059] xl:mt-0 xl:h-[2.1cqw] xl:w-[2.1cqw]" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 xl:whitespace-nowrap">
                <h3
                  className="font-display text-[19px] font-bold leading-[1.2] xl:text-[clamp(14px,1.33cqw,26px)]"
                  style={{ ...NORMAL_WIDTH, color: INK }}
                >
                  Live platform
                </h3>
                <p className="mt-1 text-[15px] leading-[1.4] xl:mt-[0.1cqw] xl:text-[clamp(12.5px,1.14cqw,19px)] xl:leading-[1.33]" style={{ color: BODY }}>
                  In use across centres, supporting therapists{" "}
                  <br className="hidden xl:inline" />
                  and special educators in their daily work.
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4 xl:absolute xl:left-[67.0%] xl:top-[18.3%] xl:gap-[0.5cqw]">
              <span className="flex w-14 shrink-0 items-center justify-center xl:h-[4.4cqw] xl:w-[4.4cqw] xl:rounded-[1.2cqw] xl:bg-white/55">
                <Layers className="h-12 w-12 text-[#7E42E7] xl:h-[2.6cqw] xl:w-[2.6cqw]" strokeWidth={1.6} aria-hidden />
              </span>
              <div className="min-w-0 xl:whitespace-nowrap">
                <h3
                  className="font-display text-[19px] font-bold leading-[1.2] xl:text-[clamp(14px,1.33cqw,26px)]"
                  style={{ ...NORMAL_WIDTH, color: INK }}
                >
                  Phase 2 rollout
                </h3>
                <p className="mt-1 text-[15px] leading-[1.4] xl:mt-[0.1cqw] xl:text-[clamp(12.5px,1.14cqw,19px)] xl:leading-[1.33]" style={{ color: BODY }}>
                  Expanding scheduling, coordination and{" "}
                  <br className="hidden xl:inline" />
                  operational capabilities.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
