import type { Preview, HtmlRenderer } from "@storybook/html";
import { withThemeByClassName } from "@storybook/addon-themes";

import { initBloum } from "../src";
import "../src/bloum.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./preview.css";

initBloum();

const preview: Preview = {
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
          ["Introduction", "Customization", "Tokens"],
          "Components",
          "*",
        ],
      },
    },
  },
  tags: ["autodocs"],
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
