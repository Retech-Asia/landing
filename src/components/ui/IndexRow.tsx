import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface IndexRowProps {
  /** Zero-padded row number rendered in the left gutter ("01", "1.1", "a"). */
  number?: string;
  title: string;
  /** Secondary line under the title (tagline, industry, scope). */
  description?: string;
  /** Right-aligned meta text (e.g. industry label). */
  meta?: string;
  /** Optional right-side content slot (arrow, link label). */
  children?: ReactNode;
  href?: string;
  className?: string;
}

/**
 * Direction B ruled index row — the editorial list unit for capabilities,
 * selected work, and engagement shapes (RT-07..RT-10). Hairline-separated,
 * grid-aligned: gutter number / serif title / description / meta.
 * Renders as a link when `href` is set, otherwise as a static row.
 */
export function IndexRow({
  number,
  title,
  description,
  meta,
  children,
  href,
  className,
}: IndexRowProps) {
  const grid = cn(
    "group grid grid-cols-1 md:grid-cols-[44px_1.2fr_1fr_auto] gap-2 md:gap-7 items-baseline",
    "border-b border-rule-soft py-6 md:py-7",
    className
  );

  const body = (
    <>
      {number ? (
        <p className="font-display text-sm text-foreground-muted tabular-nums">
          {number}
        </p>
      ) : null}
      <h3 className="font-display-title text-xl md:text-2xl leading-snug text-foreground transition-colors group-hover:text-brand">
        {title}
      </h3>
      {description ? (
        <p className="text-sm leading-relaxed text-foreground-secondary">
          {description}
        </p>
      ) : (
        <span aria-hidden="true" className="hidden md:block" />
      )}
      <p className="text-xs uppercase tracking-[0.1em] text-foreground-muted md:text-right whitespace-nowrap">
        {meta}
        {children}
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(grid, "transition-colors")}>
        {body}
      </Link>
    );
  }

  return <div className={grid}>{body}</div>;
}

/** Top rule for an index row list — pair with IndexRow for the B ruled-list look. */
export function IndexRowList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("border-t border-rule", className)}>{children}</div>;
}
