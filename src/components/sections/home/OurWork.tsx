"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { caseStudies } from "@/lib/case-studies-data";

/**
 * OurWork — unified proof-of-work section.
 *
 * Replaces the previous ProductShowcase + ProductTabs + SuccessStories
 * trio that overlapped heavily (Mining Analytics appeared in all 3).
 *
 * Research finding: no top IT consulting firm (Toptal, BairesDev,
 * ThoughtWorks, EPAM, Globant) shows "products" on their homepage.
 * What Retech called "products" are case studies in competitor terms.
 * This section consolidates all proof-of-work into one dense, metric-led
 * section following the EPAM / Kyanon pattern.
 *
 * Structure: 5 cards (one per case study), 2-column grid on desktop.
 * Each card: title, tagline, industry badge, hero metric, tech badges,
 * "Read case study" link.
 */

export function OurWork() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative">
      <Container>
        <SectionHeader
          label="Our Work"
          title="Products We've Shipped"
          description="Real production systems running today. From RAG-powered investment research to multi-tool AI SaaS platforms."
        />

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12"
          staggerDelay={0.1}
        >
          {caseStudies.map((cs) => {
            const heroMetric = cs.results[0];
            return (
              <StaggerItem key={cs.slug}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-8 transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  {/* Industry badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/8 border border-brand/15 text-[11px] font-medium tracking-wide uppercase text-brand-dark mb-4">
                    <span className="w-1 h-1 rounded-full bg-brand" aria-hidden="true" />
                    {cs.industry}
                  </span>

                  {/* Title + tagline */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-5">
                    {cs.tagline}
                  </p>

                  {/* Hero metric */}
                  {heroMetric && (
                    <div className="mb-5 pb-5 border-b border-black/[0.06]">
                      <div className="text-3xl md:text-4xl font-bold gradient-text-brand leading-none tracking-tight">
                        {heroMetric.value}
                      </div>
                      <div className="text-xs text-foreground-muted mt-1.5 tracking-wide">
                        {heroMetric.metric}
                      </div>
                    </div>
                  )}

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cs.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium px-2 py-1 rounded bg-foreground/[0.05] text-foreground-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Read Case Study <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View all button */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            View All Case Studies <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
