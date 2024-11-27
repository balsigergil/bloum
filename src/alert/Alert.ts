import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

const SUCCESS_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="m9 12 2 2 4-4" />
</svg>`;

const INFO_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-info"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>`;

const WARNING_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
  />
  <path d="M12 9v4" />
  <path d="M12 17h.01" />
</svg>`;

const ERROR_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" x2="12" y1="8" y2="12" />
  <line x1="12" x2="12.01" y1="16" y2="16" />
</svg>`;

@customElement("bl-alert")
export class Alert extends LitElement {
  @property()
  status?: "info" | "error" | "success" | "warning" | "primary";

  @property({ type: Boolean })
  closable: boolean = false;

  @property({ type: Boolean })
  loading: boolean = false;

  @property({ type: String })
  header?: string;

  static styles = css`
    .alert {
      padding: 0.875rem 1rem;
      border-radius: var(--bl-alert-border-radius);
      background-color: var(--bl-alert-background);
      border-left: 3px solid var(--bl-alert-border-color);
      color: var(--bl-alert-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .alert-title {
      font-weight: 700;
    }

    .alert-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .alert-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .alert-icon svg {
      width: 100%;
      height: 100%;
    }

    .primary {
      --bl-alert-background: var(--bl-alert-background__primary);
      --bl-alert-color: var(--bl-alert-color__primary);
      --bl-alert-border-color: var(--bl-alert-border-color__primary);
      --bl-spinner-color: var(--bl-alert-color__primary);
    }

    .error {
      --bl-alert-background: var(--bl-alert-background__error);
      --bl-alert-color: var(--bl-alert-color__error);
      --bl-alert-border-color: var(--bl-alert-border-color__error);
      --bl-spinner-color: var(--bl-alert-color__error);
    }

    .info {
      --bl-alert-background: var(--bl-alert-background__info);
      --bl-alert-color: var(--bl-alert-color__info);
      --bl-alert-border-color: var(--bl-alert-border-color__info);
      --bl-spinner-color: var(--bl-alert-color__info);
    }

    .success {
      --bl-alert-background: var(--bl-alert-background__success);
      --bl-alert-color: var(--bl-alert-color__success);
      --bl-alert-border-color: var(--bl-alert-border-color__success);
      --bl-spinner-color: var(--bl-alert-color__success);
    }

    .warning {
      --bl-alert-background: var(--bl-alert-background__warning);
      --bl-alert-color: var(--bl-alert-color__warning);
      --bl-alert-border-color: var(--bl-alert-border-color__warning);
      --bl-spinner-color: var(--bl-alert-color__warning);
    }

    .close-icon {
      color: color-mix(in srgb, var(--bl-alert-color) 70%, transparent);
    }
  `;

  render() {
    const classes = {
      primary: this.status === "primary",
      info: this.status === "info",
      error: this.status === "error",
      success: this.status === "success",
      warning: this.status === "warning",
    };

    let icon = this._getIcon();
    if (this.loading) {
      icon = html`<bl-spinner></bl-spinner>`;
    }

    return html`
      <div class="alert ${classMap(classes)}">
        <div class="alert-content">
          ${icon && html`<div class="alert-icon">${icon}</div>`}
          <div>
            ${this.header &&
            html`<div class="alert-title">${this.header}</div>`}
            <slot></slot>
          </div>
        </div>
        ${this.closable
          ? html`
              <bl-close-button
                @click="${this._close}"
                class="close-icon"
              ></bl-close-button>
            `
          : ""}
      </div>
    `;
  }

  private _getIcon() {
    switch (this.status) {
      case "info":
        return INFO_ICON;
      case "error":
        return ERROR_ICON;
      case "success":
        return SUCCESS_ICON;
      case "warning":
        return WARNING_ICON;
      default:
        return null;
    }
  }

  private _close() {
    this.remove();
  }
}
