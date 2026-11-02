import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";

/* Looping text marquee. Two identical copies run side by side and slide by
   exactly one copy's width, so the loop is seamless. A tooltip follows the
   cursor and tilts toward the side of the screen it is on. Adapted from the
   Next.js version: react-router links, no styled-jsx, and inline hover colour. */

type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  /** Seconds for one full loop. */
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  /** Any CSS colour. Empty keeps the theme foreground. */
  textColor?: string;
  /** Any CSS colour shown while hovered. Empty keeps the current colour. */
  hoverColor?: string;
  /** Optional nodes (e.g. icons) to repeat instead of `text`. */
  items?: ReactNode[];
  /** Optional name per item, shown under it on hover. Same order as `items`. */
  itemLabels?: string[];
  /** Optional classes for each item's wrapper, e.g. a hover effect. */
  itemClassName?: string;
};

const MAX_TILT = 8;

export function InfiniteTextMarquee({
  text = "Let's Get Started",
  link = "/",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex",
  fontSize = "8rem",
  textColor = "",
  hoverColor = "",
  items,
  itemLabels,
  itemClassName = "",
}: InfiniteTextMarqueeProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!showTooltip) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });

      // Tilt the tooltip by how far the cursor is from the centre of the screen.
      const midpoint = window.innerWidth / 2;
      const amount = (Math.abs(e.clientX - midpoint) / midpoint) * MAX_TILT;
      setRotation(e.clientX > midpoint ? amount : -amount);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);

  // One copy of the phrase. Two copies make a seamless loop.
  const copy = Array(10).fill(text).join(" - ") + " -";

  const textStyle: CSSProperties = {
    fontSize,
    color: isHovered && hoverColor ? hoverColor : textColor || undefined,
  };

  const label = (
    <span
      className={`inline-block cursor-pointer whitespace-pre font-bold tracking-tight transition-colors ${
        textColor ? "" : "text-foreground"
      }`}
      style={textStyle}
    >
      {copy}
    </span>
  );

  // Icon mode: the items run in a row, repeated the same way as the text.
  const repeated = items ? Array(10).fill(items).flat() : null;
  const itemCount = items?.length ?? 0;
  const content = repeated ? (
    <span className="inline-flex items-center gap-[56px] whitespace-nowrap" style={textStyle}>
      {repeated.map((node, i) => {
        const name = itemLabels?.[i % itemCount];
        return (
          <span key={i} className={`group relative inline-flex items-center ${itemClassName}`}>
            {node}
            {name && (
              <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {name}
              </span>
            )}
          </span>
        );
      })}
    </span>
  ) : (
    label
  );

  const isExternal = /^https?:\/\//.test(link);

  return (
    <>
      {showTooltip && (
        <div
          className={`pointer-events-none fixed z-[99] whitespace-nowrap rounded-3xl bg-foreground px-[24px] py-[12px] font-bold text-background transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: `${cursor.y}px`,
            left: `${cursor.x}px`,
            transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
          }}
        >
          <p>{tooltipText}</p>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        {/* CSS keyframes rather than motion, so hovering can pause the loop. */}
        <div
          className="marquee-track flex w-max whitespace-nowrap"
          style={{ animationDuration: `${speed}s` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 py-[40px]" aria-hidden={n === 1}>
              {isExternal ? (
                <a href={link} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <Link to={link}>{content}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
