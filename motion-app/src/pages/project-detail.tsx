import { useRef } from "react";
import { Link, useParams } from "react-router";
import { ArrowUpRight, Heart, School, Sprout, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { WORK, type CaseStudy, type CaseStudyChapter } from "@/App";
import { useHeroAboutParallax } from "@/lib/use-hero-about-parallax";

/* Body copy fades in one line at a time as it scrolls into view. Sentences are
   the fade units, so each reveal is a short run of text rather than a single word. */
export function FadeLines({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const lines = text.split(/(?<=[.!?])\s+/);
  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`block ${i < lines.length - 1 ? "mb-[18px]" : ""}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: i * 0.35, ease: "easeOut" }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- /work/:slug ----------------
   One template for every project, laid out like the two26 project page: a
   full-screen cover hero with a back pill, a Let's talk pill and the project
   name bottom-left; then the meta row, The Context and The Solution sections,
   the gallery stacked full width, an outcome, More Works and a call to action.
   Sections appear only when the project has that text or images. A project
   with a caseStudy replaces the generic sections with its own chapters. */

const ACCENT = "#FF5400";
const CREAM = "#F5EDE4";

// Case-study palette, taken from the reference layout: light section tones,
// a coral label, a near-black heading and a grey body.
const LABEL = "#e8735a";
const INK = "#ffffff";
const BODY = "#d4d4d4";
const MUTED = "#7a7a7a";
const TONES = {
  paper: "#000000",
  sky: "#000000",
  blush: "#000000",
  white: "#000000",
} as const;

export const slugOf = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">{children}</p>
);

/* Two-column text block, matching the two26 page: a small topic label on the
   left, and the heading and copy in orange on the right. */
const ContentBlock = ({ topic, heading, text }: { topic?: string; heading: string; text: string }) => (
  <section className="grid grid-cols-1 gap-8 px-6 pb-24 pt-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-12 md:px-[120px]">
    {topic && (
      <p className="text-[14px] font-medium leading-snug" style={{ color: ACCENT }}>
        {topic}
      </p>
    )}
    <div className={topic ? "" : "md:col-span-2"}>
      <h2 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] text-white">
        {heading}
      </h2>
      {/* Body copy reveals word by word as it scrolls into view */}
      <div className="mt-8 max-w-3xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.35] text-white">
        <FadeLines text={text} />
      </div>
    </div>
  </section>
);

/* Shown where a project has no cover image yet, so the card or hero is never
   blank and no fake screen is used. */
export const CoverPlaceholder = ({ title }: { title: string }) => (
  <div
    role="img"
    aria-label={`${title}: cover image coming soon`}
    className="flex h-full w-full items-center justify-center border border-white/10 bg-[linear-gradient(145deg,#1a1a1a,#0b0b0b)]"
  >
    <span className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">Cover coming soon</span>
  </div>
);

/* Numbered design decisions, one row each. */
const DecisionList = ({ items }: { items: string[] }) => (
  <section className="grid grid-cols-1 gap-8 px-6 pb-24 pt-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-12 md:px-[120px]">
    <h2 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] text-white">Key Decisions</h2>
    <ol className="space-y-6 text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.35] text-white">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4">
          <span className="font-display font-bold" style={{ color: ACCENT }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  </section>
);

/* The workflow as a visual flow: numbered role cards, with an orange return
   path showing that rework goes back to the teacher. Cards rise in one by one. */
function WorkflowFlow({ steps }: { steps: { role: string; action: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section className="px-6 pb-24 pt-24 sm:px-8 md:px-[120px]" ref={ref}>
      <p className="text-[14px] font-medium leading-snug" style={{ color: ACCENT }}>
        Workflow
      </p>
      <h2 className="font-display mt-4 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] text-white">
        The Workflow
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.role}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            className="rounded-[16px] border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="font-display text-[44px] font-bold leading-none" style={{ color: ACCENT }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-6 text-[22px] font-bold uppercase text-white">{step.role}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-white/80">{step.action}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 rounded-[16px] border px-6 py-5" style={{ borderColor: ACCENT }}>
        <span className="text-[22px]" style={{ color: ACCENT }}>
          ↺
        </span>
        <p className="text-[16px] text-white/90">
          Work sent back for rework returns to the teacher. Accepted tasks appear in the Allocator&apos;s report.
        </p>
      </div>
    </section>
  );
}

/* Image slot for a case study. It shows a placeholder until a screen is set, so
   the layout holds its shape and no fake screen is used. */
const ScreenSlot = ({ src, alt, aspect = "aspect-[4/3]" }: { src?: string; alt: string; aspect?: string }) =>
  src ? (
    // Illustrations have a white ground, so multiply melts it into the section tone.
    <img src={src} alt={alt} loading="lazy" className={`${aspect} w-full object-contain mix-blend-multiply`} />
  ) : (
    <div
      role="img"
      aria-label={`${alt}: screen coming soon`}
      className={`${aspect} flex w-full items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04]`}
    >
      <span className="text-[12px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
        Screen coming soon
      </span>
    </div>
  );

const STAT_ICONS = { users: Users, school: School, sprout: Sprout, heart: Heart };

/* Numbered steps in a row, with the coral ring used across the case study. */
const Flow = ({ steps }: { steps: string[] }) => (
  <ol className="grid grid-cols-2 gap-6 sm:grid-cols-5">
    {steps.map((step, i) => (
      <li key={step} className="flex flex-col items-center text-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full border text-[18px] font-bold"
          style={{ borderColor: LABEL, color: LABEL }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="mt-4 text-[14px] leading-snug" style={{ color: BODY }}>
          {step}
        </span>
      </li>
    ))}
  </ol>
);

const Stats = ({ stats }: { stats: { icon: keyof typeof STAT_ICONS; value?: string; label: string }[] }) => (
  <div className="mt-12 grid grid-cols-2 gap-8">
    {stats.map((s) => {
      const Icon = STAT_ICONS[s.icon];
      return (
        <div key={s.label}>
          <Icon className="h-7 w-7" style={{ color: LABEL }} aria-hidden />
          {s.value && (
            <p className="mt-3 font-display text-[28px] font-bold" style={{ color: INK }}>
              {s.value}
            </p>
          )}
          <p className="mt-2 text-[14px] leading-snug" style={{ color: BODY }}>
            {s.label}
          </p>
        </div>
      );
    })}
  </div>
);

/* One chapter: number and label, heading and copy beside an image or a visual.
   The image side follows imageSide and the background follows tone. Card rows
   run full width below the copy. */
const Chapter = ({ chapter }: { chapter: CaseStudyChapter }) => {
  const { number, label, heading, text, image, imageSide = "right", tone = "paper", visual } = chapter;
  const background = { backgroundColor: TONES[tone] };

  const copy = (
    <div>
      <p className="text-[14px] font-medium leading-snug" style={{ color: LABEL }}>
        {number} — {label}
      </p>
      <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.05]" style={{ color: INK }}>
        {heading}
      </h2>
      <div className="mt-8 max-w-xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.35]" style={{ color: BODY }}>
        <FadeLines text={text} />
      </div>
      {visual?.kind === "stats" && <Stats stats={visual.stats} />}
    </div>
  );

  if (visual?.kind === "cards") {
    return (
      <section className="px-6 pb-24 pt-24 sm:px-8 md:px-[120px]" style={background}>
        {copy}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visual.cards.map((card) => (
            <div key={card.title}>
              <ScreenSlot alt={card.title} aspect="aspect-[9/16]" />
              <h3 className="mt-5 text-[22px] font-bold" style={{ color: INK }}>
                {card.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: BODY }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Stats sit in the copy column, so they only get a media slot when an image is set.
  const media =
    visual?.kind === "flow" ? <Flow steps={visual.steps} /> : visual?.kind === "stats" && !image ? null : <ScreenSlot src={image} alt={heading} />;

  return (
    <section className="px-6 pb-24 pt-24 sm:px-8 md:px-[120px]" style={background}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div className={imageSide === "left" ? "md:order-2" : ""}>{copy}</div>
        <div className={imageSide === "left" ? "md:order-1" : ""}>{media}</div>
      </div>
    </section>
  );
};

/* Case study body: meta row, numbered chapters and a closing block. */
const CaseStudyBody = ({ study }: { study: CaseStudy }) => (
  <>
    <section className="px-6 py-16 sm:px-8 md:px-[120px]" style={{ backgroundColor: TONES.paper }}>
      <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {study.meta.map((m) => (
          <div key={m.label}>
            <dt className="text-[13px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
              {m.label}
            </dt>
            <dd className="mt-3 text-[22px] leading-snug text-white transition-colors duration-300 hover:text-[#FF5400]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>

    {study.chapters.map((chapter) => (
      <div key={chapter.number} id={`chapter-${chapter.number}`}>
        <Chapter chapter={chapter} />
      </div>
    ))}

    <section className="px-6 py-24 sm:px-8 md:px-[120px]" style={{ backgroundColor: TONES.paper }}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.05]" style={{ color: INK }}>
            {study.closing.heading}
          </h2>
          <div className="mt-8 max-w-xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.35]" style={{ color: BODY }}>
            <FadeLines text={study.closing.text} />
          </div>
          <Link
            to={study.closing.cta.to}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-black glass-hover"
          >
            {study.closing.cta.label}
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: ACCENT }}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
        <ScreenSlot alt={study.closing.heading} />
      </div>
    </section>
  </>
);

export function ProjectDetail() {
  const { slug } = useParams();
  // Same scrubbed hero parallax as the home page: the cover image drifts and the title lifts.
  useHeroAboutParallax();
  const index = WORK.findIndex((p) => slugOf(p.title) === slug);

  if (index < 0) {
    return (
      <main className="bg-background px-6 pb-24 pt-40 text-white sm:px-8 md:px-[120px]">
        <p className="text-neutral-400">That project could not be found.</p>
        <Link to="/allprojects" className="mt-6 inline-block underline">
          See all projects
        </Link>
      </main>
    );
  }

  const p = WORK[index];
  const more = WORK.filter((_, i) => i !== index);
  const study = p.caseStudy;

  // Meta row, as on the two26 page: services, category, client and live link.
  const meta = [
    { label: "Services", value: p.services },
    { label: "Category", value: p.tag },
    { label: "Client", value: p.client },
  ].filter((m) => m.value);

  return (
    <main className="bg-background text-white">
      {/* Hero: full-screen cover, pills at the top, name bottom-left */}
      <section className="relative h-screen w-full overflow-hidden" data-hp-stage="hero">
        {p.img ? (
          <img src={p.img} alt={p.title} data-hp="hero-video" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0">
            <CoverPlaceholder title={p.title} />
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 pt-6 sm:px-8 md:px-[40px]">
          <span aria-hidden />
          <a
            href="mailto:abhinesh.productdesign@gmail.com"
            className="inline-flex items-center gap-3 rounded-full bg-black py-2 pl-6 pr-2 text-sm font-medium text-white glass-hover"
          >
            Let&apos;s Talk
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: ACCENT }}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <h1
          data-hp="hero-copy"
          className="font-display absolute bottom-6 left-6 text-[clamp(2rem,8.5vw,10rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] sm:left-8 md:left-[40px] md:text-[clamp(3rem,11vw,10rem)]"
          style={{ color: CREAM }}
        >
          {p.title}
        </h1>
      </section>

      {study ? (
        <CaseStudyBody study={study} />
      ) : (
        <>
          {/* Meta row */}
          {(meta.length > 0 || p.liveLink) && (
            <section className="px-6 py-16 sm:px-8 md:px-[120px]">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">{m.label}</dt>
                    <dd className="mt-2 text-[15px] text-white/90">{m.value}</dd>
                  </div>
                ))}
                {p.liveLink && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Live link</dt>
                    <dd className="mt-2">
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[15px] underline underline-offset-4 hover:opacity-80"
                        style={{ color: ACCENT }}
                      >
                        Visit site
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {p.context && <ContentBlock topic={p.tag} heading="The Context" text={p.context} />}

          {p.role && <ContentBlock heading="My Role" text={p.role} />}

          {p.decisions && p.decisions.length > 0 && <DecisionList items={p.decisions} />}

          {p.solution && <ContentBlock topic={p.year} heading="The Solution" text={p.solution} />}

          {/* Gallery: full-width images stacked, as on the two26 page */}
          {p.gallery && p.gallery.length > 0 && (
            /* Bento layout: a wide tile, then two tiles side by side, repeating. */
            <section className="grid grid-cols-1 gap-6 px-6 pb-24 sm:px-8 md:grid-cols-2 md:px-[120px]">
              {p.gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${p.title} ${i + 1}`}
                  loading="lazy"
                  className={`w-full rounded-[16px] object-cover ${
                    i % 3 === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/5]"
                  }`}
                />
              ))}
            </section>
          )}

          {p.workflowSteps && <WorkflowFlow steps={p.workflowSteps} />}
          {p.workflow && !p.workflowSteps && <ContentBlock topic="Workflow" heading="The Workflow" text={p.workflow} />}

          {p.outcome && <ContentBlock topic="Outcome" heading="The Outcome" text={p.outcome} />}

          {p.limitations && <ContentBlock heading="Limitations" text={p.limitations} />}
        </>
      )}

      {/* More Works */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-8 md:px-[120px]">
        <SectionLabel>{"Featured project"}</SectionLabel>
        <h2 className="font-display mt-4 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95]">More Works</h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {more.map((m) => (
            <Link key={m.title} to={`/work/${slugOf(m.title)}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-[16px] bg-neutral-900">
                {m.img ? (
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <CoverPlaceholder title={m.title} />
                )}
              </div>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-neutral-500">{m.tag}</p>
              <h3 className="mt-2 text-[24px] font-bold uppercase leading-tight">{m.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-6 pb-32 pt-12 text-center sm:px-8 md:px-[120px]">
        <p className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95]">
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
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </section>
    </main>
  );
}
