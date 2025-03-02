import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Components/Menu",
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj;

export const Menu: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-menu="#menu">Click to open the menu</button>
  <div class="menu" id="menu">
    <a href="#" class="menu-item">New File</a>
    <a href="#" class="menu-item">Open File...</a>
    <button class="menu-item">Save</button>
    <div class="menu-divider"></div>
    <button class="menu-item">Close</button>
  </div>
</div>
`;
  },
};

export const MenuWithIcons: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-menu="#menu">Click to open the menu</button>
  <div class="menu" id="menu">
    <a href="#" class="menu-item">New File</a>
    <a href="#" class="menu-item">Open File...</a>
    <button class="menu-item">Save</button>
    <div class="menu-divider"></div>
    <button class="menu-item">Close</button>
  </div>
</div>
`;
  },
};

export const MenuWithDanger: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-menu="#menu">Click to open the menu</button>
  <div class="menu" id="menu">
    <a href="#" class="menu-item">New File</a>
    <a href="#" class="menu-item">Open File...</a>
    <button class="menu-item">Save</button>
    <div class="menu-divider"></div>
    <button class="menu-item menu-item-danger">Delete</button>
  </div>
</div>
`;
  },
};
