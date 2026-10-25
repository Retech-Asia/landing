"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useMeridian, poAmount, lineTotal } from "@/lib/showcases/meridian/store";
import {
  dateDaysFromNow,
  formatCurrency,
  formatDaysAgo,
  formatDueIn,
  formatQty,
  formatShortDate,
} from "@/lib/showcases/meridian/format";
import type { PoStatus, PurchaseOrder } from "@/lib/showcases/meridian/types";
import {
  MdAvatar,
  MdButton,
  MdDrawer,
  MdInput,
  MdKV,
  MdMono,
  MdPanel,
  MdSelect,
  MdSortHeader,
  StatusChip,
} from "../primitives";

/**
 * View 2 — Purchase Orders (Wave 2A handoff §2A): search, supplier/status
 * filters, sortable compact table, and a line-item detail drawer. Amounts are
 * always computed via poAmount/lineTotal from the shared store.
 */

const STATUS_ORDER: PoStatus[] = [
  "awaiting_approval",
  "approved",
  "in_transit",
  "received",
  "rejected",
];

type ColKey = "number" | "supplier" | "warehouse" | "amount" | "status" | "requested" | "expected";
type SortKey = "number" | "amount" | "requested" | "expected";
type SortDir = "asc" | "desc";

const STATUS_TONE: Record<PoStatus, "amber" | "green" | "blue" | "neutral" | "red"> = {
  awaiting_approval: "amber",
  approved: "green",
  in_transit: "blue",
  received: "neutral",
  rejected: "red",
};

const COPY = {
  en: {
    searchAria: "Search purchase orders",
    searchPlaceholder: "Search PO, supplier, or item…",
    allSuppliers: "All suppliers",
    allStatuses: "All statuses",
    supplierLabel: "Supplier",
    statusLabel: "Status",
    columns: {
      number: "PO Number",
      supplier: "Supplier",
      warehouse: "Warehouse",
      amount: "Amount",
      status: "Status",
      requested: "Requested By",
      expected: "Expected Delivery",
    } as Record<ColKey, string>,
    statusLabels: {
      awaiting_approval: "Awaiting approval",
      approved: "Approved",
      in_transit: "In transit",
      received: "Received",
      rejected: "Rejected",
    } as Record<PoStatus, string>,
    resultCount: "POs",
    empty: "No purchase orders match your filters.",
    view: "View",
    viewAria: "View purchase order",
    closeDetails: "Close purchase order details",
    reasonLabel: "Reason",
    leadTimeLabel: "Lead time",
    ageLabel: "Requested",
    descCol: "Description",
    qtyCol: "Qty",
    unitCol: "Unit price",
    lineCol: "Line total",
    totalLabel: "Total",
    days: "days",
  },
  vi: {
    searchAria: "Tìm kiếm đơn hàng",
    searchPlaceholder: "Tìm đơn, nhà cung cấp, hoặc sản phẩm…",
    allSuppliers: "Tất cả nhà cung cấp",
    allStatuses: "Tất cả trạng thái",
    supplierLabel: "Nhà cung cấp",
    statusLabel: "Trạng thái",
    columns: {
      number: "Số đơn hàng",
      supplier: "Nhà cung cấp",
      warehouse: "Kho",
      amount: "Giá trị",
      status: "Trạng thái",
      requested: "Người yêu cầu",
      expected: "Dự kiến nhận",
    } as Record<ColKey, string>,
    statusLabels: {
      awaiting_approval: "Chờ phê duyệt",
      approved: "Đã phê duyệt",
      in_transit: "Đang vận chuyển",
      received: "Đã nhận hàng",
      rejected: "Đã từ chối",
    } as Record<PoStatus, string>,
    resultCount: "đơn hàng",
    empty: "Không có đơn mua hàng nào khớp bộ lọc.",
    view: "Xem",
    viewAria: "Xem đơn hàng",
    closeDetails: "Đóng chi tiết đơn hàng",
    reasonLabel: "Lý do",
    leadTimeLabel: "Thời gian giao",
    ageLabel: "Đã yêu cầu",
    descCol: "Mô tả",
    qtyCol: "Số lượng",
    unitCol: "Đơn giá",
    lineCol: "Thành tiền",
    totalLabel: "Tổng cộng",
    days: "ngày",
  },
};

export function PurchasingView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, supplierById, warehouseById, staffById, poByNumber } = useMeridian();
  const [query, setQuery] = useState("");
  const [supplierFilter, setSupplierFilter] = useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | PoStatus>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "number", dir: "asc" });
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = data.purchaseOrders.filter((po) => {
      if (supplierFilter !== "all" && po.supplierId !== supplierFilter) return false;
      if (statusFilter !== "all" && po.status !== statusFilter) return false;
      if (!q) return true;
      const supplierName = data.suppliers.find((s) => s.id === po.supplierId)?.name ?? "";
      return (
        po.number.toLowerCase().includes(q) ||
        supplierName.toLowerCase().includes(q) ||
        po.lines.some((line) => line.description.toLowerCase().includes(q))
      );
    });
    const sortValue = (po: PurchaseOrder): number | string => {
      switch (sort.key) {
        case "number":
          return po.number;
        case "amount":
          return poAmount(po);
        case "requested":
          return po.requestedDaysAgo;
        case "expected":
          return po.expectedInDays;
      }
    };
    return [...filtered].sort((a, b) => {
      const av = sortValue(a);
      const bv = sortValue(b);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [data.purchaseOrders, data.suppliers, query, supplierFilter, statusFilter, sort]);

  const selected = selectedNumber ? poByNumber(selectedNumber) : undefined;

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  const sortProps = (key: SortKey) => ({
    label: t.columns[key],
    active: sort.key === key,
    direction: sort.dir,
    onClick: () => toggleSort(key),
  });

  return (
    <div className="flex flex-col gap-4">
      <MdPanel>
        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--md-border)] px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-secondary)]"
            />
            <MdInput
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchAria}
              className="pl-9"
            />
          </div>
          <MdSelect
            aria-label={t.supplierLabel}
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="min-w-[11rem]"
          >
            <option value="all">{t.allSuppliers}</option>
            {data.suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </MdSelect>
          <MdSelect
            aria-label={t.statusLabel}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | PoStatus)}
            className="min-w-[11rem]"
          >
            <option value="all">{t.allStatuses}</option>
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {t.statusLabels[status]}
              </option>
            ))}
          </MdSelect>
          <span className="ml-auto whitespace-nowrap font-mono text-xs tabular-nums text-[var(--md-secondary)]">
            {rows.length} / {data.purchaseOrders.length} {t.resultCount}
          </span>
        </div>

        {/* Purchase order table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--md-border)]">
                <th scope="col" className="px-4 py-1.5">
                  <MdSortHeader {...sortProps("number")} />
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                  {t.columns.supplier}
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                  {t.columns.warehouse}
                </th>
                <th scope="col" className="px-3 py-1.5 text-right">
                  <MdSortHeader {...sortProps("amount")} className="justify-end text-right" />
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                  {t.columns.status}
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <MdSortHeader {...sortProps("requested")} />
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <MdSortHeader {...sortProps("expected")} />
                </th>
                <th scope="col" className="px-4 py-1.5">
                  <span className="sr-only">{t.view}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--md-border)]">
              {rows.map((po) => {
                const supplier = supplierById(po.supplierId);
                const warehouse = warehouseById(po.warehouseId);
                const requester = staffById(po.requestedById);
                const late = po.expectedInDays < 0;
                return (
                  <tr key={po.number} className="transition-colors hover:bg-[var(--md-accent-soft)]/40">
                    <td className="px-4 py-2">
                      <MdMono className="text-[13px] font-semibold">{po.number}</MdMono>
                    </td>
                    <td className="px-3 py-2 text-[var(--md-secondary)]">{supplier?.name}</td>
                    <td className="px-3 py-2 text-[var(--md-secondary)]">{warehouse?.name}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right">
                      <MdMono className="font-medium">{formatCurrency(poAmount(po))}</MdMono>
                    </td>
                    <td className="px-3 py-2">
                      <StatusChip tone={STATUS_TONE[po.status]}>{t.statusLabels[po.status]}</StatusChip>
                    </td>
                    <td className="px-3 py-2">
                      {requester && (
                        <span className="inline-flex items-center gap-2">
                          <MdAvatar initials={requester.initials} hue={requester.hue} size={22} />
                          <span>{requester.name}</span>
                        </span>
                      )}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-2 ${
                        late ? "font-medium text-[var(--md-warn-text)]" : "text-[var(--md-secondary)]"
                      }`}
                    >
                      {formatShortDate(dateDaysFromNow(po.expectedInDays), locale)} ·{" "}
                      {formatDueIn(po.expectedInDays, locale)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <MdButton
                        variant="subtle"
                        onClick={() => setSelectedNumber(po.number)}
                        aria-label={`${t.viewAria} ${po.number}`}
                        className="px-2 font-medium"
                      >
                        {t.view}
                      </MdButton>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-[var(--md-secondary)]">
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MdPanel>

      {/* Purchase order detail drawer */}
      <MdDrawer
        open={selectedNumber !== null}
        onClose={() => setSelectedNumber(null)}
        title={selected?.number ?? ""}
        closeLabel={t.closeDetails}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <StatusChip tone={STATUS_TONE[selected.status]} className="self-start">
              {t.statusLabels[selected.status]}
            </StatusChip>
            <dl className="flex flex-col divide-y divide-[var(--md-border)]">
              <MdKV label={t.reasonLabel}>{selected.reason}</MdKV>
              <MdKV label={t.columns.supplier}>
                {supplierById(selected.supplierId)?.name}{" "}
                <span className="text-[var(--md-secondary)]">
                  ({supplierById(selected.supplierId)?.code})
                </span>
              </MdKV>
              <MdKV label={t.leadTimeLabel}>
                {`${supplierById(selected.supplierId)?.leadTimeDays ?? 0} ${t.days}`}
              </MdKV>
              <MdKV label={t.columns.warehouse}>
                {warehouseById(selected.warehouseId)?.name}{" "}
                <span className="text-[var(--md-secondary)]">
                  ({warehouseById(selected.warehouseId)?.code})
                </span>
              </MdKV>
              <MdKV label={t.columns.requested}>
                {(() => {
                  const requester = staffById(selected.requestedById);
                  return requester ? (
                    <span className="inline-flex items-center gap-2">
                      <MdAvatar initials={requester.initials} hue={requester.hue} size={22} />
                      {requester.name}
                    </span>
                  ) : null;
                })()}
              </MdKV>
              <MdKV label={t.ageLabel}>{formatDaysAgo(selected.requestedDaysAgo, locale)}</MdKV>
              <MdKV label={t.columns.expected}>
                {formatShortDate(dateDaysFromNow(selected.expectedInDays), locale)} ·{" "}
                {formatDueIn(selected.expectedInDays, locale)}
              </MdKV>
            </dl>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--md-border)]">
                    <th scope="col" className="py-1.5 pr-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                      {t.descCol}
                    </th>
                    <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                      {t.qtyCol}
                    </th>
                    <th scope="col" className="px-3 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                      {t.unitCol}
                    </th>
                    <th scope="col" className="py-1.5 pl-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                      {t.lineCol}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--md-border)]">
                  {selected.lines.map((line, index) => (
                    <tr key={`${line.skuId ?? "line"}-${index}`}>
                      <td className="py-2 pr-3">{line.description}</td>
                      <td className="px-3 py-2 text-right">
                        <MdMono className="text-[13px]">{formatQty(line.quantity)}</MdMono>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <MdMono className="text-[13px]">{formatCurrency(line.unitPrice)}</MdMono>
                      </td>
                      <td className="py-2 pl-3 text-right">
                        <MdMono className="text-[13px]">{formatCurrency(lineTotal(line))}</MdMono>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="py-2 pr-3 text-right text-[13px] font-semibold">
                      {t.totalLabel}
                    </td>
                    <td className="py-2 pl-3 text-right">
                      <MdMono className="text-sm font-bold">{formatCurrency(poAmount(selected))}</MdMono>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </MdDrawer>
    </div>
  );
}
