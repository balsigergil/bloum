import type { Meta, StoryObj } from "@storybook/html";

type ButtonArgs = {
  type: string;
  isLoading: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: "Icon button",
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
    btn.innerHTML = `<i class="fas fa-save"></i>`;
    btn.classList.add("btn", "btn-icon");
    btn.ariaLabel = "Save";

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
