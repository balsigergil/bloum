import type { StoryObj, Meta } from "@storybook/html";
import { SelectProps } from "./Select";

const meta = {
  title: "Select",
  tags: ["autodocs"],
  render: (args) => {
    return `<bl-select
    placeholder="${args.placeholder}"
    no-results-text="${args.noResultsText}"${args.clearable ? "\n    clearable" : ""}${args.searchable ? "\n    searchable" : ""}${args.multiple ? "\n    multiple" : ""}${args.disabled ? "\n    disabled" : ""}>
  <div data-value="1">Option 1</div>
  <div data-value="2">Option 2</div>
  <div data-value="3">Option 3</div>
  <div data-value="4">Option 4</div>
</bl-select>`;
  },
  argTypes: {},
  args: {
    placeholder: "Select an option",
    disabled: false,
    searchable: false,
    clearable: false,
    multiple: false,
    noResultsText: "No results found",
  },
} satisfies Meta<SelectProps>;

export default meta;
type Story = StoryObj<SelectProps>;

export const Basic: Story = {
  args: {},
};
