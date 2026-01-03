---
title: Getting Started
description: Introduction to Bloum
---

Welcome to **Bloum**, a modern web components library designed to help you build beautiful, accessible user interfaces with ease.

## What is Bloum?

Bloum is an open-source library of web components. The goal of this library is to provide a set of CSS and JavaScript components that can be used in any web project, regardless of the framework or library used.

The main use-case for Bloum is to provide easy-to-use components for projects using MPA (Multi-Page Application) architectures like Laravel, Django, or Rails. It pairs particularly well with server-side rendering and progressive enhancement tools like [HTMX](https://htmx.org/) and [Alpine.js](https://alpinejs.dev/).

### Key Features

- 🚀 **Feature-rich:** A wide range of components to build modern web apps or design systems.
- 🪶 **Lightweight:** Less than 30KB minified and gzipped.
- 🔍 **Accessible:** Built with accessibility in mind, fully keyboard-navigable and [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant.
- 🌓 **Dark mode:** Supports dark mode out of the box.
- 📱 **Responsive:** Works on all modern browsers and devices.
- 📦 **Single package:** Everything is bundled in a single package for easy setup.
- 🎨 **Theming:** Easy to customize with CSS variables.

## Installation

You can install Bloum via a CDN for quick prototyping or via a package manager for production.

### CDN

The fastest way to get started is using a CDN. Add the following lines to your HTML `<head>` tag:

```html
<!-- Bloum CSS -->
<link href="https://unpkg.com/bloum/dist/bloum.min.css" rel="stylesheet" />

<!-- Bloum JavaScript -->
<script src="https://unpkg.com/bloum" defer></script>
```

> **Note:** For production, it is recommended to use a specific version to avoid unexpected breaking changes:
>
> ```html
> <link
>   href="https://unpkg.com/bloum@0.0.1/dist/bloum.min.css"
>   rel="stylesheet"
> />
> <script src="https://unpkg.com/bloum@0.0.1" defer></script>
> ```
>
> _(Replace `0.0.1` with the latest version)_

### Package Manager

For modern JavaScript projects using build tools, install Bloum using your favorite package manager:

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

If you installed Bloum via a package manager, you need to import the styles and initialize the library in your application's entry point.

### 1. Import Styles

Include the stylesheet in your JavaScript file (if using a bundler like Vite or Webpack):

```js
import "bloum/dist/bloum.min.css";
```

### 2. Initialize Bloum

Import the `init` function and call it to register all components globally:

```js
import { init } from "bloum";

init();
```

### 3. Use Components

Now you can use the components in your HTML. Here is a simple example to verify your installation:

```html
<button class="btn btn-primary">Hello Bloum!</button>
```

If you see a styled button, congratulations! You are ready to build.

## Next Steps

Now that you have Bloum installed, you can explore:

- **[Components](/components):** Browse the full list of available components.
- **[Design Tokens](/design-tokens):** Learn how to customize the design system using CSS variables.
