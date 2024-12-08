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
