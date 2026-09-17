"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ---------------- LoopVideo ----------------
   Gapless looping video. A plain `loop` attribute visibly cuts when the
   last frame doesn't match the first, so this stacks two synced layers:
   near the end of the front layer the back layer restarts from 0 and the
   two crossfade, hiding the loop point entirely. */

interface LoopVideoProps {
  src: string;
  className?: string;
  /** Extra classes for the inner video layer(s) (e.g. object-position). */
  videoClassName?: string;
  poster?: string;
  /** Crossfade length in seconds. */
  fadeDuration?: number;
  /** When > 0, uses a single looping layer that dips to black for this
      many seconds at each loop point instead of crossfading. */
  fadeToBlack?: number;
}

export function LoopVideo({
  src,
  className,
  videoClassName,
  poster,
  fadeDuration = 0.6,
  fadeToBlack = 0,
}: LoopVideoProps) {
  if (fadeToBlack > 0) {
    return (
      <FadeBlackLoop
        src={src}
        className={className}
        videoClassName={videoClassName}
        poster={poster}
        fadeSeconds={fadeToBlack}
      />
    );
  }
  return (
    <CrossfadeLoop
      src={src}
      className={className}
      videoClassName={videoClassName}
      poster={poster}
      fadeDuration={fadeDuration}
    />
  );
}

/* ---------------- Fade-to-black loop ----------------
   One looping layer under a black shade whose opacity is a pure function
   of playback position: it rises through the last `fadeSeconds` and falls
   through the first, so every loop point dips through black. */

function FadeBlackLoop({
  src,
  className,
  videoClassName,
  poster,
  fadeSeconds,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  poster?: string;
  fadeSeconds: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let stopped = false;
    let last = -1;
    const tick = () => {
      if (stopped) return;
      const v = videoRef.current;
      const shade = shadeRef.current;
      if (v && shade) {
        const d = v.duration;
        let opacity = 1;
        if (d && Number.isFinite(d) && d > 0) {
          const t = v.currentTime;
          const edge = Math.min(t, d - t);
          opacity = Math.min(1, Math.max(0, 1 - edge / fadeSeconds));
        }
        const rounded = Math.round(opacity * 200) / 200;
        if (rounded !== last) {
          last = rounded;
          shade.style.opacity = String(rounded);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [fadeSeconds]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        poster={poster}
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          videoClassName,
        )}
        src={src}
      />
      <div
        ref={shadeRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
function CrossfadeLoop({
  src,
  className,
  videoClassName,
  poster,
  fadeDuration,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  poster?: string;
  fadeDuration: number;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let front = a;
    let back = b;
    let raf = 0;
    let stopped = false;

    const rewind = (v: HTMLVideoElement) => {
      try {
        v.currentTime = 0;
      } catch {
        /* metadata not ready yet — next tick retries */
      }
    };

    const tick = () => {
      if (stopped) return;
      const d = front.duration;
      if (d && Number.isFinite(d) && front.currentTime >= d - fadeDuration) {
        rewind(back);
        back.play().catch(() => {});
        back.style.opacity = "1";
        front.style.opacity = "0";
        const oldFront = front;
        window.setTimeout(() => {
          if (stopped) return;
          oldFront.pause();
          rewind(oldFront);
        }, fadeDuration * 1000 + 60);
        const tmp = front;
        front = back;
        back = tmp;
      }
      raf = requestAnimationFrame(tick);
    };

    front.style.opacity = "1";
    back.style.opacity = "0";
    front.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [src, fadeDuration]);

  const layerClass =
    "absolute inset-0 h-full w-full object-cover transition-opacity ease-linear";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={aRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        aria-hidden
        poster={poster}
        className={cn(layerClass, videoClassName)}
        style={{ transitionDuration: `${fadeDuration}s` }}
        src={src}
      />
      <video
        ref={bRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
        poster={poster}
        className={cn(layerClass, videoClassName)}
        style={{ transitionDuration: `${fadeDuration}s` }}
        src={src}
      />
    </div>
  );
}
