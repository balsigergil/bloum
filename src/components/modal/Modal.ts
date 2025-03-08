import { FocusTrap, createFocusTrap } from "focus-trap";

export interface BloumModalElement extends HTMLElement {
  bloumModal?: Modal;
}

export class Modal {
  readonly #element: BloumModalElement;
  readonly #focusTrap: FocusTrap;

  constructor(element: BloumModalElement) {
    this.#element = element;
    this.#element.bloumModal = this;
    this.#focusTrap = createFocusTrap(this.#element);
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

    this.#element.addEventListener(
      "animationend",
      () => {
        this.#element.classList.remove("open");
        this.#element.classList.remove("closing");
        this.#element.setAttribute("aria-hidden", "true");
        this.#element.removeAttribute("aria-modal");
        this.#element.removeAttribute("role");
        this.#focusTrap.deactivate();
      },
      { once: true },
    );
  }

  destroy() {
    this.#element.classList.remove("open");
    this.#focusTrap.deactivate();
    delete this.#element.bloumModal;
  }
}

export function initModals() {
  addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Open modal when clicking on modal trigger
    if (target.closest("[data-modal]")) {
      const modalSelector = target
        .closest("[data-modal]")
        ?.getAttribute("data-modal") as string;
      const element = document.querySelector<BloumModalElement>(modalSelector);
      if (element) {
        if (element.bloumModal === undefined) {
          new Modal(element);
        }
        element.bloumModal?.open();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking on the close button
    if (target.closest("[data-modal-close]")) {
      const modal = target.closest<BloumModalElement>(".modal");
      if (modal !== null && modal.bloumModal !== undefined) {
        modal.bloumModal.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking outside
    if (target.closest(".modal.open") && !target.closest(".modal-content")) {
      const modal = target.closest<BloumModalElement>(".modal.open");
      if (modal !== null && modal.bloumModal !== undefined) {
        modal.bloumModal.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeAllModals();
    }
  });

  addEventListener("bl-modal-close", () => {
    closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll(".modal.open").forEach((el) => {
    const modal = el as BloumModalElement;
    if (modal.bloumModal !== undefined) {
      modal.bloumModal.close();
    }
  });
}
