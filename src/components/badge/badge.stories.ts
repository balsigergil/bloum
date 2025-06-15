import type { Meta, StoryObj } from "@storybook/html-vite";

type BadgeArgs = {
  text: string;
  type: string;
  topRight: boolean;
  dot: boolean;
  ping: boolean;
};

const meta: Meta<BadgeArgs> = {
  title: "Components/Badge",
  argTypes: {
    text: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["default", "primary", "success", "danger", "warning", "info"],
    },
    topRight: {
      control: "boolean",
    },
    dot: {
      control: "boolean",
    },
    ping: {
      control: "boolean",
    },
  },
  args: {
    text: "12",
    type: "default",
    topRight: false,
    dot: false,
    ping: false,
  },
  render: (args) => {
    const badgeType = args.type === "default" ? "" : `badge-${args.type}`;
    return `
<button class="btn">
  This is a button
  <div class="badge ${badgeType}${args.topRight ? ` badge-top-right` : ``}${args.dot ? ` badge-dot` : ``}${args.ping ? ` badge-ping` : ``}">${!args.dot ? args.text : ``}</div>
</button>`;
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Badge: Story = {};

export const BadgeTopRight: Story = {
  args: {
    topRight: true,
  },
};

export const BadgeDot: Story = {
  args: {
    topRight: true,
    dot: true,
    ping: false,
  },
};
