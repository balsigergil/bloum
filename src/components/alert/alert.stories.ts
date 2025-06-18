import type { Meta, StoryObj } from "@storybook/html-vite";

type AlertArgs = {
  color: string;
};

const meta: Meta<AlertArgs> = {
  title: "Components/Alert",
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "error", "success", "warning"],
    },
  },
  render: (args) => {
    return `
<div class="alert${args.color !== `default` ? ` alert-${args.color}` : ``}">
  <div class="alert-icon">
    <i class="fas fa-info-circle"></i>
  </div>
  <div class="alert-content">
    <div class="alert-title">Alert Title</div>
    <div class="alert-text">This is an alert message.</div>
  </div>
</div>`;
  },
};

export default meta;
type Story = StoryObj<AlertArgs>;

export const Alert: Story = {
  args: {
    color: "default",
  },
};

export const SimpleAlert: Story = {
  args: {
    ...Alert.args,
  },
  render: (args) => {
    return `
<div class="alert${args.color !== `default` ? ` alert-${args.color}` : ``}">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores earum fugiat laborum nisi perferendis quibusdam. Consequuntur, delectus error est illum incidunt ipsam, laudantium nesciunt optio recusandae sapiente suscipit veniam vero!
</div>`;
  },
};
