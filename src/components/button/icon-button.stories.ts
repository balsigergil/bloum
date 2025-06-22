import type { Meta, StoryObj } from "@storybook/html-vite";
import { ButtonArgs } from "./button.stories";

const meta: Meta<ButtonArgs> = {
  title: "Components/Icon Button",
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "error", "warning", "success", "info"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
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

    const colorCls = `btn-${args.color}`;
    btn.classList.add(colorCls);

    const variantCls = `btn-${args.variant}`;
    btn.classList.add(variantCls);

    const sizeCls = `btn-${args.size}`;
    btn.classList.add(sizeCls);

    if (args.loading) {
      btn.classList.add("btn-loading");
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
