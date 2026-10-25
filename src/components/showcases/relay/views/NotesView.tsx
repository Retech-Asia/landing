"use client";

import { useState } from "react";
import { Camera, ClipboardCheck } from "lucide-react";
import { useRelay } from "@/lib/showcases/relay/store";
import { formatMinutesAgo } from "@/lib/showcases/relay/format";
import { RfButton, RfChip, RfLabel, RfPanel } from "../primitives";

/**
 * Visit Notes (Wave 2D handoff §2D): per-visit notes and photo attachment
 * placeholders. Photos are simulated placeholders (no device camera); their
 * attach state is view-local only and never joins the offline queue.
 */

interface NotesCopy {
  jobPickerAria: string;
  photosTitle: string;
  photosEmpty: string;
  attachPlaceholder: string;
  removePlaceholder: string;
  newNoteTitle: string;
  noteAria: string;
  notePlaceholder: string;
  addNote: string;
  noteError: string;
  notesTitle: string;
  notesEmpty: string;
}

const COPY: Record<"en" | "vi", NotesCopy> = {
  en: {
    jobPickerAria: "Select work order",
    photosTitle: "Photos",
    photosEmpty: "No photo placeholders for this visit.",
    attachPlaceholder: "Attach placeholder",
    removePlaceholder: "Remove placeholder",
    newNoteTitle: "New note",
    noteAria: "Add a visit note",
    notePlaceholder: "What did you find on site?",
    addNote: "Add note",
    noteError: "Write a short note first.",
    notesTitle: "Notes",
    notesEmpty: "No notes yet for this visit.",
  },
  vi: {
    jobPickerAria: "Chọn phiếu công việc",
    photosTitle: "Ảnh",
    photosEmpty: "Chưa có ảnh đính kèm cho cuộc hẹn này.",
    attachPlaceholder: "Gắn ảnh",
    removePlaceholder: "Gỡ ảnh",
    newNoteTitle: "Ghi chú mới",
    noteAria: "Thêm ghi chú cuộc hẹn",
    notePlaceholder: "Bạn ghi nhận được gì tại hiện trường?",
    addNote: "Thêm ghi chú",
    noteError: "Hãy viết ngắn gọn trước.",
    notesTitle: "Ghi chú",
    notesEmpty: "Chưa có ghi chú cho cuộc hẹn này.",
  },
};

export function NotesView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, selectJob, addNote, jobById } = useRelay();
  const [draft, setDraft] = useState("");
  const [showError, setShowError] = useState(false);
  // View-local attach flags keyed by photo id. Fixtures are static, so a
  // signature over their seed values detects a reset: when it changes the
  // flags are dropped (derived at render — no effect needed).
  const fixtureSignature = state.jobs
    .map((j) => `${j.id}:${j.photos.map((p) => (p.attached ? 1 : 0)).join("")}`)
    .join("|");
  const [photoState, setPhotoState] = useState<{ sig: string; flags: Record<string, boolean> }>({
    sig: fixtureSignature,
    flags: {},
  });
  const photoAttached = photoState.sig === fixtureSignature ? photoState.flags : {};

  const job = jobById(state.selectedJobId) ?? state.jobs[0];

  const togglePhoto = (photoId: string, attached: boolean) =>
    setPhotoState((prev) => ({
      sig: fixtureSignature,
      flags: { ...(prev.sig === fixtureSignature ? prev.flags : {}), [photoId]: !attached },
    }));

  const submitNote = () => {
    const text = draft.trim();
    if (text.length === 0) {
      setShowError(true);
      return;
    }
    // The demo persona types the same string for both locales (user content).
    addNote(job.id, { en: text, vi: text });
    setDraft("");
    setShowError(false);
  };

  return (
    <div className="flex min-h-full flex-col gap-3 p-4">
      {/* Job selector — shares the store selection with the Job Details screen */}
      <RfLabel>{locale === "vi" ? "Công việc" : "Job"}</RfLabel>
      <div
        data-notes-job-picker="true"
        role="group"
        aria-label={t.jobPickerAria}
        className="-mx-4 flex min-h-[44px] items-center gap-2 overflow-x-auto px-4 pb-1"
      >
        {state.jobs.map((j) => {
          const selected = j.id === job.id;
          return (
            <button
              key={j.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectJob(j.id)}
              className="inline-flex shrink-0 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)]"
            >
              <RfChip tone={selected ? "accent" : "muted"}>{j.id}</RfChip>
            </button>
          );
        })}
      </div>

      {/* Photo placeholders (simulated — no camera involved) */}
      <RfPanel className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2 pb-1">
          <Camera size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--rf-teal)]" />
          <RfLabel>{t.photosTitle}</RfLabel>
        </div>
        {job.photos.length === 0 ? (
          <p className="py-2 text-sm text-[var(--rf-secondary)]">{t.photosEmpty}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-[var(--rf-border)]">
            {job.photos.map((photo) => {
              const attached = photoAttached[photo.id] ?? photo.attached;
              return (
                <li key={photo.id} data-photo-slot={photo.id} className="flex items-center gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--rf-teal-tint)] text-[var(--rf-teal)]"
                  >
                    <Camera size={16} strokeWidth={1.75} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="break-words text-sm font-semibold leading-snug text-[var(--rf-ink)]">
                      {photo.label[locale]}
                    </span>
                  </span>
                  <RfButton
                    variant="secondary"
                    data-photo-toggle={photo.id}
                    onClick={() => togglePhoto(photo.id, attached)}
                    className="shrink-0 whitespace-nowrap px-3 text-xs"
                  >
                    {attached ? t.removePlaceholder : t.attachPlaceholder}
                  </RfButton>
                </li>
              );
            })}
          </ul>
        )}
      </RfPanel>

      {/* Add-note form — inline validation only, no native bubbles */}
      <RfPanel className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 pb-1">
          <ClipboardCheck size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--rf-accent)]" />
          <RfLabel>{t.newNoteTitle}</RfLabel>
        </div>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submitNote();
          }}
          className="flex flex-col gap-2"
        >
          <textarea
            data-note-input="true"
            aria-label={t.noteAria}
            aria-describedby={showError ? "rf-note-error" : undefined}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (showError) setShowError(false);
            }}
            placeholder={t.notePlaceholder}
            rows={3}
            className="w-full resize-none rounded-2xl border border-[var(--rf-border)] bg-[var(--rf-canvas)] px-3.5 py-2.5 text-[15px] leading-relaxed text-[var(--rf-ink)] placeholder:text-[var(--rf-secondary)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--rf-accent)]"
          />
          {showError && (
            <p id="rf-note-error" data-note-error="true" className="text-xs font-semibold text-[var(--rf-accent)]">
              {t.noteError}
            </p>
          )}
          <RfButton type="submit" data-add-note="true" className="w-full">
            {t.addNote}
          </RfButton>
        </form>
      </RfPanel>

      {/* Notes list — newest first (the store prepends) */}
      <section className="flex flex-col gap-2">
        <RfLabel>{t.notesTitle}</RfLabel>
        {job.notes.length === 0 ? (
          <RfPanel className="px-4 py-6 text-center text-sm text-[var(--rf-secondary)]">{t.notesEmpty}</RfPanel>
        ) : (
          <ul className="flex flex-col gap-2">
            {job.notes.map((note) => (
              <li key={note.id} data-note-id={note.id}>
                <RfPanel className="flex flex-col gap-1 p-4">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-[var(--rf-ink)]">{note.author}</span>
                    <span className="shrink-0 text-[11px] font-medium text-[var(--rf-secondary)]">
                      {formatMinutesAgo(note.minutesAgo, locale)}
                    </span>
                  </span>
                  <p className="break-words text-sm leading-relaxed text-[var(--rf-secondary)]">
                    {note.text[locale]}
                  </p>
                </RfPanel>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
