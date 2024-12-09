import type { Meta, StoryObj } from "@storybook/html";
import { ButtonArgs } from "./button.stories";

const meta: Meta<ButtonArgs> = {
  title: "Icon button",
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "danger"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    loading: {
      control: "boolean",
    },
  },
  render: (args) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<i class="fas fa-save"></i>`;
    btn.classList.add("btn", "btn-icon");
    btn.ariaLabel = "Save";

    if (args.color === "primary") {
      btn.classList.add("btn-primary");
    } else if (args.color === "danger") {
      btn.classList.add("btn-danger");
    }

    if (args.variant === "ghost") {
      btn.classList.add("btn-ghost");
    } else if (args.variant === "outline") {
      btn.classList.add("btn-outline");
    }

    if (args.loading) {
      btn.classList.add("btn-loading");
    }

    return btn;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    color: "primary",
    variant: "default",
    loading: false,
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: "outline",
  },
};
