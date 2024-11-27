import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("bl-spinner")
export class Spinner extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
    }

    .spinner {
      box-sizing: border-box;
      aspect-ratio: 1;
      width: 100%;
      height: 100%;
      border: 0.2rem solid var(--bl-spinner-color, var(--bl-clr-primary));
      border-left-color: transparent;
      border-radius: 9999px;
      animation: spin 750ms linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  render() {
    return html`<div class="spinner"></div>`;
  }
}
