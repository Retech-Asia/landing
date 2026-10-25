import type { DemoLocale } from "./types";

/** Meridian demo formatting helpers (USD figures, EN/VI labels). */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1000) return `$${Math.round(amount / 100) / 10}k`;
  return `$${amount}`;
}

export function formatQty(qty: number): string {
  return new Intl.NumberFormat("en-US").format(qty);
}

export function formatShortDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function dateDaysFromNow(days: number): Date {
  const base = new Date("2026-10-26T09:00:00");
  base.setDate(base.getDate() + days);
  return base;
}

export function formatDaysAgo(daysAgo: number, locale: DemoLocale): string {
  if (daysAgo <= 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (daysAgo === 1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return locale === "vi" ? `${daysAgo} ngày trước` : `${daysAgo}d ago`;
}

export function formatDueIn(days: number, locale: DemoLocale): string {
  if (days < 0) return locale === "vi" ? `Trễ ${Math.abs(days)} ngày` : `${Math.abs(days)}d late`;
  if (days === 0) return locale === "vi" ? "Hôm nay" : "Today";
  return locale === "vi" ? `Sau ${days} ngày` : `In ${days}d`;
}
