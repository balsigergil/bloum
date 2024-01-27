import { Tabs } from "./Tabs";

export class TabPanel extends HTMLElement {
  static NAME = "bl-tab-panel";
  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(TabPanel.NAME);
    this.setAttribute("role", "tabpanel");
    this.tabIndex = 0;

    if (this.parentElement?.lastElementChild === this) {
      this.closest<Tabs>(".bl-tabs")?.init();
    }
  }
}
