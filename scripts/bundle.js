import * as esbuild from "esbuild";
import packageJson from "../package.json" with { type: "json" };

const commonConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  loader: { ".svg": "text" },
};

const bundleFile = "dist/bloum.bundle.min.js";

// Browser build bundle (IIFE)
await esbuild.build({
  ...commonConfig,
  platform: "browser",
  format: "iife",
  packages: "bundle",
  globalName: "Bloum",
  minify: true,
  outfile: bundleFile,
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
  outfile: packageJson.main,
  minify: true,
});
