export class Tab extends HTMLElement {
  static NAME = "bl-tab";
  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("role", "tab");
  }
}
