"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-brand/20 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
                : "border-black/[0.06] bg-white hover:border-black/[0.10] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "text-base md:text-lg font-semibold transition-colors duration-200",
                  isOpen ? "text-brand" : "text-foreground"
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isOpen
                    ? "bg-brand/10 text-brand rotate-180"
                    : "bg-black/[0.04] text-foreground-muted"
                )}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-foreground-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
