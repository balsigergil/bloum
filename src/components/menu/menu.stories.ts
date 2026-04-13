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
  <button class="btn btn-outline" data-dropdown-toggle>Options</button>
  <div class="menu" id="menu">
    <div class="menu-group">
      <div class="menu-label">My Account</div>
      <a href="#" class="menu-item">
        <i class="fas fa-user fa-fw"></i>
        Profile
        <span class="menu-shortcut">⇧⌘P</span>
      </a>
      <a href="#" class="menu-item">
        <i class="fas fa-credit-card fa-fw"></i>
        Billing
        <span class="menu-shortcut">⌘B</span>
      </a>
      <a href="#" class="menu-item">
        <i class="fas fa-cog fa-fw"></i>
        Settings
        <span class="menu-shortcut">⌘S</span>
      </a>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-group">
      <button type="button" class="menu-item">
        <i class="fas fa-users fa-fw"></i>
        Team
      </button>
      <div class="menu-item">
        <i class="fas fa-user-plus fa-fw"></i>
        Invite users
        <i class="fas fa-chevron-right ml-auto"></i>
        <div class="submenu">
          <div class="menu-group">
            <a href="#" class="menu-item">Email</a>
            <a href="#" class="menu-item">Slack</a>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-group">
            <div class="menu-item">
              More...
              <i class="fas fa-chevron-right ml-auto"></i>
              <div class="submenu">
                <div class="menu-group">
                  <a href="#" class="menu-item">Email</a>
                  <a href="#" class="menu-item">Slack</a>
                  <a href="#" class="menu-item">Phone</a>
                  <a href="#" class="menu-item">Pigeon</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="menu-item" href="#">
        New Team
        <span class="menu-shortcut">⌘T</span>
      </a>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-group">
      <a class="menu-item" href="#">GitHub</a>
      <a class="menu-item" href="#" disabled>API</a>
      <a class="menu-item" href="#">Support</a>
    </div>
  </div>
</div>
`;
  },
};

export const MenuWithIcons: Story = {
  render: () => {
    return `
<div class="dropdown ml-32">
  <button class="btn" data-dropdown-toggle><i class="fas fa-bars"></i> Options</button>
  <div class="menu">
    <a href="#" class="menu-item"><i class="fas fa-file fa-fw"></i> New File</a>
    <a href="#" class="menu-item"><i class="fas fa-folder-open fa-fw"></i> Open...</a>
    <button class="menu-item"><i class="fas fa-floppy-disk fa-fw"></i> Save</button>
    <button class="menu-item"><i class="fas fa-exclamation-triangle fa-fw"></i> This is an example with a name that is quite long but is still readable.</button>
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
