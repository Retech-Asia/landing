"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { industries, type IndustryCategory } from "@/lib/industries-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FilterTab {
  id: IndustryCategory | "all";
  label: string;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All Industries" },
  { id: "enterprise", label: "Enterprise" },
  { id: "digital", label: "Digital & Tech" },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const expandVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IndustryExplorer() {
  const [activeFilter, setActiveFilter] = useState<IndustryCategory | "all">("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filteredIndustries = activeFilter === "all"
    ? industries
    : industries.filter((ind) => ind.category === activeFilter);

  const toggleExpand = useCallback((slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }, []);

  return (
    <div>
      {/* ---- Filter tabs ---- */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          const count =
            tab.id === "all"
              ? industries.length
              : industries.filter((ind) => ind.category === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setExpandedSlug(null);
              }}
              className={cn(
                "relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-foreground text-white shadow-sm"
                  : "bg-black/[0.04] text-foreground-secondary hover:bg-black/[0.07] hover:text-foreground"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full tabular-nums",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-black/[0.06] text-foreground-muted"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- Industry cards grid ---- */}
      <motion.div
        key={activeFilter}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filteredIndustries.map((industry) => {
          const Icon = industry.icon;
          const isExpanded = expandedSlug === industry.slug;

          return (
            <motion.div
              key={industry.slug}
              variants={cardVariants}
              layout
              className={cn(
                "relative rounded-2xl bg-white border transition-all duration-300",
                isExpanded
                  ? "border-brand/20 shadow-[0_2px_12px_rgba(32,133,53,0.08),0_8px_24px_rgba(0,0,0,0.04)] sm:col-span-2 lg:col-span-1"
                  : "border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
              )}
            >
              {/* Gradient overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br rounded-2xl pointer-events-none transition-opacity duration-500",
                  industry.gradient,
                  isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />

              <div className="relative z-10">
                {/* Card header - always visible */}
                <div className="p-5 md:p-6">
                  {/* Icon with background */}
                  <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-foreground/[0.04] transition-colors duration-300">
                    <Icon
                      size={22}
                      className={cn(industry.color, "transition-transform duration-300")}
                    />
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-2">
                    {industry.description.split(". ").slice(0, 2).join(". ")}.
                  </p>

                  {/* Expand / collapse toggle */}
                  <button
                    onClick={() => toggleExpand(industry.slug)}
                    className={cn(
                      "inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-all duration-200 cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-lg px-2 py-1.5 -ml-2",
                      isExpanded
                        ? "text-brand"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`industry-panel-${industry.slug}`}
                  >
                    {isExpanded ? "Show Less" : "Quick Look"}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>
                </div>

                {/* Expandable details panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`industry-panel-${industry.slug}`}
                      variants={expandVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4">
                        {/* Divider */}
                        <div className="h-px bg-black/[0.06]" />

                        {/* Key Challenges */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                            Key Challenges
                          </p>
                          <ul className="space-y-1.5">
                            {industry.challenges.slice(0, 2).map((challenge, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground-secondary leading-relaxed">
                                <AlertTriangle size={12} className="text-amber-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solutions */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                            How We Help
                          </p>
                          <ul className="space-y-1.5">
                            {industry.solutions.slice(0, 2).map((solution, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground-secondary leading-relaxed">
                                <CheckCircle2 size={12} className="text-brand shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{solution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {industry.technologies.slice(0, 6).map((tech) => (
                              <span
                                key={tech}
                                className="inline-block px-2 py-0.5 text-[11px] font-medium text-foreground-muted rounded-md bg-black/[0.04]"
                              >
                                {tech}
                              </span>
                            ))}
                            {industry.technologies.length > 6 && (
                              <span className="inline-block px-2 py-0.5 text-[11px] font-medium text-foreground-muted rounded-md bg-black/[0.04]">
                                +{industry.technologies.length - 6}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA link */}
                        <Link
                          href={`/industries/${industry.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all duration-300"
                        >
                          Explore {industry.name}
                          <ArrowRight size={14} className="transition-transform duration-300" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
