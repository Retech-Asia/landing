/**
 * ReTech Visual QA — reusable evidence capture (2026-10-23).
 *
 * Usage:
 *   node visual-qa/capture.mjs [--base https://staging.retech.asia] [--batches 01-home,03-work] [--quick] [--locales en,vi]
 *
 * Default base is the local prod rig (http://127.0.0.1:3312). Staging runs:
 *   --base https://staging.retech.asia   (or https://retech-landing.vercel.app)
 *
 * Output (LOCAL ONLY — never commit): visual-qa/out/<run-id>/<batch>/
 *   page-<name>.<locale>.<viewport>.png     full-page screenshots
 *   state-*.png / focus-*.png               expanded/collapsed/focused states
 *   vid-*.webm                              short interaction recordings
 *   inventory.json                          per-page content + component refs
 *   run-metadata.json                       reproducibility block (base, commit, UA…)
 *
 * Workflow rules (owner, 2026-10-23 — see visual-qa/README.md):
 * audit-first, genuine weaknesses only, batches stay compact, production
 * deployment stays separate from design acceptance.
 */
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";

// ---------- args ----------
const args = process.argv.slice(2);
const argOf = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const BASE = argOf("--base", "http://127.0.0.1:3312").replace(/\/$/, "");
const ONLY_BATCHES = argOf("--batches", null);
const LOCALES = argOf("--locales", "en,vi").split(",");
const QUICK = args.includes("--quick");

// ---------- manifest ----------
const VIEWPORTS = [
  { key: "desktop-1440", width: 1440, height: 1000 },
  { key: "desktop-1920", width: 1920, height: 1080 },
  { key: "tablet-768", width: 768, height: 1024 },
  { key: "mobile-375", width: 375, height: 812, isMobile: true },
];
const VI_VIEWPORTS = ["desktop-1440", "mobile-375"]; // compact batches; overflow check still covers all
const SHOT_VIEWPORTS = QUICK ? ["desktop-1440"] : null; // null = default per locale

// Full-page coverage per batch. `locales` narrows capture; overflow always runs en+vi.
const PAGES = [
  { batch: "01-home", name: "home", path: "/", locales: ["en", "vi"], interactions: true },
  { batch: "02-services", name: "services", path: "/services", locales: ["en", "vi"], interactions: true },
  { batch: "02-services", name: "svc-crm-systems", path: "/services/crm-systems", locales: ["en"] },
  { batch: "02-services", name: "svc-it-consulting", path: "/services/it-consulting", locales: ["en"] },
  { batch: "03-work", name: "case-studies", path: "/case-studies", locales: ["en", "vi"], interactions: true },
  { batch: "03-work", name: "cs-mining-analytics-platform", path: "/case-studies/mining-analytics-platform", locales: ["en"] },
  { batch: "03-work", name: "cs-asset-management-platform", path: "/case-studies/asset-management-platform", locales: ["en"] },
  { batch: "03-work", name: "cs-investment-intelligence-platform", path: "/case-studies/investment-intelligence-platform", locales: ["en"] },
  { batch: "03-work", name: "cs-fintech-card-marketing", path: "/case-studies/fintech-card-marketing", locales: ["en"] },
  { batch: "03-work", name: "cs-ai-analysis-saas", path: "/case-studies/ai-analysis-saas", locales: ["en"] },
  { batch: "04-process", name: "process", path: "/process", locales: ["en", "vi"], interactions: true },
  { batch: "05-unique", name: "about", path: "/about", locales: ["en", "vi"], interactions: true },
  { batch: "05-unique", name: "technologies", path: "/technologies", locales: ["en"] },
  { batch: "05-unique", name: "contact", path: "/contact", locales: ["en", "vi"], interactions: true },
];

// ---------- setup ----------
const repoCommit = (() => {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
})();
const runId = `${new Date().toISOString().slice(0, 10)}-${repoCommit}${QUICK ? "-quick" : ""}`;
const ROOT = new URL(`./out/${runId}/`, import.meta.url).pathname;
mkdirSync(ROOT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

const metadata = {
  runId,
  base: BASE,
  commit: repoCommit,
  startedAt: new Date().toISOString(),
  browser: { name: "chrome", version: browser.version() },
  playwright: (await import("playwright-core/package.json", { with: { type: "js" } }).catch(() => null))?.default?.version ?? "unknown",
  viewports: VIEWPORTS,
  locales: LOCALES,
  quick: QUICK,
  batches: ONLY_BATCHES ? ONLY_BATCHES.split(",") : "all",
  notes:
    "Headless Chrome via playwright-core channel:chrome. Consent banner accepted before capture. Full-page PNGs; interactions recorded as WebM at the interaction viewport.",
};

const dismissConsent = async (page) => {
  try {
    await page.getByRole("button", { name: /accept/i }).click({ timeout: 2500 });
    await page.waitForTimeout(250);
  } catch {}
};

const inventory = async (page) =>
  page.evaluate(() => {
    const texts = (sel) =>
      Array.from(document.querySelectorAll(sel))
        .map((n) => n.textContent?.trim().replace(/\s+/g, " "))
        .filter(Boolean)
        .slice(0, 60);
    return {
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang,
      h1: texts("h1"),
      h2: texts("h2"),
      h3: texts("h3").slice(0, 24),
      navLinks: texts("nav a").slice(0, 30),
      buttons: document.querySelectorAll("button").length,
      links: document.querySelectorAll("a[href]").length,
      forms: Array.from(document.querySelectorAll("form")).map((f) => ({
        action: f.getAttribute("action"),
        fields: Array.from(f.querySelectorAll("input,select,textarea")).map((i) => i.name || i.type),
      })),
      images: {
        total: document.querySelectorAll("img").length,
        broken: Array.from(document.querySelectorAll("img")).filter((i) => i.complete && i.naturalWidth === 0).length,
      },
      glassChips: document.querySelectorAll(".rg-glass").length,
      glassControls: document.querySelectorAll(".rg-glass-control").length,
      videos: document.querySelectorAll("video").length,
      iframes: document.querySelectorAll("iframe").length,
      sectionLabels: texts("section[aria-label]").slice(0, 12),
      animations: {
        reducedMotionSupport: !!Array.from(document.styleSheets).some((s) => {
          try { return Array.from(s.cssRules).some((r) => r.media?.mediaText?.includes("prefers-reduced-motion")); } catch { return false; }
        }),
      },
    };
  });

// ---------- capture loop ----------
let shotCount = 0, vidCount = 0;
const overflowFindings = [];

/**
 * Record one interaction clip: fresh recording context -> run actions ->
 * CLOSE the context (flushes the WebM — Video.saveAs on an open context
 * blocks forever) -> rename Playwright's random filename to `name`.
 */
const clip = async (batchDir, name, vp, actions) => {
  const cctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.isMobile,
    recordVideo: { dir: batchDir, size: { width: vp.width, height: vp.height } },
  });
  const cp = await cctx.newPage();
  try {
    await actions(cp);
  } catch (e) {
    console.log(`  clip ${name} error: ${String(e).slice(0, 120)}`);
  }
  await cctx.close();
  const tmp = (await import("fs")).readdirSync(batchDir).find((f) => f.endsWith(".webm") && f.startsWith("page@"));
  if (tmp) {
    (await import("fs")).renameSync(`${batchDir}${tmp}`, `${batchDir}${name}.webm`);
    vidCount++;
    console.log(`  clip ${name}.webm saved`);
  }
};

const gotoPage = async (p, locale, path) => {
  try {
    await p.goto(`${BASE}/${locale}${path === "/" ? "" : path}`, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await p.goto(`${BASE}/${locale}${path === "/" ? "" : path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  }
  await dismissConsent(p);
  await p.waitForTimeout(500);
};

for (const page of PAGES) {
  if (ONLY_BATCHES && !ONLY_BATCHES.split(",").includes(page.batch)) continue;
  const batchDir = `${ROOT}${page.batch}/`;
  mkdirSync(batchDir, { recursive: true });
  const viewports = SHOT_VIEWPORTS
    ? VIEWPORTS.filter((v) => SHOT_VIEWPORTS.includes(v.key))
    : VIEWPORTS.filter((v) => (page.locales.includes("vi") && LOCALES.includes("vi") ? true : true));

  for (const locale of LOCALES.filter((l) => page.locales.includes(l))) {
    const vpList = locale === "vi" ? viewports.filter((v) => VI_VIEWPORTS.includes(v.key)) : viewports;
    for (const vp of vpList) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: !!vp.isMobile,
        hasTouch: !!vp.isMobile,
        locale: locale === "vi" ? "vi-VN" : "en-US",
      });
      const p = await ctx.newPage();
      try {
        await p.goto(`${BASE}/${locale}${page.path === "/" ? "" : page.path}`, { waitUntil: "networkidle", timeout: 60000 });
      } catch {
        await p.goto(`${BASE}/${locale}${page.path === "/" ? "" : page.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      }
      await dismissConsent(p);
      await p.waitForTimeout(600);

      // overflow check on every page x viewport x locale
      const ov = await p.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      if (ov.scrollWidth > ov.innerWidth) {
        overflowFindings.push({ page: page.name, locale, viewport: vp.key, ...ov });
      }

      if (!QUICK || vp.key === "desktop-1440") {
        await p.screenshot({ path: `${batchDir}page-${page.name}.${locale}.${vp.key}.png`, fullPage: true });
        shotCount++;
      }
      if (vp.key === "desktop-1440" || vp.key === "mobile-375") {
        const inv = await inventory(p);
        inv.viewport = vp.key;
        inv.overflow = ov;
        writeFileSync(`${batchDir}inventory-${page.name}.${locale}.${vp.key}.json`, JSON.stringify(inv, null, 1));
      }
      await ctx.close();
    }
  }

  // ---- interactions (EN, desktop + mobile): short WebM + state shots ----
  if (page.interactions && LOCALES.includes("en") && !QUICK) {
    const D = { width: 1440, height: 900 };

    if (page.batch === "01-home") {
      await clip(batchDir, "vid-explorer-panel-swap", D, async (dp) => {
        await gotoPage(dp, "en", page.path);
        await dp.evaluate(() => document.querySelector("#capabilities-web-development")?.scrollIntoView({ block: "center" }));
        await dp.waitForTimeout(500);
        await dp.click('[id="capabilities-web-development"] button');
        await dp.waitForTimeout(900);
        await dp.click('[id="capabilities-ai-development"] button');
        await dp.waitForTimeout(900);
        await dp.click('[id="capabilities-web-development"] button'); // back to CRM default
        await dp.waitForTimeout(600);
      });
      await clip(batchDir, "vid-explorer-glass-hover", D, async (dp) => {
        await gotoPage(dp, "en", page.path);
        await dp.evaluate(() => document.querySelector("#capabilities-web-development")?.scrollIntoView({ block: "center" }));
        await dp.waitForTimeout(500);
        for (const id of ["crm-systems", "mobile-app-development", "ai-development", "it-consulting"]) {
          await dp.hover(`[id="capabilities-${id}"] button`).catch(() => {});
          await dp.waitForTimeout(450);
        }
      });
      // States + keyboard focus (non-recording context).
      const sctx = await browser.newContext({ viewport: D });
      const sp = await sctx.newPage();
      await gotoPage(sp, "en", page.path);
      await sp.click('[id="capabilities-ai-development"] button');
      await sp.waitForTimeout(700);
      await sp.locator("section[aria-label]").first().screenshot({ path: `${batchDir}state-explorer-expanded-ai.png` }).catch(() => {});
      shotCount++;
      await sp.evaluate(() => document.querySelector('[id="capabilities-mobile-app-development"] button')?.focus());
      await sp.keyboard.press("Shift");
      await sp.waitForTimeout(300);
      await sp.locator('[id="capabilities-mobile-app-development"]').screenshot({ path: `${batchDir}focus-explorer-row.png` }).catch(() => {});
      shotCount++;
      await sctx.close();
      // Mobile: accordion + nav menu.
      const M = { width: 375, height: 812, isMobile: true };
      await clip(batchDir, "vid-mobile-accordion", M, async (mp) => {
        await gotoPage(mp, "en", page.path);
        await mp.evaluate(() => document.querySelector("div.border-t.md\\:hidden")?.scrollIntoView({ block: "start" }));
        await mp.waitForTimeout(400);
        await mp.click("div.border-t.md\\:hidden button >> nth=1").catch(() => {});
        await mp.waitForTimeout(800);
        await mp.click("div.border-t.md\\:hidden button >> nth=2").catch(() => {});
        await mp.waitForTimeout(800);
      });
      await clip(batchDir, "vid-mobile-nav-menu", M, async (mp) => {
        await gotoPage(mp, "en", page.path);
        await mp.waitForTimeout(300);
        await mp.locator("header button").first().click().catch(() => {});
        await mp.waitForTimeout(800);
      });
    }
    if (page.batch === "02-services") {
      await clip(batchDir, "vid-services-hover-scroll", D, async (dp) => {
        await gotoPage(dp, "en", page.path);
        await dp.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
        await dp.waitForTimeout(400);
        await dp.hover("a[href*='/services/']").first().catch(() => {});
        await dp.waitForTimeout(700);
        await dp.evaluate(() => window.scrollBy(0, 500));
        await dp.waitForTimeout(700);
      });
    }
    if (page.batch === "03-work") {
      await clip(batchDir, "vid-case-cards-hover", D, async (dp) => {
        await gotoPage(dp, "en", page.path);
        await dp.evaluate(() => document.querySelectorAll("a[href*='/case-studies/']")[1]?.scrollIntoView({ block: "center" }));
        await dp.waitForTimeout(400);
        await dp.hover("a[href*='/case-studies/']").first().catch(() => {});
        await dp.waitForTimeout(600);
        await dp.hover("a[href*='/case-studies/']").nth(2).catch(() => {});
        await dp.waitForTimeout(600);
      });
    }
    if (page.batch === "04-process") {
      await clip(batchDir, "vid-process-scroll", D, async (dp) => {
        await gotoPage(dp, "en", page.path);
        await dp.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 220));
          }
        });
      });
    }
    if (page.batch === "05-unique") {
      if (page.name === "about") {
        await clip(batchDir, "vid-about-values-glass", D, async (dp) => {
          await gotoPage(dp, "en", page.path);
          await dp.evaluate(() => document.querySelectorAll(".rg-glass")[3]?.scrollIntoView({ block: "center" }));
          await dp.waitForTimeout(400);
          for (const el of await dp.locator(".rg-glass-control, .rg-glass").all()) {
            await el.hover({ force: true }).catch(() => {});
            await dp.waitForTimeout(350);
          }
        });
      }
      if (page.name === "contact") {
        await clip(batchDir, "vid-contact-step1", D, async (dp) => {
          await gotoPage(dp, "en", page.path);
          await dp.evaluate(() => document.querySelector("form")?.scrollIntoView({ block: "center" }));
          await dp.waitForTimeout(400);
          // Step 1 only — never submits the form.
          await dp.getByRole("button", { name: /next/i }).first().click({ timeout: 4000 }).catch(() => {});
          await dp.waitForTimeout(800);
        });
      }
    }
  }
  console.log(`batch ${page.batch}: ${page.name} done`);
}

metadata.finishedAt = new Date().toISOString();
metadata.screenshots = shotCount;
metadata.videos = vidCount;
metadata.overflowFindings = overflowFindings;
writeFileSync(`${ROOT}run-metadata.json`, JSON.stringify(metadata, null, 1));
await browser.close();
console.log(`capture done: ${shotCount} shots, ${vidCount} videos, ${overflowFindings.length} overflow findings -> ${ROOT}`);
