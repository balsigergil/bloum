export class ToastContainer extends HTMLElement {
  static NAME = "bl-toast-container";

  static register() {
    customElements.define(this.NAME, ToastContainer);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-toast-container");
  }
}
