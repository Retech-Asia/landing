# Analytics & Lead Attribution Setup (zero-cost stack)

Last updated: 2026-10-24. All providers are free tiers, independent of
Vercel Pro. Code integration is COMPLETE and env-gated — the site renders
zero third-party scripts until the IDs below are set.

## 1. Environment variables (Vercel → Project retech-landing → Settings → Environment Variables)

| Variable | Value | Effect when missing |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` from GA4 → Admin → Data streams | GA4 never loads, no Google requests |
| `NEXT_PUBLIC_CLARITY_ID` | Project ID from clarity.microsoft.com → Settings (10 chars) | Clarity never loads |

Set for **Production, Preview, and Development** environments, then redeploy
(any push, or Deployments → Redeploy). CSP is automatically extended for
whichever providers are configured (see `next.config.ts`).

## 2. Google Analytics 4 — after the ID is set

1. **Mark the conversion key event**: Admin → Events — `generate_lead`
   appears within 24h of the first firing; toggle "Mark as key event".
   It fires ONLY on confirmed contact-form / estimate-wizard submissions
   (never on clicks or failed attempts), with `form_type`
   (`contact` | `estimate`).
2. **Register custom dimensions** (Admin → Custom definitions → Create,
   scope = Event, parameter = the exact names):
   - `last_source`, `last_medium`, `last_channel`, `last_campaign`, `last_ai`
   - `first_source`, `first_medium`, `first_channel`, `first_campaign`, `first_ai`
   - `last_landing`, `first_landing`
   - `service_interest`, `project_type`, `step`, `option` (wizard steps)
3. **Exclude internal/test traffic**: Admin → Data streams → web stream →
   "Configure tag settings" → "Define internal traffic" (your office/home
   IP) → then Admin → Data filters → activate the "Internal Traffic" filter.
   Synthetic end-to-end submissions use `name: "TEST ..."` — filter or
   ignore them when reviewing leads.
4. **Channels**: Reports → Acquisition → Traffic acquisition. AI-assistant
   visits arrive as referrals today; the observable ones (chatgpt.com,
   claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com,
   poe.com, you.com) are additionally tagged by our code with
   `last_channel = ai_assistant` + `last_ai = <hostname>` — filter the
   `generate_lead` / page-view reports on those dimensions for AI-driven
   traffic. This is deliberately conservative: visits from AI answers that
   arrive later without a visible referrer are reported as Direct, not
   guessed.

## 3. Microsoft Clarity

Create a project for `www.retech.asia`, copy the ID into the env var.
Recordings/heatmaps start immediately. Consent is wired to the cookie
banner (analytics category); **input masking is always on**. Useful views:
Dashboard → "Dead clicks" and "Rage clicks" for friction;
Recordings filtered to `/contact` and `/` for conversion-path review.

## 4. Google Search Console

Property `retech.asia` (verify via the existing Cloudflare DNS TXT).
Use: Performance → Queries (what people search), Pages (landing pages),
Countries (US share), and Search Appearance. Check "AI features"
impressions where available (Beta). Sitemap already submitted at
`https://www.retech.asia/sitemap.xml`; AI crawlers (GPTBot,
OAI-SearchBot, ChatGPT-User, CCBot) are explicitly allowed in robots.txt.

## 5. Looker Studio dashboard (free — no Vercel Pro involved)

1. lookerstudio.google.com → Create → Report → add **Google Analytics
   connector** → select the GA4 property.
2. Recommended pages/charts (data source: GA4):
   - Scorecards: Users, Sessions, Key events (`generate_lead`), Engagement rate
   - "Visitors by source": bar chart, dimension `Session source / medium`
   - "AI-assistant visits": dimension `last_ai` (filter: not empty)
   - "US audience": dimension Country (filter United States) — GA4 does not
     provide state-level reliably; use Clarity's location card for
     California-level signals
   - "Top landing pages": dimension Landing page + key events column
   - "Search queries": separate GSC data source (Search Console
     connector) → table of Queries with impressions/clicks
   - "Leads by form": dimension `form_type`, metric Key events
3. Share → "Invited people can view" (private link, owner's Google
   account). Nothing is public.

## 6. How a lead's source story reaches you

Every confirmed contact/estimate submission emails the inquiry with an
"Acquisition context" table (last-touch + first-touch source, medium,
channel, landing page, campaign, AI assistant when applicable). This is
the private lead channel (owner's inbox) — names/emails never go to GA4.

## 7. What was already in place (no action needed)

- Cookie consent banner with analytics/marketing categories (Consent Mode
  v2 default-denied), privacy policy discloses GA4 + Clarity.
- Vercel Analytics + Speed Insights (consent-gated).
- Web vitals, scroll-depth, time-on-page, outbound-click, CTA-click
  tracking (`EngagementTracker`), blog feedback events.
- Estimate-wizard progression: `estimate_step` events (step + option).
