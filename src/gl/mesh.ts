import { snoiseGlsl } from './noise';

// 渐变调色板：改颜色只改这一处。
export const GRADIENT_PALETTE = {
  base: '#FFF1E4',
  c0: '#FF9E7A',
  c1: '#B39DFF',
  c2: '#8FD3FF',
  c3: '#FFE08A',
  c4: '#9EECD0',
} as const;

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export const vertexShader = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uStrength;
uniform float uSeed;
uniform vec3 uBase;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;

varying vec2 vUv;

${snoiseGlsl}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  vec2 d = p - m;
  float fall = exp(-dot(d, d) * 3.2) * uStrength;
  p -= d * fall * 0.24;

  float t = uTime * 0.035 + uSeed;
  vec2 q = vec2(snoise(vec3(p * 0.9, t)), snoise(vec3(p * 0.9 + 4.7, t + 1.3)));
  vec2 w = p + q * 0.55;

  float n0 = snoise(vec3(w * 1.10, t * 1.2));
  float n1 = snoise(vec3(w * 1.40 + 9.1, t * 0.9));
  float n2 = snoise(vec3(w * 0.80 - 3.3, t * 1.1));
  float n3 = snoise(vec3(w * 1.70 + 2.2, t * 0.7));
  float n4 = snoise(vec3(w * 1.25 - 7.4, t * 0.8));

  vec3 col = uBase;
  col = mix(col, uC0, smoothstep(-0.35, 0.65, n0));
  col = mix(col, uC1, smoothstep(-0.10, 0.80, n1) * 0.90);
  col = mix(col, uC2, smoothstep(0.00, 0.85, n2) * 0.85);
  col = mix(col, uC3, smoothstep(0.15, 0.95, n3) * 0.70);
  col = mix(col, uC4, smoothstep(0.25, 1.00, n4) * 0.55);

  col += vec3(fall * 0.07);
  col = mix(col, vec3(1.0), 0.16 * (1.0 - smoothstep(0.0, 0.55, vUv.x)));

  float g = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.018;

  gl_FragColor = vec4(col, 1.0);
}
`;

// CSS 回退渐变（与 shader 同一组颜色）。
export const CSS_FALLBACK_BACKGROUND = [
  'radial-gradient(60% 70% at 18% 30%, #FF9E7A 0%, transparent 60%)',
  'radial-gradient(55% 65% at 62% 18%, #B39DFF 0%, transparent 62%)',
  'radial-gradient(60% 70% at 90% 62%, #8FD3FF 0%, transparent 60%)',
  'radial-gradient(50% 60% at 38% 88%, #FFE08A 0%, transparent 60%)',
  'radial-gradient(45% 55% at 76% 96%, #9EECD0 0%, transparent 60%)',
  'linear-gradient(90deg, rgba(255,255,255,0.18), transparent 55%)',
].join(', ');
