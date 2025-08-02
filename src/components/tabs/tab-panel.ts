export class TabPanel extends HTMLElement {
  static NAME = "bl-tab-panel";
  static register() {
    if (customElements.get(this.NAME)) {
      return;
    }
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }
}
