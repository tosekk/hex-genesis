#!/usr/bin/env node
// npm run itch-test: release build + scripts/itch-frame.html next to it, served on 127.0.0.1:4197 AND :4196
// (the second port is the default cross-origin game server for the frame page).
// Open http://127.0.0.1:4197/itch-frame.html (?seed=7, ?ui=journal, ?same=1 same-origin, ?site=1 cross-site).
// The release zip is unaffected: `npm run package` rebuilds dist/ from scratch.
import { execSync, spawn } from 'node:child_process';
import { copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = process.env.PORT ?? '4197';
const gamePort = port === '4197' ? '4196' : '4197';
execSync('npm run build', { cwd: root, stdio: 'inherit', env: { ...process.env, RELEASE: '1' } });
copyFileSync(join(root, 'scripts', 'itch-frame.html'), join(root, 'dist', 'itch-frame.html'));
console.log(`\nEmbed test: http://127.0.0.1:${port}/itch-frame.html\n`);
const serve = (p) => spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', p, '--strictPort'], { cwd: root, stdio: 'inherit' });
const servers = [serve(port), serve(gamePort)];
for (const s of servers) s.on('exit', (code) => { for (const o of servers) o.kill(); process.exit(code ?? 0); });
process.on('SIGINT', () => { for (const o of servers) o.kill(); process.exit(0); });
