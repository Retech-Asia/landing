import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { ABOUT_STATS, SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { ParallaxDivider } from "@/components/about/ParallaxDivider";
import { AnimatedTimeline } from "@/components/about/AnimatedTimeline";

import { ParallaxHero } from "@/components/about/ParallaxHero";
import { CultureValues } from "@/components/about/CultureValues";
import { OurCommitment } from "@/components/about/OurCommitment";
import { GlobalReach } from "@/components/about/GlobalReach";
import { WhatSetsUsApart } from "@/components/about/WhatSetsUsApart";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vietnam-based software outsourcing company. 5+ years experience, 50+ projects across 6 countries. Full-cycle development from strategy to deployment.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Us",
    description:
      "Vietnam-based software outsourcing company. 5+ years experience, 50+ projects across 6 countries. Full-cycle development.",
    url: `${SITE_URL}/about`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description:
      "Vietnam-based software outsourcing. 5+ years, 50+ projects across 6 countries. Full-cycle development."
  },
};

const milestones = [
  {
    year: "2020",
    title: "Founded in Ho Chi Minh City",
    description:
      "Jay Pham founded Retech Solutions with a small team of 5 engineers, focused on custom web and mobile application development for local and regional clients.",
  },
  {
    year: "2021",
    title: "First Enterprise CRM Project",
    description:
      "Delivered our first full-scale CRM system for a financial services client, establishing our expertise in enterprise-grade software and long-term client partnerships.",
  },
  {
    year: "2022",
    title: "Expanded to 15+ Engineers",
    description:
      "Grew the engineering team and launched dedicated team services for international clients, expanding our delivery capacity across multiple time zones.",
  },
  {
    year: "2023",
    title: "CMS & ERP Product Lines Launched",
    description:
      "Expanded our product offerings with custom CMS and ERP solutions, serving clients in manufacturing, logistics, and professional services industries.",
  },
  {
    year: "2024",
    title: "AI-Powered Solutions Launch",
    description:
      "Integrated AI and machine learning capabilities across our CMS, CRM, and ERP product lines, helping clients automate workflows and make data-driven decisions.",
  },
  {
    year: "2025",
    title: "Serving Clients in 6 Countries",
    description:
      "Expanded our client base across Asia Pacific, North America, and Europe — reaching businesses in Vietnam, Singapore, Japan, the US, the UK, and Germany.",
  },
  {
    year: "2026",
    title: "50+ Projects Delivered",
    description:
      "Reached a milestone of 50+ successful projects across 8 industries, with a 98% client satisfaction rate and a growing team of 30+ expert engineers.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="About Us"
        description="Vietnam-based software outsourcing company. 5+ years experience, 50+ projects delivered across 6 countries. Full-cycle development from strategy to deployment."
        url={`${SITE_URL}/about`}
        type="AboutPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />

      {/* Person schema removed — leadership section was removed from the
          page, so the structured data referenced people not visible on-page. */}

      {/* Hero with Parallax Background */}
      <ParallaxHero />

      {/* Full-width workspace image — makes the company feel real */}
      <div className="relative h-[280px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/stock/modern-office.webp"
          alt="Retech Solutions development workspace in Vietnam"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Our Mission */}
            <AnimatedSection variant="slideRight">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                  Building Digital Solutions from Vietnam to the World
                </h2>
                <div className="space-y-4 text-foreground-secondary leading-relaxed">
                  <p>
                    Founded with a mission to bridge the gap between global businesses
                    and Vietnamese engineering talent, Retech Solutions has
                    grown into a trusted partner for companies seeking reliable, scalable
                    software development services.
                  </p>
                  <p>
                    Our team of experienced developers, designers, and project managers
                    work closely with clients to understand their unique challenges and
                    deliver tailored solutions that drive real business outcomes. We
                    specialize in custom CMS, CRM, and ERP systems, as well as AI-powered
                    digital products that help businesses stay ahead of the curve.
                  </p>
                  <p>
                    With over five years of experience and more than 50 projects
                    delivered, we have proven that great software can come from anywhere —
                    and that the right partnership can transform ideas into successful
                    products.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission + Vision Cards */}
            <div className="space-y-6">
              <AnimatedSection variant="slideLeft">
                <Card hover={false} padding="lg" className="bg-background-subtle border-black/[0.04]">
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={20} className="text-brand" />
                    <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-5">
                    To empower businesses worldwide with high-quality, cost-effective
                    software solutions built by exceptional talent. We believe that access
                    to great engineering should not be limited by geography.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Delivering enterprise-grade software at competitive rates
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Cultivating long-term partnerships, not one-off transactions
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-violet shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Driving innovation through AI and modern technologies
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideLeft" delay={0.15}>
                <Card hover={false} padding="lg" className="bg-background-subtle border-black/[0.04]">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={20} className="text-accent-cyan" />
                    <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-5">
                    To become the go-to software development partner in Southeast Asia,
                    recognized for delivering exceptional quality, fostering innovation,
                    and creating lasting impact for businesses worldwide.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Growing our global footprint to 10+ countries by 2028
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Investing in AI and automation capabilities for smarter delivery
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-violet shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        Building Vietnam&apos;s next generation of engineering leaders
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership section removed per owner request — company landing
          page does not need to show individual identities. */}

      {/* Parallax Visual Divider */}
      <ParallaxDivider />

      {/* By the Numbers */}
      <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-[40vw] h-[40vw] rounded-full bg-brand/[0.03] blur-[140px] animate-mesh-1" />
          <div className="absolute -bottom-10 -left-10 w-[35vw] h-[35vw] rounded-full bg-accent-cyan/[0.03] blur-[120px] animate-mesh-2" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeader
              label="By the Numbers"
              title="Retech by the Numbers"
              description="The impact we have made across industries and geographies, one project at a time."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {ABOUT_STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group relative rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8 text-center h-full">
                  <p className="text-4xl md:text-5xl font-bold gradient-text-brand mb-3">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm md:text-base text-foreground-muted font-medium">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Office interior — adds professional workspace context */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <Image
          src="/images/stock/office-interior.webp"
          alt="Retech Solutions modern office workspace"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Global Reach */}
      <GlobalReach />

      {/* What Sets Us Apart */}
      <WhatSetsUsApart />

      {/* Milestones — Animated Timeline */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="Our Journey"
            description="Key milestones that have shaped Retech Solutions since our founding in 2020."
          />
          <AnimatedTimeline milestones={milestones} />
        </Container>
      </section>

      {/* Values — 2x3 Grid with Animated Icons */}
      <CultureValues />

      {/* Our Commitment — 2x2 Grid */}
      <OurCommitment />

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                Tell us about your project and we will come back with a tailored plan — team composition, technology choices, timeline, and transparent pricing. No templates, no pressure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Tell Us About Your Project
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  See Our Work <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
