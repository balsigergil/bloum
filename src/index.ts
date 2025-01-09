import "@ungap/custom-elements";

import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanel } from "./tabs/TabPanel";
import { AutogrowTextarea } from "./forms/AutogrowTextarea";
import { openModal, closeModal, initModal } from "./modal/Modal";
import { Tooltip } from "./tooltip/tooltip";
import "./sidebar/sidebar";

Tabs.register();
TabList.register();
Tab.register();
TabPanel.register();

AutogrowTextarea.register();

initModal();

// @ts-ignore
window.Tooltip = Tooltip;

export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  AutogrowTextarea,
  openModal,
  closeModal,
};

console.info("🚀 Bloom UI Components loaded!");
