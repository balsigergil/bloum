import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Navigation/Command Menu",
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj;

export const CommandMenu: Story = {
  render: () => {
    return `
<button class="btn" data-modal="#my-command-menu">Open command menu</button>
<div class="modal" id="my-command-menu">
  <div class="modal-content cmd">
    <div class="cmd-search">
      <i class="fas fa-magnifying-glass"></i>
      <input type="text" placeholder="Search" />
    </div>
    <div class="cmd-group">
      <h3 class="cmd-group-title">Home</h3>
      <div class="cmd-list">
        <a href="#" class="cmd-item">
          <div class="cmd-item-left">
            <i class="fas fa-home"></i> Dashboard
          </div>
          <div class="cmd-item-right">Link</div>
        </a>
        <a href="#" class="cmd-item">
          <div class="cmd-item-left">
            <i class="fas fa-bars-progress"></i> Projects
          </div>
          <div class="cmd-item-right">Action</div>
        </a>
        <a href="#" class="cmd-item">
          <div class="cmd-item-left">
            <i class="fas fa-cog"></i> Settings
          </div>
          <div class="cmd-item-right">Link</div>
        </a>
      </div>
    </div>
  </div>
</div>
`;
  },
};
