"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  COOKIE_CATEGORIES,
  type ConsentPreferences,
  acceptAll,
  declineAll,
  readConsent,
  saveConsent,
} from "@/lib/cookie-consent";

/** Toggle switch accessible via keyboard. */
function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled && onChange) onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => {
        if (!disabled && onChange) onChange(!checked);
      }}
      onKeyDown={handleKeyDown}
      className={`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 focus-visible:ring-offset-2 ${
        checked
          ? "bg-[var(--brand)]"
          : "bg-gray-300"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {/* Track knob */}
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  // Start hidden to avoid SSR/client mismatch. The useEffect below
  // checks localStorage after mount and shows the banner if no consent
  // record exists. This also prevents the banner from flashing during
  // the initial page paint.
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<{
    analytics: boolean;
    marketing: boolean;
  }>({ analytics: false, marketing: false });

  const bannerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Check consent status after mount to avoid SSR hydration mismatch
  // and prevent the banner from flashing on page load.
  useEffect(() => {
    const hasConsent = readConsent() !== null;
    if (!hasConsent) {
      // Small delay so the banner doesn't jarringly appear during
      // the initial paint — gives the page content time to settle.
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // ── Actions ──────────────────────────────────────────────────

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setVisible(false);
  }, []);

  const handleDeclineAll = useCallback(() => {
    declineAll();
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    const record: ConsentPreferences = {
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: Date.now(),
    };
    saveConsent(record);
    setVisible(false);
  }, [preferences]);

  const toggleCategory = useCallback(
    (cat: "analytics" | "marketing") => {
      setPreferences((prev) => ({ ...prev, [cat]: !prev[cat] }));
    },
    []
  );

  // ── Escape key ───────────────────────────────────────────────

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleDeclineAll();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, handleDeclineAll]);

  // ── Focus management ─────────────────────────────────────────

  useEffect(() => {
    if (!visible || !bannerRef.current) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    firstFocusableRef.current?.focus();

    const banner = bannerRef.current;

    function handleTabTrap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const focusable = banner.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    banner.addEventListener("keydown", handleTabTrap);

    return () => {
      banner.removeEventListener("keydown", handleTabTrap);
      previouslyFocused?.focus?.();
    };
  }, [visible, showPreferences]);

  // ── Render ───────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 1,
          }}
          className="fixed bottom-0 inset-x-0 z-[60] flex justify-center px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
        >
          <div className="w-full max-w-4xl pointer-events-auto rounded-2xl border border-gray-200/80 bg-white shadow-[0_-4px_32px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Gradient top border accent */}
            <div
              className="h-[2px] w-full"
              style={{
                background:
                  "linear-gradient(to right, var(--brand), var(--accent-cyan))",
              }}
            />

            <div className="px-5 py-4 sm:px-6 sm:py-5">
              {/* ── Main row ── */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <p className="text-sm leading-relaxed text-gray-600 flex-1">
                  We use cookies to improve your experience and analyse site
                  traffic. You can choose which categories to allow. Read our{" "}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-gray-900 underline underline-offset-2 transition-colors hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 focus-visible:ring-offset-2 rounded-sm"
                  >
                    Privacy Policy
                  </a>{" "}
                  to learn more.
                </p>

                <div className="flex shrink-0 gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowPreferences((p) => !p)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 sm:flex-initial cursor-pointer"
                  >
                    {showPreferences ? "Hide Preferences" : "Manage Preferences"}
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 sm:flex-initial cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    ref={firstFocusableRef}
                    onClick={handleAcceptAll}
                    className="flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 sm:flex-initial cursor-pointer"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    Accept All
                  </button>
                </div>
              </div>

              {/* ── Expanded preferences panel ── */}
              <AnimatePresence initial={false}>
                {showPreferences && (
                  <motion.div
                    key="preferences"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-0 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/50">
                      {COOKIE_CATEGORIES.map((cat) => {
                        const isChecked =
                          cat.id === "necessary"
                            ? true
                            : preferences[cat.id as "analytics" | "marketing"];

                        return (
                          <div
                            key={cat.id}
                            className="flex items-center justify-between gap-4 px-4 py-3.5"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {cat.label}
                                {cat.required && (
                                  <span className="ml-1.5 text-xs font-normal text-gray-400">
                                    (always active)
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                                {cat.description}
                              </p>
                            </div>
                            <Toggle
                              checked={isChecked}
                              disabled={cat.required}
                              onChange={
                                cat.required
                                  ? undefined
                                  : () =>
                                      toggleCategory(
                                        cat.id as "analytics" | "marketing"
                                      )
                              }
                              label={`${cat.label} cookies`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        onClick={handleDeclineAll}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 cursor-pointer"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 cursor-pointer"
                        style={{ backgroundColor: "var(--brand)" }}
                      >
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
