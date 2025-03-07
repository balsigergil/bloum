export interface BloumCollapseElement extends HTMLElement {
  blcollapse?: Collapse;
}

export class Collapse {
  readonly #element: BloumCollapseElement;

  constructor(element: BloumCollapseElement) {
    this.#element = element;
    document
      .querySelectorAll(`[data-collapse="#${element.id}"]`)
      .forEach((trigger) => {
        trigger.addEventListener("click", () => {
          this.toggle(trigger as HTMLElement);
        });
      });
    this.#element.blcollapse = this;
  }

  toggle(trigger: HTMLElement) {
    this.#element.classList.toggle("show");
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
}

export function initCollapse() {
  document.querySelectorAll(".collapse").forEach((collapse) => {
    new Collapse(collapse as BloumCollapseElement);
  });
}
