import type { Metadata } from "next";
import Image from "next/image";
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  MessageSquare,
  GitBranch,
  Paintbrush,
  Box,
  TestTube2,
} from "lucide-react";
import { Container as ContainerUI } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { GearIcon } from "@/components/ui/AnimatedIcons";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { FAQAccordion } from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Proven 6-phase development methodology from discovery to launch. Agile sprints, transparent communication & quality-first approach. 50+ projects delivered.",
  alternates: {
    canonical: `${SITE_URL}/process`,
  },
  openGraph: {
    title: "Our Process",
    description:
      "Proven 6-phase development methodology from discovery to launch. Agile, transparent & quality-first. 50+ projects delivered.",
    url: `${SITE_URL}/process`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process",
    description:
      "Proven 6-phase methodology from discovery to launch. Agile, transparent & quality-first."
  },
};

/* ──────────────────────── Data ──────────────────────── */

const phases = [
  {
    number: 1,
    title: "Discovery & Strategy",
    timeline: "Week 1-2",
    icon: Search,
    description:
      "Every successful project starts with deep understanding. We conduct stakeholder interviews, map business processes, and analyze your competitive landscape to define a clear project scope. Our team assesses technical feasibility and identifies risks early, ensuring the roadmap is realistic and aligned with your goals.",
    activities: [
      "Stakeholder interviews & workshops",
      "Requirements gathering & documentation",
      "Competitive & market analysis",
      "Technical feasibility assessment",
    ],
    deliverables: [
      "Project brief",
      "Technical specification",
      "Timeline estimate",
    ],
  },
  {
    number: 2,
    title: "Architecture & Design",
    timeline: "Week 2-4",
    icon: PenTool,
    description:
      "We design systems that scale. Our architects define the technical backbone while our designers craft intuitive interfaces that users love. From database schemas to pixel-perfect mockups, every decision is documented and validated before a single line of code is written.",
    activities: [
      "System architecture design",
      "Database modeling & design",
      "UI/UX wireframes & prototyping",
      "Design system creation",
    ],
    deliverables: [
      "Architecture document",
      "Wireframes & prototypes",
      "Design system",
    ],
  },
  {
    number: 3,
    title: "Development Sprints",
    timeline: "Week 4-12",
    icon: Code2,
    description:
      "Development happens in focused two-week sprints with clear goals and full transparency. Daily standups keep everyone aligned, while sprint reviews give you regular visibility into progress. Continuous integration ensures every change is tested and deployable from day one.",
    activities: [
      "Agile development in 2-week sprints",
      "Daily standups & progress tracking",
      "Sprint reviews & retrospectives",
      "Continuous integration & delivery",
    ],
    deliverables: [
      "Working software increments",
      "Sprint reports",
      "Updated backlog",
    ],
  },
  {
    number: 4,
    title: "Quality Assurance",
    timeline: "Ongoing",
    icon: ShieldCheck,
    description:
      "Quality is not an afterthought — it is woven into every phase. Our QA engineers run automated test suites, perform manual exploratory testing, and benchmark performance under load. Security audits and accessibility checks ensure your product meets the highest standards.",
    activities: [
      "Automated unit & integration testing",
      "Manual exploratory QA",
      "Performance & load testing",
      "Security auditing & accessibility compliance",
    ],
    deliverables: [
      "Test reports",
      "Bug fixes & resolutions",
      "QA certification",
    ],
  },
  {
    number: 5,
    title: "Deployment & Launch",
    timeline: "Week 12-14",
    icon: Rocket,
    description:
      "We launch with confidence using staged rollouts that minimize risk. Monitoring dashboards are set up before go-live so we can respond to any issue in real time. Your team receives hands-on training and comprehensive documentation to ensure a smooth handover.",
    activities: [
      "Staged rollout strategy",
      "Monitoring & alerting setup",
      "Performance optimization",
      "Team training & documentation",
    ],
    deliverables: [
      "Production deployment",
      "Monitoring dashboard",
      "Training materials",
    ],
  },
  {
    number: 6,
    title: "Support & Growth",
    timeline: "Ongoing",
    icon: HeadphonesIcon,
    description:
      "Launch is just the beginning. We provide ongoing maintenance, build new features, and continuously monitor performance. Our team acts as a strategic partner, helping you adapt to changing market conditions and scale your product as your business grows.",
    activities: [
      "Proactive maintenance & updates",
      "New feature development",
      "Performance monitoring & optimization",
      "Strategic consulting & roadmap planning",
    ],
    deliverables: [
      "Monthly reports",
      "Feature releases",
      "Uptime SLA",
    ],
  },
];

const toolCategories = [
  {
    name: "Project Management",
    icon: FolderKanban,
    tools: ["Jira", "Linear", "Notion"],
  },
  {
    name: "Communication",
    icon: MessageSquare,
    tools: ["Slack", "Zoom", "Google Meet"],
  },
  {
    name: "Development",
    icon: GitBranch,
    tools: ["GitHub", "VS Code", "Cursor"],
  },
  {
    name: "Design",
    icon: Paintbrush,
    tools: ["Figma", "FigJam"],
  },
  {
    name: "DevOps",
    icon: Box,
    tools: ["Docker", "AWS", "Vercel"],
  },
  {
    name: "Testing",
    icon: TestTube2,
    tools: ["Jest", "Playwright", "Cypress"],
  },
];

/* ──────────────────────── FAQ ──────────────────────── */

export const faqData = [
  {
    question: "How long does a typical project take from start to launch?",
    answer:
      "Timelines vary based on scope and complexity. A focused MVP or single-platform application typically takes 8 to 14 weeks. Larger enterprise systems with multiple integrations can take 4 to 6 months. During the Discovery phase we provide a detailed timeline estimate so you know exactly what to expect before development begins.",
  },
  {
    question: "How involved do I need to be during the project?",
    answer:
      "We tailor the level of client involvement to your preferences. At minimum, we need active participation during Discovery for requirements validation and at each sprint review for feedback. Some clients prefer weekly check-ins, others prefer to review at key milestones. We adapt our communication cadence to what works best for you.",
  },
  {
    question: "What happens if requirements change mid-project?",
    answer:
      "Our agile process is designed to accommodate change. Because we work in two-week sprints, scope adjustments can be absorbed into the next sprint planning cycle. Significant changes are assessed for impact on timeline and budget, and we always discuss trade-offs transparently before proceeding. A flexible backlog ensures priorities shift without derailing the project.",
  },
  {
    question: "How do you ensure code quality and security?",
    answer:
      "Quality is embedded at every stage. We enforce code reviews on all pull requests, run automated unit and integration tests in CI, and conduct manual exploratory QA. Security audits include dependency scanning, OWASP compliance checks, and penetration testing before launch. We also maintain comprehensive documentation so your team can maintain the codebase long after delivery.",
  },
  {
    question: "What kind of support do you provide after launch?",
    answer:
      "We offer flexible post-launch support agreements tailored to your needs. This can include bug fixing, performance monitoring, feature development, and strategic consulting. Our standard support includes a warranty period after go-live, and ongoing retainers are available for continuous improvement. Many of our clients choose to keep us as a long-term technology partner.",
  },
];

/* ──────────────────────── Page ──────────────────────── */

export default function ProcessPage() {
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Our Process"
        description="Proven 6-phase methodology from discovery to launch. Agile sprints, transparent communication & quality-first approach."
        url={`${SITE_URL}/process`}
      />
      <FAQJsonLd questions={faqData} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Our Process", url: `${SITE_URL}/process` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <ContainerUI className="relative">
          <div className="page-hero-enter">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Our Process" },
              ]}
            />
          </div>
          <div className="page-hero-enter" style={{ animationDelay: "80ms" }}>
            <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3 text-center">Methodology</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
              How We Deliver
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
              A proven methodology refined over 50+ successful projects — from first conversation to long-term growth.
            </p>
            <div className="mt-4">
              <GearIcon size={44} />
            </div>
          </div>
        </ContainerUI>
      </section>

      {/* ── Process Phases ───────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-[10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-brand/[0.03] blur-[100px] animate-mesh-4" />
          <div className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.025] blur-[100px] animate-mesh-5" />
          <div className="absolute bottom-[5%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/[0.02] blur-[100px] animate-mesh-3" />
        </div>

        <ContainerUI>
          <div className="relative max-w-5xl mx-auto">
            {/* ── Vertical progress bar (desktop left side) ── */}
            <div
              className="absolute left-5 md:left-7 top-0 bottom-0 w-[3px] rounded-full bg-brand/[0.06] hidden lg:block overflow-hidden"
              aria-hidden="true"
            >
              {/* Animated gradient fill that extends the full height */}
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-b from-brand via-accent-cyan to-accent-violet animate-progress-fill origin-top" />
              {/* Step markers */}
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {phases.map((_, i) => (
                  <AnimatedSection
                    key={i}
                    variant="scale"
                    delay={i * 0.08}
                  >
                    <div className="w-[11px] h-[11px] rounded-full border-2 border-white bg-brand -ml-[4px] relative z-10 shadow-sm" />
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* ── Mobile vertical line ── */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-accent-cyan/15 to-accent-violet/15 md:hidden"
              aria-hidden="true"
            />

            {/* ── Zigzag phase cards ── */}
            {phases.map((phase, idx) => {
              const PhaseIcon = phase.icon;
              const isEven = idx % 2 === 0;
              const desktopAlign = isEven
                ? "lg:pr-[18%]"
                : "lg:pl-[18%] lg:ml-auto";

              return (
                <div key={phase.number} className="relative">
                  {/* ── Animated connector between steps ── */}
                  {idx > 0 && (
                    <AnimatedSection
                      variant="fadeIn"
                      delay={0.05}
                      className="hidden md:flex items-center justify-center py-1"
                    >
                      <div className="flex items-center gap-0">
                        <div
                          className={`w-14 lg:w-20 h-px ${
                            isEven
                              ? "bg-gradient-to-r from-transparent to-brand/30"
                              : "bg-gradient-to-r from-brand/30 to-transparent"
                          }`}
                        />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand/30 flex-shrink-0" />
                        <div
                          className={`w-14 lg:w-20 h-px ${
                            isEven
                              ? "bg-gradient-to-r from-brand/30 to-transparent"
                              : "bg-gradient-to-r from-transparent to-brand/30"
                          }`}
                        />
                      </div>
                    </AnimatedSection>
                  )}

                  {/* ── Phase card — slides in from alternating sides ── */}
                  <AnimatedSection
                    variant={isEven ? "slideRight" : "slideLeft"}
                    delay={0.06}
                    className={`relative py-6 md:py-10 ${desktopAlign}`}
                  >
                    {/* Mobile: step number circle */}
                    <div className="absolute left-[2px] top-8 md:hidden z-10">
                      <AnimatedSection variant="scale" delay={0.05}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold text-sm shadow-[0_0_0_3px_rgba(32,133,53,0.12)] animate-step-pulse">
                          {phase.number}
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-14 md:ml-0 rounded-2xl border-l-4 transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] ${
                        isEven
                          ? "border-l-brand bg-white"
                          : "border-l-accent-cyan bg-background-subtle"
                      } p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]`}
                    >
                      {/* Header row: number + icon + title + timeline */}
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        {/* Desktop step number — scale-in animation */}
                        <AnimatedSection variant="scale" delay={0.1}>
                          <div className="hidden sm:flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand text-white font-bold text-lg md:text-xl shadow-[0_0_0_4px_rgba(32,133,53,0.12)] animate-step-pulse">
                            {phase.number}
                          </div>
                        </AnimatedSection>

                        {/* Icon with bounce animation */}
                        <AnimatedSection variant="scale" delay={0.18}>
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-xl animate-icon-bounce ${
                              isEven ? "bg-brand/10" : "bg-accent-cyan/10"
                            }`}
                          >
                            <PhaseIcon
                              size={20}
                              className={
                                isEven ? "text-brand" : "text-accent-cyan"
                              }
                            />
                          </div>
                        </AnimatedSection>

                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {phase.title}
                        </h3>

                        <span className="ml-auto text-xs font-medium text-foreground-muted bg-background-muted px-3 py-1 rounded-full whitespace-nowrap">
                          {phase.timeline}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-foreground-secondary leading-relaxed mt-3 mb-6">
                        {phase.description}
                      </p>

                      {/* Activities & Deliverables */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                            Key Activities
                          </h4>
                          <ul className="space-y-2">
                            {phase.activities.map((activity) => (
                              <li
                                key={activity}
                                className="flex items-start gap-2 text-sm text-foreground-secondary"
                              >
                                <span
                                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                    isEven ? "bg-brand" : "bg-accent-cyan"
                                  }`}
                                />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                            Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable) => (
                              <li
                                key={deliverable}
                                className="flex items-start gap-2 text-sm text-foreground-secondary"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="text-brand flex-shrink-0 mt-0.5"
                                />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </ContainerUI>
      </section>

      {/* Visual break — brainstorming/collaboration photo */}
      <div className="relative h-[180px] md:h-[260px] overflow-hidden">
        <Image
          src="/images/stock/brainstorming.webp"
          alt="Retech Solutions team brainstorming and planning"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </div>

      {/* ── Tools We Use ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background-subtle overflow-hidden">
        <ContainerUI>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="Tooling"
              title="Tools We Use"
              description="We leverage established tools across every stage of the development lifecycle to ensure quality, speed, and transparency."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {toolCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <StaggerItem key={category.name}>
                  <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10">
                        <CategoryIcon size={20} className="text-brand" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-block text-sm font-medium text-foreground-secondary bg-background-subtle px-3 py-1.5 rounded-lg border border-black/[0.04]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </ContainerUI>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <ContainerUI>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label="FAQ"
              title="Frequently Asked Questions"
              description="Common questions about how we work, what to expect, and how we ensure your project succeeds."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqData} />
          </div>
        </ContainerUI>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        <ContainerUI className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Our proven process ensures your project is delivered on time, on
                budget, and above expectations. Let&apos;s talk about how we can
                help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  Get Your Free Estimate
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href="/case-studies"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </ContainerUI>
      </section>
    </>
  );
}
