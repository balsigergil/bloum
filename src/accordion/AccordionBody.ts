import { Collapse, CollapseEvent } from "../collapse/Collapse";

export class AccordionBody extends Collapse {
  static NAME = "bl-accordion-body";

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(AccordionBody.NAME);

    const associatedHeader = this.closest(
      ".bl-accordion-item",
    )?.querySelector<HTMLButtonElement>(".bl-accordion-header > button");
    if (associatedHeader) {
      associatedHeader.setAttribute("aria-controls", this.id);
      this.setAttribute("aria-labelledby", associatedHeader.id);
      this.role = "region";
    }

    this.addEventListener("bl-collapse-toggled", (e) => {
      const isExpanded = (e as CustomEvent<CollapseEvent>).detail.expanded;
      const btn = this.closest(
        ".bl-accordion-item",
      )?.querySelector<HTMLButtonElement>(".bl-accordion-header > button");
      if (btn) {
        btn.setAttribute("aria-expanded", isExpanded.toString());
      }
    });
  }
}
