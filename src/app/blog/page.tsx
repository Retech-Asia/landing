import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogListSkeleton } from "@/components/ui/Skeleton";
import { blogPosts } from "@/lib/blog-data";
import { services } from "@/lib/services-data";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

import { BlogListing } from "./BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on IT outsourcing, custom software development & AI trends from Vietnam. Practical guides on CMS, CRM, ERP solutions for global businesses.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog",
    description:
      "Expert insights on IT outsourcing, software development & AI trends. Practical guides on CMS, CRM, ERP solutions from Vietnam.",
    url: `${SITE_URL}/blog`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Expert insights on IT outsourcing, software development & AI trends. Practical guides on CMS, CRM, ERP solutions."
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Blog"
        description="Expert insights on IT outsourcing, software development & AI trends. Practical guides on CMS, CRM, ERP solutions from Vietnam."
        url={`${SITE_URL}/blog`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px] animate-mesh-4" />
          <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px] animate-mesh-5" />
          <div className="absolute -bottom-10 left-[30%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/[0.02] blur-[100px] animate-mesh-3" />
        </div>

      <Container className="relative">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />

        <AnimatedSection variant="slideUp">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
            Insights &amp; Resources
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
            Stay up to date with the latest trends in IT outsourcing, software development, and digital transformation from our team of experts.
          </p>
        </AnimatedSection>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogListing posts={blogPosts} />
        </Suspense>

        {/* Cross-link to Services and Case Studies */}
        <AnimatedSection variant="slideUp" delay={0.2} className="mt-16 pt-12 border-t border-black/[0.06]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Our Services
              </h2>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                From CMS platforms to enterprise ERP systems, we deliver
                end-to-end software solutions tailored to your business.
              </p>
              <ul className="space-y-2.5">
                {services.slice(0, 4).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-brand transition-colors"
                    >
                      <ArrowRight size={14} className="text-brand" aria-hidden="true" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-4 hover:gap-2.5 transition-all"
              >
                View all services
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Case Studies
              </h2>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                See real results from our projects across healthcare, finance,
                and e-commerce industries.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all"
              >
                Explore our case studies
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </Container>
    </section>
    </>
  );
}
