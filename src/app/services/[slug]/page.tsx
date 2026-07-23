import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mail, CheckCircle2, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { TeamCostCalculator } from "@/components/ui/TeamCostCalculator";
import { ROICalculator } from "@/components/ui/ROICalculator";
import { ServiceJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ServiceTimeline } from "@/components/services/ServiceTimeline";
import { ServiceTOC, type TocItem } from "@/components/services/ServiceTOC";
import { ServiceHeroIcon } from "@/components/services/ServiceHeroIcon";
import { AnimatedChecklist } from "@/components/services/AnimatedChecklist";
import { TechBadges } from "@/components/services/TechBadges";
import { services, getServiceBySlug } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts } from "@/lib/blog-data";
import { getTestimonialBySlug } from "@/lib/testimonials-data";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

/* ── Static Params ────────────────────────────────────────────── */
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/* ── Metadata ─────────────────────────────────────────────────── */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getServiceBySlug(slug);
    if (!service) {
      return { title: "Service Not Found" };
    }

    const pageUrl = `${SITE_URL}/services/${service.slug}`;

    return {
      title: service.title,
      description: service.description.length > 155
        ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : service.description,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: `${service.title} | Retech Solutions`,
        description: service.description.length > 155
          ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : service.description,
        url: pageUrl,
        type: "website",
        images: [
          {
            url: `/services/${service.slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${service.title} - Retech Solutions`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} | Retech Solutions`,
        description: service.description.length > 155
          ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : service.description,
        images: [`/services/${service.slug}/opengraph-image`],
      },
    };
  });
}

/* ── Checklist items per service ──────────────────────────────── */
const serviceChecklists: Record<string, string[]> = {
  "cms-platforms": [
    "Custom theme development",
    "Responsive & mobile-first design",
    "Security hardening & audits",
    "SEO setup & optimization",
    "Content workflow configuration",
    "Analytics integration",
    "Performance optimization",
    "Testing & QA",
    "Documentation & training",
    "30-day post-launch support",
  ],
  "crm-systems": [
    "Custom CRM development",
    "Sales pipeline automation",
    "Data migration & deduplication",
    "Security & compliance audit",
    "Analytics dashboard setup",
    "Third-party integrations",
    "Testing & QA",
    "Documentation & training",
    "User onboarding sessions",
    "30-day post-launch support",
  ],
  "erp-solutions": [
    "Custom ERP modules",
    "Cross-department workflow automation",
    "Data governance & compliance setup",
    "Cloud deployment & scaling",
    "Mobile access configuration",
    "Performance optimization",
    "Testing & QA",
    "Documentation & training",
    "System integration",
    "30-day post-launch support",
  ],
  "web-development": [
    "Full-stack custom development",
    "Responsive & progressive web apps",
    "SEO-friendly architecture",
    "Security-first implementation",
    "Performance optimization",
    "Analytics integration",
    "Testing & QA",
    "Technical documentation",
    "Deployment & CI/CD setup",
    "30-day post-launch support",
  ],
  "ui-ux-design": [
    "User research & interviews",
    "Wireframing & prototyping",
    "Visual design & branding",
    "Interactive prototypes",
    "Usability testing",
    "Design system creation",
    "Accessibility audit (WCAG)",
    "Developer handoff package",
    "Iteration rounds",
    "30-day design support",
  ],
  "dedicated-teams": [
    "Pre-vetted senior talent",
    "Fully managed HR & payroll",
    "Agile process setup",
    "IP protection & NDAs",
    "Transparent weekly reporting",
    "Timezone-friendly overlap",
    "Infrastructure & equipment",
    "Performance tracking",
    "Team scaling flexibility",
    "Dedicated account manager",
  ],
};

/* ── Case study mapping per service ───────────────────────────── */
const serviceCaseStudyMap: Record<string, string[]> = {
  "cms-platforms": ["wellness-platform"],
  "web-development": ["wellness-platform"],
  "ui-ux-design": ["wellness-platform", "asset-management-platform"],
  "crm-systems": ["asset-management-platform"],
  "erp-solutions": ["asset-management-platform"],
  "dedicated-teams": ["wellness-platform", "asset-management-platform"],
};

/* ── Blog post mapping per service ────────────────────────────── */
const serviceBlogMap: Record<string, string[]> = {
  "cms-platforms": ["rise-of-headless-cms-separating-content-from-presentation", "cms-vs-crm-choosing-right-system-business"],
  "crm-systems": ["cms-vs-crm-choosing-right-system-business", "how-ai-transforming-custom-software-development"],
  "erp-solutions": ["erp-modernization-legacy-systems-migration-guide", "cloud-native-erp-microservices-architecture-future"],
  "web-development": ["nextjs-16-server-components-performance-guide", "rise-of-edge-computing-what-it-means-for-web-applications", "state-of-react-server-components-2026"],
  "ui-ux-design": ["building-accessible-websites-practical-guide-2026", "how-choose-right-tech-stack-next-project"],
  "dedicated-teams": ["building-offshore-development-team-practical-guide", "why-vietnam-top-it-outsourcing-destination-2026", "software-development-cost-comparison-vietnam-india-eastern-europe-2026"],
};

/* ── Page Component ───────────────────────────────────────────── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  const checklistItems = serviceChecklists[slug] ?? [];
  const relatedCaseStudySlugs = serviceCaseStudyMap[slug] ?? [];
  const relatedCaseStudies = caseStudies.filter((cs) =>
    relatedCaseStudySlugs.includes(cs.slug)
  );

  const relatedBlogSlugs = serviceBlogMap[slug] ?? [];
  const relatedBlogPosts = blogPosts.filter((p) =>
    relatedBlogSlugs.includes(p.slug)
  );

  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const nextService = services[(currentIndex + 1) % services.length];
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const testimonial = getTestimonialBySlug(slug);

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  // Build TOC items based on which sections will actually render
  const tocItems: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
  ];
  if (checklistItems.length > 0) {
    tocItems.push({ id: "included", label: "What's Included" });
  }
  if (testimonial) {
    tocItems.push({ id: "testimonial", label: "Testimonial" });
  }
  tocItems.push({ id: "benefits", label: "Benefits" });
  if (service.processSteps && service.processSteps.length > 0) {
    tocItems.push({ id: "process", label: "How We Work" });
  }
  if (slug === "dedicated-teams") {
    tocItems.push({ id: "roi-calculator", label: "ROI Calculator" });
    tocItems.push({ id: "engagement-models", label: "Engagement Models" });
  }
  tocItems.push({ id: "technologies", label: "Technologies" });
  tocItems.push({ id: "faq", label: "FAQ" });

  return (
    <>
      {/* ── Structured Data ─────────────────────────────────── */}
      <ServiceJsonLd
        name={service.title}
        description={service.longDescription}
        url={pageUrl}
      />
      <FAQJsonLd questions={service.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.title, url: pageUrl },
        ]}
      />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Gradient accent bar at the very top */}
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.heroAccent}`} aria-hidden="true" />

        <GradientBackground variant="hero" />
        <GridPattern className="opacity-50" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" aria-hidden="true" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
            />
          </AnimatedSection>

          <div className="max-w-3xl relative">
            {/* Large semi-transparent icon behind the title */}
            <div className="absolute -top-8 -right-8 md:-right-16 pointer-events-none select-none" aria-hidden="true">
              <Icon size={220} className="text-brand opacity-[0.05]" strokeWidth={0.8} />
            </div>

            {/* Animated hero icon with glow */}
            <AnimatedSection variant="slideUp" delay={0.06}>
              <ServiceHeroIcon slug={service.slug} color={service.heroColor} className="mb-6" />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.12}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {service.title}
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.18}>
              <p className="text-lg font-medium text-foreground-muted mb-4">
                {service.subtitle}
              </p>
              {/* Gradient divider matching service accent */}
              <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${service.heroAccent} mb-0`} />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.24}>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
                {service.longDescription}
              </p>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.30}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Button href="/contact" size="lg">
                  <Mail size={18} />
                  Get a Free Consultation
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  <ArrowLeft size={18} />
                  All Services
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Sidebar Layout: Features through FAQ ──────────── */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:flex lg:gap-12 lg:items-stretch">
          {/* Main content */}
          <div className="min-w-0 flex-1">

      {/* ── Overview (visual anchor near hero) ────────────── */}
      <div id="overview" className="scroll-mt-28" />

      {/* ── Features Grid ───────────────────────────────────── */}
      <section id="features" className="relative py-20 md:py-28 scroll-mt-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={`What's Included in ${service.title}`}
              description="Every engagement is tailored to your needs. Here are the core capabilities we bring to the table."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              const colorClass = i % 3 === 0 ? "text-brand" : i % 3 === 1 ? "text-accent-cyan" : "text-accent-violet";
              return (
                <StaggerItem key={feature.title}>
                  <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                    <FeatureIcon size={20} className={`${colorClass} mb-4`} />
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Code/development visual strip — adds tangible "this is what we
          build" context between the features grid and the project timeline. */}
      <div className="relative h-[160px] md:h-[220px] overflow-hidden">
        <Image
          src="/images/stock/code-screen.webp"
          alt="Development workspace — code, tools, and engineering process"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Timeline section removed — was redundant with "How We Work"
          (Process Steps) below. Both covered the same phases (Discovery,
          Design, Build, Deploy). The timelineDuration field in the data
          already surfaces the time estimate in the hero. */}

      {/* ── What's Included Checklist ───────────────────────── */}
      {checklistItems.length > 0 && (
        <section id="included" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <GradientBackground variant="subtle" />
          <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <AnimatedSection variant="slideUp">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  What&apos;s Included
                </h2>
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  Every {service.title.toLowerCase()} engagement comes with a comprehensive set of deliverables to ensure your project is built to the highest standards — from initial planning through post-launch support.
                </p>
              </AnimatedSection>

              <AnimatedChecklist items={checklistItems} />
            </div>
          </Container>
        </section>
      )}

      {/* ── Testimonial Section ─────────────────────────────── */}
      {testimonial && (
        <section id="testimonial" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <Container className="relative">
            <AnimatedSection variant="slideUp">
              <div className="max-w-3xl mx-auto">
                <div className="relative rounded-2xl bg-white border border-black/[0.06] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border-l-4 border-l-brand">
                  <Quote
                    size={48}
                    className="text-brand/15 mb-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-accent-violet flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-foreground-secondary">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Benefits Section ────────────────────────────────── */}
      <section id="benefits" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={`Why Choose Our ${service.title}`}
              description="The key advantages that set our solutions apart."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit) => {
              return (
                <StaggerItem key={benefit.title}>
                  <div className="p-6 rounded-2xl border border-black/[0.06] bg-white/60 backdrop-blur-sm h-full">
                    <CheckCircle2 size={22} className="text-brand mb-4 shrink-0" />
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── How We Work (Process Steps) ───────────────────────── */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section id="process" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="How We Work"
                description="Our proven engagement process ensures predictable outcomes from first conversation to final delivery."
              />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.1}>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-brand/30 via-accent-cyan/30 to-accent-violet/30" aria-hidden="true" />

                  <div className="flex flex-col gap-8">
                    {service.processSteps.map((step, i) => {
                      const stepColors = [
                        { dot: "from-brand to-brand-light", ring: "ring-brand/20", text: "text-brand", bg: "bg-brand/10" },
                        { dot: "from-accent-cyan to-brand", ring: "ring-accent-cyan/20", text: "text-accent-cyan", bg: "bg-accent-cyan/10" },
                        { dot: "from-accent-violet to-accent-cyan", ring: "ring-accent-violet/20", text: "text-accent-violet", bg: "bg-accent-violet/10" },
                        { dot: "from-brand-light to-accent-cyan", ring: "ring-brand/20", text: "text-brand", bg: "bg-brand/10" },
                        { dot: "from-accent-cyan to-accent-violet", ring: "ring-accent-cyan/20", text: "text-accent-cyan", bg: "bg-accent-cyan/10" },
                      ];
                      const colors = stepColors[i % stepColors.length];
                      return (
                        <div key={step.step} className="relative flex gap-5">
                          {/* Numbered dot */}
                          <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${colors.dot} ring-4 ${colors.ring} shadow-lg shrink-0`}>
                            <span className="text-sm font-bold text-white">{step.step}</span>
                          </div>

                          {/* Content */}
                          <div className="pt-1.5">
                            <h3 className="text-base font-semibold text-foreground mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Team Cost Calculator (Dedicated Teams only) ────── */}
      {slug === "dedicated-teams" && <TeamCostCalculator />}

      {/* ── ROI Calculator (Dedicated Teams only) ────────── */}
      <div id="roi-calculator" className="scroll-mt-28" />
      {slug === "dedicated-teams" && <ROICalculator />}

      {/* ── Engagement Models (Dedicated Teams only) ────────── */}
      {slug === "dedicated-teams" && (
        <section id="engagement-models" className="relative py-20 md:py-28 scroll-mt-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="Engagement Models"
                description="Choose the collaboration model that fits your needs. All plans include pre-vetted senior talent and transparent reporting."
              />
            </AnimatedSection>

            {/* Model cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Staff Augmentation",
                  description: "Add individual developers to your existing team. You manage directly, we handle HR and payroll.",
                  price: "From $2,500/mo per engineer",
                  bestFor: "Teams needing specific skills fast",
                  featured: false,
                },
                {
                  title: "Dedicated Team",
                  description: "A fully managed team working exclusively on your project with a dedicated project manager.",
                  price: "From $8,000/mo for a 3-person team",
                  bestFor: "Ongoing product development",
                  featured: true,
                },
                {
                  title: "Project-Based",
                  description: "Fixed scope, fixed price. We handle everything from design to deployment.",
                  price: "Custom quote",
                  bestFor: "Well-defined, time-bound projects",
                  featured: false,
                },
              ].map((model) => (
                <StaggerItem key={model.title}>
                  <div
                    className={`relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 ${
                      model.featured
                        ? "border-t-2 border-t-brand shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),0_0_24px_rgba(32,133,53,0.08)]"
                        : "border-t-2 border-t-brand/40"
                    }`}
                  >
                    {model.featured && (
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 rounded-full px-3 py-1 mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {model.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                      {model.description}
                    </p>
                    <p className="text-xs font-medium text-foreground-muted mb-4">
                      Best for: {model.bestFor}
                    </p>
                    <p className="text-sm font-semibold text-brand mt-auto">
                      {model.price}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Feature comparison table */}
            <AnimatedSection variant="slideUp" delay={0.15}>
              <div className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="px-6 py-4 border-b border-black/[0.06] bg-black/[0.015]">
                  <h3 className="text-base font-semibold text-foreground">
                    Compare Engagement Models
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-black/[0.08]">
                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary whitespace-nowrap">
                          Feature
                        </th>
                        <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
                          Staff Augmentation
                        </th>
                        <th className="px-4 py-3.5 text-center whitespace-nowrap bg-brand/[0.04]">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                            Dedicated Team
                            <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-full normal-case">Popular</span>
                          </span>
                        </th>
                        <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
                          Project-Based
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ["Pre-vetted talent", true, true, true],
                        ["HR & payroll managed", true, true, true],
                        ["Dedicated project manager", false, true, true],
                        ["Direct developer management", true, false, false],
                        ["Flexible team scaling", true, true, false],
                        ["Agile process setup", false, true, true],
                        ["Infrastructure & equipment", false, true, true],
                        ["Weekly progress reports", false, true, true],
                        ["IP protection & NDAs", true, true, true],
                        ["Timezone-friendly overlap", true, true, true],
                        ["Fixed-price guarantee", false, false, true],
                        ["Design & UX included", false, false, true],
                        ["QA & testing included", false, true, true],
                        ["Dedicated account manager", false, true, true],
                        ["No minimum commitment", true, false, false],
                      ] as [string, boolean, boolean, boolean][]).map((row, rowIdx) => (
                        <tr
                          key={row[0]}
                          className="border-b border-black/[0.04] last:border-b-0"
                        >
                          <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap text-sm">
                            {row[0]}
                          </td>
                          {[row[1], row[2], row[3]].map((isSupported, colIdx) => (
                            <td
                              key={colIdx}
                              className={cn(
                                "px-4 py-3 text-center",
                                // Highlight the "Popular" column (Dedicated Team = colIdx 1)
                                colIdx === 1 && "bg-brand/[0.03]"
                              )}
                            >
                              {isSupported ? (
                                <CheckCircle2 size={16} className="inline-block text-brand" />
                              ) : (
                                <span className="inline-block text-foreground-muted/30 text-sm select-none">
                                  &mdash;
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Technologies Section ────────────────────────────── */}
      <section id="technologies" className="relative py-20 md:py-28 scroll-mt-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="Technologies We Use"
              description="The tools and frameworks we leverage to deliver robust, scalable solutions."
            />
          </AnimatedSection>

          <TechBadges technologies={service.technologies} />
        </Container>
      </section>

      {/* ── FAQ Section ─────────────────────────────────────── */}
      <section id="faq" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="Frequently Asked Questions"
              description={`Common questions about our ${service.title.toLowerCase()} services. Can't find what you're looking for? Reach out to our team.`}
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
              <Accordion items={service.faq} />
            </div>
          </AnimatedSection>
        </Container>
      </section>

          </div>{/* end main content */}

          {/* ── Sidebar — desktop only ──────────────────────── */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 -mr-1">
              <ServiceTOC items={tocItems} />
            </div>
          </aside>
        </div>{/* end sidebar layout container */}
      </div>{/* end sidebar layout wrapper */}

      {/* ── Post-FAQ CTA Banner ─────────────────────────────── */}
      <section className="relative py-16 md:py-20">
        <Container>
          <AnimatedSection variant="slideUp">
            <div className="relative rounded-2xl bg-gradient-to-r from-brand/[0.06] via-accent-cyan/[0.04] to-brand/[0.06] border border-brand/[0.10] p-8 md:p-10 overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(32,133,53,0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Questions Answered? Let&apos;s Talk.
                  </h3>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed max-w-lg">
                    Schedule a free consultation to discuss your {service.title.toLowerCase()} requirements and get a detailed project estimate.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button href="/contact" size="lg">
                    <Mail size={18} />
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Related Case Studies ────────────────────────────── */}
      {relatedCaseStudies.length > 0 && (
        <section className="relative py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="Related Case Studies"
                description="See how we've delivered similar solutions for our clients."
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {relatedCaseStudies.map((cs) => (
                <StaggerItem key={cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 rounded-full px-3 py-1 mb-4">
                        {cs.industry}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                        {cs.tagline}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        View Case Study
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
          </Container>
        </section>
      )}

      {/* ── Related Blog Posts ─────────────────────────────── */}
      {relatedBlogPosts.length > 0 && (
        <section className="relative py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title="Related Articles"
                description="Deep dives into the topics that matter for your project."
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedBlogPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded-full px-3 py-1 mb-4">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-brand transition-colors line-clamp-3">
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

      {/* ── Related Services ────────────────────────────────── */}
      <section className="relative py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title="Related Services"
              description="Discover other ways we can help your business grow."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {otherServices.map((related) => {
              const RelatedIcon = related.icon;
              return (
                <StaggerItem key={related.slug}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      {/* Top gradient accent bar matching service color */}
                      <div className={`h-1 bg-gradient-to-r ${related.heroAccent}`} aria-hidden="true" />
                      <div className="p-6 md:p-8">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 mb-5">
                          <RelatedIcon size={20} className="text-brand" />
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-5 line-clamp-3">
                          {related.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          Learn More
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Next Service ─────────────────────────────────────── */}
      {nextService && (
        <section className="relative py-16 md:py-20 bg-background-subtle">
          <Container>
            <AnimatedSection variant="slideUp">
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 shrink-0">
                    {(() => {
                      const NextIcon = nextService.icon;
                      return <NextIcon size={24} className="text-brand" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">
                      Next Service
                    </p>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                      {nextService.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {nextService.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all duration-300 shrink-0">
                  Explore Service
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Build Your{" "}
                <span className="text-white/70">{service.title} Solution</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Our {service.title.toLowerCase()} specialists will review your requirements and return a detailed proposal with architecture recommendations, team allocation, and clear milestones — typically within one business day.
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
                  href="/services"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  All Services
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
