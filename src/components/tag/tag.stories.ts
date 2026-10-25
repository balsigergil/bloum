import type { Meta, StoryObj } from "@storybook/html-vite";

type TagArgs = {
  text: string;
  type: string;
  size: string;
  solid: boolean;
  rounded: boolean;
};

const meta: Meta<TagArgs> = {
  title: "Components/Elements/Tag",
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
    rounded: {
      control: "boolean",
    },
  },
  args: {
    text: "JavaScript",
    type: "default",
    size: "default",
    solid: false,
    rounded: false,
  },
  render: (args) => {
    const typeClass = args.type === "default" ? "" : `tag-${args.type}`;
    const sizeClass = args.size === "default" ? "" : `tag-${args.size}`;
    const solidClass = args.solid ? "tag-solid" : "";
    const roundedClass = args.rounded ? "tag-rounded" : "";

    const classes = ["tag", typeClass, sizeClass, solidClass, roundedClass]
      .filter(Boolean)
      .join(" ");

    return `
<div class="${classes}">${args.text}</div>`;
  },
};

export default meta;
type Story = StoryObj<TagArgs>;

export const Tag: Story = {};

export const TagSizes: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-sm">Small</div>
  <div class="tag">Default</div>
  <div class="tag tag-lg">Large</div>
</div>`,
};

export const TagVariants: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag">Default</div>
  <div class="tag tag-primary">Primary</div>
  <div class="tag tag-success">Success</div>
  <div class="tag tag-danger">Danger</div>
  <div class="tag tag-warning">Warning</div>
  <div class="tag tag-info">Info</div>
</div>`,
};

export const TagSolid: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div class="tag tag-solid">Default</div>
  <div class="tag tag-solid tag-primary">Primary</div>
  <div class="tag tag-solid tag-success">Success</div>
  <div class="tag tag-solid tag-danger">Danger</div>
  <div class="tag tag-solid tag-warning">Warning</div>
  <div class="tag tag-solid tag-info">Info</div>
</div>`,
};

export const TagList: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
  <div class="tag tag-primary">React</div>
  <div class="tag tag-success">TypeScript</div>
  <div class="tag tag-info">CSS</div>
  <div class="tag tag-warning">JavaScript</div>
  <div class="tag">HTML</div>
  <div class="tag tag-danger">Legacy Code</div>
</div>`,
};

export const TagLongText: Story = {
  render: () => `
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; max-width: 300px;">
  <div class="tag tag-primary">This is a very long tag that should truncate with ellipsis</div>
  <div class="tag tag-success" style="max-width: 150px;">Constrained width tag example</div>
</div>`,
};
