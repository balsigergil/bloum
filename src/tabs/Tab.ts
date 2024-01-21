export class Tab extends HTMLElement {
  static NAME = "bl-tab";
  static register() {
    customElements.define(this.NAME, Tab);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-tab");
    this.setAttribute("role", "tab");
  }
}
