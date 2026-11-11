import { motion } from "motion/react";
import { BarChart3, LayoutGrid, Palette, Target, UserPlus } from "lucide-react";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";
import { BOTTOM_FADE, SECTION_BG, TOP_BOTTOM_FADE, fadeStyle } from "@/lib/section-fade";

/* AuroScholar's redesign section, rebuilt from its reference. The plate
   (public/projects/auroscholar-redesign-plate.webp) is the reference with its copy, underline,
   sparkle, pill labels and card text cleared: the phones, books, arrow, leaves, the card frame
   and its icons stay in it. Every word is live. On xl and up the plate keeps the reference's
   1672:941 ratio, and the copy sits on percentages of it. Below xl the copy stacks, the phones
   are a crop of the plate, and the improvements list uses icons from the icon set. */

const PLATE = "/projects/auroscholar-redesign-plate.webp";
const PHONES = "/projects/auroscholar-redesign-phones.webp";

const INK = "#02001F";
const DESC = "#050014";
const HEADLINE_PURPLE = "#7311FE";
const EYEBROW_RULE = "#5A10C1";
const ORANGE = "#FCB306";
const BEFORE_PILL = "#D0C7E1";
const AFTER_PILL = "#791CFD";
const ICON = "#621ECC";

const IMPROVEMENTS = [
  { icon: Palette, title: "Visual Design", lines: ["Modernised visual language", "with a cleaner, friendlier look."] },
  { icon: LayoutGrid, title: "Navigation", lines: ["Simplified access to key", "learning features."] },
  { icon: UserPlus, title: "Onboarding", lines: ["More intuitive and guided", "registration experience."] },
  { icon: BarChart3, title: "Dashboard", lines: ["Better content hierarchy and", "progress visibility."] },
  { icon: Target, title: "Assessment", lines: ["Clearer, competency-wise", "performance and feedback."] },
];

export function RedesignSection() {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="redesign-title"
      className="relative isolate overflow-hidden px-6 pb-16 pt-24 sm:px-8 md:px-[120px] xl:p-0"
      style={{ backgroundColor: SECTION_BG, color: DESC }}
    >
      <div className="@container relative xl:aspect-[1672/941]">
        <motion.img
          src={PLATE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover xl:block"
          style={fadeStyle(TOP_BOTTOM_FADE)}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] xl:absolute xl:left-[7.42%] xl:top-[5.0%] xl:gap-0 xl:text-[0.84cqw] xl:leading-none"
          style={{ color: "#000010" }}
          {...inView(reduce, 0)}
        >
          <span
            aria-hidden
            className="mr-3 hidden h-[2px] w-9 rounded-full xl:absolute xl:-left-[3.3cqw] xl:top-[0.35em] xl:block xl:h-[0.18cqw] xl:w-[2.4cqw]"
            style={{ background: EYEBROW_RULE }}
          />
          <span>02 / The Redesign</span>
        </motion.p>

        <h2
          id="redesign-title"
          className="mt-8 font-display text-[clamp(30px,8.4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] xl:absolute xl:left-[4.07%] xl:top-[11.07%] xl:mt-0 xl:w-[42%] xl:text-[3.05cqw] xl:leading-[1.1] xl:tracking-[-0.02em]"
          style={{ color: INK, fontStretch: "100%" }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            Rethinking the way students
          </motion.span>
          <motion.span className="block" style={{ color: HEADLINE_PURPLE }} {...inView(reduce, 0.2)}>
            experience{" "}
            <span className="relative inline-block">
              learning.
              <svg
                aria-hidden
                viewBox="0 0 214 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-0 top-[0.98em] h-[0.2em] w-[95%] overflow-visible"
              >
                <motion.path
                  d="M3 11 C 70 10, 140 10, 211 11"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...drawIn(reduce, 0.7)}
                />
              </svg>
              <svg
                aria-hidden
                viewBox="0 0 44 46"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[4.2em] top-[0.05em] h-[0.95em] w-[0.86em] overflow-visible"
              >
                <motion.path d="M2 23 L12 2" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 0.9, 0.5)} />
                <motion.path d="M14.5 32 L33.3 18" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.0, 0.5)} />
                <motion.path d="M21 43 L41 41.7" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" {...drawIn(reduce, 1.1, 0.5)} />
              </svg>
            </span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-7 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[50.0%] xl:top-[10.66%] xl:mt-0 xl:whitespace-nowrap xl:text-[1.17cqw] xl:leading-[1.25]"
          style={{ color: DESC }}
          {...inView(reduce, 0.3)}
        >
          AuroScholar already had the foundation of a digital learning platform.
          <br className="hidden xl:inline" /> The opportunity was to rethink how students interact with it.
        </motion.p>
        <motion.p
          className="mt-4 text-[17px] leading-[1.6] md:text-[19px] xl:absolute xl:left-[50.0%] xl:top-[17.4%] xl:mt-0 xl:whitespace-nowrap xl:text-[1.17cqw] xl:leading-[1.25]"
          style={{ color: DESC }}
          {...inView(reduce, 0.35)}
        >
          I focused on modernising the interface, simplifying navigation, improving
          <br className="hidden xl:inline" /> visual hierarchy and making important learning information easier to understand.
        </motion.p>

        {/* The pill labels: on xl each pill and its label sit on the plate's pills; below xl each pair is a row. */}
        <div className="mt-8 flex flex-col gap-4 xl:contents">
          <div className="flex items-center gap-4 xl:contents">
            <span
              className="inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[15px] font-semibold xl:absolute xl:left-[6.64%] xl:top-[29.54%] xl:h-[4.46%] xl:w-[7.36%] xl:px-0 xl:py-0 xl:text-[1.3cqw]"
              style={{ background: BEFORE_PILL, color: INK }}
            >
              Before
            </span>
            <span className="text-[17px] font-semibold xl:absolute xl:left-[14.9%] xl:top-[29.54%] xl:flex xl:h-[4.46%] xl:items-center xl:whitespace-nowrap xl:text-[1.4cqw]" style={{ color: INK }}>
              Existing Experience
            </span>
          </div>
          <div className="flex items-center gap-4 xl:contents">
            <span
              className="inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[15px] font-semibold xl:absolute xl:left-[41.69%] xl:top-[29.54%] xl:h-[4.5%] xl:w-[6.64%] xl:px-0 xl:py-0 xl:text-[1.3cqw]"
              style={{ background: AFTER_PILL, color: "#FFFFFF" }}
            >
              After
            </span>
            <span className="text-[17px] font-semibold xl:absolute xl:left-[49.34%] xl:top-[29.54%] xl:flex xl:h-[4.5%] xl:items-center xl:whitespace-nowrap xl:text-[1.4cqw]" style={{ color: INK }}>
              Redesigned Experience
            </span>
          </div>
        </div>

        {/* Below xl the phones are a crop of the plate. On xl the plate is the background. */}
        <motion.img
          src={PHONES}
          alt=""
          aria-hidden
          width={1236}
          height={625}
          className="mt-10 block h-auto w-full xl:hidden"
          style={fadeStyle(BOTTOM_FADE)}
          {...inView(reduce, 0.2)}
        />

        {/* The improvements card: on xl its frame is in the plate and the copy sits on top of it. */}
        <div className="mt-12 rounded-[24px] border border-[#E4D8F5] bg-white/60 p-6 xl:contents">
          <h3
            className="text-[22px] font-bold leading-tight xl:absolute xl:left-[76.4%] xl:top-[31.6%] xl:whitespace-nowrap xl:text-[1.52cqw] xl:leading-[1.1]"
            style={{ color: INK }}
          >
            Key Improvements
          </h3>
          <ul className="mt-6 flex flex-col gap-6 xl:absolute xl:left-[82.6%] xl:top-[36.45%] xl:mt-0 xl:gap-0">
            {IMPROVEMENTS.map(({ icon: Icon, title, lines }, i) => (
              <motion.li
                key={title}
                className="flex items-start gap-4 xl:block xl:h-[5.77cqw] xl:pt-[1.47cqw]"
                {...inView(reduce, 0.3 + i * 0.08)}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F2FF] xl:hidden">
                  <Icon className="h-5 w-5" style={{ color: ICON }} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <h4 className="text-[18px] font-bold leading-snug xl:text-[1.0cqw] xl:leading-[1.2]" style={{ color: INK }}>
                    {title}
                  </h4>
                  <p className="mt-1 text-[15px] leading-relaxed xl:mt-[0.2cqw] xl:whitespace-nowrap xl:text-[0.84cqw] xl:leading-[1.3]">
                    {lines[0]}
                    <br className="hidden xl:inline" /> {lines[1]}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* On xl the plate's lilac takes a dusk band down to the black chapter below. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-b from-transparent to-black xl:block xl:h-[9cqw]" />
      </div>

      {/* Below xl the section ends on its bottom padding: this band takes the lilac down to the black chapter below. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black xl:hidden" />
    </section>
  );
}
