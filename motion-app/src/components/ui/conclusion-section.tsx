import { motion } from "motion/react";
import { Sprout } from "lucide-react";
import type { WorkItem } from "@/App";
import { drawIn, inView, useCblReduce } from "@/components/ui/cbl-motion";

/* "Conclusion", from the reference. The art is the reference with its left-hand copy and pill removed
   (public/projects/cbl-cba/conclusion-plate.webp). The copy and the pill are live. On lg and up the art box keeps the
   reference's 3:2 ratio, so positions are percentages of that box. Below lg the copy stacks above the illustration. */

const PLATE = "/projects/cbl-cba/conclusion-plate.webp";
const ART = "/projects/cbl-cba/conclusion-art.webp";

const INK = "#2A0B4E";
const BODY = "#241C40";
const EYEBROW = "#6939B5";
const ORANGE = "#F98F17";
const NORMAL_WIDTH = { fontStretch: "100%" };

export function ConclusionSection({ p: _p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  return (
    <section
      aria-labelledby="conclusion-title"
      className="relative isolate overflow-hidden bg-[#F3EEFB] px-6 py-16 sm:px-8 lg:p-0"
      style={{ color: BODY }}
    >
      <div className="@container relative lg:aspect-[3/2]">
        <motion.img
          src={PLATE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="flex items-center gap-4 text-[14px] font-semibold uppercase tracking-[0.18em] lg:absolute lg:left-[120px] lg:top-[6.6%] lg:w-[35%]"
          style={{ color: EYEBROW }}
          {...inView(reduce, 0)}
        >
          <span>Conclusion</span>
          <span aria-hidden className="hidden h-px flex-1 bg-[#B9A7DC] lg:block" />
        </motion.p>

        <h2
          id="conclusion-title"
          className="mt-6 font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] lg:absolute lg:left-[120px] lg:top-[12.2%] lg:mt-0"
          style={{ ...NORMAL_WIDTH, color: INK }}
        >
          <motion.span className="block" {...inView(reduce, 0.1)}>
            Designing beyond
          </motion.span>
          <motion.span className="block" {...inView(reduce, 0.2)}>
            the{" "}
            <span className="relative inline-block">
              classroom.
              <svg
                aria-hidden
                viewBox="0 0 280 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.3em] left-[9%] hidden h-[0.22em] w-[86%] overflow-visible lg:block"
              >
                <motion.path
                  d="M3 12 C 50 4, 110 2, 160 6 S 240 14, 276 8"
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
          className="mt-8 text-[17px] leading-[1.6] md:text-[19px] lg:absolute lg:left-[120px] lg:top-[31.2%] lg:mt-0 lg:w-[38%] lg:leading-[1.55]"
          {...inView(reduce, 0.25)}
        >
          CBL-CBA creates a connected ecosystem where teachers can create, get feedback, improve, and share quality learning
          resources — not just complete a process.
        </motion.p>

        <motion.p
          className="mt-5 text-[17px] leading-[1.6] md:text-[19px] lg:absolute lg:left-[120px] lg:top-[45.8%] lg:mt-0 lg:w-[39%] lg:leading-[1.55]"
          {...inView(reduce, 0.35)}
        >
          The real impact comes after approval: the work becomes a shared resource that other teachers can discover, adapt, and use
          in their own classrooms.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-5 rounded-[22px] bg-white/70 px-6 py-5 shadow-[0_12px_30px_-18px_rgba(60,30,100,0.35)] lg:absolute lg:left-[120px] lg:top-[60.2%] lg:mt-0 lg:h-[9.7%] lg:w-[32.3%] lg:gap-[1.6cqw] lg:rounded-[1.4cqw] lg:px-[2cqw]"
          {...inView(reduce, 0.45)}
        >
          <Sprout aria-hidden className="h-7 w-7 shrink-0 text-[#6939B5] lg:h-[2.2cqw] lg:w-[2.2cqw]" strokeWidth={1.75} />
          <p className="text-[17px] font-bold leading-[1.35]" style={{ color: INK }}>
            <span className="block">One submission. Shared knowledge.</span>
            <span className="block">Better learning experiences.</span>
          </p>
        </motion.div>

        {/* Mobile only: the illustration, cut from the same art. */}
        <motion.img
          src={ART}
          alt="Teachers at their desks, with a shared resource library on screen and a published resource ready to use in class"
          className="mt-10 block h-auto w-full lg:hidden"
          {...inView(reduce, 0.1)}
        />
      </div>
    </section>
  );
}
