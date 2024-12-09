export class AutogrowTextarea extends HTMLTextAreaElement {
  static NAME = "bl-autogrow";
  static register() {
    customElements.define(AutogrowTextarea.NAME, AutogrowTextarea, {
      extends: "textarea",
    });
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("focus", this.#onFocus.bind(this));
    this.addEventListener("input", this.#onInput.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("focus", this.#onFocus);
    this.removeEventListener("input", this.#onInput);
  }

  #onFocus() {
    this.#autogrow();
    this.removeEventListener("focus", this.#onFocus);
  }

  #onInput() {
    this.#autogrow();
  }

  #autogrow() {
    this.style.overflow = "hidden";
    this.style.height = "auto";
    this.style.height = this.scrollHeight + 2 + "px";
  }
}
