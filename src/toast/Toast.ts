import {
  ERROR_ICON,
  INFO_ICON,
  SUCCESS_ICON,
  WARNING_ICON,
} from "../utils/icons";
import { CloseButton } from "../close/CloseButton";

export type ToastStatus = "info" | "success" | "warning" | "error";

export interface ToastOptions {
  title: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
  isClosable?: boolean;
  onClose?: () => void;
}

export class Toast extends HTMLElement {
  static NAME = "bl-toast";

  #onClose?: () => void;

  static register() {
    customElements.define(this.NAME, Toast);
  }
  connectedCallback() {
    this.classList.add("bl-toast");
  }

  static show(options: ToastOptions) {
    const container = document.querySelector("bl-toast-container");
    if (container) {
      const toast = new Toast();
      toast.classList.add(options.status || "info");
      const content = document.createElement("div");
      content.classList.add("bl-toast-content");

      const title = document.createElement("div");
      title.classList.add("bl-toast-title");
      title.innerText = options.title;
      content.append(title);

      if (options.description !== undefined && options.description !== "") {
        const description = document.createElement("div");
        description.classList.add("bl-toast-description");
        description.innerText = options.description || "";
        content.append(description);
      }

      const icon = document.createElement("div");
      icon.classList.add("bl-toast-icon");
      switch (options.status) {
        case "info":
          icon.innerHTML = INFO_ICON;
          break;
        case "success":
          icon.innerHTML = SUCCESS_ICON;
          break;
        case "warning":
          icon.innerHTML = WARNING_ICON;
          break;
        case "error":
          icon.innerHTML = ERROR_ICON;
          break;
        default:
          break;
      }

      toast.append(icon, content);

      if (options.isClosable) {
        const close = new CloseButton();
        close.addEventListener("click", () => {
          toast.close();
        });
        toast.append(close);
      }

      container.append(toast);

      toast.#onClose = options.onClose;

      const duration = options.duration ?? 8000;
      if (duration <= 0) return toast;
      setTimeout(() => {
        toast.close();
      }, duration);
      return toast;
    } else {
      console.warn("No toast container found");
    }
  }

  static info(title: string, options?: Omit<ToastOptions, "title">) {
    return Toast.show({ ...options, title, status: "info" });
  }
  static success(title: string, options?: Omit<ToastOptions, "title">) {
    return Toast.show({ ...options, title, status: "success" });
  }
  static warning(title: string, options?: Omit<ToastOptions, "title">) {
    return Toast.show({ ...options, title, status: "warning" });
  }
  static error(title: string, options?: Omit<ToastOptions, "title">) {
    return Toast.show({ ...options, title, status: "error" });
  }

  close() {
    this.classList.add("fade-out");
    this.addEventListener("animationend", () => {
      this.#onClose?.();
      this.remove();
    });
  }
}
