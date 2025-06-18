export interface BloumCollapseElement extends HTMLElement {
  blcollapse?: Collapse;
}

interface CollapseTrigger {
  element: HTMLElement;
  listener: (e: Event) => void;
}

export class Collapse {
  readonly #element: BloumCollapseElement;
  readonly #triggers: CollapseTrigger[] = [];

  constructor(element: BloumCollapseElement) {
    if (element.blcollapse) {
      element.blcollapse.destroy();
    }

    this.#element = element;

    document
      .querySelectorAll(`[data-collapse="#${element.id}"]`)
      .forEach((trigger) => {
        const listener = () => {
          this.toggle(trigger as HTMLElement);
        };
        this.#triggers.push({
          element: trigger as HTMLElement,
          listener: listener,
        });
        trigger.addEventListener("click", listener);
      });
    this.#element.blcollapse = this;
  }

  toggle(trigger: HTMLElement) {
    this.#element.classList.toggle("show");

    if (this.#element.classList.contains("show")) {
      this.#triggers.forEach((trigger) => {
        trigger.element.setAttribute("aria-expanded", "true");
      });
    } else {
      this.#triggers.forEach((trigger) => {
        trigger.element.setAttribute("aria-expanded", "false");
      });
    }

    document.dispatchEvent(
      new CustomEvent("toggle", {
        detail: {
          collapse: this.#element,
          trigger,
          show: this.#element.classList.contains("show"),
        },
      }),
    );
  }

  destroy() {
    this.#triggers.forEach((trigger) => {
      trigger.element.removeEventListener("click", trigger.listener);
    });
  }
}

export function initCollapse() {
  document.querySelectorAll(".collapsible").forEach((collapse) => {
    console.log("Collapse", collapse);
    new Collapse(collapse as BloumCollapseElement);
  });
}
