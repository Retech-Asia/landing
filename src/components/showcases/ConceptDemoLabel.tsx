import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Mandatory "Concept demonstration — sample data" label shown on every
 * showcase surface (mock-labeling law: synthetic fixtures are always visibly
 * labeled EN + VI). Non-removable by design; every showcase page renders it.
 */
const LABEL_COPY = {
  en: "Concept demonstration — sample data. Illustrates our design and engineering capability; not a delivered client project.",
  vi: "Minh họa khái niệm — dữ liệu mẫu. Thể hiện năng lực thiết kế và phát triển của chúng tôi; không phải dự án của khách hàng.",
} as const;

export function ConceptDemoLabel({
  locale,
  className,
}: {
  locale: "en" | "vi";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400",
        className
      )}
      role="note"
      aria-label={LABEL_COPY[locale]}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{LABEL_COPY[locale]}</span>
    </p>
  );
}
