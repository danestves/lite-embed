/// <reference types="vitest" />

// Dependencies
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { resolve } from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Internals
import { dependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["cjs", "es"],
      fileName: (ext) => `lite-embed-utils.${ext}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
      plugins: [rollupNodePolyFill()],
    },
    target: "esnext",
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
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
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
    },
    environment: "happy-dom",
    globals: true,
    setupFiles: "./jest.setup.ts",
  },
});
