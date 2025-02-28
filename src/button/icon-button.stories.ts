import type { Meta, StoryObj } from "@storybook/html";
import { ButtonArgs } from "./button.stories";

const meta: Meta<ButtonArgs> = {
  title: "Components/Icon Button",
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "danger"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "lg", "sm", "xs"],
    },
    rounded: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
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

    if (args.size === "lg") {
      btn.classList.add("btn-lg");
    } else if (args.size === "sm") {
      btn.classList.add("btn-sm");
    } else if (args.size === "xs") {
      btn.classList.add("btn-xs");
    }

    if (args.loading) {
      btn.classList.add("btn-loading");
    }

    if (args.rounded) {
      btn.classList.add("btn-rounded");
    }

    if (args.disabled) {
      btn.disabled = true;
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
    size: "default",
    rounded: false,
    loading: false,
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: "outline",
  },
};
