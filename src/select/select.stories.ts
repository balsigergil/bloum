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
<select name="users">
  <option value="albert">Albert Le Vert</option>
  <option value="cassis">Mademoiselle Cassis</option>
  <option value="hyacinthe">Facteur Hyacinthe</option
</select>
<script>
new BloumSelect('select[name="users"]');
</script>
    `;
  },
};
