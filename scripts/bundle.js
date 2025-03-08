import fs from "fs";
import { promisify } from "util";
import { gzip } from "zlib";
import * as esbuild from "esbuild";
import packageJson from "../package.json" with { type: "json" };

const commonConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  loader: { ".svg": "text" },
};

// Browser build (IIFE)
await esbuild.build({
  ...commonConfig,
  platform: "browser",
  format: "iife",
  packages: "bundle",
  globalName: "Bloum",
  minify: true,
  outfile: packageJson.browser,
});

// Node build (ESM)
await esbuild.build({
  ...commonConfig,
  platform: "neutral",
  format: "esm",
  packages: "external",
  outfile: packageJson.module,
});

// Node build (CJS)
await esbuild.build({
  ...commonConfig,
  platform: "node",
  format: "cjs",
  packages: "external",
  minify: true,
  outfile: packageJson.main,
});

// Check the bundle size
const gzipAsync = promisify(gzip);
const bundle = fs.readFileSync(packageJson.browser);
const gzipped = await gzipAsync(bundle);

// Round the size to two decimal places
const round = (num) => Number(num).toFixed(2);

console.log(`Bundle size: ${round(bundle.length / 1024)} kB`);
console.log(`Gzipped size: ${round(gzipped.length / 1024)} kB`);
