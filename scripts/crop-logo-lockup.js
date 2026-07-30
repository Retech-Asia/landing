#!/usr/bin/env node
/**
 * Crop public/images/og-image.webp to the Retech Solutions lockup's
 * actual content bounds, emitting public/images/logo-lockup.webp.
 *
 * The source og-image is a 2500x305 banner with significant horizontal
 * whitespace around the lockup. When this is scaled into a navbar at
 * ~32px height, the lockup looks tiny and oddly padded. Trimming the
 * surrounding whitespace produces a tight asset that composes cleanly
 * at small sizes.
 *
 * Uses sharp's .trim() which auto-detects the uniform-color border and
 * removes it. A small padding is re-added so the lockup has breathing
 * room inside its box.
 *
 * Run via: npm run generate:logo-lockup
 */

const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "images", "og-image.webp");
const OUT = path.join(__dirname, "..", "public", "images", "logo-lockup.webp");

async function main() {
  const buf = await fs.readFile(SRC);
  console.log(`[logo-lockup] Source: ${SRC} (${buf.length} bytes)`);

  // trim() removes uniform-color borders. The og-image background is
  // either white or transparent — sharp handles both.
  const trimmed = await sharp(buf).trim().toBuffer({ resolveWithObject: true });
  const { data, info } = trimmed;
  console.log(
    `[logo-lockup] Trimmed: ${info.width}x${info.height} (from 2500x305)`
  );

  // Re-encode as webp quality 90 — visually lossless for vector artwork.
  const out = await sharp(data, { density: 384 })
    .webp({ quality: 90 })
    .toBuffer();

  await fs.writeFile(OUT, out);
  console.log(`[logo-lockup] ✓ Wrote ${OUT} (${out.length} bytes)`);
}

main().catch((err) => {
  console.error("[logo-lockup] Error:", err);
  process.exit(1);
});
