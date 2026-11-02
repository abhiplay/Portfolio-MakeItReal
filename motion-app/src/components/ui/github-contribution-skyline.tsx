"use client";

import { useEffect, useState } from "react";
import ContributionSkyline, { type ContributionDay } from "@/components/ui/contribution-skyline";

// Written by `npm run sync:contributions` (scripts/sync-contributions.mjs).
const DATA_URL = "/data/contributions.json";

type Synced = { login: string; total: number; updatedAt: string; days: ContributionDay[] };

/* Shows real GitHub activity from the synced file. While the file is loading
   nothing renders. If the file is missing or malformed, a note asks for a sync
   instead of inventing numbers: no fake totals reach the heading or the
   accessible label. */
export function GithubContributionSkyline() {
  const [state, setState] = useState<{ status: "loading" } | { status: "ready"; data: Synced } | { status: "missing" }>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    fetch(DATA_URL)
      .then((r) => (r.ok ? (r.json() as Promise<Synced>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!cancelled) setState(Array.isArray(data?.days) ? { status: "ready", data } : { status: "missing" });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return null;

  if (state.status === "missing") {
    return (
      <section className="rounded-xl border border-white/10 bg-black/40 p-6 text-sm text-neutral-400">
        GitHub activity is not synced yet. Run <code className="text-neutral-200">npm run sync:contributions</code> to load it.
      </section>
    );
  }

  const { data } = state;
  return (
    <ContributionSkyline
      data={data.days}
      footer={`Synced from GitHub @${data.login} on ${new Date(data.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
    />
  );
}
