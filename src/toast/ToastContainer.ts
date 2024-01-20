export class ToastContainer extends HTMLElement {
  static NAME = "bl-toast-container";

  static register() {
    customElements.define(this.NAME, ToastContainer);
  }

  connectedCallback() {
    this.classList.add("bl-toast-container");
  }
}
