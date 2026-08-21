"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getLenis } from "@/components/ui/SmoothScrollProvider";

export interface TocItem {
  id: string;
  label: string;
}

interface ServiceTOCProps {
  items: TocItem[];
}

// Unified scroll offset: must match `scroll-mt-28` (112px) on section
// anchors and the spy band below — one constant, no drift between them.
const SCROLL_OFFSET = 112;
// Highlight base height — scaleY adjusts to the measured active row.
const BASE_H = 32;

export function ServiceTOC({ items }: ServiceTOCProps) {
  const t = useTranslations("serviceDetail.toc");
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(
    () => (items.length > 0 ? items[0].id : "")
  );
  // Measured geometry of the active row — no index×pitch arithmetic, so
  // wrapped labels (long VI headings) can't desync the highlight.
  const [highlight, setHighlight] = useState({ top: 0, height: BASE_H });
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const clickedRef = useRef<string | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    // Classic scroll-spy: the active section is the last one whose top
    // has crossed the band line. Computed from live geometry rather than
    // IO batch order, so scrolling upward marks the right section.
    const sectionEls = new Map<string, HTMLElement>();
    const pickActive = () => {
      let passedId = items[0].id;
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

    const timeout = setTimeout(() => {
      items.forEach(({ id }) => {
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
  }, [items]);

  // Measure the active row's real position/height (handles wrapped labels,
  // font-swap reflow, and resize).
  const measure = () => {
    const li = itemRefs.current.get(activeId);
    if (!li) return;
    setHighlight({ top: li.offsetTop, height: li.offsetHeight });
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

  if (items.length === 0) return null;

  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <nav aria-label={t("onThisPage")} className="w-full">
      <div className="rounded-xl border border-foreground/10 bg-card-bg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-3 px-2">
          {t("onThisPage")}
        </p>
        <ul className="relative space-y-0.5">
          {/* Active background highlight — one persistent element, moved
              via transform only (translateY + scaleY), so it slides
              without the fade-out/fade-in gap the old key-swap caused. */}
          {activeIndex >= 0 && (
            <motion.div
              className="absolute left-0 right-0 rounded-lg bg-brand/[0.06]"
              initial={false}
              animate={{
                opacity: 1,
                y: highlight.top,
                scaleY: highlight.height / BASE_H,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.22, ease: "easeOut" }
              }
              style={{ top: 0, height: BASE_H, originY: 0 }}
              aria-hidden="true"
            />
          )}

          {items.map((item) => (
            <li
              key={item.id}
              ref={(li) => {
                if (li) itemRefs.current.set(item.id, li);
                else itemRefs.current.delete(item.id);
              }}
            >
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`relative z-10 w-full text-left text-sm leading-snug py-1.5 px-2 rounded-lg transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-brand nav-active-text font-medium"
                    : "text-foreground-secondary hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                      activeId === item.id ? "bg-brand" : "bg-foreground-muted/40"
                    }`}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress indicator — scaleX (GPU) instead of width (layout) */}
      <div className="mt-4 px-2">
        <div className="h-0.5 w-full bg-black/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand to-accent-cyan rounded-full"
            style={{ transformOrigin: "left" }}
            initial={false}
            animate={{
              scaleX: (activeIndex + 1) / items.length,
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: "easeOut" }
            }
          />
        </div>
        <p className="text-[10px] text-foreground-muted mt-1.5 text-right">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </nav>
  );
}
