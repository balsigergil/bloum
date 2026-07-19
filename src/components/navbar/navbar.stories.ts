import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Navigation/Navbar",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Navbar: Story = {
  render: () => {
    return `
<nav class="navbar">
  <a class="navbar-brand" href="#">Bloum</a>
  <button class="btn btn-icon btn-ghost navbar-toggle" data-collapse="#navbar-collapse"><i class="fas fa-bars"></i></button>
  <div class="navbar-nav collapsible" id="navbar-collapse">
    <div class="nav-items">
      <div class="nav-item">
        <a class="nav-link active" href="#" aria-current="page">Home</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="#">Page 1</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="#">Page 2</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="#">Page 3</a>
      </div>
      <div class="nav-item dropdown">
        <a class="nav-link hstack gap-2" href="#" data-menu-toggle>
          Dropdown <i class="fas fa-chevron-down"></i>
        </a>
        <div class="menu">
          <div class="menu-group">
            <a class="menu-item" href="#">Action</a>
            <a class="menu-item" href="#">Another action</a>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-group">
            <a class="menu-item" href="#">Something else here</a>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-items">
      <div class="nav-item dropdown">
        <div class="avatar cursor-pointer" data-menu-toggle>
          <span class="avatar-initials">JD</span>
        </div>
        <div class="menu">
          <div class="menu-group">
            <a class="menu-item" href="#">Action</a>
            <a class="menu-item" href="#">Another action</a>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-group">
            <a class="menu-item" href="#">Something else here</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    `;
  },
};
