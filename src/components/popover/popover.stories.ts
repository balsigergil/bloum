import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Overlays/Popover",
};

export default meta;
type Story = StoryObj;

export const Popover: Story = {
  render: () => {
    return `
<button class="btn" data-popover="#my-popover">Click me</button>
<div class="popover" id="my-popover">
  <p class="font-bold mb-4">Set the dimensions for the layer.</p>
  <div class="grid grid-cols-2 gap-4">
    <label class="label">Width</label>
    <input class="input">
    <label class="label">Max. width</label>
    <input class="input">
    <label class="label">Height</label>
    <input class="input">
  </div>
</div>
`;
  },
};
