"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckSquare,
  Clock,
  History,
  ListTodo,
  Plus,
  StickyNote,
  Users,
} from "lucide-react";
import { useNorthline } from "../store";
import {
  Avatar,
  KV,
  Mono,
  NlButton,
  NlInput,
  Panel,
  PanelHeader,
  Pill,
  type StageTone,
} from "../primitives";
import { formatCurrency, formatDaysAgo, formatDue } from "@/lib/showcases/northline/format";
import type { Stage } from "@/lib/showcases/northline/types";

/**
 * View 4 — Customer 360° (handoff §3.4). One connected account record:
 * profile, related opportunities (read-only — the Pipeline view owns stage
 * moves), contacts, activity timeline, notes with a working composer, and
 * upcoming tasks that reference the account or its opportunities.
 */

const COPY = {
  en: {
    title: "Customer 360°",
    summary:
      "Explore one connected customer record containing contacts, deals, notes, tasks, and communication history.",
    listTitle: "Customers",
    back: "All customers",
    accountInfo: "Account information",
    industry: "Industry",
    size: "Size",
    location: "Location",
    website: "Website",
    owner: "Owner",
    status: "Status",
    statusLabels: {
      active: "Active",
      onboarding: "Onboarding",
    } as Record<string, string>,
    statusTones: {
      active: "teal",
      onboarding: "amber",
    } as Record<string, StageTone>,
    opportunities: "Related opportunities",
    noOpportunities: "No open opportunities for this account.",
    contacts: "Contacts",
    primary: "Primary",
    noContacts: "No contacts linked to this account.",
    timeline: "Activity timeline",
    noTimeline: "No activity recorded yet for this account.",
    notes: "Notes",
    noteLabel: "New note",
    notePlaceholder: "Add a note for this account…",
    addNote: "Add note",
    noNotes: "No notes yet — start the record with an observation.",
    tasks: "Upcoming tasks",
    noTasks: "No open tasks for this account.",
    stageLabels: {
      prospecting: "Prospecting",
      qualified: "Qualified",
      proposal: "Proposal",
      negotiation: "Negotiation",
      won: "Won",
    } as Record<Stage, string>,
    stageTones: {
      prospecting: "neutral",
      qualified: "teal",
      proposal: "blue",
      negotiation: "amber",
      won: "green",
    } as Record<Stage, StageTone>,
    activityTypes: {
      call: "Call",
      email: "Email",
      meeting: "Meeting",
      note: "Note",
      stage: "Stage change",
    } as Record<string, string>,
  },
  vi: {
    title: "Hồ sơ khách hàng 360°",
    summary:
      "Xem hồ sơ khách hàng thống nhất gồm liên hệ, cơ hội kinh doanh, ghi chú, công việc và lịch sử tương tác.",
    listTitle: "Khách hàng",
    back: "Tất cả khách hàng",
    accountInfo: "Thông tin tài khoản",
    industry: "Ngành",
    size: "Quy mô",
    location: "Địa điểm",
    website: "Website",
    owner: "Người phụ trách",
    status: "Trạng thái",
    statusLabels: {
      active: "Đang hoạt động",
      onboarding: "Đang triển khai",
    } as Record<string, string>,
    statusTones: {
      active: "teal",
      onboarding: "amber",
    } as Record<string, StageTone>,
    opportunities: "Cơ hội liên quan",
    noOpportunities: "Chưa có cơ hội nào cho tài khoản này.",
    contacts: "Liên hệ",
    primary: "Chính",
    noContacts: "Chưa có liên hệ nào cho tài khoản này.",
    timeline: "Dòng thời gian hoạt động",
    noTimeline: "Chưa có hoạt động nào cho tài khoản này.",
    notes: "Ghi chú",
    noteLabel: "Ghi chú mới",
    notePlaceholder: "Thêm ghi chú cho tài khoản này…",
    addNote: "Thêm ghi chú",
    noNotes: "Chưa có ghi chú — hãy bắt đầu hồ sơ bằng một nhận định.",
    tasks: "Công việc sắp tới",
    noTasks: "Không có công việc nào cho tài khoản này.",
    stageLabels: {
      prospecting: "Tiếp cận",
      qualified: "Đủ điều kiện",
      proposal: "Đề xuất",
      negotiation: "Đàm phán",
      won: "Đã chốt",
    } as Record<Stage, string>,
    stageTones: {
      prospecting: "neutral",
      qualified: "teal",
      proposal: "blue",
      negotiation: "amber",
      won: "green",
    } as Record<Stage, StageTone>,
    activityTypes: {
      call: "Cuộc gọi",
      email: "Email",
      meeting: "Cuộc họp",
      note: "Ghi chú",
      stage: "Chuyển giai đoạn",
    } as Record<string, string>,
  },
};

export function CustomersView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, teamById, addNote } = useNorthline();

  const [selectedId, setSelectedId] = useState(data.accounts[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noteBody, setNoteBody] = useState("");

  const selected = data.accounts.find((a) => a.id === selectedId);

  const selectAccount = (id: string) => {
    setSelectedId(id);
    setNoteBody("");
    setMobileOpen(true);
  };

  // Opportunity ids belonging to the selected account (task/activity linkage).
  const oppIds = useMemo(
    () =>
      new Set(
        selected
          ? data.opportunities.filter((o) => o.accountId === selected.id).map((o) => o.id)
          : []
      ),
    [data.opportunities, selected]
  );

  const accountOpps = useMemo(
    () => (selected ? data.opportunities.filter((o) => o.accountId === selected.id) : []),
    [data.opportunities, selected]
  );

  const accountContacts = useMemo(
    () => (selected ? data.contacts.filter((c) => c.accountId === selected.id) : []),
    [data.contacts, selected]
  );

  // Tasks linked to the account directly or through one of its opportunities.
  const accountTasks = useMemo(
    () =>
      data.tasks
        .filter(
          (tk) =>
            !tk.done &&
            ((tk.refType === "account" && tk.refId === selectedId) ||
              (tk.refType === "opportunity" && oppIds.has(tk.refId)))
        )
        .sort((a, b) => a.dueInDays - b.dueInDays),
    [data.tasks, selectedId, oppIds]
  );

  // Same linkage for the chronological timeline, newest first.
  const accountTimeline = useMemo(
    () =>
      data.activities
        .filter(
          (a) =>
            (a.refType === "account" && a.refId === selectedId) ||
            (a.refType === "opportunity" && oppIds.has(a.refId))
        )
        .sort((a, b) => a.daysAgo - b.daysAgo),
    [data.activities, selectedId, oppIds]
  );

  const accountNotes = useMemo(
    () =>
      selected
        ? data.notes
            .filter((n) => n.accountId === selected.id)
            .sort((a, b) => a.daysAgo - b.daysAgo)
        : [],
    [data.notes, selected]
  );

  const submitNote = (e: FormEvent) => {
    e.preventDefault();
    if (!selected || !noteBody.trim()) return;
    addNote(selected.id, noteBody);
    setNoteBody("");
  };

  const owner = selected ? teamById(selected.ownerId) : undefined;

  return (
    <div className="flex flex-col gap-4">
      {/* View header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--nl-muted)]">{t.summary}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] lg:items-start">
        {/* Customer list — always visible on desktop, stacked on mobile */}
        <Panel className={mobileOpen ? "hidden lg:block" : "block"}>
          <PanelHeader title={t.listTitle} />
          <ul className="divide-y divide-[var(--nl-border)]">
            {data.accounts.map((acc) => {
              const isSelected = acc.id === selectedId;
              const accOwner = teamById(acc.ownerId);
              return (
                <li key={acc.id}>
                  <button
                    type="button"
                    onClick={() => selectAccount(acc.id)}
                    aria-current={isSelected ? "true" : undefined}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--nl-accent)] ${
                      isSelected ? "bg-[#EEF2F6]" : "hover:bg-[#F0F4F4]"
                    }`}
                  >
                    {accOwner && <Avatar initials={accOwner.initials} hue={accOwner.hue} size={28} />}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{acc.company}</span>
                      <span className="block truncate text-xs text-[var(--nl-muted)]">
                        {acc.industry} · {acc.location}
                      </span>
                    </span>
                    <Pill tone={t.statusTones[acc.status]}>{t.statusLabels[acc.status]}</Pill>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* Selected customer workspace */}
        {selected && (
          <div className={mobileOpen ? "flex flex-col gap-4" : "hidden lg:flex flex-col gap-4"}>
            <NlButton
              variant="ghost"
              onClick={() => setMobileOpen(false)}
              className="self-start lg:hidden"
            >
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
              {t.back}
            </NlButton>

            {/* Profile header */}
            <Panel>
              <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-4">
                <div className="flex items-center gap-3">
                  {owner && <Avatar initials={owner.initials} hue={owner.hue} size={40} />}
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold tracking-tight">
                      {selected.company}
                    </h3>
                    <p className="truncate text-xs text-[var(--nl-muted)]">
                      {selected.industry} · {selected.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill tone={t.statusTones[selected.status]}>
                    {t.statusLabels[selected.status]}
                  </Pill>
                  {owner && <span className="text-xs text-[var(--nl-muted)]">{owner.name}</span>}
                </div>
              </div>
            </Panel>

            {/* Account information + contacts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Panel>
                <PanelHeader
                  title={t.accountInfo}
                  action={<Building2 size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
                />
                <dl className="px-4 py-1">
                  <KV label={t.industry}>{selected.industry}</KV>
                  <KV label={t.size}>{selected.size}</KV>
                  <KV label={t.location}>{selected.location}</KV>
                  <KV label={t.website}>{selected.website}</KV>
                  <KV label={t.owner}>{owner ? owner.name : "—"}</KV>
                  <KV label={t.status}>
                    <Pill tone={t.statusTones[selected.status]}>
                      {t.statusLabels[selected.status]}
                    </Pill>
                  </KV>
                </dl>
              </Panel>

              <Panel>
                <PanelHeader
                  title={t.contacts}
                  action={<Users size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
                />
                <ul className="divide-y divide-[var(--nl-border)]">
                  {accountContacts.map((c) => (
                    <li key={c.id} className="px-4 py-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="truncate text-xs text-[var(--nl-muted)]">{c.title}</p>
                        </div>
                        {c.primary && <Pill tone="teal">{t.primary}</Pill>}
                      </div>
                      <p className="mt-1 truncate text-xs text-[var(--nl-muted)]">{c.email}</p>
                    </li>
                  ))}
                  {accountContacts.length === 0 && (
                    <li className="px-4 py-6 text-center text-sm text-[var(--nl-muted)]">
                      {t.noContacts}
                    </li>
                  )}
                </ul>
              </Panel>
            </div>

            {/* Opportunities (read-only) + tasks */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Panel>
                <PanelHeader
                  title={t.opportunities}
                  action={<Briefcase size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
                />
                <ul className="divide-y divide-[var(--nl-border)]">
                  {accountOpps.map((o) => (
                    <li key={o.id} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{o.title}</p>
                          <p className="truncate text-xs text-[var(--nl-muted)]">{o.nextAction}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <Mono className="text-xs font-semibold">{formatCurrency(o.value)}</Mono>
                          <Pill tone={t.stageTones[o.stage]}>{t.stageLabels[o.stage]}</Pill>
                        </div>
                      </div>
                    </li>
                  ))}
                  {accountOpps.length === 0 && (
                    <li className="px-4 py-6 text-center text-sm text-[var(--nl-muted)]">
                      {t.noOpportunities}
                    </li>
                  )}
                </ul>
              </Panel>

              <Panel>
                <PanelHeader
                  title={t.tasks}
                  action={<ListTodo size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
                />
                <ul className="divide-y divide-[var(--nl-border)]">
                  {accountTasks.map((tk) => {
                    const taskOwner = teamById(tk.ownerId);
                    return (
                      <li key={tk.id} className="flex items-center gap-3 px-4 py-2.5">
                        <CheckSquare size={15} strokeWidth={1.75} className="shrink-0 text-[var(--nl-muted)]" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate text-sm">{tk.title}</span>
                        <Pill tone={tk.dueInDays < 0 ? "danger" : tk.dueInDays === 0 ? "amber" : "muted"}>
                          {formatDue(tk.dueInDays, locale)}
                        </Pill>
                        {taskOwner && <Avatar initials={taskOwner.initials} hue={taskOwner.hue} size={22} />}
                      </li>
                    );
                  })}
                  {accountTasks.length === 0 && (
                    <li className="px-4 py-6 text-center text-sm text-[var(--nl-muted)]">
                      {t.noTasks}
                    </li>
                  )}
                </ul>
              </Panel>
            </div>

            {/* Chronological activity timeline */}
            <Panel>
              <PanelHeader
                title={t.timeline}
                action={<History size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
              />
              <ol className="divide-y divide-[var(--nl-border)]">
                {accountTimeline.map((a) => (
                  <li key={a.id} className="flex gap-2.5 px-4 py-2.5">
                    <Clock size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--nl-muted)]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{a.summary}</p>
                      <p className="mt-0.5 text-xs text-[var(--nl-muted)]">
                        {t.activityTypes[a.type]} · {formatDaysAgo(a.daysAgo, locale)}
                      </p>
                    </div>
                  </li>
                ))}
                {accountTimeline.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-[var(--nl-muted)]">
                    {t.noTimeline}
                  </li>
                )}
              </ol>
            </Panel>

            {/* Notes: seeded records + working composer */}
            <Panel>
              <PanelHeader
                title={t.notes}
                action={<StickyNote size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
              />
              <div className="px-4 py-4">
                <form onSubmit={submitNote} className="flex flex-col gap-2 sm:flex-row">
                  <label htmlFor="nl-note-input" className="sr-only">
                    {t.noteLabel}
                  </label>
                  <NlInput
                    id="nl-note-input"
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder={t.notePlaceholder}
                  />
                  <NlButton
                    type="submit"
                    variant="primary"
                    disabled={!noteBody.trim()}
                    className="shrink-0 sm:w-auto"
                  >
                    <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
                    {t.addNote}
                  </NlButton>
                </form>
                <ul className="mt-2 divide-y divide-[var(--nl-border)]">
                  {accountNotes.map((n) => {
                    const author = teamById(n.authorId);
                    return (
                      <li key={n.id} className="flex gap-2.5 py-2.5">
                        {author && <Avatar initials={author.initials} hue={author.hue} size={24} />}
                        <div className="min-w-0">
                          <p className="text-sm leading-snug">{n.body}</p>
                          <p className="mt-0.5 text-xs text-[var(--nl-muted)]">
                            {author ? author.name : "—"} · {formatDaysAgo(n.daysAgo, locale)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                  {accountNotes.length === 0 && (
                    <li className="py-4 text-center text-sm text-[var(--nl-muted)]">{t.noNotes}</li>
                  )}
                </ul>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
