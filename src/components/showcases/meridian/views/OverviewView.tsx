"use client";

import {
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Layers3,
  Package,
  Truck,
  Warehouse,
  XCircle,
} from "lucide-react";
import { useMeridian, poAmount, availability } from "@/lib/showcases/meridian/store";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatDaysAgo,
  formatDueIn,
  formatQty,
} from "@/lib/showcases/meridian/format";
import type { EventKind } from "@/lib/showcases/meridian/types";
import { MdAvatar, MdMono, MdPanel, MdPanelHeader, StatusChip } from "../primitives";

/**
 * View 1 — Operations Overview (Wave 2A handoff §2A): procurement summary,
 * stock alerts, pending approvals and inbound shipments. Every figure derives
 * from the shared store — no hardcoded totals, demo clock fixed in format.ts.
 */

const EVENT_ICON: Record<EventKind, typeof Truck> = {
  po_created: ClipboardList,
  po_approved: CheckCircle2,
  po_rejected: XCircle,
  shipment: Truck,
  transfer: Layers3,
  stock_alert: Package,
};

/** Alert-worthy kinds get their semantic ink; routine ops stay secondary. */
const EVENT_INK: Partial<Record<EventKind, string>> = {
  po_approved: "text-[var(--md-ok-text)]",
  po_rejected: "text-[var(--md-error-text)]",
  stock_alert: "text-[var(--md-warn-text)]",
};

const COPY = {
  en: {
    kpiOpen: "Open Purchase Orders",
    kpiAwaiting: "Orders Awaiting Approval",
    kpiLow: "Low-Stock SKUs",
    kpiInventory: "Inventory Items",
    openValue: "open value",
    pendingValue: "pending value",
    committed: "committed",
    ofSkus: "SKUs tracked",
    chart: "Ordered spend by request date",
    warehouseHealth: "Warehouse health",
    stockAlerts: "Stock alerts",
    pendingApprovals: "Pending approvals",
    inbound: "Inbound shipments",
    events: "Recent activity",
    whCol: {
      warehouse: "Warehouse",
      skus: "SKUs stocked",
      onHand: "On hand",
      available: "Available",
      lowRows: "Low-stock rows",
      health: "Health",
    },
    healthy: "Healthy",
    attention: "Needs attention",
    noAlerts: "No SKUs below their reorder point.",
    noApprovals: "No approvals waiting.",
    noInbound: "No shipments in transit.",
  },
  vi: {
    kpiOpen: "Đơn mua đang mở",
    kpiAwaiting: "Đơn chờ phê duyệt",
    kpiLow: "SKU tồn thấp",
    kpiInventory: "Vật tư tồn kho",
    openValue: "giá trị đang mở",
    pendingValue: "giá trị chờ duyệt",
    committed: "đã cam kết",
    ofSkus: "SKU được theo dõi",
    chart: "Chi tiêu đặt hàng theo ngày yêu cầu",
    warehouseHealth: "Tình trạng kho hàng",
    stockAlerts: "Cảnh báo tồn kho",
    pendingApprovals: "Phê duyệt đang chờ",
    inbound: "Lô hàng đang đến",
    events: "Hoạt động gần đây",
    whCol: {
      warehouse: "Kho",
      skus: "SKU đang quản lý",
      onHand: "Tồn kho",
      available: "Khả dụng",
      lowRows: "Dòng tồn thấp",
      health: "Tình trạng",
    },
    healthy: "Bình thường",
    attention: "Cần chú ý",
    noAlerts: "Không có SKU nào dưới điểm đặt lại.",
    noApprovals: "Không có phê duyệt nào đang chờ.",
    noInbound: "Không có lô hàng nào đang vận chuyển.",
  },
};

export function OverviewView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, staffById, supplierById, poByNumber } = useMeridian();

  // KPIs derive from the shared purchase-order and stock records.
  const openOrders = data.purchaseOrders.filter(
    (po) => po.status !== "received" && po.status !== "rejected"
  );
  const openValue = openOrders.reduce((sum, po) => sum + poAmount(po), 0);
  const awaitingOrders = data.purchaseOrders.filter((po) => po.status === "awaiting_approval");
  const awaitingValue = awaitingOrders.reduce((sum, po) => sum + poAmount(po), 0);
  const totalOnHand = data.stock.reduce((sum, row) => sum + row.onHand, 0);
  const totalCommitted = data.stock.reduce((sum, row) => sum + row.committed, 0);

  // Low stock is judged per SKU: total availability across warehouses vs total reorder point.
  const lowSkus = data.skus
    .map((sku) => {
      const rows = data.stock.filter((row) => row.skuId === sku.id);
      return {
        sku,
        available: rows.reduce((sum, row) => sum + availability(row), 0),
        reorderPoint: rows.reduce((sum, row) => sum + row.reorderPoint, 0),
      };
    })
    .filter((total) => total.available < total.reorderPoint);

  // Warehouse health is judged per stock row.
  const warehouseHealth = data.warehouses.map((warehouse) => {
    const rows = data.stock.filter((row) => row.warehouseId === warehouse.id);
    return {
      warehouse,
      skuCount: rows.length,
      onHand: rows.reduce((sum, row) => sum + row.onHand, 0),
      available: rows.reduce((sum, row) => sum + availability(row), 0),
      lowRows: rows.filter((row) => availability(row) < row.reorderPoint).length,
    };
  });

  const pendingApprovals = data.approvals.filter((a) => a.state === "pending");
  const inbound = data.purchaseOrders.filter((po) => po.status === "in_transit");

  // Ordered spend bucketed per request day (one bar per day present in fixtures).
  const spendByDay = (() => {
    const byDay = new Map<number, number>();
    for (const po of data.purchaseOrders) {
      byDay.set(po.requestedDaysAgo, (byDay.get(po.requestedDaysAgo) ?? 0) + poAmount(po));
    }
    return [...byDay.entries()]
      .map(([daysAgo, value]) => ({ daysAgo, value }))
      .sort((a, b) => b.daysAgo - a.daysAgo);
  })();
  const maxSpend = Math.max(...spendByDay.map((point) => point.value), 1);

  return (
    <div className="flex flex-col gap-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label={t.kpiOpen}
          value={String(openOrders.length)}
          sub={`${formatCurrency(openValue)} ${t.openValue}`}
        />
        <KpiCard
          label={t.kpiAwaiting}
          value={String(awaitingOrders.length)}
          sub={`${formatCurrency(awaitingValue)} ${t.pendingValue}`}
        />
        <KpiCard
          label={t.kpiLow}
          value={String(lowSkus.length)}
          sub={`${data.skus.length} ${t.ofSkus}`}
          warn={lowSkus.length > 0}
        />
        <KpiCard
          label={t.kpiInventory}
          value={formatQty(totalOnHand)}
          sub={`${formatQty(totalCommitted)} ${t.committed}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* (a) Procurement activity chart */}
        <MdPanel className="lg:col-span-2">
          <MdPanelHeader
            title={t.chart}
            action={<ClipboardList size={15} strokeWidth={1.75} className="text-[var(--md-secondary)]" aria-hidden="true" />}
          />
          <div
            role="img"
            aria-label={`${t.chart}: ${spendByDay
              .map((point) => `${formatDaysAgo(point.daysAgo, locale)} ${formatCurrency(point.value)}`)
              .join(", ")}`}
            className="px-4 py-4"
          >
            <div className="flex items-end gap-1.5 sm:gap-3">
              {spendByDay.map((point) => (
                <div key={point.daysAgo} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                  <MdMono className="text-[10px] tabular-nums text-[var(--md-secondary)]">
                    {formatCurrencyCompact(point.value)}
                  </MdMono>
                  <div className="flex h-28 w-full items-end">
                    <div
                      className="w-full rounded-sm bg-[var(--md-accent)]"
                      style={{ height: `${Math.max(4, (point.value / maxSpend) * 100)}%` }}
                    />
                  </div>
                  <span aria-hidden="true" className="text-[10px] text-[var(--md-secondary)]">
                    {locale === "vi" ? `-${point.daysAgo}n` : `-${point.daysAgo}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </MdPanel>

        {/* (b) Warehouse health table */}
        <MdPanel>
          <MdPanelHeader
            title={t.warehouseHealth}
            action={<Warehouse size={15} strokeWidth={1.75} className="text-[var(--md-secondary)]" aria-hidden="true" />}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--md-border)]">
                  <th scope="col" className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.warehouse}
                  </th>
                  <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.skus}
                  </th>
                  <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.onHand}
                  </th>
                  <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.available}
                  </th>
                  <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.lowRows}
                  </th>
                  <th scope="col" className="px-4 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.whCol.health}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--md-border)]">
                {warehouseHealth.map((wh) => (
                  <tr key={wh.warehouse.id}>
                    <td className="px-4 py-2.5">
                      <p className="text-sm font-medium">{wh.warehouse.name}</p>
                      <p className="text-xs text-[var(--md-secondary)]">
                        {wh.warehouse.code} · {wh.warehouse.location}
                      </p>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <MdMono className="text-sm">{formatQty(wh.skuCount)}</MdMono>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <MdMono className="text-sm">{formatQty(wh.onHand)}</MdMono>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <MdMono className="text-sm">{formatQty(wh.available)}</MdMono>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <MdMono className={`text-sm ${wh.lowRows > 0 ? "font-semibold text-[var(--md-warn-text)]" : ""}`}>
                        {formatQty(wh.lowRows)}
                      </MdMono>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <StatusChip tone={wh.lowRows === 0 ? "green" : "amber"}>
                        {wh.lowRows === 0 ? t.healthy : t.attention}
                      </StatusChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MdPanel>

        {/* (c) Stock alerts */}
        <MdPanel>
          <MdPanelHeader
            title={t.stockAlerts}
            action={<Package size={15} strokeWidth={1.75} className="text-[var(--md-secondary)]" aria-hidden="true" />}
          />
          <ul className="divide-y divide-[var(--md-border)]">
            {lowSkus.map((entry) => (
              <li key={entry.sku.id} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <MdMono className="text-[13px] font-semibold">{entry.sku.id}</MdMono>
                  <span className="ml-2 text-xs text-[var(--md-secondary)]">{entry.sku.name}</span>
                </div>
                <MdMono className="whitespace-nowrap text-xs text-[var(--md-warn-text)]">
                  {locale === "vi"
                    ? `${formatQty(entry.available)} khả dụng / điểm đặt lại ${formatQty(entry.reorderPoint)}`
                    : `${formatQty(entry.available)} available / reorder ${formatQty(entry.reorderPoint)}`}
                </MdMono>
              </li>
            ))}
            {lowSkus.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-[var(--md-secondary)]">{t.noAlerts}</li>
            )}
          </ul>
        </MdPanel>

        {/* (d) Pending approvals */}
        <MdPanel>
          <MdPanelHeader
            title={t.pendingApprovals}
            action={<FileCheck2 size={15} strokeWidth={1.75} className="text-[var(--md-secondary)]" aria-hidden="true" />}
          />
          <ul className="divide-y divide-[var(--md-border)]">
            {pendingApprovals.map((approval) => {
              const po = poByNumber(approval.poNumber);
              const requester = staffById(approval.requestedById);
              return (
                <li key={approval.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <MdMono className="text-[13px] font-semibold">{approval.poNumber}</MdMono>
                    <span className="ml-2 text-xs text-[var(--md-secondary)]">{requester?.name}</span>
                  </div>
                  {requester && <MdAvatar initials={requester.initials} hue={requester.hue} size={22} />}
                  <MdMono className="whitespace-nowrap text-sm font-semibold">
                    {po ? formatCurrency(poAmount(po)) : "-"}
                  </MdMono>
                </li>
              );
            })}
            {pendingApprovals.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-[var(--md-secondary)]">{t.noApprovals}</li>
            )}
          </ul>
        </MdPanel>

        {/* (e) Inbound shipments */}
        <MdPanel>
          <MdPanelHeader
            title={t.inbound}
            action={<Truck size={15} strokeWidth={1.75} className="text-[var(--md-secondary)]" aria-hidden="true" />}
          />
          <ul className="divide-y divide-[var(--md-border)]">
            {inbound.map((po) => {
              const supplier = supplierById(po.supplierId);
              return (
                <li key={po.number} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <MdMono className="text-[13px] font-semibold">{po.number}</MdMono>
                    <span className="ml-2 text-xs text-[var(--md-secondary)]">{supplier?.name}</span>
                  </div>
                  <span
                    className={`whitespace-nowrap text-xs font-medium ${
                      po.expectedInDays < 0 ? "text-[var(--md-warn-text)]" : "text-[var(--md-secondary)]"
                    }`}
                  >
                    {formatDueIn(po.expectedInDays, locale)}
                  </span>
                </li>
              );
            })}
            {inbound.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-[var(--md-secondary)]">{t.noInbound}</li>
            )}
          </ul>
        </MdPanel>

        {/* (f) Recent operational events */}
        <MdPanel>
          <MdPanelHeader title={t.events} />
          <ul className="divide-y divide-[var(--md-border)]">
            {data.events.map((event) => {
              const Icon = EVENT_ICON[event.kind];
              return (
                <li key={event.id} className="flex gap-2.5 px-4 py-2.5">
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={`mt-0.5 shrink-0 ${EVENT_INK[event.kind] ?? "text-[var(--md-secondary)]"}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug">{event.summary}</p>
                    <p className="mt-0.5 text-xs text-[var(--md-secondary)]">
                      {formatDaysAgo(event.daysAgo, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </MdPanel>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  warn = false,
}: {
  label: string;
  value: string;
  sub: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] px-4 py-3.5 shadow-[0_1px_2px_rgba(37,49,59,0.05)]">
      <p className="text-xs font-medium text-[var(--md-secondary)]">{label}</p>
      <p
        className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${
          warn ? "text-[var(--md-warn-text)]" : "text-[var(--md-ink)]"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-[var(--md-secondary)]">{sub}</p>
    </div>
  );
}
