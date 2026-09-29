import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;
const input: Record<string, string> = { main: resolve(root, 'index.html') };
// sol's render sandbox is an optional second page.
if (existsSync(resolve(root, 'render-sandbox.html'))) {
  input.sandbox = resolve(root, 'render-sandbox.html');
}

export default defineConfig({
  // Relative asset paths: required for itch.io.
  base: './',
  build: { rollupOptions: { input } },
});
