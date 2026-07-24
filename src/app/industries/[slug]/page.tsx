import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Compass,
  Wrench,
  Layers,
  Rocket,
  ChevronRight,
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
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import {
  industries,
  getIndustryBySlug,
  type Industry,
} from "@/lib/industries-data";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { SITE_URL } from "@/lib/constants";

/* -- Static Params -------------------------------------------------------- */
export function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

/* -- Metadata ------------------------------------------------------------ */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const industry = getIndustryBySlug(slug);
    if (!industry) {
      return { title: "Industry Not Found" };
    }

    const pageUrl = `${SITE_URL}/industries/${industry.slug}`;

    return {
      title: `${industry.name} Software Development`,
      description: industry.longDescription.length > 155
        ? industry.longDescription.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : industry.longDescription,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: `${industry.name} Software Development | Retech Solutions`,
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

/* -- Approach step icon mapping ------------------------------------------ */
const approachIcons = [Compass, Layers, Wrench, Rocket];

/* -- Related case studies lookup ----------------------------------------- */
function getRelatedCaseStudies(industry: Industry) {
  return caseStudies.filter(
    (cs) =>
      cs.industry === industry.caseStudyIndustry ||
      cs.industry.toLowerCase().includes(industry.slug.replace("-", " "))
  );
}

/* -- Related services lookup --------------------------------------------- */
function getRelatedServices(industry: Industry) {
  return industry.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);
}

/* -- Page Component ------------------------------------------------------ */
export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const Icon = industry.icon;
  const pageUrl = `${SITE_URL}/industries/${industry.slug}`;

  const paragraphs = industry.longDescription.split("\n\n").filter(Boolean);

  const otherIndustries = industries.filter(
    (i) => i.slug !== industry.slug
  );

  const relatedCaseStudies = getRelatedCaseStudies(industry);
  const relatedServices = getRelatedServices(industry);

  return (
    <>
      {/* -- Structured Data ---------------------------------------------- */}
      <WebPageJsonLd
        title={`${industry.name} Software Development`}
        description={industry.longDescription.slice(0, 160)}
        url={pageUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
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
        {/* Industry-specific gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-40 pointer-events-none`}
          aria-hidden="true"
        />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Industries", href: "/industries" },
                { label: industry.name },
              ]}
            />
          </AnimatedSection>

          <div className="max-w-3xl relative">
            {/* Large semi-transparent icon behind the title */}
            <div
              className="absolute -top-8 -right-8 md:-right-16 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Icon
                size={220}
                className={`${industry.color} opacity-[0.06]`}
                strokeWidth={0.8}
              />
            </div>

            <AnimatedSection variant="slideUp" delay={0.06}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/[0.04] mb-6">
                <Icon size={28} className={industry.color} />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.12}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {industry.name} Software Development
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.18}>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {industry.description}
              </p>
              {/* Gradient divider */}
              <div className="h-px w-24 bg-gradient-to-r from-brand via-accent-cyan to-accent-violet rounded-full mt-4" />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.24}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Button href="/contact" size="lg">
                  <Mail size={18} />
                  Get a Free Consultation
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
                  <p className={`text-3xl md:text-4xl font-bold ${industry.color}`}>
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </p>
                  <p className="text-sm text-foreground-secondary mt-2 leading-snug">
                    {stat.label}
                  </p>
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

      {/* Visual break — relevant stock photo between Overview and Approach */}
      <div className="relative h-[180px] md:h-[260px] overflow-hidden">
        <Image
          src="/images/stock/analytics-dashboard.webp"
          alt={`${industry.name} software solutions in action`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* -- Our Approach -------------------------------------------------- */}
      <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="Methodology"
              title="Our Approach"
              description={`How we deliver successful ${industry.name.toLowerCase()} software projects — from discovery to deployment.`}
            />
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.approach.map((step, i) => {
                const StepIcon = approachIcons[i] || Compass;
                return (
                  <AnimatedSection
                    key={step.step}
                    variant="slideUp"
                    delay={i * 0.1}
                  >
                    <div className="relative rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full">
                      {/* Step number badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand/[0.04]">
                          <StepIcon size={20} className={industry.color} />
                        </div>
                        <span className="text-sm font-mono font-semibold text-brand tracking-wider">
                          {step.step}
                        </span>
                      </div>
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

      {/* -- Challenges & Solutions (Side-by-Side) -------------------------- */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="Challenges & Solutions"
              title="From Problem to Solution"
              description={`The ${industry.name.toLowerCase()} industry faces unique technical and regulatory challenges. Here is how we solve them.`}
            />
          </AnimatedSection>

          <div className="max-w-6xl mx-auto space-y-5">
            {industry.challenges.map((challenge, i) => {
              const solution = industry.solutions[i] || "";
              return (
                <AnimatedSection
                  key={i}
                  variant="slideUp"
                  delay={i * 0.08}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-0 md:gap-0 items-stretch">
                    {/* Challenge (left) */}
                    <div className="rounded-2xl md:rounded-r-none bg-white border border-black/[0.06] md:border-r-0 p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-amber-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50">
                          <AlertTriangle
                            size={16}
                            className="text-amber-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
                            Challenge {i + 1}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {challenge}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Connector arrow (center) */}
                    <div className="hidden md:flex items-center justify-center w-12 relative">
                      {/* Gradient line behind the arrow */}
                      <div
                        className="absolute inset-y-0 left-0 right-0 w-px bg-gradient-to-b from-amber-300 via-brand to-brand"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-brand shadow-sm flex items-center justify-center">
                        <ChevronRight size={16} className="text-brand" />
                      </div>
                    </div>

                    {/* Mobile arrow */}
                    <div className="flex md:hidden items-center justify-center py-2">
                      <div className="flex flex-col items-center gap-0">
                        <div className="w-px h-3 bg-gradient-to-b from-amber-300 to-brand" />
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-brand shadow-sm flex items-center justify-center">
                          <ChevronRight size={14} className="text-brand rotate-90" />
                        </div>
                        <div className="w-px h-3 bg-brand" />
                      </div>
                    </div>

                    {/* Solution (right) */}
                    <div className="rounded-2xl md:rounded-l-none bg-white border border-black/[0.06] md:border-l-0 p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10">
                          <CheckCircle2
                            size={16}
                            className="text-brand"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-brand uppercase tracking-wider mb-1">
                            Solution {i + 1}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* -- Technologies ------------------------------------------------- */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="Technologies We Use"
              description={`The tools and frameworks we leverage to deliver robust, scalable solutions for the ${industry.name.toLowerCase()} industry.`}
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {industry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-4 py-2 text-sm font-medium text-foreground-secondary rounded-full border border-black/[0.08] bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-brand/30 hover:text-brand cursor-default"
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
                title="Proven Results"
                description={`Real projects we've delivered in the ${industry.name.toLowerCase()} space.`}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedCaseStudies.map((cs) => (
                <StaggerItem key={cs.slug}>
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
                      {/* Key metrics */}
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        {cs.results.slice(0, 4).map((r, i) => (
                          <div
                            key={i}
                            className="text-center p-2 rounded-lg bg-brand/[0.02]"
                          >
                            <p className="text-lg font-bold text-brand">
                              {r.value}
                            </p>
                            <p className="text-xs text-foreground-secondary">
                              {r.metric}
                            </p>
                          </div>
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
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* -- Case Study Excerpt (fallback when no specific case studies) --- */}
      {relatedCaseStudies.length === 0 && (
        <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
          <Container>
            <AnimatedSection variant="slideUp">
              <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    size={24}
                    className="text-brand shrink-0 mt-0.5"
                  />
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
                label="Services"
                title="Related Services"
                description={`The core capabilities we bring to ${industry.name.toLowerCase()} projects.`}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                if (!service) return null;
                const ServiceIcon = service.icon;
                return (
                  <StaggerItem key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block h-full"
                    >
                      <Card padding="lg" className="h-full">
                        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand/[0.04] group-hover:bg-white/80 transition-colors duration-300">
                          <ServiceIcon
                            size={20}
                            className="text-brand"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                          {service.subtitle}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          Learn More
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
              title="Other Industries We Serve"
              description="Explore how we help businesses across different sectors."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherIndustries.map((other) => {
              const OtherIcon = other.icon;
              return (
                <StaggerItem key={other.slug}>
                  <Link
                    href={`/industries/${other.slug}`}
                    className="group block h-full"
                  >
                    <Card padding="lg" className="h-full">
                      <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand/[0.04] group-hover:bg-white/80 transition-colors duration-300">
                        <OtherIcon size={20} className={other.color} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                        {other.name}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                        {other.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        Learn More
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
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  <Mail size={18} />
                  Get a Free Consultation
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
