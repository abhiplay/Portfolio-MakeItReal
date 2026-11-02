// Pulls the last year of GitHub contributions for one user and writes them to
// public/data/contributions.json, which the home page's skyline reads.
//
// Usage (the token stays in your shell, never in the repo):
//   GITHUB_TOKEN=<token> GITHUB_LOGIN=abhiplay node scripts/sync-contributions.mjs
//
// The token only needs read access to public data (a classic token with no
// scopes, or a fine-grained token with no repository permissions, both work).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const token = process.env.GITHUB_TOKEN;
const login = process.env.GITHUB_LOGIN || "abhiplay";

if (!token) {
  console.error("GITHUB_TOKEN is not set. See the comment at the top of this file.");
  process.exit(1);
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "motion-app-contributions-sync",
  },
  body: JSON.stringify({ query: QUERY, variables: { login } }),
});

if (!res.ok) {
  console.error(`GitHub API responded ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const body = await res.json();
if (body.errors?.length) {
  console.error("GitHub GraphQL errors:", body.errors.map((e) => e.message).join("; "));
  process.exit(1);
}
const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar) {
  console.error(`No contribution calendar found for "${login}".`);
  process.exit(1);
}

const days = calendar.weeks
  .flatMap((w) => w.contributionDays)
  .map((d) => ({ date: d.date, count: d.contributionCount }));

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, "..", "public", "data", "contributions.json");
await mkdir(dirname(outFile), { recursive: true });
await writeFile(
  outFile,
  JSON.stringify({ login, total: calendar.totalContributions, updatedAt: new Date().toISOString(), days }, null, 2) + "\n",
);

console.log(`Wrote ${days.length} days (${calendar.totalContributions} contributions) for ${login} to ${outFile}`);
