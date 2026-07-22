import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  AlertTriangle,
  Sparkles,
  Clock,
  Users,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { caseStudies, getCaseStudy } from "@/lib/case-studies-data";
import { services } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";
import {
  WebPageJsonLd,
  BreadcrumbJsonLd,
  CaseStudyJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { AnimatedMetrics } from "@/components/case-studies/AnimatedMetrics";
import { BeforeAfter } from "@/components/case-studies/BeforeAfter";
import { ProjectTimeline } from "@/components/case-studies/ProjectTimeline";
import {
  HeroParallaxSection,
  TechPillsStagger,
  TestimonialCard,
  BeforeAfterDivider,
} from "./CaseStudyClientComponents";

/* ── Case study to services mapping ─────────────────────────── */
const caseStudyServiceMap: Record<string, string[]> = {
  "wellness-platform": ["cms-platforms", "web-development", "ui-ux-design", "dedicated-teams"],
  "asset-management-platform": ["crm-systems", "erp-solutions", "ui-ux-design", "dedicated-teams"],
};

/* ── Case study to blog posts mapping ─────────────────────── */
const caseStudyBlogMap: Record<string, string[]> = {
  "wellness-platform": ["rise-of-headless-cms-separating-content-from-presentation", "building-accessible-websites-practical-guide-2026"],
  "asset-management-platform": ["erp-modernization-legacy-systems-migration-guide", "cloud-native-erp-microservices-architecture-future", "cms-vs-crm-choosing-right-system-business"],
};

function CaseStudyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div
        className={`relative rounded-lg bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-cyan-500/10 flex items-center justify-center ${className ?? ""}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 rounded-lg" />
        <div className="relative text-foreground-muted/40 text-sm font-medium tracking-wide uppercase">
          {alt.split(" — ")[0]}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
    />
  );
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = getCaseStudy(slug);
    if (!study) return { title: "Case Study Not Found" };

    const pageUrl = `${SITE_URL}/case-studies/${study.slug}`;

    return {
      title: `${study.title} Case Study`,
      description: study.description.length > 155
        ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : study.description,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: `${study.title} Case Study | Retech Solutions`,
        description: study.description.length > 155
          ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : study.description,
        url: pageUrl,
        type: "website",
        images: [
          {
            url: `/case-studies/${study.slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${study.title} Case Study - Retech Solutions`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${study.title} Case Study | Retech Solutions`,
        description: study.description.length > 155
          ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : study.description,
        images: [`/case-studies/${study.slug}/opengraph-image`],
      },
    };
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const relatedStudy = caseStudies.find((cs) => cs.slug !== study.slug);
  const relatedServiceSlugs = caseStudyServiceMap[study.slug] ?? [];
  const relatedServices = services.filter((s) =>
    relatedServiceSlugs.includes(s.slug)
  );
  const relatedBlogSlugs = caseStudyBlogMap[study.slug] ?? [];
  const relatedBlogs = blogPosts.filter((p) =>
    relatedBlogSlugs.includes(p.slug)
  );
  const pageUrl = `${SITE_URL}/case-studies/${study.slug}`;

  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title={`${study.title} Case Study`}
        description={study.description}
        url={pageUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Case Studies", url: `${SITE_URL}/case-studies` },
          { name: study.title, url: pageUrl },
        ]}
      />
      <CaseStudyJsonLd study={study} url={pageUrl} />

      {/* Hero with Parallax */}
      <HeroParallaxSection
        industry={study.industry}
        title={study.title}
        tagline={study.tagline}
        description={study.description}
      />

      {/* Image Gallery */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <TiltCard maxRotate={3}>
              <SpotlightCard
                className="spotlight-hover rounded-2xl"
                radius={500}
              >
                <Card hover={false} padding="none" className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-2 p-3">
                    <div className="flex-[3]">
                      <CaseStudyImage
                        src={study.images.dashboard.src}
                        alt={`${study.title} — dashboard interface screenshot`}
                        width={study.images.dashboard.width}
                        height={study.images.dashboard.height}
                        className="rounded-lg w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                        priority
                      />
                    </div>
                    <div className="flex-[2]">
                      <CaseStudyImage
                        src={study.images.mobile.src}
                        alt={`${study.title} — mobile application view`}
                        width={study.images.mobile.width}
                        height={study.images.mobile.height}
                        className="rounded-lg w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 460px"
                        priority
                      />
                    </div>
                  </div>
                </Card>
              </SpotlightCard>
            </TiltCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* Challenge → Solution → Impact Narrative */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                The Story Behind the Build
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                From problem to lasting impact — how we approached {study.title} end to end.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical connector line (desktop) */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-amber-500/30 via-brand/30 to-accent-cyan/30"
              aria-hidden="true"
            />

            {/* Challenge */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-0">
              <AnimatedSection variant="slideRight" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.challenge}
                  </p>
                </Card>
              </AnimatedSection>

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-amber-500/40 border-2 border-white shadow-sm" />
              </div>

              <div className="hidden lg:block" />
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center my-2 lg:my-0" aria-hidden="true">
              <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-amber-500/20 to-brand/30" />
            </div>

            {/* Solution */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-0">
              <div className="hidden lg:block" />

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-brand/40 border-2 border-white shadow-sm" />
              </div>

              <AnimatedSection variant="slideLeft" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 shrink-0">
                      <Layers size={20} className="text-brand" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Our Solution
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.solution}
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center my-2 lg:my-0" aria-hidden="true">
              <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-brand/30 to-accent-cyan/20" />
            </div>

            {/* Impact */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              <AnimatedSection variant="slideRight" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-cyan/10 shrink-0">
                      <Sparkles size={20} className="text-accent-cyan" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      The Impact
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.impact}
                  </p>
                </Card>
              </AnimatedSection>

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-accent-cyan/40 border-2 border-white shadow-sm" />
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Results Highlight Row */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Key Results
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                Concrete outcomes that made the difference for {study.title}.
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {study.keyResults.map((result, index) => (
              <StaggerItem key={index}>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 mx-auto mb-4">
                    <CheckCircle2 size={20} className="text-brand" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {result}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Project Details Sidebar */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Project Details
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6" staggerDelay={0.12}>
              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 mx-auto mb-4">
                    <Clock size={22} className="text-brand" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    Timeline
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {study.timelineDuration}
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-violet/10 mx-auto mb-4">
                    <Users size={22} className="text-accent-violet" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    Team Size
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {study.teamSize}
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-cyan/10 mx-auto mb-4">
                    <Wrench size={22} className="text-accent-cyan" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    Technologies
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {study.technologies.length} core tools
                  </p>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What We Built
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {study.features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background-subtle border border-black/[0.04]">
                  <span className="mt-0.5 shrink-0" aria-hidden="true">
                    <CheckCircle2 size={16} className="text-brand" />
                  </span>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {feature}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Project Timeline */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Project Timeline
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                From initial discovery to successful launch — our proven delivery process.
              </p>
            </div>
          </AnimatedSection>

          <ProjectTimeline phases={study.timeline} />
        </Container>
      </section>

      {/* Results */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Measurable Impact
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedMetrics results={study.results} />
        </Container>
      </section>

      {/* Before / After */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Before &amp; After
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                A clear picture of how {study.title} improved after our collaboration.
              </p>
            </div>
          </AnimatedSection>

          <BeforeAfter data={study.beforeAfter} />
          <BeforeAfterDivider />
        </Container>
      </section>

      {/* Testimonial — only render when a real quote exists. Otherwise fall
          through to the Key Outcomes block below so the page still has a
          closing proof section. */}
      {study.testimonial.quote ? (
        <section className="py-20 md:py-28">
          <Container>
            <TestimonialCard testimonial={study.testimonial} />
          </Container>
        </section>
      ) : (
        study.keyResults.length > 0 && (
          <section className="py-20 md:py-28 bg-background-subtle">
            <Container>
              <AnimatedSection>
                <div className="text-center mb-12">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand mb-3">
                    Outcomes
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Key Results Delivered
                  </h2>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {study.keyResults.map((result, i) => (
                  <AnimatedSection key={result} variant="slideUp" delay={i * 0.08}>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      </div>
                      <p className="text-base text-foreground-secondary leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </Container>
          </section>
        )
      )}

      {/* Technologies */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Built With
              </h2>
            </div>
          </AnimatedSection>

          <TechPillsStagger technologies={study.technologies} />
        </Container>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-28 bg-background-subtle">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="Services Used in This Project"
                description="The expertise behind this successful delivery."
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <StaggerItem key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block h-full"
                    >
                      <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                        <ServiceIcon size={22} className="text-brand mb-4" />
                        <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                          {service.description}
                        </p>
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
          </Container>
        </section>
      )}

      {/* Related Case Study */}
      {relatedStudy && (
        <section className="py-20 md:py-28 bg-background-subtle">
          <Container>
            <AnimatedSection>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {relatedStudy.title}
                </h2>
                <p className="mt-3 text-foreground-secondary">
                  {relatedStudy.tagline}
                </p>
              </div>
              <div className="flex justify-center">
                <Button href={`/case-studies/${relatedStudy.slug}`} size="lg">
                  View Case Study <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="Read More"
                description="Articles and insights related to this project."
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {relatedBlogs.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded-full px-3 py-1 mb-4">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-brand transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        Read Article
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection variant="slideUp" delay={0.2} className="mt-10 text-center">
              <Button href="/blog" variant="secondary">
                View All Articles <ArrowRight size={15} />
              </Button>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA with enhanced gradient */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-violet-500/[0.04]" aria-hidden="true" />
        <GradientBackground variant="cta" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" aria-hidden="true" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Want Results Like These?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                Get a free project estimate within 24 hours. Tell us about your vision and we will map out the right solution, team, and timeline.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get Your Free Estimate
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  <ArrowLeft size={16} aria-hidden="true" />
                  All Case Studies
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
