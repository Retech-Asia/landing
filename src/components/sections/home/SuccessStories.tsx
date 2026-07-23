"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { caseStudies } from "@/lib/case-studies-data";

const previews = caseStudies.map((cs) => ({
  slug: cs.slug,
  title: cs.title,
  tagline: cs.tagline,
  industry: cs.industry,
  metrics: cs.results.slice(0, 3),
  href: `/case-studies/${cs.slug}`,
}));

export function SuccessStories() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
      <CompositeSectionBackground layers={["aurora", "grid-center"]} />
      <Container className="relative z-10">
        <AnimatedSection>
          <SectionHeader
            label="Success Stories"
            title="Success Stories"
            description="Real results from real projects. See how we've helped businesses transform their digital presence."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {previews.map((preview) => {
            const hero = preview.metrics[0];
            const rest = preview.metrics.slice(1);
            return (
              <StaggerItem key={preview.slug}>
                <Link
                  href={preview.href}
                  className="group card-shimmer relative block h-full overflow-hidden rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-8 transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  {/* Animated top accent line — brand gradient, draws in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-gradient-to-r from-brand via-accent-cyan to-accent-violet"
                  />

                  {/* Industry badge — pill, not just text */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/8 border border-brand/15 text-[11px] font-medium tracking-wide uppercase text-brand-dark mb-4">
                    <span className="w-1 h-1 rounded-full bg-brand" aria-hidden="true" />
                    {preview.industry}
                  </span>

                  {/* Title & tagline */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                    {preview.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-6">
                    {preview.tagline}
                  </p>

                  {/* Hero metric — big, bold, gradient */}
                  {hero && (
                    <div className="mb-5 pb-5 border-b border-black/[0.06]">
                      <div className="text-3xl md:text-4xl font-bold gradient-text-brand leading-none tracking-tight">
                        {hero.value}
                      </div>
                      <div className="text-xs text-foreground-muted mt-1.5 tracking-wide">
                        {hero.metric}
                      </div>
                    </div>
                  )}

                  {/* Secondary metrics — compact rows */}
                  {rest.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {rest.map((m) => (
                        <div
                          key={m.metric}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground-secondary">{m.metric}</span>
                          <span className="font-semibold text-foreground">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA link */}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Read Case Study <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View all button */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            View All Case Studies <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
