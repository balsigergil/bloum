import "./style.scss";
import { Select } from "./select/Select.ts";
import { Modal } from "./modal/Modal.ts";

Select.register();
Modal.register();

export { Select, Modal };
