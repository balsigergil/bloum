export class TabPanel extends HTMLElement {
  static NAME = "bl-tab-panel";
  static register() {
    customElements.define(this.NAME, TabPanel);
  }
  connectedCallback() {
    this.classList.add("bl-tab-panel");
  }
}
