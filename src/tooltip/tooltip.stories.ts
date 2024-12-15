import { Meta, StoryObj } from "@storybook/html";

type TooltipArgs = {
  text: string;
};

const meta: Meta<TooltipArgs> = {
  title: "Tooltip",
  render: (args) => {
    return `
<button class="btn btn-primary" data-tooltip="${args.text}">Hover me</button>
<script>
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    new Tooltip(element);
  });
</script>
`;
  },
};

export default meta;
type Story = StoryObj<TooltipArgs>;

export const Tooltip: Story = {
  args: {
    text: "Hello World!",
  },
};
