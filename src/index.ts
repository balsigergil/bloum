import { Select } from "./select/Select";
import { Modal } from "./modal/Modal";
import { AlertDialog } from "./alert-dialog/AlertDialog";
import { Tabs } from "./tabs/Tabs";
import { TabList } from "./tabs/TabList";
import { Tab } from "./tabs/Tab";
import { TabPanel } from "./tabs/TabPanel";
import { ToastContainer } from "./toast/ToastContainer";
import { Toast } from "./toast/Toast";
import { CloseButton } from "./close/CloseButton";
import { Collapse } from "./collapse/Collapse";
import { Accordion } from "./accordion/Accordion";
import { DatePicker } from "./date-picker/DatePicker";
import { Alert } from "./alert/Alert";
import { Spinner } from "./spinner/Spinner";

Select.register();

Modal.register();
AlertDialog.register();

Tabs.register();
TabList.register();
Tab.register();
TabPanel.register();

ToastContainer.register();
Toast.register();

DatePicker.register();

export { CloseButton };
export { Select, Modal, AlertDialog };
export { Tabs, TabList, Tab, TabPanel };
export { ToastContainer, Toast };
export { Collapse, Accordion };
export { DatePicker };
export { Alert };
export { Spinner };
export { Details } from "./details/Details";

window.Toast = Toast;

declare global {
  interface Window {
    Toast: typeof Toast;
  }
}

console.info("🚀 Bloom UI Components loaded!");
document.addEventListener("click", (e) => {
  if (e.target instanceof HTMLElement) {
    const element = e.target.closest("[data-toggle]");
    if (element === null) {
      return;
    }
    const toggleType = element.getAttribute("data-toggle");
    const id = element.getAttribute("data-target");
    if (toggleType === null || id === null) {
      return;
    }
    const target = document.querySelector(id);
    if (target === null) {
      return;
    }
    if (toggleType === "collapse" && target instanceof Collapse) {
      target.toggle();
    }
  }
});
