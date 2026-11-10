import { motion } from "motion/react";
import { ArrowRight, BookOpen, Leaf, Users, Zap } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, growIn, inView, useCblReduce } from "@/components/ui/cbl-motion";

/* CBL CBA "02 The Challenge" section, rebuilt from the reference. The art is the reference with its copy and the
   four option cards removed (public/projects/cbl-cba/challenge-plate.webp). The photo keeps its four callouts, which
   are part of the illustration. Copy, the arrow, the divider and the option cards are live. On lg and up the art box
   keeps the reference's 3:2 ratio, so positions are percentages of that box. Below lg the copy stacks above the photo. */

const PLATE = "/projects/cbl-cba/challenge-plate.webp";
const PHOTO = "/projects/cbl-cba/challenge-photo.webp";

const INK = "#200A43";
const BODY = "#221B3C";
const OPP_INK = "#2F0C4E";
const CARD_INK = "#130A36";
const CARD_BODY = "#37334B";
const EYEBROW = "#6939B5";
const ORANGE = "#F98F17";
const NORMAL_WIDTH = { fontStretch: "100%" };

const CALLOUTS = [
  "Disjointed workflows",
  "Limited peer review",
  "Time-consuming and manual",
  "Focused on content, not competencies",
];

// Left edge of each card, as a % of the 3:2 box. The cards sit in one row.
const OPTIONS = [
  {
    icon: BookOpen,
    title: "Bring structure",
    text: "Organise lesson plans, project work and assessments in one place.",
    pos: "lg:left-[31.4%]",
    tile: "bg-[#E7DFFA]",
    color: "text-[#7547CB]",
  },
  {
    icon: Users,
    title: "Enable collaboration",
    text: "A teacher-to-teacher process for review, feedback and improvement.",
    pos: "lg:left-[48.2%]",
    tile: "bg-[#FFE6D2]",
    color: "text-[#F59037]",
  },
  {
    icon: Zap,
    title: "Save time",
    text: "Simplify task creation, submission and approval with a clear workflow.",
    pos: "lg:left-[64.9%]",
    tile: "bg-[#E7DFFA]",
    color: "text-[#7547CB]",
  },
  {
    icon: Leaf,
    title: "Focus on competencies",
    text: "Support the shift from content-based to competency-based learning.",
    pos: "lg:left-[81.7%]",
    tile: "bg-[#FFE6D2]",
    color: "text-[#F59037]",
  },
];

export function ChallengeSection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F1FD] px-6 py-16 sm:px-8 lg:p-0" style={{ color: BODY }}>
      <div className="@container relative lg:aspect-[3/2]">
        <motion.img
          src={PLATE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
          style={{ maskImage: "linear-gradient(to bottom, transparent 0%, #000 7%)" }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-4 text-[14px] font-semibold uppercase tracking-[0.18em] lg:absolute lg:left-[120px] lg:top-[7.4%] lg:w-[40%]"
          style={{ color: EYEBROW }}
          {...inView(reduce, 0)}
        >
          <span>02</span>
          <span>The Challenge</span>
          <span aria-hidden className="hidden h-px flex-1 bg-[#C9B8E8] lg:block" />
        </motion.p>

        <h2
          className="mt-6 font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] lg:absolute lg:left-[120px] lg:top-[15.4%] lg:mt-0"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            Traditional assessment
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            made it hard to focus on
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.3)}>
            real{" "}
            <span className="relative inline-block">
              learning.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.28em] left-[0%] h-[0.3em] w-[92%] overflow-visible"
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
            </span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-8 text-[17px] leading-[1.6] md:text-[19px] lg:absolute lg:left-[120px] lg:top-[37.3%] lg:mt-0 lg:w-[38%] lg:leading-[1.55]"
          {...inView(reduce, 0.25)}
        >
          Assessments were often content-heavy, fragmented, and lacked a collaborative process, making it difficult for
          teachers to create, review and improve competency-based learning activities at scale.
        </motion.p>

        {/* Mobile only: the photo. On lg it is the background, and its callouts are part of the illustration. */}
        <motion.img
          src={PHOTO}
          alt="A teacher thinking at her desk, with four callouts: disjointed workflows, limited peer review, time-consuming and manual, and focused on content, not competencies"
          className="mt-10 block h-auto w-full lg:hidden"
          {...inView(reduce, 0.1)}
        />
        <ul className="sr-only">
          {CALLOUTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <motion.h3
          className="mt-14 font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] lg:absolute lg:left-[120px] lg:top-[65.4%] lg:mt-0"
          style={{ ...NORMAL_WIDTH, color: OPP_INK }}
          {...inView(reduce, 0.15)}
        >
          The Opportunity
        </motion.h3>

        <motion.p
          className="mt-5 text-[17px] leading-[1.6] lg:absolute lg:left-[120px] lg:top-[72.4%] lg:mt-0 lg:w-[24%] lg:leading-[1.55]"
          {...inView(reduce, 0.25)}
        >
          Design a digital platform that brings structure, collaboration and clarity to the creation and review of
          competency-based learning activities.
        </motion.p>

        <motion.span
          aria-hidden
          className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECE1FC] transition-[translate] duration-300 motion-safe:hover:translate-x-1 lg:absolute lg:left-[120px] lg:top-[85.5%] lg:mt-0 lg:h-[4.3cqw] lg:w-[4.3cqw]"
          {...inView(reduce, 0.35)}
        >
          <ArrowRight className="h-6 w-6 text-[#6939B5] lg:h-[1.6cqw] lg:w-[1.6cqw]" strokeWidth={1.75} />
        </motion.span>

        <motion.span
          aria-hidden
          className="hidden lg:absolute lg:left-[28.9%] lg:top-[66.4%] lg:block lg:h-[25.8%] lg:w-[2px] lg:bg-[#D8CDE8]"
          style={{ transformOrigin: "top" }}
          {...growIn(reduce, 0.3)}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:contents">
          {OPTIONS.map(({ icon: Icon, title, text, pos, tile, color }, i) => (
            <motion.li
              key={title}
              className={`group flex flex-col rounded-[22px] bg-white/85 px-5 pb-6 pt-4 shadow-[0_18px_40px_-24px_rgba(60,30,100,0.3)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 lg:absolute lg:top-[65.9%] lg:h-[26.1%] lg:w-[15.8%] lg:rounded-[1.7cqw] lg:px-[1.3cqw] lg:pt-[0.9cqw] ${pos}`}
              {...inView(reduce, 0.2 + i * 0.12)}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} lg:h-[5.2cqw] lg:w-[5.2cqw] lg:rounded-[1.1cqw]`}
              >
                <Icon className={`h-7 w-7 ${color} lg:h-[2.2cqw] lg:w-[2.2cqw]`} strokeWidth={1.75} aria-hidden />
              </span>
              <h4
                className="mt-4 min-h-[2.4em] font-display text-[24px] font-bold leading-[1.2] lg:mt-[2.2cqw]"
                style={{ ...NORMAL_WIDTH, color: CARD_INK }}
              >
                {title}
              </h4>
              <p className="mt-2 text-[16px] leading-[1.5] lg:leading-[1.45]" style={{ color: CARD_BODY }}>
                {text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
