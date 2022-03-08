// Dependencies
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
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
    },
    target: "esnext",
    sourcemap: true,
  },
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
