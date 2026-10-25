"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Boxes, CheckCircle2, Layers3, Truck, Warehouse } from "lucide-react";
import { cn } from "@/lib/cn";
import { availability, useMeridian } from "@/lib/showcases/meridian/store";
import { formatQty } from "@/lib/showcases/meridian/format";
import {
  MdButton,
  MdDrawer,
  MdInput,
  MdKV,
  MdMono,
  MdPanel,
  MdPanelHeader,
  MdSelect,
  MdSortHeader,
  StatusChip,
} from "../primitives";

/**
 * View 3 — Inventory Control (handoff §2A). SKU stock table with facility
 * filter, per-row low-stock status derived from fixture values, a per-SKU
 * detail drawer, and an internal transfer simulation validated against
 * available inventory. Every figure derives from the shared store.
 */

interface InventoryCopy {
  title: string;
  subtitle: string;
  kpiSkus: string;
  kpiLow: string;
  kpiUnits: string;
  facilityLabel: string;
  allFacilities: string;
  columns: {
    warehouse: string;
    sku: string;
    item: string;
    onHand: string;
    committed: string;
    available: string;
    reorder: string;
    status: string;
  };
  statusLow: string;
  statusHealthy: string;
  details: string;
  resultCount: string;
  empty: string;
  closeSku: string;
  kvName: string;
  kvCategory: string;
  kvUnit: string;
  byWarehouse: string;
  totals: string;
  transferTitle: string;
  skuLabel: string;
  skuPlaceholder: string;
  fromLabel: string;
  toLabel: string;
  warehousePlaceholder: string;
  qtyLabel: string;
  transfer: string;
  availableAt: (name: string) => string;
  errSku: string;
  errWarehouse: string;
  errSame: string;
  errQty: string;
  errExceeds: (name: string, available: number) => string;
  success: (qty: number, sku: string, fromCode: string, toCode: string) => string;
}

const COPY: Record<"en" | "vi", InventoryCopy> = {
  en: {
    title: "Inventory Control",
    subtitle:
      "Track stock across facilities, watch reorder thresholds, and simulate internal transfers.",
    kpiSkus: "SKUs tracked",
    kpiLow: "Low-stock lines",
    kpiUnits: "Units on hand",
    facilityLabel: "Facility",
    allFacilities: "All facilities",
    columns: {
      warehouse: "Warehouse",
      sku: "SKU",
      item: "Item",
      onHand: "On hand",
      committed: "Committed",
      available: "Available",
      reorder: "Reorder point",
      status: "Status",
    },
    statusLow: "Low",
    statusHealthy: "Healthy",
    details: "Details",
    resultCount: "stock rows",
    empty: "No stock rows match the current filter.",
    closeSku: "Close SKU details",
    kvName: "Item",
    kvCategory: "Category",
    kvUnit: "Unit",
    byWarehouse: "By warehouse",
    totals: "Totals",
    transferTitle: "Stock transfer",
    skuLabel: "SKU",
    skuPlaceholder: "Select SKU",
    fromLabel: "From warehouse",
    toLabel: "To warehouse",
    warehousePlaceholder: "Select warehouse",
    qtyLabel: "Quantity",
    transfer: "Transfer",
    availableAt: (name) => `Available at ${name}:`,
    errSku: "Select a SKU to transfer.",
    errWarehouse: "Select both warehouses.",
    errSame: "Source and destination warehouses must be different.",
    errQty: "Enter a whole quantity of 1 or more.",
    errExceeds: (name, available) =>
      `Quantity exceeds availability at ${name} (${available} available).`,
    success: (qty, sku, fromCode, toCode) => `Transferred ${qty} × ${sku} ${fromCode} → ${toCode}`,
  },
  vi: {
    title: "Quản lý tồn kho",
    subtitle:
      "Theo dõi tồn kho theo từng kho, canh chừng ngưỡng đặt lại và mô phỏng chuyển kho nội bộ.",
    kpiSkus: "SKU đang theo dõi",
    kpiLow: "Dòng tồn thấp",
    kpiUnits: "Tổng tồn kho",
    facilityLabel: "Kho",
    allFacilities: "Tất cả kho",
    columns: {
      warehouse: "Kho",
      sku: "SKU",
      item: "Mặt hàng",
      onHand: "Tồn kho",
      committed: "Đã giữ",
      available: "Khả dụng",
      reorder: "Ngưỡng đặt lại",
      status: "Trạng thái",
    },
    statusLow: "Thấp",
    statusHealthy: "Bình thường",
    details: "Chi tiết",
    resultCount: "dòng tồn kho",
    empty: "Không có dòng tồn kho nào khớp bộ lọc hiện tại.",
    closeSku: "Đóng chi tiết SKU",
    kvName: "Mặt hàng",
    kvCategory: "Nhóm hàng",
    kvUnit: "Đơn vị tính",
    byWarehouse: "Theo kho",
    totals: "Tổng cộng",
    transferTitle: "Chuyển kho",
    skuLabel: "SKU",
    skuPlaceholder: "Chọn SKU",
    fromLabel: "Từ kho",
    toLabel: "Đến kho",
    warehousePlaceholder: "Chọn kho",
    qtyLabel: "Số lượng",
    transfer: "Chuyển",
    availableAt: (name) => `Khả dụng tại ${name}:`,
    errSku: "Chọn SKU cần chuyển.",
    errWarehouse: "Chọn đủ kho xuất và kho đến.",
    errSame: "Kho xuất và kho đến phải khác nhau.",
    errQty: "Nhập số lượng nguyên từ 1 trở lên.",
    errExceeds: (name, available) =>
      `Số lượng vượt quá tồn khả dụng tại ${name} (chỉ còn ${available}).`,
    success: (qty, sku, fromCode, toCode) => `Đã chuyển ${qty} × ${sku} ${fromCode} → ${toCode}`,
  },
};

type SortKey = "sku" | "available";
type SortDir = "asc" | "desc";

function KpiCard({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: "neutral" | "amber";
}) {
  return (
    <div className="rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] px-3.5 py-3">
      <div className="flex items-center gap-1.5 text-[var(--md-secondary)]">
        {icon}
        <p className="text-[11px] font-semibold uppercase tracking-wider">{label}</p>
      </div>
      <p
        className={cn(
          "mt-1 font-mono text-xl font-semibold tabular-nums",
          tone === "amber" ? "text-[var(--md-warn-text)]" : "text-[var(--md-ink)]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
        {children}
      </span>
    </th>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="text-xs text-[var(--md-secondary)]">{label}</dt>
      <dd>
        <MdMono className="text-xs font-medium">{value}</MdMono>
      </dd>
    </div>
  );
}

export function InventoryView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, skuById, warehouseById, stockRow, transferStock } = useMeridian();
  const [facility, setFacility] = useState<string>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "sku", dir: "asc" });
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null);
  const [sku, setSku] = useState("");
  const [fromWh, setFromWh] = useState("");
  const [toWh, setToWh] = useState("");
  const [qty, setQty] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const facilitySelectId = useId();
  const skuSelectId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();
  const qtyInputId = useId();

  const rows = useMemo(() => {
    const filtered = data.stock
      .filter((r) => facility === "all" || r.warehouseId === facility)
      .map((r) => ({ row: r, available: availability(r) }));
    return [...filtered].sort((a, b) => {
      const cmp =
        sort.key === "sku" ? a.row.skuId.localeCompare(b.row.skuId) : a.available - b.available;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [data.stock, facility, sort]);

  const lowCount = rows.filter((r) => r.available < r.row.reorderPoint).length;
  const skuCount = new Set(rows.map((r) => r.row.skuId)).size;
  const unitsOnHand = rows.reduce((sum, r) => sum + r.row.onHand, 0);

  const selectedSku = selectedSkuId ? skuById(selectedSkuId) : undefined;
  const skuRows = selectedSkuId
    ? data.stock
        .filter((r) => r.skuId === selectedSkuId)
        .map((r) => ({ row: r, available: availability(r) }))
    : [];
  const totals = skuRows.reduce(
    (acc, r) => ({
      onHand: acc.onHand + r.row.onHand,
      committed: acc.committed + r.row.committed,
      available: acc.available + r.available,
      reorder: acc.reorder + r.row.reorderPoint,
    }),
    { onHand: 0, committed: 0, available: 0, reorder: 0 }
  );
  const totalsLow = totals.available < totals.reorder;

  const transferSource = sku && fromWh ? stockRow(sku, fromWh) : undefined;
  const transferSourceWarehouse = fromWh ? warehouseById(fromWh) : undefined;

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  const onSubmitTransfer = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    const nextErrors: string[] = [];
    const parsedQty = qty.trim() === "" ? Number.NaN : Number(qty);
    const validQty = Number.isInteger(parsedQty) && parsedQty >= 1;
    if (!sku) nextErrors.push(t.errSku);
    if (!fromWh || !toWh) nextErrors.push(t.errWarehouse);
    if (fromWh && toWh && fromWh === toWh) nextErrors.push(t.errSame);
    if (!validQty) {
      nextErrors.push(t.errQty);
    } else if (sku && fromWh && fromWh !== toWh) {
      const source = stockRow(sku, fromWh);
      if (!source || availability(source) < parsedQty) {
        nextErrors.push(t.errExceeds(warehouseById(fromWh)?.name ?? fromWh, source ? availability(source) : 0));
      }
    }
    setErrors(nextErrors);
    if (nextErrors.length > 0 || !validQty || !sku || !fromWh || !toWh) return;
    transferStock(sku, fromWh, toWh, parsedQty);
    setSuccess(
      t.success(
        parsedQty,
        sku,
        warehouseById(fromWh)?.code ?? fromWh,
        warehouseById(toWh)?.code ?? toWh
      )
    );
    setQty("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--md-secondary)]">{t.subtitle}</p>
      </div>

      {/* KPI strip — derived from the filtered stock rows */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard
          icon={<Boxes size={14} strokeWidth={1.75} aria-hidden="true" />}
          label={t.kpiSkus}
          value={formatQty(skuCount)}
        />
        <KpiCard
          icon={<Layers3 size={14} strokeWidth={1.75} aria-hidden="true" />}
          label={t.kpiLow}
          value={formatQty(lowCount)}
          tone={lowCount > 0 ? "amber" : "neutral"}
        />
        <KpiCard
          icon={<Warehouse size={14} strokeWidth={1.75} aria-hidden="true" />}
          label={t.kpiUnits}
          value={formatQty(unitsOnHand)}
        />
      </div>

      {/* Stock table */}
      <MdPanel>
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--md-border)] px-4 py-3">
          <MdSelect
            id={facilitySelectId}
            aria-label={t.facilityLabel}
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="min-w-[12rem]"
          >
            <option value="all">{t.allFacilities}</option>
            {data.warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </MdSelect>
          <span className="ml-auto whitespace-nowrap font-mono text-xs tabular-nums text-[var(--md-secondary)]">
            {rows.length} / {data.stock.length} {t.resultCount}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--md-border)]">
                {facility === "all" && <Th>{t.columns.warehouse}</Th>}
                <th className="px-4 py-1.5">
                  <MdSortHeader
                    label={t.columns.sku}
                    active={sort.key === "sku"}
                    direction={sort.dir}
                    onClick={() => toggleSort("sku")}
                  />
                </th>
                <Th>{t.columns.item}</Th>
                <Th>{t.columns.onHand}</Th>
                <Th>{t.columns.committed}</Th>
                <th className="px-4 py-1.5">
                  <MdSortHeader
                    label={t.columns.available}
                    active={sort.key === "available"}
                    direction={sort.dir}
                    onClick={() => toggleSort("available")}
                  />
                </th>
                <Th>{t.columns.reorder}</Th>
                <Th>{t.columns.status}</Th>
                <th className="px-4 py-1.5">
                  <span className="sr-only">{t.details}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--md-border)]">
              {rows.map(({ row, available }) => {
                const item = skuById(row.skuId);
                const wh = warehouseById(row.warehouseId);
                const low = available < row.reorderPoint;
                return (
                  <tr
                    key={`${row.skuId}-${row.warehouseId}`}
                    className="transition-colors hover:bg-[var(--md-canvas)]"
                  >
                    {facility === "all" && (
                      <td className="px-4 py-2">
                        <MdMono className="text-xs font-semibold">{wh?.code}</MdMono>
                        <span className="block text-xs text-[var(--md-secondary)]">
                          {wh?.location}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-2">
                      <MdMono className="text-xs font-semibold">{row.skuId}</MdMono>
                    </td>
                    <td className="px-4 py-2">{item?.name}</td>
                    <td className="px-4 py-2">
                      <MdMono className="text-xs">{formatQty(row.onHand)}</MdMono>
                    </td>
                    <td className="px-4 py-2">
                      <MdMono className="text-xs">{formatQty(row.committed)}</MdMono>
                    </td>
                    <td className="px-4 py-2">
                      <MdMono className="text-xs font-semibold">{formatQty(available)}</MdMono>
                    </td>
                    <td className="px-4 py-2">
                      <MdMono className="text-xs">{formatQty(row.reorderPoint)}</MdMono>
                    </td>
                    <td className="px-4 py-2">
                      <StatusChip tone={low ? "amber" : "green"}>
                        {low ? t.statusLow : t.statusHealthy}
                      </StatusChip>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSkuId(row.skuId)}
                        aria-label={`View SKU ${row.skuId}`}
                        className="inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-medium text-[var(--md-accent)] underline-offset-2 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)]"
                      >
                        {t.details}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={facility === "all" ? 9 : 8}
                    className="px-4 py-8 text-center text-sm text-[var(--md-secondary)]"
                  >
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MdPanel>

      {/* Transfer simulation */}
      <MdPanel>
        <MdPanelHeader
          title={t.transferTitle}
          action={<Truck size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--md-secondary)]" />}
        />
        <form noValidate onSubmit={onSubmitTransfer} className="px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label={t.skuLabel} htmlFor={skuSelectId}>
              <MdSelect id={skuSelectId} value={sku} onChange={(e) => setSku(e.target.value)}>
                <option value="">{t.skuPlaceholder}</option>
                {data.skus.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} — {s.name}
                  </option>
                ))}
              </MdSelect>
            </Field>
            <Field label={t.fromLabel} htmlFor={fromSelectId}>
              <MdSelect id={fromSelectId} value={fromWh} onChange={(e) => setFromWh(e.target.value)}>
                <option value="">{t.warehousePlaceholder}</option>
                {data.warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} — {w.name}
                  </option>
                ))}
              </MdSelect>
            </Field>
            <Field label={t.toLabel} htmlFor={toSelectId}>
              <MdSelect id={toSelectId} value={toWh} onChange={(e) => setToWh(e.target.value)}>
                <option value="">{t.warehousePlaceholder}</option>
                {data.warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} — {w.name}
                  </option>
                ))}
              </MdSelect>
            </Field>
            <Field label={t.qtyLabel} htmlFor={qtyInputId}>
              <MdInput
                id={qtyInputId}
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="0"
              />
            </Field>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <MdButton type="submit" variant="primary">
              {t.transfer}
            </MdButton>
            {transferSource && transferSourceWarehouse && (
              <span className="text-sm text-[var(--md-secondary)]">
                {t.availableAt(transferSourceWarehouse.name)}{" "}
                <MdMono className="font-medium text-[var(--md-ink)]">
                  {formatQty(availability(transferSource))}
                </MdMono>
              </span>
            )}
          </div>

          {errors.length > 0 && (
            <div role="alert" className="mt-3 flex flex-col gap-1">
              {errors.map((message) => (
                <p key={message} className="text-sm text-[var(--md-error-text)]">
                  {message}
                </p>
              ))}
            </div>
          )}
          {success && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-[var(--md-ok-text)]">
              <CheckCircle2 size={15} strokeWidth={1.75} aria-hidden="true" />
              {success}
            </p>
          )}
        </form>
      </MdPanel>

      {/* SKU detail drawer */}
      <MdDrawer
        open={!!selectedSku}
        onClose={() => setSelectedSkuId(null)}
        title={selectedSku?.id ?? ""}
        closeLabel={t.closeSku}
      >
        {selectedSku && (
          <div className="flex flex-col gap-4">
            <dl className="flex flex-col divide-y divide-[var(--md-border)]">
              <MdKV label={t.kvName}>{selectedSku.name}</MdKV>
              <MdKV label={t.kvCategory}>{selectedSku.category}</MdKV>
              <MdKV label={t.kvUnit}>{selectedSku.unit}</MdKV>
            </dl>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                {t.byWarehouse}
              </h4>
              <div className="mt-2 flex flex-col gap-2">
                {skuRows.map(({ row, available }) => {
                  const wh = warehouseById(row.warehouseId);
                  const low = available < row.reorderPoint;
                  return (
                    <div key={row.warehouseId} className="rounded-md border border-[var(--md-border)] px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{wh?.name}</p>
                          <p className="text-xs text-[var(--md-secondary)]">
                            <MdMono>{wh?.code}</MdMono> {wh?.location}
                          </p>
                        </div>
                        <StatusChip tone={low ? "amber" : "green"}>
                          {low ? t.statusLow : t.statusHealthy}
                        </StatusChip>
                      </div>
                      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                        <MiniStat label={t.columns.onHand} value={formatQty(row.onHand)} />
                        <MiniStat label={t.columns.committed} value={formatQty(row.committed)} />
                        <MiniStat label={t.columns.available} value={formatQty(available)} />
                        <MiniStat label={t.columns.reorder} value={formatQty(row.reorderPoint)} />
                      </dl>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-md bg-[var(--md-canvas)] px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                  {t.totals}
                </h4>
                <StatusChip tone={totalsLow ? "amber" : "green"}>
                  {totalsLow ? t.statusLow : t.statusHealthy}
                </StatusChip>
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                <MiniStat label={t.columns.onHand} value={formatQty(totals.onHand)} />
                <MiniStat label={t.columns.committed} value={formatQty(totals.committed)} />
                <MiniStat label={t.columns.available} value={formatQty(totals.available)} />
                <MiniStat label={t.columns.reorder} value={formatQty(totals.reorder)} />
              </dl>
            </div>
          </div>
        )}
      </MdDrawer>
    </div>
  );
}
