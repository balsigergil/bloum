import { Modal } from "../modal/Modal";

export class AlertDialog extends Modal {
  static NAME = "bl-alert-dialog";

  #cancelElement?: HTMLElement;

  static register() {
    customElements.define(this.NAME, AlertDialog);

    document.querySelectorAll<HTMLElement>("[data-alert]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const modalSelector = el.getAttribute("data-alert")!;
        const modal = document.querySelector<AlertDialog>(modalSelector);
        if (modal) {
          modal.open(el);
        }
      });
    });
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("no-close-button", "1");
    super.connectedCallback();
    this.classList.add("bl-alert-dialog");
    this.role = "alertdialog";
    const cancelSelector = this.getAttribute("cancel");
    if (cancelSelector) {
      const cancel = this.querySelector<HTMLElement>(cancelSelector);
      if (cancel) {
        this.#cancelElement = cancel;
        this.#cancelElement.addEventListener("click", () => this.close());
      }
    }
  }

  open(sourceElement?: HTMLElement) {
    super.open(sourceElement);
    if (this.#cancelElement) {
      this.#cancelElement.focus();
    }
  }
}
