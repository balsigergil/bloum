import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Color Scheme Switcher",
  render: () => {
    return `
<button class="btn btn-icon color-scheme-switcher">
  <div class="scheme-dark">
    <i class="fas fa-moon"></i>
  </div>
  <div class="scheme-light">
    <i class="fas fa-sun"></i>
  </div>
  <div class="scheme-system">
    <i class="fas fa-circle-half-stroke"></i>
  </div>
</button>`;
  },
};

export default meta;
type Story = StoryObj;

export const ColorSchemeSwitcher: Story = {};
