import type { Meta, StoryObj } from "@storybook/html-vite";

type TableArgs = {
  striped: boolean;
  hover: boolean;
  compact: boolean;
};

const meta: Meta<TableArgs> = {
  title: "Components/Data/Table",
  render: (args) => {
    const container = document.createElement("div");
    container.classList.add("table-responsive");

    const table = document.createElement("table");
    table.classList.add("table");
    container.appendChild(table);

    if (args.striped) {
      table.classList.add("table-striped");
    }

    if (args.hover) {
      table.classList.add("table-hover");
    }

    if (args.compact) {
      table.classList.add("table-compact");
    }

    table.innerHTML = `
      <thead>
        <tr>
          <th>
            <input type="checkbox" class="input-check" aria-label="Select user" />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
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
          <td colspan="5">Total: 3 users</td>
        </tr>
      </tfoot>
      `;
    return container;
  },
};

export default meta;
type Story = StoryObj<TableArgs>;

export const Table: Story = {
  args: {
    striped: false,
    hover: false,
  },
};

export const TableStriped: Story = {
  args: {
    ...Table.args,
    striped: true,
  },
};

export const TableHover: Story = {
  args: {
    ...Table.args,
    hover: true,
  },
};

export const TableCompact: Story = {
  args: {
    ...Table.args,
    compact: true,
  },
};
