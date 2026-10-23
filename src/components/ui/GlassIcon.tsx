import { cn } from "@/lib/cn";

/**
 * ReTech Glass Icon & Motion Kit (owner-approved, 2026-10-23).
 * The 33 hand-authored pictograms ship as static SVGs under
 * public/retech-glass/icons/<name>.svg (copied verbatim from the kit —
 * gradient ids are per-document, so <img> usage avoids id collisions).
 *
 * This is the allowlist: a name not in this union is a type error, so a
 * renamed kit asset fails at build time instead of 404ing at runtime.
 */
export const GLASS_ICON_NAMES = [
  "ai-ml",
  "ai-solutions",
  "analytics",
  "backend",
  "build",
  "cloud",
  "consulting",
  "crm",
  "database",
  "desktop",
  "design",
  "devops",
  "discover",
  "ecommerce",
  "education",
  "finance",
  "frontend",
  "global",
  "growth",
  "healthcare",
  "launch",
  "logistics",
  "mobile",
  "partnership",
  "performance",
  "quality",
  "real-estate",
  "scalability",
  "security",
  "support",
  "sustainability",
  "test",
  "transparency",
] as const;

export type GlassIconName = (typeof GLASS_ICON_NAMES)[number];

const SIZE_CLASS = {
  sm: "rg-glass--sm",
  md: "rg-glass--md",
  lg: "rg-glass--lg",
} as const;

/**
 * Frosted-glass pictogram tile. Decorative by contract: always
 * aria-hidden — adjacent visible text must carry the meaning. Hover/press
 * motion applies only when an interactive ancestor carries
 * `.rg-glass-control` and only on fine-pointer devices; both are disabled
 * under prefers-reduced-motion (see globals.css rg-* layer).
 */
export function GlassIcon({
  name,
  size = "md",
  className,
}: {
  name: GlassIconName;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}) {
  return (
    <span className={cn("rg-glass", SIZE_CLASS[size], className)} aria-hidden="true">
      {/* Kit SVGs are 1–2KB static assets — next/image optimization adds
          nothing for vector files, so plain <img> is deliberate here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/retech-glass/icons/${name}.svg`}
        alt=""
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
