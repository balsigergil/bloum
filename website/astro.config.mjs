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
