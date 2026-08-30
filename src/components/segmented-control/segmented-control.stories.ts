import { Meta, StoryObj } from "@storybook/html-vite";

type SegmentedControlArgs = {
  size: "sm" | "md" | "lg";
  block: boolean;
  disabled: boolean;
};

/**
 * Initialize the controls of the story once its markup is in the DOM.
 */
function withInit(html: string): string {
  setTimeout(() => {
    import("./segmented-control").then(({ initSegmentedControl }) => {
      initSegmentedControl();
    });
  });
  return html;
}

const meta: Meta<SegmentedControlArgs> = {
  title: "Components/Inputs/Segmented Control",
  parameters: {
    docs: {
      description: {
        component: `
A segmented control is a horizontal set of exclusive options. It is backed by a
native \`<select>\` element, so it submits with any HTML form without extra
JavaScript. The select is hidden but stays the source of truth: it holds the
options, the current value, the \`name\` sent with the form and the disabled
state.

## Usage

Add the \`data-segmented-control\` attribute to a \`<select>\` element:

\`\`\`html
<select name="view" data-segmented-control>
  <option value="list">List</option>
  <option value="grid" selected>Grid</option>
  <option value="board">Board</option>
</select>
\`\`\`

Controls are initialized by \`Bloum.init()\`, or manually:

\`\`\`js
new Bloum.SegmentedControl("#view", { size: "sm" });
// or initialize every control of the page
Bloum.initSegmentedControl();
\`\`\`

## Data attributes

- \`data-segmented-control\`: enables the segmented control
- \`data-segmented-control-size\`: \`sm\`, \`md\` (default) or \`lg\`
- \`data-segmented-control-block\`: full width, with equally sized segments
- \`data-icon\` on an \`<option>\`: icon markup rendered before the label

Disable the whole control with the \`disabled\` attribute on the select, and a
single segment with \`disabled\` on its option.

## JavaScript API

- \`value\`: get or set the selected value
- \`selectedIndex\`: index of the selected segment
- \`select(index, emitChange?)\`: select a segment
- \`sync()\`: rebuild the control after the select was changed programmatically
- \`focus()\`, \`destroy()\`

Selecting a segment dispatches \`input\` and \`change\` on the select element, so
existing form listeners keep working.

## Keyboard

The control behaves like a radio group: it holds a single tab stop, and the
arrow keys, <kbd>Home</kbd> and <kbd>End</kbd> move the selection between the
enabled segments.

## CSS classes

- \`.segmented-control\`: the control itself
- \`.segmented-control-sm\`, \`.segmented-control-lg\`: sizes
- \`.segmented-control-block\`: full width variant
- \`.segmented-control-item\`: a segment
- \`.segmented-control-indicator\`: the sliding background of the selection
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    block: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    size: "md",
    block: false,
    disabled: false,
  },
  render: (args) =>
    withInit(`
<select name="view" data-segmented-control data-segmented-control-size="${args.size}" ${args.block ? 'data-segmented-control-block=""' : ""} ${args.disabled ? "disabled" : ""}>
  <option value="list">List</option>
  <option value="grid" selected>Grid</option>
  <option value="board">Board</option>
</select>
    `),
};

export default meta;
type Story = StoryObj<SegmentedControlArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () =>
    withInit(`
<div class="flex flex-col items-start gap-4">
  <select name="size-sm" data-segmented-control data-segmented-control-size="sm">
    <option value="day">Day</option>
    <option value="week" selected>Week</option>
    <option value="month">Month</option>
  </select>
  <select name="size-md" data-segmented-control>
    <option value="day">Day</option>
    <option value="week" selected>Week</option>
    <option value="month">Month</option>
  </select>
  <select name="size-lg" data-segmented-control data-segmented-control-size="lg">
    <option value="day">Day</option>
    <option value="week" selected>Week</option>
    <option value="month">Month</option>
  </select>
</div>
    `),
};

export const WithIcons: Story = {
  render: () =>
    withInit(`
<select name="alignment" data-segmented-control>
  <option value="left" data-icon="<i class='fas fa-align-left'></i>" selected>Left</option>
  <option value="center" data-icon="<i class='fas fa-align-center'></i>">Center</option>
  <option value="right" data-icon="<i class='fas fa-align-right'></i>">Right</option>
</select>
    `),
};

/**
 * An option without text renders an icon only segment. Its accessible name is
 * taken from the `label` attribute of the option.
 */
export const IconOnly: Story = {
  render: () =>
    withInit(`
<select name="layout" data-segmented-control>
  <option value="list" label="List view" data-icon="<i class='fas fa-list'></i>" selected></option>
  <option value="grid" label="Grid view" data-icon="<i class='fas fa-th-large'></i>"></option>
  <option value="table" label="Table view" data-icon="<i class='fas fa-table'></i>"></option>
</select>
    `),
};

export const Block: Story = {
  render: () =>
    withInit(`
<div style="max-width: 30rem">
  <select name="plan" data-segmented-control data-segmented-control-block>
    <option value="monthly" selected>Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
</div>
    `),
};

export const Disabled: Story = {
  render: () =>
    withInit(`
<div class="flex flex-col items-start gap-4">
  <select name="disabled-control" data-segmented-control disabled>
    <option value="on" selected>On</option>
    <option value="off">Off</option>
  </select>
  <select name="disabled-option" data-segmented-control>
    <option value="draft" selected>Draft</option>
    <option value="published">Published</option>
    <option value="archived" disabled>Archived</option>
  </select>
</div>
    `),
};

/**
 * The hidden select carries the `name` and the value, so the control submits
 * like any other form field.
 */
export const InForm: Story = {
  render: () =>
    withInit(`
<form onsubmit="event.preventDefault(); alert('Notifications: ' + new FormData(event.target).get('notifications'));">
  <div class="field">
    <label class="label" for="notifications">Notifications</label>
    <select id="notifications" name="notifications" data-segmented-control>
      <option value="all">All</option>
      <option value="mentions" selected>Mentions</option>
      <option value="none">None</option>
    </select>
    <p class="field-text-help">Choose what you want to be notified about.</p>
  </div>
  <button type="submit" class="btn btn-primary">Save</button>
</form>
    `),
};
