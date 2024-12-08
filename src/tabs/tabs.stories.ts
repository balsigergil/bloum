import { Meta, StoryObj } from "@storybook/html";
import { Tabs } from "./Tabs";

type TabsArgs = {
  useAnchor: boolean;
};

const meta: Meta<TabsArgs> = {
  title: "Tabs",
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
        <bl-tab href="#tab1"><i class="fas fa-users"></i> Users</bl-tab>
        <bl-tab href="#tab2"><i class="fas fa-bell"></i> Notifications</bl-tab>
        <bl-tab href="#tab3"><i class="fas fa-cog"></i> Settings</bl-tab>
      </bl-tab-list>
      <bl-tab-panel id="tab1">Tab 1 content</bl-tab-panel>
      <bl-tab-panel id="tab2">Tab 2 content</bl-tab-panel>
      <bl-tab-panel id="tab3">Tab 3 content</bl-tab-panel>
    `;
    return tabs;
  },
};

export default meta;
type Story = StoryObj<TabsArgs>;

export const ClassicTabs: Story = {};