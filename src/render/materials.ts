import * as THREE from 'three';

export function illustratedEnabled(search: string): boolean {
  return new URLSearchParams(search).get('style') === 'illustrated';
}

// Three supplies position/normal/color, instanceMatrix/instanceColor and camera matrices.
const NORMAL = `
vec3 n = normal;
#ifdef USE_INSTANCING
  mat3 im = mat3(instanceMatrix);
  n /= max(vec3(dot(im[0], im[0]), dot(im[1], im[1]), dot(im[2], im[2])), vec3(0.000001));
  n = im * n;
#endif
n = normalize(normalMatrix * n);
`;
const POSITION = `
vec4 p = vec4(position, 1.0);
#ifdef USE_INSTANCING
  p = instanceMatrix * p;
#endif
vec4 viewPosition = modelViewMatrix * p;
gl_Position = projectionMatrix * viewPosition;
`;

/** A single texture-free fill material for the entire illustrated board. */
export function createIllustratedMaterial(): THREE.ShaderMaterial {
  const material = new THREE.ShaderMaterial({
    name: 'illustrated-vertex-fill', vertexColors: true,
    uniforms: {
      keyDirection: { value: new THREE.Vector3(-0.35, 0.8, 0.25).normalize() },
      warmLight: { value: new THREE.Color('#fff0da') }, coolFill: { value: new THREE.Color('#abc6d0') },
      rimColor: { value: new THREE.Color('#f4e6cc') }, aoStrength: { value: .65 }, rimStrength: { value: .16 },
    },
    vertexShader: `
attribute float _AO;
attribute float _EMIT;
uniform vec3 keyDirection;
varying vec3 vBase;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vKey;
varying float vAO;
varying float vEmit;
void main() {
  ${NORMAL}
  ${POSITION}
  vBase = color.rgb;
  #ifdef USE_INSTANCING_COLOR
    vBase *= instanceColor;
  #endif
  vNormal = n; vView = -viewPosition.xyz;
  vKey = normalize(mat3(viewMatrix) * keyDirection);
  vAO = _AO; vEmit = _EMIT;
}`,
    fragmentShader: `
uniform vec3 warmLight;
uniform vec3 coolFill;
uniform vec3 rimColor;
uniform float aoStrength;
uniform float rimStrength;
varying vec3 vBase;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vKey;
varying float vAO;
varying float vEmit;
#include <tonemapping_pars_fragment>
#include <colorspace_pars_fragment>
void main() {
  vec3 n = normalize(vNormal);
  float key = dot(n, normalize(vKey));
  // Three gently joined plateaus, without a gradient texture or engine lights.
  float band = 0.42 + 0.30 * smoothstep(-0.12, -0.04, key) + 0.28 * smoothstep(0.48, 0.56, key);
  vec3 light = mix(coolFill, warmLight, band);
  float ao = mix(1.0, clamp(vAO, 0.0, 1.0), aoStrength);
  float facing = clamp(dot(n, normalize(vView)), 0.0, 1.0);
  float rim = 1.0 - facing; rim = rim * rim * rim;
  vec3 shaded = vBase * light * band * ao + rimColor * rim * rimStrength;
  gl_FragColor = vec4(mix(shaded, vBase * 1.25, clamp(vEmit, 0.0, 1.0)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
  material.userData.illustrated = true;
  return material;
}

/** Constant CSS-pixel inverted hull; one shared material, no render targets. */
export function createInkMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({ name: 'illustrated-ink-hull', side: THREE.BackSide,
    uniforms: { viewport: { value: new THREE.Vector2(1280, 720) }, inkWidth: { value: 1.25 }, ink: { value: new THREE.Color('#2E2A25') } },
    vertexShader: `
uniform vec2 viewport;
uniform float inkWidth;
void main() {
  ${NORMAL}
  ${POSITION}
  vec2 projectedNormal = (projectionMatrix * vec4(n, 0.0)).xy;
  vec2 screenNormal = projectedNormal * viewport;
  float lengthSquared = dot(screenNormal, screenNormal);
  if (lengthSquared > 0.000001) gl_Position.xy += normalize(screenNormal) * (2.0 * inkWidth / viewport) * gl_Position.w;
}`,
    fragmentShader: `
uniform vec3 ink;
#include <colorspace_pars_fragment>
void main() {
  gl_FragColor = vec4(ink, 1.0);
  #include <colorspace_fragment>
}
`,
  });
}

export interface IllustratedStyle { fill: THREE.ShaderMaterial; ink: THREE.ShaderMaterial; }
const styles = new WeakMap<THREE.Group, IllustratedStyle>();
export function installIllustratedStyle(parent: THREE.Group): IllustratedStyle {
  const style = { fill: createIllustratedMaterial(), ink: createInkMaterial() }; styles.set(parent, style); return style;
}
export function illustratedStyle(parent: THREE.Group): IllustratedStyle | undefined { return styles.get(parent); }

/** Preserve authored RGB/AO/emission. Missing color becomes a constant vertex color. */
export function prepareIllustratedGeometry(geometry: THREE.BufferGeometry, tint = 0xffffff, emissive = false): THREE.BufferGeometry {
  const count = geometry.getAttribute('position').count, source = geometry.getAttribute('color');
  const c = new THREE.Color(tint), rgb = new Float32Array(count * 3), ao = new Float32Array(count), emit = new Float32Array(count);
  const authoredAO = geometry.getAttribute('_AO') ?? geometry.getAttribute('_ao');
  const authoredEmit = geometry.getAttribute('_EMIT') ?? geometry.getAttribute('_emit');
  geometry.computeBoundingBox();
  const bottom = geometry.boundingBox!.min.y, height = Math.max(geometry.boundingBox!.max.y - bottom, .001);
  for (let i = 0; i < count; i++) {
    rgb[i * 3] = (source?.getX(i) ?? 1) * c.r;
    rgb[i * 3 + 1] = (source?.getY(i) ?? 1) * c.g;
    rgb[i * 3 + 2] = (source?.getZ(i) ?? 1) * c.b;
    ao[i] = authoredAO?.getX(i) ?? (source?.itemSize === 4 ? source.getW(i) : .78 + .22 * Math.min(1, (geometry.getAttribute('position').getY(i) - bottom) / height * 3));
    emit[i] = authoredEmit?.getX(i) ?? (emissive ? 1 : 0);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
  geometry.setAttribute('_AO', new THREE.BufferAttribute(ao, 1));
  geometry.setAttribute('_EMIT', new THREE.BufferAttribute(emit, 1));
  // Vertex alpha is AO, never transparency. Remove UVs so no material can use them accidentally.
  for (const name of Object.keys(geometry.attributes)) if (name.startsWith('uv')) geometry.deleteAttribute(name);
  return geometry;
}

export function materialHasTexture(material: THREE.Material): boolean {
  return Object.values(material).some(value => value instanceof THREE.Texture) ||
    (material instanceof THREE.ShaderMaterial && Object.values(material.uniforms).some(uniform => uniform.value instanceof THREE.Texture));
}
