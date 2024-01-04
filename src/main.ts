import "./style.scss";
import { Select } from "./select/Select.ts";
import { Modal } from "./modal/Modal.ts";
import { AlertDialog } from "./alert-dialog/AlertDialog.ts";

Select.register();
Modal.register();
AlertDialog.register();

export { Select, Modal, AlertDialog };
