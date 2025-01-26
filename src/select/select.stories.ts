import { Meta, StoryObj } from "@storybook/html";

export type SelectArgs = {
  multiple: boolean;
  disabled: boolean;
  readonly: boolean;
  searchable: boolean;
  clearable: boolean;
};

const meta: Meta<SelectArgs> = {
  title: "Select",
};

export default meta;
type Story = StoryObj<SelectArgs>;

export const Select: Story = {
  render: () => {
    return `
<div>
  <select name="fruits" id="select-1">
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="banana" selected>Banana</option>
    <option value="grape">Grape</option>
    <option value="kiwi">Kiwi</option>
    <option value="mango">Mango</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon">Watermelon</option>
    <option value="pineapple">Pineapple</option>
    <option value="pear">Pear</option>
  </select>
</div>
<div>
  <select name="fruits" id="select-2">
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="banana">Banana</option>
    <option value="grape">Grape</option>
    <option value="kiwi">Kiwi</option>
    <option value="mango">Mango</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon">Watermelon</option>
    <option value="pineapple">Pineapple</option>
    <option value="pear">Pear</option>
  </select>
</div>
<script>
new BloumSelect('#select-1');
new BloumSelect('#select-2', { isSearchable: true });
</script>
    `;
  },
};
