import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Components/Menu",
};

export default meta;
type Story = StoryObj;

export const Menu: Story = {
  render: () => {
    return `<div class="menu">
  <div class="menu-item">New File</div>
  <a href="#" class="menu-item">Open File...</a>
  <button type="submit" class="menu-item">Save</button>
  <div class="menu-divider"></div>
  <div class="menu-item">Close</div>
</div>`;
  },
};
