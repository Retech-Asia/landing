import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbJsonLd, ServiceJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import {
  industries,
  getIndustryBySlug,
  getFlatIndustry,
  flattenIndustry,
  type FlatIndustry,
} from "@/lib/industries-data";
import { services } from "@/lib/services-data";
import { caseStudies, flattenCaseStudy } from "@/lib/case-studies-data";
import { SITE_URL } from "@/lib/constants";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/* -- Static Params -------------------------------------------------------- */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((industry) => ({ locale, slug: industry.slug[locale] }))
  );
}

// All valid locale+slug combos are enumerated above — anything else 404s
// statically. Without this, unknown slugs render on demand and notFound()
// streams after the 200 headers (soft-404, bad for SEO).
export const dynamicParams = false;

/* -- Metadata ------------------------------------------------------------ */
export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug, locale }) => {
    const loc = locale as Locale;
    const industry = getFlatIndustry(slug, loc);
    if (!industry) {
      // Throw before metadata resolves (not just in the page body) —
      // otherwise headers stream with 200 and the not-found page renders
      // under a 200 status.
      notFound();
    }

    const pageUrl = `${SITE_URL}/${locale}/industries/${industry.slug}`;
    const raw = getIndustryBySlug(industry.slug, loc);
    const enUrl = `${SITE_URL}/en/industries/${raw?.slug.en ?? industry.slug}`;
    const viUrl = `${SITE_URL}/vi/industries/${raw?.slug.vi ?? industry.slug}`;

    // Locale-aware title — avoids mixed-language titles like
    // "Y tế Software Development" on /vi.
    const pageTitle = loc === "vi"
      ? `Phát triển Phần mềm ${industry.name}`
      : `${industry.name} Software Development`;

    return {
      title: pageTitle,
      description: industry.longDescription.length > 155
        ? industry.longDescription.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : industry.longDescription,
      alternates: {
        canonical: pageUrl,
        languages: {
          en: enUrl,
          vi: viUrl,
          "x-default": enUrl,
        },
      },
      openGraph: {
        title: `${pageTitle} | Retech Solutions`,
        description: industry.longDescription.length > 155
          ? industry.longDescription.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : industry.longDescription,
        url: pageUrl,
        type: "website",
        // OG image omitted — Next.js auto-uses src/app/opengraph-image.tsx
      },
      twitter: {
        card: "summary_large_image",
        title: `${industry.name} Software Development | Retech Solutions`,
        description: industry.longDescription.length > 155
          ? industry.longDescription.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : industry.longDescription
      },
    };
  });
}

/* -- Visual-break imagery (per-industry, 2026-10-23 sourcing pass) --------
 * Keyed by the locale-resolved slug (industry.slug). The four curated
 * photos replace the shared analytics-dashboard break for their industries;
 * honest descriptive alts (they describe the photograph, never implying a
 * Retech product is shown). All other industries keep the dashboard image
 * as a deliberate neutral fallback. Registry: docs/imagery-asset-register.md
 * + src/lib/photography.ts (canonical Unsplash page + creator recorded).
 */
const INDUSTRY_IMAGES: Record<
  string,
  { src: string; alt: { en: string; vi: string } }
> = {
  healthcare: {
    src: "/images/photo/photo-industry-healthcare.webp",
    alt: {
      en: "Two doctors reviewing information together on a tablet",
      vi: "Hai bác sĩ cùng xem thông tin trên máy tính bảng",
    },
  },
  "y-te": {
    src: "/images/photo/photo-industry-healthcare.webp",
    alt: {
      en: "Two doctors reviewing information together on a tablet",
      vi: "Hai bác sĩ cùng xem thông tin trên máy tính bảng",
    },
  },
  education: {
    src: "/images/photo/photo-industry-education.webp",
    alt: {
      en: "Students collaborating around a laptop",
      vi: "Nhóm học viên cùng làm việc quanh một chiếc laptop",
    },
  },
  "giao-duc": {
    src: "/images/photo/photo-industry-education.webp",
    alt: {
      en: "Students collaborating around a laptop",
      vi: "Nhóm học viên cùng làm việc quanh một chiếc laptop",
    },
  },
  logistics: {
    src: "/images/photo/photo-industry-logistics.webp",
    alt: {
      en: "Warehouse associate working among storage shelves",
      vi: "Nhân viên kho làm việc giữa các kệ hàng",
    },
  },
  "e-commerce": {
    src: "/images/photo/photo-industry-ecommerce.webp",
    alt: {
      en: "Retailer checking an order beside packed boxes and a laptop",
      vi: "Nhân viên bán hàng kiểm tra đơn cạnh các thùng hàng và laptop",
    },
  },
  "thuong-mai-dien-tu": {
    src: "/images/photo/photo-industry-ecommerce.webp",
    alt: {
      en: "Retailer checking an order beside packed boxes and a laptop",
      vi: "Nhân viên bán hàng kiểm tra đơn cạnh các thùng hàng và laptop",
    },
  },
};

/* -- Related case studies lookup ----------------------------------------- */
function getRelatedCaseStudies(industry: FlatIndustry, locale: Locale) {
  return caseStudies.filter(
    (cs) =>
      cs.industry[locale] === industry.caseStudyIndustry ||
      cs.industry[locale].toLowerCase().includes(industry.slug.replace("-", " "))
  );
}

/* -- Related services lookup --------------------------------------------- */
function getRelatedServices(industry: FlatIndustry) {
  return industry.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug.en === slug))
    .filter(Boolean) as typeof services;
}

/* -- Page Component ------------------------------------------------------ */
export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industryDetail" });
  const industry = getFlatIndustry(slug, loc);

  if (!industry) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/${locale}/industries/${industry.slug}`;

  const paragraphs = industry.longDescription.split("\n\n").filter(Boolean);

  const otherIndustries = industries
    .filter((i) => i.id !== industry.id)
    .map((i) => flattenIndustry(i, loc));

  const relatedCaseStudies = getRelatedCaseStudies(industry, loc);
  const relatedServices = getRelatedServices(industry);

  // Locale-aware JSON-LD label — matches the <title> pattern.
  const jsonLdLabel = loc === "vi"
    ? `Phát triển Phần mềm ${industry.name}`
    : `${industry.name} Software Development`;

  return (
    <>
      {/* -- Structured Data ---------------------------------------------- */}
      <WebPageJsonLd
        title={jsonLdLabel}
        description={industry.longDescription.slice(0, 160)}
        url={pageUrl}
      />
      <ServiceJsonLd
        name={jsonLdLabel}
        description={industry.longDescription.slice(0, 160)}
        url={pageUrl}
        serviceType={jsonLdLabel}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t("breadcrumbJsonLd.home"), url: `${SITE_URL}/${locale}` },
          { name: t("breadcrumbJsonLd.industries"), url: `${SITE_URL}/${locale}/industries` },
          { name: industry.name, url: pageUrl },
        ]}
      />

      {/* -- Hero Section ------------------------------------------------- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <GradientBackground variant="hero" />
        <GridPattern className="opacity-50" />
        <div
          className="absolute inset-0 dot-pattern pointer-events-none opacity-30"
          aria-hidden="true"
        />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <BreadcrumbNav
              items={[
                { label: t("breadcrumb.home"), href: "/" },
                { label: t("breadcrumb.industries"), href: "/industries" },
                { label: industry.name },
              ]}
            />
          </AnimatedSection>

          <div className="max-w-3xl relative">
            {/* 2026-10-27 (decorative-icon retirement): the hero glass tile is
                gone — the h1 carries the opening. */}
            <AnimatedSection variant="slideUp" delay={0.12}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {industry.name} Software Development
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.18}>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {industry.description}
              </p>
              {/* Hairline divider */}
              <div className="h-px w-24 bg-foreground/20 mt-4" />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.24}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Button href="/contact" size="lg">
                  <Mail size={18} />
                  Discuss Your Project
                </Button>
                <Button href="/industries" variant="secondary" size="lg">
                  <ArrowLeft size={18} />
                  All Industries
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* -- Key Statistics ------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-background-subtle relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {industry.stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  {stat.word ? (
                    // Qualitative design-consideration card (e.g. healthcare,
                    // where numeric KPIs would be unsupported claims).
                    <p className={`text-2xl md:text-3xl font-bold ${industry.color}`}>
                      {stat.word}
                    </p>
                  ) : (
                    <p className={`text-3xl md:text-4xl font-bold ${industry.color}`}>
                      <AnimatedCounter
                        target={stat.value ?? 0}
                        suffix={stat.suffix ?? ""}
                        duration={2000}
                      />
                    </p>
                  )}
                  {stat.label && (
                    <p className="text-sm text-foreground-secondary mt-2 leading-snug">
                      {stat.label}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* -- Overview ----------------------------------------------------- */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <div className="max-w-3xl mx-auto space-y-4 text-foreground-secondary leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <SectionDivider />

      {/* Visual break — per-industry photo between Overview and Approach */}
      <div className="relative h-[180px] md:h-[260px] overflow-hidden">
        <Image
          src={INDUSTRY_IMAGES[industry.slug]?.src ?? "/images/stock/analytics-dashboard.webp"}
          alt={
            INDUSTRY_IMAGES[industry.slug]?.alt[loc] ??
            (loc === "vi"
              ? "Màn hình máy tính hiển thị bảng phân tích dữ liệu"
              : "Laptop screen showing data analytics dashboards")
          }
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* -- Our Approach -------------------------------------------------- */}
      <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={t("approach.eyebrow")}
              title={t("approach.title")}
              description={`How we deliver successful ${industry.name.toLowerCase()} software projects, from discovery to deployment.`}
            />
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.approach.map((step, i) => {
                return (
                  <AnimatedSection
                    key={step.step}
                    variant="slideUp"
                    delay={i * 0.1}
                  >
                    <div className="relative rounded-2xl bg-card-bg border border-card-border p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full">
                      <p className="text-sm font-mono font-semibold text-brand tracking-wider mb-4">
                        {step.step}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {step.description}
                      </p>
                      {/* Connector line between steps (on md+) */}
                      {i < industry.approach.length - 1 && i % 2 === 0 && (
                        <div
                          className="hidden md:block absolute -right-3 top-1/2 w-6 h-px bg-border"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* -- Challenges & Solutions ----------------------------------------
           Hallmark · redesign: problem-ledger · genre: editorial
           system: site tokens (docs/design-system.md) — --card-bg, --rule-soft,
           --brand (decorative-only); one reveal; no per-row chips. */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={t("problems.label")}
              title={t("problems.title")}
              description={t("problems.description", {
                industry: industry.name.toLowerCase(),
              })}
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.08}>
            <div
              data-problem-ledger="true"
              className="max-w-6xl mx-auto rounded-2xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
            >
              {/* Column headers — stated once for the whole ledger */}
              <div className="hidden md:grid grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] border-b border-rule-soft">
                <div aria-hidden="true" />
                <h3 className="px-6 pb-3 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                  {t("problems.challengeLabel")}
                </h3>
                <h3 className="px-6 pb-3 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50 md:border-l md:border-rule-soft">
                  {t("problems.solutionLabel")}
                </h3>
              </div>

              {industry.challenges.map((challenge, i) => {
                const solution = industry.solutions[i] || "";
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={i}
                    className="border-b border-rule-soft last:border-b-0 md:grid md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)]"
                  >
                    {/* Ghost numeral (desktop rail) */}
                    <div className="hidden md:flex items-start justify-center pt-7">
                      <span
                        aria-hidden="true"
                        className="font-display text-xl leading-none text-foreground/30 tabular-nums"
                      >
                        {num}
                      </span>
                    </div>

                    {/* Challenge */}
                    <div className="flex items-start gap-3 px-5 pb-2 pt-6 md:block md:px-6 md:pb-6">
                      <span
                        aria-hidden="true"
                        className="font-display text-sm leading-[1.7] text-foreground/30 tabular-nums md:hidden"
                      >
                        {num}
                      </span>
                      <p className="text-[15px] font-medium leading-relaxed text-foreground">
                        {challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="flex items-start gap-2.5 px-5 pb-6 pt-1 md:gap-3 md:px-6 md:pt-6 md:border-l md:border-rule-soft">
                      {/* Hairline dash marker — check icons retired with the
                          decorative-icon language (2026-10-27). */}
                      <span
                        aria-hidden="true"
                        className="mt-3 h-px w-4 shrink-0 bg-foreground/40"
                      />
                      <p className="text-[15px] leading-relaxed text-foreground/80">
                        {solution}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* -- Technologies ------------------------------------------------- */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("technologies.title")}
              description={`The stacks we build on for ${industry.name.toLowerCase()} projects, chosen project by project.`}
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {industry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-4 py-2 text-sm font-medium text-foreground-secondary rounded-full border border-card-border bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-brand/30 hover:text-brand cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* -- Related Case Studies ----------------------------------------- */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
          <GradientBackground variant="subtle" />
          <Container className="relative">
            <AnimatedSection variant="slideUp">
              <SectionHeader
                label="Case Studies"
                title={t("results.title")}
                description={`Real projects we've delivered in the ${industry.name.toLowerCase()} space.`}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedCaseStudies.map((rawCs) => {
                const cs = flattenCaseStudy(rawCs, loc);
                return (
                <StaggerItem key={cs.id}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group block h-full"
                  >
                    <Card padding="lg" className="h-full">
                      <Badge variant="brand" className="mb-4">
                        {cs.industry}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                        {cs.tagline}
                      </p>
                      {/* Verified technologies (vanity stat grid removed with
                          the owner corrections directive 2026-10-22). */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {cs.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-brand/[0.04] border border-card-border text-xs font-medium text-foreground-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand mt-5 group-hover:gap-2.5 transition-all duration-300">
                        Read Case Study
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* -- Case Study Excerpt (fallback when no specific case studies) --- */}
      {relatedCaseStudies.length === 0 && (
        <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
          <Container>
            <AnimatedSection variant="slideUp">
              <div className="max-w-3xl mx-auto rounded-2xl bg-card-bg border border-card-border p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Proven Track Record
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {industry.caseStudyExcerpt}
                    </p>
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-4 hover:gap-2.5 transition-all duration-300"
                    >
                      View Our Case Studies
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* -- Related Services --------------------------------------------- */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-28 relative overflow-hidden">
          <Container className="relative">
            <AnimatedSection variant="slideUp">
              <SectionHeader
                label={t("relatedServices.eyebrow")}
                title={t("relatedServices.title")}
                description={`The core capabilities we bring to ${industry.name.toLowerCase()} projects.`}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                if (!service) return null;
                return (
                  <StaggerItem key={service.id}>
                    <Link
                      href={`/services/${service.slug[loc]}`}
                      className="group block h-full rg-glass-control"
                    >
                      <Card padding="lg" className="h-full">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                          {service.title[loc]}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                          {service.subtitle[loc]}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          {t("learnMore")}
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Container>
        </section>
      )}

      <SectionDivider />

      {/* -- Other Industries --------------------------------------------- */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("otherIndustries.title")}
              description={t("otherIndustries.description")}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherIndustries.map((other) => {
              return (
                <StaggerItem key={other.slug}>
                  <Link
                    href={`/industries/${other.slug}`}
                    className="group block h-full rg-glass-control"
                  >
                    <Card padding="lg" className="h-full">
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                        {other.name}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                        {other.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        {t("learnMore")}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* -- CTA Section -------------------------------------------------- */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Ready to Build Your{" "}
                <span className="text-white/70">
                  {industry.name} Solution?
                </span>
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Get a free consultation with our team. We&apos;ll discuss your
                requirements, timeline, and the best approach for your project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-card-bg text-foreground hover:bg-card-bg"
                >
                  <Mail size={18} />
                  Discuss Your Project
                </Button>
                <Button
                  href="/industries"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  All Industries
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
