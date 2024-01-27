export class Accordion extends HTMLElement {
  static NAME = "bl-accordion";

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(Accordion.NAME);
  }
}
