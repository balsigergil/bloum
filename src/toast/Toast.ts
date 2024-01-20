export type ToastStatus = "info" | "success" | "warning" | "error";

export class Toast extends HTMLElement {
  static NAME = "bl-toast";
  static register() {
    customElements.define(this.NAME, Toast);
  }
  connectedCallback() {
    this.classList.add("bl-toast");
  }

  static show(
    message: string,
    status: ToastStatus = "info",
    duration: number = 8000,
  ) {
    const container = document.querySelector("bl-toast-container");
    if (container) {
      const toast = new Toast();
      toast.classList.add(status);
      toast.innerHTML = message;
      container.append(toast);
      setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("animationend", () => {
          toast.remove();
        });
      }, duration);
      return toast;
    } else {
      console.warn("No toast container found");
    }
  }
}
