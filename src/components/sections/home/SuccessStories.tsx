"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <section className="py-20 md:py-28 bg-background-subtle relative">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label="Success Stories"
            title="Success Stories"
            description="Real results from real projects. See how we've helped businesses transform their digital presence."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {previews.map((preview) => (
            <StaggerItem key={preview.slug}>
              <Link
                href={preview.href}
                className="group card-shimmer block h-full rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-8 transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              >
                {/* Industry badge */}
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-3">
                  {preview.industry}
                </p>

                {/* Title & tagline */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {preview.title}
                </h3>
                <p className="text-sm text-foreground-muted mb-6">
                  {preview.tagline}
                </p>

                {/* Key metrics */}
                <div className="space-y-3 mb-6">
                  {preview.metrics.map((m) => (
                    <div key={m.metric} className="flex items-center justify-between">
                      <span className="text-sm text-foreground-secondary">{m.metric}</span>
                      <span className="text-sm font-semibold text-foreground">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-black/[0.06] mb-5" />

                {/* CTA link */}
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all button */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition-all hover:bg-foreground/90 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            View All Case Studies <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
