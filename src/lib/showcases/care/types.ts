import type { LocalePair } from "@/lib/showcases/types";

/**
 * Care Companion — healthcare patient-companion concept demo data contracts
 * (Blueprint B, docs/chatgpt-handoff-concept-blueprints-2026-10-26.md §2).
 * One primary patient persona plus a small roster for the clinic side; care
 * plan, medication schedule, appointments and a scripted message thread.
 * Every figure derives from fixtures; nothing is hardcoded in views. All
 * patient data is fictional and deliberately everyday (walking, hydration,
 * medication reminders, follow-up visits) — no clinical efficacy or outcome
 * claims anywhere in the dataset.
 */

/** Demo clock anchor — fixed for hydration-safe, test-stable rendering. */
export const CARE_NOW = new Date("2026-10-27T07:40:00");

export type DemoLocale = "en" | "vi";

export interface CareTeamMember {
  id: string;
  name: string;
  role: LocalePair;
  initials: string;
  hue: number;
}

/** The one primary patient persona (phone-side views are theirs). */
export interface PatientPersona {
  id: string;
  name: string;
  initials: string;
  hue: number;
  /** Benign ongoing-care framing only — no diagnosis detail. */
  context: LocalePair;
  memberSince: LocalePair;
}

export type TaskKind = "movement" | "habit" | "wellbeing" | "learning";

export interface CarePlanTask {
  id: string;
  title: LocalePair;
  detail: LocalePair;
  kind: TaskKind;
  /** Planned check-ins per week. */
  perWeek: number;
  /** Check-ins already logged earlier this week (before today). */
  weekBase: number;
  checkedToday: boolean;
}

export interface CarePlan {
  id: string;
  name: LocalePair;
  focus: LocalePair;
  weekOf: number;
  totalWeeks: number;
  tasks: CarePlanTask[];
  /** Task check-ins per day for the six days before today, oldest first. */
  weekHistory: number[];
}

export interface MedicationDose {
  id: string;
  /** 24h "HH:MM" — deterministic, formatted per locale at render time. */
  time: string;
  taken: boolean;
}

export interface Medication {
  id: string;
  /** Generic descriptive names only — no drug branding. */
  name: string;
  dosage: LocalePair;
  instruction: LocalePair;
  doses: MedicationDose[];
  /** Full days with every dose taken, immediately before today. */
  streakBase: number;
  /** Doses taken per day over the six days before today, oldest first. */
  weekHistory: number[];
}

export type AppointmentMode = "in-person" | "video";

export interface PrepStep {
  id: string;
  label: LocalePair;
  done: boolean;
}

export interface RescheduleRequest {
  /** Proposed alternative, relative to CARE_NOW. */
  dayOffset: number;
  time: string;
  note: LocalePair;
}

export interface Appointment {
  id: string;
  /** 0 = today, positive = upcoming, negative = past. */
  dayOffset: number;
  /** 24h "HH:MM". */
  time: string;
  kind: LocalePair;
  mode: AppointmentMode;
  careTeamId: string;
  location: LocalePair;
  prep: PrepStep[];
  rescheduleRequest: RescheduleRequest | null;
}

export type MessageDirection = "care-team" | "patient";

export interface ThreadMessage {
  id: string;
  direction: MessageDirection;
  /** Care-team sender for incoming messages. */
  senderId?: string;
  body: LocalePair;
  dayOffset: number;
  /** 24h "HH:MM". */
  time: string;
}

export interface QuickReply {
  id: string;
  label: LocalePair;
  /** Scripted care-team answer sent back when the patient taps this chip. */
  reply: LocalePair;
}

export interface RosterPatient {
  id: string;
  name: string;
  initials: string;
  hue: number;
  program: LocalePair;
  /** The primary persona also appears on the clinic roster. */
  isPrimary?: boolean;
  tasksDone: number;
  tasksTotal: number;
  nextVisitDayOffset: number;
  nextVisitTime: string;
}

export interface ScheduleSlot {
  id: string;
  /** 24h "HH:MM". */
  time: string;
  patientId: string;
  kind: LocalePair;
  mode: AppointmentMode;
  careTeamId: string;
}

export interface CarePlanTemplate {
  id: string;
  name: LocalePair;
  focus: LocalePair;
  tasks: number;
  weeks: number;
  enrolled: number;
}

export type ActivityKind = "task" | "medication" | "reschedule" | "message";

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  /** Bilingual at write time so views never re-derive copy. */
  summary: LocalePair;
}

export interface CareData {
  persona: PatientPersona;
  team: CareTeamMember[];
  plan: CarePlan;
  medications: Medication[];
  appointments: Appointment[];
  thread: ThreadMessage[];
  quickReplies: QuickReply[];
  roster: RosterPatient[];
  schedule: ScheduleSlot[];
  templates: CarePlanTemplate[];
  activity: ActivityEntry[];
}

/** Scripted reply queued after a patient message, delivered by the view. */
export interface PendingReply {
  patientMessageId: string;
  senderId: string;
  body: LocalePair;
}

export interface CareState {
  data: CareData;
  pendingReply: PendingReply | null;
}
