import { useEffect, useRef } from 'react';

/**
 * Hero background shader.
 *
 * Faithful WebGL port of the original 4-layer shader stack (which ran on a
 * three.js WebGPU renderer and therefore only worked in WebGPU browsers):
 *
 *   1. Swirl        flowing multi-layered noise, colorA #ffffff -> colorB #f0f0f0,
 *                   detail 1.7, speed 1 (default)
 *   2. ChromaFlow   cursor-driven liquid: a 128x128 velocity/intensity simulation
 *                   stepped on the CPU every frame. base #ffffff, flow #ff5f03,
 *                   intensity 1.3, radius 3 (default), momentum 30 (default)
 *   3. FlutedGlass  rounded cylindrical bars refracting layers 1+2.
 *                   angle 31, frequency 8, softness 1, speed 0.15, refraction 4,
 *                   aberration 0.61, lightAngle -90, highlight 0.12, highlightSoftness 0
 *   4. FilmGrain    strength 0.05, bias 2 (default), not animated
 *
 * Pass 1 renders layers 1+2 into a texture; pass 2 refracts that texture through
 * the glass and adds grain.
 */

const SIM = 128; // ChromaFlow simulation grid

// ---- ChromaFlow parameters ----
const FLOW_INTENSITY = 1.3;
const FLOW_RADIUS = 3;
const FLOW_MOMENTUM = 30;

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Pass 1: Swirl + ChromaFlow
const SCENE_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_flow; // R,G = velocity (0..1 => -1..1), B = intensity

const vec3  COLOR_A     = vec3(1.0);                               // #ffffff
const vec3  COLOR_B     = vec3(0.9411764706);                      // #f0f0f0
const float DETAIL      = 1.7;
const float SWIRL_SPEED = 1.0;
const vec3  BASE_COLOR  = vec3(1.0);                               // #ffffff
const vec3  FLOW_COLOR  = vec3(1.0, 0.3725490196, 0.0117647059);   // #ff5f03

vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 toSRGB(vec3 c)   { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }

vec3 swirl(vec2 uv) {
  float t = u_time * SWIRL_SPEED;
  float r = DETAIL;
  vec2 a = vec2(
    uv.x + sin(uv.y * r * 1.7 + t * 0.8) * 0.12 + cos(uv.x * r * 0.9 - t * 0.5) * 0.05,
    uv.y + cos(uv.x * r * 1.3 - t * 0.6) * 0.12 + sin(uv.y * r * 1.1 + t * 0.7) * 0.05);
  float o = sin(a.x * r * 2.1 + a.y * r * 1.8 + t * 0.4);
  float l = r * 2.1;
  vec2 c = vec2(
    a.x + cos(a.y * l * 2.7 - t * 0.45) * 0.07 + sin(a.x * l * 1.9 + t * 0.6) * 0.04,
    a.y + sin(a.x * l * 2.3 + t * 0.65) * 0.07 + cos(a.y * l * 1.6 - t * 0.4) * 0.04);
  float u = cos(c.x * l * 1.4 - c.y * l * 1.9 + t * 0.35);
  float d = r * 3.7;
  vec2 h = vec2(
    c.x + sin(c.y * d * 1.8 + t * 0.85) * 0.04 + cos(c.x * d * 1.3 - t * 0.55) * 0.025 + sin((c.x + c.y) * d * 0.7 + t * 0.9) * 0.02,
    c.y + cos(c.x * d * 1.6 - t * 0.75) * 0.04 + sin(c.y * d * 1.1 + t * 0.5) * 0.025 + cos((c.x + c.y) * d * 0.8 - t * 0.95) * 0.02);
  float f = sin(h.x * d * 1.1 + h.y * d * 1.5 - t * 0.55);
  float p = o * 0.45 + u * 0.35 + f * 0.2;
  float m = smoothstep(0.3, 0.7, p * 0.5 + 0.5);
  vec3 col = mix(COLOR_A, COLOR_B, m);
  float s = sin(t * 2.5 + p * 8.0) * 0.015 + 1.0;
  return col * s;
}

void main() {
  vec3 bg = swirl(v_uv);

  // 5-tap blur of the simulation texture (as in the original)
  float px = 1.0 / ${SIM}.0;
  vec3 s0 = texture2D(u_flow, v_uv).rgb;
  vec3 s1 = texture2D(u_flow, v_uv + vec2(px, 0.0)).rgb;
  vec3 s2 = texture2D(u_flow, v_uv + vec2(0.0, px)).rgb;
  vec3 s3 = texture2D(u_flow, v_uv - vec2(px, 0.0)).rgb;
  vec3 s4 = texture2D(u_flow, v_uv - vec2(0.0, px)).rgb;
  vec3 avg = (s0 + s1 + s2 + s3 + s4) * 0.2;

  vec2  vel = avg.rg * 2.0 - 1.0;
  float alpha = smoothstep(0.0, 0.1, avg.b);
  float speed = length(vel);
  float mixAmt = smoothstep(0.01, 0.1, speed);
  // every directional color is the same orange, so the direction weighting collapses.
  // Blending happens in linear light like the original renderer.
  vec3 liquid = mix(toLinear(BASE_COLOR), toLinear(FLOW_COLOR), mixAmt);
  vec3 col = mix(toLinear(bg), liquid, alpha);

  gl_FragColor = vec4(toSRGB(col), 1.0);
}`;

// Pass 2: FlutedGlass + FilmGrain
const GLASS_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_scene;
uniform vec2  u_res;
uniform float u_time;

const float ANGLE              = 31.0;
const float FREQUENCY          = 8.0;
const float SOFTNESS           = 1.0;
const float SPEED              = 0.15;
const float REFRACTION         = 4.0;
const float ABERRATION         = 0.61;
const float LIGHT_ANGLE        = -90.0;
const float HIGHLIGHT          = 0.12;
const float HIGHLIGHT_SOFTNESS = 0.0;
const vec3  HIGHLIGHT_COLOR    = vec3(1.0);
const float GRAIN              = 0.05;
const float GRAIN_BIAS         = 2.0;

// "mirror" edge mode
vec2 mirrorUV(vec2 uv) {
  vec2 f = fract(uv * 0.5) * 2.0;
  return 1.0 - abs(1.0 - f);
}
vec4 scene(vec2 uv) { return texture2D(u_scene, mirrorUV(uv)); }

void main() {
  vec2  a = v_uv;
  float o = u_res.x / u_res.y;
  float l = -u_time * SPEED;

  float ang = radians(ANGLE);
  float c = cos(ang), u = sin(ang);
  float la = radians(LIGHT_ANGLE) * 0.5;
  float d = sin(la), h = cos(la);

  vec2  p = a - 0.5;
  vec2  g = vec2(p.x * o, p.y);
  float m = g.x * c + g.y * u;
  float T = (fract(m * FREQUENCY + l) - 0.5) * 2.0;   // -1..1 across each flute
  float A = max(abs(T), 1e-4);
  float v = sign(T) * pow(A, mix(8.0, 3.0, SOFTNESS)); // rounded cross-section

  float E = 0.5 / FREQUENCY;
  float y = -(v * REFRACTION * E);
  vec2  D = a + vec2(y * c / o, y * u);

  float j  = y * ABERRATION * 0.5;
  vec2  ab = vec2(j * c / o, j * u);
  vec4  Q  = vec4(scene(D + ab).r, scene(D).g, scene(D - ab).b, scene(D).a);
  vec3  col = Q.rgb;

  // specular highlight with fresnel
  float Le   = min(v * v, 1.0);
  float Fe   = sqrt(1.0 - Le);
  float ndl  = max(v * d + Fe * h, 0.0);
  float Bt   = 8.0 - HIGHLIGHT_SOFTNESS * 7.0;
  float fres = pow(1.0 - Fe, 5.0);
  float he   = 0.04 + 0.96 * fres;
  float Ie   = pow(ndl, Bt) * he * HIGHLIGHT;
  col += HIGHLIGHT_COLOR * Ie * Q.a;

  // film grain, weighted toward darker areas
  float gr  = fract(sin(dot(v_uv, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  float lum = clamp(dot(col, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  float w   = pow(1.0 - lum + 1e-6, GRAIN_BIAS);
  col += gr * w * GRAIN * 0.1;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function ShaderStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    const sceneProg = link(gl, VERT, SCENE_FRAG);
    const glassProg = link(gl, VERT, GLASS_FRAG);
    if (!sceneProg || !glassProg) return;

    // Full-screen quad
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const bindQuad = (prog: WebGLProgram) => {
      const loc = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const sceneU = {
      time: gl.getUniformLocation(sceneProg, 'u_time'),
      flow: gl.getUniformLocation(sceneProg, 'u_flow'),
    };
    const glassU = {
      time: gl.getUniformLocation(glassProg, 'u_time'),
      res: gl.getUniformLocation(glassProg, 'u_res'),
      scene: gl.getUniformLocation(glassProg, 'u_scene'),
    };

    const makeTexture = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    };

    // ChromaFlow simulation texture (RGBA8: vel.x, vel.y, intensity)
    const flowTex = makeTexture();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM, SIM, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    const flowPixels = new Uint8Array(SIM * SIM * 4);

    // Render target for pass 1
    const sceneTex = makeTexture();
    const fbo = gl.createFramebuffer();
    let fboW = 0;
    let fboH = 0;
    const ensureFbo = (w: number, h: number) => {
      if (fboW === w && fboH === h) return;
      fboW = w;
      fboH = h;
      gl.bindTexture(gl.TEXTURE_2D, sceneTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sceneTex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    // ---- ChromaFlow CPU simulation (ported from the original) ----
    const vel = new Float32Array(SIM * SIM * 2);
    const velNext = new Float32Array(SIM * SIM * 2);
    const inten = new Float32Array(SIM * SIM);
    const intenNext = new Float32Array(SIM * SIM);
    const pointer = { x: 0.5, y: 0.5 };
    let prevX = 0.5;
    let prevY = 0.5;
    let smoothVx = 0;
    let smoothVy = 0;
    let lastSim = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const stepSim = (now: number) => {
      const dt = Math.min((now - lastSim) / 1000, 0.016);
      lastSim = now;
      const aspect = canvas.width / Math.max(1, canvas.height);
      const px = pointer.x;
      const py = pointer.y;
      const rawVx = dt > 0 ? (px - prevX) / dt : 0;
      const rawVy = dt > 0 ? (py - prevY) / dt : 0;
      smoothVx = smoothVx * 0.85 + rawVx * 0.15;
      smoothVy = smoothVy * 0.85 + rawVy * 0.15;

      const decay = 1 - dt;
      const shift = FLOW_MOMENTUM * 50 * dt;

      for (let i = 0; i < vel.length; i++) velNext[i] = vel[i] * decay;

      // intensity: decay + advection along the velocity field
      for (let k = 0; k < SIM; k++) {
        for (let j = 0; j < SIM; j++) {
          const idx = k * SIM + j;
          const vi = idx * 2;
          let val = inten[idx] * decay;
          const vx = vel[vi];
          const vy = vel[vi + 1];
          if (Math.abs(vx) > 0.001 || Math.abs(vy) > 0.001) {
            const sx = j - vx * shift;
            const sy = k - vy * shift;
            const x0 = Math.floor(sx);
            const y0 = Math.floor(sy);
            const x1 = x0 + 1;
            const y1 = y0 + 1;
            if (x0 >= 0 && y0 >= 0 && x1 < SIM && y1 < SIM) {
              const fx = sx - x0;
              const fy = sy - y0;
              val =
                (inten[y0 * SIM + x0] * (1 - fx) * (1 - fy) +
                  inten[y0 * SIM + x1] * fx * (1 - fy) +
                  inten[y1 * SIM + x0] * (1 - fx) * fy +
                  inten[y1 * SIM + x1] * fx * fy) *
                decay;
            }
          }
          intenNext[idx] = val;
        }
      }

      // injection around the cursor, scaled by cursor speed
      const speed = Math.hypot(smoothVx, smoothVy);
      const radius = FLOW_RADIUS * 0.05 * Math.min(speed * speed * 20, 1);
      const moving = Math.abs(rawVx) + Math.abs(rawVy) > 0.01;
      const tt = Math.min(speed * 10, 1);
      for (let k = 0; k < SIM; k++) {
        for (let j = 0; j < SIM; j++) {
          const idx = k * SIM + j;
          const vi = idx * 2;
          if (moving && radius > 0) {
            const cx = (j + 0.5) / SIM;
            const cy = (k + 0.5) / SIM;
            const dx = aspect >= 1 ? (cx - px) * aspect : cx - px;
            const dy = aspect >= 1 ? cy - py : (cy - py) / aspect;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius * 2) {
              const w = Math.exp((-dist * dist) / (radius * radius));
              velNext[vi] += smoothVx * w * FLOW_INTENSITY * dt;
              velNext[vi + 1] += smoothVy * w * FLOW_INTENSITY * dt;
              intenNext[idx] += w * FLOW_INTENSITY * dt * tt;
            }
          }
          const nvx = Math.max(-1, Math.min(1, velNext[vi]));
          const nvy = Math.max(-1, Math.min(1, velNext[vi + 1]));
          const ni = Math.max(0, Math.min(1, intenNext[idx]));
          velNext[vi] = nvx;
          velNext[vi + 1] = nvy;
          intenNext[idx] = ni;
          const o = idx * 4;
          flowPixels[o] = (nvx * 0.5 + 0.5) * 255;
          flowPixels[o + 1] = (nvy * 0.5 + 0.5) * 255;
          flowPixels[o + 2] = ni * 255;
          flowPixels[o + 3] = 255;
        }
      }
      vel.set(velNext);
      inten.set(intenNext);
      prevX = px;
      prevY = py;
    };

    // ---- sizing ----
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ensureFbo(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ---- render loop ----
    let raf = 0;
    let running = false;
    let inView = true;
    const start = performance.now();

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      stepSim(now);

      // pass 1: Swirl + ChromaFlow -> sceneTex
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, fboW, fboH);
      gl.useProgram(sceneProg);
      bindQuad(sceneProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, flowTex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SIM, SIM, gl.RGBA, gl.UNSIGNED_BYTE, flowPixels);
      gl.uniform1i(sceneU.flow, 0);
      gl.uniform1f(sceneU.time, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // pass 2: FlutedGlass + FilmGrain -> screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(glassProg);
      bindQuad(glassProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sceneTex);
      gl.uniform1i(glassU.scene, 0);
      gl.uniform2f(glassU.res, canvas.width, canvas.height);
      gl.uniform1f(glassU.time, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const shouldRun = inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        lastSim = performance.now();
        prevX = pointer.x;
        prevY = pointer.y;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onPointerMove);
      gl.deleteProgram(sceneProg);
      gl.deleteProgram(glassProg);
      gl.deleteBuffer(quad);
      gl.deleteTexture(flowTex);
      gl.deleteTexture(sceneTex);
      gl.deleteFramebuffer(fbo);
    };
  }, []);

  return (
    <div className="shader" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        data-renderer="shaders"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
