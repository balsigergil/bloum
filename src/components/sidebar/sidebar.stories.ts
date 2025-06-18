import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Sidebar",
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
        <div class="mx-4 py-4">
          <div class="input-group">
            <div class="input-group-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="search" class="form-control" placeholder="Search...">
          </div>
        </div>
        <h3 class="sidebar-group-title">Dashboard</h3>
        <ul class="sidebar-nav">
          <li class="sidebar-item active">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-home fa-fw"></i>
              Home
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-bars-progress fa-fw"></i>
              Projects
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-list-check fa-fw"></i>
              Tasks
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-users fa-fw"></i>
              Users
            </a>
          </li>
        </ul>
        <h3 class="sidebar-group-title">Administration</h3>
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-dollar fa-fw"></i>
              Finance
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-file fa-fw"></i>
              Reports
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-wrench fa-fw"></i>
              Parameters
            </a>
          </li>
        </ul>
      </div>
      <div class="sidebar-bottom">
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-circle-question fa-fw"></i>
              Help
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-cog fa-fw"></i>
              Settings
            </a>
          </li>
           <li class="sidebar-item">
             <form action="" method="post">
               <button class="sidebar-link" type="submit">
                 <i class="fa-solid fa-sign-out fa-fw"></i>
                 Logout
               </button>
             </form>
           </li>
        </ul>
        <div class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-gray-500 text-white size-10 grid place-items-center font-semibold">GB</div>
            <div class="text-sm">
              <div class="font-semibold">John Doe</div>
              <div class="text-gray-600 dark:text-gray-400">Administrator</div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-icon btn-ghost btn-sm" data-menu="#my-menu">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="menu" id="my-menu">
              <a href="#" class="menu-item"><i class="fas fa-fw fa-user"></i>Profile</a>
              <a href="#" class="menu-item"><i class="fas fa-fw fa-cog"></i>Settings</a>
              <div class="menu-divider"></div>
              <form action="" method="post">
                <button class="menu-item"><i class="fas fa-fw fa-right-from-bracket"></i>Logout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <main class="p-4 space-y-4">
    <h1 class="font-semibold text-3xl text-gray-700 dark:text-gray-300">Content</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of users</h3>
            <div class="card-actions">
              <button class="btn btn-icon btn-ghost" aria-label="Add user">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-icon btn-ghost" aria-label="Settings">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
          </div>
        </div>
      </div>
  </main>
</div>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Sidebar: Story = {};

export const WithCollapsible: Story = {
  render: () => {
    return `
<div class="app">
  <div class="topbar">
    <a href="#" class="topbar-brand">
      <img src="https://placehold.co/150x50" alt="Logo" />
    </a>
    <button class="btn btn-icon btn-ghost" data-sidebar="#collapsible-sidebar">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
  <aside class="sidebar" id="collapsible-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <a href="#">
            <img src="https://placehold.co/150x50" alt="Logo" />
          </a>
        </div>
        <div class="mx-4 py-4">
          <div class="input-group">
            <div class="input-group-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="search" class="form-control" placeholder="Search...">
          </div>
        </div>
        <h3 class="sidebar-group-title">Dashboard</h3>
        <ul class="sidebar-nav">
          <li class="sidebar-item active">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-home fa-fw"></i>
              Home
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-bars-progress fa-fw"></i>
              Projects
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-list-check fa-fw"></i>
              Tasks
            </a>
          </li>
          <!-- Collapsible User Management Section -->
          <li class="sidebar-item">
            <button 
              class="sidebar-link sidebar-collapsible-trigger" 
              data-collapse="#users-menu"
              aria-expanded="false"
            >
              <i class="fa-solid fa-users fa-fw"></i>
              User Management
            </button>
            <div id="users-menu" class="collapsible sidebar-collapsible-content">
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-users-line fa-fw"></i>
                  All Users
                </a>
              </div>
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-user-shield fa-fw"></i>
                  User Roles
                </a>
              </div>
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-key fa-fw"></i>
                  Permissions
                </a>
              </div>
            </div>
          </li>
        </ul>
        <h3 class="sidebar-group-title">Administration</h3>
        <ul class="sidebar-nav">
          <!-- Collapsible Finance Section -->
          <li class="sidebar-item">
            <button 
              class="sidebar-collapsible-trigger sidebar-link" 
              data-collapse="#finance-menu"
              aria-expanded="false"
            >
              <i class="fa-solid fa-dollar fa-fw"></i>
              Finance
            </button>
            <div id="finance-menu" class="collapsible sidebar-collapsible-content">
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-chart-line fa-fw"></i>
                  Revenue
                </a>
              </div>
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-credit-card fa-fw"></i>
                  Expenses
                </a>
              </div>
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-file-invoice fa-fw"></i>
                  Invoices
                </a>
              </div>
              <div class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fa-solid fa-calculator fa-fw"></i>
                  Budgets
                </a>
              </div>
            </div>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-file fa-fw"></i>
              Reports
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-wrench fa-fw"></i>
              Parameters
            </a>
          </li>
        </ul>
      </div>
      <div class="sidebar-bottom">
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-circle-question fa-fw"></i>
              Help
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-cog fa-fw"></i>
              Settings
            </a>
          </li>
           <li class="sidebar-item">
             <form action="" method="post">
               <button class="sidebar-link" type="submit">
                 <i class="fa-solid fa-sign-out fa-fw"></i>
                 Logout
               </button>
             </form>
           </li>
        </ul>
        <div class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-gray-500 text-white size-10 grid place-items-center font-semibold">GB</div>
            <div class="text-sm">
              <div class="font-semibold">John Doe</div>
              <div class="text-gray-600 dark:text-gray-400">Administrator</div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-icon btn-ghost btn-sm" data-menu="#collapsible-menu">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="menu" id="collapsible-menu">
              <a href="#" class="menu-item"><i class="fas fa-fw fa-user"></i>Profile</a>
              <a href="#" class="menu-item"><i class="fas fa-fw fa-cog"></i>Settings</a>
              <div class="menu-divider"></div>
              <form action="" method="post">
                <button class="menu-item"><i class="fas fa-fw fa-right-from-bracket"></i>Logout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <main class="p-4 space-y-4">
    <h1 class="font-semibold text-3xl text-gray-700 dark:text-gray-300">Sidebar with Collapsible Menu Items</h1>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Collapsible Sidebar Demo</h3>
      </div>
      <div class="card-body">
        <p>This sidebar demonstrates collapsible menu items. Try clicking on "User Management" or "Finance" to see the submenu expand and collapse.</p>
        <ul class="list-disc list-inside mt-4 space-y-2">
          <li>Click the chevron icon to expand/collapse sections</li>
          <li>Nested items are indented and styled differently</li>
          <li>Uses your existing collapse component functionality</li>
          <li>Maintains accessibility with proper ARIA attributes</li>
        </ul>
      </div>
    </div>
  </main>
</div>`;
  },
};
