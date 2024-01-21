import { CLOSE_ICON } from "../utils/icons";

export class CloseButton extends HTMLElement {
  static NAME = "bl-close-button";
  static register() {
    customElements.define(this.NAME, CloseButton);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-close-button");
    this.role = "button";
    this.innerHTML = CLOSE_ICON;
    this.tabIndex = 0;
    this.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        this.dispatchEvent(new Event("click"));
        e.preventDefault();
      }
    });
  }
}
