/// <reference types="vitest" />

// Dependencies
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// Internals
import { peerDependencies, dependencies } from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['cjs', 'es'],
      fileName: (ext) => `lite-embed-react.${ext}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
      plugins: [rollupNodePolyFill()],
    },
    target: 'esnext',
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest.setup.ts',
  },
});
