<div align="center">
    <div>
      <a href="https://www.bloum.dev" target="_blank">
        <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo_light.png" height="150" alt="Bloum Logo">
      </a>
    </div>
    <strong>A library of UI web components for backend developers</strong>
    <br>
    <br>
    <div align="center">
        <a aria-label="NPM version" href="https://www.npmjs.com/package/bloum">
          <img alt="NPM version" src="https://img.shields.io/npm/v/bloum?style=for-the-badge">
        </a>
        <a aria-label="License" href="https://github.com/balsigergil/bloum/blob/main/LICENSE">
          <img alt="License" src="https://img.shields.io/npm/l/bloum?style=for-the-badge">
        </a>
        <a aria-label="Build status" href="https://github.com/balsigergil/bloum/actions/workflows/quality.yml">
          <img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/balsigergil/bloum/quality.yml?style=for-the-badge&label=tests">
        </a>
    </div>
</div>

## Table of Contents

- 📖 [Introduction](#what-is-bloum)
- 🚀 [Features](#features)
- 📦 [Installation](#installation)
- 💻 [Usage](#usage)
- 📋 [Documentation](#documentation)
- ⚖️ [License](#license)

## What is Bloum?

Bloum is an open-source library of UI web components intended to provide a complete set of CSS and JS components to compose your design system.
The goal for Bloum is to be a modern alternative to Bootstrap and easy to use for non-frontend developers.

The main use-case for Bloum is to provide components for a multipage application (MPA) project like Laravel, Django or Rails. It is not (and won't be) intended to be used with frontend frameworks like React or Vue.
It pairs well with server-side rendering and progressive enhancement tools like [HTMX](https://htmx.org/) and [Alpine.js](https://alpinejs.dev/).

## Features

- 🚀 **Feature-rich:** Bloum provides a wide range of components to build modern web apps or design systems.
- 🪶 **Lightweight:** Bloum is light. It's less than 30KB minified and gzipped.
- 🔍 **Accessible:** Built with accessibility in mind. It's fully keyboard-navigable and [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant.
- 🌓 **Dark mode:** Supports dark mode out of the box.
- 📱 **Responsive:** Works on all modern browsers and devices.
- 📦 **No dependencies:** Works standalone, with no CSS framework required, easy Tainwind integration.
- 🎨 **Theming:** Easy to customize with CSS variables.

[//]: # "- 🧪 **Tested:** End-to-end tests with [Playwright](https://playwright.dev/) and unit tests with [Vitest](https://vitejs.dev/guide/features.html#testing)."

## Installation

Bloum ships its CSS as three separate stylesheets. Which ones you load depends on
whether your project already uses Tailwind CSS:

| Stylesheet          | Standalone | With Tailwind | Contains                               |
| :------------------ | :--------- | :------------ | :------------------------------------- |
| `reset.min.css`     | ✅ Yes     | ❌ No         | Cross-browser normalization            |
| `bloum.min.css`     | ✅ Yes     | ✅ Yes        | Design tokens and all component styles |
| `utilities.min.css` | ✅ Yes     | ❌ No         | Basic utilities (flex, grid, spacing)   |

With Tailwind, load only `bloum.min.css` — Tailwind's preflight and utilities
already cover the other two.

### CDN

Use the following lines in your `head` tag
to load the latest version of Bloum from a CDN:

```html
<!-- Standalone (no Tailwind) -->
<link href="https://unpkg.com/bloum/dist/reset.min.css" rel="stylesheet" />
<link href="https://unpkg.com/bloum/dist/bloum.min.css" rel="stylesheet" />
<link href="https://unpkg.com/bloum/dist/utilities.min.css" rel="stylesheet" />

<script src="https://unpkg.com/bloum/dist/bloum.bundle.min.js" defer></script>
```

The bundle exposes a global `Bloum` object. Call `init()` on it once the DOM is
ready:

```html
<script>
  document.addEventListener("DOMContentLoaded", () => Bloum.init());
</script>
```

### Package Manager

Install Bloum using your favorite package manager:

```bash
# NPM
npm install bloum

# Yarn
yarn add bloum

# Pnpm
pnpm add bloum

# Bun
bun add bloum
```

## Usage

Once installed, import the library in your project and initialize it:

```js
import { init } from "bloum";
init();
```

This will register all the components globally.

After that, include the stylesheets in your JavaScript
if you're using a bundler like Vite or Webpack:

```js
// Standalone (no Tailwind)
import "bloum/dist/reset.min.css";
import "bloum/dist/bloum.min.css";
import "bloum/dist/utilities.min.css";
```

```js
// With Tailwind — the reset and utilities are not needed
import "tailwindcss";
import "bloum/dist/bloum.min.css";
```

Then, use the components in your HTML.

## Documentation

The documentation is available at [https://www.bloum.dev](https://www.bloum.dev)
for more information on how to use the components.

## License

Bloum is [MIT licensed](./LICENSE) &copy; [Gil Balsiger](https://github.com/balsigergil)
