# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
npm run dev          # Start Storybook dev server (port 6006)
npm run build        # Build all outputs (JS, CSS, types) in parallel
npm run lint         # ESLint on src/
npm run lint:fix     # Auto-fix linting issues
npm run format       # Prettier formatting
npm run format:check # Check formatting without writing
```

## Architecture

**Bloum** is a pure Web Components library (no framework dependency) written in TypeScript. Each component is a vanilla JS class that attaches to DOM elements via data attributes — no shadow DOM.

### Component pattern

Every component lives in `src/components/<name>/` with three files:

- `<name>.ts` — TypeScript class with constructor/destroy lifecycle
- `<name>.css` — Scoped styles using `@layer`
- `<name>.stories.ts` — Storybook stories (HTML template-based)

Components are initialized via an `init()` function that:

1. Queries the DOM for elements by data attribute (e.g., `[bl-modal]`)
2. Creates a class instance and stores it on the element (e.g., `el._blModal`)
3. Hooks into `htmx:load` events so dynamic content is also initialized

Event listeners are typically delegated at the `document` level. Components use `MutationObserver` to detect DOM removal and auto-cleanup.

### CSS system

`src/css/` contains the design tokens and utilities. `src/bloum.css` orchestrates imports. Styles use native CSS layers (`@layer theme, base, components, utilities`) and CSS custom properties for theming. PostCSS + Tailwind v4 are used only for compilation — no Tailwind utilities in component CSS.

#### Token tiers

Tokens are layered, and component CSS must only ever reach one tier down:

1. **Palette** (`--bl-clr-blue-500`) — raw ramps in `css/colors.css`.
2. **Semantic** (`--bl-clr-primary-500`, `--bl-clr-control-bg`, `--bl-border-color-strong`) — in `css/tokens.css`, with light values on `:root` and dark on `.dark, [data-theme="dark"]`.
3. **Component** (`--bl-btn-bg`) — declared on the component's own selector.

**Component CSS must not reference the palette tier directly.** Writing `var(--bl-clr-gray-200)` in a component defeats theming, because a theme cannot remap it without also affecting every unrelated use of that ramp. Use the semantic tier instead.

#### Neutral fills

The semantic tier splits neutrals into a ramp plus role aliases:

| Ramp (override to restyle everything) | Light      | Dark       |
| ------------------------------------- | ---------- | ---------- |
| `--bl-clr-fill-faint`                 | `gray-50`  | `gray-900` |
| `--bl-clr-fill-soft`                  | `gray-100` | `gray-800` |
| `--bl-clr-fill-medium`                | `gray-200` | `gray-700` |
| `--bl-clr-fill-strong`                | `gray-300` | `gray-600` |
| `--bl-clr-fill-inverted`              | `gray-900` | `gray-100` |

| Role alias (what components reference) | Resolves to     | Use for                                            |
| -------------------------------------- | --------------- | -------------------------------------------------- |
| `--bl-clr-surface-subtle`              | `fill-faint`    | recessed zones: stripes, footers                   |
| `--bl-clr-surface-muted`               | `fill-soft`     | tinted panels: card footer, popover header         |
| `--bl-clr-control-bg`                  | `fill-medium`   | neutral control face: button, avatar, tag          |
| `--bl-clr-control-bg-hover`            | `fill-strong`   | hover on a filled control                          |
| `--bl-clr-hover-bg-subtle`             | `fill-soft`     | lighter hover: bordered faces like outline buttons |
| `--bl-clr-hover-bg`                    | `fill-medium`   | hover on an otherwise transparent row/item         |
| `--bl-clr-active-bg`                   | `fill-strong`   | selected or highlighted item                       |
| `--bl-clr-track-bg`                    | `fill-strong`   | unfilled track: progress, switch, range            |
| `--bl-clr-inverted-bg` / `-text`       | `fill-inverted` | tooltip, solid badge                               |

Prefer the role alias at the call site — it says _why_, not just _how heavy_. Two roles sharing a value in the default theme is fine and intentional; a theme can pull them apart. Because the ramp inverts in dark mode, a component that uses it usually needs no `.dark` block at all; delete the block rather than duplicating it.

### Themes (`src/themes/`)

A theme is a token remap and nothing else — **it must contain no component selectors**. Each theme is a standalone opt-in stylesheet imported _after_ `bloum.css`, built to `dist/themes/*.min.css`. See `src/themes/linear.css`.

This constraint is load-bearing: component tokens are declared on the component selector (`.btn { --bl-btn-bg: … }`), and a directly-matched declaration always beats an inherited one. So a theme setting `:root { --bl-btn-bg: … }` has **no effect** regardless of `@layer` order. Themes must therefore override the _semantic_ tier, which components inherit from — never component tokens.

### Build outputs (`dist/`)

- `esm/bloum.js` — ES module
- `cjs/bloum.cjs` — CommonJS
- `bloum.bundle.min.js` — IIFE browser global (`Bloum`)
- `types/index.d.ts` — TypeScript declarations
- `*.min.css` — Compiled styles

Built via `scripts/bundle.js` (esbuild) for JS and PostCSS for CSS.

### Key dependencies

- **@floating-ui/dom** — Positioning for menus, popovers, tooltips
- **focus-trap** — Keyboard trap inside modals/drawers
- **Storybook 10** — Component development environment

## Conventions

- **Commits**: Conventional Commits enforced via commitlint (`feat:`, `fix:`, `chore:`, etc.)
- **TypeScript**: Strict mode, ESNext target, private class fields (`#field`)
- **Line length**: 80 characters (Prettier)
- Pre-commit hooks (Husky + lint-staged) run lint and format checks automatically

## Website (`website/`)

The `website/` directory is a standalone Astro 6 static site — the homepage at
bloum.dev. Run all commands from inside that directory.

### Commands

```bash
cd website
npm run dev      # Start local dev server (default port 4321)
npm run build    # Build for production
npm run preview  # Preview the production build
```

### Structure

- `src/pages/` — File-based routing; `index.astro` is the single landing page
- `src/styles/global.css` — Global styles (imports Tailwind via `@import`)
- `src/assets/` — Optimized images (logo etc.) referenced via `astro:assets`
- `public/` — Static files served as-is (e.g. `favicon.svg`)

### Key conventions

- **Tailwind CSS v4** via `@tailwindcss/vite` — all styling uses utility classes
  inline in `.astro` templates
- **TypeScript strict** mode enabled
- No reusable component layer yet — markup lives directly in page files
