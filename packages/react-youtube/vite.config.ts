// Dependencies
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Internals
import { peerDependencies, dependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["cjs", "es"],
      fileName: (ext) => `lite-embed-react-youtube.${ext}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
    },
    target: "esnext",
    sourcemap: true,
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
