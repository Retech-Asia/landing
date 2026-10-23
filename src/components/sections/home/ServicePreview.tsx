"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassIcon, type GlassIconName } from "@/components/ui/GlassIcon";
import { localizeServiceHref } from "@/lib/services-data";
import { getServiceById } from "@/lib/services-data";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

/**
 * Section 01 — Capabilities explorer (visual-experience round, 2026-10-23).
 * Replaces the static RT-08 ruled index with an interactive disclosure:
 *
 *  - Desktop (md+): capability index on the left, a content panel on the
 *    right that swaps per selection (contextual photo, what we build, who
 *    it fits, verified technologies, link to the full service page).
 *    Clicking the open capability again collapses the panel.
 *  - Mobile: accessible accordion — one open capability at a time, same
 *    content inline, no horizontal scroll.
 *
 * CRM keeps the primary commercial emphasis: it is the first entry and the
 * default expanded state (SSR renders the CRM panel into the initial HTML).
 * All content comes from verified home.capabilities messages + services-data
 * technologies; nothing invented. Transitions are CSS-only and disabled
 * under prefers-reduced-motion (see globals.css .capability-enter).
 */

interface ScopeItem {
  label: string;
  text: string;
}

interface CapabilityRow {
  title: string;
  what: string;
  fits: string;
}

/** Capability order matches home.capabilities.rows; 0 is the CRM pillar. */
const CAPABILITY_IDS = [
  "web-development",
  "mobile-app-development",
  "desktop-app-development",
  "ai-development",
  "it-consulting",
] as const;

/** Row index → verified photo asset (public/images/photo/, see photography.ts). */
const PANEL_IMAGES = [
  { src: "/images/photo/photo-crm-laptop.webp", alt: "Business analytics dashboards on a laptop" },
  { src: "/images/photo/photo-web-code.webp", alt: "Engineer typing code on a laptop" },
  { src: "/images/photo/photo-mobile-dev.webp", alt: "Hand holding a phone running an app" },
  { src: "/images/photo/photo-desktop-workstation.webp", alt: "Engineer at a multi-monitor workstation" },
  { src: "/images/photo/photo-ai-circuit.webp", alt: "Macro of a circuit board" },
  { src: "/images/photo/photo-consulting-workshop.webp", alt: "Workshop discussion in a loft office" },
];

/** Row index → services-data id for technologies + localized href. */
const PANEL_SERVICES = ["crm-systems", ...CAPABILITY_IDS] as const;

/** Row index → ReTech Glass kit pictogram (glass-icon-motion kit). Same
 * order as PANEL_SERVICES; names are compile-checked by GlassIconName. */
const PANEL_GLASS: GlassIconName[] = [
  "crm",
  "frontend",
  "mobile",
  "desktop",
  "ai-solutions",
  "consulting",
];

export function ServicePreview() {
  const t = useTranslations("home.capabilities");
  const locale = useLocale() as "en" | "vi";

  const scope = t.raw("featured.scope") as ScopeItem[];
  const rows = t.raw("rows") as CapabilityRow[];

  // CRM featured content + the five rows form the six explorer entries.
  const capabilities = [
    {
      title: t("featured.title"),
      what: t("featured.what"),
      fits: t("featured.fits"),
      scope,
      isCrm: true,
    },
    ...rows.map((r) => ({ ...r, scope: [] as ScopeItem[], isCrm: false })),
  ];

  // Default expanded: the CRM pillar (index 0). null = fully collapsed.
  const [active, setActive] = useState<number | null>(0);

  const toggle = (i: number) => setActive((cur) => (cur === i ? null : i));

  // Hero quick-nav (HeroHybrid) deep-links: /#capabilities-<service-id>
  // preselects that capability and scrolls it clear of the sticky header.
  // Anchor ids live on the desktop rows (capabilities-<id>) and mobile rows
  // (capabilities-mobile-<id>) — unique ids; the visible one is scrolled.
  useEffect(() => {
    const applyHash = () => {
      const m = window.location.hash.match(/^#capabilities-([\w-]+)$/);
      if (!m) return;
      const i = PANEL_SERVICES.indexOf(m[1] as (typeof PANEL_SERVICES)[number]);
      if (i < 0) return;
      setActive(i);
      const el =
        document.getElementById(`capabilities-${m[1]}`)?.offsetParent !== null
          ? document.getElementById(`capabilities-${m[1]}`)
          : document.getElementById(`capabilities-mobile-${m[1]}`);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Defer past the router's own scroll reset: on client-side navigation
      // the App Router fires scrollTo({top:0}) in the same tick as hash
      // handling, cancelling an instant (reduced-motion) jump. The 60ms
      // delay makes this the last writer; imperceptible for smooth too.
      window.setTimeout(() => {
        el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }, 60);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const techOf = (i: number): string[] => {
    const svc = getServiceById(PANEL_SERVICES[i]);
    return svc ? svc.technologies.slice(0, 6) : [];
  };

  const hrefOf = (i: number): string =>
    localizeServiceHref(`/services/${PANEL_SERVICES[i]}`, locale);

  const img = (i: number) => PANEL_IMAGES[i];

  return (
    <section className="py-16 md:py-24" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="01"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />

        {/* ---------- Desktop: index + swapping panel ---------- */}
        <div className="hidden md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
          <div className="border-t border-rule" role="list">
            {capabilities.map((cap, i) => {
              const expanded = active === i;
              return (
                <div
                  role="listitem"
                  key={cap.title}
                  id={`capabilities-${PANEL_SERVICES[i]}`}
                  className="border-b border-rule-soft scroll-mt-28"
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={expanded}
                    aria-controls="capability-panel"
                    className="rg-glass-control group grid w-full grid-cols-[44px_auto_1fr] items-baseline gap-3 py-6 text-left"
                  >
                    <span className="font-display text-sm text-foreground-muted tabular-nums">
                      1.{i + 1}
                    </span>
                    <GlassIcon name={PANEL_GLASS[i]} size="sm" className="self-center" />
                    <span>
                      <span
                        className={`font-display-title block text-xl leading-snug transition-colors group-hover:text-brand ${
                          expanded ? "text-brand" : "text-foreground"
                        }`}
                      >
                        {cap.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">
                        {cap.fits}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div id="capability-panel" aria-live="polite">
            {active === null ? null : (
              <PanelBody
                title={capabilities[active].title}
                what={capabilities[active].what}
                fits={capabilities[active].fits}
                scope={capabilities[active].scope}
                tech={techOf(active)}
                href={hrefOf(active)}
                image={img(active)}
                glass={PANEL_GLASS[active]}
                visitLabel={t("explorer.visitLabel")}
                problemLabel={t("explorer.problemLabel")}
                techLabel={t("explorer.techLabel")}
                imageSizes="(max-width: 1280px) 50vw, 560px"
              />
            )}
          </div>
        </div>

        {/* ---------- Mobile: accordion disclosure ---------- */}
        <div className="border-t border-rule md:hidden">
          {capabilities.map((cap, i) => {
            const expanded = active === i;
            const regionId = `capability-mobile-${i}`;
            return (
              <div
                key={cap.title}
                id={`capabilities-mobile-${PANEL_SERVICES[i]}`}
                className="border-b border-rule-soft scroll-mt-28"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={expanded}
                  aria-controls={regionId}
                  className="rg-glass-control flex w-full items-baseline justify-between gap-4 py-5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <GlassIcon name={PANEL_GLASS[i]} size="sm" />
                    <span>
                      <span className="font-display text-xs text-foreground-muted tabular-nums">
                        1.{i + 1}
                      </span>
                      <span
                        className={`font-display-title mt-1 block text-lg leading-snug ${
                          expanded ? "text-brand" : "text-foreground"
                        }`}
                      >
                        {cap.title}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-foreground-muted transition-transform duration-200 motion-reduce:transition-none ${
                      expanded ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {expanded ? (
                  <div id={regionId}>
                    <PanelBody
                      title={cap.title}
                      what={cap.what}
                      fits={cap.fits}
                      scope={cap.scope}
                      tech={techOf(i)}
                      href={hrefOf(i)}
                      image={img(i)}
                      glass={PANEL_GLASS[i]}
                      visitLabel={t("explorer.visitLabel")}
                      problemLabel={t("explorer.problemLabel")}
                      techLabel={t("explorer.techLabel")}
                      imageSizes="100vw"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/**
 * Panel content shared by the desktop split panel and the mobile accordion.
 * Keyed remount (caller passes key or we rely on conditional rendering) runs
 * the .capability-enter CSS animation; reduced motion disables it.
 */
function PanelBody({
  title,
  what,
  fits,
  scope,
  tech,
  href,
  image,
  glass,
  visitLabel,
  problemLabel,
  techLabel,
  imageSizes,
}: {
  title: string;
  what: string;
  fits: string;
  scope: { label: string; text: string }[];
  tech: string[];
  href: string;
  image: { src: string; alt: string };
  glass: GlassIconName;
  visitLabel: string;
  problemLabel: string;
  techLabel: string;
  imageSizes: string;
}) {
  return (
    <div className="capability-enter relative">
      <div className="relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={1400}
          height={950}
          sizes={imageSizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="h-auto w-full object-cover"
        />
        {/* Glass kit pictogram anchors the panel (decorative; the photo
            alt + visible copy carry the meaning). Static tile — the panel
            is not itself a control, so no hover motion here. Positioned
            via a wrapper: .rg-glass sets position:relative in the rg CSS
            layer, which would defeat an `absolute` utility on the tile
            itself, and the wrapper also carries the separating ring. */}
        <span className="absolute left-4 top-4 z-10 inline-flex rounded-xl ring-2 ring-background">
          <GlassIcon name={glass} size="md" />
        </span>
      </div>

      <h3 className="sr-only">{title}</h3>

      <p className="mt-6 text-sm leading-relaxed text-foreground-secondary md:mt-8">
        {what}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
          {problemLabel}
        </p>
        <p className="mt-1 text-sm italic leading-relaxed text-foreground-muted">
          {fits}
        </p>
      </div>

      {scope.length > 0 ? (
        <ul className="mt-6 border-t border-rule-soft">
          {scope.map((item) => (
            <li key={item.label} className="border-b border-rule-soft py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground-secondary">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {tech.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
            {techLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((name) => (
              <span
                key={name}
                className="rounded-full border border-card-border bg-background-subtle px-3 py-1 text-xs font-medium text-foreground-secondary"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-7">
        <Link
          href={href}
          className="inline-flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {visitLabel}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
