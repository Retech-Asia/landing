"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies, flattenCaseStudy, localizeCaseStudyHref } from "@/lib/case-studies-data";

/**
 * Results-forward case tiles. Featured trio covers the three service
 * pillars: AI platform (investment intelligence), finance (asset
 * management), CMS (fintech card marketing). Each tile leads with the
 * strongest before/after outcome from case-studies-data, not a generic
 * description. All copy resolves through next-intl; case study fields
 * come localized via flattenCaseStudy.
 */
const FEATURED_SLUGS = [
  "investment-intelligence-platform",
  "asset-management-platform",
  "fintech-card-marketing",
];

export function OurWork() {
  const locale = useLocale() as "en" | "vi";
  const t = useTranslations("home.ourWork");

  const FEATURED = FEATURED_SLUGS.flatMap((slug) => {
    const cs = caseStudies.find((c) => c.id === slug);
    return cs ? [flattenCaseStudy(cs, locale)] : [];
  });

  return (
    <section className="py-20 md:py-28 bg-background-subtle">
      <Container>
        <SectionHeader
          label={t("title")}
          title={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {FEATURED.map((project, i) => {
            const headline = project.beforeAfter[0];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  href={localizeCaseStudyHref(`/case-studies/${project.slug}`, locale)}
                  className="group flex flex-col h-full rounded-2xl bg-card-bg border border-card-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  {/* Product visual — real dashboard imagery per project */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-background-subtle">
                    <Image
                      src={project.images.dashboard.src}
                      alt={`${project.title}: ${project.tagline}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-[10px] font-medium tracking-wide uppercase text-white">
                      {project.industry}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-foreground-muted mb-5">{project.tagline}</p>

                    {/* Headline outcome — the strongest before/after delta */}
                    {headline && (
                      <div className="mb-5 pb-5 border-b border-card-border">
                        <div className="text-3xl font-bold gradient-text-brand leading-none">
                          {headline.improvement}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-foreground-secondary">
                          <span className="font-medium text-foreground-muted">{headline.metric}:</span>
                          <span>{headline.before}</span>
                          <span aria-hidden="true" className="text-brand">→</span>
                          <span className="font-medium">{headline.after}</span>
                        </div>
                      </div>
                    )}

                    {/* Two supporting results */}
                    <ul className="space-y-2 mb-5">
                      {project.keyResults.slice(0, 2).map((result) => (
                        <li key={result} className="flex items-start gap-2 text-xs text-foreground-secondary leading-relaxed">
                          <Check size={13} className="text-brand mt-0.5 shrink-0" aria-hidden="true" />
                          {result}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {/* Delivery meta + tech chips + CTA */}
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
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] text-foreground-muted">
                          {project.timelineDuration} · {project.teamSize}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all">
                          {t("readMore")}
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            {t("viewAll")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
