import { Tabs } from "./Tabs";

export class TabList extends HTMLElement {
  static NAME = "bl-tab-list";
  static register() {
    customElements.define(this.NAME, TabList);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-tab-list");

    this.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.closest<Tabs>("bl-tabs")?.selectNextTab();
      }
      if (e.key === "ArrowLeft") {
        this.closest<Tabs>("bl-tabs")?.selectPreviousTab();
      }
    });
  }
}
