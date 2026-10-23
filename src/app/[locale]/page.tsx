import dynamic from "next/dynamic";
// Hero flip (owner checkpoint-2 ruling, 2026-10-23): HeroHybrid is the
// staging homepage default. Rollback = swap this import back to
// `@/components/sections/home/Hero` (Concept A stays in the tree) or
// revert the commit. Production branch is untouched.
import { HeroHybrid } from "@/components/sections/home/HeroHybrid";
import { ProofStrip } from "@/components/sections/home/ProofStrip";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { setRequestLocale, getTranslations } from "next-intl/server";

// Below-fold sections: lazy-loaded to reduce initial JS bundle.
// All are static server components in the Direction B design (RT-08).
const ServicePreview = dynamic(
  () => import("@/components/sections/home/ServicePreview").then((m) => m.ServicePreview),
  { loading: () => <SectionFallback /> },
);
const OurWork = dynamic(
  () => import("@/components/sections/home/OurWork").then((m) => m.OurWork),
  { loading: () => <SectionFallback /> },
);
const DeliverySection = dynamic(
  () => import("@/components/sections/home/DeliverySection").then((m) => m.DeliverySection),
  { loading: () => <SectionFallback /> },
);
const AiApproach = dynamic(
  () => import("@/components/sections/home/AiApproach").then((m) => m.AiApproach),
  { loading: () => <CompactSectionFallback /> },
);
const Engagement = dynamic(
  () => import("@/components/sections/home/Engagement").then((m) => m.Engagement),
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
//
// Retired from the homepage in the RT-04/B editorial redesign
// (2026-10-22): WhyRetech, TechStack, ClientResults, MidPageCTA. Their
// component files and message namespaces are deleted in the same round
// (recoverable from git history). The Direction B sections
// (capabilities, selected work, delivery, AI approach, engagement) and
// the dark ink closing band replace them.
//
// FAQ schema also removed (2026-10-22): schema-only FAQ answers with no
// visible FAQ section misrepresent the page. Homepage FAQ placement is an
// RT-04/RT-05 design decision; if a visible FAQ returns, its schema returns
// with it, reusing the answers actually displayed.

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tJsonLd = await getTranslations({ locale, namespace: "homepage.jsonLd" });

  return (
    <>
      <WebPageJsonLd
        title={tJsonLd("webPageTitle")}
        description={tJsonLd("webPageDescription")}
        url="https://www.retech.asia"
      />

      {/* 1. Hero - full-viewport composition: copy + CTAs + capability
          quick-nav rail (desktop) + industries strip on the dune canvas
          (TrustedBy renders inside the hero section, not as a standalone
          band). Rail rows deep-link to the section-01 explorer. */}
      <HeroHybrid />

      {/* 2. ProofStrip - one-line proof band under the hero; links to
          the selected-work anchor (#work on OurWork). Small enough to
          load statically with the page shell. */}
      <ProofStrip />

      {/* 3. ServicePreview - capabilities: featured CRM block + ruled
          index of five capabilities (RT-08 section 01) */}
      <ServicePreview />

      {/* 4. OurWork - selected work: the five case studies as a ruled
          editorial index (RT-08 section 02); carries the #work anchor */}
      <OurWork />

      {/* 5. DeliverySection - six-phase delivery checklist with the
          artifact each phase produces (RT-08 section 03) */}
      <DeliverySection />

      {/* 6. AiApproach - two lettered blocks: building with AI vs AI in
          the product (RT-08 section 04) */}
      <AiApproach />

      {/* 7. Engagement - three engagement shapes + cost drivers
          (RT-08 section 05) */}
      <Engagement />

      {/* 8. HomeCTA - closing contact band (light default per owner surface
          preference; variant="dark" is the one-prop alternative) */}
      <HomeCTA />
    </>
  );
}
