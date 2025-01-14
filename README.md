<div align="center">
    <a href="https://www.bloum.dev">
        <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/docs/static/img/bloum_logo.png" height="128" alt="logo">
    </a>
    <h1>Bloum</h1>
    <strong>A powerful library of modern web components</strong>
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

Bloum is an open-source library of web components. The goal of this library is to provide a set of JavaScript components that can be used in any web project, regardless of the framework or library used.
The main use-case for Bloum is to provide easy-to-use components for project using MPA (Multi-Page Application) like Laravel, Django or Rails. It pairs well with server-side rendering and progressive enhancement tools like [HTMX](https://htmx.org/) and [Alpine.js](https://alpinejs.dev/).

## Features

<!-- - 🪶 **Lightweight:** Bloum is a small library. It's less than 10KB minified and gzipped. -->
- 🚀 **Easy to use:** Bloum is designed to be easy to use and integrate in any project.
- 🔍 **Accessible:** Built with accessibility in mind. It's fully keyboard navigable and [ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant.
- 🌓 **Dark mode:** Supports dark mode out of the box.
- 📱 **Responsive:** Works on all modern browsers and devices.
- 📦 **No dependencies:** Does not depend on any other library or framework.
- 🎨 **Theming:** Easy to customize with CSS variables.


[//]: # (- 🧪 **Tested:** End-to-end tests with [Playwright]&#40;https://playwright.dev/&#41; and unit tests with [Vitest]&#40;https://vitejs.dev/guide/features.html#testing&#41;.)

## Installation

### CDN

You can use the following lines in your `head` tag to load the latest version of Bloum from a CDN:

```html
<script src="https://unpkg.com/bloum" defer></script>
<link href="https://unpkg.com/bloum/dist/style.min.css" rel="stylesheet">
```

### Package manager

You can install Bloum using your favorite package manager:

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

Once installed, you can import the library in your JavaScript project:

```js
import "bloum"
```

This will register all the components globally.

After that, you can include the stylesheet in your JavaScript if you're using a bundler like Vite or Webpack:

```js
import "bloum/dist/style.min.css"
```

Then, you can use the components in your HTML.

## Documentation

The documentation is available at [https://www.bloum.dev](https://www.bloum.dev) for more information on how to use the components.

## License

Bloum is [MIT licensed](./LICENSE) &copy; [Gil Balsiger](https://github.com/balsigergil)
