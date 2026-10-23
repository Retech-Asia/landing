import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroHybrid } from "@/components/sections/home/HeroHybrid";

/**
 * STAGING-ONLY hero-hybrid preview (owner checkpoint-1 ruling, 2026-10-23):
 * the refined Concept C/A hero renders here in isolation while the live
 * homepage keeps the approved hero. Not linked from navigation, noindex,
 * absent from the sitemap. If the owner approves the variant after review,
 * HeroHybrid replaces Hero on the homepage and this route is removed.
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hero hybrid preview (staging only)",
    robots: { index: false, follow: false },
  };
}

export default async function HeroPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {/* Staging note — in flow under the site header so reviewers always
          know which surface they are on; never ships to the homepage. */}
      <div className="bg-brand-dark px-4 py-2 text-center text-xs font-medium text-white">
        Staging preview: hero hybrid variant (C desktop / A mobile). The live
        homepage is unchanged. Rail links open the section-01 explorer on the
        homepage with that capability preselected.
      </div>
      <HeroHybrid />
    </>
  );
}
