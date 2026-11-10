import { motion } from "motion/react";
import { Box, Layers, Lightbulb, Monitor, Network, Rocket, Search, Users, Workflow } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { BOTTOM_FADE, SECTION_BG, fadeStyle } from "@/lib/section-fade";

/* Mother's Grace "04 My Role" section, rebuilt from the reference. The art is the reference with its copy, the
   six-card panel and the five timeline steps removed (public/projects/mothers-grace-role-plate.webp). The cat, desk,
   laptop, whiteboard, sticky notes, plant and the book titles stay in the art. The panel is opaque in the reference,
   so the live panel covers the baked one exactly. Copy, the underline, the sparkle, the panel, the cards and the
   timeline are live. On xl and up the art box keeps the reference's 1670:941 ratio, so positions are percentages of
   that box. Below xl the section stacks: copy, the cat scene, the panel, then the timeline as a list. */

const PLATE = "/projects/mothers-grace-role-plate.webp";
const PHONE = "/projects/mothers-grace-role-phone.webp";

const INK = "#0B0820";
const BODY = "#1E1A33";
const PURPLE = "#8232FC";
const EYEBROW = "#7732E3";
const ORANGE = "#FE9502";
const CARD_INK = "#0E0A24";
const CARD_BODY = "#2C2842";
const NORMAL_WIDTH = { fontStretch: "100%" };

const CONTRIBUTIONS = [
  {
    icon: Search,
    title: "Product Understanding",
    text: "Understood on-ground workflows, user needs and operational challenges across centres.",
    tile: "bg-[#EEE1FC]",
    color: "text-[#8443EA]",
  },
  {
    icon: Network,
    title: "UX Architecture",
    text: "Defined information architecture, user journeys and role-based workflows.",
    tile: "bg-[#FDE9DA]",
    color: "text-[#E7751A]",
  },
  {
    icon: Monitor,
    title: "Product Design",
    text: "Designed student documentation, session scheduling and specialist coordination experiences.",
    tile: "bg-[#EAFAF3]",
    color: "text-[#27B973]",
  },
  {
    icon: Box,
    title: "Design Systems",
    text: "Created reusable components and interface patterns for consistency and scalability.",
    tile: "bg-[#EBF0FD]",
    color: "text-[#0F6ED9]",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Worked closely with stakeholders and development teams from discovery to rollout.",
    tile: "bg-[#F2EEFD]",
    color: "text-[#7B3FE0]",
  },
  {
    icon: Rocket,
    title: "Product Delivery",
    text: "Contributed to the launch of the live platform and the ongoing Phase 2 rollout.",
    tile: "bg-[#FBE6F8]",
    color: "text-[#B4279E]",
  },
];

const STEPS = [
  { icon: Lightbulb, title: "Discover", text: "Understand users and workflows", active: false },
  { icon: Workflow, title: "Design", text: "Define flows and experiences", active: false },
  { icon: Monitor, title: "Build", text: "Collaborate with engineering", active: false },
  { icon: Rocket, title: "Launch", text: "Go live with the core platform", active: true },
  { icon: Layers, title: "Evolve", text: "Roll out Phase 2 with new capabilities", active: false },
];

export function RoleSection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="role-title"
      className="relative -mt-px isolate overflow-hidden px-6 py-16 sm:px-8 md:px-[120px] xl:p-0"
      style={{ backgroundColor: SECTION_BG, color: BODY }}
    >
      <div className="@container relative xl:aspect-[1670/941]">
        <motion.img
          src={PLATE}
          alt="A cat in glasses and headphones, thinking beside a laptop, a whiteboard of wireframes and four books labelled Research, User Flows, Design System and Prototyping"
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          style={fadeStyle(BOTTOM_FADE)}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:left-[4.3%] xl:top-[5.9%] xl:gap-[1.2cqw] xl:text-[clamp(12px,1.08cqw,18px)]"
          style={{ color: INK }}
          {...inView(reduce, 0)}
        >
          <span style={{ color: EYEBROW }}>04</span>
          <span>My Role</span>
        </motion.p>

        {/* The short rule under the eyebrow. Desktop only, as in the reference. */}
        <span
          aria-hidden
          className="mt-4 hidden h-[3px] w-12 rounded-full xl:absolute xl:left-[4.3%] xl:top-[9.9%] xl:mt-0 xl:block xl:w-[2.4%]"
          style={{ background: PURPLE }}
        />

        <h2
          id="role-title"
          className="mt-6 font-display text-[clamp(30px,8.4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em] xl:absolute xl:left-[4.3%] xl:top-[14.8%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(26px,3.27cqw,56px)] xl:leading-[1.27]"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            Building the product
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            from the{" "}
            <span className="relative inline-block" style={{ color: PURPLE }}>
              ground up.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.22em] left-[2%] h-[0.36em] w-[101%] overflow-visible"
              >
                <motion.path
                  d="M3 14 C 40 6, 90 2, 130 6 S 190 14, 210 8"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
              {/* Three short strokes fanning out from the full stop: the sparkle from the reference. */}
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                className="pointer-events-none absolute left-[calc(100%+0.3em)] top-[-0.12em] h-[1.02em] w-[0.77em] overflow-visible"
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
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[4.3%] xl:top-[31.7%] xl:mt-0 xl:whitespace-nowrap xl:text-[clamp(13px,1.39cqw,23px)] xl:leading-[1.44]"
          style={{ color: BODY }}
          {...inView(reduce, 0.25)}
        >
          As one of the founding designers, I helped shape{" "}
          <br className="hidden xl:inline" />
          Mother’s Grace from concept to a live platform —{" "}
          <br className="hidden xl:inline" />
          turning complex, on-ground workflows into a{" "}
          <br className="hidden xl:inline" />
          scalable and user-friendly product.
        </motion.p>

        {/* Below xl: the cat scene, with the panel and the timeline after it. On xl the art is the background. */}
        <motion.img
          src={PHONE}
          alt=""
          aria-hidden
          width={700}
          height={511}
          className="mt-8 block h-auto w-full xl:hidden"
          {...inView(reduce, 0.1)}
        />

        {/* The panel and its contents. Below xl they are normal flow in one block; on xl the wrapper has no box,
            so the panel background, header, and cards position against the art box. */}
        <div className="mt-8 rounded-[24px] bg-[#FBF7FE] p-5 shadow-[0_24px_60px_-34px_rgba(60,30,100,0.28)] md:p-8 xl:contents">
          <div
            aria-hidden
            className="hidden xl:absolute xl:left-[40.6%] xl:top-[10.6%] xl:block xl:h-[58.4%] xl:w-[57.2%] xl:rounded-[1.7cqw] xl:bg-[#FBF7FE] xl:shadow-[0_24px_60px_-34px_rgba(60,30,100,0.28)]"
          />

          <div className="flex items-center gap-4 xl:absolute xl:left-[42.4%] xl:top-[12.5%] xl:gap-[1.14cqw]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-[#EDDFFD] xl:h-[3.35cqw] xl:w-[3.35cqw] xl:rounded-[1cqw]">
              <Layers className="h-7 w-7 text-[#7F3EE3] xl:h-[1.7cqw] xl:w-[1.7cqw]" strokeWidth={1.75} aria-hidden />
            </span>
            <h3
              className="font-display text-[22px] font-bold leading-[1.2] xl:text-[clamp(18px,1.75cqw,31px)]"
              style={{ ...NORMAL_WIDTH, color: INK }}
            >
              My Contributions
            </h3>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:absolute xl:left-[41.4%] xl:top-[20.5%] xl:mt-0 xl:w-[55.4%] xl:gap-x-[1.26cqw] xl:gap-y-[0.78cqw]">
            {CONTRIBUTIONS.map(({ icon: Icon, title, text, tile, color }, i) => (
              <motion.li
                key={title}
                className="group flex items-center gap-4 rounded-[20px] bg-white/80 p-4 shadow-[0_8px_22px_-16px_rgba(60,30,100,0.28)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 xl:gap-[1.6cqw] xl:rounded-[1.45cqw] xl:p-[1.05cqw] xl:pr-[1.3cqw] xl:items-center"
                {...inView(reduce, 0.2 + i * 0.08)}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] transition-[rotate,scale] duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 ${tile} xl:h-[5cqw] xl:w-[5cqw] xl:rounded-[1.2cqw]`}
                >
                  <Icon className={`h-7 w-7 ${color} xl:h-[2.3cqw] xl:w-[2.3cqw]`} strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h4
                    className="font-display text-[19px] font-bold leading-[1.2] xl:leading-[1.15] xl:text-[clamp(14px,1.3cqw,22px)]"
                    style={{ ...NORMAL_WIDTH, color: CARD_INK }}
                  >
                    {title}
                  </h4>
                  <p
                    className="mt-1.5 text-[15px] leading-[1.45] xl:mt-[0.4cqw] xl:text-[clamp(13px,1.02cqw,18px)] xl:leading-[1.3]"
                    style={{ color: CARD_BODY }}
                  >
                    {text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* The timeline: a list below xl, five columns on the art box. The dashed line runs behind the circles. */}
        <ol className="relative mt-12 flex flex-col gap-6 before:absolute before:bottom-7 before:left-7 before:top-7 before:w-px before:border-l-2 before:border-dashed before:border-[#C5AFE2] before:content-[''] xl:absolute xl:left-[41.5%] xl:top-[72.3%] xl:mt-0 xl:w-[55.7%] xl:flex-row xl:justify-between xl:gap-0 xl:before:bottom-auto xl:before:left-[7.2cqw] xl:before:right-[3cqw] xl:before:top-[2.1cqw] xl:before:h-0 xl:before:w-auto xl:before:border-l-0 xl:before:border-t-2">
          {STEPS.map(({ icon: Icon, title, text, active }, i) => (
            <motion.li
              key={title}
              className="relative flex items-center gap-4 xl:w-[10.2cqw] xl:flex-col xl:items-center xl:gap-0 xl:text-center"
              {...inView(reduce, 0.3 + i * 0.1)}
            >
              <span
                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full xl:h-[4.2cqw] xl:w-[4.2cqw] ${
                  active ? "bg-[#8641FC] text-white" : "bg-[#EFE6FC] text-[#7E3DE0]"
                }`}
              >
                <Icon className="h-6 w-6 xl:h-[1.6cqw] xl:w-[1.6cqw]" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 xl:mt-[0.9cqw]">
                <h3
                  className="font-display text-[18px] font-bold leading-[1.2] xl:text-[clamp(14px,1.2cqw,22px)]"
                  style={{ ...NORMAL_WIDTH, color: INK }}
                >
                  {title}
                </h3>
                <p
                  className="mt-0.5 text-[15px] leading-[1.4] xl:mt-[0.3cqw] xl:text-[clamp(12.5px,0.98cqw,17px)] xl:leading-[1.35]"
                  style={{ color: CARD_BODY }}
                >
                  {text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
