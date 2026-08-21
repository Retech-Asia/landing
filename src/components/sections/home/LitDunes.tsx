"use client";

/**
 * Lit Dunes hero background — the approved hero scene (2026-08-21).
 *
 * Raw-WebGL port of prototypes/hero/lit-dunes.html: a slow dune heightfield
 * in tilted perspective under a five-hue aurora wash (green, cyan, violet,
 * pink, amber), topographic contour lines, rim light, and an aurora curtain
 * over the horizon (with stars in dark mode). The cursor is a lamp: it
 * raises a wide gentle mound and pools glow on the surface, trailing lazily
 * (lerp 0.010 per frame — softened twice on Jay's call; do not raise it).
 *
 * Deliberately NOT three.js: one fullscreen triangle + one fragment shader,
 * so the hero background costs zero libraries (the previous ambient pulled
 * in r3f + postprocessing for the same job).
 *
 * LCP-safe: mount is deferred via requestIdleCallback until first paint is
 * done (max 2s timeout), so the shader never blocks the hero copy.
 *
 * Reduced motion: one balanced static frame (t=47), cursor zeroed; redrawn
 * only when the theme or size changes.
 */

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* The frozen uTime for the reduced-motion static frame (balanced wash). */
const STATIC_TIME = 47;

const VERTEX_SHADER = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0., 1.); }
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uDark;

float hash(vec2 p){ p = fract(p*vec2(234.34, 435.345)); p += dot(p, p+34.23); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for(int i=0;i<3;i++){ v += a*noise(p); p *= 2.1; a *= .5; }
  return v;
}
vec3 aces(vec3 x){
  return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.);
}

// slow rolling dune heightfield; the cursor raises a broad gentle mound under
// itself (kept low so contour lines slide smoothly instead of jumping)
float dune(vec2 p, vec2 pm, float mAct, float t) {
  float h = fbm(p * 0.45 + vec2(t * 0.22, t * 0.14));
  h += 0.5 * fbm(p * 1.1 - vec2(t * 0.16, t * 0.10));
  float dm = length(p - pm);
  h += 0.15 * exp(-dm * dm * 0.24) * mAct;
  return h;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - .5*uRes) / uRes.y;
  vec2 muv = vec2(uMouse.x * 0.5 * uRes.x / uRes.y, uMouse.y * 0.5);
  float mAct = smoothstep(0.05, 0.55, length(uMouse));
  float t = uTime * 0.10;

  vec3 bgTop = uDark > .5 ? vec3(0.020, 0.022, 0.050) : vec3(0.976, 0.976, 0.962);
  vec3 bgBot = uDark > .5 ? vec3(0.030, 0.028, 0.062) : vec3(0.966, 0.966, 0.950);
  vec3 col = mix(bgBot, bgTop, smoothstep(-0.2, 0.8, uv.y + 0.30));

  vec3 ro = vec3(0.0, 0.38, 3.2);
  ro.x += uMouse.x * 0.07;
  ro.y += uMouse.y * 0.02;
  vec3 rd = normalize(vec3(uv.x, uv.y - 0.30, -1.0));

  // cursor lamp position on the plane, projected from the static camera
  vec3 rdM = normalize(vec3(muv.x, muv.y - 0.30, -1.0));
  float tm = 0.38 / max(0.02, -rdM.y);
  vec2 pm = vec2(0.0, 3.2) + rdM.xz * tm;
  pm.x += uMouse.x * 0.07;

  if (rd.y < -0.02) {
    float tt = -ro.y / rd.y;
    vec3 hit = ro + rd * tt;
    vec2 p = hit.xz;

    float h  = dune(p, pm, mAct, t);
    float hx = dune(p + vec2(0.16, 0.0), pm, mAct, t) - dune(p - vec2(0.16, 0.0), pm, mAct, t);
    float hy = dune(p + vec2(0.0, 0.16), pm, mAct, t) - dune(p - vec2(0.0, 0.16), pm, mAct, t);
    float slope = length(vec2(hx, hy));

    // topographic contour lines wrapping the dunes (and the cursor mound)
    float k = abs(fract(h * 9.0 + 0.5) - 0.5);
    float contour = 1.0 - smoothstep(0.02, 0.09 + slope * 0.05, k);

    // aurora wash: hue ramps along the depth diagonal so green/cyan/violet/pink
    // bands coexist on the terrain; fbm breaks the band edges so it reads
    // woven, not striped
    float m = fract((p.x * 0.20 + p.y * 0.34) - t * 0.03
             + 0.30 * fbm(vec2(p.x * 0.5 - t * 0.55, p.y * 0.35 + 3.1)));
    vec3 wash = mix(vec3(0.10, 0.78, 0.32), vec3(0.06, 0.75, 0.86), smoothstep(0.0, 0.25, m));
    wash = mix(wash, vec3(0.45, 0.30, 1.00), smoothstep(0.22, 0.48, m));
    wash = mix(wash, vec3(0.92, 0.30, 0.62), smoothstep(0.45, 0.70, m));
    wash = mix(wash, vec3(0.95, 0.62, 0.24), smoothstep(0.68, 0.92, m));
    wash = mix(wash, vec3(0.10, 0.78, 0.32), smoothstep(0.90, 1.0, m));

    // rim light: ridges facing the wash catch a bright edge
    float rim = pow(clamp(1.0 - slope * 1.4, 0.0, 1.0), 3.0) * 0.55
              + pow(clamp(hx * 1.2, 0.0, 1.0), 2.0) * 0.30;

    // cursor lamp glow pooling on the surface: wide and soft, not a hot spot
    float dm = length(p - pm);
    vec3 lampCol = mix(vec3(0.35, 0.90, 0.55), vec3(0.60, 0.55, 1.00), 0.5 + 0.5 * sin(t * 0.5));
    vec3 lamp = lampCol * exp(-dm * dm * 0.32) * 0.50 * mAct;

    float xr = smoothstep(-3.4, 0.6, p.x);
    float fog = exp(-max(tt - 2.4, 0.0) * 0.30);

    vec3 base = uDark > .5 ? vec3(0.045, 0.048, 0.085) : vec3(0.90, 0.905, 0.90);
    vec3 terrain = base;
    vec3 lit = (wash * (0.38 + rim) + lamp) * xr;
    if (uDark > .5) {
      terrain += lit;
      terrain += wash * contour * 0.85 * xr + lamp * contour * 1.2 * mAct;
    } else {
      float lum = dot(lit + wash * contour * 0.8, vec3(0.333));
      vec3 tint = normalize(lit + wash * contour + 0.001);
      terrain = mix(terrain, tint * 0.92, clamp(lum * 1.15, 0.0, 0.9));
    }
    col = mix(col, terrain, fog);
  } else {
    // sky: aurora curtains hanging over the horizon
    float curtain = fbm(vec2(uv.x * 1.6 + t * 0.4, t * 0.3));
    float band = exp(-pow((uv.y - 0.34 - (curtain - 0.5) * 0.12) * 5.0, 2.0));
    vec3 cCol = mix(vec3(0.10, 0.78, 0.32), vec3(0.52, 0.38, 0.98), curtain);
    if (uDark > .5) {
      col += cCol * band * 0.16 * smoothstep(0.9, 0.2, uv.x + 0.5);
      float star = smoothstep(0.9965, 1.0, hash(floor(gl_FragCoord.xy / 2.0)));
      col += vec3(star * 0.35 * (0.5 + 0.5 * sin(uTime * 2.0 + hash(floor(gl_FragCoord.xy)) * 6.28)));
    } else {
      col = mix(col, cCol * 0.95 + 0.03, band * 0.10);
    }
  }

  float gr = hash(gl_FragCoord.xy + uTime);
  col += (gr - .5) * 0.012;
  col = aces(col * 1.12);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function LitDunes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  // Defer mount until idle (LCP protection)
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const idle =
      (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback ??
      ((cb: () => void) => setTimeout(cb, 1200) as unknown as number);
    const handle = idle(() => setArmed(true), { timeout: 2000 });
    return () => {
      const cancel =
        (window as Window & { cancelIdleCallback?: (h: number) => void })
          .cancelIdleCallback ??
        ((h: number) => clearTimeout(h));
      cancel(handle as number);
    };
  }, []);

  useEffect(() => {
    if (!armed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uDark = gl.getUniformLocation(prog, "uDark");

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === 0 || h === 0) return false;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      return true;
    };

    const render = (t: number, mx: number, my: number) => {
      if (!resize()) return;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uDark, isDark());
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Lazy cursor trail — 0.010/frame (Jay-softened; see memory before tuning)
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.010;
      mouse.y += (mouse.ty - mouse.y) * 0.010;
      render(STATIC_TIME + (now - t0) / 1000, mouse.x, mouse.y);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf === 0 && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onResize = () => {
      if (reduced) render(STATIC_TIME, 0, 0);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (reduced) render(STATIC_TIME, 0, 0);
      else start();
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };

    // Theme changes: uDark follows the data-theme attribute on <html>
    const themeObserver = new MutationObserver(() => {
      if (reduced) render(STATIC_TIME, 0, 0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    // First frame
    if (reduced) render(STATIC_TIME, 0, 0);
    else start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("pointermove", onMove);
      themeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [armed, reduced]);

  if (!armed) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
