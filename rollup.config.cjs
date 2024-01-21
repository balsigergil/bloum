const { defineConfig } = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

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
  plugins: [typescript(), terser()],
});
