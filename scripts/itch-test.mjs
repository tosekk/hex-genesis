#!/usr/bin/env node
// npm run itch-test: release build + scripts/itch-frame.html next to it, served on 127.0.0.1:4197.
// Open http://127.0.0.1:4197/itch-frame.html (add ?seed=7, or ?same=1 for a same-origin iframe).
// The release zip is unaffected: `npm run package` rebuilds dist/ from scratch.
import { execSync, spawn } from 'node:child_process';
import { copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = process.env.PORT ?? '4197';
execSync('npm run build', { cwd: root, stdio: 'inherit', env: { ...process.env, RELEASE: '1' } });
copyFileSync(join(root, 'scripts', 'itch-frame.html'), join(root, 'dist', 'itch-frame.html'));
console.log(`\nEmbed test: http://127.0.0.1:${port}/itch-frame.html\n`);
const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', port, '--strictPort'], { cwd: root, stdio: 'inherit' });
server.on('exit', (code) => process.exit(code ?? 0));
