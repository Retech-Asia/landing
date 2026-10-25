"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildMeridianSeed } from "./fixtures";
import { formatCurrency } from "./format";
import type {
  ApprovalState,
  MeridianData,
  PoLineItem,
  PurchaseOrder,
  SkuStockRow,
} from "./types";

/**
 * Shared demo state for the four Meridian views. In-memory only: approval
 * decisions update the connected purchase order, stock transfers move
 * fixture quantities, and every mutation lands in the operations event
 * history. Reset/reload returns to seed.
 */

export type MeridianAction =
  | { type: "decide-approval"; approvalId: string; decision: Exclude<ApprovalState, "pending"> }
  | { type: "transfer-stock"; skuId: string; fromWarehouseId: string; toWarehouseId: string; qty: number }
  | { type: "reset" };

let eventCounter = 0;
function nextEventId(): string {
  eventCounter += 1;
  return `ev-local-${eventCounter}`;
}

/** Derived PO total — views must use this, never a hardcoded amount. */
export function poAmount(po: Pick<PurchaseOrder, "lines">): number {
  return po.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
}

export function lineTotal(line: PoLineItem): number {
  return line.quantity * line.unitPrice;
}

export function availability(row: Pick<SkuStockRow, "onHand" | "committed">): number {
  return row.onHand - row.committed;
}

function reducer(state: MeridianData, action: MeridianAction): MeridianData {
  switch (action.type) {
    case "decide-approval": {
      const approval = state.approvals.find((a) => a.id === action.approvalId);
      if (!approval || approval.state !== "pending") return state;
      const po = state.purchaseOrders.find((p) => p.number === approval.poNumber);
      return {
        ...state,
        approvals: state.approvals.map((a) =>
          a.id === action.approvalId
            ? {
                ...a,
                state: action.decision,
                history: [
                  ...a.history,
                  { action: action.decision, actorId: "st-priya", daysAgo: 0 },
                ],
              }
            : a
        ),
        purchaseOrders: state.purchaseOrders.map((p) =>
          p.number === approval.poNumber ? { ...p, status: action.decision } : p
        ),
        events: [
          {
            id: nextEventId(),
            kind: action.decision === "approved" ? "po_approved" : "po_rejected",
            summary:
              action.decision === "approved"
                ? `${approval.poNumber} approved (${po ? formatCurrency(poAmount(po)) : "$0"} USD) — Priya Raman`
                : `${approval.poNumber} rejected — Priya Raman`,
            daysAgo: 0,
          },
          ...state.events,
        ],
      };
    }
    case "transfer-stock": {
      const qty = Math.floor(action.qty);
      if (qty <= 0 || action.fromWarehouseId === action.toWarehouseId) return state;
      const source = state.stock.find(
        (r) => r.skuId === action.skuId && r.warehouseId === action.fromWarehouseId
      );
      if (!source || availability(source) < qty) return state;
      const target = state.stock.find(
        (r) => r.skuId === action.skuId && r.warehouseId === action.toWarehouseId
      );
      if (!target) return state;
      const sku = state.skus.find((s) => s.id === action.skuId);
      const fromWh = state.warehouses.find((w) => w.id === action.fromWarehouseId);
      const toWh = state.warehouses.find((w) => w.id === action.toWarehouseId);
      return {
        ...state,
        stock: state.stock.map((r) => {
          if (r.skuId === action.skuId && r.warehouseId === action.fromWarehouseId) {
            return { ...r, onHand: r.onHand - qty };
          }
          if (r.skuId === action.skuId && r.warehouseId === action.toWarehouseId) {
            return { ...r, onHand: r.onHand + qty };
          }
          return r;
        }),
        events: [
          {
            id: nextEventId(),
            kind: "transfer",
            summary: `${qty} × ${sku?.id ?? action.skuId} transferred ${fromWh?.code ?? "?"} → ${toWh?.code ?? "?"}`,
            daysAgo: 0,
          },
          ...state.events,
        ],
      };
    }
    case "reset":
      return buildMeridianSeed();
  }
}

export interface MeridianStore {
  data: MeridianData;
  decideApproval: (approvalId: string, decision: Exclude<ApprovalState, "pending">) => void;
  transferStock: (skuId: string, fromWarehouseId: string, toWarehouseId: string, qty: number) => void;
  reset: () => void;
  staffById: (id: string) => MeridianData["staff"][number] | undefined;
  supplierById: (id: string) => MeridianData["suppliers"][number] | undefined;
  warehouseById: (id: string) => MeridianData["warehouses"][number] | undefined;
  poByNumber: (number: string) => PurchaseOrder | undefined;
  skuById: (id: string) => MeridianData["skus"][number] | undefined;
  stockRow: (skuId: string, warehouseId: string) => SkuStockRow | undefined;
}

const MeridianContext = createContext<MeridianStore | null>(null);

export function MeridianProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, buildMeridianSeed);

  const decideApproval = useCallback(
    (approvalId: string, decision: Exclude<ApprovalState, "pending">) =>
      dispatch({ type: "decide-approval", approvalId, decision }),
    []
  );
  const transferStock = useCallback(
    (skuId: string, fromWarehouseId: string, toWarehouseId: string, qty: number) =>
      dispatch({ type: "transfer-stock", skuId, fromWarehouseId, toWarehouseId, qty }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const store = useMemo<MeridianStore>(() => {
    const staffById = (id: string) => data.staff.find((s) => s.id === id);
    const supplierById = (id: string) => data.suppliers.find((s) => s.id === id);
    const warehouseById = (id: string) => data.warehouses.find((w) => w.id === id);
    const poByNumber = (num: string) => data.purchaseOrders.find((p) => p.number === num);
    const skuById = (id: string) => data.skus.find((s) => s.id === id);
    const stockRow = (skuId: string, warehouseId: string) =>
      data.stock.find((r) => r.skuId === skuId && r.warehouseId === warehouseId);
    return {
      data,
      decideApproval,
      transferStock,
      reset,
      staffById,
      supplierById,
      warehouseById,
      poByNumber,
      skuById,
      stockRow,
    };
  }, [data, decideApproval, transferStock, reset]);

  return <MeridianContext.Provider value={store}>{children}</MeridianContext.Provider>;
}

export function useMeridian(): MeridianStore {
  const store = useContext(MeridianContext);
  if (!store) throw new Error("useMeridian must be used inside MeridianProvider");
  return store;
}
