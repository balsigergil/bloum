import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Navigation/Sidebar",
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return `
<div class="app">
  <header class="topbar">
    <button class="btn btn-icon btn-ghost md:hidden" data-sidebar="#collapsible-sidebar">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="w-[1px] h-full border-l border-[var(--bl-border-color)] md:hidden"></div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item breadcrumb-separator"><i class="fas fa-angle-right"></i></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
  </header>
  <aside class="sidebar" id="my-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <a href="#">
            <img src="https://placehold.co/150x50" alt="Logo" />
          </a>
        </div>
        <div class="mx-4 py-4">
          <div class="input-icon">
            <div class="input-icon-addon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="search" class="input" placeholder="Search...">
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
  <main class="main p-4 space-y-4">
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
  <aside class="sidebar" id="collapsible-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <a href="#">
            <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo_light.png" class="dark:hidden" alt="Bloum Logo" width="200" />
            <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo.png" class="hidden dark:block" alt="Bloum Logo" width="200" />
          </a>
        </div>
        <div class="mx-4">
          <div class="input-icon">
            <span class="input-icon-addon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="search" class="input" placeholder="Search...">
          </div>
        </div>
        <h3 class="sidebar-group-title mt-2">Dashboard</h3>
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
            <div>
              <div class="font-semibold">John Doe</div>
              <div class="text-light dark:text-gray-400">Administrator</div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-icon btn-ghost btn-sm" data-dropdown-toggle>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="menu">
              <a href="#" class="menu-item"><i class="fas fa-fw fa-user"></i>Profile</a>
              <a href="#" class="menu-item"><i class="fas fa-fw fa-cog"></i>Settings</a>
              <div class="menu-divider"></div>
              <button class="menu-item"><i class="fas fa-fw fa-right-from-bracket"></i>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <header class="topbar">
    <button class="btn btn-icon btn-ghost btn-sidebar-toggle" data-sidebar="#collapsible-sidebar">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="topbar-center">
      <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo_light.png" class="dark:hidden" alt="Bloum Logo" width="150" />
      <img src="https://raw.githubusercontent.com/balsigergil/bloum/main/.github/bloum_logo.png" class="hidden" alt="Bloum Logo" width="150" />
    </div>
  </header>
  <main class="main p-4">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-light uppercase tracking-wider text-sm font-medium">Overview</h2>
        <h1 class="font-semibold text-2xl">Sidebar with Collapsible Menu Items</h1>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline">Add view</button>
        <button class="btn btn-primary" data-modal="#form-modal">
          <i class="fas fa-user-plus"></i>Add new member
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card col-span-2">
        <div class="card-header">
          <h3 class="card-title">Collapsible Sidebar Demo</h3>
        </div>
        <div class="card-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate, dolorum eius eligendi ipsam natus saepe? Ab cumque distinctio eaque eius fugiat ipsa provident quisquam veniam! Eos error odit ratione.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate, dolorum eius eligendi ipsam natus saepe? Ab cumque distinctio eaque eius fugiat ipsa provident quisquam veniam! Eos error odit ratione.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate, dolorum eius eligendi ipsam natus saepe? Ab cumque distinctio eaque eius fugiat ipsa provident quisquam veniam! Eos error odit ratione.</p>
        </div>
      </div>
      <div class="card col-span-2">
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
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" class="input-check" aria-label="Select user" />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" class="input-check" aria-label="Select user" />
                </td>
                <td>Facteur Hyacinthe</td>
                <td>john.doe@example.com</td>
                <td>Admin</td>
                <td>
                  <button class="btn btn-icon btn-xs btn-ghost" aria-label="Edit user">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn btn-icon btn-xs btn-danger" aria-label="Delete user">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" class="input-check" aria-label="Select user" />
                </td>
                <td>Albert le Vert</td>
                <td>john.doe@example.com</td>
                <td>Admin</td>
                <td>
                  <button class="btn btn-icon btn-xs btn-ghost" aria-label="Edit user">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn btn-icon btn-xs btn-danger" aria-label="Delete user">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" class="input-check" aria-label="Select user" />
                </td>
                <td>Mademoiselle Cassis</td>
                <td>john.doe@example.com</td>
                <td>Admin</td>
                <td>
                  <button class="btn btn-icon btn-xs btn-ghost" aria-label="Edit user">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn btn-icon btn-xs btn-danger" aria-label="Delete user">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5">Total: 1 user</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h3 class="text-light text-sm uppercase tracking-wide">Sales</h3>
            <div class="dropdown">
              <a href="#" class="text-light" data-dropdown-toggle>Last 7 days <i class="fas fa-chevron-down"></i></a>
              <div class="menu">
                <button class="menu-item">Last 7 days</button>
                <button class="menu-item">Last month</button>
                <button class="menu-item">Last year</button>
              </div>
            </div>
          </div>
          <h3 class="font-semibold text-3xl">75%</h3>
          <p class="mt-4">This sidebar demonstrates collapsible menu items. Try clicking on "User Management" or "Finance" to see the submenu expand and collapse.</p>
        </div>
      </div>
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
    </div>

    <div class="modal" id="form-modal" aria-labelledby="form-modal-title">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <h3 class="modal-title" id="form-modal-title">Create New User</h3>
          <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form id="user-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="field">
                <label for="first-name" class="label">First Name</label>
                <input type="text" id="first-name" name="firstName" class="input" placeholder="John" required>
              </div>
              <div class="field">
                <label for="last-name" class="label">Last Name</label>
                <input type="text" id="last-name" name="lastName" class="input" placeholder="Doe" required>
              </div>
            </div>

            <div class="field">
              <label for="user-email" class="label">Email Address</label>
              <input type="email" id="user-email" name="email" class="input" placeholder="john.doe@example.com" required>
            </div>

            <div class="field">
              <label for="user-role" class="label">Role</label>
              <select id="user-role" name="role" class="input" required>
                <option value="">Select a role</option>
                <option value="admin">Administrator</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <div class="field">
              <label for="user-bio" class="label">Bio</label>
              <textarea id="user-bio" name="bio" class="input" rows="3" placeholder="Tell us about yourself..."></textarea>
            </div>

            <div class="field">
              <div class="field">
                <input type="checkbox" class="input-check" id="notifications" name="notifications" checked>
                <label class="label" for="notifications">Send welcome email</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" data-modal-close>Cancel</button>
          <button type="submit" form="user-form" class="btn btn-primary">Create User</button>
        </div>
      </div>
    </div>

  </main>
</div>`;
  },
};
