"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies } from "@/lib/case-studies-data";
import { useEffect, useState, useCallback } from "react";

/**
 * OurWork — Auto-rotating featured story.
 *
 * ONE case study visible at a time, split layout (text left, visual
 * right). Auto-rotates through 3 featured projects every 5 seconds.
 * Pause on hover. Progress dots at bottom.
 *
 * Compact: ~400px total height (vs ~1,800px for 5 stacked cards).
 */

const FEATURED_SLUGS = [
  "investment-intelligence-platform",
  "ai-analysis-saas",
  "mining-analytics-platform",
];

const FEATURED = FEATURED_SLUGS.map(
  (slug) => caseStudies.find((c) => c.slug === slug)!,
);

const AUTO_ROTATE_MS = 5000;

export function OurWork() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((p) => (p + 1) % FEATURED.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next, paused]);

  const project = FEATURED[active];
  const heroMetric = project.results[0];

  return (
    <section
      className="py-20 md:py-28 bg-background-subtle relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container>
        <SectionHeader
          label="Our Work"
          title="Products We've Shipped"
          description="Real production systems running today. From RAG-powered investment research to multi-tool AI SaaS platforms."
        />

        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-black/[0.06] pb-3">
          {FEATURED.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                active === i
                  ? "text-brand bg-brand/[0.06]"
                  : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.03]"
              }`}
            >
              {p.title.replace(" Platform", "").replace(" SaaS Platform", "")}
            </button>
          ))}
        </div>

        {/* Split layout: text left, visual right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[320px]">
          {/* Left: content */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/8 border border-brand/15 text-[11px] font-medium tracking-wide uppercase text-brand-dark mb-4">
              {project.industry}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-foreground-muted mb-5">{project.tagline}</p>

            {heroMetric && (
              <div className="mb-5">
                <div className="text-4xl font-bold gradient-text-brand leading-none tracking-tight">
                  {heroMetric.value}
                </div>
                <div className="text-xs text-foreground-muted mt-1.5 tracking-wide">
                  {heroMetric.metric}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-medium px-2 py-1 rounded bg-foreground/[0.05] text-foreground-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={`/case-studies/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all"
            >
              Read Case Study <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Right: visual panel with gradient + project name */}
          <div className="relative h-[240px] md:h-[300px] rounded-2xl overflow-hidden border border-black/[0.06]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  active === 0
                    ? "linear-gradient(135deg, rgba(32,133,53,0.08), rgba(6,182,212,0.06))"
                    : active === 1
                      ? "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.06))"
                      : "linear-gradient(135deg, rgba(32,133,53,0.06), rgba(46,160,78,0.08))",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-foreground-muted mb-2">
                  {project.industry}
                </p>
                <p className="text-xl md:text-2xl font-bold text-foreground/30">
                  {project.title}
                </p>
                {heroMetric && (
                  <p className="text-3xl md:text-4xl font-bold gradient-text-brand mt-3">
                    {heroMetric.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show project ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? "w-8 bg-brand"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* View all */}
        <div className="mt-8 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand hover:gap-3"
          >
            View All Case Studies <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
