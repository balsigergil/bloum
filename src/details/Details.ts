import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Collapse, CollapseEvent } from "../collapse/Collapse";
import { classMap } from "lit/directives/class-map.js";

@customElement("bl-details")
export class Details extends LitElement {
  @property({ type: String })
  summary = "";

  @query("bl-collapse")
  private readonly _collapse: Collapse | undefined | null;

  static styles = css`
    .details {
      padding: var(--bl-details-padding, 0.75rem);
      border: 1px solid var(--bl-details-border-color, var(--bl-clr-gray-300));
      border-radius: var(--bl-border-radius);
    }

    .summary {
      display: flex;
      width: 100%;
      appearance: none;
      background: none;
      border: none;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 0;
      margin: 0;
      font: inherit;
      color: var(--bl-clr-gray-900);
    }

    .summary-text {
      font-weight: 600;
    }

    .content {
      padding-top: 0.5rem;
    }

    .summary-icon {
      color: var(--bl-clr-gray-600);
      transition: transform 0.2s ease-in-out;
    }
    .summary-icon.open {
      transform: rotate(90deg);
    }
  `;

  @state()
  private _isCollapsed = true;

  render() {
    return html`
      <div class="details">
        <button
          class="summary"
          @click="${this.toggle}"
          role="button"
          type="button"
        >
          ${this.summary
            ? html`<div class="summary-text">${this.summary}</div>`
            : html`<div><slot name="summary"></slot></div>`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="summary-icon ${classMap({
              open: !this._isCollapsed,
            })}"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        <bl-collapse
          class="collapse"
          @toggled="${(e: CustomEvent<CollapseEvent>) => {
            this._isCollapsed = e.detail.collapsed;
          }}"
        >
          <div class="content">
            <slot></slot>
          </div>
        </bl-collapse>
      </div>
    `;
  }

  toggle() {
    if (!this._collapse) {
      return;
    }
    this._collapse.toggle();
  }

  collapse() {
    if (!this._collapse) {
      return;
    }
    this._collapse.hide();
  }
}
