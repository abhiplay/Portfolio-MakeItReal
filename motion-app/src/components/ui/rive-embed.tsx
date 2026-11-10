import { useEffect, useRef, useState } from "react";
import { Alignment, Fit, Layout, Rive, RuntimeLoader } from "@rive-app/react-canvas";

/* ---------------- Rive embed ----------------
   Plays a .riv file from /public/rive on its state machine. The file's own
   pointer listeners react to the real pointer on the canvas.
   This uses the Rive runtime directly, not the React hook. The hook only draws
   while the canvas is on screen, so the figure stayed blank until the Lab
   section was reached. The runtime draws off-screen too, so the figure is
   already playing when the section comes into view. The artboard is
   cover-fitted and pinned to the top-right. The canvas stays invisible until
   the file has loaded. Loaded lazily from lab.tsx, so the Rive runtime stays
   out of the main bundle. */

// Load the runtime's wasm from the site, not the unpkg CDN, which was the slow part of the first load.
RuntimeLoader.setWasmUrl("/rive/rive.wasm");

// Cover fills the canvas width and crops the artboard's lower part, so the figure is large in a short band.
const LAYOUT = new Layout({ fit: Fit.Cover, alignment: Alignment.TopRight });

export default function RiveEmbed({
  src,
  artboard,
  stateMachine,
  className,
}: {
  src: string;
  artboard?: string;
  stateMachine?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let rive: Rive | null = null;
    rive = new Rive({
      src,
      canvas,
      artboard,
      stateMachines: stateMachine,
      autoplay: true,
      layout: LAYOUT,
      onLoad: () => {
        rive?.resizeDrawingSurfaceToCanvas();
        // Reduced motion: hold the first frame instead of animating.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) rive?.pause();
        // Reveal after two frames, so the canvas is not shown before its first drawn frame.
        requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
      },
    });

    // Keep the drawing surface the same size as the canvas on screen.
    const observer = new ResizeObserver(() => rive?.resizeDrawingSurfaceToCanvas());
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      rive?.cleanup();
      rive = null;
    };
  }, [src, artboard, stateMachine]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
