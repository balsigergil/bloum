# AGENTS.md

Guidance for AI agents working in this repo.

## Commands

```bash
npm run dev     # Storybook on :6006 (alias of `sb`)
npm run build   # JS + CSS + types in parallel
                # build:js (esbuild) / build:css (PostCSS) / build:types (tsc)
npm run check   # lint + format:check + website build — run before finishing
npm run lint:fix / format / format:check / sb-build
```

Broken, don't use: `npm test` (Playwright config points at a nonexistent
`tests/` and the wrong port — **there is no test suite, verify in Storybook**);
`npm run docs*` (workspace removed; `website` is the only workspace).

## Architecture

CSS-first component library. No framework dep, no shadow DOM (consumer CSS
always applies). JS added only where behavior demands it.

### Component layout — `src/components/<name>/`

- `<name>.css` — required. Styles inside `@layer components`.
- `<name>.stories.ts` — required. HTML template strings. May be several
  (`button.stories.ts` + `icon-button.stories.ts`).
- `<name>.ts` — only the 21 behavioral components. May split (`tabs/` →
  `tabs|tab-list|tab|tab-panel`, `input/password-input`,
  `textarea/autogrow-textarea`, `calendar/` → `calendar|layout|locales`).

### Two JS patterns — match the one the neighbouring component uses

**1. Enhancer + `init*()`** (most). Class wraps an element found by selector.

- Selectors mostly class names — `.modal`, `.drawer`, `.popover`, `.tooltip`,
  `.collapsible`, `.password-toggle`, `.color-scheme-switcher`; a few data attrs
  — `[data-avatar]`, `[data-pin-input]`, `textarea[data-autogrow]`. No `[bl-*]`
  convention.
- Instance stashed on the element, typed via
  `Bloum<Name>Element extends HTMLElement`. Property name is **inconsistent**
  (`blmodal`, `bloumDrawer`, `blSegmentedControl`, `blmenu`, `bltoast`) — copy
  the neighbour, don't invent a scheme.
- Constructor destroys any prior instance → `init*()` is re-runnable.
- `MutationObserver` on `body` calls `destroy()` when the element (or an
  ancestor) is removed → htmx swaps stay safe.
- Listeners delegated at `document`.

**2. Custom element + `static register()`** (tabs, copy, calendar). Defines
`bl-tabs`, `bl-tab-list`, `bl-tab`, `bl-tab-panel`, `bl-copy-button`,
`bl-calendar`. `register()` guards double-define. Renders into light DOM.
`bl-calendar` is the only one using `observedAttributes`, and the only i18n
(`Intl` + `Calendar.locales` messages, en/fr); generic date math lives in
`src/utils/date.ts`.

### Wiring

`src/utils/init.ts` — `init(htmxSupport = true)` calls every `register()` and
`init*()`, then re-runs the DOM-scanning ones on `htmx:load`. Page singletons
(`initSidebar`, `initColorSchemeSwitcher`) intentionally excluded from the htmx
block.

`src/index.ts` — public surface: `init`, every class, every `init*()`.

### CSS

Entry `src/bloum.css`: declares `@layer theme, base, components, utilities` and
imports tokens, base, animations, every component stylesheet.

| File            | Layer(s)             | In `bloum.css`? |
| --------------- | -------------------- | --------------- |
| `bloum.css`     | theme → components   | (entry point)   |
| `reset.css`     | base                 | no — opt-in     |
| `utilities.css` | utilities            | no — opt-in     |

Reset/utilities are excluded so Tailwind projects can load `bloum.min.css` alone
with no preflight or class-name conflict. New utility → define the **complete
Tailwind scale** for that family, not only the values you need.

PostCSS + Tailwind v4 are compilation only — no Tailwind utilities in component
CSS.

#### Token tiers — reach only one tier down

1. **Palette** — `--bl-clr-blue-500` (`css/colors.css`) + role ramps
   `--bl-clr-{primary,success,warning,danger,info}-{50..950}`.
2. **Semantic** — `--bl-clr-control-bg`, `--bl-border-color-strong`
   (`css/tokens.css`); light on `:root`, dark on `.dark, [data-theme="dark"]`.
3. **Component** — `--bl-btn-bg`, declared on the component's own selector.

**Component CSS must never use the palette tier.** `var(--bl-clr-gray-200)`
defeats theming — a theme can't remap it without hitting every unrelated use of
that ramp. One exception: `--bl-clr-white` as the foreground on a saturated fill
(`.btn-primary`, solid badges, step indicators), which must *not* flip with the
color scheme.

`tokens.css` already flips every semantic in its `.dark` block, so a component
built purely from semantics needs **no `.dark` block of its own**. A `.dark`
block in component CSS signals something reached past the semantic tier.

Full semantic list in `css/tokens.css` — pick by role, not by weight; the
name says *why*, and a theme can pull apart two roles that share a value today.

### Themes (`src/themes/`)

A theme is a token remap and **nothing else — no component selectors**. Each is
a standalone opt-in stylesheet imported *after* `bloum.css`, built to
`dist/themes/*.min.css`. Any file dropped in `src/themes/` is picked up
automatically.

Load-bearing: component tokens are declared on the component selector, and a
direct match always beats inheritance — so `:root { --bl-btn-bg: … }` has **no
effect**, whatever the layer order. Themes must override the **semantic** tier.

### Docs (`src/docs/`)

MDX rendered in Storybook: `introduction`, `getting-started`, `components`
(status table of implemented + planned), `design-tokens`, `utilities`,
`tailwindcss`. Add or rename a token → update `design-tokens.mdx`.

### Adding a component

1. `src/components/<name>/` with `<name>.css` + `<name>.stories.ts`.
2. `@import "./components/<name>/<name>.css";` in `src/bloum.css`.
3. Needs behavior? Add `<name>.ts`, wire `init<Name>()` into `src/utils/init.ts`
   (direct call **and** `htmx:load` block), export class + init from
   `src/index.ts`.
4. Flip its row to ✅ in `src/docs/components.mdx`.

### Build outputs (`dist/`)

`esm/bloum.js`, `cjs/bloum.cjs`, `bloum.bundle.min.js` (IIFE global `Bloum`),
`types/index.d.ts`, `bloum.min.css`, `reset.min.css`, `utilities.min.css`,
`themes/*.min.css`, `llms.txt`, `llms-full.txt`, `llms/{docs,components}/*.md`.

`scripts/bundle.js` (esbuild) builds JS; `scripts/build-css.js` runs every
top-level `src/*.css` and every `src/themes/*` through PostCSS (import inlining,
base64 URL inlining, preset-env stage 2 with cascade layers preserved, cssnano).

`scripts/build-llms.js` generates the [llms.txt](https://llmstxt.org) files:
`src/docs/*.mdx` become Markdown pages; each `*.stories.ts` is bundled and its
stories rendered in a fake DOM (linkedom) to produce HTML examples, plus one
render per control option and the `--bl-*` tokens from the component CSS. A
story that throws is skipped with a warning — check the output after adding
one that touches browser APIs. The website serves these from `../dist` via
`website/src/pages/llms*`.

### Key deps

`@floating-ui/dom` (menu/popover/tooltip positioning), `focus-trap`
(modal/drawer).

## Conventions

- Conventional Commits, enforced by commitlint. Closing an issue:
  `fix(scope): description (fix #123)`.
- TS strict, ESNext, private `#fields`.
- Husky + lint-staged run lint/format pre-commit.

## Website (`website/`)

Astro static site (bloum.dev), npm workspace of the root. `npm run
build:website` from root builds library then site; everything else from
`website/`: `npm run dev` (:4321), `build`, `preview`.

- `src/pages/` file-routed — `index`, `components`, `templates`,
  `templates/sidebar-dashboard`. Plus `src/layouts/`, `src/components/`
  (`.astro` partials), `src/styles/global.css`, `src/assets/` (via
  `astro:assets`), `public/`.
- Tailwind v4 via `@tailwindcss/vite`, utilities inline in templates. TS strict.
- Site consumes `dist/` — rebuild the root package before checking a component
  change.
