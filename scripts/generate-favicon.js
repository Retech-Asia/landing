#!/usr/bin/env node
/**
 * Generate src/app/favicon.ico from the hexagonal-R logo SVG.
 *
 * Produces a multi-resolution ICO containing PNG-encoded frames at
 * 16, 32, 48, 64, 128, and 256px. Modern browsers use the highest
 * resolution they need; legacy browsers fall back to 16/32.
 *
 * Run via: npm run generate:favicon
 * Or directly: node scripts/generate-favicon.js
 */

const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const SIZES = [16, 32, 48, 64, 128, 256];
const SVG_PATH = path.join(__dirname, "..", "public", "images", "logo.svg");
const OUT_PATH = path.join(__dirname, "..", "src", "app", "favicon.ico");

/**
 * Pack PNG buffers into ICO format.
 *
 * ICO format (for PNG-encoded entries, Vista+):
 *   ICONDIR (6 bytes): reserved=0, type=1 (icon), count=N
 *   ICONDIRENTRY (16 bytes each): width, height, colors, reserved, planes,
 *                                 bitcount, size, offset
 *   PNG data (variable)
 */
function packIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entriesSize = 16 * count;
  let offset = headerSize + entriesSize;

  const entries = [];
  for (let i = 0; i < count; i++) {
    const { size, dimension } = pngBuffers[i];
    entries.push({
      width: dimension === 256 ? 0 : dimension, // 0 means 256 in ICO spec
      height: dimension === 256 ? 0 : dimension,
      colorCount: 0, // 0 = more than 256 colors
      reserved: 0,
      planes: 1,
      bitCount: 32,
      size,
      offset,
    });
    offset += size;
  }

  // ICONDIR
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4);

  // ICONDIRENTRY array
  const entryBuffers = entries.map((e, i) => {
    const buf = Buffer.alloc(16);
    buf.writeUInt8(e.width, 0);
    buf.writeUInt8(e.height, 1);
    buf.writeUInt8(e.colorCount, 2);
    buf.writeUInt8(e.reserved, 3);
    buf.writeUInt16LE(e.planes, 4);
    buf.writeUInt16LE(e.bitCount, 6);
    buf.writeUInt32LE(e.size, 8);
    buf.writeUInt32LE(e.offset, 12);
    return buf;
  });

  return Buffer.concat([
    header,
    ...entryBuffers,
    ...pngBuffers.map((p) => p.data),
  ]);
}

async function main() {
  const svgBuffer = await fs.readFile(SVG_PATH);
  console.log(`[favicon] Read SVG: ${svgBuffer.length} bytes`);

  const pngBuffers = [];
  for (const dimension of SIZES) {
    const png = await sharp(svgBuffer, { density: 384 })
      .resize(dimension, dimension, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ dimension, size: png.length, data: png });
    console.log(`[favicon]   ${dimension}x${dimension}: ${png.length} bytes`);
  }

  const ico = packIco(pngBuffers);
  await fs.writeFile(OUT_PATH, ico);
  console.log(
    `[favicon] ✓ Wrote ${OUT_PATH} (${ico.length} bytes, ${SIZES.length} resolutions)`
  );
}

main().catch((err) => {
  console.error("[favicon] Error:", err);
  process.exit(1);
});
