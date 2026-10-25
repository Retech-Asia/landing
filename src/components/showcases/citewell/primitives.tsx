"use client";

import { useEffect, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Citewell primitives (Wave 2C handoff §2C): credible, analytical,
 * evidence-first. Cool palette, squared-off panels, citation emphasis.
 * All colors flow through the scoped --cw-* variables set by the demo roots.
 */

export const cwVars = {
  "--cw-canvas": "#F5F8FA",
  "--cw-surface": "#FFFFFF",
  "--cw-ink": "#193047",
  "--cw-secondary": "#5C7284",
  "--cw-accent": "#2C668B",
  "--cw-accent-soft": "#E8F1F7",
  "--cw-border": "#DFE8EF",
  "--cw-ok-bg": "#E4F1EA",
  "--cw-ok-text": "#1F6B45",
  "--cw-warn-bg": "#F7EEDD",
  "--cw-warn-text": "#8A5A18",
  "--cw-error-bg": "#F7E6E4",
  "--cw-error-text": "#96382E",
} as React.CSSProperties;

/** Two linked quotation marks inside a minimal square outline. */
export function CitewellMark({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
      <path d="M8.5 10.2c0-.9.7-1.7 1.6-1.7M9.6 8.5c.8 0 1.5.7 1.5 1.6 0 1.1-.9 2-2 2h-.1" />
      <path d="M13.4 10.2c0-.9.7-1.7 1.6-1.7M14.5 8.5c.8 0 1.5.7 1.5 1.6 0 1.1-.9 2-2 2h-.1" />
      <path d="M11 12.1h2.4" />
    </svg>
  );
}

export type CwChipTone =
  | "neutral"
  | "accent"
  | "green"
  | "amber"
  | "red"
  | "muted";

const CHIP_TONE: Record<CwChipTone, string> = {
  neutral: "bg-[var(--cw-accent-soft)] text-[var(--cw-accent)]",
  accent: "bg-[var(--cw-accent)] text-white",
  green: "bg-[var(--cw-ok-bg)] text-[var(--cw-ok-text)]",
  amber: "bg-[var(--cw-warn-bg)] text-[var(--cw-warn-text)]",
  red: "bg-[var(--cw-error-bg)] text-[var(--cw-error-text)]",
  muted: "bg-[var(--cw-canvas)] text-[var(--cw-secondary)]",
};

export function CwChip({
  tone = "neutral",
  children,
  className,
}: {
  tone?: CwChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap",
        CHIP_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function CwPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--cw-border)] bg-[var(--cw-surface)] shadow-[0_1px_2px_rgba(25,48,71,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CwLabel({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <p
      id={id}
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cw-secondary)]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function CwPanelHeader({
  title,
  action,
  id,
}: {
  title: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
      <CwLabel id={id}>{title}</CwLabel>
      {action}
    </div>
  );
}

export function CwButton({
  variant = "ghost",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "subtle";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cw-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-[var(--cw-accent)] text-white hover:bg-[#245574]",
        variant === "ghost" &&
          "border border-[var(--cw-border)] bg-[var(--cw-surface)] text-[var(--cw-ink)] hover:border-[var(--cw-accent)] hover:text-[var(--cw-accent)]",
        variant === "danger" &&
          "border border-[var(--cw-error-bg)] bg-[var(--cw-error-bg)] text-[var(--cw-error-text)] hover:border-[var(--cw-error-text)]",
        variant === "subtle" &&
          "text-[var(--cw-secondary)] hover:bg-[var(--cw-accent-soft)] hover:text-[var(--cw-accent)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function CwInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-[44px] w-full rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 text-sm text-[var(--cw-ink)] placeholder:text-[var(--cw-secondary)] focus:border-[var(--cw-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--cw-accent)]/20",
        className
      )}
    />
  );
}

export function CwSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-[44px] cursor-pointer appearance-none rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%235C7284%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-[position:right_0.9rem_center] bg-no-repeat py-2 pl-3.5 pr-9 text-sm text-[var(--cw-ink)] focus:border-[var(--cw-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--cw-accent)]/20",
        className
      )}
    >
      {children}
    </select>
  );
}

/**
 * Right-side evidence drawer (source excerpts, review details). Esc + overlay
 * close, focus moves to the close button on open.
 */
export function CwDrawer({
  open,
  onClose,
  title,
  children,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeLabel: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 cursor-default bg-[#193047]/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[var(--cw-border)] bg-[var(--cw-surface)] shadow-xl"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-[var(--cw-border)] bg-[var(--cw-surface)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--cw-ink)]">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--cw-secondary)] hover:bg-[var(--cw-accent-soft)] hover:text-[var(--cw-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cw-accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

export function CwKV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
      <span className="w-36 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cw-secondary)]">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-[var(--cw-ink)]">{children}</span>
    </div>
  );
}
