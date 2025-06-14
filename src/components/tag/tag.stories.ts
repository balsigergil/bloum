import type { Meta, StoryObj } from "@storybook/html-vite";

type TagArgs = {
  text: string;
  type: string;
  size: string;
  solid: boolean;
  interactive: boolean;
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
    interactive: {
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
    interactive: false,
    removable: true,
  },
  render: (args) => {
    const typeClass = args.type === "default" ? "" : `tag-${args.type}`;
    const sizeClass = args.size === "default" ? "" : `tag-${args.size}`;
    const solidClass = args.solid ? "tag-solid" : "";
    const interactiveClass = args.interactive ? "tag-interactive" : "";

    const classes = ["tag", typeClass, sizeClass, solidClass, interactiveClass]
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
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag">
    <span class="tag-text">Default</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-lg">
    <span class="tag-text">Large</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
</div>`,
};

export const TagVariants: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag">
    <span class="tag-text">Default</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-primary">
    <span class="tag-text">Primary</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-success">
    <span class="tag-text">Success</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-danger">
    <span class="tag-text">Danger</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-warning">
    <span class="tag-text">Warning</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-info">
    <span class="tag-text">Info</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
</div>`,
};

export const TagSolid: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-solid">
    <span class="tag-text">Default</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-solid tag-primary">
    <span class="tag-text">Primary</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-solid tag-success">
    <span class="tag-text">Success</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-solid tag-danger">
    <span class="tag-text">Danger</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-solid tag-warning">
    <span class="tag-text">Warning</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-solid tag-info">
    <span class="tag-text">Info</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
</div>`,
};

export const TagInteractive: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-interactive tag-primary">
    <span class="tag-text">Click me</span>
  </div>
  <div class="tag tag-interactive tag-success">
    <span class="tag-text">Hover effect</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-interactive tag-solid tag-info">
    <span class="tag-text">Interactive solid</span>
  </div>
</div>`,
};

export const TagWithoutRemove: Story = {
  args: {
    removable: false,
  },
};

export const TagList: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
  <div class="tag tag-primary">
    <span class="tag-text">React</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-success">
    <span class="tag-text">TypeScript</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-info">
    <span class="tag-text">CSS</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-warning">
    <span class="tag-text">JavaScript</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag">
    <span class="tag-text">HTML</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-danger">
    <span class="tag-text">Legacy Code</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
</div>`,
};

export const TagLongText: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; max-width: 300px;">
  <div class="tag tag-primary">
    <span class="tag-text">This is a very long tag that should truncate with ellipsis</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
  <div class="tag tag-success" style="max-width: 150px;">
    <span class="tag-text">Constrained width tag example</span>
    <button class="tag-remove" type="button" aria-label="Remove tag"></button>
  </div>
</div>`,
};
