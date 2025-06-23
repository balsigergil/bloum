import type { Meta, StoryObj } from "@storybook/html-vite";
import { DataTable } from "./datatable";

type DataTableArgs = {
  rows: number;
  searchable: boolean;
  sortable: boolean;
  paginated: boolean;
};

const meta: Meta<DataTableArgs> = {
  title: "Components/Data/Data Table",
  argTypes: {
    rows: {
      control: { type: "number", min: 5, max: 100 },
      description: "Number of rows to generate",
    },
    searchable: {
      control: "boolean",
      description: "Enable search functionality",
    },
    sortable: {
      control: "boolean",
      description: "Enable column sorting",
    },
    paginated: {
      control: "boolean",
      description: "Enable pagination",
    },
  },
  args: {
    rows: 25,
    searchable: true,
    sortable: true,
    paginated: true,
  },
  render: (args) => {
    const container = document.createElement("div");

    // Create table
    const table = document.createElement("table");
    table.className = "table table-hover";
    table.id = `datatable-${Math.random().toString(36).substr(2, 9)}`;

    // Create header
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
      </tr>
    `;
    table.appendChild(thead);

    // Create body with sample data
    const tbody = document.createElement("tbody");
    const departments = [
      "Engineering",
      "Sales",
      "Marketing",
      "HR",
      "Finance",
      "Operations",
    ];
    const firstNames = [
      "John",
      "Jane",
      "Mike",
      "Sarah",
      "David",
      "Emily",
      "Robert",
      "Lisa",
      "James",
      "Mary",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];

    for (let i = 1; i <= args.rows; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department =
        departments[Math.floor(Math.random() * departments.length)];
      const salary = Math.floor(Math.random() * 80000) + 40000;
      const startDate = new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      );

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i}</td>
        <td>${firstName} ${lastName}</td>
        <td>${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com</td>
        <td>${department}</td>
        <td>$${salary.toLocaleString()}</td>
        <td>${startDate.toLocaleDateString()}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    container.appendChild(table);

    // Initialize DataTable after a small delay to ensure DOM is ready
    setTimeout(() => {
      new DataTable(`#${table.id}`);
    }, 0);

    return container;
  },
};

export default meta;
type Story = StoryObj<DataTableArgs>;

export const Default: Story = {};

export const SmallDataset: Story = {
  args: {
    rows: 10,
  },
};

export const LargeDataset: Story = {
  args: {
    rows: 100,
  },
};

export const VeryLargeDataset: Story = {
  tags: ["!autodocs"],
  args: {
    rows: 10000,
  },
};

export const BasicTableExample: Story = {
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <table id="example-table" class="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laptop Pro 15"</td>
            <td>Electronics</td>
            <td>$1,299</td>
            <td>45</td>
            <td>4.5</td>
          </tr>
          <tr>
            <td>Wireless Mouse</td>
            <td>Accessories</td>
            <td>$29</td>
            <td>150</td>
            <td>4.2</td>
          </tr>
          <tr>
            <td>USB-C Hub</td>
            <td>Accessories</td>
            <td>$49</td>
            <td>89</td>
            <td>4.7</td>
          </tr>
          <tr>
            <td>Monitor 27"</td>
            <td>Electronics</td>
            <td>$399</td>
            <td>23</td>
            <td>4.6</td>
          </tr>
          <tr>
            <td>Mechanical Keyboard</td>
            <td>Accessories</td>
            <td>$89</td>
            <td>67</td>
            <td>4.8</td>
          </tr>
          <tr>
            <td>Webcam HD</td>
            <td>Electronics</td>
            <td>$79</td>
            <td>112</td>
            <td>4.1</td>
          </tr>
          <tr>
            <td>Desk Lamp</td>
            <td>Office</td>
            <td>$45</td>
            <td>78</td>
            <td>4.3</td>
          </tr>
          <tr>
            <td>Standing Desk</td>
            <td>Office</td>
            <td>$599</td>
            <td>15</td>
            <td>4.7</td>
          </tr>
          <tr>
            <td>Office Chair</td>
            <td>Office</td>
            <td>$299</td>
            <td>34</td>
            <td>4.4</td>
          </tr>
          <tr>
            <td>Headphones</td>
            <td>Electronics</td>
            <td>$199</td>
            <td>56</td>
            <td>4.6</td>
          </tr>
          <tr>
            <td>Smartphone Stand</td>
            <td>Accessories</td>
            <td>$19</td>
            <td>234</td>
            <td>4.0</td>
          </tr>
          <tr>
            <td>Cable Organizer</td>
            <td>Accessories</td>
            <td>$12</td>
            <td>456</td>
            <td>3.9</td>
          </tr>
        </tbody>
      </table>
    `;

    setTimeout(() => {
      new DataTable("#example-table");
    }, 0);

    return container;
  },
};

export const WithActions: Story = {
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <table id="actions-table" class="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" class="form-check-input" aria-label="Select all">
            </th>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Alice Johnson</td>
            <td>Admin</td>
            <td><span class="tag tag-success">Active</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Bob Smith</td>
            <td>Editor</td>
            <td><span class="tag tag-success">Active</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Charlie Brown</td>
            <td>Viewer</td>
            <td><span class="tag tag-warning">Pending</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Diana Prince</td>
            <td>Editor</td>
            <td><span class="tag tag-error">Inactive</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Ethan Hunt</td>
            <td>Admin</td>
            <td><span class="tag tag-success">Active</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" class="form-check-input" aria-label="Select user"></td>
            <td>Fiona Gallagher</td>
            <td>Viewer</td>
            <td><span class="tag tag-success">Active</span></td>
            <td>
              <button class="btn btn-xs btn-ghost">Edit</button>
              <button class="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    setTimeout(() => {
      new DataTable("#actions-table");
    }, 0);

    return container;
  },
};

export const ApiExample: Story = {
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h3 style="margin-bottom: 0.5rem;">DataTable API Example</h3>
        <p style="margin-bottom: 1rem; color: var(--bl-clr-gray-600);">
          Use the buttons below to interact with the DataTable API
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <button class="btn btn-sm btn-primary" id="search-btn">Set Search Term</button>
          <button class="btn btn-sm btn-primary" id="rows-btn">Set Rows Per Page</button>
          <button class="btn btn-sm btn-primary" id="refresh-btn">Refresh Data</button>
          <button class="btn btn-sm btn-error" id="destroy-btn">Destroy DataTable</button>
        </div>
      </div>
      
      <table id="api-table" class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Apple</td><td>50</td><td>$0.50</td></tr>
          <tr><td>2</td><td>Banana</td><td>30</td><td>$0.30</td></tr>
          <tr><td>3</td><td>Orange</td><td>25</td><td>$0.60</td></tr>
          <tr><td>4</td><td>Grape</td><td>100</td><td>$2.00</td></tr>
          <tr><td>5</td><td>Watermelon</td><td>5</td><td>$5.00</td></tr>
          <tr><td>6</td><td>Strawberry</td><td>40</td><td>$3.00</td></tr>
          <tr><td>7</td><td>Pineapple</td><td>10</td><td>$4.00</td></tr>
          <tr><td>8</td><td>Mango</td><td>15</td><td>$1.50</td></tr>
          <tr><td>9</td><td>Peach</td><td>20</td><td>$1.00</td></tr>
          <tr><td>10</td><td>Pear</td><td>35</td><td>$0.80</td></tr>
          <tr><td>11</td><td>Cherry</td><td>60</td><td>$4.00</td></tr>
          <tr><td>12</td><td>Kiwi</td><td>25</td><td>$1.20</td></tr>
        </tbody>
      </table>
    `;

    setTimeout(() => {
      const dt = new DataTable("#api-table");

      document.getElementById("search-btn")?.addEventListener("click", () => {
        const term = prompt("Enter search term:");
        if (term !== null) {
          dt.setSearchTerm(term);
        }
      });

      document.getElementById("rows-btn")?.addEventListener("click", () => {
        const rows = prompt("Enter rows per page (10, 25, 50, 100):");
        if (rows) {
          dt.setRowsPerPage(parseInt(rows));
        }
      });

      document.getElementById("refresh-btn")?.addEventListener("click", () => {
        // Add a new row for demonstration
        const tbody = document.querySelector("#api-table tbody");
        if (tbody) {
          const newRow = document.createElement("tr");
          const id = tbody.children.length + 1;
          newRow.innerHTML = `<td>${id}</td><td>New Fruit ${id}</td><td>${Math.floor(Math.random() * 100)}</td><td>$${(Math.random() * 5).toFixed(2)}</td>`;
          tbody.appendChild(newRow);
          dt.refresh();
        }
      });

      document.getElementById("destroy-btn")?.addEventListener("click", () => {
        if (confirm("Are you sure you want to destroy the DataTable?")) {
          dt.destroy();
          alert("DataTable destroyed. The table is now a regular HTML table.");
        }
      });
    }, 0);

    return container;
  },
};
