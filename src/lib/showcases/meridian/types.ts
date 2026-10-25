/**
 * Meridian Operations — ERP concept demo data contracts (Wave 2A creative
 * handoff). Fictional wholesale industrial-equipment distributor: two
 * warehouses, suppliers, purchasing, inventory control, approval workflows.
 * All figures derive from fixtures; nothing is hardcoded in views.
 */

/** Demo clock anchor — fixed for hydration-safe, test-stable rendering. */
export const MERIDIAN_NOW = new Date("2026-10-26T09:00:00");

export type DemoLocale = "en" | "vi";

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  leadTimeDays: number;
}

export type PoStatus =
  | "awaiting_approval"
  | "approved"
  | "in_transit"
  | "received"
  | "rejected";

export interface PoLineItem {
  /** SKU id when the line refers to a catalog item; otherwise free text. */
  skuId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  /** Sequential PO-10xx number, used as the human-facing ID. */
  number: string;
  supplierId: string;
  warehouseId: string;
  lines: PoLineItem[];
  status: PoStatus;
  requestedById: string;
  /** Request age in days before DEMO_NOW. */
  requestedDaysAgo: number;
  expectedInDays: number;
  reason: string;
}

export interface SkuStockRow {
  skuId: string;
  warehouseId: string;
  onHand: number;
  committed: number;
  reorderPoint: number;
}

export interface Sku {
  id: string;
  name: string;
  category: string;
  unit: string;
}

export type ApprovalState = "pending" | "approved" | "rejected";

export interface ApprovalDecision {
  action: "approved" | "rejected";
  actorId: string;
  daysAgo: number;
  note?: string;
}

export interface ApprovalRecord {
  id: string;
  poNumber: string;
  requestedById: string;
  reason: string;
  state: ApprovalState;
  /** Days the request has been waiting (0 = today) — pending only. */
  waitingDays: number;
  history: ApprovalDecision[];
}

export type EventKind =
  | "po_created"
  | "po_approved"
  | "po_rejected"
  | "shipment"
  | "transfer"
  | "stock_alert";

export interface OperationalEvent {
  id: string;
  kind: EventKind;
  summary: string;
  daysAgo: number;
}

export interface MeridianData {
  warehouses: Warehouse[];
  suppliers: Supplier[];
  staff: { id: string; name: string; role: string; initials: string; hue: number }[];
  purchaseOrders: PurchaseOrder[];
  skus: Sku[];
  stock: SkuStockRow[];
  approvals: ApprovalRecord[];
  events: OperationalEvent[];
}
