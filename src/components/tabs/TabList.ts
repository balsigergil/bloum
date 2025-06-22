import { Tabs } from "./Tabs";

export class TabList extends HTMLElement {
  static NAME = "bl-tab-list";
  static register() {
    if (customElements.get(this.NAME)) {
      return;
    }
    customElements.define(this.NAME, this);
  }

  private keydownHandler = (e: KeyboardEvent) => {
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
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this.keydownHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this.keydownHandler);
  }
}
