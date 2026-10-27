# RETECH Hero "Cinematic Engineering Journey" — clean-master + registration spec

**2026-10-27. First deliverable of the visual-fidelity implementation
contract. This is the asset request + alignment contract only — no
implementation starts until ChatGPT delivers the clean master(s) and the
owner approves them.** References (owner-supplied, ChatGPT-generated,
baked-in UI — NOT usable as shipped assets):

- `~/Downloads/Ideas Into Solutions_ A Digital Journey.png` (mid-journey state)
- `~/Downloads/Turning Ideas into Solutions.png` (completed five-milestone state)

## 1. What ChatGPT must generate (asset ownership law: ChatGPT generates, owner approves)

**Master A — desktop scene, 3840×2160 (16:9).** Same visual language as the
references, fully clean:

- Warm ivory upper-left sky graduating into deep forest-green atmosphere
  right; soft misty mountain bands for depth.
- Luminous green/cyan wireframe terrain occupying the lower ~60%, delicate
  network lines, denser and darker toward the right.
- Photographic engineering workshop (whiteboard wall, desk, plant) blended
  into the right ~28–32% of the frame — coherent perspective and lighting,
  not a collage edge.
- A natural luminous **trough/shelf in the terrain** following the reference
  S-curve from lower-left toward the workshop — the animated pathway will be
  traced along this feature, so it must read as real terrain, not a flat
  plane.
- **Must NOT contain:** navigation, headline, standfirst, CTAs, milestone
  markers or labels, baked-in light pathway or glow trail, any text or logos.

**Master B — mobile scene, 1600×2000 (4:5), deliberately recomposed.**
Terrain + trough in the lower half (path still readable), workshop faded or
omitted, clean ivory sky in the upper half for headline/CTA contrast. Mobile
renders the static complete state from this master — no journey animation.

**Registration aid (optional but recommended):** a marked variant of Master A
with the intended path polyline and five milestone dots drawn on it. Used
only to verify coordinate alignment before implementation; never shipped.

## 2. Registration contract (how the animation locks to the artwork)

- **Scene coordinates:** normalized 0–1000 × 0–1000 mapped to Master A's
  full frame. All path geometry and milestone positions are specified in
  scene coords; the shipped SVG overlay uses `viewBox="0 0 3840 2160"`.
- **Synchronized cropping:** the hero renders a scene wrapper with the
  master's 16:9 aspect, sized to cover the viewport (min-width/min-height
  100%, centered). `<img>` (Master A) fills the wrapper; the SVG overlay and
  the HTML milestone labels sit inside the SAME wrapper, positioned in % of
  it. Background and overlay can never descale independently — under any
  viewport crop they stay pixel-locked.
- **Milestone positions (scene %, from the references):**

  | # | Label | x | y |
  |---|-------|-----|-----|
  | 01 | Ideas | 7 | 84 |
  | 02 | Strategy | 21 | 77 |
  | 03 | Design | 36 | 68 |
  | 04 | Build | 52 | 60 |
  | 05 | Deploy | 63 | 51 |

  (05 sits at the workshop threshold. Final numbers get re-fit to the
  delivered master's actual trough before implementation; the fit is
  verified by overlaying the traced path on the master and comparing with
  the references.)

## 3. Layer architecture (contract §2, registration applied)

- **A:** `<img>` Master A (desktop) / Master B (mobile) — `fetchpriority`
  managed, DPR-aware sizes.
- **B:** restrained ambient layer (CSS/SVG) — subtle network shimmer +
  green/cyan illumination only where the master needs help; never covers the
  photographic workshop.
- **C:** one traced SVG path along the trough — layered strokes (diffuse
  ambient glow → soft halo → sharp core → traveling highlight), driven by
  path length (`getTotalLength`), not a bare dashoffset sweep.
- **D:** five milestone nodes + mono labels at the scene-coord positions;
  each activates when the traveling highlight reaches its path-length
  fraction (fractions derived from the final curve, targets ≈ 0.10 / 0.30 /
  0.52 / 0.74 / 0.96).
- **E:** the real page UI (nav, headline, standfirst, CTAs) — untouched,
  accessible HTML, theme-following.

Choreography, performance budget, reduced-motion static end state, and the
`/[locale]/hero-journey` staging-only preview route follow the contract as
written. The approved Aurora hero (`HeroSignal`) remains the production hero
and fallback; nothing in this effort touches it.

## 4. Dependency statement (honest gate)

Production-quality fidelity depends on Master A/B existing and being
approved. Until then no implementation or fidelity claim is possible: the
path cannot be traced, and milestone registration cannot be verified,
against an artwork that does not exist. Implementation begins when the
owner approves the clean masters; first implementation evidence will be the
side-by-side reference-vs-implementation package defined in contract §7.
