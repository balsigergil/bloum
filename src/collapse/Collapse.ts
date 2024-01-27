import { FOCUSABLE_ELEMENTS } from "../utils/constants";

export interface CollapseEvent {
  expanded: boolean;
}

export class Collapse extends HTMLElement {
  NAME = "collapse";

  static register() {
    customElements.define("bl-collapse", this);
    document.querySelectorAll("[data-toggle='collapse']").forEach((element) => {
      element.addEventListener("click", () => {
        const targetString = element.getAttribute("data-target");
        if (targetString) {
          const target = document.querySelector<Collapse>(targetString);
          if (target) {
            target.toggle();
          }
        }
      });
    });
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-collapse");
    this.setAttribute("aria-hidden", "true");
    const wrapper = document.createElement("div");
    wrapper.classList.add("bl-collapse-wrapper");
    const paddingWrapper = document.createElement("div");
    paddingWrapper.classList.add("bl-collapse-padding");
    paddingWrapper.append(...this.childNodes);
    wrapper.append(paddingWrapper);
    this.append(wrapper);
    this.hide();
  }

  show() {
    this.ariaHidden = "false";
    this.classList.add("show");
    this.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    this.#dispatchCustomEvent();
  }

  hide() {
    this.ariaHidden = "true";
    this.classList.remove("show");
    this.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
    this.#dispatchCustomEvent();
  }

  toggle() {
    if (this.expanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  get expanded() {
    return this.classList.contains("show");
  }

  #dispatchCustomEvent() {
    this.dispatchEvent(
      new CustomEvent<CollapseEvent>("bl-collapse-toggled", {
        detail: {
          expanded: this.expanded,
        },
      }),
    );
  }
}
