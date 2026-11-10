import type { MouseEvent } from "react";

/* The card-to-hero morph, shared by every project card and every detail page.

   A click names the card's cover box with COVER_NAME, so the browser moves and resizes it
   into the cover box of the destination hero, which is named the same way on its first render.
   The navigation runs inside the transition's update callback, which returns a promise that
   settles when the destination hero commits, so the browser captures the new page with the
   hero in it. The wait ends on that commit, after a timeout, or on back and forward. */

export const COVER_NAME = "project-cover";
export const COPY_NAME = "hero-copy";

// Every cover box, on cards and on heroes, carries this attribute. Names are cleared from all of
// them before a morph, so two boxes never share a name in the same capture.
const COVER_SELECTOR = "[data-project-cover]";

let pendingSlug: string | null = null;
let resolveLanded: (() => void) | null = null;
let inFlight = false;

// True on the page a morph is taking the reader to. Read during render, so the destination
// hero is named from its first commit. It stays true until the next morph, which is harmless:
// names only matter while a transition is running.
export function isMorphDestination(slug: string): boolean {
  return pendingSlug === slug;
}

// Called from the detail page's layout effect, so it runs in the commit that puts the hero on screen.
export function markHeroLanded(slug: string): void {
  if (pendingSlug === slug && resolveLanded) resolveLanded();
}

// Handles a card click. Leaves modified clicks and browsers without View Transitions to the Link.
export function openWithMorph(e: MouseEvent<HTMLAnchorElement>, slug: string, navigate: (to: string) => void): void {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (!("startViewTransition" in document)) return;
  e.preventDefault();
  // A second activation while the morph waits would navigate twice, so it is ignored.
  if (inFlight) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cover = e.currentTarget.querySelector<HTMLElement>(COVER_SELECTOR);
  document.querySelectorAll<HTMLElement>(COVER_SELECTOR).forEach((el) => el.style.removeProperty("view-transition-name"));
  // With reduced motion, or a card without a cover box, the transition is only the root fade.
  if (cover && !reduce) cover.style.setProperty("view-transition-name", COVER_NAME);

  pendingSlug = slug;
  inFlight = true;
  document.startViewTransition(() => {
    const landed = new Promise<void>((resolve) => {
      const settle = () => {
        window.clearTimeout(timer);
        window.removeEventListener("popstate", settle);
        resolveLanded = null;
        inFlight = false;
        resolve();
      };
      const timer = window.setTimeout(settle, 1500);
      window.addEventListener("popstate", settle);
      resolveLanded = settle;
    });
    navigate(`/work/${slug}`);
    return landed;
  });
}
