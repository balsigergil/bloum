export class TabList extends HTMLElement {
  static NAME = "bl-tab-list";
  static register() {
    customElements.define(this.NAME, TabList);
  }
  connectedCallback() {
    this.classList.add("bl-tab-list");
  }
}
