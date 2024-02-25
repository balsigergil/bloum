import { parseFormat } from "./date-utils";

export class DatePicker extends HTMLElement {
  static NAME = "bl-datepicker";

  static register() {
    customElements.define(DatePicker.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-datepicker", "open");

    const format = this.getAttribute("format") ?? "%d.%m.%Y";
    const parts = parseFormat(format);
    console.log(parts);

    if (!parts) {
      return;
    }
    for (let i = 0; i < parts.length; i++) {
      this.append(this.#initializeInputOfType(parts[i], i));
    }
  }

  #initializeInputOfType(type: string, index: number) {
    const input = document.createElement("input");
    const onFocus = (e: FocusEvent) => {
      e.preventDefault();
      const el = e.target as HTMLInputElement;
      el.setSelectionRange(0, el.value.length);
    };

    const onBlur = (e: FocusEvent) => {
      const el = e.target as HTMLInputElement;
      const value = parseInt(el.value);
      if (el.value === "" || isNaN(value)) {
        el.value = el.getAttribute("placeholder") ?? "";
      }
    };

    const incrementValue = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      const today = new Date();
      switch (type) {
        case "%d":
          if (isNaN(value)) {
            el.value = today.getDate().toString().padStart(2, "0");
          } else {
            if (value === 31) {
              el.value = "01";
            } else {
              el.value = (value + 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%m":
          if (isNaN(value)) {
            el.value = today.getMonth().toString().padStart(2, "0");
          } else {
            if (value === 12) {
              el.value = "01";
            } else {
              el.value = (value + 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%Y":
          if (isNaN(value)) {
            el.value = today.getFullYear().toString().padStart(4, "0");
          } else {
            if (value === 9999) {
              el.value = "0001";
            } else {
              el.value = (value + 1).toString().padStart(4, "0");
            }
          }
          break;
      }
    };

    const decrementValue = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      const today = new Date();
      switch (type) {
        case "%d":
          if (isNaN(value)) {
            el.value = today.getDate().toString().padStart(2, "0");
          } else {
            if (value === 1) {
              el.value = "31";
            } else {
              el.value = (value - 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%m":
          if (isNaN(value)) {
            el.value = today.getMonth().toString().padStart(2, "0");
          } else {
            if (value === 1) {
              el.value = "12";
            } else {
              el.value = (value - 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%Y":
          if (isNaN(value)) {
            el.value = today.getFullYear().toString().padStart(4, "0");
          } else {
            if (value === 1) {
              el.value = "9999";
            } else {
              el.value = (value - 1).toString().padStart(4, "0");
            }
          }
          break;
      }
    };

    const focusNext = (el: HTMLInputElement) => {
      const next = el.nextElementSibling as HTMLInputElement | null;
      if (next) {
        next.focus();
      }
    };

    const focusPrevious = (el: HTMLInputElement) => {
      const previous = el.previousElementSibling as HTMLInputElement | null;
      if (previous) {
        previous.focus();
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      const el = e.target as HTMLInputElement;

      if (e.key === "Backspace") {
        e.preventDefault();
        el.value = el.getAttribute("placeholder") ?? "";
        el.setSelectionRange(0, el.value.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusPrevious(el);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusNext(el);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        incrementValue(el);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        decrementValue(el);
      }
      if (e.key === "Tab") {
        return;
      }

      // Allow only numbers
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    const checkAndMoveToNext = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      if (isNaN(value)) {
        return;
      }
      switch (type) {
        case "%d":
          if (value > 3 && index < 2) {
            if (value > 31) {
              el.value = "31";
            }
            focusNext(el);
          }
          break;
        case "%m":
          if (value > 1 && index < 2) {
            if (value > 12) {
              el.value = "12";
            }
            focusNext(el);
          }
          break;
        case "%Y":
          if (el.value.length === 4 && index < 2) {
            if (value > 9999) {
              el.value = "9999";
            }
            focusNext(el);
          }
          break;
      }
    };

    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
    input.addEventListener("keydown", onKeydown);
    input.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement;
      checkAndMoveToNext(el);
    });

    switch (type) {
      case "%d":
        input.setAttribute("placeholder", "jj");
        input.value = "jj";
        break;
      case "%m":
        input.setAttribute("placeholder", "mm");
        input.value = "mm";
        break;
      case "%Y":
        input.setAttribute("placeholder", "aaaa");
        input.value = "aaaa";
        break;
    }
    return input;
  }
}
