"use client";

import { Flame } from "lucide-react";
import { pick } from "@/lib/showcases/care/format";
import { useCare } from "@/lib/showcases/care/store";
import { CcCard, CcChip, CcLabel, CcMedicationRow, CcWeekBars } from "../primitives";

/**
 * View 3 — Medications: today's schedule with taken-state toggles and an
 * adherence streak as a plain consecutive-day count (no outcome framing),
 * with the compact weekly chart (Blueprint B).
 */

export function MedicationsView({ locale }: { locale: "en" | "vi" }) {
  const { data, todayDoses, toggleDose, streakFor } = useCare();
  const doses = todayDoses();
  const takenCount = doses.filter((entry) => entry.dose.taken).length;
  const allTaken = doses.length > 0 && takenCount === doses.length;
  // Overall streak: the medication with the shortest run gates the streak.
  const streak = data.medications.length
    ? Math.min(...data.medications.map((med) => streakFor(med)))
    : 0;
  const pastDoses = data.medications[0]?.weekHistory.map(
    (_, i) => data.medications.reduce((sum, med) => sum + (med.weekHistory[i] ?? 0), 0)
  ) ?? [];

  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--cc-ink)]">
          {locale === "vi" ? "Lịch thuốc hôm nay" : "Today's schedule"}
        </h2>
        <p className="mt-0.5 text-xs text-[var(--cc-secondary)]">
          {locale === "vi"
            ? `${takenCount}/${doses.length} liều đã uống`
            : `${takenCount} of ${doses.length} doses taken`}
        </p>
      </div>

      <CcCard>
        <div className="flex items-center justify-between gap-2">
          <CcLabel>{locale === "vi" ? "Liều theo giờ" : "Scheduled doses"}</CcLabel>
          <CcChip tone={allTaken ? "neutral" : "accent"}>
            {allTaken
              ? locale === "vi"
                ? "Đủ hôm nay"
                : "All done today"
              : locale === "vi"
                ? `${doses.length - takenCount} còn lại`
                : `${doses.length - takenCount} left`}
          </CcChip>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {doses.map(({ medication, dose }) => (
            <CcMedicationRow
              key={dose.id}
              medication={medication}
              dose={dose}
              locale={locale}
              onToggle={() => toggleDose(medication.id, dose.id)}
            />
          ))}
        </div>
      </CcCard>

      <CcCard>
        <div className="flex items-center justify-between gap-2">
          <CcLabel>{locale === "vi" ? "Duy trì đều đặn" : "Staying on track"}</CcLabel>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--cc-accent-soft)] px-2.5 py-1 text-[13px] font-bold tabular-nums text-[var(--cc-accent)]">
            <Flame size={13} strokeWidth={2} aria-hidden="true" />
            {streak}
          </span>
        </div>
        <p className="mt-2 text-xs leading-snug text-[var(--cc-secondary)]">
          {locale === "vi"
            ? `${streak} ngày liên tiếp uống đủ liều. Hoàn thành các liều hôm nay để kéo dài chuỗi ngày.`
            : `${streak} consecutive days with every dose taken. Complete today's doses to keep the streak going.`}
        </p>
        <CcWeekBars
          past={pastDoses}
          todayValue={takenCount}
          max={doses.length}
          locale={locale}
          ariaLabel={
            locale === "vi" ? "Liều đã uống 7 ngày qua" : "Doses taken over the last 7 days"
          }
          className="mt-3"
        />
      </CcCard>

      <CcCard>
        <CcLabel>{locale === "vi" ? "Thông tin thuốc" : "Medication details"}</CcLabel>
        <ul className="mt-2 flex flex-col divide-y divide-[var(--cc-border)]">
          {data.medications.map((med) => (
            <li key={med.id} className="flex items-baseline justify-between gap-3 py-2">
              <span className="text-sm font-semibold text-[var(--cc-ink)]">{med.name}</span>
              <span className="text-right text-xs text-[var(--cc-secondary)]">
                {pick(med.dosage, locale)} · {pick(med.instruction, locale)}
              </span>
            </li>
          ))}
        </ul>
      </CcCard>
    </div>
  );
}
