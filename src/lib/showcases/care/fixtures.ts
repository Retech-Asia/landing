import type {
  Appointment,
  CareData,
  CarePlanTemplate,
  CareTeamMember,
  Medication,
  PatientPersona,
  QuickReply,
  RosterPatient,
  ScheduleSlot,
  ThreadMessage,
} from "./types";

/**
 * Care Companion — deterministic fictional seed (Blueprint B handoff).
 * Warm, everyday ongoing-care data: gentle movement, hydration, medication
 * reminders and follow-up visits. Generic medication names, fictional people
 * and a fictional clinic; no efficacy claims, percentages or provider
 * identities anywhere. `buildCareSeed()` clones the module fixtures so reset
 * always returns to the exact initial state.
 */

const persona: PatientPersona = {
  id: "pt-lan",
  name: "Lan Nguyen",
  initials: "LN",
  hue: 160,
  context: {
    en: "Ongoing care after a knee procedure this spring. Prefers morning walks and video check-ins.",
    vi: "Chăm sóc duy trì sau phẫu thuật đầu gối vào mùa xuân. Thích đi bộ buổi sáng và gặp qua video.",
  },
  memberSince: { en: "In the program since March 2026", vi: "Tham gia chương trình từ tháng 3 năm 2026" },
};

const team: CareTeamMember[] = [
  { id: "ct-mai", name: "Mai Tran", role: { en: "Care coordinator", vi: "Điều phối viên chăm sóc" }, initials: "MT", hue: 170 },
  { id: "ct-linh", name: "Linh Pham", role: { en: "Nurse", vi: "Điều dưỡng" }, initials: "LP", hue: 205 },
  { id: "ct-james", name: "James Vo", role: { en: "Health coach", vi: "Huấn luyện viên sức khỏe" }, initials: "JV", hue: 30 },
];

const plan: CareData["plan"] = {
  id: "plan-mobility",
  name: { en: "Mobility & Balance", vi: "Vận động & Thăng bằng" },
  focus: {
    en: "Gentle daily movement to keep everyday routines comfortable.",
    vi: "Vận động nhẹ nhàng hằng ngày để các sinh hoạt thường ngày luôn thoải mái.",
  },
  weekOf: 2,
  totalWeeks: 4,
  tasks: [
    {
      id: "task-walk",
      title: { en: "Morning walk", vi: "Đi bộ buổi sáng" },
      detail: { en: "An easy 20-minute walk, any route you enjoy.", vi: "Đi bộ nhẹ nhàng 20 phút, theo lộ trình bạn thích." },
      kind: "movement",
      perWeek: 5,
      weekBase: 3,
      checkedToday: false,
    },
    {
      id: "task-balance",
      title: { en: "Balance exercises", vi: "Bài tập thăng bằng" },
      detail: { en: "Ten minutes of standing balance work near a counter.", vi: "Mười phút tập thăng bằng đứng gần quầy để giữ tay vịn." },
      kind: "movement",
      perWeek: 3,
      weekBase: 1,
      checkedToday: false,
    },
    {
      id: "task-water",
      title: { en: "Hydration goal", vi: "Mục tiêu uống nước" },
      detail: { en: "Six glasses of water across the day.", vi: "Sáu ly nước đều đặn trong ngày." },
      kind: "habit",
      perWeek: 7,
      weekBase: 4,
      checkedToday: false,
    },
    {
      id: "task-stretch",
      title: { en: "Evening stretch", vi: "Giãn cơ buổi tối" },
      detail: { en: "Five gentle stretches before bed.", vi: "Năm động tác giãn cơ nhẹ trước khi đi ngủ." },
      kind: "wellbeing",
      perWeek: 4,
      weekBase: 2,
      checkedToday: false,
    },
    {
      id: "task-notes",
      title: { en: "Wellbeing note", vi: "Ghi chú sức khỏe" },
      detail: { en: "A short note on how the week feels, for your check-in.", vi: "Một ghi chú ngắn về tuần của bạn, cho buổi trao đổi sắp tới." },
      kind: "wellbeing",
      perWeek: 2,
      weekBase: 1,
      checkedToday: false,
    },
    {
      id: "task-learn",
      title: { en: "Reading from the plan library", vi: "Đọc tài liệu từ thư viện kế hoạch" },
      detail: { en: "One short article on home safety and footing.", vi: "Một bài viết ngắn về an toàn tại nhà và chống trượt ngã." },
      kind: "learning",
      perWeek: 1,
      weekBase: 0,
      checkedToday: false,
    },
  ],
  weekHistory: [4, 3, 5, 2, 4, 3],
};

const medications: Medication[] = [
  {
    id: "med-vitamind",
    name: "Vitamin D",
    dosage: { en: "1 tablet", vi: "1 viên" },
    instruction: { en: "Once daily with breakfast", vi: "Ngày một lần cùng bữa sáng" },
    doses: [
      { id: "dose-vitamind-am", time: "08:00", taken: true },
    ],
    streakBase: 12,
    weekHistory: [1, 1, 1, 1, 1, 1],
  },
  {
    id: "med-bp",
    name: "Blood pressure support",
    dosage: { en: "1 capsule", vi: "1 viên nang" },
    instruction: { en: "Once daily in the morning", vi: "Ngày một lần vào buổi sáng" },
    doses: [
      { id: "dose-bp-am", time: "08:00", taken: false },
    ],
    streakBase: 12,
    weekHistory: [1, 1, 1, 1, 1, 1],
  },
  {
    id: "med-omega",
    name: "Omega-3",
    dosage: { en: "1 softgel", vi: "1 viên mềm" },
    instruction: { en: "Once daily with lunch", vi: "Ngày một lần cùng bữa trưa" },
    doses: [
      { id: "dose-omega-noon", time: "12:30", taken: false },
    ],
    streakBase: 9,
    weekHistory: [1, 1, 0, 1, 1, 1],
  },
  {
    id: "med-magnesium",
    name: "Gentle magnesium",
    dosage: { en: "1 tablet", vi: "1 viên" },
    instruction: { en: "Once daily in the evening", vi: "Ngày một lần vào buổi tối" },
    doses: [
      { id: "dose-mag-pm", time: "20:00", taken: false },
    ],
    streakBase: 6,
    weekHistory: [1, 0, 1, 1, 1, 0],
  },
];

const appointments: Appointment[] = [
  {
    id: "appt-video",
    dayOffset: 0,
    time: "10:30",
    kind: { en: "Video check-in", vi: "Trao đổi qua video" },
    mode: "video",
    careTeamId: "ct-mai",
    location: { en: "Video visit — link opens in the app", vi: "Cuộc hẹn video — liên kết mở trong ứng dụng" },
    prep: [
      { id: "prep-1", label: { en: "Find a quiet spot with a glass of water nearby", vi: "Chọn chỗ yên tĩnh, chuẩn bị một ly nước" }, done: true },
      { id: "prep-2", label: { en: "Have your medication list handy", vi: "Chuẩn bị sẵn danh sách thuốc của bạn" }, done: false },
      { id: "prep-3", label: { en: "Write down any questions for the team", vi: "Ghi lại các câu hỏi cho đội ngũ chăm sóc" }, done: false },
    ],
    rescheduleRequest: null,
  },
  {
    id: "appt-followup",
    dayOffset: 9,
    time: "09:00",
    kind: { en: "In-person follow-up", vi: "Tái khám trực tiếp" },
    mode: "in-person",
    careTeamId: "ct-linh",
    location: { en: "Riverbend Family Clinic, Room 2", vi: "Phòng khám gia đình Riverbend, phòng 2" },
    prep: [
      { id: "prep-4", label: { en: "Arrive ten minutes early for check-in", vi: "Đến sớm mười phút để làm thủ tục" }, done: false },
      { id: "prep-5", label: { en: "Wear comfortable shoes for the walking check", vi: "Mang giày thoải mái để kiểm tra dáng đi" }, done: false },
    ],
    rescheduleRequest: null,
  },
  {
    id: "appt-lab",
    dayOffset: 23,
    time: "08:15",
    kind: { en: "Routine lab work", vi: "Xét nghiệm định kỳ" },
    mode: "in-person",
    careTeamId: "ct-linh",
    location: { en: "Riverbend Family Clinic, Lab entrance", vi: "Phòng khám gia đình Riverbend, cửa phòng xét nghiệm" },
    prep: [
      { id: "prep-6", label: { en: "Drink a glass of water before you arrive", vi: "Uống một ly nước trước khi đến" }, done: false },
      { id: "prep-7", label: { en: "Bring your ID card and medication list", vi: "Mang theo giấy tờ tùy thân và danh sách thuốc" }, done: false },
    ],
    rescheduleRequest: null,
  },
  {
    id: "appt-past-video",
    dayOffset: -6,
    time: "10:30",
    kind: { en: "Video check-in", vi: "Trao đổi qua video" },
    mode: "video",
    careTeamId: "ct-mai",
    location: { en: "Video visit", vi: "Cuộc hẹn video" },
    prep: [],
    rescheduleRequest: null,
  },
  {
    id: "appt-past-visit",
    dayOffset: -20,
    time: "09:00",
    kind: { en: "In-person follow-up", vi: "Tái khám trực tiếp" },
    mode: "in-person",
    careTeamId: "ct-linh",
    location: { en: "Riverbend Family Clinic, Room 2", vi: "Phòng khám gia đình Riverbend, phòng 2" },
    prep: [],
    rescheduleRequest: null,
  },
];

const thread: ThreadMessage[] = [
  {
    id: "msg-01",
    direction: "care-team",
    senderId: "ct-mai",
    body: {
      en: "Hi Lan, your care plan for this week is ready in the app. The gentle walks and balance exercises are a good place to start.",
      vi: "Chào Lan, kế hoạch chăm sóc tuần này đã có trong ứng dụng. Đi bộ nhẹ và bài tập thăng bằng là điểm bắt đầu tốt.",
    },
    dayOffset: -2,
    time: "09:15",
  },
  {
    id: "msg-02",
    direction: "patient",
    body: {
      en: "Thank you! I did a short walk this morning.",
      vi: "Cảm ơn chị! Sáng nay em đã đi bộ một đoạn ngắn.",
    },
    dayOffset: -2,
    time: "10:02",
  },
  {
    id: "msg-03",
    direction: "care-team",
    senderId: "ct-mai",
    body: {
      en: "Lovely. Your video check-in is tomorrow at 10:30 — jot down anything you would like to ask.",
      vi: "Tốt quá. Buổi trao đổi qua video của bạn là ngày mai lúc 10:30 — nhớ ghi lại điều bạn muốn hỏi nhé.",
    },
    dayOffset: -1,
    time: "16:40",
  },
  {
    id: "msg-04",
    direction: "patient",
    body: {
      en: "Will do. See you then!",
      vi: "Được ạ. Hẹn gặp chị!",
    },
    dayOffset: -1,
    time: "17:05",
  },
  {
    id: "msg-05",
    direction: "care-team",
    senderId: "ct-james",
    body: {
      en: "Good morning Lan! Reminder: video check-in at 10:30 today. Take your morning medications with breakfast, and keep your water glass close by.",
      vi: "Chào buổi sáng Lan! Nhắc nhẹ: buổi trao đổi qua video lúc 10:30 hôm nay. Uống thuốc sáng cùng bữa ăn và để sẵn ly nước bên cạnh nhé.",
    },
    dayOffset: 0,
    time: "07:05",
  },
];

const quickReplies: QuickReply[] = [
  {
    id: "qr-confirm",
    label: { en: "I will join the 10:30 visit", vi: "Tôi sẽ tham gia buổi 10:30" },
    reply: {
      en: "Wonderful — Mai has you down for 10:30. The join button appears here five minutes before the visit.",
      vi: "Tuyệt vời — Mai đã ghi nhận buổi 10:30 cho bạn. Nút tham gia sẽ xuất hiện ở đây năm phút trước buổi hẹn.",
    },
  },
  {
    id: "qr-question",
    label: { en: "I have a question about my plan", vi: "Tôi có câu hỏi về kế hoạch" },
    reply: {
      en: "Happy to help. Mai, your care coordinator, will review your plan and follow up with details.",
      vi: "Rất sẵn lòng. Mai — điều phối viên chăm sóc của bạn — sẽ xem lại kế hoạch và phản hồi chi tiết.",
    },
  },
  {
    id: "qr-thanks",
    label: { en: "Doing well, thank you", vi: "Mọi việc tốt đẹp, cảm ơn" },
    reply: {
      en: "Great to hear. Keep the gentle walks going and drink water through the day — see you at your check-in.",
      vi: "Mừng quá. Duy trì đi bộ nhẹ và uống nước đều trong ngày — hẹn gặp bạn ở buổi trao đổi.",
    },
  },
];

const roster: RosterPatient[] = [
  {
    id: "pt-lan",
    name: "Lan Nguyen",
    initials: "LN",
    hue: 160,
    program: { en: "Mobility & Balance", vi: "Vận động & Thăng bằng" },
    isPrimary: true,
    tasksDone: 11,
    tasksTotal: 22,
    nextVisitDayOffset: 0,
    nextVisitTime: "10:30",
  },
  {
    id: "pt-carla",
    name: "Carla Medina",
    initials: "CM",
    hue: 205,
    program: { en: "Hydration & Nutrition", vi: "Cấp nước & Dinh dưỡng" },
    tasksDone: 4,
    tasksTotal: 6,
    nextVisitDayOffset: 4,
    nextVisitTime: "09:40",
  },
  {
    id: "pt-samuel",
    name: "Samuel Boateng",
    initials: "SB",
    hue: 30,
    program: { en: "Strength & Balance", vi: "Sức mạnh & Thăng bằng" },
    tasksDone: 5,
    tasksTotal: 6,
    nextVisitDayOffset: 2,
    nextVisitTime: "11:15",
  },
  {
    id: "pt-rose",
    name: "Rose Nakamura",
    initials: "RN",
    hue: 285,
    program: { en: "Restorative Recovery", vi: "Phục hồi thư giãn" },
    tasksDone: 3,
    tasksTotal: 7,
    nextVisitDayOffset: 6,
    nextVisitTime: "13:30",
  },
  {
    id: "pt-phuc",
    name: "Phuc Do",
    initials: "PD",
    hue: 140,
    program: { en: "Mobility & Balance", vi: "Vận động & Thăng bằng" },
    tasksDone: 6,
    tasksTotal: 6,
    nextVisitDayOffset: 11,
    nextVisitTime: "15:00",
  },
  {
    id: "pt-elena",
    name: "Elena Petrova",
    initials: "EP",
    hue: 350,
    program: { en: "Hydration & Nutrition", vi: "Cấp nước & Dinh dưỡng" },
    tasksDone: 2,
    tasksTotal: 6,
    nextVisitDayOffset: 15,
    nextVisitTime: "10:00",
  },
];

const schedule: ScheduleSlot[] = [
  { id: "slot-1", time: "09:00", patientId: "pt-lan", kind: { en: "Morning reminder call", vi: "Cuộc gọi nhắc buổi sáng" }, mode: "video", careTeamId: "ct-james" },
  { id: "slot-2", time: "09:40", patientId: "pt-carla", kind: { en: "Care plan review", vi: "Rà soát kế hoạch chăm sóc" }, mode: "in-person", careTeamId: "ct-linh" },
  { id: "slot-3", time: "10:30", patientId: "pt-lan", kind: { en: "Video check-in", vi: "Trao đổi qua video" }, mode: "video", careTeamId: "ct-mai" },
  { id: "slot-4", time: "11:15", patientId: "pt-samuel", kind: { en: "Mobility session", vi: "Buổi tập vận động" }, mode: "in-person", careTeamId: "ct-james" },
  { id: "slot-5", time: "13:30", patientId: "pt-rose", kind: { en: "Recovery follow-up", vi: "Theo dõi phục hồi" }, mode: "in-person", careTeamId: "ct-linh" },
  { id: "slot-6", time: "15:00", patientId: "pt-phuc", kind: { en: "Video check-in", vi: "Trao đổi qua video" }, mode: "video", careTeamId: "ct-mai" },
];

const templates: CarePlanTemplate[] = [
  {
    id: "tpl-mobility",
    name: { en: "Mobility & Balance", vi: "Vận động & Thăng bằng" },
    focus: { en: "Gentle daily movement after recovery", vi: "Vận động nhẹ nhàng hằng ngày sau phục hồi" },
    tasks: 6,
    weeks: 4,
    enrolled: 24,
  },
  {
    id: "tpl-hydration",
    name: { en: "Hydration & Nutrition", vi: "Cấp nước & Dinh dưỡng" },
    focus: { en: "Everyday hydration and meal rhythm", vi: "Uống nước và nhịp bữa ăn hằng ngày" },
    tasks: 5,
    weeks: 3,
    enrolled: 17,
  },
  {
    id: "tpl-restorative",
    name: { en: "Restorative Recovery", vi: "Phục hồi thư giãn" },
    focus: { en: "Rest-first weeks with light activity", vi: "Tuần nghỉ ngơi ưu tiên với vận động nhẹ" },
    tasks: 7,
    weeks: 6,
    enrolled: 9,
  },
];

export function buildCareSeed(): CareData {
  return {
    persona: structuredClone(persona),
    team: structuredClone(team),
    plan: structuredClone(plan),
    medications: structuredClone(medications),
    appointments: structuredClone(appointments),
    thread: structuredClone(thread),
    quickReplies: structuredClone(quickReplies),
    roster: structuredClone(roster),
    schedule: structuredClone(schedule),
    templates: structuredClone(templates),
    activity: [],
  };
}
