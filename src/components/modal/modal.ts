import { FocusTrap, createFocusTrap } from "focus-trap";

export interface BloumModalElement extends HTMLElement {
  blmodal?: Modal;
}

export class Modal {
  readonly #element: BloumModalElement;
  readonly #focusTrap: FocusTrap;

  constructor(element: BloumModalElement) {
    if (element.blmodal !== undefined) {
      element.blmodal.destroy();
    }
    this.#element = element;
    this.#element.blmodal = this;
    this.#focusTrap = createFocusTrap(this.#element, {
      escapeDeactivates: false,
    });
  }

  open() {
    this.#element.classList.add("open");
    this.#element.setAttribute("aria-hidden", "false");
    this.#element.setAttribute("aria-modal", "true");
    this.#element.setAttribute("role", "dialog");
    try {
      this.#focusTrap.activate();
    } catch {
      console.warn("No focusable elements found in modal");
    }
  }

  close() {
    this.#element.classList.add("closing");
    this.#element.setAttribute("aria-hidden", "true");
    this.#element.removeAttribute("aria-modal");
    this.#element.removeAttribute("role");

    this.#element.addEventListener(
      "animationend",
      () => {
        this.#element.classList.remove("open");
        this.#element.classList.remove("closing");
        this.#focusTrap.deactivate();
      },
      { once: true },
    );
  }

  destroy() {
    this.#element.classList.remove("open");
    this.#focusTrap.deactivate();
    delete this.#element.blmodal;
  }

  static closeAllModals() {
    document.querySelectorAll(".modal.open").forEach((el) => {
      const modal = el as BloumModalElement;
      if (modal.blmodal !== undefined) {
        modal.blmodal.close();
      }
    });
  }
}

// Store references to event handlers for cleanup
let modalClickHandler: ((e: Event) => void) | null = null;
let modalKeydownHandler: ((e: KeyboardEvent) => void) | null = null;
let modalCustomEventHandler: (() => void) | null = null;

export function initModals() {
  for (const modal of document.querySelectorAll<BloumModalElement>(".modal")) {
    if (modal.blmodal === undefined) {
      new Modal(modal);
    }
  }

  // Clean up existing event listeners
  if (modalClickHandler) {
    removeEventListener("click", modalClickHandler);
  }
  if (modalKeydownHandler) {
    removeEventListener("keydown", modalKeydownHandler);
  }
  if (modalCustomEventHandler) {
    removeEventListener("bl-modal-close", modalCustomEventHandler);
  }

  // Create new event handlers
  modalClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    // Open modal when clicking on modal trigger
    if (target.closest("[data-modal]")) {
      const modalSelector = target
        .closest("[data-modal]")
        ?.getAttribute("data-modal") as string;
      const element = document.querySelector<BloumModalElement>(modalSelector);
      if (element) {
        if (element.blmodal === undefined) {
          new Modal(element);
        }
        element.blmodal?.open();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking on the close button
    if (target.closest("[data-modal-close]")) {
      const modal = target.closest<BloumModalElement>(".modal");
      if (modal !== null && modal.blmodal !== undefined) {
        modal.blmodal.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking outside
    if (target.closest(".modal.open") && !target.closest(".modal-content")) {
      const modal = target.closest<BloumModalElement>(".modal.open");
      if (modal !== null && modal.blmodal !== undefined) {
        modal.blmodal.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  modalKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Esc") {
      Modal.closeAllModals();
    }
  };

  modalCustomEventHandler = () => {
    Modal.closeAllModals();
  };

  // Add new event listeners
  addEventListener("click", modalClickHandler);
  addEventListener("keydown", modalKeydownHandler);
  addEventListener("bl-modal-close", modalCustomEventHandler);
}
