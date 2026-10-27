import dynamic from "next/dynamic";
// Hero + Discovery arrival: Concept II "Signal to System" as ONE coordinated
// sequence (owner redesign 2026-10-27): Aurora opening -> flow-lane
// transformation -> masked AR-1 reveal -> discovery copy arrival, all in one
// sticky stage with a single AR-1 rendering. Reduced motion renders the
// static hero + the static DiscoverySection inside the same component.
// Rollback = swap this import back to `@/components/sections/home/HeroHybrid`
// + a standalone <DiscoverySection /> (both in the tree).
import { HeroSignal } from "@/components/sections/home/HeroSignal";
import { ProductConcepts } from "@/components/sections/home/ProductConcepts";
import { ProofStrip } from "@/components/sections/home/ProofStrip";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { setRequestLocale, getTranslations } from "next-intl/server";

// Below-fold sections: lazy-loaded to reduce initial JS bundle.
// All are static server components in the Direction B design (RT-08).
// Hallmark B1 (2026-10-26): ServicePreview is replaced by the approved
// discovery + services-gallery composition. The discovery beat itself moved
// inside HeroSignal (2026-10-27 one-stage redesign). Rollback = restore the
// DiscoverySection import + render (file stays in the tree).
const ServicesGallery = dynamic(
  () => import("@/components/sections/home/ServicesGallery").then((m) => m.ServicesGallery),
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

      {/* 1. Hero + Discovery arrival - "Aurora Signal" as one coordinated
          sequence (owner redesign 2026-10-27): the approved LitDunes Aurora
          opens, flow-lane line-work organizes into workflow streams, AR-1
          arrives through a single shared-layer mask reveal, and the settled
          frame is the "We start with how your business works" discovery —
          the photo renders exactly once. #capabilities-* deep links resolve
          on the gallery panels below. */}
      <HeroSignal />

      {/* 2. ServicesGallery - six families as image-led editorial panels;
          carries the explorer deep-link (#capabilities-*) + aria contract */}
      <ServicesGallery locale={locale as "en" | "vi"} />

      {/* 3. ProofStrip - one-line band pointing at the concepts section
          (#concepts). Small enough to load statically. */}
      <ProofStrip />

      {/* 4. ProductConcepts - owner decision 2026-10-26: featured product
          concepts replace the five delivered case studies (OurWork kept in
          the tree for rollback; case-study routes/SEO untouched, reached
          via the section's delivered-work line). Featured: Meridian
          Operations + Relay Field; flagship slots 1-2 (Property CRM,
          Healthcare mobile) prepend after ChatGPT blueprint approval.
          #capabilities deep links are unaffected (they live on the gallery). */}
      <ProductConcepts />

      {/* 5. DeliverySection - delivery checklist with the artifact each
          phase produces */}
      <DeliverySection />

      {/* 6. AiApproach - two lettered blocks: building with AI vs AI in
          the product */}
      <AiApproach />

      {/* 7. Engagement - three engagement shapes + cost drivers */}
      <Engagement />

      {/* 8. HomeCTA - closing contact band (light default per owner surface
          preference; variant="dark" is the one-prop alternative) */}
      <HomeCTA />
    </>
  );
}
