"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  Box,
  BarChart3,
  Code,
  FileText,
  Heart,
  Laptop,
  Layers,
  LayoutGrid,
  Network,
  PenTool,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Upload,
  User,
  X,
} from "lucide-react";
import type { WorkItem } from "@/App";
import { ImageComparison } from "@/components/ui/image-comparison-slider";
import "@/components/ui/cover-transition.css";
import { COPY_NAME, COVER_NAME, isMorphDestination } from "@/lib/project-morph";
import { slugOf } from "@/lib/slug";

/* Metadrob case study. Wording is the approved reference's own. Screens are
   exports from the Metadrob Figma file (Super Admin V1.0.1). The +200%
   figure is the only metric in the reference. */

const ACCENT = "#FF5400";

// One type scale and one spacing rule for the whole page. Sizes are in px (the page root is 14px).
const SECTION = "px-6 py-20 sm:px-8 md:px-[120px] md:py-28";
const TYPE = {
  eyebrow: "text-[14px] font-semibold uppercase tracking-[0.18em]",
  h2: "font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]",
  h3: "font-display text-[24px] font-bold leading-[1.2]",
  lead: "text-[17px] leading-[1.6] md:text-[19px]",
  body: "text-[17px] leading-[1.6]",
  label: "text-[16px] leading-snug",
};
// font-display sets an expanded width in plain CSS, so headings reset it inline to the normal width.
const NORMAL_WIDTH = { fontStretch: "100%" };

// Each section fades and rises as it scrolls into view. CSS scroll-driven, no JS.
// Switched off for users who prefer reduced motion.
const MOTION_CSS = `
.mb-reveal { animation: mb-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
@keyframes mb-reveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .mb-reveal, .mb-reveal * { animation: none !important; transition: none !important; } }
.mb-chip { animation: mb-chip-float 3.6s ease-in-out infinite; }
@keyframes mb-chip-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@media (prefers-reduced-motion: reduce) { .mb-chip { animation: none !important; } }
.mb-draw { stroke-dasharray: 100; stroke-dashoffset: 100; animation: mb-draw-in linear both; animation-timeline: view(); animation-range: entry 10% cover 40%; }
@keyframes mb-draw-in { to { stroke-dashoffset: 0; } }
.mb-pulse { animation: mb-pulse 2.4s ease-out infinite; }
@keyframes mb-pulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%, -50%) scale(3.4); opacity: 0; } }
.mb-float { animation: mb-float 6s ease-in-out infinite; }
@keyframes mb-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .mb-draw { stroke-dashoffset: 0 !important; animation: none !important; } .mb-pulse, .mb-float { animation: none !important; } }
`;

const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <p className={`flex items-center gap-3 ${TYPE.eyebrow} ${light ? "text-[#BF4300]" : "text-neutral-400"}`}>
    <span aria-hidden className="h-[2px] w-6" style={{ backgroundColor: ACCENT }} />
    {children}
  </p>
);

const Heading = ({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) => (
  <h2 className={`${TYPE.h2} ${light ? "text-[#17130f]" : "text-white"} ${className}`} style={NORMAL_WIDTH}>
    {children}
  </h2>
);

/* ---------------- Hero ---------------- */
const HERO_BAG = "/projects/metadrob/hero-bag.webp";

const HERO_META = [
  { icon: User, label: "Role", value: "Founding Designer" },
  { icon: Layers, label: "Scope", value: "End-to-end Product Design" },
  { icon: Laptop, label: "Platform", value: "Web / 3D Commerce" },
  { icon: Box, label: "Product", value: "Metadrob" },
];

export function MetadrobHero({ p }: { p: WorkItem }) {
  // The card cover, so the morph from the card lands on the same picture.
  const scene = p.img ?? p.heroScreen ?? p.heroImg;
  // Named only on the page a card morph is taking the reader to.
  const destination = isMorphDestination(slugOf(p.title));
  return (
    <section className="relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden">
      {/* One named box for the photo and both scrims, so the scrims move with the photo and nothing steps at the handoff. */}
      <div data-project-cover="" style={destination ? { viewTransitionName: COVER_NAME } : undefined} className="hero-cover absolute inset-0 -z-10 overflow-hidden">
        {scene && (
          <img
            src={scene}
            alt="Virtual Metadrob store with a mannequin on a display plinth"
            className="h-full w-full object-cover object-[70%_50%]"
          />
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#1a1009]/55 md:hidden" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1009]/85 via-[#1a1009]/40 to-transparent"
        />
      </div>
      <div data-hero-copy="" style={destination ? { viewTransitionName: COPY_NAME } : undefined} className="relative flex flex-1 flex-col px-6 pb-10 pt-32 sm:px-8 md:px-[120px]">
        <p className={`hero-rise hero-rise-1 ${TYPE.eyebrow} text-white/90`}>Product design case study</p>
        <h1 className="hero-rise hero-rise-2 font-display mt-6 max-w-[620px] text-[clamp(2.75rem,5vw,4.9rem)] font-bold leading-[1.02] tracking-[-0.025em] text-white">
          Shopping should feel like an{" "}
          <span className="bg-gradient-to-r from-[#FFD2B8] to-[#FF9A6B] bg-clip-text text-transparent">experience.</span>
        </h1>
        <p className={`hero-rise hero-rise-3 mt-8 max-w-[520px] text-white/80 ${TYPE.lead}`}>
          I helped design Metadrob, a 3D commerce platform that gives merchants the tools to build immersive virtual stores
          and customers a new way to explore digital retail.
        </p>

        <ul className="hero-rise hero-rise-4 mt-auto grid grid-cols-2 gap-x-6 gap-y-8 pt-14 md:flex md:gap-0">
          {HERO_META.map(({ icon: Icon, label, value }, i) => (
            <li
              key={label}
              className={`flex flex-col gap-2 md:px-8 md:first:pl-0 ${i > 0 ? "md:border-l md:border-white/15" : ""}`}
            >
              <Icon className="h-5 w-5 text-white/90" aria-hidden />
              <span className={`${TYPE.label} font-medium text-white`}>{label}</span>
              <span className={`${TYPE.label} text-white/60`}>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="hero-rise hero-rise-5 absolute right-[5%] top-[26%] hidden w-[clamp(190px,14vw,220px)] rounded-[22px] border border-white/30 bg-white/15 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:block"
      >
        <X className="ml-auto block h-4 w-4 text-white" />
        <div className="relative mt-3 aspect-square overflow-hidden rounded-[14px] bg-[#EFEBE8]">
          <img src={HERO_BAG} alt="" className="h-full w-full object-cover" />
          <Heart className="absolute right-3 top-3 h-4 w-4 text-neutral-900" />
        </div>
        <p className={`mt-4 font-medium text-white ${TYPE.label}`}>Leather Handbag</p>
        <p className={`text-white/80 ${TYPE.label}`}>$129</p>
        <div className="mt-3 flex gap-2">
          <span
            className="h-3.5 w-3.5 rounded-full ring-2 ring-white/80 ring-offset-2 ring-offset-transparent"
            style={{ backgroundColor: "#8B4A24" }}
          />
          <span className="h-3.5 w-3.5 rounded-full bg-[#1f1f1f]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#E9DCCB]" />
        </div>
        <div className={`mt-4 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 font-semibold text-black ${TYPE.label}`}>
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Add to Cart
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sections below the hero ---------------- */
// 1200 px wide, resampled from the 500 px original, so the cards show it sharper on retina screens.
const METADROB_STUDIO = "/projects/metadrob/metadrob-studio-hd.webp";
// 1200 px wide, resampled from the 306 px original, so the card shows it sharper on retina screens.
const PUBLISH_MODAL = "/projects/metadrob/publish-modal-hd.webp";

// Backdrop pre-set to the panel colour, so the clip needs no mask or overlay.
const PROCESS_CAT = "/projects/metadrob/process-cat-clean.webp";
const PROCESS_CAT_VIDEO = "/projects/metadrob/cat-laptop-clean.mp4";

const PROCESS = [
  { icon: Search, title: "Discover", text: "Understand merchant needs, user goals and market gaps.", art: "/projects/metadrob/process-discover.webp", peach: false },
  { icon: Target, title: "Define", text: "Frame the core problem, user personas and success metrics.", art: "/projects/metadrob/process-define.webp", peach: true },
  { icon: PenTool, title: "Design", text: "Explore concepts, user flows and immersive UI for both creation and shopping.", art: "/projects/metadrob/process-design.webp", peach: false },
  { icon: Code, title: "Build", text: "Ship a scalable, no-code 3D store editor with a modular system.", art: "/projects/metadrob/process-build.webp", peach: true },
  { icon: Rocket, title: "Validate", text: "Test with merchants and shoppers, refine and iterate for impact.", art: "/projects/metadrob/process-validate.webp", peach: false },
];

const DELIVERABLES = [
  { icon: Network, label: "User Flows" },
  { icon: Layers, label: "Wireframes" },
  { icon: Box, label: "3D UI & Interactions" },
  { icon: LayoutGrid, label: "Design System" },
  { icon: FileText, label: "Prototype" },
  { icon: BarChart3, label: "Usability Testing" },
];

const TRADITIONAL_STORE = "/projects/metadrob/traditional-store.webp";
const METADROB_MARK = "/projects/metadrob/metadrob-mark.webp";
const VIRTUAL_STORE = "/projects/metadrob/virtual-store.webp";

const TRADITIONAL = [
  { icon: LayoutGrid, label: "Static browsing" },
  { icon: Search, label: "Limited discovery" },
  { icon: Layers, label: "No brand experience" },
];

const METADROB = [
  { icon: Box, label: "Explore in 3D" },
  { icon: Sparkles, label: "Discover naturally" },
  { icon: Store, label: "A richer brand experience" },
];

// The three steps in the Product Ecosystem row. Every card has the same structure; only the content differs.
const ECOSYSTEM = [
  {
    icon: Box,
    title: "Create",
    subtitle: "Build your virtual store",
    text: "A no-code 3D editor for merchants to design, customise and bring their brand to life.",
    image: METADROB_STUDIO,
    alt: "Metadrob Studio editor showing a 3D store scene with transform controls",
    imagePosition: "object-[50%_50%]",
    tone: "bg-[#F1EEFA]",
    tile: "bg-[#E4DDF8]",
    iconColor: "text-[#6B4FD8]",
  },
  {
    icon: Upload,
    title: "Publish",
    subtitle: "Make it live and share",
    text: "Preview, publish and share your store with a link, QR code or embed.",
    image: PUBLISH_MODAL,
    alt: "Publish Store dialog with the store link, QR code and embed code",
    imagePosition: "object-[50%_30%]",
    tone: "bg-[#FEF6F2]",
    tile: "bg-[#FFDDBE]",
    iconColor: "text-[#FF5400]",
  },
  {
    icon: ShoppingBag,
    title: "Explore",
    subtitle: "Step into the store and shop",
    text: "A rich, interactive shopping experience where customers can explore, discover and buy in 3D.",
    image: VIRTUAL_STORE,
    alt: "A shopper walking through a 3D store with handbags on display",
    imagePosition: "object-[30%_50%]",
    tone: "bg-[#F1EEFA]",
    tile: "bg-[#E4DDF8]",
    iconColor: "text-[#6B4FD8]",
  },
];

// Callouts sit around the laptop. Positions are percentages of the illustration (lg and up), and the
// connector paths and anchor dots use the same coordinates.
const IMPACT_CALLOUTS = [
  {
    icon: Box,
    title: "Explore in 3D",
    text: "Customers can explore, discover and buy in 3D.",
    pos: "lg:left-[37%] lg:top-0 lg:w-[31%]",
    path: "M37 9 C30 9 33 18 34.2 25",
    anchor: { x: 34.2, y: 25 },
    color: "#7C5CF6",
  },
  {
    icon: Sparkles,
    title: "Discover naturally",
    text: "Found by exploring, not by scrolling.",
    pos: "lg:left-[76%] lg:top-[23%] lg:w-[24%]",
    path: "M76 28 C73 28 72 33 70 40",
    anchor: { x: 70, y: 40 },
    color: ACCENT,
  },
  {
    icon: Store,
    title: "A richer brand experience",
    text: "The spatial feel of physical retail, online.",
    pos: "lg:left-[76%] lg:top-[51%] lg:w-[24%]",
    path: "M76 58 C73 58 72 62 70 62",
    anchor: { x: 70, y: 62 },
    color: "#7C5CF6",
  },
];

// The three outcomes. Only the +200% figure is real; the other two use wording from the page.
const OUTCOMES = [
  {
    icon: PenTool,
    title: "Build without code",
    text: "A no-code 3D editor for merchants to design, customise and bring their brand to life.",
    chip: "No-code",
    caption: "for merchants",
    tile: "bg-[#E2DCF8]",
    iconColor: "text-[#6B4FD8]",
  },
  {
    icon: Sparkles,
    title: "Richer engagement",
    text: "Shoppers explore and discover products in 3D.",
    chip: "+200%",
    caption: "new registrations",
    tile: "bg-[#FFE3CC]",
    iconColor: "text-[#FF5400]",
  },
  {
    icon: Layers,
    title: "Greater flexibility",
    text: "A scalable design system that adapts to different brands and stores.",
    chip: "Scalable",
    caption: "design system",
    tile: "bg-[#E2DCF8]",
    iconColor: "text-[#6B4FD8]",
  },
];

export function MetadrobSections({ p: _p }: { p: WorkItem }) {
  return (
    <>
      <style>{MOTION_CSS}</style>

      {/* Overview: a light band straight under the hero. Not mb-reveal: it sits above the fold. */}
      <section className={`${SECTION} bg-[#FBF7F4] text-[#17130f]`}>
        <Eyebrow light>Overview</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1fr_auto_1.27fr] xl:items-stretch xl:gap-x-16">
          <Heading light className="max-w-[560px] text-balance">
            A 3D commerce platform for the next generation of digital retail.
          </Heading>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <div className={`max-w-xl space-y-6 text-[#1A1615] xl:max-w-none ${TYPE.lead}`}>
            <p>
              Metadrob explored a new approach to online shopping — bringing the spatial and interactive qualities of physical
              retail into the digital world.
            </p>
            <p>
              I designed the product from the ground up, covering the merchant-facing store creation platform and the
              customer-facing virtual shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* The Opportunity: a light band with a before-and-after slider. */}
      <section className={`${SECTION} bg-[#FBF7F4] text-[#17130f]`}>
        <Eyebrow light>The Opportunity</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1.3fr_auto_1fr] xl:items-stretch xl:gap-x-16">
          <Heading light className="max-w-[720px]">
            What if an online store felt more like a real store?
          </Heading>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <p className={`max-w-xl text-[#1A1615] xl:max-w-none ${TYPE.lead}`}>
            Physical retail offers something traditional e-commerce struggles to replicate: the freedom to explore, discover
            and experience a brand’s world. Metadrob set out to bring that spatial and interactive experience into the digital
            world.
          </p>
        </div>

        <div className="mt-16">
          {/* Each label stays over its own half, even when it wraps on narrow screens. */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <p
              className={`inline-flex max-w-[calc(50%-6px)] items-center rounded-[24px] bg-white px-6 py-3 font-medium text-[#17130f] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)] ${TYPE.label}`}
            >
              Traditional E-commerce
            </p>
            <p
              className={`inline-flex max-w-[calc(50%-6px)] items-center gap-2 rounded-[24px] bg-white px-6 py-3 font-medium text-[#17130f] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)] ${TYPE.label}`}
            >
              <img src={METADROB_MARK} alt="" aria-hidden className="h-[26px] w-auto shrink-0" />
              A Virtual Retail Experience with Metadrob
            </p>
          </div>

          {/* The slider shows afterImage to the left of the handle and beforeImage to the right,
              so the traditional mock is passed as afterImage to sit under its label on the left. */}
          <ImageComparison
            afterImage={TRADITIONAL_STORE}
            beforeImage={VIRTUAL_STORE}
            altAfter="A traditional e-commerce handbag page: a hero banner and the top of a product grid"
            altBefore="A virtual 3D handbag store with a product card and store navigation"
            afterObjectPosition="50% 0%"
            beforeObjectPosition="50% 50%"
            className="aspect-[1.75/1] md:aspect-[16/9]"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <ul className="grid grid-cols-3 gap-4 text-center">
              {TRADITIONAL.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-4 rounded-[20px] border border-transparent px-3 py-5">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#E5E5E7]">
                    <Icon className="h-[26px] w-[26px] text-[#1A1615]" aria-hidden />
                  </span>
                  <span className={`${TYPE.label} text-[#2A2622]`}>{label}</span>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-3 gap-4 text-center">
              {METADROB.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-4 rounded-[20px] border border-[#FF5400]/25 bg-white px-3 py-5 shadow-[0_12px_30px_-14px_rgba(255,84,0,0.45)] transition duration-300 hover:-translate-y-1"
                >
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FF5400] shadow-[0_8px_18px_-8px_rgba(255,84,0,0.7)]">
                    <Icon className="h-[26px] w-[26px] text-white" aria-hidden />
                  </span>
                  <span className={`${TYPE.label} font-semibold text-[#17130f]`}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Product Ecosystem: a light band with three steps. No scroll reveal, so it never shows up faded. */}
      <section className={`${SECTION} bg-[#FAF9FD] text-[#0E0E1F]`}>
        <Eyebrow light>The Product Ecosystem</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1.65fr_auto_1fr] xl:items-stretch xl:gap-x-16">
          <Heading light className="max-w-[780px]">
            One platform, two experiences, a complete commerce loop.
          </Heading>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <p className={`max-w-xl text-[#3A3A4A] xl:max-w-none ${TYPE.lead}`}>
            Metadrob connects the merchant’s creative workflow with the customer’s immersive shopping experience, forming a
            complete 3D commerce ecosystem, from building and publishing to exploring and buying.
          </p>
        </div>

        {/* Stacked below xl so the cards never squeeze. At xl the arrows sit in the gaps between cards. */}
        <div className="mt-16 grid grid-cols-1 gap-6 xl:grid-cols-[1.31fr_1fr_1.28fr] xl:items-stretch xl:gap-x-4">
          {ECOSYSTEM.map((step, i) => (
            <article key={step.title} className={`relative flex flex-col rounded-[28px] px-4 pb-8 pt-[30px] ${step.tone}`}>
              <div className="flex items-center gap-7 px-[26px]">
                <span className={`flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[22px] ${step.tile}`}>
                  <step.icon className={`h-[44px] w-[44px] ${step.iconColor}`} aria-hidden />
                </span>
                <div>
                  <h3 className={`${TYPE.h3} text-[#0E0E1F]`} style={NORMAL_WIDTH}>
                    {step.title}
                  </h3>
                  <p className={`mt-1 text-[#3A3A4A] ${TYPE.label}`}>{step.subtitle}</p>
                </div>
              </div>
              <div className="relative mt-7 aspect-[4/3] flex-none overflow-hidden rounded-[18px] xl:aspect-auto xl:min-h-[240px] xl:flex-1 shadow-[0_18px_40px_-22px_rgba(40,20,60,0.35)]">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover ${step.imagePosition}`}
                />
              </div>
              <p className={`mt-6 px-[26px] text-[#2A2A3A] xl:h-[90px] ${TYPE.body}`}>{step.text}</p>
              {i < ECOSYSTEM.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[33px] top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(40,20,60,0.35)] xl:flex"
                >
                  <ArrowRight className="h-5 w-5 text-[#FF5400]" />
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* The Design Process: a light band with five steps and the deliverables. */}
      <section className={`${SECTION} bg-[#F7F5FC] text-[#0E0E1F]`}>
        <Eyebrow light>The Design Process</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1.25fr_auto_1fr] xl:items-stretch xl:gap-x-16">
          <Heading light className="max-w-[640px]">
            From idea to
            <br />
            an immersive store.
          </Heading>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <p className={`max-w-xl text-[#3A3A4A] xl:max-w-none ${TYPE.lead}`}>
            A user-centered, iterative process that turned a complex 3D commerce idea into a simple, scalable product, balancing
            merchant control, customer experience and technical feasibility.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5 xl:gap-x-9">
          {PROCESS.map(({ icon: Icon, title, text, art, peach }, i) => (
            <article
              key={title}
              className={`relative flex flex-col rounded-[28px] p-6 ${peach ? "bg-[#FFF1E6]" : "bg-[#EEEBFB]"}`}
            >
              {i < PROCESS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="absolute -right-[28px] top-[52px] hidden h-5 w-5 text-[#3A3A4A] xl:block"
                />
              )}
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-[16px] ${
                  peach ? "bg-[#FFE3CC]" : "bg-[#E2DCF8]"
                }`}
              >
                <Icon className={`h-6 w-6 ${peach ? "text-[#FF5400]" : "text-[#6B4FD8]"}`} aria-hidden />
              </span>
              <h3 className={`mt-5 ${TYPE.h3} text-[#0E0E1F]`} style={NORMAL_WIDTH}>
                {title}
              </h3>
              <p className={`mt-2 text-[#3A3A4A] ${TYPE.body}`}>{text}</p>
              <div className="mt-auto flex h-[150px] items-end justify-center pt-6">
                <img src={art} alt="" aria-hidden loading="lazy" className="max-h-full w-auto max-w-full object-contain" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 rounded-[28px] bg-white/60 p-6 md:p-10 lg:grid-cols-[300px_1fr] lg:items-center">
          {/* Looping cat animation, muted so autoplay is allowed. Users who ask for reduced motion get the still image. */}
          <div className="mx-auto w-full max-w-[300px]">
            <video
              src={PROCESS_CAT_VIDEO}
              poster={PROCESS_CAT}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="block h-auto w-full motion-reduce:hidden"
            />
            <img
              src={PROCESS_CAT}
              alt=""
              aria-hidden
              loading="lazy"
              className="hidden h-auto w-full motion-reduce:block"
            />
          </div>
          <div>
            <h3 className={`${TYPE.h3} text-[#0E0E1F]`} style={NORMAL_WIDTH}>
              Key Deliverables
            </h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {DELIVERABLES.map(({ icon: Icon, label }, i) => (
                <li
                  key={label}
                  className={`mb-chip flex flex-col items-center gap-3 rounded-[18px] bg-white px-5 py-5 text-center whitespace-nowrap font-medium text-[#17130f] shadow-[0_6px_20px_-12px_rgba(40,20,60,0.25)] ${TYPE.label}`}
                  style={{ animationDelay: `${i * 0.25}s` }}
                >
                  <Icon className="h-6 w-6 text-[#17130f]" strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Impact: a light band with a laptop and callouts, as in the reference. */}
      <section className={`${SECTION} bg-[#F7F5FC] text-[#17130f]`}>
        <p className="inline-flex items-center rounded-full bg-[#FFE7D6] px-5 py-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-[#BF4300]">
          The Impact
        </p>
        <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1.25fr_auto_1fr] xl:items-stretch xl:gap-x-16">
          <h2 className={TYPE.h2} style={NORMAL_WIDTH}>
            Real results, beyond
            <br />
            just a{" "}
            <span className="relative inline-block">
              store.
              <svg
                aria-hidden
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-3 left-0 h-3 w-full overflow-visible"
              >
                <path
                  className="mb-draw"
                  d="M3 16 Q 60 4 120 12 T 197 9"
                  pathLength={100}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h2>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <p className={`max-w-xl text-[#3A3A4A] xl:max-w-none ${TYPE.lead}`}>
            The virtual store transformed how brands showcase and sell products, delivering richer engagement, higher intent,
            and a memorable shopping experience.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-[960px] lg:aspect-[1215/720]">
          <div className="mx-auto w-full mb-float lg:absolute lg:left-0 lg:top-[16.7%] lg:w-[79.8%]">
            <div className="rounded-[18px] bg-[#2B2A35] p-2.5 shadow-[0_40px_80px_-30px_rgba(40,20,60,0.5)]">
              <img
                src={VIRTUAL_STORE}
                alt="The StyleCart virtual store shown on a laptop screen"
                loading="lazy"
                className="aspect-[16/9] w-full rounded-[10px] object-cover"
              />
            </div>
            <div className="mx-auto h-[14px] w-[108%] -translate-x-[4%] rounded-b-[14px] bg-gradient-to-b from-[#D9D6E4] to-[#A9A6B8] shadow-[0_18px_30px_-18px_rgba(40,20,60,0.5)]" />
          </div>

          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {IMPACT_CALLOUTS.map((c) => (
              <path
                key={c.title}
                className="mb-draw"
                d={c.path}
                pathLength={100}
                fill="none"
                stroke={c.color}
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {IMPACT_CALLOUTS.map((c) => (
            <span
              key={`${c.title}-dot`}
              aria-hidden
              className="absolute hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
              style={{ left: `${c.anchor.x}%`, top: `${c.anchor.y}%`, backgroundColor: c.color }}
            >
              <span className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full mb-pulse" style={{ backgroundColor: c.color }} />
            </span>
          ))}

          {IMPACT_CALLOUTS.map(({ icon: Icon, title, text, pos, color }) => (
            <div
              key={title}
              className={`group mt-4 rounded-[20px] bg-white p-5 shadow-[0_18px_40px_-18px_rgba(40,20,60,0.35)] transition duration-300 hover:-translate-y-1 lg:mt-0 lg:absolute lg:p-4 ${pos}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px]" style={{ backgroundColor: `${color}1A` }}>
                <Icon className="h-5 w-5" style={{ color }} aria-hidden />
              </span>
              <p className={`mt-3 font-semibold text-[#17130f] ${TYPE.label}`}>{title}</p>
              <p className={`mt-1 text-[#3A3A4A] ${TYPE.label}`}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion: a light band that closes the page, as in the reference. Replaces The Takeaway. */}
      <section className={`${SECTION} bg-[#F7F5FC] text-[#17130f]`}>
        <Eyebrow light>Conclusion</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-12 xl:grid-cols-[1fr_auto_1fr] xl:gap-x-16">
          <div>
            <h2 className={`${TYPE.h2} max-w-[640px]`} style={NORMAL_WIDTH}>
              A simpler, more immersive way to take commerce into{" "}
              <span className="relative inline-block">
                3D.
                <svg
                  aria-hidden
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-3 left-0 h-3 w-full overflow-visible"
                >
                  <path
                    className="mb-draw"
                    d="M3 16 Q 60 4 120 12 T 197 9"
                    pathLength={100}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </h2>
            <p className={`mt-6 max-w-xl text-[#3A3A4A] ${TYPE.lead}`}>
              Metadrob’s Store Creator turned a complex, 3D-heavy process into an accessible, no-code experience, empowering
              brands to build, customise and launch immersive stores faster.
            </p>
            <div className="relative mt-10 w-full max-w-[560px]">
              <div className="rounded-[18px] bg-[#2B2A35] p-2.5 shadow-[0_40px_80px_-30px_rgba(40,20,60,0.5)]">
                <img
                  src={METADROB_STUDIO}
                  alt="Metadrob Studio editor with a 3D store scene and editing controls"
                  loading="lazy"
                  className="aspect-[500/336] w-full rounded-[10px] object-cover"
                />
              </div>
              <div
                aria-hidden
                className="mx-auto h-[14px] w-[108%] -translate-x-[4%] rounded-b-[14px] bg-gradient-to-b from-[#D9D6E4] to-[#A9A6B8] shadow-[0_18px_30px_-18px_rgba(40,20,60,0.5)]"
              />
            </div>
          </div>
          <div aria-hidden className="hidden w-px bg-[#D9D2CC] xl:block" />
          <div>
            <h3 className={`${TYPE.h3} text-[#17130f]`} style={NORMAL_WIDTH}>
              The Outcome
            </h3>
            <ul className="mt-6 grid gap-4">
              {OUTCOMES.map(({ icon: Icon, title, text, chip, caption, tile, iconColor }) => (
                <li
                  key={title}
                  className="flex items-center gap-5 rounded-[20px] bg-white/70 p-5 shadow-[0_10px_30px_-18px_rgba(40,20,60,0.3)]"
                >
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] ${tile}`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold text-[#17130f] ${TYPE.label}`}>{title}</p>
                    <p className={`mt-1 text-[#3A3A4A] ${TYPE.label}`}>{text}</p>
                  </div>
                  <div className="shrink-0 rounded-[16px] bg-[#F1EEFA] px-4 py-3 text-right">
                    <p className={`${TYPE.h3} text-[#17130f]`} style={NORMAL_WIDTH}>
                      {chip}
                    </p>
                    <p className={`text-[#3A3A4A] ${TYPE.label}`}>{caption}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-6 rounded-[24px] bg-gradient-to-br from-[#FFF1E6] to-[#FFF8F3] p-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FFE3CC]">
                <Target className="h-7 w-7 text-[#FF5400]" aria-hidden />
              </span>
              <div>
                <p className={`${TYPE.h3} text-[#17130f]`} style={NORMAL_WIDTH}>
                  Key Takeaway
                </p>
                <p className={`mt-2 text-[#3A3A4A] ${TYPE.body}`}>
                  Thoughtful product design can make emerging technologies like 3D and immersive commerce practical, usable and
                  valuable for real businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
