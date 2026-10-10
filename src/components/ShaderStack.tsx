import { useEffect, useRef } from 'react';

/**
 * Hero background shader.
 *
 * Recreates the original 4-layer shader stack with a single GLSL pass so it runs
 * on plain WebGL (the original required WebGPU):
 *   1. Gradient      colorA #ffffff -> colorB #f0f0f0, detail 1.7
 *   2. Lighting      base #ffffff, directional tint #ff5f03, intensity 1.3
 *   3. Stripes       rounded, angle 31deg, frequency 8, softness 1, speed 0.15,
 *                    refraction 4, aberration 0.61, lightAngle -90, highlight 0.12
 *   4. Grain         strength 0.05
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;

const float PI = 3.14159265359;

// ---- layer parameters (copied from the original ShaderStack) ----
const vec3  COLOR_A      = vec3(1.0);                    // #ffffff
const vec3  COLOR_B      = vec3(0.9411764706);           // #f0f0f0
const float DETAIL       = 1.7;
const vec3  LIGHT_TINT   = vec3(1.0, 0.3725490196, 0.0117647059); // #ff5f03
const float LIGHT_INT    = 1.3;
const float ANGLE        = 31.0;
const float FREQUENCY    = 8.0;
const float SOFTNESS     = 1.0;
const float SPEED        = 0.15;
const float REFRACTION   = 4.0;
const float ABERRATION   = 0.61;
const float HIGHLIGHT    = 0.12;
const float GRAIN        = 0.05;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return v;
}

// Layer 1: soft noisy gradient between colorA and colorB
vec3 gradientLayer(vec2 uv, vec2 p) {
  float n = fbm(p * DETAIL + vec2(u_time * 0.02, -u_time * 0.015));
  float t = clamp(uv.y * 0.55 + n * 0.75 - 0.15, 0.0, 1.0);
  return mix(COLOR_A, COLOR_B, t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p  = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;

  // Layer 3: rounded diagonal stripes as a height field
  float a   = radians(ANGLE);
  vec2  dir = vec2(cos(a), sin(a));
  float coord = dot(p, dir) * FREQUENCY * 0.5 + u_time * SPEED * 0.25;
  float phase = coord * 2.0 * PI;
  float wave  = sin(phase);                 // -1..1
  float slope = cos(phase);                 // derivative -> surface normal along dir
  float h     = 0.5 + 0.5 * wave;
  // "rounded" cross-section (circle arc) softened by SOFTNESS
  float ridge = sqrt(max(0.0, 1.0 - pow(2.0 * h - 1.0, 2.0)));
  ridge = mix(h, ridge, 0.5 * SOFTNESS);

  // Refraction + chromatic aberration: sample the gradient layer with a
  // per-channel offset proportional to the stripe slope.
  vec2 off = dir * slope * REFRACTION * 0.0045;
  float r = gradientLayer(uv, p + off * (1.0 - ABERRATION * 0.2)).r;
  float g = gradientLayer(uv, p + off).g;
  float b = gradientLayer(uv, p + off * (1.0 + ABERRATION * 0.2)).b;
  vec3 col = vec3(r, g, b);

  // Thin iridescent fringe on stripe edges (what reads as rainbow lines in the original)
  float edge = pow(abs(slope), 12.0);
  vec3 fringe = vec3(
    0.5 + 0.5 * sin(phase * 1.0 + 0.0),
    0.5 + 0.5 * sin(phase * 1.0 + 2.1),
    0.5 + 0.5 * sin(phase * 1.0 + 4.2)
  );
  col += (fringe - 0.5) * edge * 0.14 * ABERRATION;

  // Soft shading of the ridge body (light from lightAngle -90 => above)
  float shade = (1.0 - ridge) * 0.055;
  col -= shade;

  // Highlight on the lit side
  float lit = clamp(-slope, 0.0, 1.0);
  col += pow(lit, 3.0) * HIGHLIGHT * 0.5;

  // Layer 2: directional orange lighting on the shaded flank (kept subtle so ridges stay neutral grey)
  float flank = clamp(slope, 0.0, 1.0);
  col = mix(col, col * mix(vec3(1.0), LIGHT_TINT, 0.08), pow(flank, 2.0) * (LIGHT_INT - 1.0) * 0.4);

  // Layer 4: film grain
  float grain = hash(gl_FragCoord.xy + fract(u_time) * 100.0) - 0.5;
  col += grain * GRAIN;

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

export default function ShaderStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, reduceMotion ? 0 : t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
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
