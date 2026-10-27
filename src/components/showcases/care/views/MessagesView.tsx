"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { dayDate, pick } from "@/lib/showcases/care/format";
import { useCare } from "@/lib/showcases/care/store";
import type { QuickReply } from "@/lib/showcases/care/types";
import type { LocalePair } from "@/lib/showcases/types";
import { CcMessageBubble } from "../primitives";

/**
 * View 5 — Messages: the scripted patient-care-team thread (no realtime
 * backend). The send box appends a patient message through the store; a
 * scripted structured reply is queued, shown as a typing state, then
 * delivered by the view (Blueprint B).
 */

/** Scripted answer for free-text sends — quick replies carry their own. */
const GENERIC_REPLY: LocalePair = {
  en: "Thanks for the message — Mai will follow up with you shortly.",
  vi: "Cảm ơn tin nhắn của bạn — Mai sẽ sớm phản hồi chi tiết.",
};

const REPLY_DELAY_MS = 1600;

function formatThreadDay(dayOffset: number, locale: "en" | "vi"): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Bangkok",
  }).format(dayDate(dayOffset));
}

function formatDayDivider(dayOffset: number, locale: "en" | "vi"): string {
  if (dayOffset === 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (dayOffset === -1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return formatThreadDay(dayOffset, locale);
}

export function MessagesView({ locale }: { locale: "en" | "vi" }) {
  const { data, pendingReply, sendMessage, deliverReply, teamMemberById } = useCare();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const inFlight = pendingReply !== null;

  // Deliver the queued scripted reply once the typing state has shown.
  useEffect(() => {
    if (!pendingReply) return;
    const timer = setTimeout(deliverReply, REPLY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pendingReply, deliverReply]);

  // Keep the latest message visible when the thread grows.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [data.thread.length, pendingReply]);

  const pendingSender = pendingReply ? teamMemberById(pendingReply.senderId) : undefined;

  const sendQuickReply = (quickReply: QuickReply) => {
    if (inFlight) return;
    sendMessage(pick(quickReply.label, locale), quickReply.reply);
  };

  const sendDraft = () => {
    if (inFlight) return;
    const text = draft.trim();
    if (!text) return;
    sendMessage(text, GENERIC_REPLY);
    setDraft("");
  };

  // Day dividers whenever the thread crosses a calendar day.
  const threadRows = data.thread.map((message, i) => ({
    message,
    showDay: i === 0 || data.thread[i - 1].dayOffset !== message.dayOffset,
  }));

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-[var(--cc-border)] bg-[var(--cc-surface)] px-4 py-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--cc-ink)]">
          {locale === "vi" ? "Đội ngũ chăm sóc" : "Care team"}
        </h2>
        <p className="mt-0.5 text-[11px] text-[var(--cc-secondary)]">
          {locale === "vi"
            ? "Mai Tran · Linh Pham · James Vo — trả lời trong giờ làm việc"
            : "Mai Tran · Linh Pham · James Vo — replies during clinic hours"}
        </p>
      </div>

      <div
        ref={listRef}
        data-cc-thread="true"
        className="flex max-h-[420px] min-h-[300px] flex-1 flex-col gap-3 overflow-y-auto p-4"
      >
        {threadRows.map(({ message, showDay }) => {
          const sender =
            message.direction === "care-team"
              ? teamMemberById(message.senderId ?? "")
              : undefined;
          return (
            <div key={message.id} className="flex flex-col gap-3">
              {showDay && (
                <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--cc-secondary)]">
                  {formatDayDivider(message.dayOffset, locale)}
                </p>
              )}
              <CcMessageBubble message={message} locale={locale} senderName={sender?.name} />
            </div>
          );
        })}
        {pendingReply && (
          <p
            role="status"
            className="flex items-center gap-1.5 pl-1 text-xs text-[var(--cc-secondary)]"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--cc-accent)]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--cc-accent)] [animation-delay:150ms]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--cc-accent)] [animation-delay:300ms]" />
            </span>
            {locale === "vi"
              ? `${pendingSender?.name ?? "Đội ngũ chăm sóc"} đang trả lời…`
              : `${pendingSender?.name ?? "Your care team"} is replying…`}
          </p>
        )}
      </div>

      <div className="border-t border-[var(--cc-border)] bg-[var(--cc-surface)] p-3">
        {!inFlight && (
          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
            role="group"
            aria-label={locale === "vi" ? "Trả lời nhanh" : "Quick replies"}
          >
            {data.quickReplies.map((quickReply) => (
              <button
                key={quickReply.id}
                type="button"
                onClick={() => sendQuickReply(quickReply)}
                className="min-h-[44px] shrink-0 whitespace-nowrap rounded-full border border-[var(--cc-accent)]/40 bg-[var(--cc-accent-soft)] px-3.5 text-[13px] font-semibold text-[var(--cc-accent)] transition-colors hover:bg-[var(--cc-accent)]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
              >
                {pick(quickReply.label, locale)}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="cc-message-input">
            {locale === "vi" ? "Nhắn tin cho đội ngũ chăm sóc" : "Message the care team"}
          </label>
          <input
            id="cc-message-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendDraft();
            }}
            disabled={inFlight}
            placeholder={
              inFlight
                ? locale === "vi"
                  ? "Đang chờ phản hồi…"
                  : "Waiting for a reply…"
                : locale === "vi"
                  ? "Nhắn tin cho đội ngũ chăm sóc"
                  : "Message the care team"
            }
            className="min-h-[44px] w-full rounded-full border border-[var(--cc-border)] bg-[var(--cc-surface)] px-4 text-sm text-[var(--cc-ink)] placeholder:text-[var(--cc-secondary)] focus:border-[var(--cc-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--cc-accent)]/20 disabled:cursor-not-allowed disabled:bg-[var(--cc-mist)]"
          />
          <button
            type="button"
            onClick={sendDraft}
            disabled={inFlight || draft.trim().length === 0}
            aria-label={locale === "vi" ? "Gửi tin nhắn" : "Send message"}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]",
              inFlight || draft.trim().length === 0
                ? "cursor-not-allowed bg-[var(--cc-mist)] text-[var(--cc-secondary)] opacity-60"
                : "bg-[var(--cc-accent)] text-white hover:bg-[var(--cc-accent-strong)]"
            )}
          >
            <Send size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
