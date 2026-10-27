import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import { localizeServiceHref } from "@/lib/services-data";

/**
 * Services gallery (Hallmark B1, approved act 01 "What we build" composition):
 * six families as large image-led editorial panels, alternating wide and
 * half-width spans, not a card grid. Deep-link and aria contract carried over
 * from the capability explorer: hero quick-nav hashes `#capabilities-<id>`
 * still resolve (ids live on each panel; scroll-mt clears the sticky header).
 *
 * 2026-10-27 (owner, refinement round 2): the faint mono eyebrow tags above
 * panel titles ("Specialist solutions: CMS + ERP" etc.) are removed — titles
 * and descriptions carry the hierarchy. Specialist capabilities (CMS/ERP,
 * UI/UX) remain discoverable via the service detail pages the panels link
 * to. AR-3 photography replaces weak panel photos when approved; existing
 * registry captures stand in per the asset-ownership law.
 */

type Panel = {
  id: string;
  href: string;
  image: { src: string; alt: string };
  /** Path into home.capabilities: "featured.title" or "rows.<i>.<field>". */
  titlePath: string;
  whatPath: string;
  span: string;
};

const PANELS: Panel[] = [
  {
    id: "crm-systems",
    href: "/services/crm-systems",
    image: { src: "/images/photo/photo-crm-laptop.webp", alt: "Business analytics dashboards on a laptop" },
    titlePath: "featured.title",
    whatPath: "featured.what",
    span: "md:col-span-4",
  },
  {
    id: "web-development",
    href: "/services/web-development",
    image: { src: "/images/photo/photo-web-code.webp", alt: "Engineer typing code on a laptop" },
    titlePath: "rows.0.title",
    whatPath: "rows.0.what",
    span: "md:col-span-2",
  },
  {
    id: "mobile-app-development",
    href: "/services/mobile-app-development",
    image: { src: "/images/photo/photo-mobile-dev.webp", alt: "Hand holding a phone running an app" },
    titlePath: "rows.1.title",
    whatPath: "rows.1.what",
    span: "md:col-span-3",
  },
  {
    id: "desktop-app-development",
    href: "/services/desktop-app-development",
    image: { src: "/images/photo/photo-desktop-workstation.webp", alt: "Engineer at a multi-monitor workstation" },
    titlePath: "rows.2.title",
    whatPath: "rows.2.what",
    span: "md:col-span-3",
  },
  {
    id: "ai-development",
    href: "/services/ai-development",
    image: { src: "/images/photo/photo-ai-circuit.webp", alt: "Macro of a circuit board" },
    titlePath: "rows.3.title",
    whatPath: "rows.3.what",
    span: "md:col-span-2",
  },
  {
    id: "it-consulting",
    href: "/services/it-consulting",
    image: { src: "/images/photo/photo-consulting-workshop.webp", alt: "Workshop discussion in a loft office" },
    titlePath: "rows.4.title",
    whatPath: "rows.4.what",
    span: "md:col-span-4",
  },
];

/** Resolve a dotted path against a raw next-intl node (object or array). */
function pick(node: unknown, path: string): string {
  const [head, rest] = path.split(/\.(.+)/);
  if (!head) return "";
  const value = (node as Record<string, unknown>)[head];
  if (rest) return pick(value, rest);
  return typeof value === "string" ? value : "";
}

export function ServicesGallery({ locale }: { locale: "en" | "vi" }) {
  const t = useTranslations("home.capabilities");
  const tg = useTranslations("home.gallery");
  return (
    <section className="py-20 md:py-28" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="02"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
          align="left"
        />

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[340px] md:grid-cols-6 md:gap-5">
          {PANELS.map((p) => {
            const raw: unknown = p.titlePath.startsWith("featured")
              ? t.raw("featured")
              : t.raw("rows");
            const rel = (path: string) => path.split(".").slice(1).join(".");
            const title = pick(raw, rel(p.titlePath));
            const href = localizeServiceHref(p.href, locale);

            return (
              <a
                key={p.id}
                id={`capabilities-${p.id}`}
                href={href}
                aria-label={title}
                className={`group relative block aspect-[16/10] scroll-mt-28 overflow-hidden rounded-lg border border-rule-soft md:aspect-auto md:h-full ${p.span}`}
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Photo overlay law: black scrim only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-display text-2xl text-white md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                    {pick(raw, rel(p.whatPath))}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white">
                    {tg("explore")}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
