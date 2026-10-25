import type { Locale } from "@/i18n/routing";

/**
 * Northline CRM — synthetic domain types (Wave 1C creative handoff, 2026-10-25).
 *
 * All data is fictional sample data for a concept demonstration. Dates are
 * expressed relative to DEMO_NOW so fixtures stay deterministic (stable for
 * tests, hydration-safe) while rendering as natural relative dates.
 */

/** Fixed in-demo "today" — Monday 09:00, matches the approved dashboard copy. */
export const DEMO_NOW = new Date("2026-10-26T09:00:00");

export type Locale2 = Locale;

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  /** Deterministic avatar hue (0-360). */
  hue: number;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified";
export type LeadSource =
  | "website"
  | "referral"
  | "linkedin"
  | "event"
  | "outreach"
  | "partner";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  ownerId: string;
  /** USD estimate for the potential work. */
  estimatedValue: number;
  /** Days before DEMO_NOW of the most recent touchpoint. */
  lastActivityDaysAgo: number;
  nextStep: string;
  /** Set when the lead has an active opportunity in the pipeline. */
  opportunityId?: string;
}

export type Stage = "prospecting" | "qualified" | "proposal" | "negotiation" | "won";
export const STAGE_ORDER: Stage[] = [
  "prospecting",
  "qualified",
  "proposal",
  "negotiation",
  "won",
];

export interface Opportunity {
  id: string;
  title: string;
  accountId: string;
  /** USD. The eight handoff opportunities sum to $346,000. */
  value: number;
  stage: Stage;
  ownerId: string;
  nextAction: string;
}

export interface Account {
  id: string;
  company: string;
  industry: string;
  /** e.g. "50-200 staff". */
  size: string;
  location: string;
  ownerId: string;
  status: "active" | "onboarding";
  website: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  accountId: string;
  primary: boolean;
}

export type ActivityType = "call" | "email" | "meeting" | "note" | "stage";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  refType: "lead" | "account" | "opportunity";
  refId: string;
  summary: string;
  /** Days before DEMO_NOW (can be fractional). */
  daysAgo: number;
}

export interface Task {
  id: string;
  title: string;
  /** Days from DEMO_NOW; negative = overdue. */
  dueInDays: number;
  refType: "lead" | "account" | "opportunity";
  refId: string;
  ownerId: string;
  done: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "paused";
  runsPerMonth: number;
  lastRunDaysAgo: number;
  /** Simulated trigger walkthrough (explicitly sample, never executed). */
  preview: { title: string; steps: string[] };
}

export interface AccountNote {
  id: string;
  accountId: string;
  authorId: string;
  body: string;
  /** Days before DEMO_NOW at creation (0 = just now, this session). */
  daysAgo: number;
}

/** Everything the five views share. Views derive their own summaries. */
export interface NorthlineData {
  team: TeamMember[];
  accounts: Account[];
  contacts: Contact[];
  leads: Lead[];
  opportunities: Opportunity[];
  activities: ActivityItem[];
  tasks: Task[];
  rules: AutomationRule[];
  /** Seed notes; user-created notes append here during the session. */
  notes: AccountNote[];
}
