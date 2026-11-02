import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { SiteHeader } from "@/components/ui/site-header";
import { Mindset } from "@/components/ui/mindset";
import { About } from "@/components/ui/about";
import { HowIBuild } from "@/components/ui/how-i-build";
import { Lab } from "@/components/ui/lab";
import { GithubContributionSkyline } from "@/components/ui/github-contribution-skyline";
import { ImagesBadge } from "@/components/ui/images-badge";
import { IntroSequence } from "@/components/ui/intro-sequence";
import { destroyLenis, getLenis, initLenis } from "@/lib/lenis";
import { useHeroAboutParallax } from "@/lib/use-hero-about-parallax";
import { AllProjects } from "@/pages/all-projects";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
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
  useHeroAboutParallax();

  // Intro autoplay: overlay plays first, hero copy appears 1s after reveal.
  const [introDone, setIntroDone] = useState(false);
  const [copyOn, setCopyOn] = useState(false);
  useEffect(() => {
    if (!introDone) return;
    const t = window.setTimeout(() => setCopyOn(true), 1000);
    return () => window.clearTimeout(t);
  }, [introDone]);

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

  // Selected Work → wheel items. The whole index rides the wheel; the
  // full archive still lives on /allprojects behind the badge below.
  const wheelItems: WorksWheelItem[] = useMemo(
    () => WORK.map((p) => ({ title: p.title, image: p.img })),
    [],
  );

  return (
    <>
    <main className="relative z-10 bg-background border-b border-white/10 shadow-md rounded-b-3xl">

        {/* HERO — Prisma media hero as background, portfolio copy on top */}
        <PrismaHero
          copyVisible={copyOn}
          primaryCta={{ label: "SEE MY WORK", href: "#work" }}
          description={
            <>
              From{" "}
              <HoverLink
                previewKey="thinking"
                active={preview.activeKey === "thinking" && preview.isVisible}
                onHoverStart={preview.handleHoverStart}
                onHoverMove={preview.handleHoverMove}
                onHoverEnd={preview.handleHoverEnd}
                onTap={preview.handleTap}
              >
                product strategy
              </HoverLink>
              {" to "}
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
              {", prototypes and "}
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
              {" —"}
              <br />
              I work across the messy middle
              <br />
              to turn ideas into useful products.
            </>
          }
        />

        {/* ABOUT — cream editorial band, directly below the hero */}
        <About />

        {/* Page gutters — 120px sides on desktop, hero stays full-bleed */}
        <div className="px-6 sm:px-8 md:px-[120px]">

        {/* CHAPTER 02 — SELECTED WORK */}
        <section id="work" ref={workRef} className="py-10 md:py-16">
          <motion.div
            style={reduceMotion ? undefined : { scale: stageScale }}
            className="relative ml-[calc(50%-50vw)] h-[100vh] min-h-[560px] w-screen"
          >
            <WorksWheel items={wheelItems} label="Works '26" action="View" />
            <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 origin-center scale-90 md:bottom-12 md:left-auto md:right-[60px] md:translate-x-0 md:origin-bottom-right md:scale-100">
              <span className="pointer-events-auto">
                <ImagesBadge
                  images={WORK.map((p) => ({
                    src: p.img.replace("w=1200", "w=200"),
                    alt: p.title,
                  }))}
                  label="View all projects"
                  onClick={() => navigate("/allprojects")}
                />
              </span>
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

        </div>

        {/* LAB + CONTACT share one moon canvas, blended per reference */}
        <div className="relative ml-[calc(50%-50vw)] w-screen overflow-hidden">
          <img
            src="/art/contact-moon.webp"
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover [object-position:50%_68%] max-sm:[object-position:85%_50%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--background) 0%, transparent 18%)",
            }}
          />
          <div
            aria-hidden
            className="noise-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 px-6 sm:px-8 md:px-[120px]">

          {/* CHAPTER 05 — THE LAB */}
          <Lab />

          {/* Contribution skyline, below the lab. Real GitHub data once synced. */}
          <div className="py-20 md:py-24">
            <GithubContributionSkyline />
          </div>

          {/* CHAPTER 06 — WHAT'S NEXT */}
          <section id="contact" className="relative snap-start">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent"
            />

            <p
              aria-hidden
              className="font-hand absolute right-8 top-16 hidden w-36 rotate-3 whitespace-pre-line text-right text-3xl leading-tight text-[#E1E0CC]/70 lg:block"
            >
              {"Onward.\nTogether."}
            </p>

            <div className="relative z-10 w-full py-16 md:py-24">
              <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300">
                05&nbsp;&nbsp;/&nbsp;&nbsp;What&apos;s next
              </p>
              <h2 className="font-display mt-4 max-w-3xl text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                What should
                <br />
                we build next?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
                I&apos;m looking for difficult problems, ambitious teams and
                opportunities to turn ideas into something real.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@abhinesh.design"
                  className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-bold text-black transition-all hover:gap-3 sm:text-base"
                >
                  Let&apos;s talk
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[#FF4B16]" />
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-base"
                >
                  View resume
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
            style={{
              background:
                "linear-gradient(to top, var(--background) 0%, transparent 100%)",
            }}
          />
          </div>
        </div>
    </main>
    {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);
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
        brandName="ABHINESH B."
        copyright="© 2026 Abhinesh. All rights reserved."
      />

    </div>
  );
}
