/* Lets the Metadrob card's view transition wait for the detail hero to commit.
   The browser takes the new snapshot only after the update callback's promise settles, so the
   hero is in the DOM when the morph starts. The wait also ends on a timeout, or when the user goes
   back or forward, so a superseded navigation never holds the snapshot on screen. */

let resolveLanded: (() => void) | null = null;

// Resolves when MetadrobHero commits, after timeoutMs, or on popstate.
export function awaitMetadrobHero(timeoutMs = 1500): Promise<void> {
  return new Promise<void>((resolve) => {
    const settle = () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", settle);
      if (resolveLanded === settle) resolveLanded = null;
      resolve();
    };
    const timer = window.setTimeout(settle, timeoutMs);
    window.addEventListener("popstate", settle);
    resolveLanded = settle;
  });
}

// Called from MetadrobHero's layout effect, so it runs in the commit that puts the hero on screen.
export function markMetadrobHeroLanded(): void {
  resolveLanded?.();
}
