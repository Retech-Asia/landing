"use client";

import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Meridian shared UI primitives (Wave 2A handoff §2): precise enterprise
 * operations — compact, squared, structured. Scoped `--md-*` tokens set on
 * the shell root keep this palette separate from Northline and site tokens.
 */

export const mdVars = {
  "--md-canvas": "#F7F6F2",
  "--md-surface": "#FFFFFF",
  "--md-ink": "#25313B",
  "--md-secondary": "#66737D",
  "--md-accent": "#A36535",
  "--md-accent-soft": "#F5EADF",
  "--md-border": "#E4E2DB",
  "--md-warn-bg": "#FBF0DC",
  "--md-warn-text": "#8A5A18",
  "--md-ok-bg": "#E4EFE4",
  "--md-ok-text": "#3D6B44",
  "--md-info-bg": "#E4ECF2",
  "--md-info-text": "#3D5A74",
  "--md-error-bg": "#F7E3E0",
  "--md-error-text": "#9C3F32",
} as CSSProperties;

export type MdChipTone =
  | "neutral"
  | "accent"
  | "amber"
  | "green"
  | "blue"
  | "red"
  | "muted";

const CHIP_TONE: Record<MdChipTone, string> = {
  neutral: "bg-[#EDEBE4] text-[#4E5A62]",
  accent: "bg-[var(--md-accent-soft)] text-[var(--md-accent)]",
  amber: "bg-[var(--md-warn-bg)] text-[var(--md-warn-text)]",
  green: "bg-[var(--md-ok-bg)] text-[var(--md-ok-text)]",
  blue: "bg-[var(--md-info-bg)] text-[var(--md-info-text)]",
  red: "bg-[var(--md-error-bg)] text-[var(--md-error-text)]",
  muted: "bg-[#F1EFE9] text-[var(--md-secondary)]",
};

/** Narrow, uppercase status chip — Meridian's status treatment. */
export function StatusChip({
  tone = "neutral",
  children,
  className,
}: {
  tone?: MdChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-black/[0.04] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap",
        CHIP_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function MdAvatar({
  initials,
  hue,
  size = 26,
}: {
  initials: string;
  hue: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-sm font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: `hsl(${hue} 24% 91%)`,
        color: `hsl(${hue} 32% 30%)`,
      }}
    >
      {initials}
    </span>
  );
}

export function MdPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] shadow-[0_1px_2px_rgba(37,49,59,0.05)]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function MdPanelHeader({ title, action, id }: { title: string; action?: ReactNode; id?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--md-border)] px-4 py-2.5">
      <h3 id={id} className="text-[13px] font-semibold uppercase tracking-wide text-[var(--md-ink)]">
        {title}
      </h3>
      {action}
    </div>
  );
}

export function MdButton({
  variant = "ghost",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" | "subtle" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--md-accent)] text-white hover:bg-[#8A5429]",
        variant === "ghost" &&
          "border border-[var(--md-border)] bg-[var(--md-surface)] text-[var(--md-ink)] hover:border-[var(--md-accent)] hover:text-[var(--md-accent)]",
        variant === "danger" &&
          "border border-[var(--md-error-bg)] bg-[var(--md-error-bg)] text-[var(--md-error-text)] hover:border-[var(--md-error-text)]",
        variant === "subtle" &&
          "text-[var(--md-secondary)] hover:bg-[var(--md-accent-soft)] hover:text-[var(--md-accent)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function MdInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-[44px] w-full rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] px-3 text-sm text-[var(--md-ink)] placeholder:text-[var(--md-secondary)] focus:border-[var(--md-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--md-accent)]/20",
        className
      )}
    />
  );
}

export function MdSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-[44px] cursor-pointer appearance-none rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%2366737D%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-[position:right_0.75rem_center] bg-no-repeat py-2 pl-3 pr-8 text-sm text-[var(--md-ink)] focus:border-[var(--md-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--md-accent)]/20",
        className
      )}
    >
      {children}
    </select>
  );
}

export function MdSortHeader({
  label,
  active,
  direction,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${label}${active ? (direction === "asc" ? " — ascending" : " — descending") : ""}`}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1 text-left text-[11px] font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)]",
        active ? "text-[var(--md-accent)]" : "text-[var(--md-secondary)] hover:text-[var(--md-ink)]",
        className
      )}
    >
      {label}
      <span aria-hidden="true" className={cn("text-[10px]", !active && "opacity-0")}>
        {direction === "asc" ? "▲" : "▼"}
      </span>
    </button>
  );
}

/**
 * Right-side detail drawer (line items, approval detail). Esc + overlay
 * close, focus moves to the close button on open.
 */
export function MdDrawer({
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
      <div className="absolute inset-0 bg-[#25313B]/30" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[var(--md-border)] bg-[var(--md-surface)] shadow-xl"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-[var(--md-border)] bg-[var(--md-surface)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--md-ink)]">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--md-secondary)] hover:bg-[var(--md-accent-soft)] hover:text-[var(--md-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

export function MdKV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
        {label}
      </dt>
      <dd className="text-sm text-[var(--md-ink)]">{children}</dd>
    </div>
  );
}

export function MdMono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono tabular-nums", className)}>{children}</span>;
}
