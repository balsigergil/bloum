import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";

export class Tabs extends HTMLElement {
  static NAME = "bl-tabs";

  #selectedIndex = -1;
  #tabCount = 0;
  #useAnchor: boolean = false;

  static register() {
    customElements.define(this.NAME, Tabs);
  }

  connectedCallback() {
    this.classList.add("bl-tabs");
    const tabs = this.querySelectorAll<Tab>("bl-tab");
    this.#tabCount = tabs.length;
    tabs.forEach((t, i) =>
      t.addEventListener("click", (e) => {
        e.preventDefault();
        this.setSelected(i);
      }),
    );

    const useAnchor = this.hasAttribute("use-anchor");
    this.#useAnchor = useAnchor;
    if (useAnchor) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const tab = this.querySelector<Tab>(`bl-tab[href="${id}"]`);
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

    this.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.#selectNextTab();
      }
      if (e.key === "ArrowLeft") {
        this.#selectPreviousTab();
      }
    });
  }

  setSelected(index: number, focus: boolean = true) {
    if (index !== this.#selectedIndex && index >= 0) {
      if (this.#useAnchor) {
        const tabs = this.querySelectorAll<Tab>("bl-tab");
        const tab = tabs[index];
        const href = tab.getAttribute("href");
        if (href) {
          window.location.hash = href;
        }
      }

      this.#selectedIndex = index;
      const panels = this.querySelectorAll<TabPanel>("bl-tab-panel");
      for (let i = 0; i < panels.length; i++) {
        if (i === index) {
          panels[i].classList.add("show");
        } else {
          panels[i].classList.remove("show");
        }
      }

      const tabs = this.querySelectorAll<Tab>("bl-tab");
      for (let i = 0; i < tabs.length; i++) {
        if (index === i) {
          tabs[i].tabIndex = 0;
          if (focus) {
            tabs[i].focus();
          }
          tabs[i].classList.add("active");
        } else {
          tabs[i].tabIndex = -1;
          tabs[i].classList.remove("active");
        }
      }
    } else if (index < 0) {
      const panels = this.querySelectorAll<TabPanel>("bl-tab-panel");
      panels.forEach((p) => p.classList.remove("show"));
    }
  }

  #selectNextTab() {
    this.setSelected((this.#selectedIndex + 1) % this.#tabCount);
  }

  #selectPreviousTab() {
    this.setSelected(
      (this.#selectedIndex - 1 + this.#tabCount) % this.#tabCount,
    );
  }
}
