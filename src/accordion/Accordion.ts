import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { CollapseEvent } from "../collapse/Collapse";
import { Details } from "../details/Details";

@customElement("bl-accordion")
export class Accordion extends LitElement {
  static styles = css`
    .accordion {
      display: grid;
      gap: var(--bl-accorion-gap, 0.5rem);
    }
  `;

  render() {
    return html`
      <div class="accordion" @toggled="${this._toggled}">
        <slot></slot>
      </div>
    `;
  }

  private _toggled(e: CustomEvent<CollapseEvent>) {
    // Close all other accordions
    if (e.detail.collapsed) {
      return;
    }
    const details = this.querySelectorAll<Details>("bl-details");
    details.forEach((accordion) => {
      if (accordion !== e.target) {
        accordion.collapse();
      }
    });
  }
}
