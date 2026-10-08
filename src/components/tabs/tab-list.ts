import { Tabs } from "./tabs";

export class TabList extends HTMLElement {
  static NAME = "bl-tab-list";
  static register() {
    if (customElements.get(this.NAME)) {
      return;
    }
    customElements.define(this.NAME, this);
  }

  private keydownHandler = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    const tabs = this.closest<Tabs>("bl-tabs");
    switch (e.key) {
      case "ArrowRight":
        tabs?.selectNextTab();
        break;
      case "ArrowLeft":
        tabs?.selectPreviousTab();
        break;
      case "Home":
        tabs?.selectFirstTab();
        break;
      case "End":
        tabs?.selectLastTab();
        break;
      default:
        return;
    }
    e.preventDefault();
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
