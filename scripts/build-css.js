import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssUrl from "postcss-url";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

// Production PostCSS pipeline used to compile the final CSS files
const processor = postcss([
  postcssImport(),
  postcssUrl({ url: "inline", encodeType: "base64" }),
  postcssPresetEnv({ stage: 2, features: { "cascade-layers": false } }),
  cssnano({ preset: ["default", { calc: false }] }),
]);

const builds = [
  { srcDir: "src", outDir: "dist" },
  { srcDir: "src/themes", outDir: "dist/themes" },
];

async function build({ srcDir, outDir }) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => entry.name);

  await mkdir(outDir, { recursive: true });

  await Promise.all(
    files.map(async (name) => {
      const from = path.join(srcDir, name);
      const to = path.join(outDir, name.replace(/\.css$/, ".min.css"));
      const css = await readFile(from, "utf8");
      const result = await processor.process(css, { from, to });
      await writeFile(to, result.css);
    }),
  );
}

await Promise.all(builds.map(build));
