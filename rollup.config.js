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
      format: "umd",
      name: "bloom",
    },
  ],
  plugins: [
    typescript(),
    terser({
      keep_classnames: true,
    }),
  ],
});
