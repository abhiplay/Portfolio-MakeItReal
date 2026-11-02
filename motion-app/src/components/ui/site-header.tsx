"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { smoothScrollToHref } from "@/components/ui/prisma-hero";

/* ---------------- Site header ----------------
   Fixed top bar per the mockup: ABHI mark left, chapter links centered,
   Let's-talk pill right. Transparent over the hero, fine over dark sections. */

const LINKS = [
  { label: "Work", href: "/allprojects" },
  { label: "Process", href: "#build" },
  { label: "Play", href: "#lab" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  // Transparent over the hero; gains a blurred backdrop once scrolled.
  const [scrolled, setScrolled] = useState(false);

  // Chapter anchors live on home; from /allprojects, go home first.
  const goSection = (href: string) => (e: MouseEvent) => {
    if (!href.startsWith("#") || href.length < 2) return;
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => smoothScrollToHref(href), 120);
    } else {
      smoothScrollToHref(href);
    }
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled((s) => {
        const next = window.scrollY > 24;
        return s === next ? s : next;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 motion-reduce:transition-none ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-[120px] md:py-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            // From another page, go home; the route change scrolls to the top.
            if (location.pathname !== "/") {
              navigate("/");
              return;
            }
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              window.scrollTo(0, 0);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="justify-self-start text-xl font-extrabold tracking-tight text-white"
        >
          ABHINESH B.
        </a>

        <nav className="hidden items-center gap-8 justify-self-center md:flex lg:gap-12">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={goSection(item.href)}
              className="text-base text-[#E1E0CC]/70 transition-colors hover:text-[#FF5400]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Hidden on project pages, where the hero has its own Let's Talk button. */}
        {!location.pathname.startsWith("/work/") && (
        <a
          href="#contact"
          onClick={goSection("#contact")}
          className="inline-flex items-center gap-2 justify-self-end rounded-full border border-white/10 bg-black px-6 py-2.5 text-base font-medium text-white glass-hover"
        >
          <span className="relative">
            Let&apos;s talk
            <svg
              aria-hidden
              viewBox="0 0 80 8"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-[5px] w-full text-[#FF4B16]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 6 C 25 2, 55 2, 78 5" pathLength="100" className="cta-underline" />
            </svg>
          </span>
          <span aria-hidden className="h-2 w-2 rounded-full bg-[#FF4B16]" />
        </a>
        )}
      </div>
    </header>
  );
}
