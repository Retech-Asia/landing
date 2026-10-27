import type {
  AppointmentState,
  DemoLocale,
  LeadSource,
  LeadStage,
  Occupancy,
  OfferState,
  PropertyStatus,
  PropertyType,
} from "./types";

/** Property Studio demo formatting helpers (USD figures, EN/VI labels). */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1000000) return `$${Math.round(amount / 10000) / 100}M`;
  if (amount >= 1000) return `$${Math.round(amount / 100) / 10}k`;
  return `$${amount}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatArea(sqft: number): string {
  return formatNumber(sqft);
}

export function dateDaysFromNow(days: number): Date {
  const base = new Date("2026-10-27T09:30:00");
  base.setDate(base.getDate() + days);
  return base;
}

export function formatShortDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDaysAgo(daysAgo: number, locale: DemoLocale): string {
  if (daysAgo <= 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (daysAgo === 1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return locale === "vi" ? `${daysAgo} ngày trước` : `${daysAgo}d ago`;
}

/** Appointment clock time: fixed demo clock shifted by a minute offset. */
export function formatTimeFromOffset(minutes: number, locale: DemoLocale): string {
  const time = new Date("2026-10-27T09:30:00");
  time.setMinutes(time.getMinutes() + minutes);
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(time);
}

/** Localized enum labels shared by all five views. */

export function propertyStatusLabel(status: PropertyStatus, locale: DemoLocale): string {
  const labels: Record<PropertyStatus, [string, string]> = {
    available: ["Available", "Có sẵn"],
    pending: ["Pending", "Đang xử lý"],
    offered: ["Offered", "Đang đề xuất"],
    closed: ["Closed", "Đã chốt"],
  };
  return labels[status][locale === "vi" ? 1 : 0];
}

export function propertyTypeLabel(type: PropertyType, locale: DemoLocale): string {
  const labels: Record<PropertyType, [string, string]> = {
    house: ["House", "Nhà"],
    condo: ["Condo", "Căn hộ"],
    townhouse: ["Townhouse", "Nhà liền kề"],
    duplex: ["Duplex", "Nhà kép"],
  };
  return labels[type][locale === "vi" ? 1 : 0];
}

export function occupancyLabel(occupancy: Occupancy, locale: DemoLocale): string {
  const labels: Record<Occupancy, [string, string]> = {
    vacant: ["Vacant", "Trống"],
    owner_occupied: ["Owner occupied", "Chủ đang ở"],
    tenant_occupied: ["Tenant occupied", "Có khách thuê"],
  };
  return labels[occupancy][locale === "vi" ? 1 : 0];
}

export function leadStageLabel(stage: LeadStage, locale: DemoLocale): string {
  const labels: Record<LeadStage, [string, string]> = {
    new: ["New", "Mới"],
    qualifying: ["Qualifying", "Sàng lọc"],
    viewing: ["Viewing", "Xem nhà"],
    offer: ["Offer", "Đề xuất"],
    closing: ["Closing", "Chốt"],
  };
  return labels[stage][locale === "vi" ? 1 : 0];
}

export function leadSourceLabel(source: LeadSource, locale: DemoLocale): string {
  const labels: Record<LeadSource, [string, string]> = {
    website: ["Website", "Trang web"],
    referral: ["Referral", "Giới thiệu"],
    open_house: ["Open house", "Open house"],
    portal: ["Portal", "Cổng tin"],
    sign_call: ["Sign call", "Gọi từ biển hiệu"],
    social: ["Social", "Mạng xã hội"],
  };
  return labels[source][locale === "vi" ? 1 : 0];
}

export function offerStatusLabel(state: OfferState, locale: DemoLocale): string {
  const labels: Record<OfferState, [string, string]> = {
    draft: ["Draft", "Nháp"],
    sent: ["Sent", "Đã gửi"],
    accepted: ["Accepted", "Chấp nhận"],
    declined: ["Declined", "Từ chối"],
  };
  return labels[state][locale === "vi" ? 1 : 0];
}

export function appointmentStatusLabel(state: AppointmentState, locale: DemoLocale): string {
  const labels: Record<AppointmentState, [string, string]> = {
    scheduled: ["Scheduled", "Đã đặt"],
    checked_in: ["Checked in", "Đã xác nhận"],
    completed: ["Completed", "Hoàn tất"],
    no_show: ["No show", "Không đến"],
  };
  return labels[state][locale === "vi" ? 1 : 0];
}
