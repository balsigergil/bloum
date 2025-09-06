import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Elements/Menu",
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj;

export const Menu: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-dropdown-toggle>Click to open the menu</button>
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
  <button class="btn" data-dropdown-toggle><i class="fas fa-bars"></i>Click to open the menu</button>
  <div class="menu">
    <a href="#" class="menu-item"><i class="fas fa-file fa-fw"></i> New File</a>
    <a href="#" class="menu-item"><i class="fas fa-folder-open fa-fw"></i> Open...</a>
    <button class="menu-item"><i class="fas fa-floppy-disk fa-fw"></i> Save</button>
    <div class="menu-divider"></div>
    <button class="menu-item"><i class="fas fa-arrow-right-to-bracket fa-fw"></i> Quit</button>
  </div>
</div>
`;
  },
};

export const MenuWithDanger: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-dropdown-toggle>Click to open the menu</button>
  <div class="menu">
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

export const MenuWithCheckbox: Story = {
  render: () => {
    return `
<div class="dropdown">
  <button class="btn" data-dropdown-toggle><i class="fas fa-cog"></i>Features</button>
  <div class="menu">
    <label class="menu-item"><input type="checkbox" class="input-check">Feature 1</label>
    <label class="menu-item"><input type="checkbox" class="input-check">Feature 2</label>
    <div class="menu-divider"></div>
    <label class="menu-item"><input type="checkbox" class="switch">Feature 3</label>
    <label class="menu-item"><input type="checkbox" class="switch">Feature 4</label>
  </div>
</div>
`;
  },
};
