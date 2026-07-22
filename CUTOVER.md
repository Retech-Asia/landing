# Wix → Vercel Cutover Checklist

**Target domain:** `retech.asia` (+ `www.retech.asia`)
**DNS provider:** Cloudflare
**Hosting:** Vercel
**Wix expiry:** within 2 weeks of 2026-07-20 (≈ 2026-08-03)

> Your **Google Business Profile is NOT at risk.** GBP is tied to your Google
> account, not Wix. Reviews, photos, posts, verified address all survive. The
> only step after cutover is updating the "Website URL" field inside GBP.

---

## Pre-cutover (do these BEFORE touching DNS)

### 1. Vercel project
- [ ] Push this repo to GitHub and connect it to Vercel
- [ ] Set framework preset to **Next.js**
- [ ] Set environment variables (any analytics IDs, etc.) in Vercel dashboard
- [ ] Confirm production build passes (`npm run build`) locally
- [ ] Vercel auto-assigns `<project>.vercel.app` — verify the site loads there
- [ ] Run Lighthouse on the Vercel URL; confirm SEO ≥ 90

### 2. Google Search Console (GSC)
- [ ] Add `retech.asia` property in GSC (if not already)
- [ ] Verify via DNS TXT record in Cloudflare (preferred — survives cutover)
- [ ] Also add the `*.vercel.app` preview URL as a temporary verified property
- [ ] Submit the **current Wix sitemap** one last time and note any coverage
- [ ] Pre-stage the new sitemap URL: `https://www.retech.asia/sitemap.xml`

### 3. Google Analytics / Vercel Analytics
- [ ] Confirm GA4 measurement ID is wired in env vars
- [ ] Confirm Vercel Analytics is enabled in project settings
- [ ] Back up last-30-day Wix analytics screenshots for comparison

### 4. Email / MX records (CRITICAL — often forgotten)
- [ ] Check current MX records for `retech.asia` in Cloudflare DNS
- [ ] If email is hosted via Wix (Google Workspace via Wix), confirm MX records
      are pointing at Google, **not** Wix — these must NOT change during cutover
- [ ] If unsure: `dig MX retech.asia +short` before AND after cutover, compare

### 5. Back up Wix content
- [ ] Export any blog posts from Wix (JSON/HTML)
- [ ] Save screenshots of each Wix page for rollback reference
- [ ] Note any Wix-only redirects already in place inside Wix settings

---

## Cutover day (sequence — do in this order)

### Step 1 — Lower DNS TTL (1 hour before)
- [ ] In Cloudflare, lower A/CNAME TTL for `retech.asia` and `www` to **5 minutes**
- [ ] Wait 1 hour for old TTL to expire globally

### Step 2 — Add Vercel domain
- [ ] In Vercel project → Settings → Domains → add `retech.asia` (primary)
- [ ] Also add `www.retech.asia` → redirect to `retech.asia` (or vice versa)
- [ ] Vercel shows required A / CNAME records — keep this panel open

### Step 3 — Repoint DNS
- [ ] In Cloudflare:
  - Set A record `retech.asia` → `76.76.21.21` (Vercel's IP, confirm in dashboard)
  - Set CNAME `www` → `cname.vercel-dns.com`
- [ ] **Cloudflare proxy status:** if "Proxied" (orange cloud), Vercel verify
      may need a `_vercel` TXT record — follow Vercel's prompt
- [ ] Purge Cloudflare cache (Caching → Purge Everything)

### Step 4 — Verify
- [ ] `curl -I https://www.retech.asia` → should show `server: Vercel`
- [ ] Visit `https://www.retech.asia/about-us` → should 308 redirect to `/about`
- [ ] Visit `https://www.retech.asia/sitemap.xml` → should return Next.js sitemap
- [ ] Visit `https://www.retech.asia/robots.txt` → should return Next.js robots

### Step 5 — Tell Google
- [ ] GSC → submit new sitemap: `https://www.retech.asia/sitemap.xml`
- [ ] GSC → URL Inspection → "Request Indexing" on the homepage
- [ ] GBP dashboard → Profile → Website URL → set to `https://www.retech.asia`
- [ ] GBP "Start URL" / booking link → point at `/contact`

### Step 6 — Watch for 48 hours
- [ ] Monitor Vercel logs for 404 spikes (indicates missing redirects)
- [ ] Monitor GSC "Coverage" for new errors
- [ ] Keep Wix subscription active for the 48-hour overlap if possible — gives a
      rollback path. Cancel only after metrics stabilize.

---

## Post-cutover cleanup

- [ ] After 7 days of stable traffic: raise Cloudflare TTL back to 1 hour
- [ ] After 30 days of stable indexing with no rollback needed: cancel Wix
- [ ] Add the `noindex` tag to the old `*.vercel.app` preview URL in GSC (or
      delete the property) once the production domain is fully indexed
- [ ] Audit: any Wix URL still receiving hits? Add it to
      `src/lib/wix-redirect-map.ts`

---

## Rollback plan (emergency only)

If something is broken on the new site 0–24h after cutover:
1. Revert DNS A/CNAME back to Wix in Cloudflare
2. Re-enable Wix subscription (still within the 2-week window)
3. Fix the issue on a fresh Vercel preview deployment
4. Re-cut over only after the issue is verified fixed on preview

Rollback is **only safe within the Wix subscription window**. After Wix is
cancelled, rollback is no longer possible — that's why we keep Wix alive for
the 48-hour overlap.
