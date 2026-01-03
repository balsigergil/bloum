---
title: Tailwind CSS Integration
description: How to use Bloum with Tailwind CSS
---

Bloum is designed to work seamlessly with Tailwind CSS. Bloum provides the components as building blocks to make your UI, while Tailwind provides utility classes to glue everything together.

## Installation

Integrating Tailwind requires no specific configuration for Bloum. You can simply follow the official setup instructions from the Tailwind team:

[**Install Tailwind CSS**](https://tailwindcss.com/docs/installation)

## Customizing Colors

Bloum uses the default Tailwind color palette out of the box. If you are using the default Tailwind configuration, no further action is needed.

However, if you have defined **custom colors** in your `tailwind.config.js`, you will likely want Bloum's components to reflect those changes. Bloum uses semantic CSS variables (e.g., `--bl-clr-primary-500`) which you can override to match your custom theme.

To use your custom Tailwind colors, simply map the Bloum variables to your desired values in your CSS.

### Example: Using the Indigo Color from Tailwind

For example, if you want your **Primary** color to be `indigo` (or a custom color) instead of the default `blue`:

```css
:root {
  --bl-clr-primary-50: var(--color-indigo-50);
  --bl-clr-primary-100: var(--color-indigo-100);
  --bl-clr-primary-200: var(--color-indigo-200);
  --bl-clr-primary-300: var(--color-indigo-300);
  --bl-clr-primary-400: var(--color-indigo-400);
  --bl-clr-primary-500: var(--color-indigo-500);
  --bl-clr-primary-600: var(--color-indigo-600);
  --bl-clr-primary-700: var(--color-indigo-700);
  --bl-clr-primary-800: var(--color-indigo-800);
  --bl-clr-primary-900: var(--color-indigo-900);
  --bl-clr-primary-950: var(--color-indigo-950);
}
```
