"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { getLenis } from "@/components/ui/SmoothScrollProvider";
import type { Heading } from "@/lib/blog-data";

interface TableOfContentsProps {
  headings: Heading[];
}

// Unified scroll offset: matches `scroll-mt-28` (112px) on heading anchors.
const SCROLL_OFFSET = 112;

export function TableOfContents({ headings }: TableOfContentsProps) {
  const isVi = useLocale() === "vi";
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(
    () => (headings.length > 0 ? headings[0].id : "")
  );
  // Measured geometry of the active row — no index×pitch arithmetic.
  const [indicator, setIndicator] = useState({ top: 6, height: 18 });
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const clickedRef = useRef<string | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track page scroll percentage for the progress indicator
  const scrollPercent = useScrollProgress();

  useEffect(() => {
    if (headings.length === 0) return;

    // Active = last heading whose top crossed the band line (computed from
    // live geometry, not IO batch order).
    const sectionEls = new Map<string, HTMLElement>();
    const pickActive = () => {
      let passedId = headings[0].id;
      let passedTop = -Infinity;
      sectionEls.forEach((el, id) => {
        const top = el.getBoundingClientRect().top;
        if (top <= SCROLL_OFFSET && top > passedTop) {
          passedTop = top;
          passedId = id;
        }
      });
      return passedId;
    };

    const observer = new IntersectionObserver(
      () => {
        if (clickedRef.current) return;
        setActiveId(pickActive());
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    // Small delay to ensure DOM elements are rendered
    const timeout = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          sectionEls.set(id, el);
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [headings]);

  // Measure the active row (handles wrapped headings, font swap, resize).
  const measure = () => {
    const li = itemRefs.current.get(activeId);
    if (!li) return;
    setIndicator({ top: li.offsetTop + 6, height: li.offsetHeight - 12 });
  };
  useLayoutEffect(measure, [activeId]);
  useEffect(() => {
    const t = setTimeout(measure, 600); // re-measure after font swap
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: string) => {
    clickedRef.current = id;
    setActiveId(id);
    // Release the spy lock after a beat even if the target never crosses
    // the band (short sections) — previously this could lock permanently.
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickedRef.current = null;
    }, 1200);

    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -SCROLL_OFFSET,
        duration: reducedMotion ? 0 : 1.1,
      });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  if (headings.length === 0) return null;

  const pct = Math.round(scrollPercent * 100);

  return (
    <nav aria-label={isVi ? "Mục lục" : "Table of contents"} className="w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {isVi ? "Trong bài này" : "On this page"}
        </p>
        <span className="text-[11px] font-medium text-foreground-muted tabular-nums">
          {pct}%
        </span>
      </div>

      {/* Thin progress track — scaleX (GPU) instead of width (layout) */}
      <div className="h-[2px] w-full rounded-full bg-black/[0.06] mb-4 overflow-hidden">
        <div
          className="h-full w-full rounded-full bg-gradient-to-r from-brand to-accent-cyan"
          style={{
            transform: `scaleX(${scrollPercent})`,
            transformOrigin: "left",
            transition: reducedMotion
              ? "none"
              : "transform 150ms ease-out",
          }}
        />
      </div>

      <ul className="space-y-0.5 relative">
        {/* Indicator line — transform-only, measured from the active row */}
        {(() => {
          const idx = headings.findIndex((h) => h.id === activeId);
          if (idx < 0) return null;
          return (
            <span
              className="absolute left-0 w-[3px] rounded-full bg-gradient-to-b from-brand to-accent-cyan"
              style={{
                top: 0,
                transform: `translateY(${indicator.top}px)`,
                height: `${indicator.height}px`,
                transition: reducedMotion
                  ? "none"
                  : "transform 300ms ease-out, height 300ms ease-out",
              }}
              aria-hidden="true"
            />
          );
        })()}
        {headings.map((heading) => (
          <li
            key={heading.id}
            ref={(li) => {
              if (li) itemRefs.current.set(heading.id, li);
              else itemRefs.current.delete(heading.id);
            }}
          >
            <button
              type="button"
              onClick={() => handleClick(heading.id)}
              className={`group relative w-full text-left text-sm leading-snug py-1.5 transition-colors duration-200 ${
                heading.level === 3 ? "pl-4" : "pl-3"
              } ${
                activeId === heading.id
                  ? "text-brand nav-active-text font-medium"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
              aria-current={activeId === heading.id ? "true" : undefined}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
