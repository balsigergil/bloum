import { Tabs } from "./Tabs";

export class TabList extends HTMLElement {
  static NAME = "bl-tab-list";
  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("role", "tablist");

    this.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.closest<Tabs>("bl-tabs")?.selectNextTab();
      }
      if (e.key === "ArrowLeft") {
        this.closest<Tabs>("bl-tabs")?.selectPreviousTab();
      }
      if (e.key === "Home") {
        this.closest<Tabs>("bl-tabs")?.selectFirstTab();
      }
      if (e.key === "End") {
        this.closest<Tabs>("bl-tabs")?.selectLastTab();
      }
    });
  }
}
