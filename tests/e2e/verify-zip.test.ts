// O13.5: scripts/verify-zip.mjs catches what breaks an itch.io upload. Synthetic zips (stored, no compression).
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deflateRawSync } from 'node:zlib';
import { afterAll, describe, expect, it } from 'vitest';
import { readZip, verify } from '../../scripts/verify-zip.mjs';

const dir = mkdtempSync(join(tmpdir(), 'verify-zip-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let zips = 0;
/** Minimal PKZIP writer: method 8 when `deflate`, else stored. CRC is not checked by the verifier. */
function zip(files: Record<string, string | Buffer>, deflate = false): string {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const [n, content] of Object.entries(files)) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const body = deflate ? deflateRawSync(data) : data;
    const name = Buffer.from(n);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(deflate ? 8 : 0, 8);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(deflate ? 8 : 0, 10);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    locals.push(local, name, body);
    centrals.push(central, name);
    offset += 30 + name.length + body.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(cd.length, 12);
  end.writeUInt32LE(offset, 16);
  const path = join(dir, `z${++zips}.zip`);
  writeFileSync(path, Buffer.concat([...locals, cd, end]));
  return path;
}

const song = Buffer.from('ID3-song-bytes');
const clip = Buffer.from('ID3-clip-bytes');
const sources = (() => {
  const a = join(dir, 'song.mp3'); writeFileSync(a, song);
  const b = join(dir, 'clip.mp3'); writeFileSync(b, clip);
  return [a, b];
})();
const good = {
  'index.html': '<script type="module" src="./assets/index-abc.js"></script>',
  'assets/index-abc.js': 'new URL("./song-x1.mp3", import.meta.url)',
  'assets/song-x1.mp3': song,
  'assets/clip-y2.mp3': clip,
};

describe('verify-zip', () => {
  it('reads stored and deflated entries', () => {
    for (const deflate of [false, true]) {
      const entries = readZip(readFileSync(zip(good, deflate)));
      expect(entries.map((e) => e.name)).toEqual(Object.keys(good));
      expect(entries[2].data.equals(song)).toBe(true);
    }
  });

  it('passes a clean build and reports size + sha256', () => {
    const r = verify(zip(good, true), sources);
    expect(r.errors).toEqual([]);
    expect(r.files).toBe(4);
    expect(r.mp3s).toBe(2);
    expect(r.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(r.bytes).toBeGreaterThan(0);
  });

  it('content sha256 ignores compression and entry order; zip sha256 does not', () => {
    const stored = verify(zip(good, false), sources);
    const deflated = verify(zip(good, true), sources);
    const reordered = verify(zip(Object.fromEntries(Object.entries(good).reverse()), false), sources);
    expect(stored.sha256).not.toBe(deflated.sha256);
    expect(deflated.contentSha256).toBe(stored.contentSha256);
    expect(reordered.contentSha256).toBe(stored.contentSha256);
    expect(verify(zip({ ...good, 'assets/index-abc.js': 'changed' }), sources).contentSha256).not.toBe(stored.contentSha256);
  });

  it('fails: no root index.html, absolute URLs, duplicated/missing/unknown MP3s, src/ files', () => {
    const bad = verify(zip({
      'game/index.html': '<link href="/assets/x.css">',
      'assets/a.js': 'fetch("/audio/sfx/win.mp3")',
      'assets/song-x1.mp3': song,
      'audio/music/song.mp3': song,
      'assets/other.mp3': Buffer.from('ID3-unknown'),
      'src/main.ts': 'export {}',
    }), sources);
    const text = bad.errors.join('\n');
    expect(text).toContain('index.html is not at the zip root');
    expect(text).toContain('absolute URL in game/index.html');
    expect(text).toContain('absolute URL in assets/a.js');
    expect(text).toMatch(/song\.mp3 is in the zip 2×/);
    expect(text).toMatch(/clip\.mp3 is in the zip 0×/);
    expect(text).toContain('MP3 with no source file: assets/other.mp3');
    expect(text).toContain('source file in the zip: src/main.ts');
  });
});
