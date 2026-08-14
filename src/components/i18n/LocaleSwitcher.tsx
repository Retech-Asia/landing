"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

/**
 * Compact locale switcher for the navbar.
 *
 * Strategy: render both options as a segmented control rather than a dropdown.
 * Two reasons:
 *
 * 1. With only two locales, a dropdown wastes a click. A segmented toggle is
 *    faster and shows the current state at a glance.
 * 2. Accessibility — a segmented control maps cleanly to a `radiogroup`, while
 *    a custom dropdown would need careful combobox semantics for the same UX.
 *
 * Switching locale uses `useRouter().replace(pathname, { locale })` from
 * `@/i18n/navigation`, which preserves the path and only swaps the locale
 * segment. Slugs stay English until service/industry/case-study data files
 * get VI slugs in later phases.
 *
 * `useTransition` keeps the current page interactive during the swap (the
 * underlying navigation is server-driven for SSG'd routes).
 */
export function LocaleSwitcher({ variant = "navbar" }: { variant?: "navbar" | "mobile" }) {
  const t = useTranslations("nav.languageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!isOpen) return;
    function handlePointer(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const switchTo = useCallback(
    (next: Locale) => {
      setIsOpen(false);
      if (next === locale) return;
      startTransition(() => {
        // `replace` keeps history clean — Back button doesn't pile up
        // locale switches. `locale` option swaps the segment; pathname stays.
        router.replace(pathname, { locale: next });
      });
    },
    [locale, pathname, router]
  );

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-foreground-secondary">
          <Globe size={16} aria-hidden="true" />
          {t("label")}
        </span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label={t("ariaLabel")}>
          {routing.locales.map((loc) => (
            <button
              key={loc}
              role="radio"
              aria-checked={loc === locale}
              onClick={() => switchTo(loc)}
              disabled={isPending}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md transition-colors",
                loc === locale
                  ? "bg-brand text-white"
                  : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
              )}
            >
              {LOCALE_LABEL[loc]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("ariaLabel")}
        title={t("label")}
        disabled={isPending}
        className="flex items-center gap-1.5 px-2.5 py-2 text-sm rounded-lg text-foreground-secondary hover:text-foreground hover:bg-black/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
      >
        <Globe size={16} aria-hidden="true" />
        <span className="font-medium">{LOCALE_LABEL[locale]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="radiogroup"
            aria-label={t("ariaLabel")}
            className="absolute right-0 top-full mt-1 w-36 p-1 rounded-xl bg-background/95 backdrop-blur-xl border border-card-border shadow-[0_8px_40px_rgba(0,0,0,0.08)] z-[var(--z-dropdown)]"
          >
            {routing.locales.map((loc) => (
              <button
                key={loc}
                role="radio"
                aria-checked={loc === locale}
                onClick={() => switchTo(loc)}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                  loc === locale
                    ? "text-brand bg-brand/[0.06] font-medium"
                    : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                )}
              >
                <span>{loc === "en" ? t("en") : t("vi")}</span>
                {loc === locale && <Check size={14} aria-hidden="true" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-export for consumers that just want the available locales list.
export { routing };
