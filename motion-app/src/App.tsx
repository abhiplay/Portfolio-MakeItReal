import { useMemo } from "react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PrismaHero } from "@/components/ui/prisma-hero";
import CarouselStacked, { type Slide } from "@/components/ui/carousel-07";
import {
  HoverLink,
  PreviewCard,
  HoverPreviewStyles,
  useHoverPreview,
  type PreviewMap,
} from "@/components/ui/hover-preview";

const WORK = [
  {
    title: "FundedGlobal",
    tag: "Fintech · Web App",
    question: "How do you make financial complexity feel trustworthy?",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
  },
  {
    title: "Barrelhand",
    tag: "Inventory · Ops Tool",
    question: "Can a workshop manage without spreadsheets?",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=60",
  },
  {
    title: "VividVision",
    tag: "Architecture · Spatial UI",
    question: "What if architecture had a live companion?",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=60",
  },
  {
    title: "Northwind Analytics",
    tag: "Data · Dashboard",
    question: "How do you make dense data feel calm?",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
  },
  {
    title: "Studio Mono",
    tag: "Brand · Design System",
    question: "What does a system need to stay coherent?",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=60",
  },
  {
    title: "Field Notes",
    tag: "Editorial · Research",
    question: "How do you show thinking, not just screens?",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop&q=60",
  },
];

export default function Portfolio() {
  const previewItems: PreviewMap = useMemo(
    () => ({
      thinking: {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        title: "Product thinking",
        subtitle: "Outcomes, constraints, trade-offs",
      },
      ux: {
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60",
        title: "UX",
        subtitle: "Flows, systems, clarity",
      },
      ai: {
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60",
        title: "AI",
        subtitle: "Prototypes, copilots, experiments",
      },
      code: {
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
        title: "Code",
        subtitle: "Shipped, not just mocked",
      },
    }),
    []
  );
  const preview = useHoverPreview(previewItems);

  // Selected Work → stacked carousel slides.
  // Badge keeps the short category (fits the card); the full tag stays
  // visible in the index list below the carousel.
  const workSlides: Slide[] = useMemo(
    () =>
      WORK.map((p) => ({
        image: p.img,
        title: p.title,
        description: p.question,
        badge: p.tag.split("·")[0]?.trim() ?? p.tag,
      })),
    [],
  );

  return (
    <div className="dark relative w-full bg-background min-h-screen font-sans selection:bg-white/20 overflow-x-hidden">
      <HoverPreviewStyles />

      {/*
        PORTFOLIO CONTENT
        Stays above the fixed footer (z-10) so the curtain reveal works:
        scrolling past this content unveils the footer pinned underneath.
      */}
      <main className="relative z-10 bg-background border-b border-white/10 shadow-md rounded-b-3xl">

        {/* HERO — Prisma media hero as background, portfolio copy on top */}
        <PrismaHero
          description={
            <>
              Forward-deployed product designer turning ambiguity into something real —{" "}
              <HoverLink
                previewKey="thinking"
                active={preview.activeKey === "thinking" && preview.isVisible}
                onHoverStart={preview.handleHoverStart}
                onHoverMove={preview.handleHoverMove}
                onHoverEnd={preview.handleHoverEnd}
                onTap={preview.handleTap}
              >
                product thinking
              </HoverLink>
              {", "}
              <HoverLink
                previewKey="ux"
                active={preview.activeKey === "ux" && preview.isVisible}
                onHoverStart={preview.handleHoverStart}
                onHoverMove={preview.handleHoverMove}
                onHoverEnd={preview.handleHoverEnd}
                onTap={preview.handleTap}
              >
                UX
              </HoverLink>
              {", "}
              <HoverLink
                previewKey="ai"
                active={preview.activeKey === "ai" && preview.isVisible}
                onHoverStart={preview.handleHoverStart}
                onHoverMove={preview.handleHoverMove}
                onHoverEnd={preview.handleHoverEnd}
                onTap={preview.handleTap}
              >
                AI
              </HoverLink>
              {" and "}
              <HoverLink
                previewKey="code"
                active={preview.activeKey === "code" && preview.isVisible}
                onHoverStart={preview.handleHoverStart}
                onHoverMove={preview.handleHoverMove}
                onHoverEnd={preview.handleHoverEnd}
                onTap={preview.handleTap}
              >
                code
              </HoverLink>
              {", from first question to shipped outcome."}
            </>
          }
        />

        {/* WORK — stacked drag carousel */}
        <section id="work" className="px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">Selected work — 06</h2>
            <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-600">2022 → 2026</span>
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-600 mb-4">
            ← Drag to explore →
          </p>
          <CarouselStacked slides={workSlides} className="-mx-6 md:-mx-10" />
          <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {WORK.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group flex items-baseline justify-between gap-4 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg md:text-xl font-bold text-white group-hover:underline underline-offset-4">
                  {p.title}
                </span>
                <span className="shrink-0 text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                  {p.tag}
                </span>
              </a>
            ))}
          </div>
          <PreviewCard
            data={preview.activePreview}
            position={preview.position}
            isVisible={preview.isVisible}
            cardRef={preview.cardRef}
          />
        </section>

        {/* CONTACT CTA */}
        <section className="px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-14 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">What are we building next?</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-white">
              Give me a difficult problem.
            </h2>
            <p className="mt-4 text-neutral-400 max-w-lg mx-auto">
              Ambitious, messy, unfinished — that&apos;s where I do best.
            </p>
            <a href="mailto:hello@abhinesh.design" className="inline-block mt-8 px-10 py-5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors">
              hello@abhinesh.design →
            </a>
          </div>
        </section>
      </main>

      {/* Portfolio footer — same cinematic component, portfolio content */}
      <CinematicFooter
        giantText="ABHI"
        heading="Let's build."
        marqueeItems={[
          "Problem First",
          "Prototype Early",
          "Ship Small",
          "Test With Users",
          "Learn Loudly",
        ]}
        primaryPills={[
          { label: "Start a project", href: "mailto:hello@abhinesh.design" },
          { label: "View résumé", href: "#" },
        ]}
        secondaryPills={[
          { label: "Email", href: "mailto:hello@abhinesh.design" },
          { label: "LinkedIn", href: "#" },
          { label: "GitHub", href: "#" },
        ]}
        brandName="Abhinesh"
        copyright="© 2026 Abhinesh. All rights reserved."
      />

    </div>
  );
}
