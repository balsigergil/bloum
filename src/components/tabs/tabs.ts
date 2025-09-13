import { Tab } from "./tab";
import { TabPanel } from "./tab-panel";

export class Tabs extends HTMLElement {
  static NAME = "bl-tabs";
  static register() {
    if (customElements.get(this.NAME)) {
      return;
    }
    customElements.define(this.NAME, this);
  }

  #selectedIndex = 0;
  #tabCount = 0;
  #useAnchor = false;

  constructor() {
    super();
  }

  connectedCallback() {
    // This is a workaround to ensure that the tabs are initialized after all the
    // tab panels have been connected to the DOM.
    setTimeout(() => {
      this.init();
    }, 1);
  }

  init() {
    const tabs = this.querySelectorAll<Tab>("bl-tab");
    this.#tabCount = tabs.length;

    tabs.forEach((t, i) => {
      const href = tabs[i].getAttribute("href");
      if (href) {
        tabs[i].setAttribute("aria-controls", href.slice(1));
      }
      t.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setSelected(i);
      });
    });

    const useAnchor = this.hasAttribute("use-anchor");
    this.#useAnchor = useAnchor;
    if (useAnchor) {
      const hash = window.location.hash;
      if (hash) {
        const tab = this.querySelector<Tab>(`bl-tab[href="${hash}"]`);
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
        const tabs = this.querySelectorAll<Tab>("bl-tab");
        const tab = tabs[index];
        const href = tab.getAttribute("href");
        if (href) {
          window.location.replace(href);
        }
      }

      this.#selectedIndex = index;

      const tabs = this.querySelectorAll<Tab>("bl-tab");
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

      const panels = this.querySelectorAll<TabPanel>("bl-tab-panel");
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

  selectFirstTab() {
    this.setSelected(0);
  }

  selectLastTab() {
    this.setSelected(this.#tabCount - 1);
  }
}
