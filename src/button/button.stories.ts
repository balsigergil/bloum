import type { Meta, StoryObj } from "@storybook/html";

export type ButtonArgs = {
  label: string;
  color: string;
  variant: string;
  size: string;
  rounded: boolean;
  loading: boolean;
  disabled: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: "Button",
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
