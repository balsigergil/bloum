import type { Meta, StoryObj } from "@storybook/html-vite";

export type ButtonArgs = {
  label: string;
  color: string;
  variant: string;
  size: string;
  loading: boolean;
  disabled: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: "Components/Elements/Button",
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "danger", "warning", "success", "info"],
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
    btn.innerText = args.label;
    btn.classList.add("btn");

    const colorCls = `btn-${args.color}`;
    btn.classList.add(colorCls);

    const variantCls = `btn-${args.variant}`;
    btn.classList.add(variantCls);

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

    if (args.disabled) {
      btn.setAttribute("disabled", "");
    }

    return btn;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    label: "Press me",
    color: "primary",
    variant: "default",
    size: "default",
    loading: false,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    color: "default",
  },
};

export const Split: Story = {
  render: () => {
    return `
<div class="btn-group">
  <button type="button" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Send</button>
  <button type="button" class="btn btn-primary btn-icon btn-menu-toggle" data-menu="#menu-1">
    <i class="fas fa-chevron-down"></i>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="menu" id="menu-1">
    <li><a class="menu-item" href="#"><i class="fas fa-copy"></i> Copy</a></li>
    <li><a class="menu-item" href="#"><i class="fas fa-cut"></i> Cut</a></li>
    <li><a class="menu-item" href="#"><i class="fas fa-paste"></i> Paste</a></li>
    <li><hr class="menu-divider"></li>
    <li><a class="menu-item menu-item-danger" href="#"><i class="fas fa-trash"></i> Delete</a></li>
  </ul>
</div>`;
  },
};
