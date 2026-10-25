"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LocalePair } from "@/lib/showcases/types";
import { STORE_PROVIDERS, VIEW_COMPONENTS } from "./view-registry";

/**
 * Client shell for a showcase product page: accessible view tabs, lazy
 * loading of the active view's interactive demo, and ?view= deep links.
 *
 * The view titles + summaries are rendered by the parent SERVER component
 * (crawlable without JS); this shell only manages which demo is mounted.
 * Skeleton fallback keeps CLS at zero while the demo chunk loads.
 */

function DemoSkeleton() {
  return (
    <div
      className="mt-4 flex h-[420px] items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03]"
      role="status"
      aria-label="Loading demo"
    >
      <div className="skeleton h-8 w-48 rounded-md" />
    </div>
  );
}

export function ViewPanel({
  showcaseId,
  viewId,
  locale,
  standalone = false,
}: {
  showcaseId: string;
  viewId: string;
  locale: "en" | "vi";
  /** Full-screen [view] route: the demo root pins its chrome to this view. */
  standalone?: boolean;
}) {
  // Views register components already wrapped in next/dynamic at module
  // scope (stable identity, lint-clean) — the shell only looks them up.
  const View = VIEW_COMPONENTS[showcaseId]?.[viewId];
  // Per-showcase demo root (shared store + scoped styles). Rendered ABOVE
  // the view, inside the persistent panel — switching tabs swaps `viewId`
  // but keeps ViewPanel mounted, so demo state survives view changes.
  const Store = STORE_PROVIDERS[showcaseId];

  if (!View) {
    // Registry entry missing (framework used before Wave 1C content lands):
    // show nothing interactive — the crawlable summary above stays the content.
    return null;
  }
  const view = <View locale={locale} />;
  return (
    <Suspense fallback={<DemoSkeleton />}>
      <div role="tabpanel" id={`showcase-panel-${viewId}`} aria-labelledby={`showcase-tab-${viewId}`} tabIndex={0} className="mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
        {Store ? <Store viewId={standalone ? viewId : undefined}>{view}</Store> : view}
      </div>
    </Suspense>
  );
}

function ShellInner({
  showcaseId,
  locale,
  views,
}: {
  showcaseId: string;
  locale: "en" | "vi";
  views: { id: string; title: LocalePair }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramView = searchParams.get("view");
  // Single source of truth: ?view=. Shell tabs, keyboard nav and in-demo
  // navigation (showcase screens changing ?view= through the demo root) all
  // router.replace it, so tabs, phone chrome and mounted view stay in sync
  // and ?view= deep links land directly — no state-sync effects needed.
  const active =
    paramView && views.some((v) => v.id === paramView) ? paramView : views[0]?.id;
  const setActive = useCallback(
    (id: string) => router.replace(`?view=${id}`, { scroll: false }),
    [router]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = views.findIndex((v) => v.id === active);
      if (e.key === "ArrowRight" && idx < views.length - 1) {
        e.preventDefault();
        setActive(views[idx + 1].id);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        setActive(views[idx - 1].id);
      }
    },
    [views, active, setActive]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Demo views"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {views.map((v) => {
          const selected = v.id === active;
          return (
            <button
              key={v.id}
              role="tab"
              id={`showcase-tab-${v.id}`}
              aria-selected={selected}
              aria-controls={`showcase-panel-${v.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(v.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-foreground/15 text-foreground/70 hover:border-brand/40 hover:text-foreground"
              }`}
            >
              {v.title[locale]}
            </button>
          );
        })}
      </div>
      {active ? (
        <Suspense fallback={<DemoSkeleton />}>
          <ViewPanel showcaseId={showcaseId} viewId={active} locale={locale} />
        </Suspense>
      ) : null}
    </div>
  );
}

export function ShowcaseDemoShell(props: {
  showcaseId: string;
  locale: "en" | "vi";
  views: { id: string; title: LocalePair }[];
}) {
  return (
    <Suspense fallback={<DemoSkeleton />}>
      <ShellInner {...props} />
    </Suspense>
  );
}
