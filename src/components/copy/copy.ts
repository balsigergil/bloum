import checkIcon from "../../icons/check.svg?raw";

export class CopyButton extends HTMLElement {
  #children: string = "";

  static register() {
    if (customElements.get("bl-copy-button")) {
      return;
    }
    customElements.define("bl-copy-button", this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (!navigator.clipboard) {
      // The Clipboard API is not supported
      this.innerHTML = ``;
      return;
    }

    const children = this.children;
    if (children.length === 0) {
      this.innerHTML = ``;
      return;
    }

    // Save a copy of the children so we can restore them after the copy
    for (let i = 0; i < children.length; i++) {
      this.#children += children[i].outerHTML;
    }

    this.addEventListener("click", async () => {
      const value = this.getAttribute("value");
      if (!value) {
        return;
      }

      try {
        await navigator.clipboard.writeText(value);

        this.innerHTML = checkIcon;

        setTimeout(() => {
          this.innerHTML = this.#children;
        }, 2000);

        this.dispatchEvent(
          new CustomEvent("copied", {
            bubbles: true,
            composed: true,
          }),
        );
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    });
  }

  render() {}
}
