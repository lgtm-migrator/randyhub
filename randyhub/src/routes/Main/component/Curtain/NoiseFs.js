const NoiseFs = `
precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform vec2 u_resolution;
uniform vec2 uMousePosition;
uniform sampler2D uSampler0;

uniform float uTime;

// Perlin Noise (Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb)
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}
vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
float noise(vec3 P) {
  vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
  vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
  vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
  vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
  vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  gx1 = fract(gx1);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g0 = vec3(gx0.x, gy0.x, gz0.x), g1 = vec3(gx0.y, gy0.y, gz0.y),
    g2 = vec3(gx0.z, gy0.z, gz0.z), g3 = vec3(gx0.w, gy0.w, gz0.w),
    g4 = vec3(gx1.x, gy1.x, gz1.x), g5 = vec3(gx1.y, gy1.y, gz1.y),
    g6 = vec3(gx1.z, gy1.z, gz1.z), g7 = vec3(gx1.w, gy1.w, gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g0, g0), dot(g2, g2), dot(g1, g1), dot(g3, g3)));
  vec4 norm1 = taylorInvSqrt(vec4(dot(g4, g4), dot(g6, g6), dot(g5, g5), dot(g7, g7)));
  g0 *= norm0.x;
  g2 *= norm0.y;
  g1 *= norm0.z;
  g3 *= norm0.w;
  g4 *= norm1.x;
  g6 *= norm1.y;
  g5 *= norm1.z;
  g7 *= norm1.w;
  vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
      dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
    vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
      dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
  return 2.2 * mix(mix(nz.x, nz.z, f.y), mix(nz.y, nz.w, f.y), f.x);
}

float noise(vec2 P) {
  return noise(vec3(P, 0.0));
}
float fractal(vec3 P) {
  float f = 0., s = 1.;
  for (int i = 0; i < 9; i++) {
    f += noise(s * P) / s;
    s *= 2.;
    P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
  }
  return f;
}
float turbulence(vec3 P) {
  float f = 0., s = 1.;
  for (int i = 0; i < 9; i++) {
    f += abs(noise(s * P)) / s;
    s *= 2.;
    P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
  }
  return f;
}

vec3 clouds(float x, float y) {
  float L = turbulence(vec3(x, y, uTime * .001));
  return vec3(noise(vec3(.5, .5, L) * .7));
}

float PI = 3.14159265359;
float EXP = 2.71828182846;

float w1 = 3.0;
float w2 = 1.0;
float w3 = 20.0;
float A = 0.5;
float R = 3.0;

float horizontal( in vec2 xy, float t) {
  float v = cos(w1 * xy.x + A * t);
  return v;
}

float diagonal( in vec2 xy, float t) {
  float v = cos(w2 * (xy.x * cos(t) + 5.0 * xy.y * sin(t)) + A * t);
  return v;
}

float radial( in vec2 xy, float t) {
  float x = 0.3 * xy.x - 0.5 + cos(t);
  float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
  float v = sin(w3 * sqrt(x * x + y * y + 1.0) + A * t);

  return v;
}

float map(float a, float b, float c, float d, float x) {
  return ((x - a) * (d - c) / (b - a)) + c;
}

float log_map(float a, float b, float c, float d, float x) {
  float x1 = map(a, b, 1.0, EXP, x);
  return log(x1) * (d - c) + c;
}

void main() {

  // Generating Perlin Noise opacity
  vec2 textureCoords = vTextureCoord;

  // apply our texture
  vec4 finalColor = texture2D(uSampler0, textureCoords);
  vec3 color;

  vec3 cloudEffect = clouds(vVertexPosition.x, vVertexPosition.y);
  color = cloudEffect + vec3(0.85, 0.9, 0.95);

  vec2 st = gl_FragCoord.xy / 1000.;

  float distance = distance(st, vec2(0.6, 0.9));

  // The farther the distance, the closer opacity should hit 1
  // Adding min to clamp max distance to 1
  float isRevealed = .95 - max(distance * 1., 0.3) / 1.2;

  // color.r is one noise sample we're going to use in the opacity
  // should only use color when isRevealed is equal to 0

  float opacity = isRevealed;
  if (isRevealed < 1.0 && isRevealed > 0.2) {
    opacity = floor(isRevealed * color.r * 3. + 0.5);
  } else {
    opacity = 0.;
  }

  // Generating gradient cloud effect
  vec2 pos = vec2(st * 5.0);
  float n = noise(pos);
  vec4 noiseVec = vec4(vec3(n), 1.0);

  float t = uTime / 300.;

  vec2 xy = gl_FragCoord.xy / 8000.;
  float v = horizontal(xy, t);

  v += diagonal(xy, t);
  v += radial(xy, t);
  v /= 30.0;

  float r = map(-1.0, 1.0, 0.75, 0.6, sin(PI * v));
  float g = map(-2.0, 1.0, 0.0, 0.8, sin(PI * v));

  g += log_map(-1.0, 1.5, 0.1, 0.1, cos(PI * v));

  float b = map(-5.0, 1.0, 0.0, 1.0, sin(PI * v));
  // gl_FragColor = vec4(pow(r, R), pow(g, R), pow(b, R), 1.0);
  gl_FragColor = vec4(finalColor.r + pow(r, R), finalColor.g + pow(g, R), finalColor.b + pow(b, R), opacity);
}
`;

export default NoiseFs;
