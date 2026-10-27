import dynamic from "next/dynamic";
// Hero: the approved Aurora opening, simplified per owner creative direction
// (2026-10-27): no pinned scroll stage — a calm full-viewport Aurora hero.
// The hero-to-discovery handoff is DiscoverySection's one-shot masked
// reveal (short, unpinned, visually connected). Rollback: the pinned
// one-stage cinematic version is at commit c7bd276; HeroHybrid (pre-Hallmark)
// is still in the tree.
import { HeroSignal } from "@/components/sections/home/HeroSignal";
import { ProductConcepts } from "@/components/sections/home/ProductConcepts";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { SectionFallback, CompactSectionFallback } from "@/components/ui/Skeleton";
import { setRequestLocale, getTranslations } from "next-intl/server";

// Below-fold sections: lazy-loaded to reduce initial JS bundle.
// Hallmark B1 (2026-10-26): ServicePreview is replaced by the approved
// discovery + services-gallery composition.
const DiscoverySection = dynamic(
  () => import("@/components/sections/home/DiscoverySection").then((m) => m.DiscoverySection),
  { loading: () => <SectionFallback /> },
);
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

      {/* 1. Hero - the approved Aurora opening (simplified 2026-10-27: no
          pinned stage; simplicity over cinematic complexity). */}
      <HeroSignal />

      {/* 2. DiscoverySection - Hallmark B1 act: "We start with how your
          business works" (static editorial composition + framed AR-1 plate;
          AR-1 renders exactly once on the page; no reveal animation). */}
      <DiscoverySection />

      {/* 3. ServicesGallery - six families as image-led editorial panels;
          carries the explorer deep-link (#capabilities-*) + aria contract */}
      <ServicesGallery locale={locale as "en" | "vi"} />

      {/* 3. ProofStrip RETIRED 2026-10-27 (refinement round 2, owner: the
          "Interactive product concepts..." line is a redundant divider) —
          the concepts heading carries the transition. */}

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
