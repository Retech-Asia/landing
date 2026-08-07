import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { OurWork } from "@/components/sections/home/OurWork";
import { setRequestLocale, getTranslations } from "next-intl/server";

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

const faqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations({ locale, namespace: "home.faq" });
  const tJsonLd = await getTranslations({ locale, namespace: "homepage.jsonLd" });

  const homeFAQItems = faqKeys.map((k) => ({
    question: tHome(`items.${k}.q`),
    answer: tHome(`items.${k}.a`),
  }));

  return (
    <>
      <WebPageJsonLd
        title={tJsonLd("webPageTitle")}
        description={tJsonLd("webPageDescription")}
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
