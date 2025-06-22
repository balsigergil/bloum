import type { Preview, HtmlRenderer } from "@storybook/html";
import { withThemeByClassName } from "@storybook/addon-themes";

import { initBloum } from "../src";

import "@fontsource-variable/nunito-sans";
import "@fortawesome/fontawesome-free/css/all.css";

import "../src/bloum.css";
import "./preview.css";

// Make initBloum available globally for the HTML scripts
// @ts-ignore
window.initBloum = initBloum;

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Documentation",
          [
            "Introduction",
            "Installation",
            "Getting Started",
            "Tokens",
            "Colors",
            "Theming",
          ],
          "Components",
          "*",
        ],
      },
    },
  },
  decorators: [
    withThemeByClassName<HtmlRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
