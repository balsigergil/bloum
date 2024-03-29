const { defineConfig } = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

const pkg = require("./package.json");

module.exports = defineConfig({
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
      ecma: 2020,
    }),
  ],
});
