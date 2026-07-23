import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  /** Page heading — rendered as an h1 */
  title: string;
  /** Subtitle / description shown below the title */
  description?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Additional content rendered below the description */
  children?: ReactNode;
  /** Extra classes applied to the outermost <section> */
  className?: string;
}

/**
 * PageHero — the header block used on every internal page.
 *
 * LCP note: the h1 + description render VISIBLE on SSR (no opacity:0 gate).
 * Previously these were wrapped in `<AnimatedSection variant="slideUp">`
 * which sets `opacity:0` until Framer Motion hydrates and the IntersectionObserver
 * fires — on throttled mobile that pushed LCP past 4s on /services, /about, etc.
 *
 * Entrance polish is delivered by `.page-hero-enter` (pure CSS keyframe in
 * globals.css). Below-fold content (children) still uses AnimatedSection since
 * it's below the fold and the whileInView trigger is appropriate there.
 */
export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden",
        className,
      )}
    >
      {/* Premium background: Vercel-style grid fade from top + aurora mesh.
          Previously had 3 stacked layers (GradientBackground + GridPattern +
          dot-pattern) which read as visual noise. Then was simplified to 1
          GradientBackground (too flat). Now uses the mask-fade grid pattern
          that fades radially — the technique Vercel/Stripe use for depth. */}
      <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />

      {/* Content */}
      <Container className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="page-hero-enter" style={{ animationDelay: "0ms" }}>
            <BreadcrumbNav items={breadcrumbs} />
          </div>
        )}

        <div
          className="page-hero-enter"
          style={{ animationDelay: breadcrumbs?.length ? "80ms" : "0ms" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {title}
          </h1>

          {description && (
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {children && (
          <AnimatedSection variant="slideUp" delay={0.16}>
            {children}
          </AnimatedSection>
        )}
      </Container>
    </section>
  );
}
