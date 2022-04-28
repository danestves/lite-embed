/// <reference types="vitest" />

// Dependencies
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { resolve } from 'path';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Internals
import { dependencies } from './package.json';

const externalPackages = [...Object.keys(dependencies)];

// Creating regexes of the packages to make sure subpaths of the
// packages are also treated as external
const regexesOfPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(/.*)?`)
);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es', 'umd'],
      fileName: (ext) => `lite-embed-utils.${ext}.js`,
      name: 'LiteEmbedUtils',
    },
    rollupOptions: {
      external: regexesOfPackages,
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].umd.js',
          format: 'umd',
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
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'happy-dom',
    globals: true,
    setupFiles: './jest.setup.ts',
  },
});
