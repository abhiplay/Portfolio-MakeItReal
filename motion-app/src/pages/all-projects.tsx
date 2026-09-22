import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { WORK } from "@/App";

/* ---------------- /allprojects ----------------
   Full project archive. Home shows best + latest only;
   everything lives here. Content comes from the same
   data-driven WORK list — no duplication. */

export function AllProjects() {
  return (
    <main className="relative z-10 bg-background border-b border-white/10 shadow-md rounded-b-3xl">
      <section className="px-6 sm:px-8 md:px-[120px] pt-28 md:pt-36 pb-16 md:pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-neutral-400">
          Archive — {String(WORK.length).padStart(2, "0")} projects
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
          All projects.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Every problem I&apos;ve had the chance to get my hands dirty with —
          best, latest, and everything in between.
        </p>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {WORK.map((p, i) => (
            <div key={p.title} className="flex items-center gap-5 py-5 md:gap-8">
              <span className="shrink-0 text-[11px] tracking-[0.3em] text-neutral-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={p.img.replace("w=1200", "w=400")}
                alt={p.title}
                loading="lazy"
                className="hidden h-16 w-24 shrink-0 rounded-lg border border-white/10 object-cover sm:block"
              />
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                  {p.tag}
                  {p.featured ? " · Best" : ""}
                  {p.isNew ? " · Latest" : ""}
                </p>
                <h3 className="mt-1 truncate text-xl font-bold text-white md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-400">{p.question}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="mailto:hello@abhinesh.design"
          className="mt-10 inline-block rounded-full bg-white px-10 py-5 text-sm font-bold text-black transition-colors hover:bg-neutral-200"
        >
          LET&apos;S TALK ↗
        </a>
      </section>
    </main>
  );
}
