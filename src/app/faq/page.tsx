import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { FAQJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { faqCategories, allFAQs } from "@/lib/faq-data";
import { FAQClientPage } from "./faq-client";

const PAGE_URL = `${SITE_URL}/faq`;

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about our software development services, CMS, CRM, ERP & dedicated teams. Pricing, tech stack & process explained.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "FAQ",
    description:
      "Common questions about software development services, CMS, CRM, ERP & dedicated teams. Pricing, tech stack & process.",
    url: `${SITE_URL}/faq`,
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Retech Solutions FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ",
    description:
      "Common questions about software development services, CMS, CRM, ERP & dedicated teams. Pricing & process.",
    images: ["/images/og-image.png"],
  },
};

/* ── Page ──────────────────────────────────────────────────────── */
export default function FAQPage() {
  return (
    <>
      {/* ── Structured Data ─────────────────────────────────── */}
      <FAQJsonLd questions={allFAQs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "FAQ", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd
        title="FAQ"
        description="Common questions about software development services, CMS, CRM, ERP & dedicated teams answered."
        url={PAGE_URL}
        type="FAQPage"
      />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <GradientBackground variant="hero" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "FAQ" },
              ]}
            />
          </AnimatedSection>

          <div className="max-w-3xl">
            <AnimatedSection variant="slideUp" delay={0.06}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                Frequently Asked Questions
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.12}>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
                Everything you need to know about our services, process, and
                engagement models. Can&apos;t find what you&apos;re looking for?
                Reach out to our team directly.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Interactive FAQ Content (Client Component) ──────── */}
      <FAQClientPage categories={faqCategories} />

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Still Have{" "}
                <span className="text-white/70">Questions?</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Our team is happy to discuss your project, answer technical
                questions, and help you find the right solution for your
                business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  <Mail size={18} />
                  Get in Touch
                </Button>
                <Button
                  href="/services"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  View All Services
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
