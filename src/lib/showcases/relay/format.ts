import { RELAY_NOW } from "./types";

/**
 * Deterministic time helpers for Relay Field — everything derives from the
 * fixed RELAY_NOW anchor so renders are stable across loads.
 */

const NOW = new Date(RELAY_NOW);

/** "9:00 AM" style window label (EN) / "9:00" (VI uses the same digits). */
export function formatWindow(startMinutes: number, endMinutes: number, locale: "en" | "vi"): string {
  return `${formatTime(startMinutes, locale)} – ${formatTime(endMinutes, locale)}`;
}

export function formatTime(minutes: number, locale: "en" | "vi"): string {
  const h24 = Math.floor(minutes / 60);
  const mm = String(minutes % 60).padStart(2, "0");
  if (locale === "vi") return `${h24}:${mm}`;
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mm} ${period}`;
}

/** Status pill label. */
export function statusLabel(status: "scheduled" | "in-progress" | "complete", locale: "en" | "vi"): string {
  if (locale === "vi") {
    return status === "scheduled" ? "Đã lên lịch" : status === "in-progress" ? "Đang thực hiện" : "Hoàn tất";
  }
  return status === "scheduled" ? "Scheduled" : status === "in-progress" ? "In progress" : "Complete";
}

/** "Updated 5 min ago" style stamp for notes and sync events. */
export function formatMinutesAgo(minutes: number, locale: "en" | "vi"): string {
  if (minutes <= 0) return locale === "vi" ? "Vừa xong" : "Just now";
  if (minutes < 60) return locale === "vi" ? `${minutes} phút trước` : `${minutes} min ago`;
  const h = Math.floor(minutes / 60);
  return locale === "vi" ? `${h} giờ trước` : `${h} h ago`;
}

/** Long date for the app header, e.g. "Monday, 26 October 2026". */
export function formatToday(locale: "en" | "vi"): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(NOW);
}

/** Fixed status-bar clock inside the phone frame. */
export function statusBarClock(locale: "en" | "vi"): string {
  return formatTime(NOW.getHours() * 60 + NOW.getMinutes(), locale);
}
