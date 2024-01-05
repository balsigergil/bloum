import { Select } from "./select/Select";
import { Modal } from "./modal/Modal";
import { AlertDialog } from "./alert-dialog/AlertDialog";
import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanels } from "./tabs/TabPanels";
import { TabPanel } from "./tabs/TabPanel";

Select.register();
Modal.register();
AlertDialog.register();

Tabs.register();
TabList.register();
Tab.register();
TabPanels.register();
TabPanel.register();

export { Select, Modal, AlertDialog };
