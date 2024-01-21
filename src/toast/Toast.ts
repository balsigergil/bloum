export type ToastStatus = "info" | "success" | "warning" | "error";

export interface ToastOptions {
  title?: string;
  message: string;
  status?: ToastStatus;
  duration?: number;
  isClosable?: boolean;
  onClose?: () => void;
}

const INFO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
const SUCCESS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
const WARNING_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`;
const ERROR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`;

export class Toast extends HTMLElement {
  static NAME = "bl-toast";
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

      if (options.title !== undefined && options.title !== "") {
        const title = document.createElement("div");
        title.classList.add("bl-toast-title");
        title.innerText = options.title || "";
        content.append(title);
      }
      const message = document.createElement("div");
      message.classList.add("bl-toast-message");
      message.innerText = options.message;
      content.append(message);

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
      container.append(toast);
      setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("animationend", () => {
          toast.remove();
        });
      }, options.duration || 8000);
      return toast;
    } else {
      console.warn("No toast container found");
    }
  }

  static info(message: string, options?: ToastOptions) {
    return Toast.show({ ...options, message, status: "info" });
  }
  static success(message: string, options?: ToastOptions) {
    return Toast.show({ ...options, message, status: "success" });
  }
  static warning(message: string, options?: ToastOptions) {
    return Toast.show({ ...options, message, status: "warning" });
  }
  static error(message: string, options?: ToastOptions) {
    return Toast.show({ ...options, message, status: "error" });
  }
}
