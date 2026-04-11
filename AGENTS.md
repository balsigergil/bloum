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
