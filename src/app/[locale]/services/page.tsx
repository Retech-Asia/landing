import { Suspense } from "react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
  ArrowRight,
  Search,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { ServiceGridSkeleton } from "@/components/ui/Skeleton";
import { ServiceQuiz } from "@/components/ui/ServiceQuiz";
import { ServiceExplorer } from "@/components/ui/ServiceExplorer";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services-data";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "IT Outsourcing Services" : "Dịch vụ Gia công IT";
  const description = isEn
    ? "Custom CMS, CRM, ERP, web apps, UI/UX design & dedicated teams from Vietnam. Full-cycle IT outsourcing services for global businesses."
    : "CMS, CRM, ERP, ứng dụng web, UI/UX và đội chuyên trách từ Việt Nam. Dịch vụ gia công IT toàn vòng đời cho doanh nghiệp toàn cầu.";
  const enUrl = `${SITE_URL}/en/services`;
  const viUrl = `${SITE_URL}/vi/services`;
  const canonical = isEn ? enUrl : viUrl;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: enUrl, vi: viUrl, "x-default": enUrl },
    },
    openGraph: {
      title: isEn ? "IT Outsourcing Services from Vietnam" : "Dịch vụ Gia công IT từ Việt Nam",
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "IT Outsourcing Services from Vietnam" : "Dịch vụ Gia công IT từ Việt Nam",
      description,
    },
  };
}


const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your business goals, challenges, and requirements to define a clear project scope and success criteria.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Design",
    description:
      "Our designers create wireframes, prototypes, and visual designs that align with your brand and optimize user experience.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development",
    description:
      "Engineers build your solution using modern frameworks, agile sprints, and continuous integration with transparent progress updates.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Delivery",
    description:
      "We launch, monitor, and optimize your product, providing ongoing support, maintenance, and iterative improvements.",
  },
];

/**
 * Feature comparison matrix.
 * Order of booleans maps to `services` array:
 *   [CMS Platforms, CRM Systems, ERP Solutions, Web Development, UI/UX Design, Dedicated Teams]
 */
const comparisonFeatures: {
  feature: string;
  tooltip: string;
  supported: boolean[];
}[] = [
  // -- Core capabilities --
  {
    feature: "Custom Development",
    tooltip: "Bespoke software built from scratch to match your unique business requirements.",
    supported: [true, true, true, true, true, true],
  },
  {
    feature: "CMS Integration",
    tooltip: "Connect and extend content management systems like WordPress, Strapi, or Contentful.",
    supported: [true, false, false, true, false, false],
  },
  {
    feature: "CRM Integration",
    tooltip: "Integrate or build customer relationship management tools such as Salesforce or HubSpot.",
    supported: [false, true, true, true, false, false],
  },
  {
    feature: "ERP Capabilities",
    tooltip: "Full enterprise resource planning: finance, HR, procurement, inventory in one platform.",
    supported: [false, false, true, false, false, false],
  },
  // -- Technical features --
  {
    feature: "Mobile App",
    tooltip: "Native or cross-platform mobile application development for iOS and Android.",
    supported: [false, false, true, true, false, false],
  },
  {
    feature: "AI / ML",
    tooltip: "Machine learning features like smart recommendations, prediction, and automation.",
    supported: [true, true, true, true, false, false],
  },
  {
    feature: "Cloud Deployment",
    tooltip: "Deploy to AWS, GCP, or Azure with scalable, high-availability infrastructure.",
    supported: [false, false, true, true, false, false],
  },
  // -- Cross-cutting --
  {
    feature: "UI/UX Design",
    tooltip: "User research, wireframes, prototypes, and high-fidelity visual design.",
    supported: [true, true, true, true, true, false],
  },
  {
    feature: "Ongoing Support",
    tooltip: "Post-launch maintenance, monitoring, updates, and performance optimization.",
    supported: [true, true, true, true, true, true],
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Our Services"
        description="Custom CMS, CRM, ERP, web apps, UI/UX design & dedicated teams. Full-spectrum development services."
        url={`${SITE_URL}/${locale}/services`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Services", url: `${SITE_URL}/${locale}/services` },
        ]}
      />
      {/* ItemList structured data for the services overview */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Retech Solutions Services",
            description:
              "Full-spectrum IT services from Vietnam: CMS, CRM, ERP, web development, UI/UX design, and dedicated teams.",
            numberOfItems: services.length,
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title[loc],
              url: `${SITE_URL}/${locale}/services/${s.slug[loc]}`,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* -- Hero / Header ---------------------------------------------- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <Container className="relative">
          <div className="page-hero-enter">
            <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          </div>
          <div className="page-hero-enter" style={{ animationDelay: "80ms" }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto gradient-text">
              What We Build
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
              From content platforms to enterprise resource planning, we deliver end-to-end software solutions that help businesses grow smarter and faster.
            </p>
          </div>
        </Container>
      </section>

      {/* -- Find Your Service Quiz ------------------------------------- */}
      <section className="relative py-16 md:py-20">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="Quick Match"
              title="Find Your Service"
              description="Answer three quick questions and we'll point you to the service that fits your project best."
            />
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <ServiceQuiz />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* -- Service Explorer ------------------------------------------ */}
      <section className="relative py-16 md:py-20">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="Project Explorer"
              title="Map Your Project"
              description="Select your project type and instantly see which services, timeline, and team size we recommend."
            />
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <ServiceExplorer />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* -- Service Cards Grid ----------------------------------------- */}
      <section className="relative py-20 md:py-28">
        <Container>
          <Suspense fallback={<ServiceGridSkeleton />}>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                const iconColor =
                  i % 3 === 0
                    ? "text-brand"
                    : i % 3 === 1
                    ? "text-accent-cyan"
                    : "text-accent-violet";
                return (
                  <StaggerItem key={service.id} className="h-full">
                    <Link href={`/services/${service.slug[loc]}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-2xl focus-visible:ring-offset-2">
                      <div className="relative h-full rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-8 transition-all duration-300 hover:border-foreground/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                        {/* Icon */}
                        <Icon size={28} className={`${iconColor} mb-5`} />

                        {/* Content */}
                        <h2 className="text-xl font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                          {service.title[loc]}
                        </h2>
                        <p className="text-sm font-medium text-foreground-muted mb-3">
                          {service.subtitle[loc]}
                        </p>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                          {service.description[loc]}
                        </p>

                        {/* Learn More link */}
                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          Learn More
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Suspense>
        </Container>
      </section>

      {/* -- Service Comparison Table ------------------------------------ */}
      <section className="relative py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="Compare Our Services"
              description="Find the right solution for your business needs. See which capabilities each service includes at a glance."
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            {/* -- Desktop Table (md+) ------------------------------------ */}
            <div className="hidden md:block rounded-2xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="sticky left-0 z-10 bg-card-bg px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary whitespace-nowrap">
                        Feature
                      </th>
                      {services.map((service) => {
                        const ServiceIcon = service.icon;
                        return (
                          <th key={service.id} className="px-4 py-4 text-center whitespace-nowrap">
                            <div className="flex flex-col items-center gap-1.5">
                              <ServiceIcon size={18} className="text-brand" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                {service.title[loc].split(" ")[0]}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, rowIdx) => (
                      <tr
                        key={row.feature}
                        className={rowIdx % 2 === 0 ? "bg-black/[0.012]" : "bg-transparent"}
                      >
                        <td className="sticky left-0 z-10 px-5 py-3.5 font-medium text-foreground whitespace-nowrap bg-inherit text-sm">
                          <Tooltip content={row.tooltip} as="span" side="top">
                            <span className="inline-flex items-center gap-1.5 cursor-help">
                              {row.feature}
                              <HelpCircle
                                size={13}
                                className="text-foreground-muted/50"
                              />
                            </span>
                          </Tooltip>
                        </td>
                        {row.supported.map((isSupported, colIdx) => (
                          <td key={colIdx} className="px-4 py-3.5 text-center">
                            {isSupported ? (
                              <CheckCircle2 size={18} className="inline-block text-brand" />
                            ) : (
                              <span className="inline-block text-foreground-muted/30 text-base leading-none select-none">
                                &mdash;
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* -- Mobile Cards (< md) ------------------------------------ */}
            <div className="md:hidden space-y-4">
              {services.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-card-border bg-card-bg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <ServiceIcon size={20} className="text-brand" />
                      <h2 className="text-base font-semibold text-foreground">
                        {service.title[loc]}
                      </h2>
                    </div>
                    <ul className="space-y-2.5">
                      {comparisonFeatures.map((row) => {
                        const colIndex = services.findIndex(
                          (s) => s.id === service.id,
                        );
                        const isSupported = row.supported[colIndex];
                        return (
                          <li key={row.feature} className="flex items-center justify-between text-sm">
                            <Tooltip content={row.tooltip} as="span" side="top">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1",
                                  isSupported ? "text-foreground" : "text-foreground-muted/40",
                                )}
                              >
                                {row.feature}
                                <HelpCircle
                                  size={12}
                                  className="text-foreground-muted/40 shrink-0"
                                />
                              </span>
                            </Tooltip>
                            {isSupported ? (
                              <CheckCircle2 size={16} className="text-brand shrink-0" />
                            ) : (
                              <span className="text-foreground-muted/30 text-sm select-none">
                                &mdash;
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* -- How We Work ------------------------------------------------ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="How We Work"
              description="A proven four-phase approach that turns your ideas into production-ready products, on time and on budget."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="relative rounded-2xl bg-card-bg border border-card-border backdrop-blur-sm p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-black/[0.06] leading-none">
                        {step.step}
                      </span>
                      <StepIcon size={18} className="text-foreground-secondary" />
                    </div>

                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* -- CTA --------------------------------------------------------- */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden border-t border-gradient">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Let&apos;s Build Your Solution
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Get a free project estimate within 24 hours. Our team will craft a tailored
                solution with the right team, technology, and timeline for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-card-bg text-foreground hover:bg-card-bg"
                >
                  Get Your Free Estimate
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href="/case-studies"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  See Our Work
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
