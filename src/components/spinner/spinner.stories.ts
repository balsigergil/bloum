import type { Meta, StoryObj } from "@storybook/html";

type SpinnerArgs = {
  size: string;
};

const meta: Meta<SpinnerArgs> = {
  title: "Components/Spinner",
  argTypes: {
    size: {
      control: "select",
      options: ["md", "sm", "lg", "xl"],
    },
  },
  render: (args) => {
    const spinner = document.createElement("span");
    spinner.classList.add("spinner");
    if (args.size && args.size !== "md") {
      spinner.classList.add(`spinner-${args.size}`);
    }
    return spinner;
  },
};

export default meta;

export const Spinner: StoryObj = {
  args: {
    size: "md",
  },
};
