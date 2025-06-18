import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Textarea",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <textarea class="form-control" rows="4" placeholder="Enter your message..."></textarea>
      </div>
    `;
  },
};

export const WithContent: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <textarea class="form-control" rows="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</textarea>
      </div>
    `;
  },
};

export const DifferentSizes: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <textarea class="form-control" rows="2" placeholder="Small textarea (2 rows)"></textarea>
        <textarea class="form-control" rows="4" placeholder="Medium textarea (4 rows)"></textarea>
        <textarea class="form-control" rows="6" placeholder="Large textarea (6 rows)"></textarea>
      </div>
    `;
  },
};

export const Disabled: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <textarea class="form-control" rows="4" disabled placeholder="This textarea is disabled"></textarea>
      </div>
    `;
  },
};

export const AutogrowTextarea: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <p class="text-sm text-gray-600">This textarea will automatically grow as you type:</p>
        <textarea class="form-control" data-autogrow placeholder="Start typing to see the autogrow effect..."></textarea>
      </div>
    `;
  },
};

export const MultipleAutogrow: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <textarea class="form-control" data-autogrow placeholder="First autogrow textarea"></textarea>
        <textarea class="form-control" data-autogrow placeholder="Second autogrow textarea"></textarea>
        <textarea class="form-control" data-autogrow placeholder="Third autogrow textarea"></textarea>
      </div>
    `;
  },
};
