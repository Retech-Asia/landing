"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Layers,
  GitBranch,
  Receipt,
  Code2,
  Headphones,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/cn";
import type { FAQCategory } from "@/lib/faq-data";

/* ── Icon map for category pills ─────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HelpCircle,
  Layers,
  GitBranch,
  Receipt,
  Code2,
  HeadphonesIcon: Headphones,
};

/* ── Props ───────────────────────────────────────────────────── */
interface FAQClientPageProps {
  categories: FAQCategory[];
}

/* ── Highlight matching text ─────────────────────────────────── */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-brand/15 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── Enhanced Accordion with open indicator ──────────────────── */
function FAQAccordion({
  items,
  searchQuery,
}: {
  items: FAQCategory["items"];
  searchQuery: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % items.length;
        document.getElementById(`faq-trigger-${next}`)?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + items.length) % items.length;
        document.getElementById(`faq-trigger-${prev}`)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        document.getElementById("faq-trigger-0")?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        document.getElementById(`faq-trigger-${items.length - 1}`)?.focus();
      }
    },
    [items.length]
  );

  return (
    <div className="divide-y divide-black/[0.06]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

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
              <div className="flex items-center gap-3 pr-4 min-w-0">
                {/* Open/closed visual indicator */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                    isOpen
                      ? "bg-brand text-white scale-100"
                      : "bg-black/[0.05] text-black/30 group-hover/item:bg-brand/10 group-hover/item:text-brand scale-95"
                  )}
                >
                  {isOpen ? (
                    <motion.span
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      &#10003;
                    </motion.span>
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span className="text-base font-medium text-foreground group-hover/item:text-brand transition-colors line-clamp-2 min-w-0 flex-1">
                  <HighlightedText text={item.question} query={searchQuery} />
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
                  <p className="pb-5 text-sm text-foreground-secondary leading-relaxed pl-[3.25rem] pr-4">
                    <HighlightedText text={item.answer} query={searchQuery} />
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

/* ── Main Client Component ───────────────────────────────────── */
export function FAQClientPage({ categories }: FAQClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* Filtered categories based on search and active tab */
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    let cats = categories;

    // Filter by active category
    if (activeCategory !== "all") {
      cats = cats.filter((c) => c.slug === activeCategory);
    }

    // Filter by search query
    if (query) {
      cats = cats
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(query) ||
              item.answer.toLowerCase().includes(query)
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    return cats;
  }, [categories, activeCategory, searchQuery]);

  /* Total result count for search feedback */
  const totalResults = useMemo(
    () => filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0),
    [filteredCategories]
  );

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <section className="relative py-16 md:py-20">
      <Container>
        {/* ── Search Bar ─────────────────────────────────────── */}
        <AnimatedSection variant="slideUp" delay={0.05}>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
              />
              <input
                type="search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/[0.08] bg-white text-foreground text-base placeholder:text-foreground-muted focus:outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/10 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                aria-label="Search FAQ questions"
              />
              {hasSearch && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground-muted hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-black/[0.04]"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search result count */}
            {hasSearch && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-foreground-muted"
              >
                {totalResults === 0
                  ? "No questions found matching your search."
                  : `${totalResults} question${totalResults !== 1 ? "s" : ""} found.`}
              </motion.p>
            )}
          </div>
        </AnimatedSection>

        {/* ── Category Filter Pills ──────────────────────────── */}
        <AnimatedSection variant="slideUp" delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="FAQ categories"
            >
              {/* "All" pill */}
              <button
                role="tab"
                aria-selected={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === "all"
                    ? "bg-brand text-white shadow-[0_2px_8px_rgba(32,133,53,0.2)]"
                    : "bg-white text-foreground-secondary border border-black/[0.06] hover:border-black/[0.12] hover:text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                )}
              >
                <Layers size={14} />
                All
              </button>

              {/* Category pills */}
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || HelpCircle;
                const isActive = activeCategory === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() =>
                      setActiveCategory(isActive ? "all" : cat.slug)
                    }
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-brand text-white shadow-[0_2px_8px_rgba(32,133,53,0.2)]"
                        : "bg-white text-foreground-secondary border border-black/[0.06] hover:border-black/[0.12] hover:text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                    )}
                  >
                    <Icon size={14} />
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ── FAQ Accordion Groups ───────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="max-w-3xl mx-auto text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-black/[0.04] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-foreground-muted" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No matching questions
              </h3>
              <p className="text-sm text-foreground-secondary max-w-md mx-auto">
                Try adjusting your search terms or browse all categories.
                If you still can&apos;t find what you need, feel free to{" "}
                <a
                  href="/contact"
                  className="text-brand hover:underline font-medium"
                >
                  contact our team
                </a>
                .
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-sm text-brand hover:underline font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.slug}
                  className="max-w-3xl mx-auto mb-12 last:mb-0"
                >
                  {/* Category heading (show when viewing all or searching) */}
                  {(activeCategory === "all" || hasSearch) && (
                    <div className="mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                        {category.title}
                      </h2>
                      <p className="text-sm text-foreground-secondary">
                        {category.description}
                      </p>
                    </div>
                  )}

                  {/* Accordion card */}
                  <div className="rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                    <FAQAccordion
                      items={category.items}
                      searchQuery={searchQuery}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
