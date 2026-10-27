"use client";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Property Studio shared UI primitives (Blueprint A handoff): calm,
 * professional real-estate CRM. Light canvas, restrained pine accent.
 * Scoped `--ps-*` tokens set on the shell root keep this palette separate
 * from the other showcases and site tokens.
 */

export const psVars = {
  "--ps-canvas": "#F7F8F6",
  "--ps-surface": "#FFFFFF",
  "--ps-ink": "#26312E",
  "--ps-secondary": "#66756F",
  "--ps-accent": "#2F6B52",
  "--ps-accent-soft": "#E7F0EB",
  "--ps-border": "#E3E7E2",
  "--ps-warn-bg": "#F8EFDC",
  "--ps-warn-text": "#8A5E17",
  "--ps-ok-bg": "#E3EFE6",
  "--ps-ok-text": "#38663F",
  "--ps-info-bg": "#E5EDF4",
  "--ps-info-text": "#3A5871",
  "--ps-error-bg": "#F6E4E1",
  "--ps-error-text": "#9C4033",
} as CSSProperties;

export type PsChipTone =
  | "neutral"
  | "accent"
  | "amber"
  | "green"
  | "blue"
  | "red"
  | "muted";

const CHIP_TONE: Record<PsChipTone, string> = {
  neutral: "bg-[#EAEEE9] text-[#46554F]",
  accent: "bg-[var(--ps-accent-soft)] text-[var(--ps-accent)]",
  amber: "bg-[var(--ps-warn-bg)] text-[var(--ps-warn-text)]",
  green: "bg-[var(--ps-ok-bg)] text-[var(--ps-ok-text)]",
  blue: "bg-[var(--ps-info-bg)] text-[var(--ps-info-text)]",
  red: "bg-[var(--ps-error-bg)] text-[var(--ps-error-text)]",
  muted: "bg-[#F0F2EE] text-[var(--ps-secondary)]",
};

/** Narrow, uppercase status chip — Property Studio's status treatment. */
export function PsChip({
  tone = "neutral",
  children,
  className,
}: {
  tone?: PsChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap",
        CHIP_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function PsAvatar({
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
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: `hsl(${hue} 26% 91%)`,
        color: `hsl(${hue} 30% 30%)`,
      }}
    >
      {initials}
    </span>
  );
}

export function PsPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] shadow-[0_1px_2px_rgba(38,49,46,0.05)]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function PsPanelHeader({
  title,
  action,
  id,
}: {
  title: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--ps-border)] px-4 py-2.5">
      <h3 id={id} className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
        {title}
      </h3>
      {action}
    </div>
  );
}

export function PsButton({
  variant = "ghost",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "subtle";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-[var(--ps-accent)] text-white hover:bg-[#255642]",
        variant === "ghost" &&
          "border border-[var(--ps-border)] bg-[var(--ps-surface)] text-[var(--ps-ink)] hover:border-[var(--ps-accent)] hover:text-[var(--ps-accent)]",
        variant === "subtle" &&
          "text-[var(--ps-secondary)] hover:bg-[var(--ps-accent-soft)] hover:text-[var(--ps-accent)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function PsInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-[44px] w-full rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] px-3 text-sm text-[var(--ps-ink)] placeholder:text-[var(--ps-secondary)] focus:border-[var(--ps-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ps-accent)]/20 aria-[invalid=true]:border-[var(--ps-error-text)]",
        className
      )}
    />
  );
}

export function PsSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-[44px] cursor-pointer appearance-none rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%2366756F%22 d=%22M6 8 0 0h12z%22/></svg>')] bg-[position:right_0.75rem_center] bg-no-repeat py-2 pl-3 pr-8 text-sm text-[var(--ps-ink)] focus:border-[var(--ps-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ps-accent)]/20",
        className
      )}
    >
      {children}
    </select>
  );
}

export function PsSortHeader({
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
      aria-label={`${label}${active ? (direction === "asc" ? ", ascending" : ", descending") : ""}`}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1 text-left text-[11px] font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]",
        active ? "text-[var(--ps-accent)]" : "text-[var(--ps-secondary)] hover:text-[var(--ps-ink)]",
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

/** Compact stat tile — the listing-spec treatment (beds, baths, area). */
export function PsStat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-canvas)] px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tabular-nums leading-none text-[var(--ps-ink)]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-[var(--ps-secondary)]">{hint}</p> : null}
    </div>
  );
}

export function PsKV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
        {label}
      </dt>
      <dd className="text-sm text-[var(--ps-ink)]">{children}</dd>
    </div>
  );
}

export function PsMono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono tabular-nums", className)}>{children}</span>;
}

const TILE_TONES = ["#EAEFEA", "#F0EDE5", "#E7ECEF"];

/**
 * Neutral schematic listing tile: an abstract floor-plan placeholder drawn
 * in code. No photography anywhere in this concept (Blueprint A imagery
 * law); tone varies deterministically by tile index.
 */
export function SchematicTile({
  index,
  label,
  className,
}: {
  index: number;
  label: string;
  className?: string;
}) {
  const tone = TILE_TONES[index % TILE_TONES.length];
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-md border border-[var(--ps-border)]",
        className
      )}
      style={{ backgroundColor: tone }}
    >
      <svg
        viewBox="0 0 120 90"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#26312E" strokeOpacity="0.28" strokeWidth="1.5" fill="none">
          <rect x="14" y="14" width="92" height="62" />
          <path d={`M${14 + (index % 3) * 8 + 38} 14v62`} />
          <path d={`M14 ${30 + (index % 2) * 8}h${(index % 3) * 6 + 38}`} />
          <rect x={index % 2 === 0 ? 66 : 72} y="46" width="26" height="18" />
        </g>
        <circle cx={98 - (index % 3) * 10} cy={24 + (index % 2) * 8} r="3.5" fill="#26312E" fillOpacity="0.22" />
      </svg>
      {label ? (
        <figcaption className="absolute bottom-1.5 left-2 rounded bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-[var(--ps-ink)]">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Phone-width companion column: a true narrow panel with a hairline frame.
 * No device bezel or chrome anywhere in this concept (handoff presentation
 * law); side-by-side on wide screens, stacked on narrow.
 */
export function PsPhonePanel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={cn(
        "mx-auto flex w-full max-w-[24rem] flex-col overflow-hidden rounded-lg border border-[var(--ps-border)] bg-[var(--ps-surface)] shadow-[0_1px_3px_rgba(38,49,46,0.07)]",
        className
      )}
    >
      {children}
    </section>
  );
}
