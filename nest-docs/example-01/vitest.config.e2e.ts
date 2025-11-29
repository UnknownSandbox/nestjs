import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    exclude: [
      'dist/**',
      '**/dist/**',
      'node_modules/**'
    ],
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: './coverage/e2e',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['dist/**', '**/dist/**']
    },
  },
  plugins: [swc.vite({ module: { type: 'es6' } })],
});