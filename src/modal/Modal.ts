export class Modal extends HTMLElement {
  static NAME = "bl-modal";

  static register() {
    customElements.define(this.NAME, Modal);

    document.querySelectorAll("[data-modal]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const modalSelector = el.getAttribute("data-modal");
        const modal = document.querySelector<Modal>(modalSelector!);
        if (modal) {
          modal.open();
        }
      });
    });
  }

  connectedCallback() {
    const modalWrapper = document.createElement("div");
    modalWrapper.classList.add("bl-modal-wrapper");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("bl-modal-header");
    const title = document.createElement("div");
    title.classList.add("bl-modal-title");
    title.innerText = this.getAttribute("title") || "";
    this.removeAttribute("title");
    const closeButton = document.createElement("button");
    closeButton.classList.add("bl-modal-close-button");
    closeButton.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path>
      </svg>`;
    closeButton.addEventListener("click", () => this.close());
    modalHeader.append(title, closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("bl-modal-body");
    modalBody.append(...this.childNodes);

    modalWrapper.append(modalHeader, modalBody);

    this.addEventListener("click", (e) => {
      if (e.target === this) {
        this.close();
      }
    });

    this.append(modalWrapper);
  }

  open() {
    this.classList.add("open", "show");
  }

  close() {
    this.classList.remove("show");
    setTimeout(() => this.classList.remove("open"), 300);
  }

  isOpen() {
    return this.classList.contains("open");
  }
}
