import { Meta, StoryObj } from "@storybook/html-vite";
import { Tabs } from "./tabs";

type TabsArgs = {
  useAnchor: boolean;
};

const meta: Meta<TabsArgs> = {
  title: "Components/Navigation/Tabs",
  argTypes: {
    useAnchor: {
      control: "boolean",
    },
  },
  render: (args) => {
    const tabs = new Tabs();
    if (args.useAnchor) {
      tabs.setAttribute("use-anchor", "");
    }
    tabs.innerHTML = `
<bl-tab-list>
  <bl-tab href="#tab1"><i class="fas fa-user"></i> Users</bl-tab>
  <bl-tab href="#tab2"><i class="fas fa-users"></i> Groups</bl-tab>
  <bl-tab href="#tab3"><i class="fas fa-bell"></i> Notifications</bl-tab>
  <bl-tab href="#tab4"><i class="fas fa-cog"></i> Settings</bl-tab>
</bl-tab-list>
<bl-tab-panel id="tab1">Tab 1 content</bl-tab-panel>
<bl-tab-panel id="tab2">
<button class="btn btn-primary" data-modal="#my-basic-modal">Open Basic Modal</button>

<div class="modal" id="my-basic-modal" aria-labelledby="my-basic-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-basic-modal-title">Login</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="field">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" name="email" class="input" placeholder="Enter your email" required>
        </div>
        <div class="field">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" name="password" class="input" placeholder="Enter your password" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Cancel</button>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </div>
  </div>
</div>
</bl-tab-panel>
<bl-tab-panel id="tab3">Tab 3 content</bl-tab-panel>
<bl-tab-panel id="tab4">Tab 4 content</bl-tab-panel>
    `;
    return tabs;
  },
};

export default meta;
type Story = StoryObj<TabsArgs>;

export const ClassicTabs: Story = {
  args: {
    useAnchor: false,
  },
};
