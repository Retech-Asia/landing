import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  gradient?: boolean;
  align?: "left" | "center";
  /** Direction B editorial chrome: renders "NN Label" (zero-padded) above the
   * h2 with a left-aligned grid head. Requires label when set. */
  number?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  label,
  title,
  description,
  gradient = false,
  align = "center",
  number,
  className,
  children,
}: SectionHeaderProps) {
  if (number) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 mb-12 md:mb-16", className)}>
        <p className="font-display text-brand text-base pt-2" aria-hidden="true">
          <span className="font-semibold">{number}</span>
          {label ? <span className="text-foreground-muted"> {label}</span> : null}
        </p>
        <div>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.16] font-semibold tracking-tight text-foreground text-balance",
              gradient && "gradient-text"
            )}
          >
            {title}
          </h2>
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
      {label && (
        <p className="text-sm font-medium tracking-widest uppercase text-brand-dark nav-active-text mb-3">
          {label}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance",
          gradient && "gradient-text"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
