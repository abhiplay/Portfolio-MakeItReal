"use client";

import type * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";

export type PreviewItem = {
  image: string;
  title: string;
  subtitle: string;
};

export type PreviewMap = Record<string, PreviewItem>;

const DEFAULT_ITEMS: PreviewMap = {
  midjourney: {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
    title: "Midjourney",
    subtitle: "Create stunning AI-generated artwork",
  },
  stable: {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60",
    title: "Stable Diffusion",
    subtitle: "Open-source generative AI model",
  },
  leonardo: {
    image: "https://images.unsplash.com/photo-1634017834816-7eeda91e982f?w=600&auto=format&fit=crop&q=60",
    title: "Leonardo AI",
    subtitle: "Production-ready creative assets",
  },
};

const styles = `
  .hover-preview-scope {
    font-family: 'Space Grotesk', sans-serif;
  }

  .hover-preview-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 1;
  }

  .ambient-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    max-width: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: hover-preview-pulse 8s ease-in-out infinite;
  }

  @keyframes hover-preview-pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }

  .hover-fade-up {
    opacity: 0;
    animation: hover-preview-fadeUp 0.8s ease forwards;
  }

  @keyframes hover-preview-fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after,
  .hover-link.hover-link-active::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 40;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 8px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 107, 107, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    max-width: 60vw;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #fff;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
  }

  @media (prefers-reduced-motion: reduce) {
    .hover-fade-up {
      opacity: 1;
      animation: none;
    }
    .ambient-glow {
      animation: none;
    }
    .preview-card {
      transition: opacity 0.01s ease;
      transform: none;
    }
    .preview-card.visible {
      transform: none;
    }
  }
`;

const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

/**
 * Shared hover-preview state: one floating card driven by many links.
 * Mouse: hover shows / move follows / leave hides.
 * Touch (no hover): first tap opens the card, second tap follows the link.
 */
export function useHoverPreview(items: PreviewMap) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload all images on mount
  useEffect(() => {
    Object.values(items).forEach((data) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const cardWidth = 300;
    const cardHeight = 250;
    const offsetY = 20;

    let x = clientX - cardWidth / 2;
    let y = clientY - cardHeight - offsetY;

    if (typeof window !== "undefined") {
      if (x + cardWidth > window.innerWidth - 20) {
        x = window.innerWidth - cardWidth - 20;
      }
      if (x < 20) {
        x = 20;
      }
      if (y < 20) {
        y = clientY + offsetY;
      }
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      if (isCoarsePointer()) return;
      setActiveKey(key);
      setIsVisible(true);
      updatePosition(e.clientX, e.clientY);
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isCoarsePointer()) return;
      if (isVisible) {
        updatePosition(e.clientX, e.clientY);
      }
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    if (isCoarsePointer()) return;
    setIsVisible(false);
  }, []);

  const handleTap = useCallback(
    (key: string, e: React.MouseEvent) => {
      if (!isCoarsePointer()) return;
      // First tap opens the card in place; second tap follows the link.
      if (activeKey !== key || !isVisible) {
        e.preventDefault();
        setActiveKey(key);
        updatePosition(e.clientX, e.clientY);
        setIsVisible(true);
      }
    },
    [activeKey, isVisible, updatePosition]
  );

  // Dismiss on tap elsewhere (touch only)
  useEffect(() => {
    if (!isCoarsePointer()) return;
    const onDocTap = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(".hover-link")) return;
      setIsVisible(false);
    };
    document.addEventListener("click", onDocTap);
    return () => document.removeEventListener("click", onDocTap);
  }, []);

  return {
    activePreview: activeKey ? items[activeKey] ?? null : null,
    activeKey,
    position,
    isVisible,
    cardRef,
    handleHoverStart,
    handleHoverMove,
    handleHoverEnd,
    handleTap,
  };
}

export type HoverPreviewController = ReturnType<typeof useHoverPreview>;

const HoverLink = ({
  previewKey,
  active,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onTap,
  ...rest
}: {
  previewKey: string;
  active?: boolean;
  children: React.ReactNode;
  onHoverStart: (key: string, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
  onTap?: (key: string, e: React.MouseEvent) => void;
} & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={`hover-link${active ? " hover-link-active" : ""}`}
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
      onClick={(e) => onTap?.(previewKey, e)}
      {...rest}
    >
      {children}
    </span>
  );
};

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: PreviewItem | null;
  position: { x: number; y: number };
  isVisible: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!data) return null;

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  );
};

export function HoverPreview({ items = DEFAULT_ITEMS }: { items?: PreviewMap } = {}) {
  const preview = useHoverPreview(items);
  const paragraphs: { text: string; key?: string }[][] = [
    [{ text: "Explore " }, { text: "Midjourney", key: "midjourney" }, { text: " for breathtaking AI-generated artwork and illustrations." }],
    [
      { text: "For open-source freedom try " },
      { text: "Stable Diffusion", key: "stable" },
      { text: " or generate production assets with " },
      { text: "Leonardo AI", key: "leonardo" },
      { text: "." },
    ],
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-scope relative flex items-center justify-center px-10 py-24 overflow-hidden">
        <div className="hover-preview-noise" />
        <div className="ambient-glow" />

        <div className="relative z-[2] max-w-[900px] w-full text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.6] text-[#888]">
          {paragraphs.map((para, pi) => (
            <p key={pi} className="hover-fade-up mb-6" style={{ animationDelay: `${0.2 + pi * 0.2}s` }}>
              {para.map((seg, si) =>
                seg.key ? (
                  <HoverLink
                    key={si}
                    previewKey={seg.key}
                    active={preview.activeKey === seg.key && preview.isVisible}
                    onHoverStart={preview.handleHoverStart}
                    onHoverMove={preview.handleHoverMove}
                    onHoverEnd={preview.handleHoverEnd}
                    onTap={preview.handleTap}
                  >
                    {seg.text}
                  </HoverLink>
                ) : (
                  <span key={si}>{seg.text}</span>
                )
              )}
            </p>
          ))}
        </div>

        <PreviewCard
          data={preview.activePreview}
          position={preview.position}
          isVisible={preview.isVisible}
          cardRef={preview.cardRef}
        />
      </div>
    </>
  );
}

export { HoverLink, PreviewCard };

/** Injects the hover-preview CSS once (fonts load via index.html <link>). */
export function HoverPreviewStyles() {
  return <style>{styles}</style>;
}
