import { motion } from "motion/react";
import { BarChart3, Layers, Smartphone, UserPlus } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { COVER_NAME, isMorphDestination } from "@/lib/project-morph";
import { BOTTOM_FADE, SECTION_BG, fadeStyle } from "@/lib/section-fade";
import { slugOf } from "@/lib/slug";

/* AuroScholar case-study hero, rebuilt from the design. The art is the design with its copy, underline, sparkle
   and feature row removed (public/projects/auroscholar-design-plate.webp): the phones, books and leaves stay in it.
   The logo is its own transparent asset. The eyebrow, headline, underline, sparkle, paragraph and features are live.
   On xl and up the art box keeps the design's 1672:941 ratio, so positions are percentages of that box. Below xl the
   copy stacks above the phones. */

const PLATE = "/projects/auroscholar-design-plate.webp";
const PHONE = "/projects/auroscholar-design-phone.webp";
const LOGO = "/projects/auroscholar-logo.png";

const INK = "#0C0A2A";
const BODY = "#0A0820";
const PURPLE = "#6D26F7";
const ORANGE = "#FCB306";
const ICON = "#6D3DB9";
const NORMAL_WIDTH = { fontStretch: "100%" };

const FEATURES = [
  { icon: Smartphone, label: ["Mobile App", "(Android)"] },
  { icon: Layers, label: ["App", "Redesign"] },
  { icon: UserPlus, label: ["Onboarding", "Experience"] },
  { icon: BarChart3, label: ["Competency", "Based Results"] },
];

export function AuroscholarHero({ p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  // The art is the morph target on the page a card morph is taking the reader to.
  const destination = isMorphDestination(slugOf(p.title));
  return (
    <section
      data-header-tone="light"
      aria-labelledby="aus-hero-title"
      className="relative isolate overflow-hidden px-6 pb-16 pt-28 sm:px-8 md:px-[120px] xl:p-0"
      style={{ backgroundColor: SECTION_BG, color: BODY }}
    >
      <div className="@container relative xl:aspect-[1672/941]">
        <motion.img
          src={PLATE}
          alt="Three AuroScholar app screens on phones, with a stack of books and leaves"
          data-project-cover=""
          style={{
            ...fadeStyle(BOTTOM_FADE),
            ...(destination ? { viewTransitionName: COVER_NAME } : {}),
          }}
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:left-[8.7%] xl:top-[8.6%] xl:gap-0 xl:text-[clamp(11px,0.86cqw,14px)]"
          style={{ color: "#120E30" }}
          {...inView(reduce, 0)}
        >
          <span aria-hidden className="mr-3 hidden h-[2px] w-9 rounded-full xl:absolute xl:-left-[3.1cqw] xl:top-[0.55em] xl:block xl:w-[2.2cqw]" style={{ background: PURPLE }} />
          <span>Product Experience</span>
        </motion.p>

        <motion.img
          src={LOGO}
          alt="AuroScholar"
          aria-hidden={false}
          className="mt-8 block h-auto w-[56%] max-w-[330px] sm:w-[40%] xl:absolute xl:left-[5.0%] xl:top-[13.2%] xl:mt-0 xl:w-[19.7%] xl:max-w-none"
          {...inView(reduce, 0.1)}
        />

        <h1
          id="aus-hero-title"
          className="mt-8 font-display text-[clamp(30px,8.4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] xl:absolute xl:left-[5.3%] xl:top-[24.0%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(30px,3.75cqw,80px)] xl:leading-[1.1]"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.15)}>
            Making student
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.25)}>
            progress{" "}
            <span className="relative inline-block" style={{ color: PURPLE }}>
              easier to
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[calc(100%-0.25em)] top-[-0.95em] h-[1.2em] w-[0.9em] overflow-visible"
              >
                <motion.path d="M2 23 L12 2" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 0.9, 0.5)} />
                <motion.path d="M14.5 32 L33.3 18" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.0, 0.5)} />
                <motion.path d="M21 43 L41 41.7" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.1, 0.5)} />
              </svg>
            </span>
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.35)}>
            <span className="relative inline-block" style={{ color: PURPLE }}>
              understand.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.22em] left-[15%] h-[0.34em] w-[91%] overflow-visible"
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
            </span>
          </motion.span>
        </h1>

        <motion.p
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[5.3%] xl:top-[52.0%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(13px,1.3cqw,22px)] xl:leading-[1.3]"
          style={{ color: BODY }}
          {...inView(reduce, 0.3)}
        >
          A refreshed learning experience designed to make{" "}
          <br className="hidden xl:inline" />
          education more intuitive, onboarding smoother and{" "}
          <br className="hidden xl:inline" />
          student performance more meaningful.
        </motion.p>

        {/* Below xl: the phones, then the features. On xl the phones are the background art. */}
        <motion.img
          src={PHONE}
          alt=""
          aria-hidden
          width={1242}
          height={881}
          className="mt-10 block h-auto w-full xl:hidden"
          style={fadeStyle(BOTTOM_FADE)}
          {...inView(reduce, 0.2)}
        />

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 xl:absolute xl:left-[5.1%] xl:top-[66.6%] xl:mt-0 xl:flex xl:gap-[2.9cqw]">
          {FEATURES.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label.join(" ")}
              className={`flex flex-col items-center gap-2 text-center xl:relative xl:gap-[0.6cqw] ${
                i > 0 ? "xl:before:absolute xl:before:-left-[1.45cqw] xl:before:top-0 xl:before:h-full xl:before:w-px xl:before:bg-[#D9CCEB] xl:before:content-['']" : ""
              }`}
              {...inView(reduce, 0.35 + i * 0.08)}
            >
              <Icon className="h-9 w-9 xl:h-[2cqw] xl:w-[2cqw]" style={{ color: ICON }} strokeWidth={1.6} aria-hidden />
              <span
                className="text-[14px] font-semibold leading-snug xl:text-[clamp(12px,1.0cqw,17px)] xl:leading-[1.25]"
                style={{ color: INK }}
              >
                {label[0]}
                <br />
                {label[1]}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
