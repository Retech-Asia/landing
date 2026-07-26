import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Max number of items to show before collapsing middle items with an ellipsis.
   *  Default 3 (Home › Second › ... › Last). Set to 0 or a large number to disable. */
  maxItems?: number;
  /** Max characters for the LAST (current page) label before truncating with
   *  an ellipsis. Only the current page truncates — short items like "Home"
   *  and "Blog" never truncate regardless of length. Per PatternFly guidance:
   *  leave at least 4 characters visible. Default 50. */
  maxLabelChars?: number;
}

function truncateLabel(label: string, maxChars: number): { text: string; truncated: boolean } {
  if (label.length <= maxChars) return { text: label, truncated: false };
  // Reserve 1 char for the ellipsis character itself.
  const cut = Math.max(4, maxChars - 1);
  return { text: label.slice(0, cut).trimEnd() + "…", truncated: true };
}

type VisibleNode =
  | { kind: "item"; item: BreadcrumbItem }
  | { kind: "collapsed"; hiddenLabels: string };

export function BreadcrumbNav({
  items,
  className,
  maxItems = 3,
  maxLabelChars = 50,
}: BreadcrumbNavProps) {
  // Collapse middle items if path is longer than maxItems. Keep first,
  // second (if present), and last. NN/g + Pencil & Paper confirm
  // ellipsis-collapse is the standard convention for long paths.
  let visibleItems: VisibleNode[];
  if (maxItems > 0 && items.length > maxItems) {
    const head = items.slice(0, 2);
    const tail = items[items.length - 1];
    const hidden = items.slice(2, items.length - 1);
    visibleItems = [
      ...head.map((item) => ({ kind: "item" as const, item })),
      {
        kind: "collapsed" as const,
        hiddenLabels: hidden.map((i) => i.label).join(" › "),
      },
      { kind: "item" as const, item: tail },
    ];
  } else {
    visibleItems = items.map((item) => ({ kind: "item" as const, item }));
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      {/* flex-wrap (not flex-nowrap) so short items can wrap to a 2nd line
          if needed instead of getting force-truncated. The user explicitly
          preferred 2-3 line breaks over nonsensical "Ho... > B..." truncation
          on short labels. */}
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {visibleItems.map((node, index) => {
          if (node.kind === "collapsed") {
            return (
              <li
                key={`collapsed-${index}`}
                className="flex items-center gap-1.5 shrink-0"
                title={node.hiddenLabels}
                aria-label={`Hidden breadcrumb items: ${node.hiddenLabels}`}
              >
                <ChevronRight size={14} className="text-foreground-muted shrink-0" />
                <span className="text-foreground-muted select-none px-0.5">…</span>
              </li>
            );
          }

          const { item } = node;
          const isLast = index === visibleItems.length - 1;
          // Only the current page (last item) can be long enough to warrant
          // truncation. Short ancestor items (Home, Blog, Services) never
          // truncate — they always show in full. If they wrap, that's fine.
          const { text: labelText, truncated } = isLast
            ? truncateLabel(item.label, maxLabelChars)
            : { text: item.label, truncated: false };

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {index > 0 && (
                <ChevronRight size={14} className="text-foreground-muted shrink-0" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-foreground-muted hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  title={truncated ? item.label : undefined}
                  className={cn(
                    "text-foreground font-medium",
                    // Only the last item gets truncation + min-w-0 so it can
                    // shrink within the flex row. Ancestor items have no
                    // min-w-0 and no truncation — they wrap naturally.
                    isLast && "min-w-0",
                    isLast && truncated && "truncate",
                  )}
                >
                  {labelText}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
