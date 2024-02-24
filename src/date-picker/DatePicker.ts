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
    const input1 = document.createElement("input");
    input1.value = "jj";
    input1.setAttribute("default", "jj");
    const input2 = document.createElement("input");
    input2.value = "mm";
    input2.setAttribute("default", "mm");
    const input3 = document.createElement("input");
    input3.value = "aaaa";
    input3.setAttribute("default", "aaaa");

    const onFocus = (e: FocusEvent) => {
      e.preventDefault();
      const el = e.target as HTMLInputElement;
      el.setSelectionRange(0, el.value.length);
    };
    input1.addEventListener("focus", onFocus);
    input2.addEventListener("focus", onFocus);
    input3.addEventListener("focus", onFocus);

    const onKeydown = (e: KeyboardEvent) => {
      const el = e.target as HTMLInputElement;
      if (e.key === "Backspace") {
        e.preventDefault();
        el.value = el.getAttribute("default") ?? "";
        el.setSelectionRange(0, el.value.length);
      }
    };
    input1.addEventListener("keydown", onKeydown);
    input2.addEventListener("keydown", onKeydown);
    input3.addEventListener("keydown", onKeydown);

    this.append(input1, input2, input3);
  }
}
