import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "example",
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "Bloom",
      fileName: "bloom",
    },
  },
});
