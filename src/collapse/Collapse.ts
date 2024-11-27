import { FOCUSABLE_ELEMENTS } from "../utils/constants";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export interface CollapseEvent {
  expanded: boolean;
}

@customElement("bl-collapse")
export class Collapse extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--bl-collapse-transition, 200ms)
        ease-in-out;
    }

    .wrapper {
      overflow: hidden;
    }

    .padding {
      padding: var(--bl-collapse-padding, 0);
    }

    :host(.show) {
      grid-template-rows: 1fr;
    }
  `;

  render() {
    return html`
      <div class="wrapper">
        <div class="padding">
          <slot></slot>
        </div>
      </div>
    `;
  }

  show() {
    this.ariaHidden = "false";
    this.classList.add("show");
    this.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    this.#dispatchCustomEvent();
  }

  hide() {
    this.ariaHidden = "true";
    this.classList.remove("show");
    this.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
    this.#dispatchCustomEvent();
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

  #dispatchCustomEvent() {
    this.dispatchEvent(
      new CustomEvent<CollapseEvent>("bl-collapse-toggled", {
        detail: {
          expanded: this.expanded,
        },
      }),
    );
  }
}
