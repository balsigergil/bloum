// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "Bloum",
      description: "A powerful library of modern web components for your design system.",
      logo: {
        replacesTitle: true,
        dark: "./src/assets/logo_dark.png",
        light: "./src/assets/logo.png",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            "introduction",
            "getting-started",
            "design-tokens",
            "tailwindcss",
          ],
        },
        {
          label: "Components",
          autogenerate: {
            directory: "components",
          },
        },
      ],
    }),
  ],
});
