import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tools/models/**/*.test.ts'], environment: 'node', cache: false }, cacheDir: 'tools/models/.vite-cache' });
