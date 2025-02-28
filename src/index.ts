import "@ungap/custom-elements";

import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanel } from "./tabs/TabPanel";
import { AutogrowTextarea } from "./forms/AutogrowTextarea";
import { openModal, closeModal, initModal } from "./modal/Modal";
import { initTooltip, Tooltip } from "./tooltip/tooltip";
import "./sidebar/sidebar";
import { BlCombobox } from "./combobox/Combobox";

Tabs.register();
TabList.register();
Tab.register();
TabPanel.register();

AutogrowTextarea.register();

initModal();

// @ts-ignore
window.Tooltip = Tooltip;
// @ts-ignore
window.BlCombobox = BlCombobox;

initTooltip();

console.info("🚀 Bloom UI Components loaded!");

export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  AutogrowTextarea,
  openModal,
  closeModal,
  Tooltip,
  BlCombobox,
};
