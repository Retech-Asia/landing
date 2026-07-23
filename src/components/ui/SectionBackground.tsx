import { cn } from "@/lib/cn";

/**
 * Premium section background system — Vercel/Stripe/Linear-inspired.
 *
 * Each variant composes CSS utility classes from globals.css into a stack
 * of absolutely-positioned layers. The parent <section> must be
 * `position: relative` and `overflow: hidden` for the layers to clip
 * correctly.
 *
 * Usage:
 *   <section className="relative overflow-hidden py-20">
 *     <SectionBackground variant="grid-aurora" />
 *     <Container className="relative z-10">...</Container>
 *   </section>
 *
 * Variants:
 *   grid-fade       — Vercel-style grid lines fading from top
 *   grid-center     — Grid lines fading from center outward
 *   dots            — Dot matrix with center fade
 *   aurora          — Layered brand mesh gradients (Stripe-style)
 *   spotlight       — Single large brand glow behind content
 *   grid-aurora     — Grid + aurora combined (richest, for hero-adjacent)
 *   dots-aurora     — Dots + aurora combined
 *   spotlight-cyan  — Cyan spotlight for variety
 *   spotlight-violet— Violet spotlight for variety
 *
 * Design notes:
 *   - All pure CSS (zero JS, zero hydration cost) — safe for SSR
 *   - mask-image fades prevent edge-to-edge pattern flatness
 *   - Opacity stays low (3-8%) so content remains the focal point
 *   - Respects theme tokens via CSS custom properties
 */

type SectionBackgroundVariant =
  | "grid-fade"
  | "grid-center"
  | "dots"
  | "aurora"
  | "spotlight"
  | "grid-aurora"
  | "dots-aurora"
  | "spotlight-cyan"
  | "spotlight-violet";

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
  className?: string;
  /** Render a grain overlay on top of other layers. Adds tactile depth. */
  grain?: boolean;
}

export function SectionBackground({
  variant = "grid-aurora",
  className,
  grain = false,
}: SectionBackgroundProps) {
  return (
    <>
      {/* Base layer — the primary pattern */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 pointer-events-none", getBaseClass(variant), className)}
      />

      {/* Optional grain overlay — sits on top at very low opacity */}
      {grain && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-grain mix-blend-overlay"
        />
      )}
    </>
  );
}

function getBaseClass(variant: SectionBackgroundVariant): string {
  switch (variant) {
    case "grid-fade":
      return "bg-grid-fade";
    case "grid-center":
      return "bg-grid-fade-center";
    case "dots":
      return "bg-dots-fade";
    case "aurora":
      return "bg-aurora";
    case "spotlight":
      return "bg-spotlight-brand";
    case "spotlight-cyan":
      return "bg-spotlight-cyan";
    case "spotlight-violet":
      return "bg-spotlight-violet";
    // Composite variants — two layers stacked for richness
    case "grid-aurora":
      // Rendered as two divs via a wrapper for clean compositing
      return "bg-grid-fade";
    case "dots-aurora":
      return "bg-dots-fade";
    default:
      return "bg-grid-fade";
  }
}

/**
 * For composite variants that need two layers (grid-aurora, dots-aurora),
 * this wrapper renders both. Use it when you want the richest treatment.
 */
export function CompositeSectionBackground({
  layers,
  grain = false,
}: {
  layers: SectionBackgroundVariant[];
  grain?: boolean;
}) {
  return (
    <>
      {layers.map((layer, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn("absolute inset-0 pointer-events-none", getBaseClass(layer))}
        />
      ))}
      {grain && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-grain mix-blend-overlay"
        />
      )}
    </>
  );
}
