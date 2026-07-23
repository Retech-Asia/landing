import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import {
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { IndustryExplorer } from "@/components/ui/IndustryExplorer";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Custom software for Healthcare, Finance, E-commerce & more. CMS, CRM, ERP and AI-powered solutions tailored to your industry.",
  alternates: {
    canonical: `${SITE_URL}/industries`,
  },
  openGraph: {
    title: "Industries We Serve",
    description:
      "Custom software for Healthcare, Finance, E-commerce & more. CMS, CRM, ERP tailored to your industry.",
    url: `${SITE_URL}/industries`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve",
    description:
      "Custom software for Healthcare, Finance, E-commerce & more."
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Industries We Serve"
        description="Custom software for Healthcare, Finance, E-commerce & more. Industry-specific CMS, CRM, ERP and AI solutions."
        url={`${SITE_URL}/industries`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <Container className="relative z-10">
          <BreadcrumbNav
            items={[{ label: "Home", href: "/" }, { label: "Industries" }]}
          />
          <div className="page-hero-enter">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Industries We Serve
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              From healthcare to finance, e-commerce to manufacturing — we bring
              deep domain expertise and proven technical capabilities to every
              industry we work in.
            </p>
          </div>

          {/* Quick stats bar */}
          <AnimatedSection variant="slideUp" delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-x-6 sm:gap-x-12 gap-y-4">
              {[
                { value: 9, suffix: "", label: "Industries" },
                { value: 50, suffix: "+", label: "Projects Delivered" },
                { value: 40, suffix: "-60%", label: "Cost Savings" },
                { value: 6, suffix: "", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </span>
                  <span className="text-sm text-foreground-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <SectionDivider />

      {/* Industries Explorer — Interactive grid with filters and expandable cards */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
              Explore Our Industries
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto text-center mb-10 leading-relaxed">
              Filter by category, expand any industry for a quick look at challenges, solutions, and technologies.
            </p>
          </AnimatedSection>
          <IndustryExplorer />
        </Container>
      </section>

      {/* Why Vietnam */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why Companies Choose Vietnam for Industry Software
                </h2>
                <div className="space-y-4 text-foreground-secondary leading-relaxed">
                  <p>
                    Vietnam has rapidly emerged as one of Southeast Asia&apos;s
                    established technology hubs, producing a growing pipeline of
                    skilled engineers who specialize in enterprise-grade software
                    development. With strong university programs in computer
                    science and a culture that emphasizes analytical thinking,
                    Vietnamese development teams consistently deliver
                    high-quality solutions across complex industry domains — from
                    healthcare compliance systems to real-time financial
                    platforms.
                  </p>
                  <p>
                    Partnering with a Vietnam-based team gives international
                    companies access to deep technical talent at a fraction of
                    Western market rates, without sacrificing quality. The GMT+7
                    timezone also enables productive overlap with both European
                    and Australian business hours, making real-time collaboration
                    seamless.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <Card padding="lg" hover={false} className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-brand">
                      <AnimatedCounter target={50} suffix="K+" duration={2000} />
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      IT graduates annually
                    </p>
                  </div>
                  <div className="border-t border-black/[0.06]" />
                  <div>
                    <p className="text-3xl font-bold text-accent-cyan">
                      40&ndash;60%
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      Lower development costs
                    </p>
                  </div>
                  <div className="border-t border-black/[0.06]" />
                  <div>
                    <p className="text-3xl font-bold text-accent-violet">
                      GMT+7
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      Timezone advantage for EU &amp; APAC overlap
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Development Process */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Development Process
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "We analyze your industry requirements, business goals, and existing systems to define a clear technical roadmap.",
                },
                {
                  step: "02",
                  title: "Development",
                  description:
                    "Our team builds iteratively using agile sprints, with continuous testing and stakeholder feedback at every milestone.",
                },
                {
                  step: "03",
                  title: "Delivery",
                  description:
                    "We deploy, monitor, and support your solution in production — ensuring a smooth launch and long-term reliability.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex-1 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
                >
                  <span className="text-sm font-mono font-semibold text-brand tracking-wider">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground md:mt-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed md:mt-2 md:max-w-xs">
                    {item.description}
                  </p>
                  {index < 2 && (
                    <span
                      className="hidden md:block text-foreground-secondary/30 text-2xl font-light mx-6 self-center"
                      aria-hidden="true"
                    >
                      &mdash;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-background-subtle border-t border-gradient">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Industry, Our Expertise
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                No matter your industry, we have the experience and technical
                depth to deliver software that makes a difference. Let&apos;s
                discuss your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get Your Free Estimate
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore Services <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
