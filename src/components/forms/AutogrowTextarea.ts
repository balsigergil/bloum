export class AutogrowTextarea {
  readonly #element: HTMLTextAreaElement;

  constructor(element: HTMLTextAreaElement) {
    this.#element = element;
    this.#element.addEventListener("focus", this.#onFocus.bind(this));
    this.#element.addEventListener("input", this.#onInput.bind(this));
  }

  #onFocus() {
    this.#autogrow();
    this.#element.removeEventListener("focus", this.#onFocus);
  }

  #onInput() {
    this.#autogrow();
  }

  #autogrow() {
    this.#element.style.overflow = "hidden";
    this.#element.style.height = "auto";
    this.#element.style.height = this.#element.scrollHeight + 2 + "px";
  }
}

export function initAutogrowTextarea() {
  document.querySelectorAll("textarea[data-autogrow]").forEach((element) => {
    new AutogrowTextarea(element as HTMLTextAreaElement);
  });
}
