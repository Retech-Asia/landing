import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

/**
 * Discovery section (Hallmark B1: "We start with how your business works").
 *
 * REDESIGNED 2026-10-27 (owner: the full-bleed photo banner with bottom
 * text read generic, the AR-1 panorama went soft stretched across the
 * viewport, and the masked reveal was animation machinery a professional
 * site doesn't need). The section is now a static editorial composition —
 * a server component with zero client JS:
 *
 * - Type-led opening: mono number/label eyebrow on a hairline rule, then a
 *   large serif display headline with the body copy set beside it (small
 *   column, generous whitespace) — asymmetry through typography, not tricks.
 * - AR-1 sits below as a framed panoramic plate at its native aspect
 *   (2055×765 ≈ 8:3) inside the container — sharp at any width instead of
 *   upscaled full-bleed, and readable as a "workshop wall" exhibit rather
 *   than a backdrop.
 * - The Aurora→Discovery handoff is layout, spacing and color only: the
 *   hero's terrain resolves into a calm paper section.
 *
 * Laws preserved: AR-1 renders exactly ONCE on the page (the hero never
 * touches it); no reveal/blur/scale/mask animation anywhere (removed per
 * owner directive — natural scrolling only); photo is lazy (below the LCP
 * frame); black-scrim-overlay law retired with the full-bleed treatment
 * (the plate needs no scrim — no text sits on it).
 */

const BACKDROP = {
  src: "/images/studio/ar1-discovery-whiteboard.jpg",
  alt: "Engineering workshop wall with business process, system architecture, and user experience sketches",
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

export function DiscoverySection() {
  const t = useTranslations("home.discovery");

  return (
    <section className="border-b border-rule bg-background" aria-label={t("label")}>
      <Container className="pb-20 pt-16 md:pb-28 md:pt-24">
        {/* Eyebrow: established number + hairline pattern */}
        <div className="flex items-baseline gap-4 border-t border-rule pt-4">
          <span className="font-display text-sm text-foreground-muted">{t("number")}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            {t("label")}
          </span>
        </div>

        {/* Asymmetric type block: headline spans wide, body holds a narrow
            right column — hierarchy from scale and whitespace. */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
          <h2 className="font-display-title text-4xl leading-[1.08] tracking-tight text-foreground text-balance lg:col-span-8 lg:text-6xl">
            {t("title")}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-foreground-secondary md:text-lg lg:col-span-4 lg:col-start-9 lg:self-end">
            {t("body")}
          </p>
        </div>

        {/* The AR-1 plate: native-ratio framed panorama, contained in the
            grid — no full-bleed upscale, no overlay text. */}
        <figure className="mt-12 md:mt-16">
          <div className="relative aspect-[8/3] overflow-hidden rounded-lg border border-rule">
            <Image
              src={BACKDROP.src}
              alt={BACKDROP.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={BACKDROP.blurDataURL}
              className="object-cover"
            />
          </div>
        </figure>
      </Container>
    </section>
  );
}
