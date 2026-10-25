import type { ComponentType, ReactNode } from "react";
import dynamic from "next/dynamic";
import { NorthlineDemoRoot } from "./northline/NorthlineShell";
import { MeridianDemoRoot } from "./meridian/MeridianShell";

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

export const VIEW_COMPONENTS: Record<string, Record<string, ShowcaseViewComponent>> = {
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
};

export const STORE_PROVIDERS: Record<string, ComponentType<{ children: ReactNode }>> = {
  crm: NorthlineDemoRoot,
  erp: MeridianDemoRoot,
};
