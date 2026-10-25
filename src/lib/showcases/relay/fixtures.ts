import type { RelayData, RelayJob, RelayTechnician } from "./types";

/**
 * Synthetic field-service dataset (Wave 2D handoff §2D): six maintenance
 * visits across three technicians on the fixed demo day. RF-2408 is the
 * handoff's verbatim example work order. No GPS/camera/network behaviour —
 * photo attachments are labeled placeholders and the offline queue is a
 * simulated demonstration.
 */

export const RELAY_TECHS: RelayTechnician[] = [
  { id: "tech-taylor", name: "Taylor Lee", role: { en: "Senior technician", vi: "Kỹ thuật viên chính" } },
  { id: "tech-jordan", name: "Jordan Reyes", role: { en: "HVAC specialist", vi: "Chuyên viên HVAC" } },
  { id: "tech-sam", name: "Sam Nguyen", role: { en: "Field technician", vi: "Kỹ thuật viên hiện trường" } },
];

export const RELAY_JOBS: RelayJob[] = [
  {
    id: "RF-2408",
    customer: "Oakridge Business Center",
    site: "Oakridge Business Center — Building A",
    address: "4120 Oakridge Parkway",
    task: { en: "HVAC preventive inspection", vi: "Bảo trì phòng thủ hệ thống HVAC" },
    techId: "tech-taylor",
    startMinutes: 9 * 60,
    endMinutes: 10 * 60 + 30,
    status: "in-progress",
    checklist: [
      { id: "chk-serial", label: { en: "Confirm equipment serial number", vi: "Xác nhận số serial thiết bị" }, done: true },
      { id: "chk-filters", label: { en: "Inspect air filters", vi: "Kiểm tra lọc khí" }, done: true },
      { id: "chk-readings", label: { en: "Record system readings", vi: "Ghi nhận thông số hệ thống" }, done: false },
      { id: "chk-noise", label: { en: "Review unusual noise or vibration", vi: "Rà soát tiếng ồn hoặc rung động bất thường" }, done: false },
      { id: "chk-notes", label: { en: "Complete visit notes", vi: "Hoàn tất ghi chú cuộc hẹn" }, done: false },
    ],
    notes: [
      {
        id: "note-2408-1",
        author: "Taylor Lee",
        minutesAgo: 18,
        text: {
          en: "Rooftop unit RT-2 serial matches the work order. Filters are original; replacing on the next visit.",
          vi: "Dàn nóng RT-2 khớp serial trong phiếu công việc. Lọc khí là bản gốc; sẽ thay trong lần hẹn sau.",
        },
      },
    ],
    photos: [
      { id: "photo-2408-1", label: { en: "Nameplate photo", vi: "Ảnh tem thông số" }, attached: true },
      { id: "photo-2408-2", label: { en: "Filter condition photo", vi: "Ảnh tình trạng lọc khí" }, attached: false },
    ],
  },
  {
    id: "RF-2409",
    customer: "Cedarline Apartments",
    site: "Cedarline Apartments — Unit 12B",
    address: "88 Cedarline Road",
    task: { en: "Water heater replacement check", vi: "Kiểm tra thay thế bình nước nóng" },
    techId: "tech-taylor",
    startMinutes: 11 * 60,
    endMinutes: 12 * 60 + 30,
    status: "scheduled",
    checklist: [
      { id: "chk-model", label: { en: "Verify replacement model number", vi: "Đối chiếu mã model thay thế" }, done: false },
      { id: "chk-shutoff", label: { en: "Test shutoff valve", vi: "Thử van ngắt" }, done: false },
      { id: "chk-leaks", label: { en: "Inspect for leaks after install", vi: "Kiểm tra rò rỉ sau lắp đặt" }, done: false },
      { id: "chk-notes2", label: { en: "Complete visit notes", vi: "Hoàn tất ghi chú cuộc hẹn" }, done: false },
    ],
    notes: [],
    photos: [{ id: "photo-2409-1", label: { en: "Installation photo", vi: "Ảnh lắp đặt" }, attached: false }],
  },
  {
    id: "RF-2410",
    customer: "Harborview Medical Annex",
    site: "Harborview Medical Annex — Wing C",
    address: "210 Harborview Drive",
    task: { en: "Air quality sensor audit", vi: "Kiểm toán cảm biến chất lượng không khí" },
    techId: "tech-jordan",
    startMinutes: 8 * 60,
    endMinutes: 9 * 60 + 30,
    status: "complete",
    checklist: [
      { id: "chk-cal", label: { en: "Calibrate CO2 sensors", vi: "Hiệu chuẩn cảm biến CO2" }, done: true },
      { id: "chk-log", label: { en: "Download sensor logs", vi: "Tải nhật ký cảm biến" }, done: true },
      { id: "chk-report", label: { en: "Flag out-of-range readings", vi: "Đánh dấu chỉ số ngoài ngưỡng" }, done: true },
      { id: "chk-notes3", label: { en: "Complete visit notes", vi: "Hoàn tất ghi chú cuộc hẹn" }, done: true },
    ],
    notes: [
      {
        id: "note-2410-1",
        author: "Jordan Reyes",
        minutesAgo: 95,
        text: {
          en: "All 12 sensors calibrated. Two readings were out of range and are flagged for the facilities team.",
          vi: "Cả 12 cảm biến đã hiệu chuẩn. Hai chỉ số ngoài ngưỡng đã được đánh dấu cho bộ phận vận hành tòa nhà.",
        },
      },
    ],
    photos: [{ id: "photo-2410-1", label: { en: "Sensor panel photo", vi: "Ảnh tủ cảm biến" }, attached: true }],
  },
  {
    id: "RF-2411",
    customer: "Mapleton Retail Store",
    site: "Mapleton Retail Store — Back of house",
    address: "15 Mapleton Square",
    task: { en: "Refrigeration compressor service", vi: "Bảo trì máy nén hệ thống lạnh" },
    techId: "tech-jordan",
    startMinutes: 13 * 60,
    endMinutes: 14 * 60 + 30,
    status: "scheduled",
    checklist: [
      { id: "chk-pressure", label: { en: "Record pressure readings", vi: "Ghi nhận thông số áp suất" }, done: false },
      { id: "chk-coil", label: { en: "Clean condenser coil", vi: "Vệ sinh dàn ngưng" }, done: false },
      { id: "chk-temps", label: { en: "Verify cabinet temperature recovery", vi: "Kiểm tra khả năng phục hồi nhiệt tủ" }, done: false },
    ],
    notes: [],
    photos: [],
  },
  {
    id: "RF-2412",
    customer: "Brookfield Elementary",
    site: "Brookfield Elementary — Boiler room",
    address: "300 Brookfield Avenue",
    task: { en: "Boiler annual inspection", vi: "Kiểm định lò hơi hàng năm" },
    techId: "tech-sam",
    startMinutes: 8 * 60 + 30,
    endMinutes: 10 * 60,
    status: "in-progress",
    checklist: [
      { id: "chk-license", label: { en: "Confirm inspection license on site", vi: "Xác nhận giấy phép kiểm định tại chỗ" }, done: true },
      { id: "chk-flue", label: { en: "Inspect flue and venting", vi: "Kiểm tra ống khói và hệ thống xả" }, done: true },
      { id: "chk-safety", label: { en: "Test safety controls", vi: "Thử các thiết bị an toàn" }, done: false },
      { id: "chk-log2", label: { en: "Log results in compliance sheet", vi: "Ghi kết quả vào phiếu tuân thủ" }, done: false },
    ],
    notes: [
      {
        id: "note-2412-1",
        author: "Sam Nguyen",
        minutesAgo: 32,
        text: {
          en: "Flue draft is within spec. Waiting on the caretaker to unlock the control room for safety tests.",
          vi: "Luc hút ống khói đạt chuẩn. Đang chờ người trông nom mở phòng điều khiển để thử thiết bị an toàn.",
        },
      },
    ],
    photos: [{ id: "photo-2412-1", label: { en: "Flue photo", vi: "Ảnh ống khói" }, attached: true }],
  },
  {
    id: "RF-2413",
    customer: "Stonegate Office Park",
    site: "Stonegate Office Park — Building D",
    address: "77 Stonegate Circle",
    task: { en: "Electrical panel preventive check", vi: "Bảo trì phòng thủ tủ điện" },
    techId: "tech-sam",
    startMinutes: 15 * 60,
    endMinutes: 16 * 60 + 30,
    status: "scheduled",
    checklist: [
      { id: "chk-thermal", label: { en: "Thermal scan of breakers", vi: "Quét nhiệt các aptomat" }, done: false },
      { id: "chk-torque", label: { en: "Check terminal torque", vi: "Kiểm tra moment siết đầu cột" }, done: false },
      { id: "chk-label", label: { en: "Verify panel labeling", vi: "Đối chiếu nhãn tủ điện" }, done: false },
    ],
    notes: [],
    photos: [],
  },
];

/**
 * Seeded offline queue: actions recorded before the demo session started.
 * New checklist/note/status actions append here during the demo; the
 * simulated sync clears them (handoff: clearly labeled simulation).
 */
export const RELAY_SEED_SYNC_QUEUE = [
  {
    id: "sync-seed-1",
    kind: "checklist" as const,
    label: {
      en: "Checklist update · RF-2412 · Flue and venting inspected",
      vi: "Cập nhật danh sách kiểm tra · RF-2412 · Đã kiểm tra ống khói",
    },
    minutesAgo: 34,
  },
  {
    id: "sync-seed-2",
    kind: "status" as const,
    label: {
      en: "Status change · RF-2410 · Marked complete",
      vi: "Thay đổi trạng thái · RF-2410 · Đánh dấu hoàn tất",
    },
    minutesAgo: 61,
  },
];

export function buildRelaySeed(): RelayData {
  return {
    techs: structuredClone(RELAY_TECHS),
    jobs: structuredClone(RELAY_JOBS),
    syncQueue: structuredClone(RELAY_SEED_SYNC_QUEUE),
    lastSyncedMinutesAgo: 35,
  };
}
