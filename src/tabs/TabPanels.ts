export class TabPanels extends HTMLElement {
  static NAME = "bl-tab-panels";
  static register() {
    customElements.define(this.NAME, TabPanels);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-tab-panels");
  }
}
