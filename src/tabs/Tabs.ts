import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";

export class Tabs extends HTMLElement {
  static NAME = "bl-tabs";

  #selectedIndex = 0;
  #tabCount = 0;
  #useAnchor = false;

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(Tabs.NAME);
    this.setAttribute("role", "tablist");
  }

  init() {
    const tabs = this.querySelectorAll<Tab>(".bl-tab");
    this.#tabCount = tabs.length;
    tabs.forEach((t, i) => {
      t.addEventListener("click", (e) => {
        e.preventDefault();
        this.setSelected(i);
      });
    });

    const useAnchor = this.hasAttribute("use-anchor");
    this.#useAnchor = useAnchor;
    if (useAnchor) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const tab = this.querySelector<Tab>(`.bl-tab[href="${id}"]`);
        if (tab) {
          this.setSelected(Array.from(tabs).indexOf(tab), false);
        } else {
          this.setSelected(0, false);
        }
      } else {
        this.setSelected(0, false);
      }
    } else {
      this.setSelected(0, false);
    }
  }

  setSelected(index: number, focus: boolean = true) {
    if (index >= 0) {
      if (this.#useAnchor && focus) {
        const tabs = this.querySelectorAll<Tab>(".bl-tab");
        const tab = tabs[index];
        const href = tab.getAttribute("href");
        if (href) {
          window.location.hash = href;
        }
      }

      this.#selectedIndex = index;

      const tabs = this.querySelectorAll<Tab>(".bl-tab");
      for (let i = 0; i < tabs.length; i++) {
        if (index === i) {
          tabs[i].tabIndex = 0;
          tabs[i].classList.add("active");
          tabs[i].setAttribute("aria-selected", "true");
          if (focus) {
            tabs[i].focus();
          }
        } else {
          tabs[i].tabIndex = -1;
          tabs[i].classList.remove("active");
          tabs[i].setAttribute("aria-selected", "false");
        }
      }

      const panels = this.querySelectorAll<TabPanel>(".bl-tab-panel");
      for (let i = 0; i < panels.length; i++) {
        if (i === index) {
          panels[i].classList.add("show");
        } else {
          panels[i].classList.remove("show");
        }
      }
    }
  }

  selectNextTab() {
    this.setSelected((this.#selectedIndex + 1) % this.#tabCount);
  }

  selectPreviousTab() {
    this.setSelected(
      (this.#selectedIndex - 1 + this.#tabCount) % this.#tabCount,
    );
  }
}
