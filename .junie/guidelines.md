# Bloum Guidelines

This document captures architectural decisions and conventions unique to this repository. It is intended for contributors who will extend or maintain the library.

## Architecture, technologies, and tools

- Library scope and runtime model
  - Bloum is a framework-agnostic UI library composed of:
    - Mainly lightweight, DOM-controller classes for others (e.g., Menu, Modal, Tooltip) that enhance existing markup by finding it in the DOM and attaching behavior.
    - Some vanilla Web Components (HTMLElement subclasses) for some widgets (e.g., Tabs, TabList, Tab, TabPanel).
  - The public entry point is `src/index.ts`. It exports all components plus `init(...)` and a set of `initX` helpers for progressive enhancement.
  - `init(htmxSupport = true)` registers custom elements, eagerly initializes controller-based components, and (if enabled) re-initializes on `htmx:load` for dynamic content.

- Source layout
  - Components live in `src/components/<name>/` with co-located `.ts`, `.css`, and `*.stories.ts` files.
  - `src/bloum.css` is the single entry CSS that composes all layers and component styles.
  - Shared utilities go under `src/utils`.

- Styling system
  - Design tokens are defined via CSS custom properties (prefix `--bl-`) in `src/css/tokens.css`. Tokens include typography, radii, shadows, transitions, breakpoints, focus ring, and form tokens.
  - Dark mode overrides are applied by scoping tokens under `.dark, [data-theme="dark"] { ... }`. Consumers can theme by overriding tokens on any container.
  - CSS composition uses `@layer theme, base, components, utilities;` and the build respects this order. Each component stylesheet wraps rules in `@layer components { ... }`.
  - Modern CSS features are used (nesting, `hsl(from ...)`, `color-mix`, etc.). Avoid adding vendor prefixes manually; PostCSS/preset-env handles compatibility as configured.

- CSS build and assets
  - Production CSS is compiled with PostCSS using `config/postcss.config.js`:
    - `postcss-import` to resolve `@import` in `src/bloum.css`.
    - `postcss-url` with `{ url: "inline", encodeType: "base64" }` inlines assets (e.g., SVG) into CSS.
    - `postcss-preset-env` at stage 2 (with `cascade-layers` disabled) to enable modern features consistently.
    - `cssnano` minification (with `calc: false`).
  - Storybook uses a separate PostCSS config (`postcss.config.js`) that enables `@tailwindcss/postcss` for utility classes in docs only. Tailwind is not part of the production bundle.

- JavaScript build and distribution
  - Bundling is handled by a custom esbuild script (`scripts/bundle.js`), producing:
    - ESM: `dist/esm/bloum.js` (module field)
    - CJS: `dist/cjs/bloum.cjs` (main field, minified)
    - IIFE browser bundle: `dist/bloum.bundle.min.js` with global `window.Bloum`
  - esbuild loader inlines `.svg` imports as text, enabling components to embed SVG markup.
  - Type declarations are emitted via `tsconfig.types.json` to `dist/types/`.

- Dev server and aliasing
  - Vite is used for local development and Storybook rendering.

- Documentation & demos with Storybook 9
  - Some component styles include Storybook-specific fixes (e.g., drawer/modal positioning).

- Quality
  - Linting: ESLint flat config with JS+TS recommended presets and `eslint-plugin-storybook`.
  - Commits: Commitlint enforces Conventional Commits (`@commitlint/config-conventional`).

- Testing
  - Playwright is configured (`playwright.config.ts`) to run against the local dev server (`npm run dev` -> `storybook dev`) at `http://127.0.0.1:5173`. The test directory is `./tests`.
  - As of this writing, there are no test files in `tests/` (the folder exists but is empty). Future tests should navigate Storybook stories or dedicated test pages.


## Coding styles and conventions

- TypeScript patterns
  - Prefer `class`-based implementations with ECMAScript private fields (`#foo`) for encapsulation.
  - For controller-based components that enhance the existing markup:
    - Export a class (e.g., `Menu`) and an `initX()` function that queries the DOM and attaches one instance per element.
    - Attach the instance back to the element to guard against multiple initializations (e.g., `element.blmenu = this`) and implement `destroy()` to remove listeners.
    - Use document-level listeners for global interactions where appropriate (e.g., closing on outside click or Escape).
  - For custom elements:
    - Define as `class X extends HTMLElement` and expose a static `NAME = "bl-..."` and `static register()` that guards against double registration via `customElements.get(NAME)`.
    - Register components in `utils/init.ts` (via `Tabs.register()`, etc.) and export them from `src/index.ts`.
  - New components should prefer controller-based implementations to custom elements.

- Initialization and progressive enhancement
  - Add new `initX()` functions to `utils/init.ts` and export them from `src/index.ts`.
  - Ensure `initX()` is idempotent and safe to call repeatedly.
  - If the component should re-initialize on HTMX swaps, ensure it is covered by the `htmx:load` hook in `init()`.

- State and class conventions
  - Use semantic state classes consistently:
    - `show` for visibility toggling of popovers/menus/panels.
    - `active` for selected tab-like states.
    - `htmx-request` and `btn-loading` are recognized by styles to show a spinner/disabled state on buttons.
  - Prefer `data-` attributes to bind triggers and targets (e.g., `[data-dropdown-toggle]`).

- Accessibility
  - Follow WAI-ARIA patterns (e.g., Tabs set `aria-selected`, `aria-controls`, correct `tabIndex` management, and keyboard navigation). Ensure new components include correct roles/ARIA and respect focus management and `:focus-visible`.
  - Focus styles are token-driven (`--bl-focus-*`); don’t hardcode colors or shadows; use tokens.

- CSS conventions
  - Place component styles under `src/components/<name>/<name>.css` and wrap rules in `@layer components { ... }`.
  - Use and extend tokens from `src/css/tokens.css`; prefer custom properties over magic values. Prefix new tokens with `--bl-`.
  - Dark mode: put overrides under `.dark { ... }` or `[data-theme="dark"] { ... }`. Use nested rules for dark mode.
  - Keep specificity low; rely on `@layer` ordering and single-class selectors (e.g., `.btn`, `.btn-primary`). Avoid BEM unless necessary; most components use short, composable class names.
  - When computing colors programmatically, prefer `hsl(from var(--...))` and `color-mix(...)` helpers as used across the codebase.
  - If importing external assets in CSS, remember that production PostCSS inlines them; avoid large assets or disable inlining per rule if needed.

- Module and export hygiene
  - Export new components and init functions from `src/index.ts` to include them in all build targets.
  - Add corresponding CSS imports in `src/bloum.css` to ship styles in the dist stylesheet.
  - Avoid side effects in modules other than registration/inits performed by `init()`; let consumers opt-in.

- External libs and dependencies
  - Use `@floating-ui/dom` for anchored positioning (menus, popovers, tooltips). Keep wrappers minimal and consistent (`computePosition` with `offset`, `flip`, `shift`).
  - Keep new runtime dependencies to a minimum; prefer zero-dependency solutions when possible.

- Storybook authoring
  - Use `@storybook/html-vite` types (`Meta`, `StoryObj`) in stories for better DX.
  - Add Stories under the appropriate group; the global sort order is defined in `.storybook/preview.ts`.

- Testing
  - There are currently no tests. If/when you add Playwright tests:
    - Place them under `./tests` (Playwright’s `testDir`).
    - The config starts Storybook (`npm run dev` -> `storybook dev`) as the web server.
    - Prefer stable selectors and cover accessibility/keyboard flows.

## Adding a new component (checklist)

- Create `src/components/<name>/<name>.ts` and implement either a custom element (`extends HTMLElement` with `static NAME` + `static register`) or a controller with an `init<Name>()`.
- Add styles in `src/components/<name>/<name>.css` inside `@layer components`.
- Import the CSS in `src/bloum.css`.
- Export the class/functions from `src/index.ts`.
- Add a Storybook story `src/components/<name>/<name>.stories.ts` using the HTML renderer.
- Validate ARIA, keyboard navigation, and dark mode support.
- Run `npm run lint`. Ignore warnings for now.
