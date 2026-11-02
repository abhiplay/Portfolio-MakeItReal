import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { SiteHeader } from "@/components/ui/site-header";
import { Mindset } from "@/components/ui/mindset";
import { About } from "@/components/ui/about";
import { SelectedWorks } from "@/components/ui/selected-works";
import { HowIBuild, ToolkitStrip } from "@/components/ui/how-i-build";
import { ClientTestimonials } from "@/components/ui/client-testimonials";
import { ContactForm } from "@/components/ui/contact-form";
import { Lab } from "@/components/ui/lab";
import { GithubContributionSkyline } from "@/components/ui/github-contribution-skyline";
import { IntroSequence } from "@/components/ui/intro-sequence";
import { destroyLenis, getLenis, initLenis } from "@/lib/lenis";
import { useHeroAboutParallax } from "@/lib/use-hero-about-parallax";
import { AllProjects } from "@/pages/all-projects";
import { ProjectDetail } from "@/pages/project-detail";
import {
  HoverLink,
  HoverPreviewStyles,
  useHoverPreview,
  type PreviewMap,
} from "@/components/ui/hover-preview";

// The intro plays once per browser session. The flag lives in sessionStorage,
// so a reload or a return to the home page skips it. Storage can be blocked, so
// every access is guarded.
const INTRO_KEY = "intro-played";
function hasIntroPlayed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}
function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* storage unavailable: the intro may replay, which is harmless */
  }
}

export interface WorkItem {
  title: string;
  tag: string;
  question: string;
  img: string;
  /** Work page tier: featured case study, selected product work, or visual playground. */
  tier: "featured" | "selected" | "playground";
  /** One-line summary for the card, when the project needs more than the title. */
  summary?: string;
  /** Card line that states a capability, or an outcome only when it is evidenced. */
  cardOutcome?: string;
  /** Shown on the detail page when the work cannot be published in full. */
  confidentialityNote?: string;
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
  /** Year the project was published. */
  year?: string;
  /** Case-study text and images. Each section shows only when set. */
  context?: string;
  solution?: string;
  outcome?: string;
  /** How tasks move between roles. Shown as a section when set. */
  workflow?: string;
  /** My role on the project, shown as its own section when set. */
  role?: string;
  /** Design decisions, shown as a numbered list. */
  decisions?: string[];
  /** Limits of the work and what is left to validate, shown as a section. */
  limitations?: string;
  /** Steps shown as a visual flow on the detail page. */
  workflowSteps?: { role: string; action: string }[];
  gallery?: string[];
  /** Meta row on the detail page. */
  services?: string;
  client?: string;
  liveLink?: string;
  /** Replaces the generic detail sections with a meta row, numbered chapters and a closing block. */
  caseStudy?: CaseStudy;
}

export interface CaseStudyChapter {
  number: string;
  label: string;
  heading: string;
  text: string;
  /** Shown beside the copy. A placeholder stands in until a screen is set. */
  image?: string;
  imageSide?: "left" | "right";
  /** Section background from the case-study palette. Defaults to paper. */
  tone?: "paper" | "sky" | "blush" | "white";
  /** Extra visual: a numbered flow, a row of stats, or a row of screen cards. */
  visual?:
    | { kind: "flow"; steps: string[] }
    | { kind: "stats"; stats: { icon: "users" | "school" | "sprout" | "heart"; value?: string; label: string }[] }
    | { kind: "cards"; cards: { title: string; text: string; image?: string }[] };
}

export interface CaseStudy {
  meta: { label: string; value: string }[];
  chapters: CaseStudyChapter[];
  closing: { heading: string; text: string; image?: string; cta: { label: string; to: string } };
}

export const WORK: WorkItem[] = [
  {
    title: "Metadrob",
    tier: "featured",
    summary: "Designing a virtual store editor that helps users shape immersive retail spaces through a digital creation workflow.",
    tag: "Enterprise SaaS · 3D commerce",
    question: "Full case study on my Framer portfolio.",
    img: "/projects/metadrob.png",
    year: "2024",
    services: "UI UX Design",
    client: "Metadrob",
    context: "Metadrob is a virtual-store creation and editing experience for immersive commerce. The design challenge is to help users work with a spatial, visually rich environment while keeping core editing actions understandable and manageable. Creating a virtual store involves more than presenting a 3D scene. Users need to understand where they are in the editing process, discover the right controls, and make changes without losing context.",
    decisions: [
      "Structure the editor around the tasks users perform most often.",
      "Make editing controls and the store preview work together so users can connect an action with its visual result.",
      "Use consistent patterns for controls, states, and feedback.",
    ],
    solution: "The resulting experience brings the store canvas and editing controls into a more coherent workflow.",
    outcome: "After launch, new registrations for the Virtual Store Editor rose by 200%.",
  },
  {
    title: "CBL CBA",
    tier: "featured",
    summary: "Connected lesson planning, competency-based assessments, reviews and approvals in one structured digital workflow.",
    cardOutcome: "Connected lesson planning, competency-based assessments, reviews and approvals in one structured digital workflow.",
    tag: "EdTech · Workflow design · Education",
    question: "Full case study on my Framer portfolio.",
    img: "/projects/cbl-cba.png",
    isNew: true,
    year: "2025",
    services: "UI UX Design | Product Design | Usability Testing",
    client: "Sri Aurobindo Society",
    liveLink: "https://cbe.rupantar.in/",
    context: "CBL CBA supports a structured process for creating, reviewing, and publishing learning materials and competency-based assessments. The experience connects teacher submissions with reviewer feedback and approval, helping each role understand what action is needed next. Learning content and assessments move through several stages and people. Without a clear workflow, it can be difficult to track submissions, understand review feedback, and know when content is ready to publish.",
    decisions: [
      "Organise the work around clear stages: prepare, submit, review, revise, approve, and publish.",
      "Make review feedback and required modifications visible in context.",
      "Distinguish the actions and permissions available to each role.",
    ],
    solution: "The platform supports lesson plans, project work, SRT/CRT assessments, teacher submissions, reviewer analysis, modification requests, approval, and publishing.",
    workflow: "Super Admins set up user types, roles and menus. Admins add concepts and reference material and manage users. Allocators assign tasks to teachers and track each one in a team report. Teachers submit their work, which goes to Reviewer 1 for the first review. Reviewer 2 makes the final decision on the lesson plan: accept it, or send it back for rework. Every status flows back to the Allocator’s report, so the whole cycle is visible in one place.",
    workflowSteps: [
      { role: "Super Admin", action: "Sets up user types, roles and menus." },
      { role: "Admin", action: "Adds concepts and reference material, and manages users." },
      { role: "Allocator", action: "Assigns tasks to teachers and tracks each one in a team report." },
      { role: "Teacher", action: "Teachers in Kendriya Vidyalayas across India submit their work for review." },
      { role: "Reviewer 1", action: "A subject matter expert does the first review and uploads the reviewed work." },
      { role: "Reviewer 2", action: "A second subject matter expert makes the final decision on the lesson plan: accept it, or send it back for rework." },
    ],
    gallery: ["/projects/gallery/cbl-cba-teacher.png", "/projects/gallery/cbl-cba-rework.png", "/projects/gallery/cbl-cba-tasks.png", "/projects/gallery/cbl-cba-screen-3.png"],
    outcome: "Transformed a fragmented, teacher-driven assessment process into a structured digital workflow for competency-based learning. The platform connected lesson planning, project work, Student Readiness Tests (SRT), Classroom Readiness Tests (CRT), and assessment reviews in one coordinated experience. Teachers could submit their work for review, reviewers could evaluate and request modifications, and approved content could be published through a clear, role-based workflow. This improved process visibility, established clearer ownership at each stage, and created a more consistent approach to preparing, reviewing, and managing learning assessments.",
  },
  {
    title: "FlowAI",
    tier: "featured",
    summary: "An AI procurement copilot that turns a natural-language request into a transparent, reviewable purchase workflow.",
    tag: "AI product design · Concept/MVP",
    question: "Concept and MVP prototype for AI-assisted procurement.",
    img: "",
    context: "FlowAI explores how an AI copilot can help employees prepare procurement requests while keeping decisions reviewable and policy-controlled. The prototype turns a plain-language need into clarifying questions, contextual product recommendations, and a request that a human can review before the business workflow proceeds. Procurement requests often require more than a product name and quantity. The requester may need to clarify operating-system preferences and delivery deadlines, while the system must consider budget, inventory, vendor eligibility, and approval policy.",
    decisions: [
      "Ask for missing constraints before recommending.",
      "Explain recommendations with relevant evidence such as compatibility, availability, delivery, cost, and vendor rules.",
      "Keep a review step before submission and route requests above the configured threshold for approval.",
    ],
    solution: "AI recommends, evidence explains, humans decide, and the system enforces the workflow. The AI interaction and the business request state are kept separate so a recommendation is not confused with an approved purchase. The prototype supports natural-language intent, clarification, organisation-aware recommendations, review and editing, request confirmation, approval routing, and demo processing.",
    outcome: "The prototype demonstrates an end-to-end procurement workflow with transparent recommendations and human review. This is a functional prototype outcome, not proof of production readiness or measured user impact. No real purchase is made.",
    limitations: "Next steps could include moderated usability testing, accessibility checks, persistence, permissions and authentication, and carefully governed integrations. These are future work.",
  },
  {
    title: "COE",
    tier: "selected",
    summary: "A role-based platform concept for coordinating student information, specialist support, assessments, and sessions across a Centre of Excellence.",
    tag: "EdTech · Special education · Admin SaaS",
    question: "Role-based platform concept for a Centre of Excellence.",
    img: "",
    context: "The COE platform supports operational workflows around students and specialist services. The experience spans student intake, parent information, plans and packages, specialist assignment, scheduling, assessments, session logs, and administrative oversight.",
    outcome: "A connected set of interfaces for managing student-related operations across multiple roles.",
  },
  {
    title: "Auroscholar",
    tier: "selected",
    summary: "Contributed to the design of an educational digital experience built to support learners and their learning journey.",
    tag: "EdTech · Learning platform",
    question: "Full case study on my Framer portfolio.",
    img: "/projects/auroscholar.png",
    year: "2024",
    client: "Sri Aurobindo Society",
    caseStudy: {
      meta: [
        { label: "My role", value: "Product Design · UI/UX" },
        { label: "Platforms", value: "Web · Android" },
        { label: "Domain", value: "Education" },
        { label: "Users", value: "~2M+" },
      ],
      chapters: [
        {
          number: "01",
          label: "Overview",
          tone: "paper",
          heading: "Learning beyond the classroom.",
          text: "AuroScholar brings digital learning into students' everyday lives, connecting educational content and learning experiences through digital platforms.",
          image: "/projects/auroscholar-overview.webp",
          imageSide: "right",
        },
        {
          number: "02",
          label: "The Challenge",
          tone: "paper",
          heading: "Making digital learning easier to navigate.",
          text: "The challenge was to translate educational requirements into a clear, accessible digital experience that works across different devices and user needs.",
          image: "/projects/auroscholar-screen-1.webp",
          imageSide: "left",
        },
        {
          number: "03",
          label: "My Approach",
          tone: "sky",
          heading: "One learning experience. Two platforms.",
          text: "I focused on creating clear user journeys and consistent interface patterns across web and Android, adapting the experience to each platform's needs.",
          visual: {
            kind: "flow",
            steps: ["Understand users & needs", "Map learning journeys", "Design & iterate", "Adapt for Web & Android", "Refine & support launch"],
          },
        },
        {
          number: "04",
          label: "The Design",
          tone: "blush",
          heading: "Designed for different screens. Built around learners.",
          text: "The interfaces use clear visual hierarchy, intuitive navigation, and consistent design patterns to make learning easier to explore across platforms.",
          image: "/projects/auroscholar-screen-2.webp",
          imageSide: "right",
        },
        {
          number: "05",
          label: "Design in Detail",
          tone: "white",
          heading: "Consistency where it matters. Flexibility where it counts.",
          text: "The design balances a cohesive product experience with the different interaction patterns of desktop and mobile devices.",
          visual: {
            kind: "cards",
            cards: [
              {
                title: "Home",
                text: "A central hub for learning, quizzes, progress, and rewards.",
                image: "/projects/auroscholar-home.webp",
              },
              {
                title: "Select Concepts",
                text: "Choose your learning concepts and start topic-wise quizzes.",
                image: "/projects/auroscholar-select-concepts.webp",
              },
              { title: "Assessments", text: "Simple and clear question interface.", image: "/projects/auroscholar-assessments.webp" },
              {
                title: "National Ranking",
                text: "Recognising top learners at national, state, district, and school levels.",
                image: "/projects/auroscholar-national-ranking.webp",
              },
            ],
          },
        },
        {
          number: "06",
          label: "Outcome",
          tone: "paper",
          heading: "A connected digital learning experience.",
          text: "The project brought the web and Android experiences together through a consistent design approach, supporting the platform's educational purpose across devices.",
          visual: {
            kind: "stats",
            stats: [
              { icon: "users", value: "~2M+", label: "Users (mentioned)" },
              { icon: "school", label: "Supporting students across India" },
              { icon: "sprout", label: "Holistic education approach" },
              { icon: "heart", label: "A step towards a brighter, kinder tomorrow" },
            ],
          },
          imageSide: "right",
        },
      ],
      closing: {
        heading: "Better digital experiences begin with understanding people.",
        text: "AuroScholar reflects my approach to product design: translating complex requirements into clear, thoughtful, and accessible experiences.",
        image: "/projects/auroscholar-closing.webp",
        cta: { label: "Get the app", to: "https://play.google.com/store/apps/details?id=com.auro.application&hl=en_IN" },
      },
    },
  },
  {
    title: "Project Inclusion",
    tier: "selected",
    summary: "Designed digital experiences supporting the inclusion of children with special needs in mainstream school environments.",
    tag: "Inclusive education · EdTech",
    question: "Digital experiences supporting inclusion in mainstream schools.",
    img: "",
    context: "Project Inclusion focuses on supporting inclusive education. Inclusive education involves different needs and stakeholders.",
  },
  {
    title: "LAT Examination — KVS",
    tier: "selected",
    summary: "Designed examination coordination interfaces connecting teacher mapping, student information, OMR handling, and upload workflows.",
    tag: "Education operations · Examination workflow",
    question: "Examination coordination interfaces for KVS.",
    img: "",
    context: "The LAT examination workflow included coordinator spreadsheets, teacher mapping, student fields, offline OMR sheets, and OMR upload. The workflow spans information prepared or collected offline and steps managed digitally.",
  },
  {
    title: "Exploring Protopie",
    tier: "playground",
    services: "Prototyping",
    client: "For Learning",
    context: "A dashboard has to be structured carefully, or it overwhelms the people using it. Before designing, I asked who would use it, what their main goals were, and which actions it should support.",
    solution: "I used collapsible panels and tabs to group secondary data, highlighted key metrics at the top, and let people explore charts for more detail. Micro-interactions made the prototype feel alive: hover details, simulated live data and drag-and-drop layouts. ProtoPie let me test these interactions early, before committing to the final design.",
    year: "2024",
    tag: "Product design",
    question: "Full case study on my Framer portfolio.",
    img: "/projects/exploring-protopie.png",
  },
  {
    title: "Bugchyo",
    tier: "selected",
    summary: "Exploring a distinctive brand and shopping experience for Bugchyo, inspired by a traditional Rajasthani bag or box.",
    tag: "Brand identity · E-commerce concept",
    question: "Brand and e-commerce concept inspired by a Rajasthani term.",
    img: "",
    context: "Bugchyo is a product-focused brand concept built around a traditional Rajasthani term. The project explores how cultural inspiration can inform a contemporary identity and a focused e-commerce experience for a single product. The design challenge is to create a recognisable identity and a shopping experience that makes one hero product feel distinctive, useful, and desirable.",
    outcome: "A coherent brand and digital-commerce direction for a focused product concept.",
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
        subtitle: "Built, not just drawn",
      },
    }),
    []
  );
  const preview = useHoverPreview(previewItems);
  useHeroAboutParallax();

  // Intro autoplay: overlay plays first, hero copy appears 1s after reveal.
  const [introDone, setIntroDone] = useState(hasIntroPlayed);
  const [copyOn, setCopyOn] = useState(false);
  useEffect(() => {
    if (!introDone) return;
    const t = window.setTimeout(() => setCopyOn(true), 1000);
    return () => window.clearTimeout(t);
  }, [introDone]);

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

        {/* SELECTED WORK — Boutique grid with clip-mask reveals */}
        <div className="px-6 sm:px-8 md:px-[120px]">
          {/* Only projects with a cover image; the Work page shows the rest with placeholders. */}
          <SelectedWorks items={WORK.filter((p) => p.img).map((p) => ({ title: p.title, tag: p.tag, img: p.img }))} />
          <div className="pb-20 pt-4">
            <ToolkitStrip />
          </div>
        </div>

        {/* Page gutters — 120px sides on desktop, hero stays full-bleed */}
        <div className="px-6 sm:px-8 md:px-[120px]">

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
            className="absolute bottom-0 left-0 h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_35%)]"
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

          {/* Kind words from collaborators, below the lab */}
          <div className="py-20 md:py-24">
            <ClientTestimonials />
          </div>

          {/* CHAPTER 06 — WHAT'S NEXT */}
          <section id="contact" className="relative -mx-6 snap-start px-6 sm:-mx-8 sm:px-8 md:-mx-[120px] md:px-[120px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 inset-x-0 bottom-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
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
              <p className="mt-6 text-base font-medium text-white md:text-lg">
                Available for freelance, contract, full-time and short advisory sprints.
              </p>
              <ContactForm />
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
    {!introDone && (
      <IntroSequence
        onDone={() => {
          markIntroPlayed();
          setIntroDone(true);
        }}
      />
    )}
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
        <Route path="/work/:slug" element={<ProjectDetail />} />
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
          { label: "Start a project", href: "mailto:abhinesh.productdesign@gmail.com" },
          { label: "View résumé", href: "/resume.pdf" },
        ]}
        secondaryPills={[
          { label: "Designer", href: "#mindset" },
          { label: "Thinker", href: "#build" },
          { label: "Builder", href: "#lab" },
          { label: "Email", href: "mailto:abhinesh.productdesign@gmail.com" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/abhibhadoria/" },
        ]}
        brandName="ABHINESH B."
        copyright="© 2026 Abhinesh. All rights reserved."
      />

    </div>
  );
}
