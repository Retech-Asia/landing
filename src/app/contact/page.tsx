import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageSquare, FileText, Video, Hash, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";
import { ProjectEstimator } from "@/components/ui/ProjectEstimator";
import { ContactPageLocalBusinessJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { LocationMap } from "@/components/ui/LocationMap";
import { ContactInfoCard } from "@/components/ui/ContactInfoCard";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} for a free consultation on custom CMS, CRM, ERP & AI software. Response within 24 hours. Based in Ho Chi Minh City.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Contact ${SITE_NAME} for a free consultation on custom CMS, CRM, ERP & AI software. Response within 24 hours.`,
    url: `${SITE_URL}/contact`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description: `Contact ${SITE_NAME} for a free consultation on custom CMS, CRM, ERP & AI software. Response within 24 hours.`
  },
};

const whatToExpectItems = [
  {
    step: 1,
    icon: Mail,
    color: "text-brand",
    bg: "bg-brand/10",
    title: "Quick Response",
    description: "We respond to all inquiries within one business day.",
  },
  {
    step: 2,
    icon: MessageSquare,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    title: "Free Consultation",
    description:
      "No commitment required. We'll discuss your project scope, timeline, and the best approach.",
  },
  {
    step: 3,
    icon: FileText,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    title: "Tailored Proposal",
    description:
      "You'll receive a detailed proposal with team composition, technology choices, and transparent pricing.",
  },
];

const communicationChannels = [
  {
    icon: Mail,
    color: "text-brand",
    bg: "bg-brand/10",
    title: "Email Us",
    detail: CONTACT.email,
    description: "For project inquiries and partnerships",
    href: CONTACT.emailHref,
  },
  {
    icon: Phone,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    title: "Call Us",
    detail: CONTACT.phone,
    description: "Speak directly with our team",
    href: CONTACT.phoneHref,
  },
  {
    icon: Hash,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    title: "Email",
    detail: CONTACT.email,
    description: "Send us a message — we reply within 24 hours",
    href: CONTACT.emailHref,
  },
  {
    icon: Video,
    color: "text-brand",
    bg: "bg-brand/10",
    title: "Zoom Meeting",
    detail: "Schedule a video call",
    description: "Face-to-face consultation anywhere",
    href: `mailto:${CONTACT.email}?subject=Zoom%20Meeting%20Request`,
  },
];

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Structured Data */}
      <ContactPageLocalBusinessJsonLd />
      <WebPageJsonLd
        title="Contact Us | Retech Solutions"
        description="Ready to build? Contact Retech Solutions for a free consultation on custom CMS, CRM, ERP & AI software. Response within 24 hours."
        url={`${SITE_URL}/contact`}
        type="ContactPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle gradient orbs */}
        <div className="absolute -top-20 left-1/4 w-[50vw] h-[50vw] rounded-full bg-brand/[0.025] blur-[160px] animate-mesh-4" />
        <div className="absolute -bottom-10 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.02] blur-[140px] animate-mesh-5" />
      </div>

      {/* Dot-pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.12] pointer-events-none" />

      {/* Grid-pattern texture in hero area */}
      <div className="absolute top-0 left-0 right-0 h-[500px] grid-pattern opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full border border-brand/[0.08] animate-spin"
          style={{ animationDuration: '45s' }}
        />
        <div
          className="absolute top-[60%] left-[5%] w-10 h-10 rounded-lg border border-accent-violet/[0.08] animate-float-slow"
        />
        <div className="absolute top-[35%] left-[12%] w-6 h-6 rounded-full border border-accent-cyan/[0.06] animate-float-slower" />
        <div className="absolute top-[75%] right-[8%] w-8 h-8 rounded-md border border-brand/[0.05] rotate-45 animate-geo-2" />
      </div>

      <Container className="relative">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />

        <AnimatedSection variant="slideUp">
          <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3 text-center">Contact</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Fill out the form below and our team will get back to you within one business day.
          </p>
        </AnimatedSection>

        {/* What to Expect */}
        <AnimatedSection variant="slideUp" delay={0.05}>
          <h2 className="text-base font-semibold text-foreground mb-5">What to Expect</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-14">
          {whatToExpectItems.map(({ step, icon: Icon, color, bg, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col items-start gap-4 p-6 rounded-xl bg-card-bg border border-card-border">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-white text-xs font-bold">
                    {step}
                  </span>
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon size={18} className={color} strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Project Estimator */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mb-12 md:mb-14">
          <SectionHeader
            label="Estimator"
            title="Estimate Your Project"
            description="Get a quick ballpark estimate based on your project type, scope, and team size."
          />
          <ProjectEstimator />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Form — takes 3 of 5 columns */}
          <AnimatedSection
            variant="slideRight"
            delay={0.1}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient background layer behind the card */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] via-transparent to-accent-cyan/[0.03] pointer-events-none"
                aria-hidden="true"
              />
              {/* Subtle inner glow */}
              <div
                className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"
                aria-hidden="true"
              />

              <Card hover={false} padding="lg" className="relative bg-white/95 backdrop-blur-sm border-black/[0.06]">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Send Us a Message
                </h2>
                {/* Accessible container for form/success state transitions */}
                <div
                  role="region"
                  aria-label="Contact form"
                  aria-live="polite"
                >
                  <ContactForm />
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Info sidebar — takes 2 of 5 columns */}
          <AnimatedSection
            variant="slideLeft"
            delay={0.15}
            className="lg:col-span-2 space-y-5"
          >
            {/* Location Map */}
            <LocationMap />

            {/* Contact Method Cards */}
            <div className="space-y-3">
              <ContactInfoCard
                iconName="mail"
                iconBg="bg-brand/10"
                iconColor="text-brand"
                label="Email"
                value={CONTACT.email}
                description="For project inquiries and partnerships"
                action={{ type: "copy" }}
              />
              <ContactInfoCard
                iconName="phone"
                iconBg="bg-accent-cyan/10"
                iconColor="text-accent-cyan"
                label="Phone"
                value={CONTACT.phone}
                description="Speak directly with our team"
                action={{ type: "link", href: CONTACT.phoneHref, label: "Call us" }}
              />
              <ContactInfoCard
                iconName="mapPin"
                iconBg="bg-accent-violet/10"
                iconColor="text-accent-violet"
                label="Address"
                value={CONTACT.address}
                description="Vo Thi Sau Ward, Ho Chi Minh City"
                action={{
                  type: "map",
                  href: CONTACT.mapUrl,
                  label: "Open in Google Maps",
                }}
              />
            </div>

            {/* Quick Response CTA */}
            <Card hover={false} padding="md" className="bg-foreground text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-base font-semibold mb-2">
                  Quick Response Guaranteed
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  We respond to all inquiries within one business day. For urgent
                  requests, call us directly.
                </p>
                <Button
                  variant="secondary"
                  href={CONTACT.phoneHref}
                  size="sm"
                >
                  <Phone size={14} />
                  Call Now
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Other Ways to Connect */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mt-16 md:mt-20">
          <SectionHeader
            label="Connect"
            title="Other Ways to Connect"
            description="Prefer a different channel? Reach out however works best for you."
          />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {communicationChannels.map(({ icon: Icon, color, bg, title, detail, description, href }) => (
            <StaggerItem key={title}>
              <a
                href={href}
                className="flex flex-col items-start gap-4 p-6 rounded-xl bg-card-bg border border-card-border transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`${title}: ${detail}. ${description}`}
              >
                <div className={`p-2.5 rounded-lg ${bg}`} aria-hidden="true">
                  <Icon size={20} className={color} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm font-medium text-brand mb-1">
                    {detail}
                  </p>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {description}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quick Links: Services & Process */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mt-16 md:mt-20">
          <SectionHeader
            label="Explore"
            title="Learn More Before You Reach Out"
            description="Want to understand our capabilities or process before your first consultation?"
          />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { href: "/services", label: "Our Services", desc: "CMS, CRM, ERP, web development, UI/UX, and dedicated teams." },
            { href: "/process", label: "Our Process", desc: "How we deliver projects from discovery to deployment." },
            { href: "/case-studies", label: "Case Studies", desc: "Real results from projects we have delivered." },
            { href: "/technologies", label: "Technologies", desc: "The tools and frameworks we work with." },
          ].map((link) => (
            <StaggerItem key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col gap-3 p-6 rounded-xl bg-card-bg border border-card-border transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {link.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-auto">
                  Learn more <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
