import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TrustedBy } from "@/components/sections/home/TrustedBy";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Hero — editorial enterprise (Direction B, RT-07). Static SSR      */
/*  server component: no framer-motion, no WebGL, no client JS on     */
/*  the LCP path. The visible H1 is Option A ("Turning Ideas into     */
/*  Solutions", owner checkpoint 2026-10-22); the former sr-only      */
/*  seoH1 is retired and its keyword content lives in the metadata    */
/*  + standfirst. Lit Dunes is parked per checkpoint 3 (preserved     */
/*  in LitDunes.tsx, not rendered here).                              */
/* ------------------------------------------------------------------ */
export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale() as "en" | "vi";

  return (
    <section className="border-b border-rule" aria-label="Introduction">
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="hero-content-enter max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted">
            {t("eyebrow")}
          </p>

          {/* Visible, accessible H1 (Option A). Serif 600 per the RT-06
              type system; the accent carries the brand green in serif
              italic. LCP element: SSR-visible text, no entrance gate. */}
          <h1 className="font-display-title mt-6 mb-6 text-balance text-[2.75rem] leading-[1.05] tracking-[-0.015em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            {t("h1Pre")}
            <br />
            {t("h1Into")}{" "}
            <em className="font-display italic text-brand">{t("h1Accent")}</em>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            {t("standfirst")}
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Brand-green primary stays the hero CTA (checkpoint 1: keep
                the green brand identity); ink buttons carry section CTAs. */}
            <Button href="/contact" size="lg" className="font-semibold w-full sm:w-auto">
              {t("ctaPrimary")}
            </Button>
            <Button href="/services" variant="ghost" size="lg" className="w-full sm:w-auto">
              {t("ctaSecondary")}
            </Button>
          </div>

          {/* Canonical stats (lib/constants STATS) as a static SSR grid —
              no counters, no hydration dependency. */}
          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-rule pt-8 sm:gap-10">
            {STATS.map((stat) => (
              <div key={stat.label.en}>
                <p className="font-display-title text-4xl leading-none text-foreground md:text-5xl">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm tracking-wide text-foreground-muted">
                  {stat.label[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Industries strip — real navigation (each chip links its
          /industries page); now sits on the flat editorial canvas. */}
      <TrustedBy />
    </section>
  );
}
