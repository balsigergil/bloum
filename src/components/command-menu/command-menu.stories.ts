import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Navigation/Command Menu",
};

export default meta;
type Story = StoryObj;

export const CommandMenu: Story = {
  render: () => {
    return `
<button class="btn" data-modal="#my-command-menu">Open command menu</button>
<div class="modal" id="my-command-menu">
  <div class="modal-content command-menu">
    <div class="command-menu-header">
      <i class="fas fa-magnifying-glass command-menu-search-icon"></i>
      <input type="text" class="command-menu-input" placeholder="Search" />
    </div>
    <div class="command-menu-body">
      <h3 class="command-menu-title">Home</h3>
      <ul class="command-menu-list">
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-home"></i> Dashboard
            </div>
            <div class="command-menu-link-description">Link</div>
          </a>
        </li>
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-bars-progress"></i> Projects
            </div>
            <div class="command-menu-link-description">Action</div>
          </a>
        </li>
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-cog"></i> Settings
            </div>
            <div class="command-menu-link-description">Link</div>
          </a>
        </li>
      </ul>
      <h3 class="command-menu-title">Home</h3>
      <ul class="command-menu-list">
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-home"></i> Dashboard
            </div>
            <div class="command-menu-link-description">Link</div>
          </a>
        </li>
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-bars-progress"></i> Projects
            </div>
            <div class="command-menu-link-description">Action</div>
          </a>
        </li>
        <li>
          <a href="#" class="command-menu-item">
            <div class="command-menu-link-label">
              <i class="fas fa-cog"></i> Settings
            </div>
            <div class="command-menu-link-description">Link</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
`;
  },
};
