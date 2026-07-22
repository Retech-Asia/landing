"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TocItem {
  id: string;
  label: string;
}

interface ServiceTOCProps {
  items: TocItem[];
}

export function ServiceTOC({ items }: ServiceTOCProps) {
  const [activeId, setActiveId] = useState<string>(
    () => (items.length > 0 ? items[0].id : "")
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const clickedRef = useRef<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (clickedRef.current) {
        const clickedVisible = entries.find(
          (e) => e.target.id === clickedRef.current && e.isIntersecting
        );
        if (clickedVisible) {
          clickedRef.current = null;
        }
        return;
      }

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

    const timeout = setTimeout(() => {
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [items]);

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

  if (items.length === 0) return null;

  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <nav aria-label="Table of contents" className="w-full">
      <div className="rounded-xl border border-black/[0.06] bg-white/60 backdrop-blur-sm p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3 px-2">
          On this page
        </p>
        <ul className="relative space-y-0.5">
          {/* Animated active background highlight */}
          <AnimatePresence mode="wait">
            {activeIndex >= 0 && (
              <motion.li
                key={activeId}
                className="absolute left-0 right-0 h-8 rounded-lg bg-brand/[0.06]"
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: activeIndex * 32,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ top: 0 }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {items.map((item) => (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`relative z-10 w-full text-left text-sm leading-snug py-1.5 px-2 rounded-lg transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-brand font-medium"
                    : "text-foreground-muted hover:text-foreground-secondary hover:bg-black/[0.02]"
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

      {/* Progress indicator */}
      <div className="mt-4 px-2">
        <div className="h-0.5 w-full bg-black/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand to-accent-cyan rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((activeIndex + 1) / items.length) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-foreground-muted mt-1.5 text-right">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </nav>
  );
}
