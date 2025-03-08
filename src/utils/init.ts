import { Tabs } from "@/components/tabs/Tabs";
import { TabList } from "@/components/tabs/TabList";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { initTooltip, Tooltip } from "@/components/tooltip/tooltip";
import { Combobox } from "@/components/combobox/Combobox";
import { initModals, Modal } from "@/components/modal/Modal";
import { initSidebar } from "@/components/sidebar/sidebar";
import { initMenus } from "@/components/menu/menu";
import { initCollapse } from "@/components/collapse/collapse";
import { initAccordion } from "@/components/accordion/accordion";
import { CopyButton } from "@/components/copy/copy";
import { initAutogrowTextarea } from "@/components/forms/AutogrowTextarea";

export function initBloum() {
  Tabs.register();
  TabList.register();
  Tab.register();
  TabPanel.register();

  // TODO: Remove ts-ignore
  // @ts-ignore
  window.Tooltip = Tooltip;
  // @ts-ignore
  window.Combobox = Combobox;
  // @ts-ignore
  window.Modal = Modal;

  document.addEventListener("DOMContentLoaded", () => {
    initTooltip();
    initSidebar();
    initModals();
    initMenus();
    initCollapse();
    initAccordion();
    initAutogrowTextarea();
    CopyButton.register();
  });

  console.info("🚀 Bloom initialized!");
}
