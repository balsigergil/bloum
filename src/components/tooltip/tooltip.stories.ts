import { Meta, StoryObj } from "@storybook/html-vite";

type TooltipArgs = {
  text: string;
};

const meta: Meta<TooltipArgs> = {
  title: "Components/Tooltip",
  render: (args) => {
    return `<button class="btn btn-primary" data-tooltip="${args.text}">Hover me</button>`;
  },
};

export default meta;
type Story = StoryObj<TooltipArgs>;

export const Tooltip: Story = {
  args: {
    text: "Hello World!",
  },
};
