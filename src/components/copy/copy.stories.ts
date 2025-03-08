import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Components/Copy Button",
};

export default meta;

export const CopyButton: StoryObj = {
  render: () => {
    return `<bl-copy-button class="btn btn-icon" value="This is a piece of text">
  <i class="fas fa-clipboard"></i>
</bl-copy-button>`;
  },
};
