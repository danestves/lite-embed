// Dependencies
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["cjs", "es"],
      fileName: (ext) => `lite-embed-utils.${ext}.js`,
    },
    target: "esnext",
    sourcemap: true,
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
