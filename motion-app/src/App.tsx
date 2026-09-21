import { useEffect, useMemo, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { SiteHeader } from "@/components/ui/site-header";
import { Mindset } from "@/components/ui/mindset";
import { HowIBuild } from "@/components/ui/how-i-build";
import { Lab } from "@/components/ui/lab";
import { ImagesBadge } from "@/components/ui/images-badge";
import { AllProjects } from "@/pages/all-projects";
import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel";
import {
  HoverLink,
  PreviewCard,
  HoverPreviewStyles,
  useHoverPreview,
  type PreviewMap,
} from "@/components/ui/hover-preview";

export interface WorkItem {
  title: string;
  tag: string;
  question: string;
  img: string;
  featured?: boolean;
  isNew?: boolean;
  /** Two-line filmstrip headline, e.g. "Funded\nGlobal". */
  cardTitle?: string;
  /** Short category for filmstrip meta. */
  category?: string;
  /** Backdrop hue for the filmstrip grade. */
  accent?: string;
  /** Ambience photo graded behind the filmstrip stage. */
  backdrop?: string;
}

export const WORK: WorkItem[] = [
  {
    title: "FundedGlobal",
    tag: "Fintech · Web App",
    question: "How do you make financial complexity feel trustworthy?",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
    featured: true,
    cardTitle: "Funded\nGlobal",
    category: "Fintech",
    accent: "#14b8a6",
    backdrop:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop&q=70",
  },
  {
    title: "Barrelhand",
    tag: "Inventory · Ops Tool",
    question: "Can a workshop manage without spreadsheets?",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=60",
    featured: true,
    cardTitle: "Barrelhand",
    category: "Inventory",
    accent: "#f59e0b",
    backdrop:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=70",
  },
  {
    title: "VividVision",
    tag: "Architecture · Spatial UI",
    question: "What if architecture had a live companion?",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=60",
    featured: true,
    cardTitle: "Vivid\nVision",
    category: "Spatial UI",
    accent: "#8b5cf6",
    backdrop:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&auto=format&fit=crop&q=70",
  },
  {
    title: "Northwind Analytics",
    tag: "Data · Dashboard",
    question: "How do you make dense data feel calm?",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
    isNew: true,
    cardTitle: "Northwind\nAnalytics",
    category: "Data",
    accent: "#2f7bff",
    backdrop:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=70",
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

// Home shows best + latest only; the full archive lives on /allprojects.
export const HOME_WORK = WORK.filter((p) => p.featured || p.isNew);

function Portfolio() {
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
  const navigate = useNavigate();

  // Section 3 parallax: overlay copy drifts against the stage while the
  // stage settles from a slight scale as it travels through view.
  const reduceMotion = useReducedMotion();
  const workRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });
  const stageScale = useTransform(
    workProgress,
    [0, 0.35, 0.75, 1],
    [0.965, 1, 1, 0.985],
  );

  // Selected Work → filmstrip items. Backdrop ambience stays separate
  // from the card covers by design.
  const looks: HeroCarouselItem[] = useMemo(
    () =>
      HOME_WORK.map((p) => ({
        title: p.cardTitle ?? p.title,
        image: p.img,
        backdrop: p.backdrop,
        credit: p.tag.toUpperCase(),
        meta: [(p.category ?? p.tag).toUpperCase(), "CASE STUDY"],
        accent: p.accent,
      })),
    [],
  );

  return (
    <main className="relative z-10 bg-background border-b border-white/10 shadow-md rounded-b-3xl">

        {/* HERO — Prisma media hero as background, portfolio copy on top */}
        <PrismaHero
          primaryCta={{ label: "SEE MY WORK", href: "#work" }}
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

        {/* Page gutters — 120px sides on desktop, hero stays full-bleed */}
        <div className="px-5 md:px-[120px]">

        {/* CHAPTER 02 — SELECTED WORK */}
        <section id="work" ref={workRef} className="py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 sm:text-[11px]">
            Selected work
          </p>
                <h2 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[0.95] tracking-[-0.02em] text-white sm:mt-4 sm:text-5xl lg:text-6xl">
                  Real problems.
                  <br />
                  Real products.
                </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:mt-6 md:text-lg">
            A few problems I&apos;ve had the chance to get my hands dirty with.
          </p>
          <motion.div
            style={reduceMotion ? undefined : { scale: stageScale }}
            className="relative ml-[calc(50%-50vw)] mt-10 h-[100vh] min-h-[560px] w-screen snap-start"
          >
            <HeroCarousel
              items={looks}
              autoplay
              autoplayDelay={5000}
              gutterPx={{ base: 20, md: 120 }}
            />
            <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 origin-center scale-90 md:bottom-10 md:left-auto md:right-[120px] md:translate-x-0 md:origin-bottom-right md:scale-100">
              <ImagesBadge
                images={WORK.map((p) => ({
                  src: p.img.replace("w=1200", "w=200"),
                  alt: p.title,
                }))}
                label="View all projects"
                onClick={() => navigate("/allprojects")}
              />
            </div>
          </motion.div>
          <PreviewCard
            data={preview.activePreview}
            position={preview.position}
            isVisible={preview.isVisible}
            cardRef={preview.cardRef}
          />
        </section>

        {/* CHAPTER 03 — HOW I THINK */}
        <Mindset />

        {/* CHAPTER 04 — HOW I BUILD */}
        <HowIBuild />

        {/* CHAPTER 05 — THE LAB */}
        <Lab />

        {/* CHAPTER 06 — WHAT'S NEXT */}
        <section id="contact" className="py-16 md:py-24 max-w-6xl mx-auto snap-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-14 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">What&apos;s next</p>
            <h2 className="font-display mt-4 text-[10vw] sm:text-5xl md:text-6xl font-bold leading-[0.95] tracking-[-0.02em] text-white">
              What should
              <br />
              we build next?
            </h2>
            <p className="mt-4 text-neutral-400 max-w-lg mx-auto">
              I&apos;m looking for difficult problems, ambitious teams and
              opportunities to turn ideas into something real.
            </p>
            <a href="mailto:hello@abhinesh.design" className="inline-block mt-8 px-10 py-5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors">
              LET&apos;S TALK ↗
            </a>
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-[#FF4B16]">
              Better ideas ahead.
            </p>
          </div>
        </section>
        </div>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="dark relative w-full bg-background min-h-screen font-sans selection:bg-white/20 overflow-x-hidden">
      <HoverPreviewStyles />
      <SiteHeader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/allprojects" element={<AllProjects />} />
      </Routes>

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
          { label: "Designer", href: "#mindset" },
          { label: "Thinker", href: "#build" },
          { label: "Builder", href: "#lab" },
          { label: "Email", href: "mailto:hello@abhinesh.design" },
          { label: "LinkedIn", href: "#" },
        ]}
        brandName="ABHI"
        copyright="© 2026 Abhinesh. All rights reserved."
      />

    </div>
  );
}
