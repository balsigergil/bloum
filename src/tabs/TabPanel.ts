export class TabPanel extends HTMLElement {
  static NAME = "bl-tab-panel";
  static register() {
    customElements.define(this.NAME, TabPanel);
  }
  constructor() {
    super();
    this.classList.add("bl-tab-panel");
  }
  static get observedAttributes() {
    return ["selected"];
  }
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "selected") {
      this.setAttribute("aria-hidden", newValue === "true" ? "false" : "true");
    }
  }
}
