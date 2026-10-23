/**
 * Lit Dunes scene — byte-identical port of the approved shader in
 * src/components/sections/home/LitDunes.tsx (Brand Field palette,
 * 2026-08-23; cursor lamp lerp 0.010; full-width terrain 2026-08-24).
 * Shared by the 2026-10-23 hero concept prototypes. DO NOT EDIT the
 * shader here without mirroring the change in the React component —
 * the approved scene is protected (owner directive).
 */
(function mountLitDunes() {
  const canvas = document.querySelector("canvas[data-lit-dunes]");
  if (!canvas) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) { canvas.style.display = "none"; return; }

  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
  const FS = `
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

    float k = abs(fract(h * 9.0 + 0.5) - 0.5);
    float contour = 1.0 - smoothstep(0.02, 0.09 + slope * 0.05, k);

    float m = fract(0.16 + (p.x * 0.20 + p.y * 0.34) - t * 0.03
             + 0.30 * fbm(vec2(p.x * 0.5 - t * 0.55, p.y * 0.35 + 3.1)));
    vec3 wash = mix(vec3(0.060, 0.380, 0.160), vec3(0.125, 0.522, 0.208), smoothstep(0.0, 0.25, m));
    wash = mix(wash, vec3(0.188, 0.671, 0.278), smoothstep(0.22, 0.48, m));
    wash = mix(wash, vec3(0.024, 0.714, 0.831), smoothstep(0.45, 0.70, m));
    wash = mix(wash, vec3(0.545, 0.361, 0.965), smoothstep(0.68, 0.92, m));
    wash = mix(wash, vec3(0.060, 0.380, 0.160), smoothstep(0.90, 1.0, m));

    if (uDark < .5) wash = mix(wash, vec3(0.125, 0.522, 0.208), smoothstep(0.60, 0.88, m) * 0.45);

    float rim = pow(clamp(1.0 - slope * 1.4, 0.0, 1.0), 3.0) * 0.55
              + pow(clamp(hx * 1.2, 0.0, 1.0), 2.0) * 0.30;

    float dm = length(p - pm);
    vec3 lampCol = mix(vec3(0.20, 0.80, 0.40), vec3(0.024, 0.714, 0.831), 0.5 + 0.5 * sin(t * 0.5));
    vec3 lamp = lampCol * exp(-dm * dm * 0.32) * 0.50 * mAct;

    float fog = exp(-max(tt - 2.4, 0.0) * 0.30);

    vec3 base = uDark > .5 ? vec3(0.045, 0.048, 0.085) : vec3(0.90, 0.905, 0.90);
    vec3 terrain = base;
    vec3 lit = wash * (0.38 + rim) + lamp;
    if (uDark > .5) {
      terrain += lit;
      terrain += wash * contour * 0.85 + lamp * contour * 1.2 * mAct;
    } else {
      float lum = dot(lit + wash * contour * 0.8, vec3(0.333));
      vec3 tint = normalize(lit + wash * contour + 0.001);
      terrain = mix(terrain, tint * 0.92, clamp(lum * 1.15, 0.0, 0.9));
    }
    col = mix(col, terrain, fog);
  } else {
    float curtain = fbm(vec2(uv.x * 1.6 + t * 0.4, t * 0.3));
    float band = exp(-pow((uv.y - 0.34 - (curtain - 0.5) * 0.12) * 5.0, 2.0));
    vec3 cCol = mix(vec3(0.10, 0.60, 0.30), vec3(0.024, 0.714, 0.831), curtain);
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
}`;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh));
    return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uMouse = gl.getUniformLocation(prog, 'uMouse');
  const uDark = gl.getUniformLocation(prog, 'uDark');

  function resize() {
    const scale = canvas.clientWidth < 768 ? 0.75 : 1;
    const dpr = Math.min(devicePixelRatio || 1, 1.75) * scale;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  addEventListener('resize', resize); resize();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!reduced) addEventListener('pointermove', e => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 1 : 0;

  const t0 = performance.now();
  const START = 47;
  function frame(now) {
    mouse.x += (mouse.tx - mouse.x) * 0.010;
    mouse.y += (mouse.ty - mouse.y) * 0.010;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, reduced ? START : START + (now - t0) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uDark, isDark());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced) requestAnimationFrame(frame);
  }
  if (reduced) frame(0); else requestAnimationFrame(frame);
})();
