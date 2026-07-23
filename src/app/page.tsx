import dynamic from "next/dynamic";
import Image from "next/image";
import { Hero } from "@/components/sections/home/Hero";
import { ScrollGradientShift } from "@/components/ui/ScrollGradientShift";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import {
  SectionFallback,
  CompactSectionFallback,
  ScrollVelocityFallback,
} from "@/components/ui/Skeleton";

// Heavy framer-motion components — lazy-loaded to reduce initial JS bundle.
const StatsBar = dynamic(
  () => import("@/components/sections/home/StatsBar").then((m) => m.StatsBar),
  { loading: () => <SectionFallback className="py-6 md:py-8 border-y border-black/[0.06]" /> },
);
const ScrollVelocityText = dynamic(
  () => import("@/components/ui/ScrollVelocityText").then((m) => m.ScrollVelocityText),
  { loading: () => <ScrollVelocityFallback /> },
);

// Below-fold sections: lazy-loaded to reduce initial JS bundle
const TrustedBy = dynamic(
  () => import("@/components/sections/home/TrustedBy").then((m) => m.TrustedBy),
  { loading: () => <SectionFallback /> },
);
const ServicePreview = dynamic(
  () => import("@/components/sections/home/ServicePreview").then((m) => m.ServicePreview),
  { loading: () => <SectionFallback /> },
);
const ProductShowcase = dynamic(
  () => import("@/components/sections/home/ProductShowcase").then((m) => m.ProductShowcase),
  { loading: () => <SectionFallback /> },
);
const MidPageCTA = dynamic(
  () => import("@/components/sections/home/MidPageCTA").then((m) => m.MidPageCTA),
  { loading: () => <CompactSectionFallback /> },
);
// Partners section removed — duplicated TechStack content.
// const Partners = dynamic(...)
const SuccessStories = dynamic(
  () => import("@/components/sections/home/SuccessStories").then((m) => m.SuccessStories),
  { loading: () => <SectionFallback /> },
);
const Testimonials = dynamic(
  () => import("@/components/sections/home/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionFallback /> },
);
const WhyRetech = dynamic(
  () => import("@/components/sections/home/WhyRetech").then((m) => m.WhyRetech),
  { loading: () => <SectionFallback /> },
);
const WhyVietnam = dynamic(
  () => import("@/components/sections/home/WhyVietnam").then((m) => m.WhyVietnam),
  { loading: () => <SectionFallback /> },
);
const TechStack = dynamic(
  () => import("@/components/sections/home/TechStack").then((m) => m.TechStack),
  { loading: () => <SectionFallback /> },
);
const HomeFAQ = dynamic(
  () => import("@/components/sections/home/HomeFAQ").then((m) => m.HomeFAQ),
  { loading: () => <SectionFallback /> },
);
const HomeCTA = dynamic(
  () => import("@/components/sections/home/HomeCTA").then((m) => m.HomeCTA),
  { loading: () => <CompactSectionFallback /> },
);
const ScrollReveal = dynamic(
  () => import("@/components/ui/ScrollReveal").then((m) => m.ScrollReveal),
);

const homeFAQItems = [
  {
    question: "What services does Retech Solutions offer?",
    answer:
      "We offer full-cycle software development services including custom web and mobile applications, CMS platforms (WordPress, Strapi, Webflow), CRM solutions (Salesforce, HubSpot integrations), ERP systems, AI-powered products, and dedicated development team services. Our expertise spans the entire lifecycle from business analysis and UI/UX design through development, testing, and deployment.",
  },
  {
    question: "How does the dedicated team model work?",
    answer:
      "Our dedicated team model provides you with a fully integrated extension of your in-house team. We assemble developers, designers, and project managers based on your tech stack and project requirements. The team works exclusively on your project, follows your processes, and reports directly to you. You retain full control over priorities and sprint planning while we handle recruitment, infrastructure, and HR.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with a modern tech stack including React, Next.js, Vue.js, Node.js, Python, and TypeScript on the frontend and backend. For mobile, we use React Native and Flutter. Our CMS expertise covers WordPress, Strapi, and headless CMS architectures. We also have strong experience with cloud platforms (AWS, GCP, Azure), and we integrate AI/ML capabilities using frameworks like TensorFlow and OpenAI APIs.",
  },
  {
    question: "How do you handle communication and project management?",
    answer:
      "We use agile methodologies with regular sprint planning, daily standups, and retrospectives. Communication happens through your preferred channels — Slack, Microsoft Teams, or Zoom. You receive weekly progress reports and have direct access to the project manager and development team. We also use tools like Jira, Linear, or Notion for transparent task tracking, so you always know the status of your project.",
  },
  {
    question: "What are your pricing models?",
    answer:
      "We offer three flexible pricing models: (1) Fixed Price — ideal for projects with well-defined scope and requirements, giving you cost certainty upfront. (2) Time & Materials — best for evolving projects where flexibility is needed, billed hourly based on actual work. (3) Dedicated Team — a monthly retainer for ongoing collaboration with a dedicated team. We recommend the best model based on your project scope and business objectives during our initial consultation.",
  },
];

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd
        title="Retech Solutions | Software Development & IT Outsourcing"
        description="Full-cycle software development outsourcing — from business analysis and design to development, testing, and deployment. Agile methodologies, modern technologies, and AI-driven solutions for web and mobile applications."
        url="https://www.retech.asia"
      />
      <FAQJsonLd questions={homeFAQItems} />

      {/* Ambient scroll-linked gradient — subtle hue drift across the
          entire page as user scrolls. GPU-composited, respects reduced-motion. */}
      <ScrollGradientShift />

      {/* 1. Hero — always first */}
      <Hero />

      {/* 2. StatsBar — early credibility, visible without scrolling far */}
      <StatsBar />
      <div className="space-y-0">
        <ScrollVelocityText
          items={["CMS Development", "CRM Solutions", "ERP Systems", "AI Integration", "Web Applications", "Mobile Development"]}
          direction="forward"
          variant="gradient"
          speed={1}
        />
        <ScrollVelocityText
          items={["Custom Software", "Dedicated Teams", "UI/UX Design", "Cloud Architecture", "API Engineering", "Product Strategy"]}
          direction="reverse"
          variant="outline"
          speed={0.8}
        />
      </div>

      <SectionDivider />

      {/* 3. TrustedBy — social proof as early as possible */}
      <TrustedBy />

      <SectionDivider />

      {/* 4. ServicePreview — what we do */}
      <ServicePreview />

      <SectionDivider />

      {/* 5. ProductShowcase — proof of capability (show before claims) */}
      <ProductShowcase />

      <SectionDivider />

      {/* 5.5 Mid-page CTA — capture interest while engagement is high */}
      <MidPageCTA />

      <SectionDivider />

      {/* AI visual strip — adds tech context before the value-prop section */}
      <div className="relative h-[160px] md:h-[240px] overflow-hidden">
        <Image
          src="/images/stock/ai-abstract.webp"
          alt="AI-powered software development capabilities"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-sm md:text-lg font-medium text-foreground-secondary max-w-md">
              AI-integrated engineering — from ML-powered search to intelligent automation
            </p>
          </div>
        </div>
      </div>

      {/* 6. WhyRetech — differentiators / value proposition */}
      <ScrollReveal speed={0.05}>
        <WhyRetech />
      </ScrollReveal>

      <SectionDivider />

      {/* 7. WhyVietnam — competitive advantage */}
      <WhyVietnam />

      <SectionDivider />

      {/* 8. TechStack — technical detail after establishing value.
          Previously followed by a 3rd ScrollVelocity strip + Partners section.
          Both removed: ScrollVelocity was redundant with the two at top,
          Partners duplicated TechStack content (logo grid of the same tech
          brands we already show above). */}
      <ScrollReveal speed={0.08}>
        <TechStack />
      </ScrollReveal>

      <SectionDivider variant="subtle" />

      {/* Visual breather — team collaboration photo between content-heavy
          sections. Adds human element after the technical TechStack section. */}
      <section className="relative h-[320px] md:h-[440px] overflow-hidden">
        <Image
          src="/images/stock/team-collaboration.webp"
          alt="Retech Solutions engineering team collaborating on a project"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                Built by engineers who care about your outcomes
              </h2>
              <p className="text-sm md:text-base text-foreground-secondary leading-relaxed">
                Every project is led by a senior engineer who owns delivery
                end-to-end — not handed off to a junior team after the sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SuccessStories — deeper proof */}
      <SuccessStories />

      <SectionDivider variant="subtle" />

      {/* 11. Testimonials — voice of customers */}
      <Testimonials />

      <SectionDivider />

      {/* 12. FAQ — objection handling before final CTA */}
      <HomeFAQ />

      <SectionDivider variant="subtle" />

      {/* 13. HomeCTA — final conversion push */}
      <HomeCTA />
    </>
  );
}
