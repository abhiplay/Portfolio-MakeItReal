import { motion } from "motion/react";
import { BarChart3, FileText, Layers, LayoutGrid, Target, TrendingUp, User, Zap } from "lucide-react";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { SECTION_BG, fadeStyle } from "@/lib/section-fade";

/* AuroScholar's product-thinking section, rebuilt from its reference. The plate
   (public/projects/auroscholar-product-plate.webp) is the reference with its copy cleared: the
   icons, card frames, arrows, phones and leaves stay in it. Every word is live. On xl and up the
   plate keeps the reference's 1670:941 ratio, and each text block sits at its place in that box.
   Below xl the copy and the cards stack, the icons come from the icon set, and the phones are a
   crop of the plate. */

const PLATE = "/projects/auroscholar-product-plate.webp";
const PHONES = "/projects/auroscholar-product-phones.webp";

const INK = "#01001E";
const DESC = "#05011A";
const SUB = "#5A586F";
const HEADLINE_PURPLE = "#780DFF";
const EYEBROW = "#00000C";
const EYEBROW_RULE = "#6F2BDE";
const ORANGE = "#FCB409";
const ICON = "#6819E4";
const NUMBER = "#6320DB";
const CIRCLE = "#EBDCFC";

// The plate fades in at its top, so the lilac section above meets it without a seam, and out at its
// bottom, so the dusk band below reaches black without a cut. The top fade ends above the eyebrow.
const PLATE_FADE = "linear-gradient(to bottom, transparent 0%, #000 3%, #000 92%, transparent 100%)";

// Positions are in the reference's own units, 1670 across and 941 down. On xl the box keeps that
// ratio, so a unit is 1/1670 of the width and 1/941 of the height.
const x = (u: number) => `${(u / 1670) * 100}%`;
const y = (u: number) => `${(u / 941) * 100}%`;
// The top of a text block that puts its first baseline on `baseline`. The baseline sits
// leading/2 + 0.33em below the top of the line box (measured on the display face).
const top = (baseline: number, fontCqw: number, leading: number) => {
  const f = fontCqw * 16.7;
  return y(baseline - (leading * f) / 2 - 0.33 * f);
};

const LEFT = [
  { icon: User, title: "Role Selection", lines: ["Unclear entry point for", "different users."], base: 400 },
  { icon: FileText, title: "Student Onboarding", lines: ["Long, cluttered form with", "high cognitive load."], base: 535 },
  { icon: LayoutGrid, title: "Dashboard", lines: ["Important learning activities", "lacked hierarchy."], base: 669 },
  { icon: BarChart3, title: "Assessment Report", lines: ["Scores were hard to interpret", "and not actionable."], base: 798 },
];

const MIDDLE = [
  { icon: Target, title: "Guided experience", lines: ["Make it easy for users to get", "started with the right role."], base: 394, bg: "#E6F2F9", iconColor: "#0C94F4" },
  { icon: Zap, title: "Simpler onboarding", lines: ["Break registration into clear,", "manageable steps."], base: 528, bg: "#FDF6E8", iconColor: "#F6B01B" },
  { icon: Layers, title: "Focused dashboard", lines: ["Prioritise core learning activities", "(Learn, Practice, Assess, Progress)."], base: 660, bg: "#EDFAE9", iconColor: "#1EB62E" },
  { icon: TrendingUp, title: "Meaningful progress", lines: ["Show competency-wise results", "with clear strengths and improvements."], base: 792, bg: "#F7F0FC", iconColor: "#6819E4" },
];

const DECISIONS = [
  { n: "01", title: "Simplified Onboarding", lines: ["Broke a long form into a guided, step-", "by-step flow to reduce cognitive load", "and increase completion."], circle: 391, titleBase: 399, descBase: 434 },
  { n: "02", title: "Reorganised Dashboard", lines: ["Structured the experience around", "key actions — Learn, Practice, Assess", "and Progress — to make the next step clear."], circle: 563, titleBase: 571, descBase: 603 },
  { n: "03", title: "Meaningful Performance", lines: ["Introduced competency-wise results", "to highlight strengths and areas", "for improvement."], circle: 743, titleBase: 751, descBase: 784 },
];

export function ProductThinkingSection() {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="product-title"
      className="relative isolate overflow-hidden px-6 pb-16 pt-24 sm:px-8 md:px-[120px] xl:px-0 xl:pb-0 xl:pt-0"
      style={{ backgroundColor: SECTION_BG, color: DESC }}
    >
      <div className="@container relative xl:aspect-[1670/941]">
        <motion.img
          src={PLATE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          style={fadeStyle(PLATE_FADE)}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:whitespace-nowrap xl:gap-0 xl:text-[0.8cqw] xl:leading-none"
          style={{ color: EYEBROW, left: x(126), top: top(57, 0.8, 1) }}
          {...inView(reduce, 0)}
        >
          <span
            aria-hidden
            className="mr-3 hidden h-[2px] w-9 rounded-full xl:absolute xl:-left-[3.2cqw] xl:top-[0.33em] xl:block xl:h-[0.18cqw] xl:w-[2.2cqw]"
            style={{ background: EYEBROW_RULE }}
          />
          <span>03 / Product Thinking</span>
        </motion.p>

        <h2
          id="product-title"
          className="mt-8 font-display text-[clamp(30px,8.4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] xl:absolute xl:mt-0 xl:w-[46%] xl:text-[3.1cqw] xl:leading-[1.02] xl:tracking-[-0.03em]"
          style={{ color: INK, fontStretch: "100%", left: x(72), top: top(137, 3.1, 1.02) }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            From user problems to
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            meaningful{" "}
            <span className="relative inline-block" style={{ color: HEADLINE_PURPLE }}>
              product decisions.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[1.03em] top-[1.5em] h-[0.2em] w-[6.24em] overflow-visible"
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
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[calc(100%-0.58em)] top-[-0.26em] h-[0.88em] w-[0.84em] overflow-visible"
              >
                <motion.path d="M2 23 L12 2" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 0.9, 0.5)} />
                <motion.path d="M14.5 32 L33.3 18" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.0, 0.5)} />
                <motion.path d="M21 43 L41 41.7" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.1, 0.5)} />
              </svg>
            </span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.36]"
          style={{ color: DESC, left: x(874), top: top(111, 1.08, 1.36) }}
          {...inView(reduce, 0.3)}
        >
          I didn’t just redesign the interface, I looked at the experience through
          <br className="hidden xl:inline" /> a product lens — understanding what was getting in the way of learning,
          <br className="hidden xl:inline" /> identifying opportunities, and making design decisions that create a
          <br className="hidden xl:inline" /> clearer, more engaging and measurable learning journey.
        </motion.p>

        {/* The first column: on xl the cards are in the plate and the copy sits on them. */}
        <div className="mt-16 xl:contents">
          <h3
            className="font-display text-[26px] font-bold leading-tight xl:absolute xl:whitespace-nowrap xl:text-[1.66cqw] xl:leading-[1.1]"
            style={{ color: INK, fontStretch: "100%", left: x(71), top: top(294, 1.66, 1.1) }}
          >
            What wasn’t working?
          </h3>
          <p
            className="mt-2 text-[16px] leading-snug xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.3]"
            style={{ color: SUB, left: x(72), top: top(323, 1.08, 1.3) }}
          >
            Key friction in the existing experience.
          </p>
          <ul className="mt-6 flex flex-col gap-4 xl:contents">
            {LEFT.map(({ icon: Icon, title, lines, base }) => (
              <li
                key={title}
                className="flex items-start gap-4 rounded-[24px] border border-white/70 bg-[#F5EFFE] p-5 xl:contents"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white xl:hidden">
                  <Icon className="h-5 w-5" style={{ color: ICON }} strokeWidth={1.6} aria-hidden />
                </span>
                <div className="xl:contents">
                  <h4
                    className="text-[18px] font-bold leading-snug xl:absolute xl:whitespace-nowrap xl:text-[1.2cqw] xl:leading-[1.2]"
                    style={{ color: INK, left: x(161), top: top(base, 1.2, 1.2) }}
                  >
                    {title}
                  </h4>
                  <p
                    className="mt-1 text-[15px] leading-relaxed xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.33]"
                    style={{ color: DESC, left: x(161), top: top(base + 28, 1.08, 1.33) }}
                  >
                    {lines[0]}
                    <br className="hidden xl:inline" /> {lines[1]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* The second column. */}
        <div className="mt-16 xl:contents">
          <h3
            className="font-display text-[26px] font-bold leading-tight xl:absolute xl:whitespace-nowrap xl:text-[1.66cqw] xl:leading-[1.1]"
            style={{ color: INK, fontStretch: "100%", left: x(491), top: top(294, 1.66, 1.1) }}
          >
            The Opportunity
          </h3>
          <p
            className="mt-2 text-[16px] leading-snug xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.3]"
            style={{ color: SUB, left: x(489), top: top(323, 1.08, 1.3) }}
          >
            Turned friction points into focused opportunities.
          </p>
          <ul className="mt-6 flex flex-col gap-4 xl:contents">
            {MIDDLE.map(({ icon: Icon, title, lines, base, bg, iconColor }) => (
              <li key={title} className="flex items-start gap-4 rounded-[24px] p-5 xl:contents" style={{ backgroundColor: bg }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white xl:hidden">
                  <Icon className="h-5 w-5" style={{ color: iconColor }} strokeWidth={1.6} aria-hidden />
                </span>
                <div className="xl:contents">
                  <h4
                    className="text-[18px] font-bold leading-snug xl:absolute xl:whitespace-nowrap xl:text-[1.2cqw] xl:leading-[1.2]"
                    style={{ color: INK, left: x(574), top: top(base, 1.2, 1.2) }}
                  >
                    {title}
                  </h4>
                  <p
                    className="mt-1 text-[15px] leading-relaxed xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.33]"
                    style={{ color: DESC, left: x(575), top: top(base + 27, 1.08, 1.33) }}
                  >
                    {lines[0]}
                    <br className="hidden xl:inline" /> {lines[1]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* The third column: the phones are in the plate on xl. Below xl they are a crop of it. */}
        <div className="mt-16 xl:contents">
          <h3
            className="font-display text-[26px] font-bold leading-tight xl:absolute xl:whitespace-nowrap xl:text-[1.66cqw] xl:leading-[1.1]"
            style={{ color: INK, fontStretch: "100%", left: x(945), top: top(289, 1.66, 1.1) }}
          >
            Key Design Decisions
          </h3>
          <p
            className="mt-2 text-[16px] leading-snug xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[1.08cqw] xl:leading-[1.3]"
            style={{ color: SUB, left: x(943), top: top(316, 1.08, 1.3) }}
          >
            Three high-impact decisions that shaped the redesign.
          </p>
          <img src={PHONES} alt="" aria-hidden width={382} height={524} className="mt-6 block h-auto w-full xl:hidden" />
          <ul className="mt-6 flex flex-col gap-4 xl:contents">
            {DECISIONS.map((d) => (
              <li
                key={d.n}
                className="flex items-start gap-4 rounded-[24px] border border-[#E4D8F5] bg-white/60 p-5 xl:contents"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-bold xl:absolute xl:h-[2.75cqw] xl:w-[2.75cqw] xl:text-[1.0cqw]"
                  style={{ background: CIRCLE, color: NUMBER, left: x(1329), top: y(d.circle - 23) }}
                >
                  {d.n}
                </span>
                <div className="xl:contents">
                  <h4
                    className="text-[18px] font-bold leading-snug xl:absolute xl:whitespace-nowrap xl:text-[1.1cqw] xl:leading-[1.2]"
                    style={{ color: INK, left: x(1390), top: top(d.titleBase, 1.1, 1.2) }}
                  >
                    {d.title}
                  </h4>
                  <p
                    className="mt-1 text-[15px] leading-relaxed xl:absolute xl:mt-0 xl:whitespace-nowrap xl:text-[0.92cqw] xl:leading-[1.52]"
                    style={{ color: DESC, left: x(1331), top: top(d.descBase, 0.92, 1.52) }}
                  >
                    {d.lines.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br className="hidden xl:inline" />}
                        {i > 0 && " "}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* The plate's dusk band takes it down to the black chapter below, on xl. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-b from-transparent to-black xl:block xl:h-[4.8cqw]" />
      </div>

      {/* Below xl the section ends on its bottom padding: this band takes it down to black. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black xl:hidden" />
    </section>
  );
}
