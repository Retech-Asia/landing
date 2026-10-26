# ChatGPT handoff — flagship concept blueprints + Citewell assessment — 2026-10-26

Owner-approved framing (2026-10-26): homepage "Product concepts" section with
featured directions, in priority order — (1) Real Estate & Property CRM (new),
(2) Healthcare mobile (new), (3) Meridian Operations (keep), (4) Relay Field
(keep), (5) Citewell (provisional, pending this assessment). ChatGPT owns
names, headlines, storytelling, art direction, generated assets, editorial
approval. This document only proposes functional scope, screens, placements,
and data requirements — no marketing copy, no product names.

Integrity laws (binding): fictional data only, clearly labeled "Product
concept"; no invented clients, testimonials, ROI, or adoption stats;
SME-scale numbers allowed only inside the fictional interfaces.

---

## 1. Blueprint A — Real Estate & Property CRM (flagship, desktop-first)

Working title: "Property CRM concept" (name owned by ChatGPT).
Audience: small/mid-size residential agencies.

### View map (wave 1 scope: 5 views)

| # | View | Platform | Contents |
| - | ---- | -------- | -------- |
| 1 | Property detail (hero view) | Desktop + mobile companion | Gallery strip, specs (beds/baths/area), price + status, location panel, documents, linked leads and offers |
| 2 | Portfolio | Desktop | Property inventory: filterable cards/table — status (available/reserved/sold), price, occupancy, agent |
| 3 | Lead pipeline | Desktop | Kanban: new → qualifying → viewing → offer → closing; cards link lead ↔ property |
| 4 | Map | Desktop | Schematic district map (SVG grid, normalized pins, status colors + price on hover) — no external tile API |
| 5 | Agent mobile companion | Mobile | On-site sheet: property facts, quick lead capture, appointment check-in |

Appointments and offers states are embedded in views 1/3/5 rather than a
separate view (keeps wave 1 at 5 views).

### Data requirements (deterministic fixtures, same pattern as existing showcases)

- ~18–24 properties: id, title, type, price (realistic SME market range),
  beds/baths/area, status, normalized map coordinates, agent, documents list,
  lead links.
- ~10–14 leads: fictional name, source, budget, stage, linked property.
- ~8 appointments: property + lead + time + state; ~6 offers: lead + property
  + amount + state (draft/sent/accepted/declined).
- Imagery: none required from Claude — property galleries render as neutral
  schematic tiles until ChatGPT supplies generated interiors (one-at-a-time
  asset request later). Map is drawn in code.

### Placements

- Homepage Product Concepts card, slot 1 (after ChatGPT names it).
- `/showcases/<slug>` shell, same registry-driven pattern as the existing
  five concepts + per-view routes.
- Service-page embed candidate on `/services/crm-systems` (decide after
  launch; Northline embed stays until then).

---

## 2. Blueprint B — Healthcare mobile application (flagship, mobile-first)

Working title: "Care companion concept" (name owned by ChatGPT).
Audience: small clinics and their patients. Fictional patient data only.

### View map (wave 1 scope: 5 mobile views + 1 clinic view)

| # | View | Platform | Contents |
| - | ---- | -------- | -------- |
| 1 | Today | Mobile | Next appointment card, care-plan progress, next medication reminder |
| 2 | Care plan | Mobile | Task list with check-ins, weekly progress |
| 3 | Medications | Mobile | Schedule, reminder states, adherence streak |
| 4 | Appointments | Mobile | Upcoming/past list, reschedule states, clinic info |
| 5 | Messages | Mobile | Scripted patient–clinic thread (no realtime backend) |
| 6 | Clinic workspace | Desktop | Today's patients, appointment schedule, care-plan templates (the "complementary clinic" surface) |

Progress trends render inside views 1–3 as compact charts; no separate
analytics view (avoids dashboard sameness per the owner's diversity rule).

### Data requirements

- 1 primary fictional patient persona + a small roster for the clinic view.
- Medications: generic names, schedules, reminder states, adherence series.
- Appointments, care tasks, one scripted message thread — all fictional.
- Presentation law (Hallmark): no fake phone bezels/device chrome anywhere.
  Mobile views render as true mobile-width panels with hairline frames;
  generated imagery can later warm the surfaces via ChatGPT asset requests.

### Placements

- Homepage Product Concepts card, slot 2, presented mobile-first (the
  visual-diversity anchor against the desktop CRM).
- `/showcases/<slug>` shell; the mobile views are the default, the clinic
  workspace is a desktop view route.
- Service-page embed candidate on a healthcare/industry page (TBD).

---

## 3. Citewell — current state for editorial assessment (provisional slot 5)

Product: **Citewell** — "Answers connected to evidence." An AI
knowledge-workspace concept focused on document retrieval, source citations,
review workflows and answer quality (registry copy, verbatim).

Current views (all interactive, staging-verified 200):

| View | Contents (registry verbatim) |
| ---- | ---------------------------- |
| Answer Workspace | Curated questions, prepared answers and clickable citations |
| Source Library | Document list, version information, categories and excerpts |
| Human Review | Pending answers, supporting evidence and approve/reject decisions |
| Quality Checks | Deterministic example evaluation cases and outcomes |

Representative UI (local captures, attach to review):
`agent/uiux-audit/citewell-brief-2026-10-26/` — citewell-overview /
answers / sources / review / quality (desktop 1440) + m-overview /
m-answers (mobile 390).

Assessment questions for ChatGPT:

1. Does Citewell carry the "practical AI business applications" flagship
   slot, or is a new concept needed (e.g., AI assistant embedded in
   operations rather than a standalone knowledge workspace)?
2. If kept: what editorial angle and which 2–3 views should the homepage
   card feature?
3. If replaced: should Citewell remain in the broader gallery (like
   Northline and Forma) rather than being deleted?

---

## 4. Asset request protocol (reminder)

AR-1 4:5 portrait master is the next one-at-a-time request. Concept imagery
for A/B comes per placement as designs become ready — never batched.
