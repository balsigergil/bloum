import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Card",
  render: () => {
    return `
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
      `;
  },
};

export default meta;
type Story = StoryObj;

export const Card: Story = {};

export const CardWithTable: Story = {
  render: () => {
    return `
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
        <table class="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select user" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" aria-label="Select user" />
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
                <input type="checkbox" aria-label="Select user" />
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
                <input type="checkbox" aria-label="Select user" />
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
<!--          <tfoot>-->
<!--            <tr>-->
<!--              <td colspan="5">Total: 1 user</td>-->
<!--            </tr>-->
<!--          </tfoot>-->
        </table>
      </div>
      `;
  },
};
