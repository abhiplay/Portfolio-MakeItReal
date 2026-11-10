// The URL slug for a project title, used in /work/:slug and for matching projects to their routes.
export const slugOf = (title: string) =>
  title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
