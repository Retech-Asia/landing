"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { LitDunes } from "./LitDunes";

/**
 * "Aurora Signal" hero — SIMPLIFIED 2026-10-27 (owner creative direction:
 * "prioritize visual elegance, simplicity, and usability over cinematic
 * complexity"; simplifying/removing the pinned sequence was explicitly
 * sanctioned, and an ordinary visitor should "arrive at a beautiful
 * Discovery section without noticing complex animation machinery").
 *
 * The hero is a single full viewport: the theme-following LitDunes Aurora
 * (the approved signature) with the serif display headline, standfirst, and
 * standard CTA pair anchored lower-left over the near dunes while the
 * layered aurora curtain fills the upper-right. No sticky region, no
 * scroll-driven beats, no signal line-work, no cards or floating metrics.
 *
 * 2026-10-27 presence pass (owner: the hero felt empty — raise the Aurora's
 * visual presence via art direction, not components): larger dune forms,
 * fixed key light, layered two-curtain sky weighted to the upper-right,
 * denser horizon haze, stronger light-mode wash; headline moved to the
 * serif display face at editorial scale. Transition to Discovery is pure
 * layout/spacing (no animation machinery — see DiscoverySection).
 *
 * Laws: hero follows the site theme (no forceDark, theme-aware scrim,
 * foreground tokens); AR-1 is NOT rendered here (exactly once, in
 * DiscoverySection); reduced motion needs no branch (nothing animates).
 *
 * Rollback: `git log` — the pinned one-stage cinematic version lived at
 * c7bd276; the pre-Hallmark hero at HeroHybrid (kept in tree).
 */

export function HeroSignal() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative flex h-screen min-h-[560px] flex-col overflow-hidden bg-background"
      aria-label={t("h1Accent")}
    >
      <div className="absolute inset-0">
        <LitDunes />
      </div>
      {/* Theme-aware text scrim (same treatment as the previous heroes). */}
      <div className="absolute inset-0 hero-text-scrim" aria-hidden="true" />
      {/* 2026-10-27 presence pass: the copy anchors lower-left — the serif
          display headline sits over the rich near dunes while the layered
          aurora curtain owns the upper-right. One deliberate composition
          instead of a top-left block with bare space around it. */}
      <div className="relative flex flex-1 flex-col justify-end pb-24 pt-24 md:pb-32 md:pt-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display-title text-5xl leading-[1.04] tracking-tight text-foreground text-balance md:text-7xl">
              {t("h1Pre")} {t("h1Into")}{" "}
              <em className="italic text-brand">{t("h1Accent")}</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
              {t("standfirst")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" className="font-semibold">
                {t("ctaPrimary")}
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Container>
      </div>
      {/* Thin mono scroll cue (static, quiet). */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          Scroll
        </p>
        <div className="mx-auto mt-2 h-8 w-px bg-foreground/25" />
      </div>
    </section>
  );
}
