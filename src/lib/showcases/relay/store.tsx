"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildRelaySeed } from "./fixtures";
import type { JobStatus, RelayData, RelayState } from "./types";

/**
 * Shared demo state for the four Relay Field screens (handoff §2D). In-memory
 * only: checklist ticks, notes and status changes are simulated on local
 * synthetic data and each action joins the offline queue; "sync" is a clearly
 * labeled simulation that clears the queue. Reload returns to seed. No GPS,
 * device camera, background sync or network call exists in this demo.
 */

export type RelayAction =
  | { type: "select-job"; jobId: string }
  | { type: "toggle-checklist"; jobId: string; itemId: string }
  | { type: "add-note"; jobId: string; text: LocaleText }
  | { type: "set-status"; jobId: string; status: JobStatus }
  | { type: "run-sync" }
  | { type: "reset" };

type LocaleText = { en: string; vi: string };

let actionCounter = 0;
function nextId(prefix: string): string {
  actionCounter += 1;
  return `${prefix}-local-${actionCounter}`;
}

function queuedLabel(jobId: string, kind: "checklist" | "note" | "status", detail: LocaleText): LocaleText {
  const kindLabel = {
    en: kind === "checklist" ? "Checklist update" : kind === "note" ? "Visit note" : "Status change",
    vi: kind === "checklist" ? "Cập nhật danh sách kiểm tra" : kind === "note" ? "Ghi chú cuộc hẹn" : "Thay đổi trạng thái",
  };
  return {
    en: `${kindLabel.en} · ${jobId} · ${detail.en}`,
    vi: `${kindLabel.vi} · ${jobId} · ${detail.vi}`,
  };
}

function reducer(state: RelayState, action: RelayAction): RelayState {
  switch (action.type) {
    case "select-job":
      if (!state.jobs.some((j) => j.id === action.jobId)) return state;
      return { ...state, selectedJobId: action.jobId };
    case "toggle-checklist": {
      let detail: LocaleText = { en: "", vi: "" };
      const jobs = state.jobs.map((job) => {
        if (job.id !== action.jobId) return job;
        const checklist = job.checklist.map((item) => {
          if (item.id !== action.itemId) return item;
          const done = !item.done;
          detail = {
            en: `${item.label.en} — marked ${done ? "done" : "not done"}`,
            vi: `${item.label.vi} — đánh dấu ${done ? "hoàn thành" : "chưa hoàn thành"}`,
          };
          return { ...item, done };
        });
        return { ...job, checklist };
      });
      if (!detail.en) return state;
      return {
        ...state,
        jobs,
        syncQueue: [
          { id: nextId("sync"), kind: "checklist", label: queuedLabel(action.jobId, "checklist", detail), minutesAgo: 0 },
          ...state.syncQueue,
        ],
      };
    }
    case "add-note": {
      const job = state.jobs.find((j) => j.id === action.jobId);
      if (!job) return state;
      const noteId = nextId("note");
      const jobs = state.jobs.map((j) =>
        j.id === action.jobId
          ? {
              ...j,
              notes: [
                { id: noteId, author: "Taylor Lee", minutesAgo: 0, text: action.text },
                ...j.notes,
              ],
            }
          : j
      );
      return {
        ...state,
        jobs,
        syncQueue: [
          { id: nextId("sync"), kind: "note", label: queuedLabel(action.jobId, "note", action.text), minutesAgo: 0 },
          ...state.syncQueue,
        ],
      };
    }
    case "set-status": {
      const job = state.jobs.find((j) => j.id === action.jobId);
      if (!job || job.status === action.status) return state;
      const jobs = state.jobs.map((j) => (j.id === action.jobId ? { ...j, status: action.status } : j));
      const statusText = {
        en: action.status === "complete" ? "Marked complete" : action.status === "in-progress" ? "Marked in progress" : "Marked scheduled",
        vi: action.status === "complete" ? "Đánh dấu hoàn tất" : action.status === "in-progress" ? "Đánh dấu đang thực hiện" : "Đánh dấu đã lên lịch",
      };
      return {
        ...state,
        jobs,
        syncQueue: [
          { id: nextId("sync"), kind: "status", label: queuedLabel(action.jobId, "status", statusText), minutesAgo: 0 },
          ...state.syncQueue,
        ],
      };
    }
    case "run-sync":
      // Simulated sync: the queue clears and the stamp resets. Nothing leaves
      // the device — this demonstrates the offline-first interaction only.
      return { ...state, syncQueue: [], lastSyncedMinutesAgo: 0 };
    case "reset":
      return buildRelayState();
  }
}

function buildRelayState(): RelayState {
  // The flagship handoff work order opens by default.
  return { ...buildRelaySeed(), selectedJobId: "RF-2408" };
}

export interface RelayStore {
  state: RelayState;
  selectJob: (jobId: string) => void;
  toggleChecklist: (jobId: string, itemId: string) => void;
  addNote: (jobId: string, text: LocaleText) => void;
  setStatus: (jobId: string, status: JobStatus) => void;
  runSync: () => void;
  reset: () => void;
  techById: (id: string) => RelayData["techs"][number] | undefined;
  jobById: (id: string) => RelayData["jobs"][number] | undefined;
}

const RelayContext = createContext<RelayStore | null>(null);

export function RelayProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildRelayState);

  const selectJob = useCallback((jobId: string) => dispatch({ type: "select-job", jobId }), []);
  const toggleChecklist = useCallback(
    (jobId: string, itemId: string) => dispatch({ type: "toggle-checklist", jobId, itemId }),
    []
  );
  const addNote = useCallback((jobId: string, text: LocaleText) => dispatch({ type: "add-note", jobId, text }), []);
  const setStatus = useCallback((jobId: string, status: JobStatus) => dispatch({ type: "set-status", jobId, status }), []);
  const runSync = useCallback(() => dispatch({ type: "run-sync" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const techById = useCallback((id: string) => state.techs.find((t) => t.id === id), [state.techs]);
  const jobById = useCallback((id: string) => state.jobs.find((j) => j.id === id), [state.jobs]);

  const value = useMemo(
    () => ({ state, selectJob, toggleChecklist, addNote, setStatus, runSync, reset, techById, jobById }),
    [state, selectJob, toggleChecklist, addNote, setStatus, runSync, reset, techById, jobById]
  );

  return <RelayContext.Provider value={value}>{children}</RelayContext.Provider>;
}

export function useRelay(): RelayStore {
  const ctx = useContext(RelayContext);
  if (!ctx) throw new Error("useRelay must be used inside RelayProvider");
  return ctx;
}
