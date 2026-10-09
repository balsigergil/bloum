// Generates llms.txt (https://llmstxt.org) from the Storybook sources:
//   dist/llms.txt                       index with links to every page
//   dist/llms-full.txt                  every page concatenated
//   dist/llms/docs/<slug>.md            one page per src/docs/*.mdx
//   dist/llms/components/<slug>.md      one page per *.stories.ts
//
// Component pages are built by rendering each story in a fake DOM (linkedom),
// so the HTML examples always match what Storybook shows.
import * as esbuild from "esbuild";
import { parseHTML } from "linkedom";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import packageJson from "../package.json" with { type: "json" };

const SITE_URL = "https://www.bloum.dev";
const STORYBOOK_URL = "https://docs.bloum.dev";
const OUT_DIR = "dist";
// Stories rendering large generated datasets are demos, not useful examples.
const MAX_EXAMPLE_LENGTH = 10_000;

// Order of the documentation pages in llms.txt / llms-full.txt.
const DOCS_ORDER = [
  "introduction",
  "getting-started",
  "components",
  "design-tokens",
  "tailwindcss",
  "utilities",
];

/** Same id sanitization as Storybook (`Components/Elements/Button` → `components-elements-button`). */
const toStorybookId = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const slugify = (name) => toStorybookId(name);

/** `BadgeTopRight` → `Badge Top Right`, like Storybook's story names. */
const storyName = (exportName) =>
  exportName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/_/g, " ");

const dedent = (text) => {
  const lines = text
    .replace(/^\s*\n/, "")
    .trimEnd()
    .split("\n");
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length),
  );
  return lines.map((l) => l.slice(indent)).join("\n");
};

/** Minimal browser environment so story modules can be imported and rendered. */
function installFakeDom() {
  const win = parseHTML(
    "<!doctype html><html><head></head><body></body></html>",
  );
  for (const key of [
    "window",
    "document",
    "Node",
    "Element",
    "HTMLElement",
    "HTMLInputElement",
    "HTMLSelectElement",
    "HTMLTextAreaElement",
    "HTMLButtonElement",
    "customElements",
    "MutationObserver",
    "Event",
    "CustomEvent",
  ]) {
    if (win[key]) globalThis[key] = win[key];
  }
  Object.defineProperty(win.HTMLElement.prototype, "innerText", {
    get() {
      return this.textContent;
    },
    set(value) {
      this.textContent = value;
    },
  });
  Object.defineProperty(win.document, "baseURI", { value: SITE_URL });
  globalThis.CSS ??= { escape: (s) => s, supports: () => true };
  // Stories schedule demo behavior (init calls, timers) that is irrelevant here.
  globalThis.setTimeout = () => 0;
  globalThis.setInterval = () => 0;
  globalThis.requestAnimationFrame = () => 0;
}

/**
 * Bundles every stories file plus the library entry in one pass, with code
 * splitting so that stories and the library share the same classes — custom
 * elements registered through `src/index.ts` are then constructible in stories.
 */
async function bundleStories(files, tmpDir) {
  await esbuild.build({
    entryPoints: [...files, "src/index.ts"],
    outdir: tmpDir,
    outbase: "src",
    bundle: true,
    splitting: true,
    format: "esm",
    platform: "neutral",
    mainFields: ["module", "main"],
    logLevel: "error",
    external: ["@storybook/*"],
    loader: { ".css": "empty", ".svg": "text" },
    // linkedom's HTMLElement exposes `observedAttributes` as a getter only.
    tsconfigRaw: { compilerOptions: { useDefineForClassFields: true } },
    plugins: [
      {
        name: "raw-suffix",
        setup(build) {
          build.onResolve({ filter: /\?raw$/ }, (args) => ({
            path: path.resolve(
              args.resolveDir,
              args.path.replace(/\?raw$/, ""),
            ),
          }));
        },
      },
    ],
  });
  const load = (file) =>
    import(
      pathToFileURL(
        path.join(tmpDir, path.relative("src", file).replace(/\.ts$/, ".js")),
      ).href
    );

  for (const value of Object.values(await load("src/index.ts"))) {
    if (typeof value?.register === "function") value.register();
  }
  return load;
}

function renderStory(meta, story) {
  const render = story.render ?? meta.render;
  if (!render) return null;
  const args = { ...meta.args, ...story.args };
  const result = render(args, { args, id: "", name: "" });
  if (typeof result === "string") return dedent(result);
  if (result?.outerHTML) return result.outerHTML;
  return null;
}

/**
 * Renders the meta template once per value of each `select`/`radio`/`boolean`
 * control, so every variant class shows up, not only those used in stories.
 */
function renderOptions(meta, baseArgs) {
  const options = [];
  for (const [arg, argType] of Object.entries(meta.argTypes ?? {})) {
    const control = argType.control?.type ?? argType.control;
    const values =
      control === "boolean" ? [true] : (argType.options ?? []).filter(Boolean);
    const rendered = [];
    for (const value of values) {
      let html;
      try {
        html = renderStory(meta, { args: { ...baseArgs, [arg]: value } });
      } catch {
        // A control that only makes sense combined with others; skip it.
      }
      if (html && html.length < 600) rendered.push({ value, html });
    }
    if (rendered.length && rendered.length === values.length) {
      options.push({ arg, rendered });
    }
  }
  return options;
}

/** Component token declarations (`--bl-btn-bg: …`) from the component stylesheet. */
async function componentTokens(dir) {
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".css"));
  const tokens = new Map();
  for (const file of files) {
    const css = await fs.readFile(path.join(dir, file), "utf8");
    for (const [, name, value] of css.matchAll(
      /(--bl-[\w-]+)\s*:\s*([^;]+);/g,
    )) {
      if (!tokens.has(name))
        tokens.set(name, value.replace(/\s+/g, " ").trim());
    }
  }
  return tokens;
}

/** Descriptions from the status tables in components.mdx, keyed by Storybook id. */
function parseComponentDescriptions(mdx) {
  const descriptions = new Map();
  for (const line of mdx.split("\n")) {
    const cells = line.split("|").map((c) => c.trim());
    const id = cells[4]?.match(/path=\/(?:docs|story)\/(.+?)--/)?.[1];
    if (!id) continue;
    // Some rows link to an outdated Storybook id, so also key by name.
    for (const key of [id, slugify(cells[1])]) {
      if (!descriptions.has(key)) descriptions.set(key, cells[2]);
    }
  }
  return descriptions;
}

async function buildComponentPages(tmpDir) {
  installFakeDom();
  const files = (await fs.readdir("src/components", { recursive: true }))
    .filter((f) => f.endsWith(".stories.ts"))
    .sort()
    .map((f) => path.join("src/components", f));

  const load = await bundleStories(files, tmpDir);
  const pages = [];
  for (const file of files) {
    const mod = await load(file);
    const meta = mod.default;
    const id = toStorybookId(meta.title);
    const name = meta.title.split("/").at(-1);
    const examples = [];

    // Module namespaces are sorted alphabetically; Storybook keeps source order.
    const source = await fs.readFile(file, "utf8");
    const exportNames = [...source.matchAll(/^export const (\w+)/gm)].map(
      (m) => m[1],
    );
    for (const exportName of exportNames) {
      const story = mod[exportName];
      if (typeof story !== "object" || !story) continue;
      let html;
      try {
        html = renderStory(meta, story);
      } catch (error) {
        console.warn(`[llms] ${file} › ${exportName}: ${error.message}`);
      }
      if (!html || html.length > MAX_EXAMPLE_LENGTH) continue;
      examples.push({
        name: story.name ?? storyName(exportName),
        description: story.parameters?.docs?.description?.story,
        html,
      });
    }

    const firstStory = mod[exportNames[0]];
    const options = meta.render
      ? renderOptions(meta, { ...meta.args, ...firstStory?.args })
      : [];

    pages.push({
      id,
      name,
      slug: slugify(name),
      title: meta.title,
      experimental: meta.title.startsWith("Lab/"),
      description: meta.parameters?.docs?.description?.component,
      tokens: await componentTokens(path.dirname(file)),
      examples,
      options,
    });
  }
  return pages;
}

async function buildDocPages() {
  const pages = [];
  for (const slug of DOCS_ORDER) {
    const mdx = await fs.readFile(`src/docs/${slug}.mdx`, "utf8");
    const title = mdx.match(/<Meta\s+title="([^"]+)"/)[1];
    pages.push({ id: toStorybookId(title), slug, mdx });
  }
  return pages;
}

const docUrl = (page) => `${SITE_URL}/llms/docs/${page.slug}.md`;
const componentUrl = (page) => `${SITE_URL}/llms/components/${page.slug}.md`;

/** Strips MDX-only syntax and rewrites Storybook-relative links. */
const summary = (summaries, component) =>
  summaries.get(component.id) ?? summaries.get(component.slug);

function mdxToMarkdown(mdx, linkTargets) {
  let inFence = false;
  const lines = [];
  for (const line of mdx.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (!inFence && (/^import\s/.test(line) || /^<Meta\b/.test(line))) continue;
    lines.push(line);
  }
  return lines
    .join("\n")
    .replace(
      /\]\(\/?\?path=\/(docs|story)\/([^)]+?)--([^)]*)\)/g,
      (_, kind, id, rest) =>
        `](${linkTargets(id) ?? `${STORYBOOK_URL}/?path=/${kind}/${id}--${rest}`})`,
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function componentMarkdown(page, summary) {
  const out = [`# ${page.name}`, ""];
  if (summary) out.push(`> ${summary}`, "");
  if (page.experimental) {
    out.push("**Experimental:** the API of this component may change.", "");
  }
  out.push(
    `Interactive demo: ${STORYBOOK_URL}/?path=/docs/${page.id}--docs`,
    "",
  );
  if (page.description) out.push(dedent(page.description), "");

  if (page.tokens.size) {
    out.push(
      "## CSS custom properties",
      "",
      "Declared on the component selector. Override them on the same selector (or a more specific one) — setting them on `:root` has no effect.",
      "",
      "```css",
      ...[...page.tokens].map(([name, value]) => `${name}: ${value};`),
      "```",
      "",
    );
  }

  if (page.examples.length) {
    out.push("## Examples", "");
    for (const example of page.examples) {
      out.push(`### ${example.name}`, "");
      if (example.description) out.push(dedent(example.description), "");
      out.push("```html", example.html, "```", "");
    }
  }
  if (page.options.length) {
    out.push(
      "## Options",
      "",
      "Markup for each value of the Storybook controls.",
      "",
    );
    for (const { arg, rendered } of page.options) {
      out.push(`### \`${arg}\``, "", "```html");
      for (const { value, html } of rendered) {
        out.push(`<!-- ${arg}: ${value} -->`, html);
      }
      out.push("```", "");
    }
  }
  return out.join("\n").trim() + "\n";
}

function llmsIndex(docs, components, summaries) {
  const link = (title, url, desc) =>
    `- [${title}](${url})${desc ? `: ${desc}` : ""}`;
  const stable = components.filter((c) => !c.experimental);
  const lab = components.filter((c) => c.experimental);

  return `# Bloum

> ${packageJson.description} Bloum is a CSS-first UI component library for server-rendered multipage apps (Laravel, Django, Rails…), styled with plain CSS classes and enhanced with a small amount of vanilla JavaScript. It works well with htmx and Alpine.js and is not meant for React or Vue.

Key facts:

- Install with \`npm install bloum\` or from a CDN (\`https://unpkg.com/bloum/dist/...\`). Call \`init()\` (or \`Bloum.init()\` with the browser bundle) once the DOM is ready; it also re-initializes components on \`htmx:load\`.
- Components are plain HTML with Bloum classes (\`.btn\`, \`.modal\`, \`.input\`…) or light-DOM custom elements (\`<bl-tabs>\`, \`<bl-copy-button>\`, \`<bl-calendar>\`). There is no shadow DOM.
- \`bloum.min.css\` holds the tokens and component styles. \`reset.min.css\` and \`utilities.min.css\` are opt-in; with Tailwind CSS, load only \`bloum.min.css\`.
- Theme by overriding the semantic \`--bl-*\` CSS variables (see Design tokens). Dark mode is enabled with the \`.dark\` class or \`data-theme="dark"\`.
- Current version: ${packageJson.version}. The complete documentation in one file is at ${SITE_URL}/llms-full.txt.

## Docs

${docs.map((d) => link(d.title, docUrl(d))).join("\n")}

## Components

${stable.map((c) => link(c.name, componentUrl(c), summary(summaries, c))).join("\n")}

## Optional

${lab.map((c) => link(`${c.name} (experimental)`, componentUrl(c), summary(summaries, c))).join("\n")}
- [Storybook](${STORYBOOK_URL}): Interactive demos of every component
- [Source code](${packageJson.repository.url.replace(/\.git$/, "")}): GitHub repository
`;
}

const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "bloum-llms-"));
try {
  const docs = await buildDocPages();
  const components = await buildComponentPages(tmpDir);
  const summaries = parseComponentDescriptions(
    docs.find((d) => d.slug === "components").mdx,
  );

  const pagesById = new Map([
    ...docs.map((d) => [d.id, docUrl(d)]),
    ...components.map((c) => [c.id, componentUrl(c)]),
  ]);
  // Fall back on the component name for links to an outdated Storybook id.
  const linkTargets = (id) => {
    if (pagesById.has(id)) return pagesById.get(id);
    const component = components.find((c) => id.endsWith(`-${c.slug}`));
    return component && componentUrl(component);
  };

  const files = new Map();
  for (const doc of docs) {
    doc.markdown = mdxToMarkdown(doc.mdx, linkTargets) + "\n";
    doc.title = doc.markdown.match(/^# (.+)$/m)[1];
    files.set(`llms/docs/${doc.slug}.md`, doc.markdown);
  }
  for (const component of components) {
    component.markdown = componentMarkdown(
      component,
      summary(summaries, component),
    );
    files.set(`llms/components/${component.slug}.md`, component.markdown);
  }

  files.set("llms.txt", llmsIndex(docs, components, summaries));
  files.set(
    "llms-full.txt",
    [
      files.get("llms.txt"),
      ...docs.map((d) => d.markdown),
      ...components.map((c) => c.markdown),
    ]
      .map((s) => s.trim())
      .join("\n\n---\n\n") + "\n",
  );

  for (const [file, content] of files) {
    const target = path.join(OUT_DIR, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }
  console.log(
    `[llms] ${docs.length} docs + ${components.length} components → ${OUT_DIR}/llms.txt`,
  );
} finally {
  await fs.rm(tmpDir, { recursive: true, force: true });
}
// Story modules may leave observers or timers behind.
process.exit(0);
