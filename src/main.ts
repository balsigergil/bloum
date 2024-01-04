import "./style.scss";
import { Select } from "./select/Select.ts";
import { Modal } from "./modal/Modal.ts";
import { AlertDialog } from "./alert-dialog/AlertDialog.ts";
import { Tabs } from "./tabs/Tabs.ts";
import { TabList } from "./tabs/TabList.ts";
import { Tab } from "./tabs/Tab.ts";
import { TabPanels } from "./tabs/TabPanels.ts";
import { TabPanel } from "./tabs/TabPanel.ts";

Select.register();
Modal.register();
AlertDialog.register();

Tabs.register();
TabList.register();
Tab.register();
TabPanels.register();
TabPanel.register();

export { Select, Modal, AlertDialog };
