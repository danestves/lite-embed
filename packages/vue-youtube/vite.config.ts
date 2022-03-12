// Dependencies
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";

// Internals
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      fileName: (ext) => `lite-embed-vue-youtube.${ext}.js`,
      formats: ["es", "umd"],
      name: "YoutubeLite",
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
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
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
