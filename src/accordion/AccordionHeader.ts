import { AccordionBody } from "./AccordionBody";
import { AccordionItem } from "./AccordionItem";
import { Accordion } from "./Accordion";
import { randomId } from "../utils/random";

export class AccordionHeader extends HTMLElement {
  static NAME = "bl-accordion-header";

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(AccordionHeader.NAME);
    this.role = "heading";
    const btn = document.createElement("button");
    btn.role = "button";
    btn.append(...this.childNodes);

    btn.setAttribute("aria-expanded", "false");
    btn.id = `bl-id-${randomId()}`;

    btn.addEventListener("click", () => {
      const acc = this.closest(".bl-accordion-item") as AccordionItem;
      const body = acc.querySelector<AccordionBody>(".bl-accordion-body");
      if (body) {
        body.toggle();
        this.#closeOtherBody(body);
      }
    });
    this.append(btn);
  }

  #closeOtherBody(thisBody: AccordionBody) {
    const acc = this.closest(".bl-accordion") as Accordion;
    acc
      .querySelectorAll<AccordionBody>(".bl-accordion-body")
      .forEach((body) => {
        if (body !== thisBody) {
          body.hide();
        }
      });
  }
}
