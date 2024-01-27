export class TabPanels extends HTMLElement {
  static NAME = "bl-tab-panels";
  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(TabPanels.NAME);
  }
}
