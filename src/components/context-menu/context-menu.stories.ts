import type { Meta, StoryObj } from "@storybook/html-vite";

/**
 * Initialize the context menus of the story once its markup is in the DOM.
 */
function withInit(html: string): string {
  setTimeout(() => {
    import("./context-menu").then(({ initContextMenu }) => {
      initContextMenu();
    });
  });
  return html;
}

const area = (
  id: string,
  label: string,
  height = "10rem",
) => `<div class="rounded flex items-center justify-center text-muted" data-context-menu="#${id}"
  style="height: ${height}; border: 1px dashed var(--bl-border-color)">
  <i class="fas fa-arrow-pointer mr-2"></i> ${label}
</div>`;

const meta: Meta = {
  title: "Components/Overlays/Context Menu",
  parameters: {
    docs: {
      description: {
        component: `
A context menu is the [menu](?path=/docs/components-elements-menu--menu)
component opened with a right click and anchored to the pointer instead of a
trigger element.

## Usage

Give the menu the \`menu\` and \`context-menu\` classes, then point the elements
it belongs to at it with \`data-context-menu\`:

\`\`\`html
<div data-context-menu="#file-menu">Right click me</div>

<div class="menu context-menu" id="file-menu">
  <div class="menu-group">
    <button type="button" class="menu-item">Rename</button>
    <button type="button" class="menu-item">Duplicate</button>
  </div>
</div>
\`\`\`

Everything the menu offers works inside a context menu: groups, labels,
dividers, shortcuts, submenus, checkboxes and the danger variant.

Several elements can share the same menu — bind every row of a table to it and
the menu opens on the row that was right clicked. When targets are nested, the
innermost one wins.

Context menus are initialized by \`Bloum.init()\`, or manually:

\`\`\`js
new Bloum.ContextMenu("#file-menu", ".file-row");
// or bind every \`data-context-menu\` element of the page
Bloum.initContextMenu();
\`\`\`

## Data attributes

- \`data-context-menu\`: CSS selector of the menu to open on right click

## JavaScript API

- \`open(x, y)\`: open the menu at the given viewport coordinates, as reported
  by the \`clientX\` and \`clientY\` of a mouse event
- \`close()\`: close the menu
- \`isOpen()\`: whether the menu is open
- \`destroy()\`: remove all event listeners

## Keyboard

The menu behaves like a regular one: <kbd>↑</kbd> and <kbd>↓</kbd> move between
the items, <kbd>→</kbd> and <kbd>←</kbd> enter and leave a submenu,
<kbd>Enter</kbd> activates the focused item and <kbd>Escape</kbd> closes the
menu.

## CSS classes

- \`.context-menu\`: added next to \`.menu\`, grows the menu out of the pointer
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    withInit(`
${area("demo-context-menu", "Right click anywhere in this area")}

<div class="menu context-menu" id="demo-context-menu">
  <div class="menu-group">
    <button type="button" class="menu-item">
      <i class="fas fa-arrow-rotate-left fa-fw"></i>
      Back
      <span class="menu-shortcut">⌘[</span>
    </button>
    <button type="button" class="menu-item" disabled>
      <i class="fas fa-arrow-rotate-right fa-fw"></i>
      Forward
      <span class="menu-shortcut">⌘]</span>
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-rotate fa-fw"></i>
      Reload
      <span class="menu-shortcut">⌘R</span>
    </button>
  </div>
  <div class="menu-divider"></div>
  <div class="menu-group">
    <button type="button" class="menu-item">
      <i class="fas fa-copy fa-fw"></i>
      Copy
      <span class="menu-shortcut">⌘C</span>
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-paste fa-fw"></i>
      Paste
      <span class="menu-shortcut">⌘V</span>
    </button>
  </div>
  <div class="menu-divider"></div>
  <div class="menu-group">
    <button type="button" class="menu-item menu-item-danger">
      <i class="fas fa-trash fa-fw"></i>
      Delete
    </button>
  </div>
</div>
    `),
};

/**
 * A context menu holds submenus, labels and checkboxes like any other menu.
 */
export const WithSubmenu: Story = {
  render: () =>
    withInit(`
${area("submenu-context-menu", "Right click to open a menu with submenus")}

<div class="menu context-menu" id="submenu-context-menu">
  <div class="menu-group">
    <div class="menu-label">Selection</div>
    <button type="button" class="menu-item">
      <i class="fas fa-pen fa-fw"></i>
      Rename
      <span class="menu-shortcut">F2</span>
    </button>
    <div class="menu-item">
      <i class="fas fa-share-nodes fa-fw"></i>
      Share
      <i class="fas fa-chevron-right ml-auto"></i>
      <div class="submenu">
        <div class="menu-group">
          <button type="button" class="menu-item">
            <i class="fas fa-envelope fa-fw"></i>
            Email
          </button>
          <button type="button" class="menu-item">
            <i class="fas fa-link fa-fw"></i>
            Copy link
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="menu-divider"></div>
  <div class="menu-group">
    <div class="menu-label">View</div>
    <label class="menu-item">
      <input type="checkbox" class="input-check" checked>
      Hidden files
    </label>
    <label class="menu-item">
      <input type="checkbox" class="input-check">
      Preview panel
    </label>
  </div>
</div>
    `),
};

/**
 * Several elements can point at the same menu. The menu opens on the element
 * that was right clicked, wherever it sits on the page.
 */
export const SharedBetweenTargets: Story = {
  render: () =>
    withInit(`
<div class="table-responsive">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Owner</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      <tr data-context-menu="#row-context-menu">
        <td><i class="fas fa-file-pdf fa-fw mr-2"></i>Quarterly report.pdf</td>
        <td>Ada Lovelace</td>
        <td>2.4 MB</td>
      </tr>
      <tr data-context-menu="#row-context-menu">
        <td><i class="fas fa-file-lines fa-fw mr-2"></i>Meeting notes.md</td>
        <td>Alan Turing</td>
        <td>12 KB</td>
      </tr>
      <tr data-context-menu="#row-context-menu">
        <td><i class="fas fa-file-image fa-fw mr-2"></i>Logo.svg</td>
        <td>Grace Hopper</td>
        <td>48 KB</td>
      </tr>
    </tbody>
  </table>
</div>
<p class="text-muted text-sm mt-4">Right click any row of the table.</p>

<div class="menu context-menu" id="row-context-menu">
  <div class="menu-group">
    <button type="button" class="menu-item">
      <i class="fas fa-up-right-from-square fa-fw"></i>
      Open
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-download fa-fw"></i>
      Download
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-pen fa-fw"></i>
      Rename
    </button>
  </div>
  <div class="menu-divider"></div>
  <div class="menu-group">
    <button type="button" class="menu-item menu-item-danger">
      <i class="fas fa-trash fa-fw"></i>
      Move to trash
    </button>
  </div>
</div>
    `),
};

/**
 * Targets can be nested: the innermost one opens its own menu, and the outer
 * one keeps handling the rest of its area.
 */
export const NestedTargets: Story = {
  render: () =>
    withInit(`
<div class="rounded p-6 text-muted" data-context-menu="#canvas-context-menu"
  style="border: 1px dashed var(--bl-border-color)">
  <p class="mb-4"><i class="fas fa-arrow-pointer mr-2"></i> Right click the canvas</p>
  <div class="card" data-context-menu="#card-context-menu" style="max-width: 20rem">
    <div class="card-body">
      <div class="card-title">Sales widget</div>
      <div class="card-description">Right click the card for its own menu.</div>
    </div>
  </div>
</div>

<div class="menu context-menu" id="canvas-context-menu">
  <div class="menu-group">
    <button type="button" class="menu-item">
      <i class="fas fa-plus fa-fw"></i>
      Add widget
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-table-cells fa-fw"></i>
      Toggle grid
    </button>
  </div>
</div>

<div class="menu context-menu" id="card-context-menu">
  <div class="menu-group">
    <button type="button" class="menu-item">
      <i class="fas fa-gear fa-fw"></i>
      Configure
    </button>
    <button type="button" class="menu-item">
      <i class="fas fa-clone fa-fw"></i>
      Duplicate
    </button>
  </div>
  <div class="menu-divider"></div>
  <div class="menu-group">
    <button type="button" class="menu-item menu-item-danger">
      <i class="fas fa-trash fa-fw"></i>
      Remove
    </button>
  </div>
</div>
    `),
};
