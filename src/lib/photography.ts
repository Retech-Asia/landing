/**
 * Provenance registry for the 2026-10-23 visual-experience round
 * (companion to docs/visual-experience-audit-2026-10-23.md and the RT-20
 * imagery-asset-register, which remains the inventory of record).
 *
 * Every asset was visually reviewed before import (contact sheets in
 * .tmp-audit/candidates/, since cleaned); licensing:
 *  - Unsplash License: free for commercial use, no permission or
 *    attribution required (attribution appreciated). Verified per photo
 *    at unsplash.com before import.
 *  - Pexels License: free for commercial use, no attribution required.
 *    Photo page: https://www.pexels.com/photo/<id>
 *
 * Rules (asset register, unchanged):
 *  - No photo here is presented as a product capture or as a photo of an
 *    actual Retech employee. Contextual/illustrative slots carry the
 *    standard caption where they sit next to case-study material.
 *  - Identity links (capability panel + its service page band; case-study
 *    cover on the homepage + its detail page) are intentional reuse.
 *    Everything else is a distinct photo per surface.
 *  - Provenance law (owner, checkpoint-1): CDN URLs alone are insufficient.
 *    Every entry carries the canonical photo-page URL and the creator name
 *    so licensing can be verified at the source.
 */

export type PhotoSource = "unsplash" | "pexels";

export interface PhotoAsset {
  /** File under /images/photo/ (webp). */
  file: string;
  source: PhotoSource;
  /** CDN photo identifier. Unsplash: images.unsplash.com/photo-<id>. */
  id: string | number;
  /**
   * Canonical photo page at the source (license-verification target).
   * null = resolution exhausted (Unsplash search no longer surfaces the
   * photo; napi/oEmbed auth-walled; search engines carry no link). Flagged
   * in the checkpoint report — swap to a fully-provenanced alternative at
   * the next imagery touch.
   */
  pageUrl: string | null;
  /** Creator name as published on the photo page; null if unresolved. */
  creator: string | null;
  /** Resolvable source URL for license verification. */
  sourceUrl: string;
  license: string;
  /** Import date. */
  imported: "2026-10-23";
  /** Original resolution (px, long edge first). */
  original: { width: number; height: number };
  /** Delivered crop (px). */
  delivered: { width: number; height: number };
  /** What the photo shows (for future audits). */
  subject: string;
  /** Surfaces the asset appears on. */
  surfaces: string[];
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const pexels = (id: number) => `https://www.pexels.com/photo/${id}`;

export const photoRegistry: PhotoAsset[] = [
  // ---- Homepage capability explorer panels (section 01) ----
  {
    file: "photo-crm-laptop.webp",
    source: "unsplash",
    id: "1460925895917-afdab827c52f",
    pageUrl: "https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU",
    creator: "Carlos Muza",
    sourceUrl: unsplash("1460925895917-afdab827c52f"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 5184, height: 3264 },
    delivered: { width: 1400, height: 950 },
    subject: "Laptop showing business analytics dashboards, warm desk",
    surfaces: ["home #01 CRM panel", "/services crm-systems cluster (cms, erp)"],
  },
  {
    file: "photo-web-code.webp",
    source: "pexels",
    id: 574071,
    pageUrl: pexels(574071),
    creator: "Lukas Blazek",
    sourceUrl: pexels(574071),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 5760, height: 3840 },
    delivered: { width: 1400, height: 950 },
    subject: "Hands typing code on a laptop at a wooden desk",
    surfaces: ["home #01 web panel", "/services web-development + ui-ux-design"],
  },
  {
    file: "photo-mobile-dev.webp",
    source: "unsplash",
    id: "1551650975-87deedd944c3",
    pageUrl: "https://unsplash.com/photos/smartphone-displaying-environmental-data-dashboard-sScmok4Iq1o",
    creator: "Balázs Kétyi",
    sourceUrl: unsplash("1551650975-87deedd944c3"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 3840, height: 2560 },
    delivered: { width: 1400, height: 950 },
    subject: "Hand holding a phone running an app analytics screen",
    surfaces: ["home #01 mobile panel", "/services mobile-app-development"],
  },
  {
    file: "photo-desktop-workstation.webp",
    source: "pexels",
    id: 36706460,
    pageUrl: pexels(36706460),
    creator: "Zayed Hossain",
    sourceUrl: pexels(36706460),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1800 },
    delivered: { width: 1400, height: 950 },
    subject: "Developer at a dual-monitor workstation, code on screen",
    surfaces: ["home #01 desktop panel"],
  },
  {
    file: "photo-ai-circuit.webp",
    source: "unsplash",
    id: "1518770660439-4636190af475",
    pageUrl: "https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU",
    creator: "Alexandre Debiève",
    sourceUrl: unsplash("1518770660439-4636190af475"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4948, height: 3265 },
    delivered: { width: 1400, height: 950 },
    subject: "Macro of a circuit board, green/teal tones",
    surfaces: ["home #01 applied-AI panel"],
  },
  {
    file: "photo-consulting-workshop.webp",
    source: "unsplash",
    id: "1556761175-5973dc0f32e7",
    pageUrl: "https://unsplash.com/photos/man-standing-in-front-of-group-of-men-rxpThOwuVgE",
    creator: "Austin Distel",
    sourceUrl: unsplash("1556761175-5973dc0f32e7"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 5184, height: 3456 },
    delivered: { width: 1400, height: 950 },
    subject: "Workshop presenter in a loft office, team listening",
    surfaces: ["home #01 IT-consulting panel"],
  },

  // ---- Homepage selected-work covers (section 02, contextual) ----
  {
    file: "photo-work-mining.webp",
    source: "unsplash",
    id: "1558494949-ef010cbdcc31",
    pageUrl: "https://unsplash.com/photos/cable-network-M5tzZtFCOfs",
    creator: "Taylor Vick",
    sourceUrl: unsplash("1558494949-ef010cbdcc31"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4240, height: 2832 },
    delivered: { width: 2000, height: 1125 },
    subject: "Server racks with cabling, dark aisle (mining rigs context)",
    surfaces: ["home #02 mining cover"],
  },
  {
    file: "photo-work-asset.webp",
    source: "unsplash",
    id: "1545324418-cc1a3fa10c00",
    pageUrl: "https://unsplash.com/photos/low-angle-photo-of-high-rise-apartment-building-5q1KnUjtjaM",
    creator: "Marlene Céline Nordvik",
    sourceUrl: unsplash("1545324418-cc1a3fa10c00"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 3648, height: 5472 },
    delivered: { width: 2000, height: 1125 },
    subject: "Residential building facade with lit windows at dusk",
    surfaces: ["home #02 asset-management cover"],
  },
  {
    file: "photo-work-invest.webp",
    source: "unsplash",
    id: "1611974789855-9c2a0a7236a3",
    pageUrl: "https://unsplash.com/photos/stock-market-candlestick-chart-on-dark-screen-fiXLQXAhCfk",
    creator: "Maxim Hopman",
    sourceUrl: unsplash("1611974789855-9c2a0a7236a3"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 3840, height: 2160 },
    delivered: { width: 2000, height: 1125 },
    subject: "Candlestick market chart with trend overlay on screen",
    surfaces: ["home #02 investment-intelligence cover"],
  },
  {
    file: "photo-work-fintech.webp",
    source: "unsplash",
    id: "1563013544-824ae1b704d3",
    pageUrl: "https://unsplash.com/photos/person-using-laptop-computer-holding-card-Q59HmzK38eQ",
    creator: "rupixen",
    sourceUrl: unsplash("1563013544-824ae1b704d3"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4240, height: 2832 },
    delivered: { width: 2000, height: 1125 },
    subject: "Card payment at a laptop, warm close-up",
    surfaces: ["home #02 fintech cover"],
  },
  // RETIRED 2026-10-23 (owner checkpoint-1): photo-work-ai.webp (Pexels
  // 1148820, bright server aisle) — third repetition of the server-rack
  // subject; replaced by photo-work-ai-analysis.webp below (analytical,
  // research-oriented context) and removed from disk.
  {
    file: "photo-work-ai-analysis.webp",
    source: "unsplash",
    id: "1763038311036-6d18805537e5",
    pageUrl: "https://unsplash.com/photos/woman-working-on-laptop-with-charts-and-graphs-KNQUEQwTCY4",
    creator: "Apex Virtual Education",
    sourceUrl: unsplash("1763038311036-6d18805537e5"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1344 },
    delivered: { width: 2000, height: 1125 },
    subject: "Analyst at a laptop with charts, graphs and reference books",
    surfaces: [
      "home #02 ai-analysis-saas cover",
      "/case-studies ai-analysis-saas cover",
    ],
  },

  // ---- Industry visual breaks (industries/[slug], 2026-10-23 sourcing pass;
  //      healthcare / education / logistics / e-commerce; other industries
  //      keep stock/analytics-dashboard.webp as neutral fallback) ----
  {
    file: "photo-industry-healthcare.webp",
    source: "unsplash",
    id: "1758691463203-cce9d415b2b5",
    pageUrl: "https://unsplash.com/photos/two-doctors-looking-at-a-tablet-together-2kopEHjST-g",
    creator: "Vitaly Gariev",
    sourceUrl: unsplash("1758691463203-cce9d415b2b5"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1350 },
    delivered: { width: 2400, height: 560 },
    subject: "Two doctors reviewing information together on a tablet",
    surfaces: ["/industries/healthcare visual break"],
  },
  {
    file: "photo-industry-education.webp",
    source: "unsplash",
    id: "1758270705290-62b6294dd044",
    pageUrl: "https://unsplash.com/photos/diverse-group-of-students-gathered-around-laptop-kp7qkHTgSKc",
    creator: "Vitaly Gariev",
    sourceUrl: unsplash("1758270705290-62b6294dd044"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1350 },
    delivered: { width: 2400, height: 560 },
    subject: "Students collaborating around a laptop",
    surfaces: ["/industries/education visual break"],
  },
  {
    file: "photo-industry-logistics.webp",
    source: "unsplash",
    id: "1622127922075-fb1d21fbacbf",
    pageUrl: "https://unsplash.com/photos/man-in-blue-polo-shirt-and-blue-denim-jeans-standing-near-brown-wooden-shelf-wJLwq637lOw",
    creator: "TheStandingDesk",
    sourceUrl: unsplash("1622127922075-fb1d21fbacbf"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1349 },
    delivered: { width: 2400, height: 560 },
    subject: "Warehouse associate among storage shelves",
    surfaces: ["/industries/logistics visual break"],
  },
  {
    file: "photo-industry-ecommerce.webp",
    source: "unsplash",
    id: "1770013413878-2530e2c3d82b",
    pageUrl: "https://unsplash.com/photos/woman-checking-package-with-phone-near-laptop-and-boxes-k63Or81F8-M",
    creator: "Rifki Kurniawan",
    sourceUrl: unsplash("1770013413878-2530e2c3d82b"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1600 },
    delivered: { width: 2400, height: 560 },
    subject: "Retailer checking an order beside packed boxes and a laptop",
    surfaces: ["/industries/e-commerce visual break"],
  },

  // ---- Homepage delivery section (section 03) ----
  {
    file: "photo-delivery-focus.webp",
    source: "unsplash",
    id: "1550439062-609e1531270e",
    pageUrl: "https://unsplash.com/photos/man-facing-three-computer-monitors-while-sitting-qAjJk-un3BI",
    creator: "Max Duzij",
    sourceUrl: unsplash("1550439062-609e1531270e"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4480, height: 6720 },
    delivered: { width: 1400, height: 1750 },
    subject: "Over-head view of an engineer working across monitors",
    surfaces: ["home #03 delivery column"],
  },

  // ---- About (replaces stock/modern-office, office-interior, team-portrait on /about) ----
  {
    file: "photo-about-studio.webp",
    source: "unsplash",
    id: "1504384308090-c894fdcc538d",
    pageUrl: "https://unsplash.com/photos/people-doing-office-works-QBpZGqEMsKg",
    creator: "Alex Kotliarskyi",
    sourceUrl: unsplash("1504384308090-c894fdcc538d"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 5760, height: 3840 },
    delivered: { width: 2400, height: 1350 },
    subject: "Open-plan engineering studio with people working, wide shot",
    surfaces: ["/about mission banner"],
  },
  {
    file: "photo-about-desk.webp",
    source: "unsplash",
    id: "1519389950473-47ba0277781c",
    pageUrl: "https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU",
    creator: "Marvin Meyer",
    sourceUrl: unsplash("1519389950473-47ba0277781c"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 3840, height: 2560 },
    delivered: { width: 2400, height: 1100 },
    subject: "Top-down desk setup: laptops, headphones, notes",
    surfaces: ["/about mid-page band"],
  },
  {
    file: "photo-about-team.webp",
    source: "unsplash",
    id: "1522071820081-009f0129c71c",
    pageUrl: "https://unsplash.com/photos/group-of-people-using-laptop-computer-QckxruozjRg",
    creator: "Annie Spratt",
    sourceUrl: unsplash("1522071820081-009f0129c71c"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4240, height: 2832 },
    delivered: { width: 1600, height: 1200 },
    subject: "Engineers collaborating at desks, candid over-shoulder",
    surfaces: ["/about team section"],
  },

  // ---- Careers (replaces the /about team-portrait reuse) ----
  {
    file: "photo-careers-team.webp",
    source: "unsplash",
    id: "1521737604893-d14cc237f11d",
    pageUrl: "https://unsplash.com/photos/sittin-people-beside-table-inside-room-hCb3lIB8L8E",
    creator: "Annie Spratt",
    sourceUrl: unsplash("1521737604893-d14cc237f11d"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4256, height: 2832 },
    delivered: { width: 1600, height: 1067 },
    subject: "Team working around a table with laptops, loft office",
    surfaces: ["/careers"],
  },

  // ---- Process (replaces stock/brainstorming.webp) ----
  {
    file: "photo-process-review.webp",
    source: "pexels",
    id: 1181263,
    pageUrl: pexels(1181263),
    creator: "Christina Morillo",
    sourceUrl: pexels(1181263),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 3968, height: 2532 },
    delivered: { width: 1800, height: 1013 },
    subject: "Two engineers reviewing code at a laptop, dark room",
    surfaces: ["/process visual break"],
  },

  // ---- Contact (replaces stock/team-meeting.webp) ----
  {
    file: "photo-contact-workshop.webp",
    source: "pexels",
    id: 17724731,
    pageUrl: pexels(17724731),
    creator: "Walls.io",
    sourceUrl: pexels(17724731),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1600 },
    delivered: { width: 1400, height: 934 },
    subject: "Two colleagues at a whiteboard with sticky notes",
    surfaces: ["/contact side panel"],
  },

  // ---- Services detail per-cluster bands (replaces code-screen /
  //      developer-workspace on all ten service pages) ----
  {
    file: "photo-desktop-terminal.webp",
    source: "unsplash",
    id: "1629654297299-c8506221ca97",
    pageUrl: "https://unsplash.com/photos/command-line-interface-with-sudo-prompt-4Mw7nkQDByk",
    creator: "Gabriel Heinzer",
    sourceUrl: unsplash("1629654297299-c8506221ca97"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 5712, height: 3808 },
    delivered: { width: 1600, height: 1067 },
    subject: "Terminal window macro, dark (local software context)",
    surfaces: ["/services desktop-app-development"],
  },
  {
    file: "photo-ai-hardware.webp",
    source: "unsplash",
    id: "1550751827-4bd374c3f58b",
    pageUrl: "https://unsplash.com/photos/teal-led-panel-EUsVwEOsblE",
    creator: "Adi Goldstein",
    sourceUrl: unsplash("1550751827-4bd374c3f58b"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4240, height: 2832 },
    delivered: { width: 1600, height: 1067 },
    subject: "Circuit board macro, cyan/teal hardware detail",
    surfaces: ["/services ai-development"],
  },
  {
    file: "photo-consulting-session.webp",
    source: "pexels",
    id: 4339795,
    pageUrl: pexels(4339795),
    creator: "Edmond Dantès",
    sourceUrl: pexels(4339795),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 2400, height: 1600 },
    delivered: { width: 1600, height: 1067 },
    subject: "Consultant and client in discussion over a laptop",
    surfaces: ["/services it-consulting + dedicated-teams"],
  },
];

export function photoSrc(file: string): string {
  return `/images/photo/${file}`;
}
