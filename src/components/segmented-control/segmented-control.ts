export interface SegmentedControlConfig {
  /**
   * Size of the control. Defaults to `md`.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Stretch the control to the full width of its container and give every
   * segment the same width. Defaults to `false`.
   */
  block?: boolean;
}

export interface BloumSegmentedControlElement extends HTMLSelectElement {
  blSegmentedControl?: SegmentedControl;
}

const DEFAULT_CONFIG: Required<SegmentedControlConfig> = {
  size: "md",
  block: false,
};

// Used to generate unique ids when a label needs to be referenced
let instanceCount = 0;

/**
 * A segmented control is a horizontal set of exclusive options, backed by a
 * native `<select>` element so it works inside plain HTML forms. The select is
 * hidden and stays the source of truth: it holds the options, the current
 * value, the `name` submitted with the form and the disabled state.
 */
export class SegmentedControl {
  // The underlying select element
  readonly #field: BloumSegmentedControlElement;

  // All options to configure the component
  readonly #config: Required<SegmentedControlConfig>;

  readonly #container: HTMLDivElement;
  readonly #indicator: HTMLSpanElement;
  #items: HTMLButtonElement[] = [];
  #selectedIndex = -1;

  #labels: HTMLLabelElement[] = [];
  #form: HTMLFormElement | null = null;

  readonly #resizeObserver = new ResizeObserver(() => this.#updateIndicator());
  readonly #removalObserver: MutationObserver;

  // Set while the component writes to the underlying select, to ignore the
  // events it dispatches itself
  #syncing = false;

  #destroyed = false;

  constructor(
    element: string | BloumSegmentedControlElement,
    config?: SegmentedControlConfig,
  ) {
    if (typeof element === "string") {
      const domElement =
        document.querySelector<BloumSegmentedControlElement>(element);
      if (domElement === null) {
        throw new Error(
          `Element ${element} not found to initialize BlSegmentedControl`,
        );
      }
      element = domElement;
    }

    if (!(element instanceof HTMLSelectElement)) {
      throw new Error(
        "A segmented control must be initialized on a <select> element",
      );
    }

    if (element.blSegmentedControl !== undefined) {
      element.blSegmentedControl.destroy();
    }

    // Clear adjacent container if any (needed for HTMX compatibility with hx-boost)
    while (
      element.nextElementSibling?.classList.contains("segmented-control")
    ) {
      element.nextElementSibling.remove();
    }

    if (element.multiple) {
      console.warn(
        "A segmented control is a single choice control, the `multiple` attribute is ignored",
      );
    }

    this.#field = element;
    this.#field.blSegmentedControl = this;
    this.#field.style.display = "none";
    this.#config = parseConfig(this.#field, config);

    this.#container = document.createElement("div");
    this.#indicator = document.createElement("span");

    // Watch for element removal from DOM (e.g., HTMX swaps)
    this.#removalObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const removed of mutation.removedNodes) {
          if (
            removed === this.#field ||
            (removed instanceof Element && removed.contains(this.#field))
          ) {
            this.destroy();
            return;
          }
        }
      }
    });

    this.#render();
    this.#selectedIndex = this.#field.selectedIndex;
    this.#updateItems();
    this.#updateIndicator();
    this.#initializeEvents();

    // Only animate the indicator once it sits under the initial value
    requestAnimationFrame(() => {
      if (this.#destroyed) return;
      this.#container.classList.add("ready");
    });
  }

  /**
   * The value of the underlying select element.
   */
  get value(): string {
    return this.#field.value;
  }

  set value(value: string) {
    const index = Array.from(this.#field.options).findIndex(
      (option) => option.value === value,
    );
    if (index === -1) return;
    this.select(index);
  }

  /**
   * Index of the currently selected segment, or -1 if none is selected.
   */
  get selectedIndex(): number {
    return this.#selectedIndex;
  }

  /**
   * Select the segment at the given index.
   * @param index Index of the segment to select
   * @param emitChange Dispatch `input` and `change` on the select element.
   *   Defaults to false, like a programmatic assignment on a native select.
   */
  select(index: number, emitChange = false) {
    const item = this.#items[index];
    if (item === undefined || item.disabled) return;
    if (index === this.#selectedIndex) return;

    this.#selectedIndex = index;
    this.#field.selectedIndex = index;
    this.#updateItems();
    this.#updateIndicator();

    if (emitChange) {
      this.#syncing = true;
      this.#field.dispatchEvent(new Event("input", { bubbles: true }));
      this.#field.dispatchEvent(new Event("change", { bubbles: true }));
      this.#syncing = false;
    }
  }

  /**
   * Rebuild the control from the underlying select element. Call it after
   * changing its options, its value or its disabled state programmatically.
   */
  sync() {
    if (this.#destroyed) return;
    this.#createItems();
    this.#selectedIndex = this.#field.selectedIndex;
    this.#updateItems();
    this.#updateIndicator();
  }

  /**
   * Focus the control.
   */
  focus() {
    const item =
      this.#items[this.#selectedIndex] ??
      this.#items.find((item) => !item.disabled);
    item?.focus();
  }

  /**
   * Destroy the component, restore the select element and remove all event
   * listeners.
   */
  destroy() {
    this.#destroyed = true;
    this.#resizeObserver.disconnect();
    this.#removalObserver.disconnect();
    this.#container.removeEventListener("click", this.#clickHandler);
    this.#container.removeEventListener("keydown", this.#keydownHandler);
    this.#field.removeEventListener("change", this.#fieldChangeHandler);
    this.#form?.removeEventListener("reset", this.#formResetHandler);
    this.#labels.forEach((label) =>
      label.removeEventListener("click", this.#labelClickHandler),
    );
    this.#container.remove();
    this.#field.style.display = "";
    delete this.#field.blSegmentedControl;
  }

  /**
   * Render the component. Should be called only once when the component is
   * initialized.
   * @private
   */
  #render() {
    this.#container.classList.add("segmented-control");
    if (this.#config.size !== "md") {
      this.#container.classList.add(`segmented-control-${this.#config.size}`);
    }
    if (this.#config.block) {
      this.#container.classList.add("segmented-control-block");
    }
    this.#container.setAttribute("role", "radiogroup");

    this.#indicator.classList.add("segmented-control-indicator");
    this.#indicator.setAttribute("aria-hidden", "true");
    this.#container.appendChild(this.#indicator);

    // Insert the control right after the select it is bound to
    this.#field.parentNode?.insertBefore(
      this.#container,
      this.#field.nextSibling,
    );

    this.#linkLabels();
    this.#createItems();
  }

  /**
   * Label elements pointing at the select can't reach it once it is hidden, so
   * they are wired to the control instead.
   * @private
   */
  #linkLabels() {
    this.#labels = Array.from(this.#field.labels ?? []);
    if (this.#labels.length === 0) return;

    const id = this.#field.id || `bl-segmented-control-${++instanceCount}`;
    const ids = this.#labels.map((label, index) => {
      if (!label.id) {
        label.id = `${id}-label-${index}`;
      }
      label.addEventListener("click", this.#labelClickHandler);
      return label.id;
    });

    this.#container.setAttribute("aria-labelledby", ids.join(" "));
  }

  /**
   * Create one segment per option of the select element.
   * @private
   */
  #createItems() {
    this.#items.forEach((item) => item.remove());
    this.#items = Array.from(this.#field.options).map((option) => {
      const item = document.createElement("button");
      item.type = "button";
      item.classList.add("segmented-control-item");
      item.setAttribute("role", "radio");
      item.disabled = option.disabled || this.#field.disabled;
      item.tabIndex = -1;

      const icon = option.dataset.icon;
      if (icon) {
        const iconElement = document.createElement("span");
        iconElement.classList.add("segmented-control-icon");
        iconElement.setAttribute("aria-hidden", "true");
        iconElement.innerHTML = icon;
        item.appendChild(iconElement);
      }

      const text = option.textContent?.trim() ?? "";
      if (text) {
        const label = document.createElement("span");
        label.classList.add("segmented-control-label");
        label.textContent = text;
        item.appendChild(label);
      } else {
        // Icon only segments still need an accessible name
        item.setAttribute(
          "aria-label",
          option.getAttribute("label") || option.value,
        );
      }

      this.#container.appendChild(item);
      return item;
    });

    this.#container.classList.toggle("disabled", this.#field.disabled);
  }

  /**
   * Reflect the current selection on the segments. The selected segment is the
   * only tab stop of the control (roving tabindex).
   * @private
   */
  #updateItems() {
    this.#items.forEach((item, index) => {
      const selected = index === this.#selectedIndex;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-checked", selected.toString());
      item.tabIndex = selected ? 0 : -1;
    });

    // Keep the control reachable with the keyboard when nothing is selected
    if (this.#selectedIndex === -1) {
      const firstEnabled = this.#items.find((item) => !item.disabled);
      if (firstEnabled) {
        firstEnabled.tabIndex = 0;
      }
    }
  }

  /**
   * Move the sliding indicator under the selected segment.
   * @private
   */
  #updateIndicator() {
    const item = this.#items[this.#selectedIndex];
    if (item === undefined) {
      this.#indicator.hidden = true;
      return;
    }

    this.#indicator.hidden = false;
    this.#indicator.style.setProperty(
      "--bl-segmented-indicator-x",
      `${item.offsetLeft}px`,
    );
    this.#indicator.style.setProperty(
      "--bl-segmented-indicator-width",
      `${item.offsetWidth}px`,
    );
  }

  #initializeEvents() {
    this.#container.addEventListener("click", this.#clickHandler);
    this.#container.addEventListener("keydown", this.#keydownHandler);

    // Keep in sync when the value is changed from the outside
    this.#field.addEventListener("change", this.#fieldChangeHandler);

    this.#form = this.#field.form;
    this.#form?.addEventListener("reset", this.#formResetHandler);

    // Segment widths depend on the available space and on the loaded fonts
    this.#resizeObserver.observe(this.#container);

    this.#removalObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  readonly #clickHandler = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest(
      ".segmented-control-item",
    );
    const index = this.#items.indexOf(target as HTMLButtonElement);
    if (index === -1) return;

    this.select(index, true);
    this.#items[index].focus();
  };

  readonly #keydownHandler = (event: KeyboardEvent) => {
    let index: number | null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        index = this.#nextEnabledIndex(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        index = this.#nextEnabledIndex(-1);
        break;
      case "Home":
        index = this.#edgeEnabledIndex(1);
        break;
      case "End":
        index = this.#edgeEnabledIndex(-1);
        break;
      default:
        return;
    }

    event.preventDefault();
    if (index === null) return;

    this.select(index, true);
    this.#items[index].focus();
  };

  readonly #fieldChangeHandler = () => {
    if (this.#syncing) return;
    this.sync();
  };

  readonly #formResetHandler = () => {
    // The select is reset after the event has been dispatched
    requestAnimationFrame(() => this.sync());
  };

  readonly #labelClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    this.focus();
  };

  /**
   * Index of the next enabled segment in the given direction, wrapping around.
   * @private
   */
  #nextEnabledIndex(direction: 1 | -1): number | null {
    const count = this.#items.length;
    if (count === 0) return null;

    const start =
      this.#selectedIndex === -1
        ? direction === 1
          ? -1
          : count
        : this.#selectedIndex;

    for (let i = 1; i <= count; i++) {
      const index = (((start + i * direction) % count) + count) % count;
      if (!this.#items[index].disabled) return index;
    }

    return null;
  }

  /**
   * Index of the first (direction 1) or last (direction -1) enabled segment.
   * @private
   */
  #edgeEnabledIndex(direction: 1 | -1): number | null {
    const items = direction === 1 ? this.#items : [...this.#items].reverse();
    const item = items.find((item) => !item.disabled);
    return item === undefined ? null : this.#items.indexOf(item);
  }
}

function parseConfig(
  field: HTMLSelectElement,
  config?: SegmentedControlConfig,
): Required<SegmentedControlConfig> {
  const parsedConfig = { ...DEFAULT_CONFIG, ...config };

  const size = field.dataset.segmentedControlSize;
  if (size === "sm" || size === "md" || size === "lg") {
    parsedConfig.size = size;
  }

  const block = field.dataset.segmentedControlBlock;
  if (block !== undefined) {
    parsedConfig.block = block !== "false";
  }

  return parsedConfig;
}

export function initSegmentedControl(
  container: HTMLElement | Document = document,
) {
  const fields = container.querySelectorAll<BloumSegmentedControlElement>(
    "select[data-segmented-control]",
  );
  fields.forEach((field) => {
    if (field.blSegmentedControl === undefined) {
      new SegmentedControl(field);
    }
  });
}
