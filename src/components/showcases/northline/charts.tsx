"use client";

import { useId } from "react";
import { formatCurrencyCompact } from "@/lib/showcases/northline/format";

/**
 * Hand-rolled, dependency-free chart primitives for the Northline demo
 * (no new chart libraries per program standards). Each chart renders visible
 * labels and an aria description so the data survives without vision or JS
 * hover states.
 */

export function BarList({
  rows,
  ariaLabel,
}: {
  rows: { label: string; value: number; count?: number }[];
  ariaLabel: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div role="img" aria-label={ariaLabel} className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
            <span className="font-medium text-[var(--nl-ink)]">{r.label}</span>
            <span className="font-mono tabular-nums text-[var(--nl-muted)]">
              {formatCurrencyCompact(r.value)}
              {r.count !== undefined ? ` · ${r.count}` : ""}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#EEF2F6]">
            <div
              className="h-full rounded-full bg-[var(--nl-accent)]"
              style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Activity trend — SVG line + area. `points` are pre-bucketed, equally
 * spaced, in chronological order.
 */
export function TrendChart({
  points,
  ariaLabel,
}: {
  points: { label: string; value: number }[];
  ariaLabel: string;
}) {
  const gradientId = useId();
  const W = 320;
  const H = 120;
  const PAD = 6;
  const max = Math.max(...points.map((p) => p.value), 1);
  const step = points.length > 1 ? (W - PAD * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = PAD + i * step;
    const y = H - PAD - (p.value / max) * (H - PAD * 2);
    return { x, y, ...p };
  });
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1]?.x.toFixed(1) ?? PAD},${H - PAD} L${PAD},${H - PAD} Z`;

  return (
    <div role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#167D72" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#167D72" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="#167D72" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {coords.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="6" fill="transparent">
              <title>{`${c.label}: ${c.value}`}</title>
            </circle>
            <circle cx={c.x} cy={c.y} r="2.5" fill="#167D72" />
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-[var(--nl-muted)]" aria-hidden="true">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

/** Donut for activity distribution, with a legend that doubles as the data. */
export function DonutChart({
  slices,
  centerLabel,
  ariaLabel,
}: {
  slices: { label: string; value: number; color: string }[];
  centerLabel: string;
  ariaLabel: string;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const R = 15.915; // circumference 100
  // Cumulative stroke offsets, derived functionally (no render-phase
  // mutation): first slice starts at 12 o'clock (25% of the circumference).
  const lens = slices.map((s) => (s.value / total) * 100);
  const offsets = lens.reduce<number[]>(
    (arr, len, i) => (i === 0 ? [25] : [...arr, arr[i - 1] - len]),
    []
  );
  return (
    <div role="img" aria-label={ariaLabel} className="flex items-center gap-5">
      <svg viewBox="0 0 42 42" className="h-28 w-28 shrink-0 -rotate-0">
        <circle cx="21" cy="21" r={R} fill="none" stroke="#EEF2F6" strokeWidth="5.5" />
        {slices.map((s, i) => (
          <circle
            key={s.label}
            cx="21"
            cy="21"
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth="5.5"
            strokeDasharray={`${lens[i]} ${100 - lens[i]}`}
            strokeDashoffset={offsets[i]}
          >
            <title>{`${s.label}: ${s.value}`}</title>
          </circle>
        ))}
        <text x="21" y="20.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#172431">
          {total}
        </text>
        <text x="21" y="26.5" textAnchor="middle" fontSize="3.2" fill="#64748B">
          {centerLabel}
        </text>
      </svg>
      <ul className="flex flex-col gap-1.5 text-xs">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[var(--nl-ink)]">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="font-medium">{s.label}</span>
            <span className="font-mono tabular-nums text-[var(--nl-muted)]">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
