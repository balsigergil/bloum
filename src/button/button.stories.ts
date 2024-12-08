import type { Meta, StoryObj } from "@storybook/html";

type ButtonArgs = {
  label: string;
  type: string;
  isLoading: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: "Button",
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    isLoading: {
      control: "boolean",
    },
  },
  render: (args) => {
    const btn = document.createElement("button");
    btn.innerText = args.label;
    btn.classList.add("btn");

    if (args.type === "primary") {
      btn.classList.add("btn-primary");
    } else if (args.type === "ghost") {
      btn.classList.add("btn-ghost");
    }

    if (args.isLoading) {
      btn.classList.add("btn-loading");
    }

    return btn;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    label: "Press me",
    type: "primary",
    isLoading: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    type: "secondary",
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-save");
    btn.appendChild(icon);
    btn.appendChild(document.createTextNode(args.label));

    if (args.isLoading) {
      btn.classList.add("btn-loading");
    }

    return btn;
  },
  args: {
    label: "Press me",
  },
};
