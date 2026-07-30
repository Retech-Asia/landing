#!/usr/bin/env node
/**
 * Generate /public/images/logo-full.svg — the composed Retech Solutions
 * lockup: hexagonal-R icon + "Retech Solutions" wordmark in General Sans
 * Bold, as one vector asset.
 *
 * The wordmark is converted to vector paths (not <text>), so it renders
 * identically across every browser/OS without depending on web fonts.
 *
 * Theme adaptation is via CSS custom properties:
 *   "Retech"    → fill: var(--lockup-text, currentColor)
 *   "Solutions" → fill: var(--lockup-accent, var(--brand))
 *
 * Run via: npm run generate:logo-full
 */

const fs = require("fs/promises");
const path = require("path");
const fontkit = require("fontkit");

const ROOT = path.join(__dirname, "..");
const ICON_PATH = path.join(ROOT, "public", "images", "logo.svg");
const OUT_SVG = path.join(ROOT, "public", "images", "logo-full.svg");
const OUT_TSX = path.join(ROOT, "src", "components", "ui", "BrandLockup.tsx");

const TEXT = "Retech Solutions";
const FONT_SIZE = 48;
const TRACKING_EM = -0.04; // tight tracking, matches Navbar/Footer
const BASELINE_Y = 82;

/** Find General Sans 700 woff2 fetched by Next.js at build time. */
async function findWoff2() {
  const candidates = [
    path.join(ROOT, ".next", "static", "media"),
    path.join(ROOT, ".next", "dev", "static", "media"),
  ];
  for (const dir of candidates) {
    try {
      const files = await fs.readdir(dir);
      const match = files.find(
        (f) => /^general_sans_700/.test(f) && f.endsWith(".woff2")
      );
      if (match) return path.join(dir, match);
    } catch {
      // dir doesn't exist
    }
  }
  throw new Error(
    "General Sans 700 woff2 not found. Run `npm run dev` or `npm run build` first."
  );
}

/**
 * Build SVG path data for a substring of the wordmark, origin at (0, 0).
 * Uses fontkit's per-glyph API + manual kerning via getKerningValue.
 */
async function buildPathForSubstring(font, text) {
  const scale = FONT_SIZE / font.unitsPerEm;
  const trackingPx = TRACKING_EM * FONT_SIZE;

  const chars = [...text];
  const glyphIds = chars.map((c) => font.glyphForCodePoint(c.codePointAt(0)).id);
  const glyphs = glyphIds.map((id) => font.getGlyph(id));

  const commands = [];
  let x = 0;

  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];

    // glyph.path is a Path object in font units; scale + translate
    const p = glyph.path;
    for (const cmd of p.commands) {
      const sx = x + cmd.args[0] * scale;
      const sy = BASELINE_Y - cmd.args[1] * scale;
      switch (cmd.command) {
        case "moveTo":
          commands.push(`M${sx.toFixed(2)} ${sy.toFixed(2)}`);
          break;
        case "lineTo":
          commands.push(`L${sx.toFixed(2)} ${sy.toFixed(2)}`);
          break;
        case "quadraticCurveTo": {
          const cx = x + cmd.args[0] * scale;
          const cy = BASELINE_Y - cmd.args[1] * scale;
          const ex = x + cmd.args[2] * scale;
          const ey = BASELINE_Y - cmd.args[3] * scale;
          commands.push(`Q${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`);
          break;
        }
        case "bezierCurveTo": {
          const c1x = x + cmd.args[0] * scale;
          const c1y = BASELINE_Y - cmd.args[1] * scale;
          const c2x = x + cmd.args[2] * scale;
          const c2y = BASELINE_Y - cmd.args[3] * scale;
          const ex = x + cmd.args[4] * scale;
          const ey = BASELINE_Y - cmd.args[5] * scale;
          commands.push(`C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`);
          break;
        }
        case "closePath":
          commands.push("Z");
          break;
      }
    }

    x += glyph.advanceWidth * scale + trackingPx;
  }

  return { pathData: commands.join(""), width: x - trackingPx };
}

/** Extract inner <g>...</g> paths from the icon SVG. */
async function readIconInner() {
  const svg = await fs.readFile(ICON_PATH, "utf8");
  const match = svg.match(/<g>([\s\S]*?)<\/g>/);
  if (!match) throw new Error("Could not find <g> in icon SVG");
  return match[1];
}

function indentPaths(inner, pad) {
  return inner
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => pad + l)
    .join("\n");
}

async function main() {
  console.log("[logo-full] Loading General Sans 700...");
  const woff2Path = await findWoff2();
  const font = fontkit.create(await fs.readFile(woff2Path));
  console.log(`[logo-full]   unitsPerEm: ${font.unitsPerEm}`);

  console.log("[logo-full] Reading icon SVG...");
  const iconInner = await readIconInner();

  console.log("[logo-full] Building wordmark paths...");
  const retech = await buildPathForSubstring(font, "Retech");
  const solutions = await buildPathForSubstring(font, " Solutions");
  console.log(`[logo-full]   "Retech"    width: ${retech.width.toFixed(2)}px`);
  console.log(`[logo-full]   " Solutions" width: ${solutions.width.toFixed(2)}px`);

  // Icon: native viewBox 548x611. Scale to target height ~110px.
  const ICON_TARGET_HEIGHT = 110;
  const ICON_SCALE = ICON_TARGET_HEIGHT / 611;
  const ICON_TARGET_WIDTH = 548 * ICON_SCALE; // ~98.5
  const ICON_X = 8;
  // Vertically center icon optical center on wordmark optical center
  // (~baseline 82, cap height ~36, so wordmark center ≈ 64).
  const ICON_Y = 64 - ICON_TARGET_HEIGHT / 2 - 4;

  const GAP = 10;
  const RIGHT_PAD = 16;
  const wordmarkX = ICON_X + ICON_TARGET_WIDTH + GAP;
  const svgWidth = wordmarkX + Math.max(retech.width, solutions.width) + RIGHT_PAD;
  const svgHeight = 140;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Retech Solutions composed lockup. AUTO-GENERATED by scripts/generate-logo-full.js.
     Icon paths from public/images/logo.svg; wordmark paths converted from
     General Sans 700 woff2 via fontkit. No <text> elements — renders
     identically across browsers/OS without web fonts.

     Theme adaptation via CSS custom properties on the parent element:
       .navbar-link { color: var(--foreground); --lockup-accent: var(--brand); }
       .footer-link { color: white;              --lockup-accent: var(--brand-light); }
-->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.round(svgWidth)} ${svgHeight}" width="${Math.round(svgWidth)}" height="${svgHeight}" role="img" aria-label="Retech Solutions">
  <g transform="translate(${ICON_X.toFixed(2)} ${ICON_Y.toFixed(2)}) scale(${ICON_SCALE.toFixed(6)})">
${indentPaths(iconInner, "    ")}
  </g>
  <path d="${retech.pathData}" fill="var(--lockup-text, currentColor)" transform="translate(${wordmarkX.toFixed(2)} 0)"/>
  <path d="${solutions.pathData}" fill="var(--lockup-accent, var(--brand))" transform="translate(${wordmarkX.toFixed(2)} 0)"/>
</svg>
`;

  await fs.writeFile(OUT_SVG, svg, "utf8");
  const bytes = Buffer.byteLength(svg);
  console.log(
    `[logo-full] ✓ Wrote ${OUT_SVG} (${bytes} bytes, ${Math.round(svgWidth)}x${svgHeight})`
  );

  // Also emit a React component that inlines the same paths as JSX so
  // CSS custom properties (currentColor, var(--brand)) propagate from
  // the parent — which they don't when the SVG is loaded via <img>.
  const tsx = `// AUTO-GENERATED by scripts/generate-logo-full.js. Do not edit by hand.
// Icon paths: public/images/logo.svg. Wordmark paths: General Sans 700 woff2
// converted to outlines via fontkit.
//
// Colors adapt to parent context:
//   - "Retech" uses \`fill="currentColor"\` — inherits parent text color.
//   - "Solutions" uses \`fill="var(--lockup-accent, var(--brand))"\` —
//     override --lockup-accent on the parent to recolor per surface.
//
// Usage:
//   <BrandLockup className="h-8" />                                    // navbar default
//   <BrandLockup className="h-8" style={{ color: "white", ["--lockup-accent" as string]: "var(--brand-light)" }} />  // footer

import { cn } from "@/lib/cn";

type BrandLockupProps = {
  className?: string;
  /** Title for accessibility; defaults to "Retech Solutions". */
  title?: string;
  /** Inline styles (use to override color and --lockup-accent per surface). */
  style?: React.CSSProperties;
};

const ICON_PATHS = ${JSON.stringify(iconInner.split(/\n/).map((l) => l.trim()).filter(Boolean))};

const RETECH_PATH = ${JSON.stringify(retech.pathData)};

const SOLUTIONS_PATH = ${JSON.stringify(solutions.pathData)};

const VIEW_W = ${Math.round(svgWidth)};
const VIEW_H = ${svgHeight};
const ICON_X = ${ICON_X.toFixed(2)};
const ICON_Y = ${ICON_Y.toFixed(2)};
const ICON_SCALE = ${ICON_SCALE.toFixed(6)};
const WORDMARK_X = ${wordmarkX.toFixed(2)};

export function BrandLockup({ className, title = "Retech Solutions", style }: BrandLockupProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 " + VIEW_W + " " + VIEW_H}
      width={VIEW_W}
      height={VIEW_H}
      role="img"
      aria-label={title}
      className={cn("w-auto", className)}
      style={style}
    >
      <title>{title}</title>
      <g transform={\`translate(\${ICON_X} \${ICON_Y}) scale(\${ICON_SCALE})\`}>
        {ICON_PATHS.map((d, i) => (
          <path key={"icon-" + i} d={d.match(/d="([^"]+)"/)?.[1] || ""} fill="var(--lockup-icon, #30AB47)" />
        ))}
      </g>
      <path d={RETECH_PATH} fill="currentColor" transform={\`translate(\${WORDMARK_X} 0)\`} />
      <path d={SOLUTIONS_PATH} fill="var(--lockup-accent, var(--brand))" transform={\`translate(\${WORDMARK_X} 0)\`} />
    </svg>
  );
}
`;

  await fs.writeFile(OUT_TSX, tsx, "utf8");
  console.log(`[logo-full] ✓ Wrote ${OUT_TSX}`);
}

main().catch((err) => {
  console.error("[logo-full] Error:", err.stack || err);
  process.exit(1);
});
