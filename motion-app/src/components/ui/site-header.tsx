"use client";

import { useEffect, useState } from "react";
import { smoothScrollToHref } from "@/components/ui/prisma-hero";

/* ---------------- Site header ----------------
   Fixed top bar per the mockup: ABHI mark left, chapter links centered,
   Let's-talk pill right. Transparent over the hero, fine over dark sections. */

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#build" },
  { label: "Play", href: "#lab" },
  { label: "About", href: "#contact" },
];

export function SiteHeader() {
  // Transparent over the hero; gains a blurred backdrop once scrolled.
  const [scrolled, setScrolled] = useState(false);

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
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              window.scrollTo(0, 0);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="justify-self-start text-xl font-extrabold tracking-tight text-white"
        >
          ABHI
        </a>

        <nav className="hidden items-center gap-8 justify-self-center md:flex lg:gap-12">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (smoothScrollToHref(item.href)) e.preventDefault();
              }}
              className="text-base text-[#E1E0CC]/70 transition-colors hover:text-[#E1E0CC]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@abhinesh.design"
          className="inline-flex items-center gap-2 justify-self-end rounded-full border border-white/10 bg-black px-6 py-2.5 text-base font-medium text-white transition-colors hover:border-white/25"
        >
          Let&apos;s talk
          <span aria-hidden className="h-2 w-2 rounded-full bg-[#FF4B16]" />
        </a>
      </div>
    </header>
  );
}
