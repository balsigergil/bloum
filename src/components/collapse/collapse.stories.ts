import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Collapse",
};

export default meta;

export const Collapse: StoryObj = {
  render: () => {
    return `
<a class="btn btn-primary" data-collapse="#collapse-1">Toggle collapse</a>
<div class="collapsible mt-4" id="collapse-1">
  <div class="card card-body">
    <p>Some content inside the collapse</p>
  </div>
</div>`;
  },
};
