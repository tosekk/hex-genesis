import * as THREE from 'three';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createIllustratedMaterial, createInkMaterial } from './materials';

const expand = (source: string): string => source.replace(/#include <(\w+)>/g, (_, name: keyof typeof THREE.ShaderChunk) => expand(THREE.ShaderChunk[name]));
// Match WebGLProgram's auto-generated ShaderMaterial declarations, with desktop GLSL aliases
// for the macOS native compiler (WebGL2 and OpenGL 3.2 use the same shader logic here).
function vertexPrefix(instanced: boolean): string {
  return `#version 150\n#define attribute in\n#define varying out\n#define USE_COLOR\n${instanced ? '#define USE_INSTANCING\n#define USE_INSTANCING_COLOR\n' : ''}
  uniform mat4 projectionMatrix, modelViewMatrix, viewMatrix;
  uniform mat3 normalMatrix;
  in vec3 position, normal, color;
  ${instanced ? 'in mat4 instanceMatrix; in vec3 instanceColor;' : ''}\n`;
}
const fragmentPrefix = `#version 150\n#define varying in\nout vec4 outputColor;\n#define gl_FragColor outputColor\n${THREE.ShaderChunk.colorspace_pars_fragment}
vec4 linearToOutputTexel(vec4 value) { return sRGBTransferOETF(value); }\n`;

describe('illustrated shader assembly', () => {
  it('does not duplicate colorspace/tone functions already injected by Three ShaderMaterial', () => {
    const program = readFileSync(new URL('../../node_modules/three/src/renderers/webgl/WebGLProgram.js', import.meta.url), 'utf8');
    expect(program).toContain("ShaderChunk[ 'colorspace_pars_fragment' ]");
    for (const material of [createIllustratedMaterial(), createInkMaterial()]) {
      expect(material.fragmentShader).not.toContain('colorspace_pars_fragment');
      expect(material.fragmentShader).not.toContain('tonemapping_pars_fragment'); material.dispose();
    }
  });
  it.skipIf(process.platform !== 'darwin')('compiles and links fill + hull with actual headless OpenGL, both ordinary and instanced', ctx => {
    const folder = mkdtempSync(join(tmpdir(), 'sol-shader-'));
    try {
      const binary = join(folder, 'check');
      execFileSync('/usr/bin/clang', ['-Wno-deprecated-declarations', new URL('./shaderCheck.c', import.meta.url).pathname, '-framework', 'OpenGL', '-o', binary]);
      for (const material of [createIllustratedMaterial(), createInkMaterial()]) for (const instanced of [false, true]) {
        const vs = join(folder, 'shader.vert'), fs = join(folder, 'shader.frag');
        writeFileSync(vs, vertexPrefix(instanced) + expand(material.vertexShader));
        writeFileSync(fs, fragmentPrefix + expand(material.fragmentShader));
        const result = spawnSync(binary, [vs, fs], { encoding: 'utf8' });
        if (result.status === 77) { ctx.skip('No headless OpenGL context'); return; }
        expect(result.stderr, `${material.name}, instanced=${instanced}`).toBe(''); expect(result.status).toBe(0);
      }
    } finally { rmSync(folder, { recursive: true, force: true }); }
  });
});
