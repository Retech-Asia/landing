import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { caseStudies } from "@/lib/case-studies-data";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

function CaseStudyImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
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
      loading="lazy"
      sizes={sizes}
    />
  );
}

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real projects. Case studies in healthcare, finance & e-commerce. Vietnam team delivers custom software on time & budget.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "Case Studies",
    description:
      "Real results from real projects. Case studies in healthcare, finance & e-commerce. Custom software on time & budget.",
    url: `${SITE_URL}/case-studies`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies",
    description:
      "Real results from real projects. Case studies in healthcare, finance & e-commerce."
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Case Studies"
        description="Real results from real projects. Explore case studies in healthcare, finance & e-commerce. Custom software on time & budget."
        url={`${SITE_URL}/case-studies`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Case Studies", url: `${SITE_URL}/case-studies` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <GradientBackground variant="hero" />
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Case Studies" }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Case Studies
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              Real-world products solving real-world problems. Explore how Retech Solutions helps businesses transform their ideas into powerful digital solutions.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Case Study Cards */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <AnimatedSection
                key={study.slug}
                variant={index % 2 === 0 ? "slideRight" : "slideLeft"}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
                >
                  {/* Screenshots */}
                  <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                    <TiltCard maxRotate={4}>
                      <SpotlightCard
                        className="spotlight-hover rounded-2xl"
                        radius={400}
                      >
                        <Card hover={false} padding="none" className="overflow-hidden">
                          <div className="flex gap-2 p-3">
                            <div className="flex-[3]">
                              <CaseStudyImage
                                src={study.images.dashboard.src}
                                alt={`${study.title} — dashboard interface screenshot`}
                                width={study.images.dashboard.width}
                                height={study.images.dashboard.height}
                                className="rounded-lg w-full h-auto"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 500px"
                              />
                            </div>
                            <div className="flex-[2]">
                              <CaseStudyImage
                                src={study.images.mobile.src}
                                alt={`${study.title} — mobile application view`}
                                width={study.images.mobile.width}
                                height={study.images.mobile.height}
                                className="rounded-lg w-full h-auto"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 330px"
                              />
                            </div>
                          </div>
                        </Card>
                      </SpotlightCard>
                    </TiltCard>
                  </div>

                  {/* Text */}
                  <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-3">
                      {study.industry}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {study.title}
                    </h2>
                    <p className="text-foreground-muted font-medium text-sm mb-4">
                      {study.tagline}
                    </p>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Quick results */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {study.results.slice(0, 4).map((result) => (
                        <div
                          key={result.metric}
                          className="p-3 rounded-xl bg-background-subtle"
                        >
                          <p className="text-base sm:text-lg font-bold text-foreground">
                            {result.value}
                          </p>
                          <p className="text-xs text-foreground-muted">
                            {result.metric}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all"
                    >
                      Read Case Study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Build Something Great?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                Get a free project estimate within 24 hours. Our team will map out the right approach, timeline, and tech stack for your idea.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get Your Free Estimate
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore Services
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
