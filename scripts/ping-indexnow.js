#!/usr/bin/env node
/**
 * Postbuild IndexNow ping.
 *
 * Runs automatically after `npm run build` on Vercel production deploys via
 * the `postbuild` script in package.json. Pings IndexNow with the full
 * sitemap so Bing/Yandex/Naver recrawl within hours instead of weeks.
 *
 * No-op on local dev and on Vercel preview branches — only fires when
 * VERCEL_ENV === "production".
 *
 * For ad-hoc URL submission (e.g., after manually editing a blog post
 * without a full redeploy), run:
 *   node scripts/ping-indexnow.js https://www.retech.asia/blog/some-post
 */

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "d77576ae8774681ae39c2e20e6e5f01a";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.retech.asia";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

/** Submit a list of URLs to IndexNow (POST batch). Returns the API response status. */
async function submitBatch(urls) {
  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, submitted: urls.length };
  } catch (err) {
    return { ok: false, status: 0, submitted: 0, error: err.message };
  }
}

/** Fetch /sitemap.xml, extract every <loc>, return as string array. */
async function fetchSitemapUrls() {
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!res.ok) {
      throw new Error(`sitemap fetch returned ${res.status}`);
    }
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
    return matches.map((m) => m[1].trim());
  } catch (err) {
    console.error(`[indexnow] Failed to fetch sitemap: ${err.message}`);
    return [];
  }
}

async function main() {
  // CLI mode: explicit URLs passed as args
  const cliUrls = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  if (cliUrls.length > 0) {
    console.log(`[indexnow] Submitting ${cliUrls.length} URL(s) to IndexNow...`);
    const result = await submitBatch(cliUrls);
    if (result.ok) {
      console.log(
        `[indexnow] ✓ OK (${result.status}) — ${result.submitted} URL(s) submitted`
      );
    } else {
      console.error(`[indexnow] ✗ Failed (status ${result.status})`);
      process.exit(1);
    }
    return;
  }

  // Postbuild mode: only fire on Vercel production
  if (process.env.VERCEL_ENV !== "production") {
    console.log(
      `[indexnow] Skipping (VERCEL_ENV=${process.env.VERCEL_ENV || "local"})`
    );
    return;
  }

  console.log("[indexnow] Production deploy detected — fetching sitemap...");
  const urls = await fetchSitemapUrls();
  if (urls.length === 0) {
    console.error("[indexnow] No URLs found in sitemap — skipping ping.");
    return;
  }

  console.log(`[indexnow] Submitting ${urls.length} URLs from sitemap...`);
  const result = await submitBatch(urls);
  if (result.ok) {
    console.log(
      `[indexnow] ✓ OK (${result.status}) — ${result.submitted} URL(s) submitted`
    );
  } else {
    console.error(`[indexnow] ✗ Failed (status ${result.status})`);
  }
}

main().catch((err) => {
  console.error(`[indexnow] Unhandled error:`, err);
  // Don't fail the build over an IndexNow ping failure.
  process.exit(0);
});
