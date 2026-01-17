import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Inputs/Date Picker",
  argTypes: {},
  render: () => {
    return `<input type="date" class="input" data-datepicker>`;
  },
};

export default meta;
type Story = StoryObj;

export const DatePicker: Story = {
  args: {},
};
