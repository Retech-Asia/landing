import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  DollarSign,
  GraduationCap,
  Globe,
  ArrowRight,
  Mail,
  Heart,
  Users,
  Sparkles,
  Laptop,
  Shield,
  FileText,
  MessageCircle,
  Code2,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { SITE_URL, CONTACT } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
// CareersListing + jobListings intentionally not imported — no public openings right now.

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Retech Solutions in Ho Chi Minh City. Build custom software for international clients across healthcare, finance, and e-commerce. Competitive pay and career growth.",
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
  openGraph: {
    title: "Careers",
    description:
      "Join Retech Solutions in Ho Chi Minh City. Build custom software for international clients across healthcare, finance, and e-commerce.",
    url: `${SITE_URL}/careers`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers",
    description:
      "Join Retech Solutions in Ho Chi Minh City. Build international software projects."
  },
};

/* ------------------------------------------------------------------ */
/*  Benefits data                                                      */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description:
      "Market-leading compensation with performance-based bonuses and regular salary reviews.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Shield,
    title: "Health Insurance",
    description:
      "Comprehensive health coverage and wellness allowance to keep you and your family protected.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description:
      "Hybrid work model with flexible schedules so you can do your best work when it suits you.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Annual learning budget for courses, certifications, and conferences plus internal tech talks.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Laptop,
    title: "Modern Tech Stack",
    description:
      "Work with React, Next.js, Node.js, TypeScript, and cloud-native architectures.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Globe,
    title: "International Projects",
    description:
      "Collaborate with clients across Asia, Australia, Europe, and North America.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
];

/* ------------------------------------------------------------------ */
/*  "Why Retech" culture highlights                                     */
/* ------------------------------------------------------------------ */

const cultureHighlights = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Flat hierarchy where every voice matters. We make decisions together and celebrate wins as a team.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Sparkles,
    title: "Innovation First",
    description:
      "We experiment with modern technologies and encourage creative problem-solving in everything we build.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Sustainable pace, not burnout. We respect your time off and invest in an environment where you can thrive long-term.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Your code ships to users worldwide. From startups to enterprises, the products you build make a real difference.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
];

/* ------------------------------------------------------------------ */
/*  Hiring process steps                                                */
/* ------------------------------------------------------------------ */

const hiringSteps = [
  {
    number: 1,
    icon: FileText,
    title: "Application Review",
    description:
      "Our talent team reviews your resume and portfolio within 3 business days. We look for relevant experience, project impact, and cultural alignment.",
    timeline: "1-3 days",
  },
  {
    number: 2,
    icon: MessageCircle,
    title: "Initial Interview",
    description:
      "A 30-minute conversation with our hiring manager to discuss your background, motivations, and what you are looking for in your next role.",
    timeline: "30 min",
  },
  {
    number: 3,
    icon: Code2,
    title: "Technical Assessment",
    description:
      "A practical take-home or live coding exercise relevant to the role. We evaluate problem-solving ability, code quality, and communication — not trick questions.",
    timeline: "2-3 hours",
  },
  {
    number: 4,
    icon: Users,
    title: "Team Interview",
    description:
      "Meet the team you would be working with. This is a collaborative session focused on how you approach real-world scenarios and work with others.",
    timeline: "45-60 min",
  },
  {
    number: 5,
    icon: Handshake,
    title: "Offer & Onboarding",
    description:
      "If it is a mutual fit, we extend an offer promptly. Our structured onboarding gets you set up with tools, introduced to the team, and contributing within your first week.",
    timeline: "1 week",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Careers"
        description="Join Retech Solutions in Ho Chi Minh City. We're always interested in hearing from talented engineers, designers, and project managers — even when we don't have public openings listed."
        url={`${SITE_URL}/careers`}
      />
      {/* JobPosting structured data intentionally omitted — no active public
          openings right now. Restore by mapping over jobListings with
          <JobPostingJsonLd> when positions reopen. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Careers", url: `${SITE_URL}/careers` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <GradientBackground variant="hero" />
        <div
          className="absolute inset-0 grid-pattern pointer-events-none opacity-50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 dot-pattern pointer-events-none opacity-25"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <BreadcrumbNav
            items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
          />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              Build the future of software development from Vietnam. We are
              looking for passionate people who want to make an impact on
              international projects.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Why Retech */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative z-10">
          <SectionHeader
            label="Our Culture"
            title="Why Retech?"
            description="We invest in our people because great software starts with a great team. Here is what makes us different."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <Card padding="lg" className="h-full text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-4`}
                    >
                      <Icon size={22} className={item.color} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Open positions — intentionally not shown. We are not actively hiring
          via the public site right now. To re-enable, restore the Job Listings
          section + import { jobListings } from "@/lib/careers-data" and render
          <CareersListing jobs={jobListings} email={CONTACT.email} /> here. */}

      {/* Team photo — careers pages need human element for employer branding */}
      <div className="relative h-[220px] md:h-[320px] overflow-hidden">
        <Image
          src="/images/stock/team-portrait.webp"
          alt="Retech Solutions team in our Ho Chi Minh City office"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <Container>
            <p className="text-lg md:text-2xl font-bold text-foreground">
              Join a team that ships.
            </p>
          </Container>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative z-10">
          <SectionHeader
            label="Benefits & Perks"
            title="What You Get"
            description="We go beyond the basics to ensure our team members are supported, challenged, and rewarded."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title}>
                  <Card padding="lg" className="h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${benefit.bg} shrink-0`}
                      >
                        <Icon size={20} className={benefit.color} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Hiring Process */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative z-10">
          <SectionHeader
            label="Hiring Process"
            title="How We Hire"
            description="Our process is thorough but respectful of your time. No trick questions, no endless rounds — just meaningful conversations to see if we are a great match."
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-accent-cyan/15 to-accent-violet/15 hidden sm:block"
              aria-hidden="true"
            />

            <StaggerContainer className="space-y-6" staggerDelay={0.06}>
              {hiringSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <StaggerItem key={step.number}>
                    <div className="flex gap-5 md:gap-6 items-start">
                      {/* Step number + icon */}
                      <div className="shrink-0 relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                          <StepIcon size={22} className="text-brand" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full">
                            Step {step.number}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-foreground">
                            {step.title}
                          </h3>
                          <span className="ml-auto text-xs font-medium text-foreground-muted bg-background-muted px-3 py-1 rounded-full whitespace-nowrap hidden sm:inline-block">
                            {step.timeline}
                          </span>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
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
                Don&apos;t See the Right Role?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                We are always looking for talented people. Send us your resume
                and let us know how you can contribute to our team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href={`mailto:${CONTACT.email}?subject=General Application`}
                  size="lg"
                >
                  <Mail size={18} />
                  Send Your Resume
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Us <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
