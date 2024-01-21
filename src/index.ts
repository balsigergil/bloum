import { Select } from "./select/Select";
import { Modal } from "./modal/Modal";
import { AlertDialog } from "./alert-dialog/AlertDialog";
import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanels } from "./tabs/TabPanels";
import { TabPanel } from "./tabs/TabPanel";
import { ToastContainer } from "./toast/ToastContainer";
import { Toast } from "./toast/Toast";
import { CloseButton } from "./close/CloseButton";

CloseButton.register();

Select.register();
Modal.register();
AlertDialog.register();

Tabs.register();
TabList.register();
Tab.register();
TabPanels.register();
TabPanel.register();

ToastContainer.register();
Toast.register();

export { CloseButton };
export { Select, Modal, AlertDialog };
export { Tabs, TabList, Tab, TabPanels, TabPanel };
export { ToastContainer, Toast };

window.Toast = Toast;

declare global {
  interface Window {
    Toast: typeof Toast;
  }
}
