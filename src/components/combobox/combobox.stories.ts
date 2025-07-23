import { Meta, StoryObj } from "@storybook/html-vite";

export type ComboboxArgs = {
  multiple: boolean;
  disabled: boolean;
  readonly: boolean;
  searchable: boolean;
  clearable: boolean;
};

const meta: Meta<ComboboxArgs> = {
  title: "Components/Inputs/Combobox",
};

export default meta;
type Story = StoryObj<ComboboxArgs>;

export const Select: Story = {
  render: () => {
    return `
<select name="fruits" id="combobox-1">
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
<script>
new Bloum.Combobox('#combobox-1');
</script>`;
  },
};
export const SelectSearchable: Story = {
  render: () => {
    return `
<select name="fruits" id="combobox-2">
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
<script>
new Bloum.Combobox('#combobox-2', { isSearchable: true });
</script>`;
  },
};

export const SelectMultiple: Story = {
  render: () => {
    return `
<select name="fruits" id="combobox-3" required multiple>
  <option value="apple">Apple</option>
  <option value="orange">Orange</option>
  <option value="banana" selected>Banana</option>
  <option value="grape">Grape</option>
  <option value="kiwi">Kiwi</option>
  <option value="mango">Mango</option>
  <option value="strawberry" selected>Strawberry</option>
  <option value="watermelon">Watermelon</option>
  <option value="pineapple">Pineapple</option>
  <option value="pear">Pear</option>
</select>
<script>
new Bloum.Combobox('#combobox-3', { isSearchable: true });
</script>
    `;
  },
};
