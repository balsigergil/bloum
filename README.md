<div align="center">
    <a href="https://www.bloum.dev">
        <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/docs/static/img/bloum_logo.png" height="128" alt="logo">
    </a>
    <h1>Bloum</h1>
    <strong>A lightweight yet powerful library of unstyled web components.</strong>
    <br>
    <br>
    <div align="center">
        <a aria-label="Bundlephobia" href="https://bundlephobia.com/package/bloum">
          <img alt="Package size" src="https://img.shields.io/bundlephobia/minzip/bloum?style=for-the-badge">
        </a>
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

- 📖 [Introduction](#introduction)
- 🚀 [Features](#features)
- 📦 [Installation](#installation)
- 💻 [Usage](#usage)
- 📋 [Documentation](#documentation)
- 📝 [Contributing](#contributing)
- ⚖️ [License](#license)

## Introduction

### What is Bloum?

Bloum is an open-source library of unstyled web components. The goal of this library is to provide a set of components that can be used in any web project, regardless of the framework or library used.
It implements the most common components used in web applications that required a lot of JavaScript to work, like select, tabs, modals, etc.

It is unstyled by default, meaning that it doesn't provide an opinionated design. It is up to you to style the components to fit your needs. However, it comes with a theme that you can use to get started quickly.

### Why Bloum?

The goal for this library is not to provide an exhaustive list of components, but rather to provider components that are usually tedious to implement and require a lot of JavaScript to work.

**⚠️ Warning:** It currently doesn't support virtual DOM libraries like React or Vue.

## Features

- 🪶 **Lightweight:** As an *unstyled* library, it comes with minimal CSS for you to style the components as you wish.
- 🔍 **Accessible:** Built with accessibility in mind. It's fully keyboard navigable and [ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant.
- 🌓 **Dark mode:** Supports dark mode out of the box.
- 📱 **Responsive:** Works on all modern browsers and devices.
- 📦 **No dependencies:** Does not depend on any other library or framework.
- 🧪 **Tested:** End-to-end tests with [Playwright](https://playwright.dev/).
- 🎨 **Theming:** Easy to customize and comes with a modern theme to quickly get started.
- 🌈 **Modern:** Built with the [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) API.
- 🤹 **Versatile:** Can be used with any non-(virtual DOM) client-side library like [Svelte](https://svelte.dev/), [Alpine.js](https://alpinejs.dev/) or [HTMX](https://htmx.org/) and can be integrated with [Tailwind CSS](https://tailwindcss.com/) or [Bootstrap](https://getbootstrap.com/).

**Components:**

- [x] [Select](https://www.bloum.dev/docs/components/select)
- [x] [Modal](https://www.bloum.dev/docs/components/modal)
- [x] [Alert dialog](https://www.bloum.dev/docs/components/alert)
- [x] [Tabs](https://www.bloum.dev/docs/components/tabs)
- [x] [Toast](https://www.bloum.dev/docs/components/toast)
- [x] [Accordion / Collapse](https://www.bloum.dev/docs/components/accordion)
- [ ] DatePicker / TimePicker / Calendar
- [ ] Stepper / Wizard
- [ ] Popover
- [ ] Tooltip
- [ ] DataTable
- [ ] Command menu (like [⌘K](https://github.com/pacocoursey/cmdk/))
- [ ] Phone input
- [ ] Switch
- [ ] Color picker

## Installation

### CDN

You can use the following lines in your `head` tag to load the latest version of Bloum from a CDN:

```html
<script src="https://unpkg.com/bloum" defer></script>

<!-- include the default unstyled stylesheet -->
<link href="https://unpkg.com/bloum/dist/style.min.css" rel="stylesheet">
<!-- include the modern theme -->
<link href="https://unpkg.com/bloum/dist/modern.min.css" rel="stylesheet">
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

After that, you can include the default unstyled stylesheet in your JavaScript if you're using a bundler like Vite or Webpack:

```js
import "bloum/dist/style.min.css"
```

If you want to use an already styled theme, you can include it too:

```js
import "bloum/dist/modern.min.css"
```

Then, you can use the components in your HTML:

```html
<bl-select name="my-select">
  <div data-value="1">Option 1</div>
  <div data-value="2">Option 2</div>
  <div data-value="3">Option 3</div>
</bl-select>
```

## Documentation

The documentation is available at [https://www.bloum.dev](https://www.bloum.dev).

## Contributing

*TODO*

## License

Bloum is [MIT licensed](./LICENSE) &copy; [Gil Balsiger](https://github.com/balsigergil)
