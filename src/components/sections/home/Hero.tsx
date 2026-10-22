import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LitDunes } from "@/components/sections/home/LitDunes";
import { TrustedBy } from "@/components/sections/home/TrustedBy";

/* ------------------------------------------------------------------ */
/*  Hero — the approved Lit Dunes composition (owner directive        */
/*  2026-10-22: restore the scene as the central visual identity;     */
/*  removing it for a Lighthouse score was ruled the wrong            */
/*  trade-off). Static SSR server component: the dunes are a          */
/*  client island that idle-arms AFTER first paint, so the H1/CTA     */
/*  copy still renders with zero client JS on the LCP path.           */
/*                                                                    */
/*  Restored from 8e10775 (last approved composition): full-bleed     */
/*  terrain, text scrim, bottom fade, industries chips on the         */
/*  canvas. Option A visible H1 stands (RT-06 checkpoint ruling).     */
/*  The former eyebrow line ("Retech Solutions. Custom software       */
/*  from Ho Chi Minh City.") is removed per the owner copy            */
/*  directive of the same day.                                        */
/*                                                                    */
/*  Owner checkpoint 3 (2026-10-22): the 50+/30+/5+ stat strip is     */
/*  removed — unverified numbers stop displaying. A proposed          */
/*  evidence-backed capability line (EN+VI) awaits the Jay gate;      */
/*  the hero stands on H1 + standfirst + CTAs + industries until      */
/*  then. Rotating headlines and animated counters stay retired.      */
/* ------------------------------------------------------------------ */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative min-h-svh flex flex-col overflow-hidden pt-16"
      aria-label="Introduction"
    >
      {/* Lit Dunes — approved scene (idle-armed, never blocks first paint;
          static brand-wash fallback beneath for no-WebGL environments). */}
      <LitDunes />

      {/* Text scrim — keeps the headline readable over the terrain
          (desktop: left-to-right; mobile: radial behind the copy). */}
      <div
        className="absolute inset-0 z-[var(--z-base)] pointer-events-none hero-text-scrim"
        aria-hidden="true"
      />

      {/* Bottom fade — ghosts the dunes into the next section's canvas and
          gives the industries strip a legible bed without a hard edge. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background-subtle/0 to-background-subtle/95 z-[var(--z-base)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex-1 flex items-center">
        <Container className="w-full py-8 md:py-10">
          <div className="hero-content-enter max-w-4xl">
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
                  the green brand identity). */}
              <Button href="/contact" size="lg" className="font-semibold w-full sm:w-auto">
                {t("ctaPrimary")}
              </Button>
              <Button href="/services" variant="ghost" size="lg" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Industries strip — translucent chips on the dune canvas, handing
          off to real navigation (each chip links its /industries page). */}
      <TrustedBy />
    </section>
  );
}
