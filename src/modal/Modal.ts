import { CloseButton } from "../close/CloseButton";

export class Modal extends HTMLElement {
  static NAME = "bl-modal";

  #listeners: Array<(e: any) => void> = [];
  #sourceElement?: HTMLElement;

  static register() {
    customElements.define(this.NAME, Modal);

    document.querySelectorAll<HTMLElement>("[data-modal]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const modalSelector = el.getAttribute("data-modal")!;
        const modal = document.querySelector<Modal>(modalSelector);
        if (modal) {
          modal.open(el);
        }
      });
    });
  }

  connectedCallback() {
    this.classList.add("bl-modal");
    this.role = "dialog";
    this.ariaModal = "false";
    const modalWrapper = document.createElement("div");
    modalWrapper.classList.add("bl-modal-wrapper");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("bl-modal-header");
    const title = document.createElement("div");
    title.classList.add("bl-modal-title");
    const titleText = this.getAttribute("title") || "";
    title.innerText = titleText;
    this.ariaLabel = titleText;
    this.removeAttribute("title");
    modalHeader.append(title);

    if (!this.hasAttribute("no-close-button")) {
      const closeButton = new CloseButton();
      closeButton.addEventListener("click", () => this.close());
      modalHeader.append(closeButton);
    }

    const modalBody = document.createElement("div");
    modalBody.classList.add("bl-modal-body");
    modalBody.append(...this.childNodes);

    modalWrapper.append(modalHeader, modalBody);

    this.addEventListener("click", (e) => {
      if (e.target === this) {
        this.close();
      }
    });

    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
      if (e.key === "Tab" && this.isOpen()) {
        const focusableElements = this.querySelectorAll<HTMLElement>(
          "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", keyDownListener);
    this.#listeners.push(keyDownListener);

    this.append(modalWrapper);
  }

  disconnectedCallback() {
    this.#listeners.forEach((l) => removeEventListener("keydown", l));
  }

  open(sourceElement?: HTMLElement) {
    this.#sourceElement = sourceElement;
    this.style.display = "flex";
    this.ariaModal = "true";
    setTimeout(() => this.classList.add("open"), 0);
    const focusableElements = this.querySelectorAll<HTMLElement>(
      "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
    );
    const first = focusableElements[0];
    first.focus();
  }

  close() {
    this.classList.remove("open");
    this.ariaModal = "false";
    setTimeout(() => (this.style.display = "none"), 150);
    if (this.#sourceElement) {
      this.#sourceElement.focus();
      this.#sourceElement = undefined;
    }
  }

  isOpen() {
    return this.classList.contains("open");
  }
}
