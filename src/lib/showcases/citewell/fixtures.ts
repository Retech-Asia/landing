import type { CitewellData, QAPair, SourceDoc } from "./types";

/**
 * Citewell synthetic corpus (Wave 2C handoff §2C): five fictional internal
 * documents with versions and sections, curated predefined answers with
 * citations into those sections (the cited passage always appears verbatim in
 * the excerpt), one deliberate "insufficient information" case, a human-review
 * queue and deterministic quality checks. Every cited rule sentence lives in
 * the referenced section excerpt — clicking a citation highlights it.
 */

const docs: SourceDoc[] = [
  {
    id: "doc-equipment",
    title: { en: "Equipment Request Procedure", vi: "Quy trình đề xuất trang thiết bị" },
    version: "1.2",
    category: { en: "Operations", vi: "Vận hành" },
    updatedDaysAgo: 12,
    owner: { en: "Facilities & IT", vi: "Ban quản lý cơ sở & IT" },
    sections: [
      {
        id: "eq-1-0",
        heading: { en: "1. Purpose", vi: "1. Mục đích" },
        excerpt: {
          en: "This procedure describes how staff request company equipment, how requests are approved, and how fulfilled equipment is tracked and returned.",
          vi: "Quy trình này mô tả cách nhân viên đề xuất trang thiết bị công ty, cách phê duyệt và cách theo dõi, thu hồi thiết bị sau khi cấp.",
        },
      },
      {
        id: "eq-3-2",
        heading: { en: "3.2 Approval and thresholds", vi: "3.2 Phê duyệt và ngưỡng chi phí" },
        excerpt: {
          en: "Once the form is complete, an employee submits the request to their department manager. Requests above $1,000 are also reviewed by Operations before approval. The manager checks the business need and budget line, and approved requests are fulfilled by the equipment desk within five working days.",
          vi: "Sau khi hoàn tất biểu mẫu, nhân viên gửi yêu cầu cho trưởng bộ phận của mình. Yêu cầu trên $1,000 còn được Operations xem xét trước khi phê duyệt. Trưởng bộ phận kiểm tra nhu cầu công việc và khoản mục ngân sách, và yêu cầu được duyệt sẽ do bộ phận thiết bị cung cấp trong vòng năm ngày làm việc.",
        },
      },
      {
        id: "eq-5-1",
        heading: { en: "5.1 Returns", vi: "5.1 Thu hồi" },
        excerpt: {
          en: "Equipment no longer in use is returned to the equipment desk within ten working days of the end date recorded on the request.",
          vi: "Thiết bị không còn sử dụng được hoàn trả cho bộ phận thiết bị trong vòng mười ngày làm việc kể từ ngày kết thúc ghi trên yêu cầu.",
        },
      },
    ],
  },
  {
    id: "doc-travel",
    title: { en: "Employee Travel Policy", vi: "Chính sách công tác" },
    version: "2.1",
    category: { en: "Policy", vi: "Chính sách" },
    updatedDaysAgo: 34,
    owner: { en: "People Operations", vi: "Phòng Nhân sự" },
    sections: [
      {
        id: "tr-4-2",
        heading: { en: "4.2 Accommodation", vi: "4.2 Lưu trú" },
        excerpt: {
          en: "Employees travelling internationally may book accommodation up to $220 per night in major cities and $160 per night elsewhere. Bookings above the nightly cap require written approval from People Operations before purchase, and receipts must be filed with the expense report.",
          vi: "Nhân viên công tác quốc tế được đặt phòng lưu trú tối đa $220 mỗi đêm tại thành phố lớn và $160 mỗi đêm tại nơi khác. Đặt phòng vượt mức theo đêm cần phê duyệt bằng văn bản của Phòng Nhân sự trước khi thanh toán, và hóa đơn phải nộp kèm báo cáo chi phí.",
        },
      },
      {
        id: "tr-6-1",
        heading: { en: "6.1 Expense filing", vi: "6.1 Quy trình báo cáo chi phí" },
        excerpt: {
          en: "Expense reports are filed within fifteen days of returning, with itemised receipts attached for lodging, transport and meals.",
          vi: "Báo cáo chi phí được nộp trong vòng mười lăm ngày kể từ khi trở về, kèm hóa đơn chi tiết cho lưu trú, đi lại và bữa ăn.",
        },
      },
    ],
  },
  {
    id: "doc-vendor",
    title: { en: "Vendor Onboarding Guide", vi: "Hướng dẫn đưa nhà cung cấp mới" },
    version: "1.4",
    category: { en: "Procurement", vi: "Mua hàng" },
    updatedDaysAgo: 8,
    owner: { en: "Finance", vi: "Phòng Tài chính" },
    sections: [
      {
        id: "vd-2-0",
        heading: { en: "2. Screening", vi: "2. Thẩm định" },
        excerpt: {
          en: "Before a new vendor is onboarded, the request passes three checks: a legal review of the draft contract, a security questionnaire covering data handling, and a finance screening of the vendor's registered details. No vendor may be engaged while any check is unresolved.",
          vi: "Trước khi đưa một nhà cung cấp mới vào hệ thống, hồ sơ phải qua ba bước thẩm định: pháp lý rà soát hợp đồng dự thảo, bảng câu hỏi an ninh về xử lý dữ liệu, và tài chính kiểm tra thông tin đăng ký của nhà cung cấp. Không hợp tác với nhà cung cấp khi còn bước nào chưa hoàn tất.",
        },
      },
      {
        id: "vd-4-1",
        heading: { en: "4.1 Exceptions", vi: "4.1 Ngoại lệ" },
        excerpt: {
          en: "Exceptions to the standard checks may be granted only by the Procurement Director in writing, and are re-examined at the next quarterly vendor review.",
          vi: "Chỉ Giám đốc Mua hàng mới có thể chấp thuận ngoại lệ cho các bước thẩm định chuẩn bằng văn bản, và các ngoại lệ được xem xét lại tại kỳ rà soát nhà cung cấp hằng quý.",
        },
      },
    ],
  },
  {
    id: "doc-support",
    title: { en: "Customer Support Escalation", vi: "Quy trình leo thang hỗ trợ khách hàng" },
    version: "3.0",
    category: { en: "Support", vi: "Hỗ trợ" },
    updatedDaysAgo: 5,
    owner: { en: "Support", vi: "Bộ phận Hỗ trợ" },
    sections: [
      {
        id: "cs-2-3",
        heading: { en: "2.3 Severity and the duty manager", vi: "2.3 Mức độ nghiêm trọng và quản lý trực" },
        excerpt: {
          en: "A confirmed severity-1 incident must reach the duty manager within 30 minutes. The duty manager assigns a response owner and opens a communications thread for affected customers.",
          vi: "Sự cố nghiêm trọng mức 1 được xác nhận phải đến được quản lý trực trong vòng 30 phút. Quản lý trực phân công người phụ trách phản hồi và mở kênh truyền thông cho khách hàng bị ảnh hưởng.",
        },
      },
      {
        id: "cs-5-2",
        heading: { en: "5.2 Post-incident review", vi: "5.2 Rà soát sau sự cố" },
        excerpt: {
          en: "Every severity-1 incident receives a written post-incident review within ten working days, covering timeline, root cause and preventive actions.",
          vi: "Mọi sự cố mức 1 đều có biên bản rà soát sau sự cố trong vòng mười ngày làm việc, gồm dòng thời gian, nguyên nhân gốc và hành động phòng ngừa.",
        },
      },
    ],
  },
  {
    id: "doc-remote",
    title: { en: "Remote Work Handbook", vi: "Cẩm nang làm việc từ xa" },
    version: "2.0",
    category: { en: "Policy", vi: "Chính sách" },
    updatedDaysAgo: 21,
    owner: { en: "People Operations", vi: "Phòng Nhân sự" },
    sections: [
      {
        id: "rw-3-1",
        heading: { en: "3.1 Eligibility and equipment", vi: "3.1 Đối tượng và trang thiết bị" },
        excerpt: {
          en: "All permanent staff may work remotely with their manager's agreement. The company provides a laptop, a headset and a one-time home-office allowance of $300.",
          vi: "Toàn bộ nhân viên chính thức có thể làm việc từ xa khi được quản lý đồng ý. Công ty cung cấp một laptop, một tai nghe và khoản hỗ trợ một lần $300 cho văn phòng tại nhà.",
        },
      },
      {
        id: "rw-4-0",
        heading: { en: "4. Tools", vi: "4. Công cụ" },
        excerpt: {
          en: "Remote meetings default to video-on, and shared documents replace attachments for anything reviewed by more than one person.",
          vi: "Họp từ xa mặc định bật camera, và tài liệu dùng chung thay cho tệp đính kèm cho mọi nội dung có nhiều hơn một người xem.",
        },
      },
    ],
  },
];

const qaPairs: QAPair[] = [
  {
    id: "qa-equipment-approver",
    question: { en: "Who approves a new equipment request?", vi: "Ai phê duyệt yêu cầu trang thiết bị mới?" },
    kind: "cited",
    answer: {
      en: "Under the sample Equipment Request Procedure, an employee submits the request to their department manager. Requests above $1,000 are also reviewed by Operations before approval.",
      vi: "Theo Quy trình đề xuất trang thiết bị mẫu, nhân viên gửi yêu cầu cho trưởng bộ phận của mình. Yêu cầu trên $1,000 còn được Operations xem xét trước khi phê duyệt.",
    },
    citations: [
      {
        docId: "doc-equipment",
        sectionId: "eq-3-2",
        passage: {
          en: "an employee submits the request to their department manager. Requests above $1,000 are also reviewed by Operations before approval",
          vi: "nhân viên gửi yêu cầu cho trưởng bộ phận của mình. Yêu cầu trên $1,000 còn được Operations xem xét trước khi phê duyệt",
        },
        locator: { en: "Equipment Request Procedure, version 1.2, section 3.2.", vi: "Quy trình đề xuất trang thiết bị, phiên bản 1.2, mục 3.2." },
      },
    ],
    askedDaysAgo: 2,
  },
  {
    id: "qa-travel-cap",
    question: {
      en: "What is the nightly hotel cap for international travel?",
      vi: "Mức trần tiền phòng mỗi đêm cho công tác quốc tế là bao nhiêu?",
    },
    kind: "cited",
    answer: {
      en: "The sample Employee Travel Policy caps international accommodation at $220 per night in major cities and $160 per night elsewhere, with receipts filed on the expense report.",
      vi: "Chính sách công tác mẫu giới hạn lưu trú quốc tế ở mức $220 mỗi đêm tại thành phố lớn và $160 mỗi đêm tại nơi khác, kèm hóa đơn nộp theo báo cáo chi phí.",
    },
    citations: [
      {
        docId: "doc-travel",
        sectionId: "tr-4-2",
        passage: {
          en: "up to $220 per night in major cities and $160 per night elsewhere",
          vi: "tối đa $220 mỗi đêm tại thành phố lớn và $160 mỗi đêm tại nơi khác",
        },
        locator: { en: "Employee Travel Policy, version 2.1, section 4.2.", vi: "Chính sách công tác, phiên bản 2.1, mục 4.2." },
      },
    ],
    askedDaysAgo: 4,
  },
  {
    id: "qa-vendor-checks",
    question: { en: "Which checks run before a new vendor is onboarded?", vi: "Yêu cầu nào được thẩm định trước khi đưa nhà cung cấp mới vào?" },
    kind: "cited",
    answer: {
      en: "The sample Vendor Onboarding Guide lists three checks: a legal review of the draft contract, a security questionnaire covering data handling, and a finance screening of the vendor's registered details.",
      vi: "Hướng dẫn đưa nhà cung cấp mới mẫu liệt kê ba bước thẩm định: pháp lý rà soát hợp đồng dự thảo, bảng câu hỏi an ninh về xử lý dữ liệu, và tài chính kiểm tra thông tin đăng ký.",
    },
    citations: [
      {
        docId: "doc-vendor",
        sectionId: "vd-2-0",
        passage: {
          en: "a legal review of the draft contract, a security questionnaire covering data handling, and a finance screening of the vendor's registered details",
          vi: "pháp lý rà soát hợp đồng dự thảo, bảng câu hỏi an ninh về xử lý dữ liệu, và tài chính kiểm tra thông tin đăng ký",
        },
        locator: { en: "Vendor Onboarding Guide, version 1.4, section 2.", vi: "Hướng dẫn đưa nhà cung cấp mới, phiên bản 1.4, mục 2." },
      },
    ],
    askedDaysAgo: 6,
  },
  {
    id: "qa-escalation-clock",
    question: {
      en: "When must a critical incident reach the duty manager?",
      vi: "Sự cố nghiêm trọng phải đến quản lý trực trong bao lâu?",
    },
    kind: "cited",
    answer: {
      en: "Under the sample Customer Support Escalation procedure, a confirmed severity-1 incident must reach the duty manager within 30 minutes.",
      vi: "Theo quy trình leo thang hỗ trợ mẫu, sự cố nghiêm trọng mức 1 được xác nhận phải đến được quản lý trực trong vòng 30 phút.",
    },
    citations: [
      {
        docId: "doc-support",
        sectionId: "cs-2-3",
        passage: {
          en: "must reach the duty manager within 30 minutes",
          vi: "phải đến được quản lý trực trong vòng 30 phút",
        },
        locator: { en: "Customer Support Escalation, version 3.0, section 2.3.", vi: "Quy trình leo thang hỗ trợ khách hàng, phiên bản 3.0, mục 2.3." },
      },
    ],
    askedDaysAgo: 8,
  },
  {
    id: "qa-remote-equipment",
    question: { en: "What does the company provide for remote work?", vi: "Công ty cung cấp những gì cho làm việc từ xa?" },
    kind: "cited",
    answer: {
      en: "The sample Remote Work Handbook provides a laptop, a headset and a one-time home-office allowance of $300 for permanent staff working remotely with their manager's agreement.",
      vi: "Cẩm nang làm việc từ xa mẫu cung cấp một laptop, một tai nghe và khoản hỗ trợ một lần $300 cho văn phòng tại nhà, dành cho nhân viên chính thức làm việc từ xa khi được quản lý đồng ý.",
    },
    citations: [
      {
        docId: "doc-remote",
        sectionId: "rw-3-1",
        passage: {
          en: "a laptop, a headset and a one-time home-office allowance of $300",
          vi: "một laptop, một tai nghe và khoản hỗ trợ một lần $300",
        },
        locator: { en: "Remote Work Handbook, version 2.0, section 3.1.", vi: "Cẩm nang làm việc từ xa, phiên bản 2.0, mục 3.1." },
      },
    ],
    askedDaysAgo: 11,
  },
  {
    id: "qa-parental-leave",
    question: {
      en: "How many weeks of paid parental leave does the company provide?",
      vi: "Chính sách nghỉ thai sản có lương của công ty là bao nhiêu tuần?",
    },
    kind: "insufficient",
    insufficientNote: {
      en: "The five connected documents do not cover parental leave, so no answer is suggested. Connect a People Operations source to build this answer — the workspace declines rather than manufacturing one.",
      vi: "Năm tài liệu được kết nối không đề cập đến nghỉ thai sản, nên hệ thống không đưa ra câu trả lời. Hãy kết nối nguồn từ Phòng Nhân sự để xây dựng câu trả lời — không gian làm việc từ chối thay vì bịa ra câu trả lời.",
    },
    askedDaysAgo: 3,
  },
];

const seed = {
  docs,
  qaPairs,
  reviewQueue: [
    {
      qaId: "qa-equipment-approver",
      reason: {
        en: "High priority — the Equipment Request Procedure was updated this month; checking the cited threshold still matches section 3.2.",
        vi: "Ưu tiên cao — Quy trình đề xuất trang thiết bị vừa cập nhật trong tháng; kiểm tra ngưỡng trích dẫn vẫn khớp mục 3.2.",
      },
      priority: "high" as const,
      requestedDaysAgo: 1,
    },
    {
      qaId: "qa-travel-cap",
      reason: {
        en: "Quality flagged the answer for omitting the written-approval requirement above the nightly cap; routed to human review.",
        vi: "Bộ phận chất lượng gắn cờ câu trả lời còn thiếu yêu cầu phê duyệt bằng văn bản khi vượt trần tiền phòng; chuyển sang kiểm duyệt của con người.",
      },
      priority: "high" as const,
      requestedDaysAgo: 3,
    },
    {
      qaId: "qa-remote-equipment",
      reason: {
        en: "Routine quarterly review of cited passages.",
        vi: "Rà soát định kỳ hằng quý đối với các trích dẫn.",
      },
      priority: "normal" as const,
      requestedDaysAgo: 2,
    },
  ],
  qualityCases: [
    {
      id: "qc-citation-match",
      name: { en: "Cited passage exists in source", vi: "Đoạn trích dẫn có trong tài liệu nguồn" },
      qaId: "qa-equipment-approver",
      expectation: {
        en: "Every citation passage appears verbatim in the cited section.",
        vi: "Mọi đoạn trích dẫn xuất hiện nguyên văn trong mục được trích.",
      },
      outcome: "pass" as const,
      detail: {
        en: "The passage matches section 3.2 of Equipment Request Procedure, version 1.2, character for character.",
        vi: "Đoạn trích khớp ký tự từng ký tự với mục 3.2 của Quy trình đề xuất trang thiết bị, phiên bản 1.2.",
      },
    },
    {
      id: "qc-decline",
      name: { en: "Declines when sources are silent", vi: "Từ chối khi nguồn không đề cập" },
      qaId: "qa-parental-leave",
      expectation: {
        en: "Questions outside the corpus receive a decline, never an invented answer.",
        vi: "Câu hỏi ngoài phạm vi tài liệu nhận câu trả lời từ chối, không bịa đặt.",
      },
      outcome: "pass" as const,
      detail: {
        en: "The parental-leave question returns a documented decline with no suggested answer.",
        vi: "Câu hỏi về nghỉ thai sản nhận câu trả lời từ chối rõ ràng, không gợi ý nội dung nào.",
      },
    },
    {
      id: "qc-version-freshness",
      name: { en: "Citation points at current version", vi: "Trích dẫn trỏ tới phiên bản hiện hành" },
      qaId: "qa-remote-equipment",
      expectation: {
        en: "Citations resolve to the newest stored version of the document.",
        vi: "Trích dẫn trỏ tới phiên bản mới nhất của tài liệu.",
      },
      outcome: "pass" as const,
      detail: {
        en: "Section 3.1 of Remote Work Handbook, version 2.0 is the current version; citation resolves to it.",
        vi: "Mục 3.1 của Cẩm nang làm việc từ xa, phiên bản 2.0 là phiên bản hiện hành; trích dẫn trỏ đúng tới đó.",
      },
    },
    {
      id: "qc-completeness",
      name: { en: "Answer covers the cited requirement", vi: "Câu trả lời đầy đủ yêu cầu trong nguồn" },
      qaId: "qa-travel-cap",
      expectation: {
        en: "Answers state every obligation the cited passage imposes.",
        vi: "Câu trả lời nêu đầy đủ mọi nghĩa vụ mà đoạn nguồn đưa ra.",
      },
      outcome: "flagged" as const,
      detail: {
        en: "The source requires written approval from People Operations for bookings above the nightly cap; the answer mentions receipts but not the approval step. Routed to human review.",
        vi: "Nguồn yêu cầu phê duyệt bằng văn bản của Phòng Nhân sự cho đặt phòng vượt trần theo đêm; câu trả lời nhắc đến hóa đơn nhưng bỏ qua bước phê duyệt. Đã chuyển sang kiểm duyệt của con người.",
      },
    },
  ],
  events: [
    {
      id: "ev-quality-run",
      summary: {
        en: "Quality run completed: 3 of 4 checks passed, 1 flagged for review",
        vi: "Chạy kiểm tra chất lượng hoàn tất: 3/4 đạt, 1 mục được gắn cờ để rà soát",
      },
      daysAgo: 3,
    },
    {
      id: "ev-support-update",
      summary: {
        en: "Customer Support Escalation updated to version 3.0",
        vi: "Quy trình leo thang hỗ trợ khách hàng cập nhật lên phiên bản 3.0",
      },
      daysAgo: 5,
    },
    {
      id: "ev-vendor-update",
      summary: {
        en: "Vendor Onboarding Guide updated to version 1.4",
        vi: "Hướng dẫn đưa nhà cung cấp mới cập nhật lên phiên bản 1.4",
      },
      daysAgo: 8,
    },
    {
      id: "ev-travel-update",
      summary: {
        en: "Employee Travel Policy updated to version 2.1",
        vi: "Chính sách công tác cập nhật lên phiên bản 2.1",
      },
      daysAgo: 34,
    },
  ],
};

export function buildCitewellSeed() {
  return structuredClone(seed) satisfies CitewellData;
}
