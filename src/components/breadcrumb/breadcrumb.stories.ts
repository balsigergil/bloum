import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Breadcrumb",
};

export default meta;
type Story = StoryObj;

export const Breadcrumb: Story = {
  render: () => {
    return `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>`;
  },
};

export const BreadcrumbWithIcons: Story = {
  render: () => {
    return `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i>Home</a></li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item"><a href="#"><i class="fas fa-book"></i>Library</a></li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item active" aria-current="page"><i class="fas fa-database"></i>Data</li>
  </ol>
</nav>`;
  },
};

export const BreadcrumbWithMenu: Story = {
  render: () => {
    return `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item">
      <div class="dropdown">
        <button data-menu="#menu" class="flex items-center gap-2">Library<i class="fas fa-angle-down text-xs"></i></button>
        <div class="menu" id="menu">
          <a href="#" class="menu-item">New File</a>
          <a href="#" class="menu-item">Open File...</a>
          <button class="menu-item">Save</button>
          <div class="menu-divider"></div>
          <button class="menu-item">Close</button>
        </div>
      </div>
    </li>
    <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
    <li class="breadcrumb-item active" aria-current="page"><i class="fas fa-database"></i>Data</li>
  </ol>
</nav>`;
  },
};
