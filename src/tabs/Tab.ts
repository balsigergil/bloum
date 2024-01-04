export class Tab extends HTMLButtonElement {
  static NAME = "bl-tab";
  static register() {
    customElements.define(this.NAME, Tab, {
      extends: "button",
    });
  }
  connectedCallback() {
    this.classList.add("bl-tab");
  }
}
