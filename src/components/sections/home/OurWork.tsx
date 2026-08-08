"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies, flattenCaseStudy, localizeCaseStudyHref } from "@/lib/case-studies-data";

const FEATURED_SLUGS = [
  "investment-intelligence-platform",
  "ai-analysis-saas",
  "mining-analytics-platform",
];

export function OurWork() {
  const locale = useLocale() as "en" | "vi";
  const FEATURED = FEATURED_SLUGS
    .map((slug) => caseStudies.find((c) => c.id === slug))
    .filter(Boolean)
    .map((c) => flattenCaseStudy(c!, locale));

  return (
    <section className="py-20 md:py-28 bg-background-subtle">
      <Container>
        <SectionHeader
          label="Our Work"
          title="Products We've Shipped"
          description="Real production systems running today across AI, finance, and data platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {FEATURED.map((project) => {
            const metric = project.results[0];
            return (
              <Link
                key={project.id}
                href={localizeCaseStudyHref(`/case-studies/${project.slug}`, locale)}
                className="group block rounded-2xl bg-white border border-black/[0.06] p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand/8 border border-brand/15 text-[10px] font-medium tracking-wide uppercase text-brand-dark mb-4">
                  {project.industry}
                </span>

                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-foreground-muted mb-4">{project.tagline}</p>

                {metric && (
                  <div className="mb-4 pb-4 border-b border-black/[0.06]">
                    <div className="text-2xl md:text-3xl font-bold gradient-text-brand leading-none">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-foreground-muted mt-1.5">
                      {metric.metric}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-foreground/[0.05] text-foreground-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all">
                  Read Case Study <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
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
