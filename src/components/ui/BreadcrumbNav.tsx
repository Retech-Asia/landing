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
  /** Max characters per breadcrumb label before truncating with an ellipsis.
   *  Per PatternFly guidance: leave at least 4 characters visible. Default 40. */
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
  maxLabelChars = 40,
}: BreadcrumbNavProps) {
  // Collapse middle items if path is longer than maxItems. Keep first,
  // second (if present), and last. The user's intent: "if more than 3 paths,
  // show first, second and last, hide middles with ...".
  // NN/g + Pencil & Paper both confirm ellipsis-collapse is the standard.
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
      <ol className="flex flex-nowrap items-center gap-1.5 text-sm overflow-hidden">
        {visibleItems.map((node, index) => {
          // Collapsed-middle marker: ellipsis glyph with tooltip listing
          // hidden items. Not a link — explicit user choice to hide middles.
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
          const { text: labelText, truncated } = truncateLabel(item.label, maxLabelChars);

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5 min-w-0"
            >
              {index > 0 && (
                <ChevronRight size={14} className="text-foreground-muted shrink-0" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  title={truncated ? item.label : undefined}
                  className="text-foreground-muted hover:text-foreground transition-colors truncate"
                >
                  {labelText}
                </Link>
              ) : (
                <span
                  title={truncated ? item.label : undefined}
                  className="text-foreground font-medium truncate min-w-0"
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
