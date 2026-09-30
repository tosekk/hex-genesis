#!/usr/bin/env node
// npm run verify-zip [path.zip]: checks the newest release/*.zip (or the given one) before it goes to itch.io.
//  - index.html at the zip root
//  - only relative asset URLs in html/js/css (itch serves the game from a sub-path)
//  - every source MP3 (public/audio, src/assets/audio) exactly once, byte for byte; no other MP3s
//  - no src/ files, no TypeScript
// Prints the file count, size, sha256, and a compression-independent content sha256. Exits 1 on any failure. No dependencies: reads the ZIP with node:zlib.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function newestZip() {
  const dir = join(root, 'release');
  const zips = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.zip')).map((f) => join(dir, f)) : [];
  if (zips.length === 0) throw new Error('no release/*.zip: run npm run package first');
  return zips.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs || b.localeCompare(a))[0];
}

/** Every entry of a PKZIP file (stored or deflated; no zip64), read via the central directory. */
export function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip file (no end-of-central-directory record)');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = [];
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error(`bad central directory entry ${n}`);
    const method = buf.readUInt16LE(p + 10);
    const compressed = buf.readUInt32LE(p + 20);
    const size = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    p += 46 + nameLen + extraLen + commentLen;
    if (name.endsWith('/')) continue; // directory
    if (buf.readUInt32LE(local) !== 0x04034b50) throw new Error(`${name}: bad local header`);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const body = buf.subarray(start, start + compressed);
    let data;
    if (method === 0) data = body;
    else if (method === 8) data = inflateRawSync(body);
    else throw new Error(`${name}: unsupported compression method ${method}`);
    if (data.length !== size) throw new Error(`${name}: size mismatch (${data.length} ≠ ${size})`);
    entries.push({ name, data });
  }
  return entries;
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const sha = (b) => createHash('sha256').update(b).digest('hex');

/** MP3s the game ships: every one must be in the zip exactly once. */
export function sourceMp3s() {
  return [join(root, 'public', 'audio'), join(root, 'src', 'assets', 'audio')].flatMap(walk).filter((f) => f.endsWith('.mp3'));
}

export function verify(zipPath, sources = sourceMp3s()) {
  const buf = readFileSync(zipPath);
  const entries = readZip(buf);
  const names = entries.map((e) => e.name);
  const errors = [];

  // 1. index.html at the root
  if (!names.includes('index.html')) errors.push('index.html is not at the zip root');

  // 2. relative URLs only. Absolute paths ("/assets/…") resolve against itch's domain root, not the game folder.
  const absolute = /(?:src|href)\s*=\s*["']\/(?!\/)|url\(\s*["']?\/(?!\/)|["']\/(?:assets|audio)\//g;
  for (const e of entries) {
    if (!/\.(html|js|mjs|css)$/.test(e.name)) continue;
    const hits = e.data.toString('utf8').match(absolute);
    if (hits) errors.push(`absolute URL in ${e.name}: ${[...new Set(hits)].join(', ')}`);
  }

  // 3. each MP3 exactly once (matched by content, so hashed file names don't matter)
  const mp3s = entries.filter((e) => e.name.toLowerCase().endsWith('.mp3'));
  const byHash = new Map();
  for (const e of mp3s) byHash.set(sha(e.data), [...(byHash.get(sha(e.data)) ?? []), e.name]);
  const known = new Set();
  for (const f of sources) {
    const h = sha(readFileSync(f));
    known.add(h);
    const hits = byHash.get(h) ?? [];
    if (hits.length !== 1) errors.push(`${relative(root, f)} is in the zip ${hits.length}× (want 1)${hits.length ? `: ${hits.join(', ')}` : ''}`);
  }
  for (const [h, hits] of byHash) {
    if (!known.has(h) && hits.length > 1) errors.push(`duplicate MP3 content: ${hits.join(', ')}`);
    if (!known.has(h) && sources.length > 0) errors.push(`MP3 with no source file: ${hits.join(', ')}`);
  }

  // 4. no source files
  for (const n of names) {
    if (n.startsWith('src/') || /\.(ts|tsx|mts)$/.test(n)) errors.push(`source file in the zip: ${n}`);
  }

  // Content hash: independent of compression, so a zip built on another machine (different Node/zlib
  // deflate output) from the same commit matches even when the zip's own sha256 does not.
  const content = createHash('sha256');
  for (const e of [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    content.update(`${e.name}\0${sha(e.data)}\n`);
  }

  return {
    zip: zipPath, files: entries.length, mp3s: mp3s.length, sources: sources.length,
    bytes: buf.length, sha256: sha(buf), contentSha256: content.digest('hex'), errors,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const arg = process.argv.slice(2).find((a) => !a.startsWith('-'));
    const r = verify(arg ? resolve(arg) : newestZip());
    const mb = (r.bytes / 1024 / 1024).toFixed(2);
    console.log(`${basename(r.zip)}: ${r.files} files, ${r.mp3s} MP3s (${r.sources} sources), ${r.bytes} bytes (${mb} MB)`);
    console.log(`sha256 ${r.sha256}`);
    console.log(`content sha256 ${r.contentSha256} (same commit → same value on any machine)`);
    if (r.errors.length) {
      console.error(`FAIL (${r.errors.length}):\n  ${r.errors.join('\n  ')}`);
      process.exit(1);
    }
    console.log('OK: index.html at root, relative URLs only, each MP3 once, no src/ files.');
  } catch (e) {
    console.error(`FAIL: ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  }
}
