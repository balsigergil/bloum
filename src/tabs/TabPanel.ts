export class TabPanel extends HTMLElement {
  static NAME = "bl-tab-panel";
  static register() {
    customElements.define(this.NAME, TabPanel);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-tab-panel");
    this.setAttribute("role", "tabpanel");
    this.tabIndex = 0;
  }
}
