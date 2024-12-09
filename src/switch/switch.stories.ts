import { Meta, StoryObj } from "@storybook/html";

type SwitchArgs = {
  checked: boolean;
  disabled: boolean;
};

const meta: Meta<SwitchArgs> = {
  title: "Switch",
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  render: (args) => {
    return `
      <div class="form-switch">
        <input type="checkbox" class="switch" role="switch" id="switch1" ${args.checked ? "checked" : ""} ${args.disabled ? "disabled" : ""}>
        <label for="switch1" class="label">Toggle me</label>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Switch: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};
