import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { setRequestLocale, getTranslations } from "next-intl/server";

// Below-fold sections: lazy-loaded to reduce initial JS bundle
const OurWork = dynamic(
  () => import("@/components/sections/home/OurWork").then((m) => m.OurWork),
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
const TechStack = dynamic(
  () => import("@/components/sections/home/TechStack").then((m) => m.TechStack),
  { loading: () => <CompactSectionFallback /> },
);
const ClientResults = dynamic(
  () => import("@/components/sections/home/ClientResults").then((m) => m.ClientResults),
  { loading: () => <CompactSectionFallback /> },
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

      {/* 1. Hero — full-viewport composition: copy + CTAs + stats +
          industries strip on the dune canvas (TrustedBy renders inside
          the Hero section now, not as a standalone band) */}
      <Hero />

      {/* 2. ServicePreview — what we do (bento: 2 featured + 4 standard) */}
      <ServicePreview />

      {/* 3. OurWork — results-forward case tiles (image + before/after
          outcome + supporting results, per case-studies-data).
          Same bg-background-subtle canvas as ServicePreview: one
          continuous band, no divider between them. */}
      <OurWork />

      {/* 4. MidPageCTA */}
      <MidPageCTA />

      {/* 5. WhyRetech — differentiators + the Vietnam story in one split
          section (merged from the former WhyRetech + WhyVietnam) */}
      <WhyRetech />

      {/* 6. TechStack — compact logo cloud, links to /technologies */}
      <TechStack />

      {/* 7. ClientResults — metrics strip before the final CTA */}
      <ClientResults />

      {/* 8. HomeCTA — final conversion */}
      <HomeCTA />
    </>
  );
}
