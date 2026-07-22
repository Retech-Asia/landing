"use client";

interface ScrollVelocityTextProps {
  /** Text items to display */
  items?: string[];
  /** Separator between items */
  separator?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ScrollVelocityText({
  items = [
    "CMS Development",
    "CRM Solutions",
    "ERP Systems",
    "AI Integration",
    "Web Applications",
    "Mobile Development",
  ],
  separator = "\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0",
  className,
}: ScrollVelocityTextProps) {
  const text = items.join(separator) + separator;

  return (
    <div
      className={`relative overflow-hidden py-5 md:py-8 ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-foreground/[0.015]" />

      {/* Forward marquee */}
      <div className="relative marquee-hover-pause">
        {/* Left fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-container-slow flex whitespace-nowrap">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide gradient-text select-none px-4 shrink-0">
            {text}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide gradient-text select-none px-4 shrink-0">
            {text}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide gradient-text select-none px-4 shrink-0">
            {text}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide gradient-text select-none px-4 shrink-0">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
