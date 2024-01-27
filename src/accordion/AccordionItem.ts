export class AccordionItem extends HTMLElement {
  static NAME = "bl-accordion-item";

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(AccordionItem.NAME);
  }
}
