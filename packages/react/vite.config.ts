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

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];

// Creating regexes of the packages to make sure subpaths of the
// packages are also treated as external
const regexesOfPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(/.*)?`)
);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['cjs', 'es'],
      fileName: (ext) => `lite-embed-react.${ext}.js`,
    },
    rollupOptions: {
      external: regexesOfPackages,
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].cjs.js',
          exports: 'named',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].es.js',
          exports: 'named',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
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
