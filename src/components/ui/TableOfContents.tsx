"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { Heading } from "@/lib/blog-data";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(
    () => (headings.length > 0 ? headings[0].id : "")
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const clickedRef = useRef<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Track page scroll percentage for the progress indicator
  const scrollPercent = useScrollProgress();

  useEffect(() => {
    if (headings.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // If user just clicked a link, don't override until scroll settles
      if (clickedRef.current) {
        const clickedVisible = entries.find(
          (e) => e.target.id === clickedRef.current && e.isIntersecting
        );
        if (clickedVisible) {
          clickedRef.current = null;
        }
        return;
      }

      // Find the topmost visible heading
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    const observer = observerRef.current;

    // Small delay to ensure DOM elements are rendered
    const timeout = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    clickedRef.current = id;
    setActiveId(id);

    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  // Compute the animated indicator position based on active heading
  const activeIndex = headings.findIndex((h) => h.id === activeId);
  const pct = Math.round(scrollPercent * 100);

  return (
    <nav aria-label="Table of contents" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          On this page
        </p>
        <span className="text-[11px] font-medium text-foreground-muted tabular-nums">
          {pct}%
        </span>
      </div>

      {/* Thin progress track */}
      <div className="h-[2px] w-full rounded-full bg-black/[0.06] mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent-cyan transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul ref={listRef} className="space-y-0.5 relative">
        {/* Animated indicator line */}
        {activeIndex >= 0 && (
          <span
            className="absolute left-0 w-[3px] rounded-full bg-gradient-to-b from-brand to-accent-cyan transition-all duration-300 ease-out"
            style={{
              top: `calc(${activeIndex * 33.6}px + 6px)`,
              height: "18px",
            }}
            aria-hidden="true"
          />
        )}
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => handleClick(heading.id)}
              className={`group relative w-full text-left text-sm leading-snug py-1.5 transition-colors duration-200 ${
                heading.level === 3 ? "pl-4" : "pl-3"
              } ${
                activeId === heading.id
                  ? "text-brand font-medium"
                  : "text-foreground-muted hover:text-foreground-secondary"
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
