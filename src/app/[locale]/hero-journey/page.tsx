import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroJourney } from "@/components/sections/hero/HeroJourney";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Isolated preview of the cinematic Engineering Journey hero alternative
 * (owner contract 2026-10-27). STAGING-ONLY: noindex, no site links —
 * reachable by direct URL only. The approved Aurora hero (HeroSignal) stays
 * the production homepage hero; nothing here touches it. Background uses
 * the approved reference as a labelled stand-in until ChatGPT delivers the
 * clean masters (see docs/chatgpt-hero-journey-clean-master-spec).
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata(): Metadata {
  return {
    title: "Hero Journey — Engineering Journey preview | Retech Solutions",
    description:
      "Isolated staging preview of the cinematic Engineering Journey hero alternative.",
    robots: { index: false, follow: false },
  };
}

export default async function HeroJourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <HeroJourney />;
}
