import type { ComponentType, ReactNode } from "react";
import dynamic from "next/dynamic";
import { NorthlineDemoRoot } from "./northline/NorthlineShell";
import { MeridianDemoRoot } from "./meridian/MeridianShell";
import { FormaDemoRoot } from "./forma/FormaShell";
import { CitewellDemoRoot } from "./citewell/CitewellShell";
import { RelayDemoRoot } from "./relay/RelayShell";
import { PropertyDemoRoot } from "./property/PropertyShell";
import { CareDemoRoot } from "./care/CareShell";

/**
 * Interactive showcase view components, keyed by showcase id then view id.
 *
 * Components are wrapped in next/dynamic HERE, at module scope (stable
 * component identity, per-view chunk splitting,
 * `react-hooks/static-components`-clean). The shell only looks entries up
 * and Suspense-wraps them; the skeleton fallback lives in the shell.
 *
 * Contract per view component: `(props: { locale: "en" | "vi" })` — client
 * components with deterministic synthetic fixtures, no backend/API calls,
 * responsive down to mobile widths. Northline copy derives from the approved
 * Wave 1 creative handoff.
 *
 * STORE_PROVIDERS: the per-showcase demo root each view mounts inside —
 * shared store + scoped styles that persist across shell tab switches
 * (stage moves in one view must stay visible after switching views). Views
 * mounted here render WITHOUT the app chrome; the full-chrome variant lives
 * in the showcase's own shell component.
 */

export type ShowcaseViewComponent = ComponentType<{ locale: "en" | "vi" }>;

const NorthlineDashboard = dynamic(
  () => import("./northline/views/DashboardView").then((m) => ({ default: m.DashboardView }))
);
const NorthlineLeads = dynamic(
  () => import("./northline/views/LeadsView").then((m) => ({ default: m.LeadsView }))
);
const NorthlinePipeline = dynamic(
  () => import("./northline/views/PipelineView").then((m) => ({ default: m.PipelineView }))
);
const NorthlineCustomers = dynamic(
  () => import("./northline/views/CustomersView").then((m) => ({ default: m.CustomersView }))
);
const NorthlineAutomation = dynamic(
  () => import("./northline/views/AutomationView").then((m) => ({ default: m.AutomationView }))
);

const MeridianOverview = dynamic(
  () => import("./meridian/views/OverviewView").then((m) => ({ default: m.OverviewView }))
);
const MeridianPurchasing = dynamic(
  () => import("./meridian/views/PurchasingView").then((m) => ({ default: m.PurchasingView }))
);
const MeridianInventory = dynamic(
  () => import("./meridian/views/InventoryView").then((m) => ({ default: m.InventoryView }))
);
const MeridianApprovals = dynamic(
  () => import("./meridian/views/ApprovalsView").then((m) => ({ default: m.ApprovalsView }))
);

const FormaDesk = dynamic(
  () => import("./forma/views/DeskView").then((m) => ({ default: m.DeskView }))
);
const FormaEditor = dynamic(
  () => import("./forma/views/EditorView").then((m) => ({ default: m.EditorView }))
);
const FormaCalendar = dynamic(
  () => import("./forma/views/CalendarView").then((m) => ({ default: m.CalendarView }))
);
const FormaLibrary = dynamic(
  () => import("./forma/views/LibraryView").then((m) => ({ default: m.LibraryView }))
);

const CitewellAnswers = dynamic(
  () => import("./citewell/views/AnswersView").then((m) => ({ default: m.AnswersView }))
);
const CitewellSources = dynamic(
  () => import("./citewell/views/SourcesView").then((m) => ({ default: m.SourcesView }))
);
const CitewellReview = dynamic(
  () => import("./citewell/views/ReviewView").then((m) => ({ default: m.ReviewView }))
);
const CitewellQuality = dynamic(
  () => import("./citewell/views/QualityView").then((m) => ({ default: m.QualityView }))
);

const RelayToday = dynamic(
  () => import("./relay/views/TodayView").then((m) => ({ default: m.TodayView }))
);
const RelayJob = dynamic(
  () => import("./relay/views/JobView").then((m) => ({ default: m.JobView }))
);
const RelayNotes = dynamic(
  () => import("./relay/views/NotesView").then((m) => ({ default: m.NotesView }))
);
const RelaySync = dynamic(
  () => import("./relay/views/SyncView").then((m) => ({ default: m.SyncView }))
);

const PropertyDetail = dynamic(
  () => import("./property/views/PropertyDetailView").then((m) => ({ default: m.PropertyDetailView }))
);
const PropertyPortfolio = dynamic(
  () => import("./property/views/PortfolioView").then((m) => ({ default: m.PortfolioView }))
);
const PropertyPipeline = dynamic(
  () => import("./property/views/PipelineView").then((m) => ({ default: m.PipelineView }))
);
const PropertyMap = dynamic(
  () => import("./property/views/MapView").then((m) => ({ default: m.MapView }))
);
const PropertyCompanion = dynamic(
  () => import("./property/views/CompanionView").then((m) => ({ default: m.CompanionView }))
);

const CareToday = dynamic(
  () => import("./care/views/TodayView").then((m) => ({ default: m.TodayView }))
);
const CarePlanView = dynamic(
  () => import("./care/views/CarePlanView").then((m) => ({ default: m.CarePlanView }))
);
const CareMedications = dynamic(
  () => import("./care/views/MedicationsView").then((m) => ({ default: m.MedicationsView }))
);
const CareAppointments = dynamic(
  () => import("./care/views/AppointmentsView").then((m) => ({ default: m.AppointmentsView }))
);
const CareMessages = dynamic(
  () => import("./care/views/MessagesView").then((m) => ({ default: m.MessagesView }))
);
const CareClinic = dynamic(
  () => import("./care/views/ClinicView").then((m) => ({ default: m.ClinicView }))
);

export const VIEW_COMPONENTS: Record<string, Record<string, ShowcaseViewComponent>> = {
  property: {
    property: PropertyDetail,
    portfolio: PropertyPortfolio,
    pipeline: PropertyPipeline,
    map: PropertyMap,
    companion: PropertyCompanion,
  },
  care: {
    today: CareToday,
    "care-plan": CarePlanView,
    medications: CareMedications,
    appointments: CareAppointments,
    messages: CareMessages,
    clinic: CareClinic,
  },
  crm: {
    dashboard: NorthlineDashboard,
    leads: NorthlineLeads,
    pipeline: NorthlinePipeline,
    customers: NorthlineCustomers,
    automation: NorthlineAutomation,
  },
  erp: {
    overview: MeridianOverview,
    purchasing: MeridianPurchasing,
    inventory: MeridianInventory,
    approvals: MeridianApprovals,
  },
  cms: {
    desk: FormaDesk,
    editor: FormaEditor,
    calendar: FormaCalendar,
    library: FormaLibrary,
  },
  ai: {
    answers: CitewellAnswers,
    sources: CitewellSources,
    review: CitewellReview,
    quality: CitewellQuality,
  },
  mobile: {
    today: RelayToday,
    job: RelayJob,
    notes: RelayNotes,
    sync: RelaySync,
  },
};

export const STORE_PROVIDERS: Record<
  string,
  ComponentType<{ children: ReactNode; viewId?: string }>
> = {
  property: PropertyDemoRoot,
  care: CareDemoRoot,
  crm: NorthlineDemoRoot,
  erp: MeridianDemoRoot,
  cms: FormaDemoRoot,
  ai: CitewellDemoRoot,
  mobile: RelayDemoRoot,
};
