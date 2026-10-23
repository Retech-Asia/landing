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
 *  - Orphans from public/images/stock/ stay in place until the owner
 *    rules on deletion (asset register orphan list).
 */

export type PhotoSource = "unsplash" | "pexels";

export interface PhotoAsset {
  /** File under /public/images/photo/ (webp). */
  file: string;
  source: PhotoSource;
  /** CDN photo identifier. Unsplash: images.unsplash.com/photo-<id>. */
  id: string | number;
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
    source: "unsplash",
    id: "1542744094-3a31f272c490",
    sourceUrl: unsplash("1542744094-3a31f272c490"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4016, height: 6016 },
    delivered: { width: 1400, height: 950 },
    subject: "Engineer at a multi-monitor development workstation",
    surfaces: ["home #01 desktop panel"],
  },
  {
    file: "photo-ai-circuit.webp",
    source: "unsplash",
    id: "1518770660439-4636190af475",
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
    sourceUrl: unsplash("1563013544-824ae1b704d3"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4240, height: 2832 },
    delivered: { width: 2000, height: 1125 },
    subject: "Card payment at a laptop, warm close-up",
    surfaces: ["home #02 fintech cover"],
  },
  {
    file: "photo-work-ai.webp",
    source: "pexels",
    id: 1148820,
    sourceUrl: pexels(1148820),
    license: "Pexels License",
    imported: "2026-10-23",
    original: { width: 6048, height: 4024 },
    delivered: { width: 2000, height: 1125 },
    subject: "Bright teal server aisle, data-center corridor",
    surfaces: ["home #02 ai-analysis-saas cover"],
  },

  // ---- Homepage delivery section (section 03) ----
  {
    file: "photo-delivery-focus.webp",
    source: "unsplash",
    id: "1550439062-609e1531270e",
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
    source: "unsplash",
    id: "1552664730-d307ca884978",
    sourceUrl: unsplash("1552664730-d307ca884978"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 4608, height: 3072 },
    delivered: { width: 1400, height: 1750 },
    subject: "Workshop discussion at a whiteboard with sticky notes",
    surfaces: ["/contact side panel"],
  },

  // ---- Services detail per-cluster bands (replaces code-screen /
  //      developer-workspace on all ten service pages) ----
  {
    file: "photo-desktop-terminal.webp",
    source: "unsplash",
    id: "1629654297299-c8506221ca97",
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
    source: "unsplash",
    id: "1531482615713-2afd69097998",
    sourceUrl: unsplash("1531482615713-2afd69097998"),
    license: "Unsplash License",
    imported: "2026-10-23",
    original: { width: 6016, height: 4016 },
    delivered: { width: 1600, height: 1067 },
    subject: "Consultant at a screen in a candid office session",
    surfaces: ["/services it-consulting + dedicated-teams"],
  },
];

export function photoSrc(file: string): string {
  return `/images/photo/${file}`;
}
