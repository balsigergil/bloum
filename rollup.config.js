import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "bloom",
      globals: {
        "focus-trap": "focusTrap",
        "@floating-ui/dom": "FloatingUIDOM",
      },
    },
  ],
  external: ["@ungap/custom-elements", "focus-trap", "@floating-ui/dom"],
  plugins: [typescript(), terser()],
});
