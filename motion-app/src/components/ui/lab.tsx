"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { WordsPullUp } from "@/components/ui/prisma-hero";

// The Rive runtime and the file load on demand, so they stay out of the main bundle.
const RiveEmbed = lazy(() => import("@/components/ui/rive-embed"));

/* ---------------- Chapter 05 — The lab ----------------
   Reference layout: numbered label, headline + copy left, explore link
   right, six thumbnail cards. Answers: WHAT IS HE EXPLORING? */

const TOPICS = [
  {
    label: "AI and products",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Interaction ideas",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Prototypes",
    img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Coding for fun",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Reusable design parts",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=70",
  },
  {
    label: "Early product ideas",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=70",
  },
];

const CARD_HREF = "/allprojects#playground";

export function Lab() {
  const navigate = useNavigate();
  // The Rive layer covers the cards and takes the pointer, so the cards track their own hover and click from its events.
  const [hovered, setHovered] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  // The figure is for wider screens only. On phones it is not loaded at all.
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Index of the card under a viewport point, or -1.
  const cardAt = (x: number, y: number) =>
    cardRefs.current.findIndex((el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    });

  return (
    <section id="lab" className="py-20 md:py-28 snap-start">
      <div className="relative">
        {/* Full viewport width, over the heading and cards. The figure gets the real pointer, and the cards get it from the same events. */}
        {wide && (
        <Suspense fallback={null}>
          <div
            className="absolute left-1/2 top-0 z-20 h-full w-screen -translate-x-1/2"
            onPointerMove={(e) => {
              const i = cardAt(e.clientX, e.clientY);
              setHovered(i >= 0 ? i : null);
            }}
            onPointerLeave={() => setHovered(null)}
            onClick={(e) => {
              const i = cardAt(e.clientX, e.clientY);
              if (i >= 0) navigate(CARD_HREF);
            }}
          >
            <RiveEmbed
              src="/rive/look.riv"
              artboard="Artboard"
              stateMachine="State Machine 1"
              className="h-full w-full"
            />
          </div>
        </Suspense>
        )}

        <div className="relative h-[140px] md:h-[330px]">
          <div className="absolute bottom-6 left-0">
            <h2 className="font-display mt-4 max-w-3xl text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              <WordsPullUp text={"Things I'm\nfiguring out."} />
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              A space for experiments, ideas, and creative detours.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOPICS.map((topic, i) => (
            <motion.a
              key={topic.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={CARD_HREF}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className={`overflow-hidden rounded-xl border bg-black/40 backdrop-blur-sm transition-colors duration-300 ${
                hovered === i ? "border-white/25" : "border-white/10"
              }`}
            >
              <p className="flex items-center gap-2 px-4 pt-3 text-[11px] font-medium text-neutral-300">
                <span aria-hidden className="h-1.5 w-1.5 bg-[#FF4B16]" />
                {topic.label}
              </p>
              <div className="overflow-hidden px-3 pb-3 pt-2">
                <img
                  src={topic.img}
                  alt=""
                  loading="lazy"
                  className={`aspect-[4/5] w-full rounded-lg object-cover transition-transform duration-500 ${
                    hovered === i ? "scale-[1.04]" : "scale-100"
                  }`}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
