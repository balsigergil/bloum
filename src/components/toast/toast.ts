import { randomId } from "../../utils/random";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "primary" | "success" | "danger" | "warning";
  placement?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number; // milliseconds, 0 = no auto-dismiss
  closeable?: boolean;
}

interface ToastElement extends HTMLElement {
  bltoast?: Toast;
}

export class Toast {
  readonly #element: ToastElement;
  readonly #id: string;
  readonly #options: Required<ToastOptions>;
  #timeoutId: number | null = null;
  static #containers: Map<string, HTMLElement> = new Map();

  constructor(options: ToastOptions) {
    this.#id = `bl-toast-${randomId()}`;
    this.#options = {
      title: options.title,
      description: options.description || "",
      variant: options.variant || "default",
      placement: options.placement || "top-right",
      duration: options.duration !== undefined ? options.duration : 5000,
      closeable: options.closeable !== undefined ? options.closeable : true,
    };

    this.#element = this.#createElement();
    this.#element.bltoast = this;

    if (this.#options.closeable) {
      this.#addCloseButton();
    }

    this.#show();
  }

  #createElement(): ToastElement {
    const toast = document.createElement("div");
    toast.id = this.#id;
    toast.className = `toast toast-${this.#options.variant}`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");

    const content = document.createElement("div");
    content.className = "toast-content";

    const title = document.createElement("div");
    title.className = "toast-title";
    title.textContent = this.#options.title;
    content.appendChild(title);

    if (this.#options.description) {
      const description = document.createElement("div");
      description.className = "toast-description";
      description.textContent = this.#options.description;
      content.appendChild(description);
    }

    toast.appendChild(content);
    return toast as ToastElement;
  }

  #addCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.className = "toast-close";
    closeButton.setAttribute("aria-label", "Close notification");
    closeButton.innerHTML = `<svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    closeButton.addEventListener("click", () => this.dismiss());
    this.#element.appendChild(closeButton);
  }

  #getOrCreateContainer(): HTMLElement {
    const placement = this.#options.placement;
    let container = Toast.#containers.get(placement);

    if (!container) {
      container = document.createElement("div");
      container.className = `toast-container toast-container-${placement}`;
      document.body.appendChild(container);
      Toast.#containers.set(placement, container);
    }

    return container;
  }

  #show() {
    const container = this.#getOrCreateContainer();
    container.appendChild(this.#element);

    // Trigger reflow to ensure transition works
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.#element.offsetHeight;
    this.#element.classList.add("show");

    if (this.#options.duration > 0) {
      this.#timeoutId = window.setTimeout(() => {
        this.dismiss();
      }, this.#options.duration);
    }
  }

  dismiss() {
    if (this.#timeoutId !== null) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }

    this.#element.classList.remove("show");
    this.#element.addEventListener(
      "transitionend",
      () => {
        this.#element.remove();

        // Clean up empty containers
        const container = this.#element.parentElement;
        if (container && container.children.length === 0) {
          container.remove();
          Toast.#containers.delete(this.#options.placement);
        }
      },
      { once: true },
    );
  }

  // Static methods for creating toasts
  static show(options: ToastOptions): Toast {
    return new Toast(options);
  }

  static success(title: string, description?: string): Toast {
    return new Toast({
      title,
      description,
      variant: "success",
    });
  }

  static danger(title: string, description?: string): Toast {
    return new Toast({
      title,
      description,
      variant: "danger",
    });
  }

  static warning(title: string, description?: string): Toast {
    return new Toast({
      title,
      description,
      variant: "warning",
    });
  }

  static primary(title: string, description?: string): Toast {
    return new Toast({
      title,
      description,
      variant: "primary",
    });
  }

  static dismissAll() {
    document.querySelectorAll<ToastElement>(".toast").forEach((element) => {
      const toast = element.bltoast;
      if (toast) {
        toast.dismiss();
      }
    });
  }
}

export function initToast() {
  // Make Toast available globally
  // @ts-ignore
  window.Toast = Toast;
}
