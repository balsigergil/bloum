import { Meta, StoryObj } from "@storybook/html-vite";

type TooltipArgs = {
  text: string;
  delay?: number;
};

const meta: Meta<TooltipArgs> = {
  title: "Components/Overlays/Tooltip",
  argTypes: {
    delay: {
      control: "number",
      description: "`data-tooltip-delay` in ms (default 300)",
    },
  },
  render: (args) => {
    const delay =
      args.delay !== undefined ? ` data-tooltip-delay="${args.delay}"` : "";
    return `<button class="btn btn-primary" data-tooltip="${args.text}"${delay}>Hover me</button>`;
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

export const NoDelay: Story = {
  args: {
    text: "Shown immediately",
    delay: 0,
  },
};

/**
 * Only the first tooltip waits for its delay: moving straight to the next
 * trigger shows its tooltip immediately.
 */
export const Toolbar: Story = {
  render: () => `<div style="display: flex; gap: 0.25rem">
  <button class="btn btn-icon btn-ghost" aria-label="Bold" data-tooltip="Bold"><i class="fas fa-bold"></i></button>
  <button class="btn btn-icon btn-ghost" aria-label="Italic" data-tooltip="Italic"><i class="fas fa-italic"></i></button>
  <button class="btn btn-icon btn-ghost" aria-label="Underline" data-tooltip="Underline"><i class="fas fa-underline"></i></button>
  <button class="btn btn-icon btn-ghost" aria-label="Link" data-tooltip="Insert link"><i class="fas fa-link"></i></button>
</div>`,
};
