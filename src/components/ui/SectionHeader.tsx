import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Direction B editorial chrome: renders "NN Label" (zero-padded) above the
   * h2 with a left-aligned grid head. Requires label when set. */
  number?: string;
  className?: string;
  children?: ReactNode;
  /** Heading level; page-level headers pass "h1" (a11y: one h1 per page).
   * Defaults to "h2" for in-page sections. */
  heading?: "h1" | "h2";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  heading = "h2",
  number,
  className,
  children,
}: SectionHeaderProps) {
  const Tag = heading;
  if (number) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 mb-12 md:mb-16", className)}>
        <p className="font-display text-foreground text-base pt-2" aria-hidden="true">
          <span className="font-semibold">{number}</span>
          {label ? <span className="text-foreground-muted"> {label}</span> : null}
        </p>
        <div>
          <Tag
            className="text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.16] font-semibold tracking-tight text-foreground text-balance"
          >
            {title}
          </Tag>
          {description && (
            <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Tag className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
