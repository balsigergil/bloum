import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanel } from "./tabs/TabPanel";

Tabs.register();
TabList.register();
Tab.register();
TabPanel.register();

export { Tabs, TabList, Tab, TabPanel };

console.info("🚀 Bloom UI Components loaded!");
