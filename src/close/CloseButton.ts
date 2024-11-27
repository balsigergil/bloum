import { CLOSE_ICON } from "../utils/icons";
import { css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("bl-close-button")
export class CloseButton extends LitElement {
  static styles = css`
    :host {
      transition: all var(--bl-transition) ease-in-out;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.125rem;
      height: 1.125rem;
      padding: 0.125rem;
      border-radius: var(--bl-border-radius);
    }

    :host(:hover) {
      background-color: color-mix(
        in srgb,
        var(--bl-clr-gray-500),
        transparent 85%
      );
    }

    :host:focus-visible {
      box-shadow: 0 0 0 2px var(--bl-clr-primary);
      outline: none;
    }

    :host svg {
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      fill: currentColor;
    }
  `;
  render() {
    return CLOSE_ICON;
  }
}
