/// <reference types="vitest" />

// Dependencies
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// Internals
import { dependencies, peerDependencies } from './package.json';

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
      fileName: (ext) => `lite-embed-vue.${ext}.js`,
      formats: ['es', 'umd'],
      name: 'LiteEmbedVue',
    },
    rollupOptions: {
      external: regexesOfPackages,
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].umd.js',
          format: 'umd',
          globals: {
            '@lite-embed/utils': '@lite-embed/utils',
            vue: 'Vue',
          },
        },
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].es.js',
          exports: 'named',
          format: 'es',
          globals: {
            '@lite-embed/utils': '@lite-embed/utils',
            vue: 'Vue',
          },
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
  plugins: [vue(), tsconfigPaths()],
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
