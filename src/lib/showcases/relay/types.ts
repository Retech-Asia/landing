import type { LocalePair } from "@/lib/showcases/types";

/**
 * Relay Field data model (Wave 2D handoff §2D): mobile-first field-service
 * concept. All data is synthetic and deterministic — no GPS, camera or
 * network-backed offline behaviour; every simulated surface is labeled.
 */

/** Fixed demo clock: mid-morning during the seeded workday. */
export const RELAY_NOW = "2026-10-26T09:15:00+07:00";

export type JobStatus = "scheduled" | "in-progress" | "complete";

export interface RelayTechnician {
  id: string;
  name: string;
  role: LocalePair;
}

export interface ChecklistItem {
  id: string;
  label: LocalePair;
  done: boolean;
}

/** Simulated photo attachment placeholder (handoff: no device camera). */
export interface PhotoSlot {
  id: string;
  label: LocalePair;
  attached: boolean;
}

export interface VisitNoteEntry {
  id: string;
  author: string;
  minutesAgo: number;
  text: LocalePair;
}

export interface RelayJob {
  id: string;
  customer: string;
  site: string;
  address: string;
  task: LocalePair;
  techId: string;
  /** Minutes from midnight on the demo day. */
  startMinutes: number;
  endMinutes: number;
  status: JobStatus;
  checklist: ChecklistItem[];
  notes: VisitNoteEntry[];
  photos: PhotoSlot[];
}

export interface SyncAction {
  id: string;
  kind: "checklist" | "note" | "status";
  label: LocalePair;
  minutesAgo: number;
}

export interface RelayData {
  techs: RelayTechnician[];
  jobs: RelayJob[];
  syncQueue: SyncAction[];
  /** Minutes since the last simulated sync (null = never in this session). */
  lastSyncedMinutesAgo: number;
}

export interface RelayState extends RelayData {
  /** Job opened from Today; defaults to the flagship RF-2408. */
  selectedJobId: string;
}
