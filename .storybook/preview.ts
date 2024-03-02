import type { Preview } from "@storybook/html";

import "./preview.css";
import "../src/index";
import "../src/style.css";
import "../src/modern.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
