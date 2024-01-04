import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "example",
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "Bloom",
      fileName: "bloom",
      formats: ["es", "umd"],
    },
  },
});
