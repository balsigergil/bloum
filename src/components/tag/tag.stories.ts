import type { Meta, StoryObj } from "@storybook/html-vite";

type TagArgs = {
  text: string;
  type: string;
  size: string;
  solid: boolean;
  removable: boolean;
};

const meta: Meta<TagArgs> = {
  title: "Components/Tag",
  argTypes: {
    text: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["default", "primary", "success", "danger", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    solid: {
      control: "boolean",
    },
    removable: {
      control: "boolean",
    },
  },
  args: {
    text: "JavaScript",
    type: "default",
    size: "default",
    solid: false,
    removable: false,
  },
  render: (args) => {
    const typeClass = args.type === "default" ? "" : `tag-${args.type}`;
    const sizeClass = args.size === "default" ? "" : `tag-${args.size}`;
    const solidClass = args.solid ? "tag-solid" : "";

    const classes = ["tag", typeClass, sizeClass, solidClass]
      .filter(Boolean)
      .join(" ");

    return `
<div class="${classes}">
  <span class="tag-text">${args.text}</span>
  ${args.removable ? '<button class="tag-remove" type="button" aria-label="Remove tag"></button>' : ""}
</div>`;
  },
};

export default meta;
type Story = StoryObj<TagArgs>;

export const Tag: Story = {};

export const TagSizes: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-sm">
    <span class="tag-text">Small</span>
  </div>
  <div class="tag">
    <span class="tag-text">Default</span>
  </div>
  <div class="tag tag-lg">
    <span class="tag-text">Large</span>
  </div>
</div>`,
};

export const TagVariants: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag">
    <span class="tag-text">Default</span>
  </div>
  <div class="tag tag-primary">
    <span class="tag-text">Primary</span>
  </div>
  <div class="tag tag-success">
    <span class="tag-text">Success</span>
  </div>
  <div class="tag tag-danger">
    <span class="tag-text">Danger</span>
  </div>
  <div class="tag tag-warning">
    <span class="tag-text">Warning</span>
  </div>
  <div class="tag tag-info">
    <span class="tag-text">Info</span>
  </div>
</div>`,
};

export const TagSolid: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-solid">
    <span class="tag-text">Default</span>
  </div>
  <div class="tag tag-solid tag-primary">
    <span class="tag-text">Primary</span>
  </div>
  <div class="tag tag-solid tag-success">
    <span class="tag-text">Success</span>
  </div>
  <div class="tag tag-solid tag-danger">
    <span class="tag-text">Danger</span>
  </div>
  <div class="tag tag-solid tag-warning">
    <span class="tag-text">Warning</span>
  </div>
  <div class="tag tag-solid tag-info">
    <span class="tag-text">Info</span>
  </div>
</div>`,
};

export const TagWithRemove: Story = {
  args: {
    removable: true,
  },
};

export const TagList: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
  <div class="tag tag-primary">
    <span class="tag-text">React</span>
  </div>
  <div class="tag tag-success">
    <span class="tag-text">TypeScript</span>
  </div>
  <div class="tag tag-info">
    <span class="tag-text">CSS</span>
  </div>
  <div class="tag tag-warning">
    <span class="tag-text">JavaScript</span>
  </div>
  <div class="tag">
    <span class="tag-text">HTML</span>
  </div>
  <div class="tag tag-danger">
    <span class="tag-text">Legacy Code</span>
  </div>
</div>`,
};

export const TagLongText: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; max-width: 300px;">
  <div class="tag tag-primary">
    <span class="tag-text">This is a very long tag that should truncate with ellipsis</span>
  </div>
  <div class="tag tag-success" style="max-width: 150px;">
    <span class="tag-text">Constrained width tag example</span>
  </div>
</div>`,
};
