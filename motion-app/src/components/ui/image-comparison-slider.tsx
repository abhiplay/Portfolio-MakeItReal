import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";

export type ImageComparisonProps = {
  /** Shown to the right of the handle. */
  beforeImage: string;
  /** Shown to the left of the handle. */
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  /** Focal point for both images, so they stay aligned as the handle moves. */
  objectPosition?: string;
  /** Per-image focal points. Each falls back to objectPosition. */
  afterObjectPosition?: string;
  beforeObjectPosition?: string;
  className?: string;
};

/* Before/after slider, adapted from the 21st.dev image comparison. Drag the handle,
   or focus it and use the arrow keys (Shift for bigger steps). Typed for this project. */
export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = "Before",
  altAfter = "After",
  objectPosition = "50% 50%",
  afterObjectPosition,
  beforeObjectPosition,
  className = "",
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, next)));
  }, []);

  const stopDragging = useCallback(() => setIsDragging(false), []);

  // Release anywhere on the page, not only over the slider.
  useEffect(() => {
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [stopDragging]);

  // Arrow keys step 2% (10% with Shift). PageUp/PageDown step 10%. Home and End jump to the ends.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    switch (e.key) {
      case "ArrowLeft":
        setSliderPosition((p) => Math.max(0, p - step));
        break;
      case "ArrowRight":
        setSliderPosition((p) => Math.min(100, p + step));
        break;
      case "PageDown":
        setSliderPosition((p) => Math.max(0, p - 10));
        break;
      case "PageUp":
        setSliderPosition((p) => Math.min(100, p + 10));
        break;
      case "Home":
        setSliderPosition(0);
        break;
      case "End":
        setSliderPosition(100);
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  const imageClass = "absolute inset-0 h-full w-full object-cover";
  const afterStyle = { objectPosition: afterObjectPosition ?? objectPosition };
  const beforeStyle = { objectPosition: beforeObjectPosition ?? objectPosition };

  return (
    <div
      ref={containerRef}
      className={`relative w-full touch-pan-y select-none overflow-hidden rounded-[20px] shadow-[0_40px_90px_-40px_rgba(40,20,30,0.45)] ${className}`}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
        if (isDragging) moveTo(e.clientX);
      }}
      onMouseLeave={stopDragging}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
        if (isDragging && e.touches[0]) moveTo(e.touches[0].clientX);
      }}
    >
      {/* Right of the handle: beforeImage. Rendered first so the clipped afterImage paints over it. */}
      <img src={beforeImage} alt={altBefore} draggable={false} className={imageClass} style={beforeStyle} />

      {/* Left of the handle: afterImage, revealed by the clip-path */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img src={afterImage} alt={altAfter} draggable={false} className={imageClass} style={afterStyle} />
      </div>

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare the two images"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKeyDown}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="group absolute inset-y-0 w-1.5 -translate-x-1/2 cursor-ew-resize bg-white/80 outline-none focus-visible:bg-white"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1A1615] shadow-md transition-all duration-200 ease-in-out group-focus-visible:ring-2 group-focus-visible:ring-[#1A1615] group-focus-visible:ring-offset-2 ${
            isDragging ? "scale-110 shadow-xl" : ""
          }`}
        >
          <ChevronsLeftRight className="h-5 w-5" aria-hidden />
        </div>
      </div>
    </div>
  );
}
