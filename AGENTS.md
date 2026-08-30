# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
npm run dev          # Start Storybook dev server (port 6006) — alias for `npm run sb`
npm run build        # Build all outputs (JS, CSS, types) in parallel
npm run build:css    # CSS only (scripts/build-css.js)
npm run build:js     # JS bundles only (scripts/bundle.js)
npm run build:types  # .d.ts only (tsc -p tsconfig.types.json)
npm run check        # lint + format:check + website build — run this before finishing
npm run lint         # ESLint on src/
npm run lint:fix     # Auto-fix linting issues
npm run format       # Prettier formatting
npm run format:check # Check formatting without writing
npm run sb-build     # Build the static Storybook site
```

Prettier's globs cover `js,jsx,cjs,ts,tsx,css,html,json,yml` — **not** Markdown.

### Scripts that do not work

Don't reach for these; they are stale scaffolding, not a suite to keep green.

- `npm test` — Playwright is configured (`playwright.config.ts`) but `testDir:
  "./tests"` does not exist, and its `baseURL` is `:5173` while the dev server is
  Storybook on `:6006`. **There is no test suite.** Verify changes in Storybook.
- `npm run docs` / `npm run docs:build` — point at a `docs` workspace that was
  removed; the only workspace is `website`.

## Architecture

**Bloum** is a CSS-first component library with no framework dependency. The bulk
of every component is plain CSS keyed off class names; JavaScript is added only
where behavior demands it. Nothing uses shadow DOM, so consumer CSS always
applies.

### Component layout

Each component lives in `src/components/<name>/`:

- `<name>.css` — required. Scoped styles inside `@layer components`.
- `<name>.stories.ts` — required. Storybook stories (HTML template strings). A
  component may have several (e.g. `button.stories.ts` +
  `icon-button.stories.ts`).
- `<name>.ts` — only for the 20 components that need behavior. May be split
  (`tabs/` has `tabs.ts`, `tab-list.ts`, `tab.ts`, `tab-panel.ts`;
  `input/` has `password-input.ts`; `textarea/` has `autogrow-textarea.ts`).

### The two JS patterns

Both exist deliberately. Match the one used by the component you're touching.

**1. Enhancer + `init*()` function** (most components). A class wraps an existing
DOM element found by selector:

- Selectors are usually **class names** — `.modal`, `.drawer`, `.popover`,
  `.tooltip`, `.collapsible`, `.password-toggle`, `.color-scheme-switcher`. A few
  use data attributes: `[data-avatar]`, `[data-pin-input]`,
  `textarea[data-autogrow]`. There is no `[bl-*]` attribute convention.
- The instance is stashed on the element, typed through a
  `Bloum<Name>Element extends HTMLElement` interface. **The property name is not
  consistent** across components (`element.blmodal`, `element.bloumDrawer`,
  `element.blSegmentedControl`, `element.blmenu`, `element.bltoast`, …). Copy the
  neighbouring component rather than inventing a scheme.
- The constructor destroys any pre-existing instance on that element, so
  `init*()` is safe to run repeatedly.
- A `MutationObserver` on `document.body` watches for the element (or an
  ancestor) being removed and calls `destroy()` — this is what makes htmx swaps
  safe.
- Event listeners are typically delegated at the `document` level.

**2. Custom element + `static register()`** (tabs, copy). `Tabs`, `TabList`,
`Tab`, `TabPanel` and `CopyButton` extend `HTMLElement` and define `bl-tabs`,
`bl-tab-list`, `bl-tab`, `bl-tab-panel`, `bl-copy-button`. `register()` guards
against a double `customElements.define`. They render into the light DOM.

### Wiring: `src/utils/init.ts` and `src/index.ts`

`init(htmxSupport = true)` in `src/utils/init.ts` calls every `register()` and
`init*()`, then re-runs the DOM-scanning ones on `htmx:load` so swapped-in
content is initialized. Page-level singletons (`initSidebar`,
`initColorSchemeSwitcher`) are intentionally left out of the htmx block.

`src/index.ts` is the public surface: it re-exports `init`, every component
class, and every `init*()` function.

### CSS system

`src/bloum.css` is the entry point. It declares the layer order
(`@layer theme, base, components, utilities`) and `@import`s tokens, base styles,
animations, and every component stylesheet.

Three stylesheets ship, and they are separate on purpose:

| File            | Layer(s)          | Imported by `bloum.css`? |
| --------------- | ----------------- | ------------------------ |
| `reset.css`     | `base`            | No — opt-in              |
| `bloum.css`     | `theme`→`components` | (entry point)         |
| `utilities.css` | `utilities`       | No — opt-in              |

`reset.css` and `utilities.css` are excluded so projects already using Tailwind
can load `bloum.min.css` alone and hit no preflight or class-name conflicts. See
`README.md` for the consumer-facing matrix. When adding a utility, define the
**complete scale** for that family (Tailwind's), not just the values you happen
to need.

PostCSS + Tailwind v4 are used only for compilation — no Tailwind utilities in
component CSS.

#### Token tiers

Tokens are layered, and component CSS must only ever reach one tier down:

1. **Palette** (`--bl-clr-blue-500`) — raw ramps in `css/colors.css`, plus the
   role ramps `--bl-clr-primary|success|warning|danger|info-{50..950}` that alias
   them.
2. **Semantic** (`--bl-clr-control-bg`, `--bl-border-color-strong`) — in
   `css/tokens.css`, light values on `:root`, dark on `.dark, [data-theme="dark"]`.
3. **Component** (`--bl-btn-bg`) — declared on the component's own selector.

**Component CSS must not reference the palette tier directly.** Writing
`var(--bl-clr-gray-200)` in a component defeats theming, because a theme cannot
remap it without also affecting every unrelated use of that ramp.

The one accepted exception is `--bl-clr-white` as the foreground on a saturated
fill (`.btn-primary`, solid badges, step indicators) — it must *not* flip with
the color scheme, which is exactly why a semantic token would be wrong there.

#### Semantic neutrals

These are the neutral tokens that exist in `css/tokens.css`. Pick by role, not by
weight — the name says *why*, and a theme can pull apart two roles that happen to
share a value today.

| Token                         | Light        | Dark          | Use for                                                        |
| ----------------------------- | ------------ | ------------- | -------------------------------------------------------------- |
| `--bl-clr-background`         | `white`      | `gray-900`    | page background                                                |
| `--bl-clr-surface`            | `white`      | `gray-800`    | raised panels: card, modal, drawer, popover                    |
| `--bl-clr-surface-muted`      | `gray-100`   | `gray-800`    | tinted zone inside a surface: card footer, popover header, tag |
| `--bl-clr-control-bg`         | `gray-200`   | `gray-600`    | neutral control face: default button, avatar, skeleton         |
| `--bl-clr-control-bg-hover`   | `gray-300`   | `gray-700`    | hover on a filled control                                      |
| `--bl-clr-hover-bg`           | `gray-100`   | `gray-700`    | hover on an otherwise transparent row/item: menu, table, link  |
| `--bl-clr-active-bg`          | `gray-200`   | `gray-700`    | selected or highlighted item                                   |
| `--bl-clr-track-bg`           | `gray-300`   | `gray-700`    | unfilled track: progress, switch, range                        |
| `--bl-clr-background-inverted`| `gray-900`   | `gray-100`    | inverted surface: tooltip, solid badge, timeline marker        |
| `--bl-clr-text-inverted`      | `gray-200`   | `gray-700`    | text on an inverted surface                                    |
| `--bl-clr-overlay`            | `gray-900/25%` | `gray-900/50%` | modal and drawer scrims                                     |
| `--bl-border-color`           | `gray-200`   | `gray-700/50%`| default border                                                 |
| `--bl-border-color-strong`    | `gray-300`   | `gray-600`    | emphasized border: inputs, dividers that must read             |

Text: `--bl-clr-text`, `--bl-clr-text-light`, `--bl-clr-text-subtle`, plus
`--bl-clr-text-inverted` and `--bl-clr-text-light-inverted` for inverted
surfaces.

Because `tokens.css` already flips all of these in its `.dark` block, a component
built purely from them needs **no `.dark` block of its own**. A `.dark` block in
component CSS is a signal that something reached past the semantic tier — check
whether a semantic token would do the job before adding one.

### Themes (`src/themes/`)

A theme is a token remap and nothing else — **it must contain no component
selectors**. Each theme is a standalone opt-in stylesheet imported *after*
`bloum.css`, built to `dist/themes/*.min.css`.

This constraint is load-bearing: component tokens are declared on the component
selector (`.btn { --bl-btn-bg: … }`), and a directly-matched declaration always
beats an inherited one. So a theme setting `:root { --bl-btn-bg: … }` has **no
effect** regardless of `@layer` order. Themes must therefore override the
*semantic* tier, which components inherit from — never component tokens.

`src/themes/linear.css` is currently an empty `@layer theme {}` placeholder, not
a worked example. Any theme added to `src/themes/` is picked up by the build
automatically.

### Documentation (`src/docs/`)

MDX pages rendered inside Storybook alongside the stories:
`introduction.mdx`, `getting-started.mdx`, `components.mdx` (status table of
every component, implemented and planned), `design-tokens.mdx`,
`utilities.mdx`, `tailwindcss.mdx`.

`design-tokens.mdx` is consumer-facing token reference — if you add or rename a
token, update it there too.

### Adding a component

1. Create `src/components/<name>/` with `<name>.css` and `<name>.stories.ts`.
2. Add `@import "./components/<name>/<name>.css";` to `src/bloum.css`.
3. If it needs behavior: add `<name>.ts`, wire `init<Name>()` into
   `src/utils/init.ts` (both the direct call and the `htmx:load` block), and
   export the class + init function from `src/index.ts`.
4. Flip its row to ✅ in `src/docs/components.mdx`.

### Build outputs (`dist/`)

- `esm/bloum.js` — ES module
- `cjs/bloum.cjs` — CommonJS
- `bloum.bundle.min.js` — IIFE browser global (`Bloum`)
- `types/index.d.ts` — TypeScript declarations
- `bloum.min.css`, `reset.min.css`, `utilities.min.css` — compiled styles
- `themes/*.min.css` — compiled themes

JS is built by `scripts/bundle.js` (esbuild); CSS by `scripts/build-css.js`,
which compiles every top-level `.css` in `src/` and every file in `src/themes/`
through PostCSS (import inlining, base64 URL inlining, preset-env stage 2 with
cascade layers preserved, cssnano).

### Key dependencies

- **@floating-ui/dom** — Positioning for menus, popovers, tooltips
- **focus-trap** — Keyboard trap inside modals/drawers
- **Storybook 10** (`@storybook/html-vite`) — Component development environment

## Conventions

- **Commits**: Conventional Commits enforced via commitlint (`feat:`, `fix:`,
  `chore:`, etc.). `fix(scope): description (fix #123)` when closing an issue.
- **TypeScript**: Strict mode, ESNext target, private class fields (`#field`)
- **Line length**: 80 characters (Prettier)
- Pre-commit hooks (Husky + lint-staged) run lint and format checks automatically
- Releases are cut with `release-it` (`npm run release`) — it bumps the version,
  regenerates `CHANGELOG.md` from the commit log, and drafts a GitHub release.
  Don't hand-edit `CHANGELOG.md` or the `version` in `package.json`.

## Website (`website/`)

The `website/` directory is an Astro 6 static site — bloum.dev. It is an npm
workspace of the root package, so `npm run build:website` from the root builds
the library then the site. Run the rest from inside `website/`.

### Commands

```bash
cd website
npm run dev      # Start local dev server (default port 4321)
npm run build    # Build for production
npm run preview  # Preview the production build
```

### Structure

- `src/pages/` — File-based routing: `index.astro` (landing),
  `components.astro` (component showcase), `templates.astro` and
  `templates/sidebar-dashboard.astro` (full-page templates)
- `src/layouts/` — `layout.astro`, `template.astro`
- `src/components/` — Shared `.astro` partials (`head`, `header`, `footer`,
  `component-demo`, `component-section`, `font-selector`)
- `src/styles/global.css` — Global styles (imports Tailwind via `@import`)
- `src/assets/` — Optimized images referenced via `astro:assets`
- `public/` — Static files served as-is (e.g. `favicon.svg`)

### Key conventions

- **Tailwind CSS v4** via `@tailwindcss/vite` — all styling uses utility classes
  inline in `.astro` templates
- **TypeScript strict** mode enabled
- The site consumes the library from `dist/`, so rebuild the root package before
  checking a component change on the site
