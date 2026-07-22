"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % items.length;
        document.getElementById(`accordion-trigger-${next}`)?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + items.length) % items.length;
        document.getElementById(`accordion-trigger-${prev}`)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        document.getElementById("accordion-trigger-0")?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        document.getElementById(`accordion-trigger-${items.length - 1}`)?.focus();
      }
    },
    [items.length]
  );

  return (
    <div className={cn("divide-y divide-black/[0.06]", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemNumber = String(index + 1).padStart(2, "0");
        const triggerId = `accordion-trigger-${index}`;
        const panelId = `accordion-panel-${index}`;

        return (
          <div
            key={index}
            className={cn(
              "group/item relative transition-colors duration-300",
              !isOpen && "hover:bg-black/[0.02]"
            )}
          >
            {/* Brand green left border that fades in when open */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-brand origin-top"
                />
              )}
            </AnimatePresence>

            <button
              id={triggerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center justify-between w-full py-5 text-left group cursor-pointer pl-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <div className="flex items-center gap-4 pr-4 min-w-0">
                <span
                  className={cn(
                    "text-xs font-mono font-medium tabular-nums shrink-0 transition-colors duration-300",
                    isOpen
                      ? "text-brand"
                      : "text-black/25 group-hover/item:text-black/40"
                  )}
                >
                  {itemNumber}
                </span>
                <span className="text-base font-medium text-foreground group-hover/item:text-brand transition-colors truncate">
                  {item.question}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="shrink-0"
              >
                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-colors duration-300",
                    isOpen ? "text-brand" : "text-foreground-muted"
                  )}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm text-foreground-secondary leading-relaxed pl-9">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
