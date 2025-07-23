import { initAccordion } from "../components/accordion/accordion";
import { initAvatar } from "../components/avatar/avatar";
import { initCollapse } from "../components/collapse/collapse";
import { initColorSchemeSwitcher } from "../components/color-scheme-switcher/color-scheme-switcher";
import { CopyButton } from "../components/copy/copy";
import { initDrawers } from "../components/drawer/drawer";
import { initPasswordToggle } from "../components/input/password-input";
import { initMenus } from "../components/menu/menu";
import { initModals } from "../components/modal/modal";
import { initPinInput } from "../components/pin-input/pin-input";
import { initPopover } from "../components/popover/popover";
import { initSidebar } from "../components/sidebar/sidebar";
import { initSteps } from "../components/steps/steps";
import { Tab } from "../components/tabs/tab";
import { TabList } from "../components/tabs/tab-list";
import { TabPanel } from "../components/tabs/tab-panel";
import { Tabs } from "../components/tabs/tabs";
import { initAutogrowTextarea } from "../components/textarea/autogrow-textarea";
import { initToast } from "../components/toast/toast";
import { initTooltip } from "../components/tooltip/tooltip";

export function init() {
  Tabs.register();
  TabList.register();
  Tab.register();
  TabPanel.register();
  CopyButton.register();

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
  initPinInput();
}
