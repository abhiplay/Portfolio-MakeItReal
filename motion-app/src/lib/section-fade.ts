/* Shared fades for the Mother's Grace case-study art. A plate fades into the section colour at its edges, so the
   boundary between two sections dissolves instead of cutting the picture. Every section uses the same colour. */

export const SECTION_BG = "#F6EEFB";

// The bottom of a plate fades into the section colour.
export const BOTTOM_FADE = "linear-gradient(to bottom, #000 84%, transparent 100%)";

// The top and bottom both fade, for a plate whose top edge carries its own light.
export const TOP_BOTTOM_FADE = "linear-gradient(to bottom, transparent 0%, #000 10%, #000 84%, transparent 100%)";

export function fadeStyle(gradient: string) {
  return { maskImage: gradient, WebkitMaskImage: gradient };
}
