import { Meta, StoryObj } from "@storybook/html-vite";

type TooltipArgs = {
  text: string;
};

const meta: Meta<TooltipArgs> = {
  title: "Components/Overlays/Tooltip",
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

export const LongTooltip: Story = {
  args: {
    text: "This is a longer tooltip text to test the tooltip component's behavior with longer content. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};
