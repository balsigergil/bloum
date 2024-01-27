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
    wrapper.append(...this.childNodes);
    this.append(wrapper);
    this.hide();
  }

  show() {
    this.ariaHidden = "false";
    this.classList.add("show");
  }

  hide() {
    this.ariaHidden = "true";
    this.classList.remove("show");
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
}
