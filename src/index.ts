import "@ungap/custom-elements";

import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanel } from "./tabs/TabPanel";
import { AutogrowTextarea } from "./forms/AutogrowTextarea";

Tabs.register();
TabList.register();
Tab.register();
TabPanel.register();

AutogrowTextarea.register();

export { Tabs, TabList, Tab, TabPanel, AutogrowTextarea };

console.info("🚀 Bloom UI Components loaded!");
