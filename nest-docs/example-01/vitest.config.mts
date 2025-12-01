import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import { resolve } from 'path';


export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: './coverage/unit',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['dist/**', '**/dist/**', 'src/main.ts']
    },
    exclude: [
      'dist/**',
      '**/dist/**',
      'node_modules/**'
    ],
    include: ['src/**/*.spec.ts','test/**/*-spec.ts'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
});