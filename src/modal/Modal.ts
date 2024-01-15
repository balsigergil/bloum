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
    const modalWrapper = document.createElement("div");
    modalWrapper.classList.add("bl-modal-wrapper");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("bl-modal-header");
    const title = document.createElement("div");
    title.classList.add("bl-modal-title");
    title.innerText = this.getAttribute("title") || "";
    this.removeAttribute("title");
    modalHeader.append(title);

    if (this.getAttribute("close-button") !== "false") {
      const closeButton = document.createElement("button");
      closeButton.classList.add("bl-modal-close-button");
      closeButton.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg>`;
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
    setTimeout(() => this.classList.add("open"), 0);
    const focusableElements = this.querySelectorAll<HTMLElement>(
      "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
    );
    const first = focusableElements[0];
    first.focus();
  }

  close() {
    this.classList.remove("open");
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
