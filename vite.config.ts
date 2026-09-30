import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;
const input: Record<string, string> = { main: resolve(root, 'index.html') };
// sol's render sandbox is an optional second (dev-only) page; `npm run package` sets RELEASE=1 to leave it out.
if (process.env.RELEASE !== '1' && existsSync(resolve(root, 'render-sandbox.html'))) {
  input.sandbox = resolve(root, 'render-sandbox.html');
}

export default defineConfig({
  // Relative asset paths: required for itch.io.
  base: './',
  build: { rollupOptions: { input } },
});
