import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Sidebar",
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return `
<div class="app">
  <div class="topbar">
    <a href="#" class="topbar-brand">
      <img src="https://placehold.co/150x50" alt="Logo" />
    </a>
    <button class="btn btn-icon btn-ghost" data-sidebar="#my-sidebar">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
  <aside class="sidebar" id="my-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <a href="#">
            <img src="https://placehold.co/150x50" alt="Logo" />
          </a>
        </div>
        <div class="mx-4 input-group">
          <span class="input-group-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="search" class="form-control" placeholder="Search...">
        </div>
        <div>
          <h3 class="sidebar-group-title">Dashboard</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-item active">
              <a href="#">
                <i class="fa-solid fa-home fa-fw"></i>
                Home
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-bars-progress fa-fw"></i>
                Projects
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-list-check fa-fw"></i>
                Tasks
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-users fa-fw"></i>
                Users
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="sidebar-group-title">Administration</h3>
          <ul class="sidebar-nav">
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-dollar fa-fw"></i>
                Finance
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-file fa-fw"></i>
                Reports
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#">
                <i class="fa-solid fa-wrench fa-fw"></i>
                Parameters
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="sidebar-bottom">
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#">
              <i class="fa-solid fa-circle-question fa-fw"></i>
              Help
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#">
              <i class="fa-solid fa-cog fa-fw"></i>
              Settings
            </a>
          </li>
        </ul>
        <div class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img src="https://via.placeholder.com/40x40" alt="Avatar" class="rounded-full" />
            <div class="text-sm">
              <div class="font-semibold">John Doe</div>
              <div class="text-gray-600">Administrator</div>
            </div>
          </div>
          <button class="btn btn-icon btn-ghost btn-sm">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
    </div>
  </aside>
  <main class="main space-y-4">
    <h1 class="font-semibold text-3xl">Content</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      consectetur, nunc in dignissim ultrices, felis tortor lacinia
      nunc, ac ultricies nunc nunc at odio. Donec eget nunc in
      tellus
    </p>
  </main>
</div>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Sidebar: Story = {};
