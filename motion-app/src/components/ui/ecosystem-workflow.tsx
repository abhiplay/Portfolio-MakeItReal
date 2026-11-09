import { motion } from "motion/react";
import {
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  CloudUpload,
  GraduationCap,
  Layers,
  Pencil,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import type { WorkItem } from "@/App";
import { CBL_MOTION_CSS, drawIn, flicker, growIn, inView, popIn, useCblReduce } from "@/components/ui/cbl-motion";

/* CBL CBA "03 The Product Ecosystem" and "The Workflow", rebuilt from the reference. The art is the reference with its
   copy, icon tiles, checks, badges and workflow arrows removed (public/projects/cbl-cba/ecosystem-plate.webp). The
   people photos, the panels and the highlight stay in the art. Copy, icons, checks, badges, arrows and the pill are
   live. On lg and up the art box keeps the reference's 3:2 ratio, so positions are percentages of that box. Below lg
   the cards and steps stack in normal flow. */

const PLATE = "/projects/cbl-cba/ecosystem-plate.webp";
const NORMAL_WIDTH = { fontStretch: "100%" };
const ORANGE = "#F98F17";
const ARROW = "#7547CB";

const ROLES = [
  {
    icon: GraduationCap,
    title: "Teacher",
    subtitle: "Create, submit and improve learning activities.",
    items: [
      "Work on assigned tasks",
      "Create lesson plans & project work",
      "Submit for review",
      "Revise based on feedback",
      "Use approved resources from the public library",
    ],
    photo: "/projects/cbl-cba/eco-teacher.webp",
    panel: "bg-[#F2E8FC]",
    tile: "bg-[#F1E8FD]",
    iconColor: "text-[#6939B5]",
    tileAt: "lg:left-[14.65%] lg:top-[27.05%] lg:h-[7.03%] lg:w-[4.95%]",
    titleAt: "lg:left-[20.4%] lg:top-[27.5%] lg:w-[14%]",
    subAt: "lg:left-[20.4%] lg:top-[31.05%] lg:w-[13.5%]",
    listAt: "lg:left-[16.15%] lg:top-[37.7%] lg:w-[18%]",
  },
  {
    icon: CheckSquare,
    title: "Reviewer",
    subtitle: "Evaluate, provide feedback and approve quality work.",
    items: ["Review submitted work", "Share structured feedback", "Request modifications", "Approve for publication"],
    photo: "/projects/cbl-cba/eco-reviewer.webp",
    panel: "bg-[#FDEEE7]",
    tile: "bg-[#FEF2EA]",
    iconColor: "text-[#F89836]",
    tileAt: "lg:left-[45.4%] lg:top-[26.9%] lg:h-[7.3%] lg:w-[4.95%]",
    titleAt: "lg:left-[51.4%] lg:top-[27.5%] lg:w-[14%]",
    subAt: "lg:left-[51.4%] lg:top-[31.2%] lg:w-[13.5%]",
    listAt: "lg:left-[48.7%] lg:top-[37.7%] lg:w-[14.9%]",
  },
  {
    icon: Layers,
    title: "Allocator / Admin",
    subtitle: "Coordinate, assign and manage the process.",
    items: [
      "Create and manage tasks",
      "Assign to teachers",
      "Track progress and status",
      "Oversee the review & approval flow",
      "Manage the public resource library",
    ],
    photo: "/projects/cbl-cba/eco-allocator.webp",
    panel: "bg-[#F2E8FC]",
    tile: "bg-[#F1E8FD]",
    iconColor: "text-[#6939B5]",
    tileAt: "lg:left-[77.6%] lg:top-[27.0%] lg:h-[7.03%] lg:w-[4.95%]",
    titleAt: "lg:left-[83.2%] lg:top-[27.1%] lg:w-[14%]",
    subAt: "lg:left-[83.3%] lg:top-[33.2%] lg:w-[12%]",
    listAt: "lg:left-[79.9%] lg:top-[37.9%] lg:w-[18.4%]",
  },
];

// Step columns are centred on the % positions in the classes below. Titles and text are 14% wide, centred on the column.
// The tile of step 6 sits a little left of its text. Classes are written out in full so Tailwind generates them.
const STEPS = [
  { icon: ClipboardList, title: "Assign Task", text: "Allocator assigns academic tasks to teachers.", pos: "lg:left-[10.4%] lg:-translate-x-1/2", tilePos: "lg:left-[10.4%] lg:-translate-x-1/2", tile: "bg-[#E9E2FA]", iconColor: "text-[#6939B5]" },
  { icon: Pencil, title: "Create Content", text: "Teacher prepares lesson plans, project work or assessments.", pos: "lg:left-[24.8%] lg:-translate-x-1/2", tilePos: "lg:left-[24.8%] lg:-translate-x-1/2", tile: "bg-[#FFE7D2]", iconColor: "text-[#F98F17]" },
  { icon: CloudUpload, title: "Submit", text: "Teacher uploads the completed work for review.", pos: "lg:left-[39.2%] lg:-translate-x-1/2", tilePos: "lg:left-[39.2%] lg:-translate-x-1/2", tile: "bg-[#E9E2FA]", iconColor: "text-[#6939B5]" },
  { icon: Search, title: "Review", text: "Reviewer evaluates the submission and shares feedback.", pos: "lg:left-[53.6%] lg:-translate-x-1/2", tilePos: "lg:left-[53.6%] lg:-translate-x-1/2", tile: "bg-[#FFE7D2]", iconColor: "text-[#F98F17]" },
  { icon: RefreshCw, title: "Rework", text: "Teacher makes changes (if required) and resubmits.", pos: "lg:left-[67.9%] lg:-translate-x-1/2", tilePos: "lg:left-[67.9%] lg:-translate-x-1/2", tile: "bg-[#E9E2FA]", iconColor: "text-[#6939B5]" },
  { icon: BookOpen, title: "Publish & Share", text: "Approved work is published in a public library, making it available for all teachers to use in their classes.", pos: "lg:left-[87.0%] lg:-translate-x-1/2", tilePos: "lg:left-[86.1%] lg:-translate-x-1/2", tile: "bg-[#E9E2FA]", iconColor: "text-[#6939B5]" },
];

// The workflow arrows, in the reference's pixel space (1536 x 1024). Each one draws in after the step before it.
const ARROWS = [
  { x0: 245, x1: 283 },
  { x0: 477, x1: 505 },
  { x0: 696, x1: 724 },
  { x0: 915, x1: 943 },
  { x0: 1126, x1: 1162 },
].map(({ x0, x1 }) => `M${x0} 758 L${x1} 758 M${x1 - 7} 751 L${x1} 758 L${x1 - 7} 765`);

export function EcosystemWorkflow({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section className="relative isolate overflow-hidden bg-[#F7F3FC] px-6 py-16 text-[#1D083F] sm:px-8 lg:p-0">
      <style>{CBL_MOTION_CSS}</style>
      <div className="@container relative lg:aspect-[3/2]">
        <img src={PLATE} alt="" aria-hidden className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block" />

        <motion.p
          className="flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7649BE] lg:absolute lg:left-[3.0%] lg:top-[3.6%] lg:w-[35%] lg:text-[clamp(12px,1.0cqw,16px)]"
          {...inView(reduce, 0)}
        >
          <span>03</span>
          <span>The Product Ecosystem</span>
          <span aria-hidden className="hidden h-px flex-1 bg-[#B9A7DC] lg:block" />
        </motion.p>

        <h2
          className="mt-6 font-display text-[clamp(30px,8vw,44px)] font-bold leading-[1.02] tracking-[-0.02em] lg:absolute lg:left-[3.7%] lg:top-[9.5%] lg:mt-0 lg:w-[50%] lg:text-[clamp(30px,3.5cqw,60px)]"
          style={NORMAL_WIDTH}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            A connected platform
          </motion.span>
          <motion.span className="relative block" {...inView(reduce, 0.2)}>
            for{" "}
            <span className="relative inline-block">
              collaborative
              <svg
                aria-hidden
                viewBox="0 0 134 16"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.3em] left-[0%] hidden h-[0.22em] w-[100%] overflow-visible lg:block"
              >
                <motion.path
                  d="M2 9 C 30 3, 70 2, 100 5 S 124 11, 132 7"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
            </span>{" "}
            assessment.
          </motion.span>
        </h2>

        <motion.p
          className="mt-6 text-[16px] leading-[1.6] text-[#241840] lg:absolute lg:left-[55.7%] lg:top-[8.0%] lg:mt-0 lg:w-[40.6%] lg:text-[clamp(14px,1.24cqw,19px)] lg:leading-[1.55]"
          {...inView(reduce, 0.15)}
        >
          CBL-CBA brings together teachers, allocators and reviewers in a single platform, where each role has a clear
          purpose in the assessment lifecycle — from task creation to a{" "}
          <motion.span
            className="inline-block rounded-full bg-[#E6DCF9] px-2 font-semibold text-[#5B2FB8]"
            {...inView(reduce, 0.5, 6, 0.6)}
          >
            shared library
          </motion.span>{" "}
          of approved resources for all teachers.
        </motion.p>

        <motion.span
          aria-hidden
          className="hidden lg:absolute lg:left-[52.5%] lg:top-[8.4%] lg:block lg:h-[11.5%] lg:w-px lg:bg-[#CFC3E6]"
          style={{ transformOrigin: "top" }}
          {...growIn(reduce, 0.2)}
        />

        <ul className="mt-14 grid gap-6 lg:contents">
          {ROLES.map(({ icon: Icon, title, subtitle, items, photo, panel, tile, iconColor, tileAt, titleAt, subAt, listAt }, i) => {
            const base = i * 0.15;
            return (
              <li key={title} className={`group flex flex-col rounded-[28px] p-5 ${panel} lg:contents`}>
                <img
                  src={photo}
                  alt=""
                  aria-hidden
                  className="mb-5 block h-auto w-full rounded-[18px] lg:hidden"
                />
                <div className="flex items-center gap-5 lg:contents">
                  <motion.span
                    aria-hidden
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} lg:absolute ${tileAt}`}
                    {...inView(reduce, base)}
                  >
                    <Icon className={`h-7 w-7 ${iconColor} lg:h-[2.6cqw] lg:w-[2.6cqw]`} strokeWidth={1.75} />
                  </motion.span>
                  <motion.h3
                    className={`font-display text-[22px] font-bold leading-[1.1] text-[#16083A] lg:absolute lg:text-[clamp(18px,1.7cqw,26px)] ${titleAt}`}
                    style={NORMAL_WIDTH}
                    {...inView(reduce, base + 0.08)}
                  >
                    {title}
                  </motion.h3>
                </div>
                <motion.p
                  className={`mt-3 text-[15px] leading-[1.45] text-[#31294A] lg:absolute lg:mt-0 lg:text-[clamp(12px,1.0cqw,15px)] lg:leading-[1.35] ${subAt}`}
                  {...inView(reduce, base + 0.16)}
                >
                  {subtitle}
                </motion.p>
                <ul className={`mt-4 space-y-2 lg:absolute lg:mt-0 lg:space-y-0 lg:leading-[1.8] ${listAt}`}>
                  {items.map((item, j) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2 text-[15px] leading-[1.45] text-[#2A2238] lg:text-[clamp(12px,1.0cqw,15px)]"
                      {...inView(reduce, base + 0.3 + j * 0.08, 12, 0.6)}
                    >
                      <CheckCircle2 aria-hidden className="mt-[0.2em] h-4 w-4 shrink-0 text-[#7547CB] lg:h-[1.2cqw] lg:w-[1.2cqw]" strokeWidth={2} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <motion.h2
          className="mt-20 font-display text-[clamp(30px,8vw,44px)] font-bold leading-[1.1] tracking-[-0.01em] lg:absolute lg:left-[4.4%] lg:top-[62.1%] lg:mt-0 lg:text-[clamp(28px,3.0cqw,46px)]"
          style={{ ...NORMAL_WIDTH, color: "#1D083F" }}
          {...inView(reduce, 0)}
        >
          The Workflow
        </motion.h2>
        <motion.p
          className="mt-4 text-[16px] leading-[1.55] text-[#2A2540] lg:absolute lg:left-[27.0%] lg:top-[61.7%] lg:mt-0 lg:w-[49.8%] lg:text-[clamp(14px,1.24cqw,19px)] lg:leading-[1.45]"
          {...inView(reduce, 0.1)}
        >
          A structured, end-to-end process that takes a learning activity from assignment to publication, with collaboration
          and feedback at its core.
        </motion.p>
        <motion.span
          aria-hidden
          className="hidden lg:absolute lg:left-[24.5%] lg:top-[61.9%] lg:block lg:h-[4.6%] lg:w-px lg:bg-[#CFC3E6]"
          style={{ transformOrigin: "top" }}
          {...growIn(reduce, 0.2)}
        />

        <ol className="mt-14 grid gap-10 lg:contents">
          {STEPS.map(({ icon: Icon, title, text, pos, tilePos, tile, iconColor }, i) => {
            const base = i * 0.12;
            return (
              <li
                key={title}
                className={`group flex flex-col items-center text-center ${i === 5 ? "rounded-[24px] bg-[#EFE2FD] p-6 lg:contents" : "lg:contents"}`}
              >
                <motion.span
                  aria-hidden
                  className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} lg:absolute lg:top-[69.9%] lg:h-[5.5cqw] lg:w-[5.5cqw] lg:rounded-[1.4cqw] ${tilePos}`}
                  {...inView(reduce, base)}
                >
                  <Icon className={`h-6 w-6 ${iconColor} lg:h-[2.2cqw] lg:w-[2.2cqw]`} strokeWidth={1.75} />
                  <motion.span
                    className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-[#4A2C7A] shadow-sm lg:h-[1.7cqw] lg:w-[1.7cqw] lg:text-[clamp(10px,0.8cqw,12px)]"
                    {...popIn(reduce, base + 0.3)}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </motion.span>
                <motion.h3
                  className={`mt-4 font-display text-[18px] font-bold leading-[1.2] text-[#09072A] lg:absolute lg:top-[79.1%] lg:mt-0 lg:w-[14%] lg:text-[clamp(14px,1.25cqw,20px)] ${pos}`}
                  style={NORMAL_WIDTH}
                  {...inView(reduce, base + 0.1)}
                >
                  {title}
                </motion.h3>
                <motion.p
                  className={`mt-2 text-[15px] leading-[1.45] text-[#22203A] lg:absolute lg:top-[81.7%] lg:mt-0 lg:w-[14%] lg:text-[clamp(12px,1.05cqw,16px)] lg:leading-[1.4] ${pos}`}
                  {...inView(reduce, base + 0.18)}
                >
                  {text}
                </motion.p>
              </li>
            );
          })}
        </ol>

        {/* The workflow arrows, drawn live in sequence between the steps. Decorative, and lg only. */}
        <svg
          aria-hidden
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          {ARROWS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={ARROW}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              {...drawIn(reduce, 0.3 + i * 0.12, 0.6)}
            />
          ))}
        </svg>

        {/* Step 6's rays, which flicker once as the step arrives. */}
        <motion.svg
          aria-hidden
          viewBox="0 0 40 40"
          className="pointer-events-none hidden lg:absolute lg:left-[87.6%] lg:top-[68.2%] lg:block lg:h-[3.4%] lg:w-[2.6%]"
          {...flicker(reduce)}
        >
          <path d="M6 22 L11 12 M13 28 L21 16 M18 36 L30 26" fill="none" stroke={ORANGE} strokeWidth={3} strokeLinecap="round" />
        </motion.svg>

        <motion.p
          className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#E3CEFC] px-5 py-2.5 text-[15px] font-semibold text-[#6220B8] lg:absolute lg:left-[78.9%] lg:top-[88.3%] lg:mt-0 lg:h-[3.6%] lg:w-[16.2%] lg:text-[clamp(12px,1.05cqw,16px)]"
          {...inView(reduce, 0.4)}
        >
          <span aria-hidden className="cbl-ring pointer-events-none absolute inset-0 rounded-full" />
          <Users aria-hidden className="h-4 w-4 lg:h-[1.2cqw] lg:w-[1.2cqw]" strokeWidth={2} />
          Available to all teachers
        </motion.p>
      </div>
    </section>
  );
}
