import { CLOSE_ICON } from "../utils/icons";

export class CloseButton extends HTMLButtonElement {
  static NAME = "bl-close-button";
  static register() {
    customElements.define(this.NAME, CloseButton, { extends: "button" });
  }

  connectedCallback() {
    this.classList.add("bl-close-button");
    this.innerHTML = CLOSE_ICON;
  }
}
