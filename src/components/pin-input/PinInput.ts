export interface BloumPinInputElement extends HTMLInputElement {
  bloumPinInput?: PinInput;
}

export class PinInput {
  readonly #originalInput: BloumPinInputElement;
  readonly #container: HTMLDivElement;
  readonly #pinInputs: HTMLInputElement[] = [];
  readonly #size: number;

  constructor(element: BloumPinInputElement) {
    if (element.bloumPinInput !== undefined) {
      element.bloumPinInput.destroy();
    }

    this.#originalInput = element;
    this.#originalInput.bloumPinInput = this;

    // Get size from data attribute or default to 6
    this.#size = parseInt(
      element.getAttribute("data-pin-input-size") || "6",
      10,
    );

    // Hide the original input
    this.#originalInput.style.display = "none";
    this.#originalInput.setAttribute("type", "hidden");

    // Create container
    this.#container = document.createElement("div");
    this.#container.className = "pin-input";
    this.#container.setAttribute("data-pin-input-container", "");

    // Insert container after the original input
    this.#originalInput.parentNode?.insertBefore(
      this.#container,
      this.#originalInput.nextSibling,
    );

    this.#createPinInputs();
    this.#setupEventListeners();

    // Set initial value if present
    const initialValue = this.#originalInput.value;
    if (initialValue) {
      this.setValue(initialValue);
    }
  }

  #createPinInputs() {
    for (let i = 0; i < this.#size; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "input pin-input-field";
      input.setAttribute("inputmode", "numeric");
      input.setAttribute("pattern", "[0-9]");
      input.setAttribute("maxlength", "1");
      input.setAttribute("autocomplete", "off");
      input.setAttribute("data-index", i.toString());

      this.#container.appendChild(input);
      this.#pinInputs.push(input);
    }
  }

  #setupEventListeners() {
    this.#pinInputs.forEach((input, index) => {
      // Handle input
      input.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value;

        // Only allow numbers
        value = value.replace(/[^0-9]/g, "");
        target.value = value;

        if (value) {
          // Move to next input if available
          if (index < this.#pinInputs.length - 1) {
            this.#pinInputs[index + 1].focus();
          }
        }

        this.#updateOriginalInput();
      });

      // Handle keydown for backspace and navigation
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          const target = e.target as HTMLInputElement;
          if (!target.value && index > 0) {
            // Move to previous input and clear it
            this.#pinInputs[index - 1].focus();
            this.#pinInputs[index - 1].value = "";
            this.#updateOriginalInput();
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault();
          this.#pinInputs[index - 1].focus();
        } else if (
          e.key === "ArrowRight" &&
          index < this.#pinInputs.length - 1
        ) {
          e.preventDefault();
          this.#pinInputs[index + 1].focus();
        }
      });

      // Handle paste
      input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData?.getData("text") || "";
        const numbers = pastedData.replace(/[^0-9]/g, "");

        if (numbers) {
          this.setValue(numbers);
          // Focus the last filled input or the last input
          const focusIndex = Math.min(
            numbers.length - 1,
            this.#pinInputs.length - 1,
          );
          this.#pinInputs[focusIndex].focus();
        }
      });

      // Handle focus
      input.addEventListener("focus", () => {
        input.select();
      });
    });
  }

  setValue(value: string) {
    const numbers = value.replace(/[^0-9]/g, "");

    this.#pinInputs.forEach((input, index) => {
      input.value = numbers[index] || "";
    });

    this.#updateOriginalInput();
  }

  getValue(): string {
    return this.#pinInputs.map((input) => input.value).join("");
  }

  #updateOriginalInput() {
    this.#originalInput.value = this.getValue();

    // Dispatch input event for form validation and other listeners
    this.#originalInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  clear() {
    this.#pinInputs.forEach((input) => {
      input.value = "";
    });
    this.#updateOriginalInput();
    this.#pinInputs[0].focus();
  }

  focus() {
    // Focus the first empty input or the first input
    const firstEmpty = this.#pinInputs.find((input) => !input.value);
    (firstEmpty || this.#pinInputs[0]).focus();
  }

  destroy() {
    // Remove the container
    this.#container.remove();

    // Show the original input
    this.#originalInput.style.display = "";
    this.#originalInput.setAttribute("type", "text");

    // Remove reference
    delete this.#originalInput.bloumPinInput;
  }
}

export function initPinInput(container: HTMLElement | Document = document) {
  // Initialize existing pin inputs
  const pinInputs =
    container.querySelectorAll<BloumPinInputElement>("[data-pin-input]");
  pinInputs.forEach((input) => {
    if (input.bloumPinInput === undefined) {
      new PinInput(input);
    }
  });
}
