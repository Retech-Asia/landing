import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  gradient?: boolean;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  label,
  title,
  description,
  gradient = false,
  align = "center",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3">
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
