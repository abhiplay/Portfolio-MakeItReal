import { motion } from "motion/react";
import { Laptop, Layers, Pencil, User, Users } from "lucide-react";
import type { WorkItem } from "@/App";
import { CBL_MOTION_CSS, EASE_OUT, drawOnLoad, inView, onLoad, popIn, useCblReduce } from "@/components/ui/cbl-motion";
import { COVER_NAME, isMorphDestination } from "@/lib/project-morph";
import { slugOf } from "@/lib/slug";

/* CBL CBA case-study hero, rebuilt from the reference. The art is the reference with its text, chips,
   callouts and connectors removed (public/projects/cbl-cba/hero-plate.webp). Everything on top is live:
   copy, chips, callouts, connectors and anchor dots. On lg and up the art box keeps the reference's 3:2 ratio,
   so every position below is a percentage of that box. Below lg the copy stacks above the devices. */

const PLATE = "/projects/cbl-cba/hero-plate.webp";
const DEVICES = "/projects/cbl-cba/hero-devices.webp";
const LOTUS = "/projects/cbl-cba/hero-lotus.png";

const INK = "#270A48";
const BODY = "#231D36";
const PURPLE = "#401F6B";
const ORANGE = "#F98F17";
const ACCENT = "#FF5400";
const VIOLET = "#7C5CF6";
const NORMAL_WIDTH = { fontStretch: "100%" };

const CHIPS = [
  { icon: User, label: "My Role", value: "Product Designer" },
  { icon: Layers, label: "Domain", value: "EdTech" },
  { icon: Laptop, label: "Platform", value: "Web Application" },
];

// Callout cards, connector curves and anchor dots, in % of the 3:2 art box. Each dot sits on its tablet's top edge.
const CALLOUTS = [
  {
    icon: Users,
    title: "Reviewer",
    text: "Review, provide feedback and approve.",
    color: VIOLET,
    tile: "#EEEAFD",
    pos: "lg:left-[31.7%] lg:bottom-[calc(83.69%+16px)] lg:w-[17.1%]",
    dot: { x: 50.46, y: 16.31 },
    path: "M748 104 C 764 110, 776 128, 775 160",
  },
  {
    icon: Pencil,
    title: "Teacher",
    text: "Create learning activities and submit for review.",
    color: ACCENT,
    tile: "#FFE9DA",
    pos: "lg:left-[80%] lg:bottom-[calc(84.67%+16px)] lg:w-[17.1%]",
    dot: { x: 78.32, y: 15.33 },
    path: "M1232 110 C 1222 118, 1210 134, 1203 150",
  },
];

export function CblHero({ p }: { p: WorkItem }) {
  const reduce = useCblReduce();
  // The art is the morph target on the page a card morph is taking the reader to.
  const destination = isMorphDestination(slugOf(p.title));
  return (
    <section
      data-header-tone="light"
      aria-labelledby="cbl-hero-title"
      className="relative isolate overflow-hidden bg-[#FAF4FD] px-6 pb-16 pt-28 sm:px-8 lg:px-0 lg:pb-[5.4%] lg:pt-[88px]"
      style={{ color: INK }}
    >
      <style>{CBL_MOTION_CSS}</style>

      <div className="@container relative lg:aspect-[15/8]">
        <div className="flex flex-col items-start gap-6 lg:absolute lg:left-[120px] lg:top-[11.5%] lg:w-[40%] lg:gap-0">
          <motion.p
            className="flex items-center gap-2.5 text-[15px] font-bold lg:mb-[1.5cqw] lg:gap-[0.8cqw] lg:text-[clamp(14px,1.17cqw,18px)]"
            style={{ color: PURPLE }}
            {...onLoad(reduce, 0.1, 12)}
          >
            <img src={LOTUS} alt="" aria-hidden className="h-6 w-auto lg:h-[1.7cqw]" />
            Sri Aurobindo Society
          </motion.p>

          <motion.p
            className="inline-flex items-center rounded-full bg-[#EEE7F8] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#4B2A7A] lg:mb-[1.5cqw] lg:px-[1.2cqw] lg:py-[0.75cqw] lg:text-[clamp(12px,1.04cqw,15px)]"
            {...onLoad(reduce, 0.2, 12)}
          >
            Case study / Education
          </motion.p>

          <h1
            id="cbl-hero-title"
            className="font-display text-[clamp(28px,8.2vw,40px)] font-bold leading-[0.98] tracking-[-0.02em] lg:mb-[2.9cqw] lg:text-[clamp(34px,3.6cqw,66px)]"
            style={NORMAL_WIDTH}
          >
            <motion.span className="block" {...onLoad(reduce, 0.3)}>
              Making assessment a
            </motion.span>
            <motion.span className="block" {...onLoad(reduce, 0.42)}>
              collaborative learning
            </motion.span>
            <motion.span className="block" {...onLoad(reduce, 0.54)}>
              <span className="relative inline-block">
                experience.
                <svg
                  aria-hidden
                  viewBox="0 0 240 24"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-[0.3em] left-[8%] h-[0.32em] w-[86%] overflow-visible"
                >
                  <motion.path
                    d="M2 15 C 60 4, 120 2, 160 6 S 220 16, 238 10"
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    {...drawOnLoad(reduce, 1.0)}
                  />
                </svg>
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="text-[17px] leading-[1.6] md:text-[19px] lg:mb-[2.5cqw] lg:max-w-[29.5cqw] lg:leading-[1.55]"
            style={{ color: BODY }}
            {...onLoad(reduce, 0.6)}
          >
            A digital platform designed to help teachers create competency-based learning activities, share their work,
            receive feedback, and improve classroom assessment through a structured review process.
          </motion.p>

          <ul className="flex flex-wrap gap-3 lg:-ml-[0.7cqw] lg:flex-nowrap lg:gap-[0.8cqw]">
            {CHIPS.map(({ icon: Icon, label, value }, i) => (
              <motion.li
                key={label}
                className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-3 shadow-[0_8px_22px_-12px_rgba(60,30,100,0.35)] transition-[translate] duration-300 motion-safe:hover:-translate-y-1 lg:gap-[0.9cqw] lg:rounded-[1.2cqw] lg:px-[1.1cqw] lg:py-[0.95cqw]"
                {...onLoad(reduce, 0.75 + i * 0.1, 16)}
              >
                <Icon className="h-5 w-5 shrink-0 text-[#6B3FD8] lg:h-[1.45cqw] lg:w-[1.45cqw]" strokeWidth={1.75} aria-hidden />
                <span className="text-[13px] leading-tight lg:text-[clamp(12px,1.04cqw,16px)]">
                  <span className="block font-semibold" style={{ color: INK }}>
                    {label}
                  </span>
                  <span className="block text-[#6B6780]">{value}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile only: the devices, cut from the same art. */}
        <motion.img
          src={DEVICES}
          alt="The CBL CBA dashboard on a laptop, with the Review and Task Submission screens on two tablets"
          data-project-cover=""
          style={destination ? { viewTransitionName: COVER_NAME } : undefined}
          className="mt-10 block h-auto w-full lg:hidden"
          {...inView(reduce, 0.1)}
        />

        {/* The art box: the plate, callouts, connectors and dots are positioned inside it, so they move together.
            On lg and up it sits to the right at 80% width, which keeps the headline clear of the tablets and laptop. */}
        <div className="lg:absolute lg:left-[20%] lg:top-[10%] lg:aspect-[3/2] lg:w-[80%]">
          <motion.img
            src={PLATE}
            alt=""
            aria-hidden
            data-project-cover=""
            className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
            style={{
              // Fades the bottom and the left edge, so the plate's plant and book dissolve instead of ending in a hard line.
              maskImage:
                "linear-gradient(to bottom, #000 93%, transparent 100%), linear-gradient(to right, transparent 22%, #000 38%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
              ...(destination ? { viewTransitionName: COVER_NAME } : {}),
            }}
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE_OUT }}
          />

        <svg
          aria-hidden
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          {CALLOUTS.map((c, i) => (
            <motion.path
              key={c.title}
              d={c.path}
              fill="none"
              stroke={c.color}
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              {...drawOnLoad(reduce, 1.3 + i * 0.15, 0.9)}
            />
          ))}
        </svg>

        {CALLOUTS.map((c, i) => (
          <motion.span
            key={`${c.title}-dot`}
            aria-hidden
            className="absolute hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
            style={{ left: `${c.dot.x}%`, top: `${c.dot.y}%`, background: c.color }}
            {...popIn(reduce, 1.2 + i * 0.15)}
          >
            <span className="cbl-halo absolute inset-0 rounded-full" style={{ background: c.color }} />
          </motion.span>
        ))}

        {CALLOUTS.map(({ icon: Icon, title, text, color, tile, pos }, i) => (
          <motion.div
            key={title}
            className={`mt-4 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 rounded-[20px] bg-white p-4 shadow-[0_18px_40px_-18px_rgba(60,30,100,0.35)] transition-[translate] duration-500 motion-safe:hover:-translate-y-1 lg:absolute lg:mt-0 lg:gap-x-[0.9cqw] lg:gap-y-[0.8cqw] lg:rounded-[1.3cqw] lg:p-[1.1cqw] ${pos}`}
            {...inView(reduce, 0.95 + i * 0.15)}
          >
            {/* The icon and title share a row; the description runs under both. The card grows with its text. */}
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] lg:h-[2.6cqw] lg:w-[2.6cqw] lg:rounded-[1cqw]"
              style={{ background: tile }}
            >
              <Icon className="h-5 w-5 lg:h-[1.4cqw] lg:w-[1.4cqw]" style={{ color }} aria-hidden />
            </span>
            <span className="block text-[15px] font-semibold lg:text-[clamp(13px,1.1cqw,17px)]" style={{ color: INK }}>
              {title}
            </span>
            <span className="col-start-2 block text-[14px] leading-snug text-[#4A4360] lg:col-span-2 lg:col-start-1 lg:text-[clamp(12px,0.98cqw,15px)]">
              {text}
            </span>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}
