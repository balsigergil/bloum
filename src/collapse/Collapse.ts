import { FOCUSABLE_ELEMENTS } from "../utils/constants";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

export interface CollapseEvent {
  collapsed: boolean;
}

@customElement("bl-collapse")
export class Collapse extends LitElement {
  @state()
  protected _isCollapsed = true;

  static styles = css`
    .collapse {
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

    .collapse.show {
      grid-template-rows: 1fr;
    }
  `;

  render() {
    const classes = {
      show: !this._isCollapsed,
    };
    return html`
      <div class="collapse ${classMap(classes)}">
        <div class="wrapper">
          <div class="padding">
            <slot></slot>
          </div>
        </div>
      </divc>
    `;
  }

  show() {
    this._isCollapsed = false;
    this.ariaHidden = "false";
    this.renderRoot.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    this._dispatchCustomEvent();
  }

  hide() {
    this._isCollapsed = true;
    this.ariaHidden = "true";
    this.renderRoot.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
    this._dispatchCustomEvent();
  }

  toggle() {
    if (this.isCollapsed()) {
      this.show();
    } else {
      this.hide();
    }
  }

  isCollapsed() {
    return this._isCollapsed;
  }

  private _dispatchCustomEvent() {
    this.dispatchEvent(
      new CustomEvent<CollapseEvent>("toggled", {
        detail: {
          collapsed: this._isCollapsed,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
