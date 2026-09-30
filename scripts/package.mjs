#!/usr/bin/env node
// npm run package: production build → release/hex-genesis-<YYYY-MM-DD>.zip for itch.io ("HTML" project).
// index.html sits at the zip root. Refuses to package if the build references absolute asset paths,
// which break under itch.io's sub-path hosting. No dependencies: a minimal ZIP writer over node:zlib.
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const skipBuild = process.argv.includes('--no-build');

if (!skipBuild) execSync('npm run build', { cwd: root, stdio: 'inherit', env: { ...process.env, RELEASE: '1' } });

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// Designer notes (e.g. public/audio/AUDIO_LIST.md) are not game files.
const files = walk(dist).filter((f) => !f.endsWith('.md')).sort();
const names = files.map((f) => relative(dist, f).split('\\').join('/'));
if (!names.includes('index.html')) throw new Error('dist/index.html missing: did the build run?');

// Absolute paths ("/assets/…", "/audio/…") resolve against itch's domain root, not the game folder.
const absolute = /(?:src|href)\s*=\s*["']\/(?!\/)|url\(\s*["']?\/(?!\/)|["']\/(?:assets|audio)\//g;
const problems = [];
for (const [i, f] of files.entries()) {
  if (!/\.(html|js|css)$/.test(f)) continue;
  const hits = readFileSync(f, 'utf8').match(absolute);
  if (hits) problems.push(`${names[i]}: ${[...new Set(hits)].join(', ')}`);
}
if (problems.length) {
  console.error('Absolute asset paths found (itch.io needs relative paths):\n  ' + problems.join('\n  '));
  process.exit(1);
}

// ---- minimal ZIP (PKZIP 2.0, deflate or store, no zip64) ----
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
// Fixed timestamp (1980-01-01 00:00) so the same dist/ always yields the same zip bytes.
const DOS_TIME = 0;
const DOS_DATE = (0 << 9) | (1 << 5) | 1;

const locals = [];
const centrals = [];
let offset = 0;
for (const [i, f] of files.entries()) {
  const data = readFileSync(f);
  const name = Buffer.from(names[i], 'utf8');
  const deflated = deflateRawSync(data, { level: 9 });
  const useDeflate = deflated.length < data.length;
  const body = useDeflate ? deflated : data;
  const crc = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);            // version needed
  local.writeUInt16LE(0x0800, 6);        // UTF-8 names
  local.writeUInt16LE(useDeflate ? 8 : 0, 8);
  local.writeUInt16LE(DOS_TIME, 10);
  local.writeUInt16LE(DOS_DATE, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  local.writeUInt16LE(0, 28);
  locals.push(local, name, body);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(0x0314, 4);      // made by: UNIX, v2.0
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(useDeflate ? 8 : 0, 10);
  central.writeUInt16LE(DOS_TIME, 12);
  central.writeUInt16LE(DOS_DATE, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38); // -rw-r--r--
  central.writeUInt32LE(offset, 42);
  centrals.push(central, name);
  offset += local.length + name.length + body.length;
}
const centralSize = centrals.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);

const d = new Date();
const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
mkdirSync(join(root, 'release'), { recursive: true });
const out = join(root, 'release', `hex-genesis-${stamp}.zip`);
const zip = Buffer.concat([...locals, ...centrals, end]);
writeFileSync(out, zip);

const mb = (n) => (n / 1024 / 1024).toFixed(2);
const raw = files.reduce((n, f) => n + statSync(f).size, 0);
console.log(`Packaged ${files.length} files (${mb(raw)} MB → ${mb(zip.length)} MB zipped) → ${relative(root, out)}`);
console.log('itch.io: upload as an HTML project, tick "This file will be played in the browser".');
