/**
 * Property Studio — property-management CRM concept demo data contracts
 * (Blueprint A, docs/chatgpt-handoff-concept-blueprints-2026-10-26.md).
 * Fictional small residential agency: one office, listings, leads,
 * appointments and offers. All figures derive from fixtures; nothing is
 * hardcoded in views.
 */

/** Demo clock anchor — fixed for hydration-safe, test-stable rendering. */
export const PROPERTY_NOW = new Date("2026-10-27T09:30:00");

export type DemoLocale = "en" | "vi";

export type PropertyStatus = "available" | "pending" | "offered" | "closed";

export type Occupancy = "vacant" | "owner_occupied" | "tenant_occupied";

export type PropertyType = "house" | "condo" | "townhouse" | "duplex";

export interface GallerySpec {
  /** Number of schematic tiles in the listing gallery strip. */
  tiles: number;
}

export type DocumentKind =
  | "disclosure"
  | "inspection"
  | "title"
  | "appraisal"
  | "offer_packet";

export interface PropertyDocument {
  id: string;
  kind: DocumentKind;
  name: string;
  updatedAtDaysAgo: number;
}

export interface Property {
  id: string;
  address: string;
  district: string;
  city: string;
  type: PropertyType;
  beds: number;
  baths: number;
  areaSqft: number;
  lotSqft: number;
  yearBuilt: number;
  parking: number;
  hoaMonthly: number;
  listPrice: number;
  status: PropertyStatus;
  occupancy: Occupancy;
  agentId: string;
  listedDaysAgo: number;
  /** Normalized coordinates (0..1) inside the schematic district map. */
  mapX: number;
  mapY: number;
  gallery: GallerySpec;
  documents: PropertyDocument[];
  summary: string;
}

export type LeadStage = "new" | "qualifying" | "viewing" | "offer" | "closing";

export type LeadSource =
  | "website"
  | "referral"
  | "open_house"
  | "portal"
  | "sign_call"
  | "social";

export interface Lead {
  id: string;
  name: string;
  stage: LeadStage;
  propertyIds: string[];
  nextAction: string;
  ownerId: string;
  budgetMin: number;
  budgetMax: number;
  source: LeadSource;
  createdDaysAgo: number;
}

export type AppointmentState = "scheduled" | "checked_in" | "completed" | "no_show";

export interface Appointment {
  id: string;
  propertyId: string;
  leadId: string;
  agentId: string;
  /** Minutes offset from PROPERTY_NOW (negative = earlier today). */
  offsetMinutes: number;
  state: AppointmentState;
}

export type OfferState = "draft" | "sent" | "accepted" | "declined";

export interface Offer {
  id: string;
  propertyId: string;
  leadId: string;
  amount: number;
  state: OfferState;
  daysAgo: number;
  contingencyDays: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  initials: string;
  hue: number;
}

export type ActivityKind =
  | "listing"
  | "appointment"
  | "offer"
  | "stage"
  | "lead";

export interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  summary: string;
  daysAgo: number;
}

export interface PropertyData {
  properties: Property[];
  leads: Lead[];
  appointments: Appointment[];
  offers: Offer[];
  agents: Agent[];
  activity: ActivityEvent[];
}
