"use client";

import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Forma Studio shared UI primitives (Wave 2B handoff): editorial, spacious,
 * typography-forward — wide reading areas, elegant headlines, small
 * uppercase section labels, pill chips. Scoped `--fs-*` tokens set on the
 * shell root keep this palette separate from Northline, Meridian and site
 * tokens.
 */

export const fsVars = {
  "--fs-canvas": "#FAF9F6",
  "--fs-surface": "#FFFFFF",
  "--fs-ink": "#242735",
  "--fs-secondary": "#6E6A7C",
  "--fs-accent": "#625CA7",
  "--fs-accent-soft": "#EFEDF8",
  "--fs-border": "#E7E4EB",
  "--fs-warn-bg": "#F8EEDC",
  "--fs-warn-text": "#8A5A18",
  "--fs-ok-bg": "#E6F0E6",
  "--fs-ok-text": "#3D6B44",
  "--fs-info-bg": "#E9EAF6",
  "--fs-info-text": "#4A4E92",
  "--fs-error-bg": "#F7E3E0",
  "--fs-error-text": "#9C3F32",
} as CSSProperties;

/** Handoff product mark: a geometric F — two horizontal bars, one vertical spine. */
export function FormaMark({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <rect x="5" y="3" width="3.5" height="18" rx="1" />
      <rect x="5" y="3" width="14" height="3.5" rx="1" />
      <rect x="5" y="10.25" width="10" height="3.5" rx="1" />
    </svg>
  );
}

export type FsChipTone =
  | "neutral"
  | "accent"
  | "amber"
  | "green"
  | "blue"
  | "red"
  | "muted";

const CHIP_TONE: Record<FsChipTone, string> = {
  neutral: "bg-[#EDEBF0] text-[#55505F]",
  accent: "bg-[var(--fs-accent-soft)] text-[var(--fs-accent)]",
  amber: "bg-[var(--fs-warn-bg)] text-[var(--fs-warn-text)]",
  green: "bg-[var(--fs-ok-bg)] text-[var(--fs-ok-text)]",
  blue: "bg-[var(--fs-info-bg)] text-[var(--fs-info-text)]",
  red: "bg-[var(--fs-error-bg)] text-[var(--fs-error-text)]",
  muted: "bg-[var(--fs-canvas)] text-[var(--fs-secondary)]",
};

/** Small uppercase pill label — Forma's editorial status treatment. */
export function FsChip({
  tone = "neutral",
  children,
  className,
}: {
  tone?: FsChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap",
        CHIP_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function FsAvatar({
  initials,
  hue,
  size = 28,
}: {
  initials: string;
  hue: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: `hsl(${hue} 28% 93%)`,
        color: `hsl(${hue} 30% 38%)`,
      }}
    >
      {initials}
    </span>
  );
}

/** Spacious editorial panel — hairline border, no heavy chrome. */
export function FsPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] shadow-[0_1px_2px_rgba(36,39,53,0.04)]",
        className
      )}
    >
      {children}
    </section>
  );
}

/** Small uppercase section label — the handoff's editorial signpost. */
export function FsLabel({
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
        "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fs-secondary)]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function FsPanelHeader({
  title,
  action,
  id,
}: {
  title: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
      <FsLabel id={id}>{title}</FsLabel>
      {action}
    </div>
  );
}

export function FsButton({
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
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fs-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--fs-accent)] text-white hover:bg-[#524C94]",
        variant === "ghost" &&
          "border border-[var(--fs-border)] bg-[var(--fs-surface)] text-[var(--fs-ink)] hover:border-[var(--fs-accent)] hover:text-[var(--fs-accent)]",
        variant === "danger" &&
          "border border-[var(--fs-error-bg)] bg-[var(--fs-error-bg)] text-[var(--fs-error-text)] hover:border-[var(--fs-error-text)]",
        variant === "subtle" &&
          "text-[var(--fs-secondary)] hover:bg-[var(--fs-accent-soft)] hover:text-[var(--fs-accent)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function FsInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-[44px] w-full rounded-lg border border-[var(--fs-border)] bg-[var(--fs-surface)] px-3.5 text-sm text-[var(--fs-ink)] placeholder:text-[var(--fs-secondary)] focus:border-[var(--fs-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--fs-accent)]/20",
        className
      )}
    />
  );
}

export function FsTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border border-[var(--fs-border)] bg-[var(--fs-surface)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--fs-ink)] placeholder:text-[var(--fs-secondary)] focus:border-[var(--fs-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--fs-accent)]/20",
        className
      )}
    />
  );
}

export function FsSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-[44px] cursor-pointer appearance-none rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%236E6A7C%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-[position:right_0.9rem_center] bg-no-repeat py-2 pl-4 pr-9 text-sm text-[var(--fs-ink)] focus:border-[var(--fs-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--fs-accent)]/20",
        className
      )}
    >
      {children}
    </select>
  );
}

/**
 * Right-side detail drawer (asset details, story details). Esc + overlay
 * close, focus moves to the close button on open.
 */
export function FsDrawer({
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
      <div className="absolute inset-0 bg-[#242735]/30" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[var(--fs-border)] bg-[var(--fs-surface)] shadow-xl"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-[var(--fs-border)] bg-[var(--fs-surface)] px-5 py-3.5">
          <h2 className="font-serif text-lg font-semibold tracking-tight text-[var(--fs-ink)]">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fs-secondary)] hover:bg-[var(--fs-accent-soft)] hover:text-[var(--fs-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fs-accent)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function FsKV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="w-32 shrink-0">
        <FsLabel>{label}</FsLabel>
      </dt>
      <dd className="text-sm leading-relaxed text-[var(--fs-ink)]">{children}</dd>
    </div>
  );
}
