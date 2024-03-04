import { CloseButton } from "../close/CloseButton";

export interface SelectProps {
  placeholder?: string;
  selected?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  noResultsText?: string;
}

export class Select extends HTMLElement {
  static NAME = "bl-select";

  #select!: HTMLSelectElement;
  #input!: HTMLInputElement;
  #menu!: HTMLDivElement;
  #optionWrapper!: HTMLDivElement;
  #text!: HTMLDivElement;
  #placeholder = "Choose an item";
  #onClickEvent!: (e: MouseEvent) => void;
  #search: string = "";
  #optionFlags: boolean[] = [];
  #focusedItemIndex: number | null = null;
  #noResultsText: string = "No result";
  #clearable: boolean = false;
  #searchable: boolean = false;
  #multiple: boolean = false;
  #disabled: boolean = false;

  static register() {
    customElements.define(this.NAME, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(Select.NAME);

    this.tabIndex = 0;
    this.addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(() => {
        if (this.isMenuOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }, 0);
    });

    this.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        this.openMenu();
        e.preventDefault();
      }
    });

    this.#placeholder = this.getAttribute("placeholder") || "Choose an option";

    this.#clearable = this.hasAttribute("clearable");
    this.#searchable = this.hasAttribute("searchable");
    this.#multiple = this.hasAttribute("multiple");
    this.#disabled = this.hasAttribute("disabled");

    this.#select = document.createElement("select");
    this.#select.name = this.getAttribute("name") || "";
    if (this.#multiple) {
      this.#select.multiple = true;
    }

    this.#text = document.createElement("div");
    this.#text.classList.add("bl-select-text");

    this.#input = document.createElement("input");
    this.#input.setAttribute("type", "search");
    this.#input.setAttribute("autocomplete", "off");
    this.#input.setAttribute("spellcheck", "false");
    this.#input.setAttribute("role", "combobox");
    this.#input.setAttribute("aria-autocomplete", "list");
    this.#input.setAttribute("aria-expanded", "false");
    if (!this.#searchable || this.#disabled) {
      this.#input.readOnly = true;
    }
    this.#input.classList.add("bl-select-search");
    this.#input.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.#input.addEventListener("input", () => this.#onInput());
    this.#input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "ArrowDown") {
        e.stopPropagation();
        e.preventDefault();
        this.#focusNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        this.#focusPrevious();
      }
      if (e.key === "Backspace" && this.#input.value === "" && this.#multiple) {
        e.preventDefault();
        e.stopPropagation();
        if (this.#optionFlags.length > 0) {
          this.#deselectLast();
        }
      }
      if (e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (this.#focusedItemIndex !== null && this.isMenuOpen) {
          this.#setSelected(this.#focusedItemIndex);
        }
        this.closeMenu();
      }
    });

    this.#menu = document.createElement("div");
    this.#menu.classList.add("bl-select-menu");

    this.#menu.append(this.#input);
    this.#optionWrapper = document.createElement("div");
    this.#optionWrapper.classList.add("bl-select-options");
    this.#optionWrapper.setAttribute("role", "listbox");

    [...this.children].forEach((opt) =>
      this.addOptionToMenu(opt as HTMLElement),
    );

    this.#menu.append(this.#optionWrapper);

    const indicators = document.createElement("div");
    indicators.classList.add("bl-select-indicators");

    const indicator = document.createElement("div");
    indicator.classList.add("bl-select-indicator");
    indicator.innerHTML = `<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;

    const clearButton = new CloseButton();
    clearButton.classList.add("bl-select-clear-button");
    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.clear();
    });

    indicators.append(clearButton, indicator);

    const selected = this.getAttribute("selected") || "";
    const selectedIndex = this.#getOptionByValue(selected);
    if (selectedIndex !== null) {
      this.#setSelected(selectedIndex);
    }
    if (this.#options.length > 0) {
      this.#setFocused(0);
    }

    this.append(this.#select, this.#text, indicators, this.#menu);

    this.#onClickEvent = (e: MouseEvent) => {
      this.#checkEventAndCloseMenu(e);
    };
    document.addEventListener("click", this.#onClickEvent);

    this.#noResultsText =
      this.getAttribute("no-results-text") || this.#noResultsText;
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.#onClickEvent);
  }

  get isMenuOpen() {
    return this.classList.contains("open");
  }

  get filteredOptions() {
    return this.#options.filter((_, i) => this.#matchSearch(i));
  }

  addOptionToMenu(option: HTMLElement) {
    const value = option.dataset.value ?? "";
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", value);
    this.#select.append(optionEl);

    option.classList.add("bl-option");
    option.setAttribute("data-index", this.#optionFlags.length.toString());
    option.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const index = option.getAttribute("data-index");
      if (index !== null) {
        this.#setSelected(parseInt(index));
      }
      this.closeMenu();
    });
    option.addEventListener("mousemove", () => {
      const index = option.getAttribute("data-index");
      if (index !== null) {
        this.#setFocused(parseInt(index), false);
      }
      this.#updateList();
    });
    this.#optionWrapper.append(option);
    this.#optionFlags.push(false);
  }

  get #options(): HTMLElement[] {
    return Array.from(
      this.#optionWrapper.children as HTMLCollectionOf<HTMLElement>,
    );
  }

  #updateList() {
    let count = 0;

    if (this.#optionFlags.length > 0) {
      this.#text.innerHTML = "";
    }

    const options = this.#options;

    this.#text.innerHTML = "";
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const isSelected = this.#optionFlags[i];
      if (isSelected) {
        const clone = option.cloneNode(true) as HTMLElement;
        clone.classList.remove("bl-option", "focus", "selected", "filtered");
        option.setAttribute("aria-selected", "true");
        const textWrapper = document.createElement("div");
        textWrapper.classList.add("bl-select-text-wrapper");
        textWrapper.append(clone);
        if (this.#multiple) {
          const closeButton = new CloseButton();
          closeButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.#setSelected(i);
          });
          textWrapper.append(closeButton);
        }
        this.#text.append(textWrapper);
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
        option.setAttribute("aria-selected", "false");
      }
      (this.#select.childNodes[i] as HTMLOptionElement).selected = isSelected;

      if (i === this.#focusedItemIndex) {
        option.classList.add("focus");
      } else {
        option.classList.remove("focus");
      }

      if (
        option.textContent?.toLowerCase().includes(this.#search.toLowerCase())
      ) {
        option.classList.remove("filtered");
        count++;
      } else {
        option.classList.add("filtered");
      }
    }

    if (this.#selectedCount > 0) {
      this.classList.add("has-value");
    } else {
      this.#select.selectedIndex = -1;
      this.classList.remove("has-value");
      this.#text.innerHTML = `<div class="bl-select-placeholder">${this.#placeholder}</div>`;
    }

    this.#menu.querySelectorAll(".no-result").forEach((n) => n.remove());
    if (count === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("bl-select-menu-item");
      noResult.classList.add("no-result");
      noResult.textContent = this.#noResultsText;
      this.#menu.append(noResult);
    }

    if (this.#selectedCount > 0 && this.#clearable) {
      this.querySelector(".bl-select-clear-button")?.classList.add("show");
    } else {
      this.querySelector(".bl-select-clear-button")?.classList.remove("show");
    }
  }

  openMenu() {
    if (this.#disabled) {
      return;
    }
    this.classList.add("open");
    this.#input.focus();
    this.#input.setAttribute("aria-expanded", "true");
    this.#setFocused(this.#firstSelectedIndex() || 0);
  }

  closeMenu(focus = true) {
    if (this.classList.contains("open")) {
      this.classList.remove("open");
      this.#text.classList.remove("filtered");
      this.#input.value = "";
      this.#input.setAttribute("aria-expanded", "false");
      this.#search = "";
      if (focus) {
        this.focus();
      }
    }
  }

  clear() {
    this.#optionFlags = this.#optionFlags.map(() => false);
    this.#updateList();
  }

  #onInput() {
    this.openMenu();
    this.#search = this.#input.value || "";
    const options = this.filteredOptions;
    if (options.length > 0) {
      const index = this.#options[0].getAttribute("data-index");
      if (index !== null) {
        this.#setFocused(parseInt(index));
      }
    }
    this.#updateList();
    if (this.#search !== "") {
      this.#text.classList.add("filtered");
    } else {
      this.#text.classList.remove("filtered");
    }
  }

  #checkEventAndCloseMenu(e: Event, focus = true) {
    let target;
    if (e instanceof FocusEvent) {
      target = e.relatedTarget as Node;
    } else {
      target = e.target as Node;
    }
    if (!this.contains(target)) {
      this.closeMenu(focus);
    }
  }

  #setSelected(index: number) {
    if (this.#multiple) {
      this.#optionFlags[index] = !this.#optionFlags[index];
    } else {
      for (let i = 0; i < this.#optionFlags.length; i++) {
        this.#optionFlags[i] = index === i;
      }
    }
    this.#updateList();
  }

  get #selectedCount(): number {
    return this.#optionFlags.filter((s) => s).length;
  }

  #setFocused(index: number, scrollTo = true) {
    this.#focusedItemIndex = index;
    if (scrollTo) {
      this.#options[index].scrollIntoView({
        block: "nearest",
      });
    }
    this.#updateList();
  }

  #firstSelectedIndex(): number | null {
    for (let i = 0; i < this.#optionFlags.length; i++) {
      if (this.#optionFlags[i]) {
        return i;
      }
    }
    return null;
  }

  #deselectLast() {
    for (let i = this.#optionFlags.length - 1; i >= 0; i--) {
      if (this.#optionFlags[i]) {
        this.#optionFlags[i] = false;
        this.#updateList();
        return;
      }
    }
  }

  #focusNext() {
    if (this.isMenuOpen) {
      if (this.#focusedItemIndex !== null) {
        let nextIndex = null;
        if (this.#search !== "") {
          let currentIndex = this.#focusedItemIndex;
          const optionsLength = this.#options.length;
          // We loop through all items until we found the next item matching the filter
          while (currentIndex + 1 < optionsLength) {
            if (this.#matchSearch(currentIndex + 1)) {
              nextIndex = currentIndex + 1;
              break;
            }
            currentIndex++;
          }
        } else if (this.#focusedItemIndex + 1 < this.#options.length) {
          nextIndex = this.#focusedItemIndex + 1;
        }
        if (nextIndex !== null) {
          this.#setFocused(nextIndex, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  #focusPrevious() {
    if (this.isMenuOpen) {
      if (this.#focusedItemIndex !== null) {
        let previousIndex = null;
        if (this.#search !== "") {
          let currentIndex = this.#focusedItemIndex;
          // We loop through all items until we found the next item matching the filter
          while (currentIndex - 1 >= 0) {
            if (this.#matchSearch(currentIndex - 1)) {
              previousIndex = currentIndex - 1;
              break;
            }
            currentIndex--;
          }
        } else if (this.#focusedItemIndex - 1 >= 0) {
          previousIndex = this.#focusedItemIndex - 1;
        }
        if (previousIndex !== null) {
          this.#setFocused(previousIndex, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  #getOptionByValue(value: string): number | null {
    for (let i = 0; i < this.#options.length; i++) {
      if (this.#options[i].getAttribute("data-value") === value) {
        return i;
      }
    }
    return null;
  }

  #matchSearch(index: number): boolean {
    return (
      this.#options[index].textContent
        ?.toLowerCase()
        .includes(this.#search.toLowerCase()) || false
    );
  }
}
