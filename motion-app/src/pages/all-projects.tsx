import type { MouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import { WORK } from "@/App";
import { CoverPlaceholder } from "@/pages/project-detail";
import { openWithMorph } from "@/lib/project-morph";
import { slugOf } from "@/lib/slug";
import type { WorkItem } from "@/App";

/* ---------------- /allprojects ----------------
   Full project archive. The hero follows the work-page layout: a two-line
   headline offset left and right, tilted pills, an artwork slot on the left and
   the intro on the right. Then three tiers of project cards (featured case
   studies, selected product work, visual playground) and a closing call to
   action. Same black background as the rest of the site. */

const ACCENT = "#FF5400";

const TIERS: { key: WorkItem["tier"]; label: string; heading: string }[] = [
  { key: "featured", label: "Featured case studies", heading: "Case studies" },
  { key: "selected", label: "Selected product work", heading: "Product work" },
  { key: "playground", label: "Visual playground", heading: "Playground" },
];

/* One card structure for every project. The description is the card outcome
   when one is evidenced, otherwise the summary, otherwise the short line. */
// Every card opens its project through the shared morph; the cover box is what travels.
const WorkCard = ({
  project: p,
  onOpen,
}: {
  project: WorkItem;
  onOpen: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) => (
  <Link to={`/work/${slugOf(p.title)}`} onClick={(e) => onOpen(e, slugOf(p.title))} className="group block">
    <div data-project-cover="" className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-neutral-900">
      {p.img ? (
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105${p.title === "Metadrob" ? " object-[70%_50%]" : ""}`}
        />
      ) : (
        <CoverPlaceholder title={p.title} />
      )}
    </div>
    <div className="mt-5 flex items-center justify-between text-[14px] uppercase tracking-[0.18em] text-neutral-500">
      <span>{p.tag}</span>
      {p.year && <span>{p.year}</span>}
    </div>
    <h3 className="mt-2 text-[24px] font-bold uppercase leading-tight tracking-tight text-white">
      {p.title}
    </h3>
    <p className="mt-2 text-sm text-neutral-400">{p.cardOutcome ?? p.summary ?? p.question}</p>
  </Link>
);

export function AllProjects() {
  const navigate = useNavigate();
  const openProject = (e: MouseEvent<HTMLAnchorElement>, slug: string) => openWithMorph(e, slug, navigate);

  return (
    <main className="relative z-10 bg-background">
      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-[120px] md:pb-24 md:pt-36">
        {/* Hero: headline split across two offset lines, with tilted pills */}
        <div className="relative mt-12">
          <h1
            className="whitespace-nowrap text-right font-display text-[clamp(1.75rem,6vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ color: ACCENT }}
          >
            A few projects
          </h1>
          <h1
            className="whitespace-nowrap text-left font-display text-[clamp(1.75rem,6vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ color: ACCENT }}
          >
            to brag about
          </h1>

          <span
            className="closing-tag-float absolute right-[24%] top-[-4%] hidden -rotate-[3deg] whitespace-nowrap rounded-full bg-white px-[18px] py-[8px] text-[14px] font-medium text-black md:inline-block"
            style={{ animation: "closing-tag-float 6s ease-in-out 0s infinite" }}
          >
            Just a few
          </span>
          <span
            className="closing-tag-float absolute left-[30%] top-[62%] hidden rotate-[4deg] whitespace-nowrap rounded-full bg-white px-[18px] py-[8px] text-[14px] font-medium text-black md:inline-block"
            style={{ animation: "closing-tag-float 7.5s ease-in-out -2s infinite" }}
          >
            Kind of proud
          </span>
        </div>

        {/* Artwork slot (left) and intro (right) */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <img
            src="/art/work-hero.png"
            alt=""
            aria-hidden
            className="w-full object-contain md:h-auto"
          />
          <p className="max-w-md text-[17px] leading-[1.6] text-white md:ml-auto md:text-[19px]">
            I design digital products that make complex tasks clearer and easier to complete. My work spans enterprise tools, education platforms, AI-powered workflows, and immersive experiences—connecting user needs, business rules, and thoughtful interaction design. From early problem framing to detailed interfaces and implementation handoff, I focus on making products useful, understandable, and practical to build.
          </p>
        </div>

        {TIERS.map((tier) => {
          const items = WORK.filter((p) => p.tier === tier.key);
          if (items.length === 0) return null;
          return (
            <div key={tier.key} id={tier.key} className="mt-24 scroll-mt-32">
              <p className="text-[14px] uppercase tracking-[0.18em] text-neutral-500">{tier.label}</p>
              <h2 className="mt-3 font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
                {tier.heading}
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
                {items.map((p) => (
                  <WorkCard key={p.title} project={p} onOpen={openProject} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-24 text-center">
          <p className="font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            Have a messy problem
            <br />
            to solve?
          </p>
          <a
            href="mailto:abhinesh.productdesign@gmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-black glass-hover"
          >
            Let&apos;s talk
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: ACCENT }}>
              ↗
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
