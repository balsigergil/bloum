import "@ungap/custom-elements";

import { Tabs } from "./components/tabs/Tabs";
import { TabList } from "./components/tabs/TabList";
import { Tab } from "./components/tabs/Tab";
import { TabPanel } from "./components/tabs/TabPanel";
import { AutogrowTextarea } from "./components/forms/AutogrowTextarea";
import { openModal, closeModal, initModal } from "./components/modal/Modal";
import { initTooltip, Tooltip } from "./components/tooltip/tooltip";
import "./components/sidebar/sidebar";
import { BlCombobox } from "./components/combobox/Combobox";

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
