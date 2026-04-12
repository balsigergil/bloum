import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Layout/Card",
};

export default meta;
type Story = StoryObj;

export const Card: Story = {
  render: () => {
    return `
      <div class="card max-w-lg">
        <div class="card-header">
          <div class="card-actions">
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Add user">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Settings">
              <i class="fas fa-cog"></i>
            </button>
          </div>
          <h3 class="card-title">List of users</h3>
          <div class="card-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis deleniti dolores doloribus eius facere.</div>
        </div>
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
        </div>
        <div class="card-footer grid grid-cols-2">
          <button class="btn btn-primary">Action 1</button>
          <button class="btn btn-outline">Action 2</button>
        </div>
      </div>
    `;
  },
};

export const CardOnlyBody: Story = {
  render: () => {
    return `
      <div class="card max-w-lg">
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa cumque ea ex exercitationem neque nulla perferendis porro rerum totam, veniam voluptates voluptatibus. Dolor dolorum iusto nemo provident quis!
        </div>
      </div>
    `;
  },
};

export const CardOnlyHeader: Story = {
  render: () => {
    return `
      <div class="card max-w-lg">
        <div class="card-header">
          <div class="card-actions">
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Add user">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Settings">
              <i class="fas fa-cog"></i>
            </button>
          </div>
          <h3 class="card-title">List of users</h3>
          <div class="card-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis deleniti dolores doloribus eius facere.</div>
        </div>
      </div>
    `;
  },
};

export const CardWithImage: Story = {
  render: () => {
    return `
      <div class="card" style="max-width: 350px">
        <img src="https://picsum.photos/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <div class="card-actions">
            <span class="tag">Featured</span>
          </div>
          <h3 class="card-title">List of users</h3>
          <div class="card-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, at, commodi ducimus eveniet fugit in, iste mollitia neque nulla obcaecati provident quibusdam repellat sit tempore tenetur ut voluptatem. Provident, quisquam!</div>
        </div>
        <div class="card-footer justify-end">
          <button class="btn btn-outline">Cancel</button>
          <button class="btn btn-primary">Save</button>
        </div>
      </div>
      `;
  },
};
export const CardWithTable: Story = {
  render: () => {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">List of users</h3>
          <div class="card-actions">
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Add user">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-sm btn-icon btn-ghost" aria-label="Settings">
              <i class="fas fa-cog"></i>
            </button>
          </div>
        </div>
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
      `;
  },
};
