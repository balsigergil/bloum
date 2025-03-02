<div align="center">
    <div>
      <a href="https://www.bloum.dev" target="_blank">
        <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo.png" height="150" alt="Bloum Logo">
      </a>
    </div>
    <strong>A powerful library of modern web components</strong>
    <br>
    <br>
    <div align="center">
        <a aria-label="NPM version" href="https://www.npmjs.com/package/bloum">
          <img alt="NPM version" src="https://img.shields.io/npm/v/bloum?style=for-the-badge">
        </a>
        <a aria-label="Minzipped size" href="https://bundlephobia.com/package/bloum">
          <img alt="Minzipped size" src="https://img.shields.io/bundlephobia/minzip/bloum?style=for-the-badge">
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

Bloum is an open-source library of web components.
The goal of this library is to provide a set of CSS and JavaScript components
that can be used in any web project, regardless of the framework or library used.
The main use-case for Bloum is to provide easy-to-use components for a project
using MPA (Multi-Page Application) like Laravel, Django or Rails.
It pairs well with server-side rendering and progressive enhancement tools
like [HTMX](https://htmx.org/) and [Alpine.js](https://alpinejs.dev/).

## Features

- 🚀 **Feature-rich:** Bloum provides a wide range of components to build modern web apps or design systems.
- 🪶 **Lightweight:** Bloum is light. It's less than 20KB minified and gzipped.
- 🔍 **Accessible:** Built with accessibility in mind. It's fully keyboard-navigable and [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant.
- 🌓 **Dark mode:** Supports dark mode out of the box.
- 📱 **Responsive:** Works on all modern browsers and devices.
- 📦 **Single package:** Everything is bundled in a single package for an easy setup.
- 🎨 **Theming:** Easy to customize with CSS variables.


[//]: # (- 🧪 **Tested:** End-to-end tests with [Playwright]&#40;https://playwright.dev/&#41; and unit tests with [Vitest]&#40;https://vitejs.dev/guide/features.html#testing&#41;.)

## Installation

### CDN

Use the following lines in your `head` tag
to load the latest version of Bloum from a CDN:

```html
<script src="https://unpkg.com/bloum" defer></script>
<link href="https://unpkg.com/bloum/dist/bloum.min.css" rel="stylesheet">
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

Once installed, import the library in your JavaScript project:

```js
import "bloum"
```

This will register all the components globally.

After that, include the stylesheet in your JavaScript
if you're using a bundler like Vite or Webpack:

```js
import "bloum/dist/bloum.min.css"
```

Then, use the components in your HTML.

## Documentation

The documentation is available at [https://www.bloum.dev](https://www.bloum.dev)
for more information on how to use the components.

## License

Bloum is [MIT licensed](./LICENSE) &copy; [Gil Balsiger](https://github.com/balsigergil)
