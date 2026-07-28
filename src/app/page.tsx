import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { OurWork } from "@/components/sections/home/OurWork";

// Below-fold sections: lazy-loaded to reduce initial JS bundle
const TrustedBy = dynamic(
  () => import("@/components/sections/home/TrustedBy").then((m) => m.TrustedBy),
  { loading: () => <SectionFallback /> },
);
const ServicePreview = dynamic(
  () => import("@/components/sections/home/ServicePreview").then((m) => m.ServicePreview),
  { loading: () => <SectionFallback /> },
);
const MidPageCTA = dynamic(
  () => import("@/components/sections/home/MidPageCTA").then((m) => m.MidPageCTA),
  { loading: () => <CompactSectionFallback /> },
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
const Testimonials = dynamic(
  () => import("@/components/sections/home/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionFallback /> },
);
const HomeCTA = dynamic(
  () => import("@/components/sections/home/HomeCTA").then((m) => m.HomeCTA),
  { loading: () => <CompactSectionFallback /> },
);

// Removed per competitor research (docs/competitor-homepage-research.md):
// - StatsBar (duplicate of hero stats)
// - ScrollVelocityText × 2 (redundant marquee)
// - ProductShowcase (merged into OurWork)
// - ProductTabs (merged into OurWork)
// - SuccessStories (merged into OurWork)
// - HomeFAQ (competitors put FAQ at /faq, not homepage)
// - Team collaboration photo (filler, no competitor does this)
// - ScrollReveal wrappers (double animation)

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
      "We use agile methodologies with regular sprint planning, daily standups, and retrospectives. Communication happens through your preferred channels: Slack, Microsoft Teams, or Zoom. You receive weekly progress reports and have direct access to the project manager and development team. We also use tools like Jira, Linear, or Notion for transparent task tracking, so you always know the status of your project.",
  },
  {
    question: "What are your pricing models?",
    answer:
      "We offer three flexible pricing models: (1) Fixed Price, ideal for projects with well-defined scope and requirements, giving you cost certainty upfront. (2) Time & Materials, best for evolving projects where flexibility is needed, billed hourly based on actual work. (3) Dedicated Team, a monthly retainer for ongoing collaboration with a dedicated team. We recommend the best model based on your project scope and business objectives during our initial consultation.",
  },
];

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd
        title="Retech Solutions | Software Development & IT Outsourcing"
        description="Full-cycle software development outsourcing, from business analysis and design to development, testing, and deployment. Agile methodologies, modern technologies, and AI-driven solutions for web and mobile applications."
        url="https://www.retech.asia"
      />
      <FAQJsonLd questions={homeFAQItems} />

      {/* 1. Hero */}
      <Hero />

      {/* 2. TrustedBy — social proof */}
      <TrustedBy />

      <SectionDivider />

      {/* 3. ServicePreview — what we do */}
      <ServicePreview />

      <SectionDivider />

      {/* 4. OurWork — unified proof-of-work (replaces ProductShowcase +
          ProductTabs + SuccessStories). 5 case study cards, metric-led. */}
      <OurWork />

      <SectionDivider />

      {/* 5. MidPageCTA */}
      <MidPageCTA />

      <SectionDivider />

      {/* 6. WhyRetech — differentiators */}
      <WhyRetech />

      <SectionDivider />

      {/* 7. WhyVietnam — competitive advantage */}
      <WhyVietnam />

      <SectionDivider />

      {/* 8. TechStack — technical credibility */}
      <TechStack />

      <SectionDivider variant="subtle" />

      {/* 9. Testimonials — client metrics + trusted process */}
      <Testimonials />

      <SectionDivider variant="subtle" />

      {/* 10. HomeCTA — final conversion */}
      <HomeCTA />
    </>
  );
}
