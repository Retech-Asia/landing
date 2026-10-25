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
 * Northline shared UI primitives. The demo uses its own scoped, light
 * application palette (creative handoff §2) — CSS variables set on the shell
 * root so the site's light/dark themes cannot bleed into the app canvas.
 * These colors do NOT replace ReTech site tokens.
 */

export const nlVars = {
  "--nl-canvas": "#F6F8F8",
  "--nl-surface": "#FFFFFF",
  "--nl-ink": "#172431",
  "--nl-muted": "#64748B",
  "--nl-accent": "#167D72",
  "--nl-accent-soft": "#E7F3F0",
  "--nl-border": "#E3E9EA",
  "--nl-warn-bg": "#FEF3C7",
  "--nl-warn-text": "#92400E",
  "--nl-error-bg": "#FEE2E2",
  "--nl-error-text": "#B91C1C",
} as CSSProperties;

export type StageTone = "neutral" | "teal" | "blue" | "amber" | "green" | "muted" | "danger";

const TONE_PILL: Record<StageTone, string> = {
  neutral: "bg-[#EEF2F6] text-[#475569]",
  teal: "bg-[var(--nl-accent-soft)] text-[var(--nl-accent)]",
  blue: "bg-[#E0F2FE] text-[#0369A1]",
  amber: "bg-[var(--nl-warn-bg)] text-[var(--nl-warn-text)]",
  green: "bg-[#DCFCE7] text-[#15803D]",
  muted: "bg-[#F1F5F9] text-[var(--nl-muted)]",
  danger: "bg-[var(--nl-error-bg)] text-[var(--nl-error-text)]",
};

export function Pill({ tone = "neutral", children, className }: { tone?: StageTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONE_PILL[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({ initials, hue, size = 28 }: { initials: string; hue: number; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: `hsl(${hue} 32% 92%)`,
        color: `hsl(${hue} 45% 28%)`,
      }}
    >
      {initials}
    </span>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-xl border border-[var(--nl-border)] bg-[var(--nl-surface)] shadow-[0_1px_2px_rgba(23,36,49,0.04)]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function PanelHeader({ title, action, id }: { title: string; action?: ReactNode; id?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--nl-border)] px-4 py-3">
      <h3 id={id} className="text-sm font-semibold text-[var(--nl-ink)]">
        {title}
      </h3>
      {action}
    </div>
  );
}

export function NlButton({
  variant = "ghost",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "subtle" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--nl-accent)] text-white hover:bg-[#10635B]",
        variant === "ghost" &&
          "border border-[var(--nl-border)] bg-[var(--nl-surface)] text-[var(--nl-ink)] hover:border-[var(--nl-accent)] hover:text-[var(--nl-accent)]",
        variant === "subtle" &&
          "text-[var(--nl-muted)] hover:bg-[var(--nl-accent-soft)] hover:text-[var(--nl-accent)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function NlInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-[44px] w-full rounded-lg border border-[var(--nl-border)] bg-[var(--nl-surface)] px-3 text-sm text-[var(--nl-ink)] placeholder:text-[var(--nl-muted)] focus:border-[var(--nl-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--nl-accent)]/20",
        className
      )}
    />
  );
}

export function NlSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-[44px] cursor-pointer appearance-none rounded-lg border border-[var(--nl-border)] bg-[var(--nl-surface)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%2364748B%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-[position:right_0.75rem_center] bg-no-repeat py-2 pl-3 pr-8 text-sm text-[var(--nl-ink)] focus:border-[var(--nl-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--nl-accent)]/20",
        className
      )}
    >
      {children}
    </select>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex rounded-lg border border-[var(--nl-border)] bg-[var(--nl-surface)] p-0.5"
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-[36px] rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--nl-accent)]",
              selected
                ? "bg-[var(--nl-accent)] text-white"
                : "text-[var(--nl-muted)] hover:text-[var(--nl-ink)]"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function SortHeader({
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
        "inline-flex min-h-[44px] items-center gap-1 text-left text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]",
        active ? "text-[var(--nl-accent)]" : "text-[var(--nl-muted)] hover:text-[var(--nl-ink)]",
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
 * Right-side detail drawer. Esc + overlay close, focus moves to the close
 * button on open. Content = view-specific.
 */
export function Drawer({
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
        className="absolute inset-0 bg-[#172431]/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[var(--nl-border)] bg-[var(--nl-surface)] shadow-xl"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-[var(--nl-border)] bg-[var(--nl-surface)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--nl-ink)]">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--nl-muted)] hover:bg-[var(--nl-accent-soft)] hover:text-[var(--nl-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

export function KV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--nl-muted)]">
        {label}
      </dt>
      <dd className="text-sm text-[var(--nl-ink)]">{children}</dd>
    </div>
  );
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono tabular-nums", className)}>{children}</span>;
}
