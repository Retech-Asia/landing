# RT-18b — LCP investigation findings (2026-10-22, owner checkpoint 2 §1)

Question: is the restored LitDunes hero responsible for the reported LCP regression,
and can mobile LCP reach ≤2.5s without sacrificing the hero? All measurements below
are production-equivalent (`npx next build` + `npx next start`, local port 4324),
Lighthouse mobile emulation (Moto G class, slow 4G, 4x CPU, lantern simulation),
same rig for every run including the production baseline.

## Verdict

The dunes are not the cost. A same-build A/B isolates them at **0 ms** of LCP in
both observed and simulated measurement. The reported 5.3 s is Lighthouse's lantern
network model of the document delivery, present with the shader fully disabled, and
the live production site scores in the same band on the identical model.

## Evidence chain

| Run set | Sim LCP (mobile) | Observed LCP | Notes |
| --- | --- | --- | --- |
| Final build, dunes ON (3 runs) | 4.58 / 5.30 / 5.31 s | 155-191 ms | recorded gate: tsc clean, 26/26 probes |
| Final build, WebGL disabled (2 runs) | 5,309 / 5,305 ms | 170 / 176 ms | same server, same session — clean dunes A/B |
| Real GPU (`--use-angle=metal`, 1 run) | 5.2 s | — | SwiftShader (software GL) ruled out |
| Fonts-ready gate build (3 runs, superseded) | 5.30 median | — | no benefit; gate removed from source |
| Production retech.asia/en, live (3 runs) | 3.7 / 3.9 / 6.4 s | 1,370 ms | old design, old dunes — same LCP element |
| RT-07 dunes-off build (earlier round) | ~1.9 s | — | different build; not a valid dunes A/B |

1. **LCP element (local build):** the hero standfirst `<p>` ("Full-cycle software
   development…"), SSR text. Browser-trace candidates: navbar logo IMG at +58 ms,
   standfirst P finalized at +153 ms; FCP 58 ms. The Lighthouse report attributes
   5.3 s to the same P — i.e. the number is a modeled estimate, not an observed
   paint (Lighthouse `metrics` debugdata: observedLargestContentfulPaint 153,
   largestContentfulPaint 5297).
2. **The canvas never becomes the LCP candidate.** It mounts idle-deferred after
   first paint and its fades do not register a larger candidate. TBT is 25-30 ms
   (hydration + shader init cost ~nothing on the main thread model).
3. **Contribution separation (owner §1 checklist):**
   - Fonts: land at ~130 ms observed; `preload:false` is a recorded RT-06 law
     (preloading both subsets double-downloaded and measured WORSE, LCP 5.5 s).
     In lantern's model fonts queue late — a modeling artifact of discovery-only
     loading, not an observed delay.
   - CSS/hydration/WebGL: TBT 25-30 ms; real-GPU run unchanged (5.2 s).
   - Network: the dominant modeled factor — 184 KiB HTML (32 KiB transfer)
     streams late in the simulation on the localhost h1 path. Production's
     near-identical document (179 KiB / 28 KiB) models 3.7-6.4 s on the same rig.
4. **≤2.5 s assessment:** no hero-side lever moves the simulated number (proven by
   the dunes-off runs). The only real levers are (a) shrinking the ~184 KiB
   homepage document (below-fold restructure — touches SSR law and page scope,
   needs an owner call) and (b) measuring against a real h2 origin (Vercel
   preview at RT-14), where production currently models 3.7 s on the same design
   pattern. Recommendation: treat lantern localhost numbers as directional, gate
   the release on a Vercel preview measurement (RT-14), keep the hero intact.
5. **Uncommitted RT-18b code changes kept:**
   - Static brand-wash fallback layer (`.lit-dunes-fallback`) + 0.6 s canvas
     fade-in (reduced-motion disables it): progressive rendering without a
     disruptive transition, per checkpoint §1.
   - Mobile internal scale 0.75 (<768 px viewport, on top of the DPR 1.75 clamp):
     cuts fragment work ~44% at phone densities; screenshots at 375 show no
     visible quality change (soft gradients + contours).
   - Fonts-ready arming gate: measured no benefit (5.30 vs 5.16/5.30 median) and
     its premise is disproven by the A/B — REMOVED; plain idle-arming restored.

## Artifacts

`.tmp-audit/rt18/`: `final-run{1,2,3}.json` (recorded triple), `nowgl-run{1,2}.json`
(WebGL-off A/B), `gpu-run1.json` (Metal), `trace-run-0.trace.json` (+ paired
`trace-run.json`), `prod-run{1,2,3}.json` (live production baseline), `redir-run{1,2}.json`
(redirect-connection hypothesis, dead), `final-home-en-{375,1440}.png`, `probe.js` (26/26).
