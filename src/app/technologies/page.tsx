import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/components/ui/PageHero";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";
import { TechListing } from "./TechListing";
import { CodeBracketIcon } from "@/components/ui/AnimatedIcons";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "React, Next.js, Node.js, Python, AWS, GCP & more. Our modern tech stack delivers scalable, reliable software for CMS, CRM, ERP & AI projects.",
  alternates: {
    canonical: `${SITE_URL}/technologies`,
  },
  openGraph: {
    title: "Technologies",
    description:
      "React, Next.js, Node.js, Python, AWS, GCP & more. Modern tech stack for scalable CMS, CRM, ERP & AI software.",
    url: `${SITE_URL}/technologies`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Technologies",
    description:
      "React, Next.js, Node.js, Python, AWS, GCP & more. Modern tech stack for scalable software."
  },
};

export default function TechnologiesPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Technologies"
        description="React, Next.js, Node.js, Python, AWS & more. Modern tech stack for scalable software."
        url={`${SITE_URL}/technologies`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Technologies", url: `${SITE_URL}/technologies` },
        ]}
      />

      {/* Hero */}
      <PageHero
        title="Our Technology Stack"
        description="We build with modern, proven technologies chosen for reliability, scalability, and developer productivity. Every tool in our stack is selected to solve real problems and deliver lasting value."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technologies" },
        ]}
      >
        <div className="mt-6">
          <CodeBracketIcon size={52} />
        </div>
      </PageHero>

      {/* Interactive tech listing with filters, flow diagram, and cards */}
      <Container>
        <TechListing />
      </Container>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                We will help you choose the right technology stack for your
                specific requirements and build it to production quality.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Start a Conversation
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Our Services <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
