import { Tabs } from "@/components/tabs/Tabs";
import { TabList } from "@/components/tabs/TabList";
import { Tab } from "@/components/tabs/Tab";
import { TabPanel } from "@/components/tabs/TabPanel";
import { initTooltip, Tooltip } from "@/components/tooltip/tooltip";
import { Combobox } from "@/components/combobox/Combobox";
import { initModals, Modal } from "@/components/modal/Modal";
import { initDrawers, Drawer } from "@/components/drawer/Drawer";
import { initSidebar } from "@/components/sidebar/sidebar";
import { initMenus } from "@/components/menu/menu";
import { initCollapse } from "@/components/collapse/collapse";
import { initAccordion } from "@/components/accordion/accordion";
import { CopyButton } from "@/components/copy/copy";
import { initAutogrowTextarea } from "@/components/textarea/AutogrowTextarea";
import { initPopover } from "@/components/popover/popover";
import { initToast, Toast } from "@/components/toast/toast";
import { initColorSchemeSwitcher } from "@/components/color-scheme-switcher/color-scheme-switcher";
import { initSteps } from "@/components/steps/steps";
import { initAvatar } from "@/components/avatar/avatar";
import { initPasswordToggle } from "@/components/input/password-input";

export function initBloum() {
  Tabs.register();
  TabList.register();
  Tab.register();
  TabPanel.register();
  CopyButton.register();

  // TODO: Remove ts-ignore
  // @ts-ignore
  window.Tooltip = Tooltip;
  // @ts-ignore
  window.Combobox = Combobox;
  // @ts-ignore
  window.Modal = Modal;
  // @ts-ignore
  window.Drawer = Drawer;
  // @ts-ignore
  window.Toast = Toast;

  initTooltip();
  initSidebar();
  initModals();
  initDrawers();
  initMenus();
  initCollapse();
  initAccordion();
  initAutogrowTextarea();
  initPopover();
  initToast();
  initColorSchemeSwitcher();
  initSteps();
  initAvatar();
  initPasswordToggle();
}
