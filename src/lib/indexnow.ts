/**
 * IndexNow protocol implementation.
 *
 * IndexNow is a free, open protocol supported by Bing, Yandex, and Naver
 * that lets site owners notify search engines of new/changed URLs in
 * near-real-time (vs. waiting for the next organic crawl). Official spec:
 * https://www.indexnow.org/documentation
 *
 * Setup:
 *   1. A stable key lives at `public/<KEY>.txt` so Bing can fetch it for
 *      ownership verification. The file contents MUST equal the key.
 *   2. The same key is exposed to the runtime via the INDEXNOW_KEY env var
 *      (defaulted below for consistency — change in both places together).
 *   3. Ping via the `/api/indexnow` route whenever content changes (e.g.,
 *      on revalidate, on form submit, manually from a CMS webhook).
 */

/**
 * Default key — must match the file name `public/<KEY>.txt`.
 * Generate a new one: `openssl rand -hex 16` and update both places.
 */
export const DEFAULT_INDEXNOW_KEY =
  "d77576ae8774681ae39c2e20e6e5f01a";

export function getIndexNowKey(): string {
  return process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
}

/**
 * Submit URLs to IndexNow. Per spec, you can submit up to 10,000 URLs per
 * request. Bing accepts either GET (single URL) or POST (batch).
 *
 * @example
 *   await pingIndexNow(["https://www.retech.asia/", "https://www.retech.asia/about"]);
 */
export async function pingIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
  keyLocation: string;
}> {
  const key = getIndexNowKey();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.retech.asia";
  const keyLocation = `${siteUrl}/${key}.txt`;

  if (urls.length === 0) {
    return { ok: false, status: 400, submitted: 0, keyLocation };
  }

  // Single URL → GET. Multiple → POST. GET is simpler and works everywhere;
  // POST is required for batches. Both are accepted by the spec.
  if (urls.length === 1) {
    const u = new URL("https://api.indexnow.org/indexnow");
    u.searchParams.set("url", urls[0]);
    u.searchParams.set("key", key);
    u.searchParams.set("keyLocation", keyLocation);

    try {
      const res = await fetch(u, { method: "GET", redirect: "follow" });
      return {
        ok: res.ok || res.status === 200,
        status: res.status,
        submitted: 1,
        keyLocation,
      };
    } catch {
      return { ok: false, status: 0, submitted: 0, keyLocation };
    }
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(siteUrl).host,
        key,
        keyLocation,
        urlList: urls,
      }),
    });
    return {
      ok: res.ok || res.status === 200,
      status: res.status,
      submitted: urls.length,
      keyLocation,
    };
  } catch {
    return { ok: false, status: 0, submitted: 0, keyLocation };
  }
}
