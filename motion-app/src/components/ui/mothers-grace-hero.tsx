import { HeartPulse, Users } from "lucide-react";
import type { WorkItem } from "@/App";
import { COPY_NAME, COVER_NAME, isMorphDestination } from "@/lib/project-morph";
import { slugOf } from "@/lib/slug";
import { BOTTOM_FADE, fadeStyle } from "@/lib/section-fade";

const MARK = "/projects/mothers-grace-mark.png";
const INK = "#17102E";
const PURPLE = "#6E3BE0";
const ORANGE = "#F98F17";
const BODY = "#231D36";

/* Mother's Grace hero: the artwork with its own text removed, and the text rebuilt live over it.
   The plate (p.img) carries the laptop, the case files and the room; the logo, headline,
   paragraph and chips are real text. On lg and up the plate fills a 16:9 box and the text sits
   on its left, at the same positions as the original artwork. The chips are opaque, so they also
   cover the faint shapes the original chips left on the plate. On phones the text and chips
   stack above the plate. The plate is the morph target from the card. */
export function MothersGraceHero({ p }: { p: WorkItem }) {
  const destination = isMorphDestination(slugOf(p.title));
  const coverStyle = destination ? { viewTransitionName: COVER_NAME } : undefined;
  const copyStyle = destination ? { viewTransitionName: COPY_NAME } : undefined;
  const chipStyle = (name: string) => (destination ? { viewTransitionName: name } : undefined);
  return (
    <section
      data-header-tone="light"
      className="@container relative w-full overflow-hidden bg-[#F6EEFB] lg:aspect-[1671/941]"
    >
      <h1 className="sr-only">{p.title}</h1>

      <div
        data-hero-copy=""
        style={copyStyle}
        className="relative z-10 flex flex-col items-start px-6 pt-24 pb-6 sm:px-8 md:px-[120px] lg:absolute lg:left-[4.2%] lg:top-[6.6cqw] lg:w-[40%] lg:p-0"
      >
        <div className="hero-rise hero-rise-1 flex items-center gap-2 lg:gap-[1cqw]">
          <img src={MARK} alt="" aria-hidden className="h-9 w-auto lg:h-[3.2cqw]" />
          <span
            className="font-display text-[18px] font-bold tracking-tight lg:text-[clamp(16px,1.6cqw,22px)]"
            style={{ color: INK }}
          >
            Mother&apos;s Grace
          </span>
        </div>

        <span aria-hidden className="mt-4 block h-[3px] w-12 rounded-full lg:mt-[1.2cqw] lg:w-[3cqw]" style={{ background: PURPLE }} />

        <h2
          className="hero-rise hero-rise-2 mt-5 font-display text-[clamp(30px,8vw,46px)] font-bold leading-[1.04] tracking-[-0.02em] lg:mt-[2.2cqw] lg:text-[clamp(28px,3.6cqw,50px)]"
          style={{ color: INK, fontStretch: "100%" }}
        >
          From paper records
          <br />
          to{" "}
          <span className="relative inline-block" style={{ color: PURPLE }}>
            connected care.
            <svg
              aria-hidden
              viewBox="0 0 240 24"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-[0.28em] left-[6%] h-[0.3em] w-[88%] overflow-visible"
            >
              <path
                d="M2 15 C 60 4, 120 2, 160 6 S 220 16, 238 10"
                fill="none"
                stroke={ORANGE}
                strokeWidth={4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
        </h2>

        <p
          className="hero-rise hero-rise-3 mt-6 max-w-[34ch] text-[17px] leading-[1.6] lg:mt-[1.8cqw] lg:max-w-[34cqw] lg:text-[clamp(13px,1.2cqw,17px)] lg:leading-[1.55]"
          style={{ color: BODY }}
        >
          A digital care-management platform that helps therapists and special educators document progress, coordinate
          sessions and manage each child&apos;s care journey.
        </p>
      </div>

      {/* Chips: in flow on phones; on lg they sit exactly over the chips in the original artwork. */}
      <div className="relative z-10 flex flex-wrap gap-3 px-6 pt-6 sm:px-8 md:px-[120px] lg:contents">
        <span
          style={chipStyle("hero-chip-a")}
          className="hero-rise hero-rise-4 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#4B2A7A] shadow-[0_8px_22px_-12px_rgba(60,30,100,0.35)] lg:absolute lg:left-[4.2%] lg:top-[52.6%] lg:z-10 lg:h-[5.6%] lg:w-[12.6%] lg:justify-center lg:gap-[0.6cqw] lg:px-[0.6cqw] lg:text-[clamp(10px,0.98cqw,13px)]"
        >
          <Users className="h-4 w-4 text-[#6B3FD8] lg:h-[1.3cqw] lg:w-[1.3cqw]" strokeWidth={1.75} aria-hidden />
          Special Education
        </span>
        <span
          style={chipStyle("hero-chip-b")}
          className="hero-rise hero-rise-4 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#4B2A7A] shadow-[0_8px_22px_-12px_rgba(60,30,100,0.35)] lg:absolute lg:left-[17.9%] lg:top-[52.6%] lg:z-10 lg:h-[5.6%] lg:w-[13.4%] lg:justify-center lg:gap-[0.6cqw] lg:px-[0.6cqw] lg:text-[clamp(10px,0.98cqw,13px)]"
        >
          <HeartPulse className="h-4 w-4 text-[#6B3FD8] lg:h-[1.3cqw] lg:w-[1.3cqw]" strokeWidth={1.75} aria-hidden />
          Care Management
        </span>
      </div>

      <img
        src={p.img}
        alt="A laptop showing the Mother's Grace dashboard beside paper case files"
        data-project-cover=""
        style={{ ...coverStyle, ...fadeStyle(BOTTOM_FADE) }}
        className="hero-cover relative block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
      />
    </section>
  );
}
