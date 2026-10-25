import type {
  ApprovalRecord,
  MeridianData,
  OperationalEvent,
  PurchaseOrder,
  Sku,
  SkuStockRow,
  Supplier,
  Warehouse,
} from "./types";

/**
 * Meridian Operations — deterministic synthetic fixtures (Wave 2A handoff).
 * Handoff-specified records (PO-1042/1043/1044 amounts+statuses, FL-101 /
 * PT-204 / NV-310 stock levels) are included exactly; remaining records are
 * completed in the same style with sequential IDs and believable amounts.
 */

const warehouses: Warehouse[] = [
  { id: "wh-north", code: "NORTH", name: "Northgate Distribution Center", location: "Reno, NV" },
  { id: "wh-south", code: "SOUTH", name: "Southport Industrial Yard", location: "Tucson, AZ" },
];

const suppliers: Supplier[] = [
  { id: "sup-northbay", name: "Northbay Components", code: "NBC", category: "Electronics & sensors", leadTimeDays: 12 },
  { id: "sup-aster", name: "Aster Industrial", code: "AST", category: "Pumps & fluid handling", leadTimeDays: 18 },
  { id: "sup-clearpath", name: "Clearpath Supply", code: "CPS", category: "Valves & fittings", leadTimeDays: 9 },
  { id: "sup-merrow", name: "Merrow & Vance", code: "MVP", category: "Bearings & power transmission", leadTimeDays: 14 },
];

const staff: MeridianData["staff"] = [
  { id: "st-priya", name: "Priya Raman", role: "Operations lead", initials: "PR", hue: 28 },
  { id: "st-tom", name: "Tom Aldana", role: "Procurement", initials: "TA", hue: 205 },
  { id: "st-sofia", name: "Sofia Ruiz", role: "Warehouse ops", initials: "SR", hue: 150 },
  { id: "st-ben", name: "Ben Carter", role: "Finance", initials: "BC", hue: 260 },
];

const skus: Sku[] = [
  { id: "FL-101", name: "Hex bolt sets, galvanized M12", category: "Fasteners", unit: "box" },
  { id: "FL-112", name: "Anchor bolts, stainless M16", category: "Fasteners", unit: "box" },
  { id: "BR-118", name: "Spherical roller bearing 22210", category: "Power transmission", unit: "pc" },
  { id: "BR-124", name: "Deep groove bearing 6208-2RS", category: "Power transmission", unit: "pc" },
  { id: "PM-207", name: "Gear pump 1.2 in³/rev", category: "Fluid handling", unit: "pc" },
  { id: "PM-215", name: "Centrifugal pump, 2-stage", category: "Fluid handling", unit: "pc" },
  { id: "NV-310", name: "Ball valve 2-inch, 316 SS", category: "Valves", unit: "pc" },
  { id: "NV-322", name: "Butterfly valve 4-inch, wafer", category: "Valves", unit: "pc" },
  { id: "PT-204", name: "Pneumatic cylinder ISO 63×200", category: "Pneumatics", unit: "pc" },
  { id: "PT-231", name: "Air preparation unit FRL ½″", category: "Pneumatics", unit: "pc" },
  { id: "HY-140", name: "Hydraulic hose ½″, 2-wire", category: "Hydraulics", unit: "m" },
  { id: "HY-152", name: "Quick coupler set, flat-face", category: "Hydraulics", unit: "set" },
  { id: "SN-401", name: "Pressure transmitter 0–16 bar", category: "Sensors", unit: "pc" },
  { id: "SN-418", name: "Inductive proximity sensor M18", category: "Sensors", unit: "pc" },
  { id: "MT-505", name: "IEC motor 3 kW, 4-pole", category: "Motors", unit: "pc" },
  { id: "EL-512", name: "VFD 5.5 kW, IP20", category: "Drives", unit: "pc" },
];

/** availability = onHand − committed; low stock = availability < reorderPoint. */
const stock: SkuStockRow[] = [
  { skuId: "FL-101", warehouseId: "wh-north", onHand: 80, committed: 20, reorderPoint: 75 },
  { skuId: "FL-101", warehouseId: "wh-south", onHand: 70, committed: 10, reorderPoint: 75 },
  { skuId: "FL-112", warehouseId: "wh-north", onHand: 150, committed: 20, reorderPoint: 60 },
  { skuId: "FL-112", warehouseId: "wh-south", onHand: 90, committed: 10, reorderPoint: 60 },
  { skuId: "BR-118", warehouseId: "wh-north", onHand: 46, committed: 6, reorderPoint: 40 },
  { skuId: "BR-118", warehouseId: "wh-south", onHand: 38, committed: 4, reorderPoint: 40 },
  { skuId: "BR-124", warehouseId: "wh-north", onHand: 220, committed: 30, reorderPoint: 80 },
  { skuId: "BR-124", warehouseId: "wh-south", onHand: 160, committed: 20, reorderPoint: 80 },
  { skuId: "PM-207", warehouseId: "wh-north", onHand: 24, committed: 4, reorderPoint: 15 },
  { skuId: "PM-207", warehouseId: "wh-south", onHand: 18, committed: 2, reorderPoint: 15 },
  { skuId: "PM-215", warehouseId: "wh-north", onHand: 12, committed: 2, reorderPoint: 8 },
  { skuId: "PM-215", warehouseId: "wh-south", onHand: 9, committed: 1, reorderPoint: 8 },
  { skuId: "NV-310", warehouseId: "wh-north", onHand: 60, committed: 15, reorderPoint: 60 },
  { skuId: "NV-310", warehouseId: "wh-south", onHand: 45, committed: 15, reorderPoint: 40 },
  { skuId: "NV-322", warehouseId: "wh-north", onHand: 45, committed: 5, reorderPoint: 50 },
  { skuId: "NV-322", warehouseId: "wh-south", onHand: 30, committed: 0, reorderPoint: 50 },
  { skuId: "PT-204", warehouseId: "wh-north", onHand: 300, committed: 60, reorderPoint: 100 },
  { skuId: "PT-204", warehouseId: "wh-south", onHand: 240, committed: 0, reorderPoint: 100 },
  { skuId: "PT-231", warehouseId: "wh-north", onHand: 58, committed: 8, reorderPoint: 30 },
  { skuId: "PT-231", warehouseId: "wh-south", onHand: 44, committed: 4, reorderPoint: 30 },
  { skuId: "HY-140", warehouseId: "wh-north", onHand: 640, committed: 90, reorderPoint: 300 },
  { skuId: "HY-140", warehouseId: "wh-south", onHand: 520, committed: 60, reorderPoint: 300 },
  { skuId: "HY-152", warehouseId: "wh-north", onHand: 33, committed: 3, reorderPoint: 20 },
  { skuId: "HY-152", warehouseId: "wh-south", onHand: 27, committed: 7, reorderPoint: 20 },
  { skuId: "SN-401", warehouseId: "wh-north", onHand: 61, committed: 11, reorderPoint: 40 },
  { skuId: "SN-401", warehouseId: "wh-south", onHand: 52, committed: 2, reorderPoint: 40 },
  { skuId: "SN-418", warehouseId: "wh-north", onHand: 130, committed: 30, reorderPoint: 90 },
  { skuId: "SN-418", warehouseId: "wh-south", onHand: 120, committed: 10, reorderPoint: 90 },
  { skuId: "MT-505", warehouseId: "wh-north", onHand: 16, committed: 2, reorderPoint: 10 },
  { skuId: "MT-505", warehouseId: "wh-south", onHand: 11, committed: 1, reorderPoint: 10 },
  { skuId: "EL-512", warehouseId: "wh-north", onHand: 14, committed: 4, reorderPoint: 12 },
  { skuId: "EL-512", warehouseId: "wh-south", onHand: 7, committed: 0, reorderPoint: 12 },
];

const purchaseOrders: PurchaseOrder[] = [
  {
    number: "PO-1042",
    supplierId: "sup-northbay",
    warehouseId: "wh-north",
    lines: [{ skuId: "SN-418", description: "Inductive proximity sensor M18", quantity: 60, unitPrice: 120 }],
    status: "awaiting_approval",
    requestedById: "st-tom",
    requestedDaysAgo: 1,
    expectedInDays: 12,
    reason: "Q4 sensor restock for conveyor retrofits",
  },
  {
    number: "PO-1043",
    supplierId: "sup-aster",
    warehouseId: "wh-south",
    lines: [{ skuId: "PM-215", description: "Centrifugal pump, 2-stage", quantity: 40, unitPrice: 250 }],
    status: "approved",
    requestedById: "st-sofia",
    requestedDaysAgo: 3,
    expectedInDays: 15,
    reason: "Irrigation line replacement program",
  },
  {
    number: "PO-1044",
    supplierId: "sup-clearpath",
    warehouseId: "wh-north",
    lines: [{ skuId: "NV-322", description: "Butterfly valve 4-inch, wafer", quantity: 100, unitPrice: 80 }],
    status: "in_transit",
    requestedById: "st-priya",
    requestedDaysAgo: 6,
    expectedInDays: 4,
    reason: "Valve bank rebuild, Northgate line 3",
  },
  {
    number: "PO-1045",
    supplierId: "sup-merrow",
    warehouseId: "wh-north",
    lines: [
      { skuId: "BR-118", description: "Spherical roller bearing 22210", quantity: 80, unitPrice: 64 },
      { skuId: "BR-124", description: "Deep groove bearing 6208-2RS", quantity: 120, unitPrice: 22 },
    ],
    status: "approved",
    requestedById: "st-tom",
    requestedDaysAgo: 4,
    expectedInDays: 10,
    reason: "Bearing kit restock ahead of maintenance season",
  },
  {
    number: "PO-1046",
    supplierId: "sup-clearpath",
    warehouseId: "wh-south",
    lines: [
      { skuId: "NV-310", description: "Ball valve 2-inch, 316 SS", quantity: 90, unitPrice: 58 },
      { skuId: "HY-152", description: "Quick coupler set, flat-face", quantity: 40, unitPrice: 96 },
    ],
    status: "in_transit",
    requestedById: "st-sofia",
    requestedDaysAgo: 8,
    expectedInDays: 2,
    reason: "Southport valve and coupler replenishment",
  },
  {
    number: "PO-1047",
    supplierId: "sup-northbay",
    warehouseId: "wh-south",
    lines: [
      { skuId: "SN-401", description: "Pressure transmitter 0–16 bar", quantity: 50, unitPrice: 145 },
      { skuId: "EL-512", description: "VFD 5.5 kW, IP20", quantity: 14, unitPrice: 415 },
    ],
    status: "awaiting_approval",
    requestedById: "st-tom",
    requestedDaysAgo: 2,
    expectedInDays: 13,
    reason: "Drive upgrade batch for packaging cells",
  },
  {
    number: "PO-1048",
    supplierId: "sup-merrow",
    warehouseId: "wh-south",
    lines: [{ skuId: "HY-140", description: "Hydraulic hose ½″, 2-wire", quantity: 600, unitPrice: 9 }],
    status: "received",
    requestedById: "st-sofia",
    requestedDaysAgo: 16,
    expectedInDays: -2,
    reason: "Bulk hose stock, quarterly buy",
  },
  {
    number: "PO-1049",
    supplierId: "sup-aster",
    warehouseId: "wh-north",
    lines: [
      { skuId: "PT-204", description: "Pneumatic cylinder ISO 63×200", quantity: 60, unitPrice: 118 },
      { skuId: "PT-231", description: "Air preparation unit FRL ½″", quantity: 25, unitPrice: 92 },
    ],
    status: "received",
    requestedById: "st-priya",
    requestedDaysAgo: 19,
    expectedInDays: -5,
    reason: "Automation cell spares, scheduled restock",
  },
  {
    number: "PO-1050",
    supplierId: "sup-merrow",
    warehouseId: "wh-north",
    lines: [{ skuId: "MT-505", description: "IEC motor 3 kW, 4-pole", quantity: 18, unitPrice: 388 }],
    status: "approved",
    requestedById: "st-tom",
    requestedDaysAgo: 2,
    expectedInDays: 12,
    reason: "Motor spares for crusher feed motors",
  },
  {
    number: "PO-1051",
    supplierId: "sup-aster",
    warehouseId: "wh-south",
    lines: [
      { skuId: "PM-207", description: "Gear pump 1.2 in³/rev", quantity: 30, unitPrice: 205 },
      { skuId: "PM-215", description: "Centrifugal pump, 2-stage", quantity: 22, unitPrice: 250 },
    ],
    status: "awaiting_approval",
    requestedById: "st-sofia",
    requestedDaysAgo: 1,
    expectedInDays: 16,
    reason: "Fluid-handling replenishment, Q4 buy",
  },
  {
    number: "PO-1052",
    supplierId: "sup-northbay",
    warehouseId: "wh-north",
    lines: [{ skuId: "SN-418", description: "Inductive proximity sensor M18", quantity: 45, unitPrice: 124 }],
    status: "in_transit",
    requestedById: "st-priya",
    requestedDaysAgo: 9,
    expectedInDays: 3,
    reason: "Sensor top-up for line 1 retrofits",
  },
  {
    number: "PO-1053",
    supplierId: "sup-clearpath",
    warehouseId: "wh-south",
    lines: [{ skuId: "NV-310", description: "Ball valve 2-inch, brass", quantity: 200, unitPrice: 47 }],
    status: "rejected",
    requestedById: "st-ben",
    requestedDaysAgo: 11,
    expectedInDays: 0,
    reason: "Brass valves off-spec for potable line — respecified",
  },
];

const approvals: ApprovalRecord[] = [
  { id: "ap-01", poNumber: "PO-1042", requestedById: "st-tom", reason: "Q4 sensor restock for conveyor retrofits", state: "pending", waitingDays: 1, history: [] },
  { id: "ap-02", poNumber: "PO-1047", requestedById: "st-tom", reason: "Drive upgrade batch for packaging cells", state: "pending", waitingDays: 2, history: [] },
  { id: "ap-03", poNumber: "PO-1051", requestedById: "st-sofia", reason: "Fluid-handling replenishment, Q4 buy", state: "pending", waitingDays: 1, history: [] },
  { id: "ap-04", poNumber: "PO-1043", requestedById: "st-sofia", reason: "Irrigation line replacement program", state: "approved", waitingDays: 0, history: [{ action: "approved", actorId: "st-ben", daysAgo: 2, note: "Budget confirmed under facilities program" }] },
  { id: "ap-05", poNumber: "PO-1045", requestedById: "st-tom", reason: "Bearing kit restock ahead of maintenance season", state: "approved", waitingDays: 0, history: [{ action: "approved", actorId: "st-priya", daysAgo: 3 }] },
  { id: "ap-06", poNumber: "PO-1050", requestedById: "st-tom", reason: "Motor spares for crusher feed motors", state: "approved", waitingDays: 0, history: [{ action: "approved", actorId: "st-ben", daysAgo: 1 }] },
  { id: "ap-07", poNumber: "PO-1044", requestedById: "st-priya", reason: "Valve bank rebuild, Northgate line 3", state: "approved", waitingDays: 0, history: [{ action: "approved", actorId: "st-priya", daysAgo: 6 }] },
  { id: "ap-08", poNumber: "PO-1053", requestedById: "st-ben", reason: "Brass valves off-spec for potable line — respecified", state: "rejected", waitingDays: 0, history: [{ action: "rejected", actorId: "st-priya", daysAgo: 10, note: "Material spec mismatch; resubmit with 316 SS" }] },
];

const events: OperationalEvent[] = [
  { id: "ev-01", kind: "po_created", summary: "PO-1051 raised with Aster Industrial (Southport)", daysAgo: 1 },
  { id: "ev-02", kind: "po_created", summary: "PO-1042 raised with Northbay Components (Northgate)", daysAgo: 1 },
  { id: "ev-03", kind: "po_approved", summary: "PO-1050 approved by Ben Carter", daysAgo: 1 },
  { id: "ev-04", kind: "stock_alert", summary: "NV-322 availability below reorder point at Southport", daysAgo: 2 },
  { id: "ev-05", kind: "po_approved", summary: "PO-1047 submitted for approval ($12,910)", daysAgo: 2 },
  { id: "ev-06", kind: "po_approved", summary: "PO-1043 approved by Ben Carter", daysAgo: 2 },
  { id: "ev-07", kind: "shipment", summary: "PO-1046 departed Clearpath Supply — in transit", daysAgo: 3 },
  { id: "ev-08", kind: "transfer", summary: "25 × BR-124 transferred Northgate → Southport", daysAgo: 4 },
  { id: "ev-09", kind: "shipment", summary: "PO-1048 received at Southport (600 m hydraulic hose)", daysAgo: 5 },
  { id: "ev-10", kind: "po_rejected", summary: "PO-1053 rejected — material spec mismatch", daysAgo: 10 },
];

export function buildMeridianSeed(): MeridianData {
  return {
    warehouses: structuredClone(warehouses),
    suppliers: structuredClone(suppliers),
    staff: structuredClone(staff),
    purchaseOrders: structuredClone(purchaseOrders),
    skus: structuredClone(skus),
    stock: structuredClone(stock),
    approvals: structuredClone(approvals),
    events: structuredClone(events),
  };
}
