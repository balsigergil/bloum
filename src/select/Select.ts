import { CloseButton } from "../close/CloseButton";

export class Select extends HTMLElement {
  static NAME = "bl-select";

  #select!: HTMLSelectElement;
  #input!: HTMLInputElement;
  #options: HTMLElement[] = [];
  #menu!: HTMLDivElement;
  #text!: HTMLDivElement;
  #valueContainer!: HTMLDivElement;
  #placeholder = "Choose an item";
  #onClick!: (e: MouseEvent) => void;
  #search: string = "";
  #selectedItems: boolean[] = [];
  #focusedItemIndex: number | null = null;
  #noResultText: string = "No result";
  #clearable: boolean = false;
  #searchable: boolean = false;
  #multiple: boolean = false;

  static register() {
    customElements.define(this.NAME, Select);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-select");
    this.#options = [...this.children] as HTMLElement[];

    this.#placeholder = this.getAttribute("placeholder") || "Choose an option";

    this.#clearable = this.hasAttribute("clearable");
    this.#searchable = this.hasAttribute("searchable");
    this.#multiple = this.hasAttribute("multiple");

    this.#select = document.createElement("select");
    this.#select.name = this.getAttribute("name") || "";
    if (this.#multiple) {
      this.#select.multiple = true;
    }

    this.#valueContainer = document.createElement("div");
    this.#valueContainer.classList.add("bl-select-value-container");
    if (this.#multiple) {
      this.#valueContainer.classList.add("multiple");
    }

    this.#text = document.createElement("div");
    this.#text.classList.add("bl-select-text");
    this.#text.innerHTML = `<div class="bl-select-placeholder">${this.#placeholder}</div>`;

    this.#input = document.createElement("input");
    this.#input.setAttribute("type", "search");
    this.#input.setAttribute("autocomplete", "off");
    this.#input.setAttribute("spellcheck", "false");
    this.#input.setAttribute("role", "combobox");
    this.#input.setAttribute("aria-autocomplete", "list");
    this.#input.setAttribute("aria-expanded", "false");
    if (!this.#searchable) {
      this.#input.readOnly = true;
    }
    this.#input.classList.add("bl-select-search-input");
    this.#input.addEventListener("input", () => this.#onInput());
    this.#input.addEventListener("focus", () => this.openMenu());
    this.#input.addEventListener("click", () => this.openMenu());
    this.#input.addEventListener("blur", (e) => {
      this.#checkEventAndCloseMenu(e);
    });
    this.#input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.#focusNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.#focusPrevious();
      }
      if (e.key === "Backspace" && this.#input.value === "" && this.#multiple) {
        e.preventDefault();
        if (this.#selectedItems.length > 0) {
          this.#deselectLast();
        }
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (this.#focusedItemIndex !== null) {
          this.#setSelected(this.#focusedItemIndex);
        }
        this.closeMenu();
      }
      if (!this.#searchable && e.key !== "Tab") {
        // Prevent the mouse cursor from disappearing when the user presses a key and the input is readonly
        e.preventDefault();
      }
    });
    this.#valueContainer.append(this.#text, this.#input);

    this.#menu = document.createElement("div");
    this.#menu.classList.add("bl-select-menu-wrapper");
    this.#menu.tabIndex = -1;
    this.#menu.setAttribute("role", "listbox");
    this.#options.forEach((o, i) => this.addOptionToMenu(o, i));

    const indicators = document.createElement("div");
    indicators.classList.add("bl-select-indicators");

    const indicator = document.createElement("div");
    indicator.classList.add("bl-select-indicator");
    indicator.innerHTML = `<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
    indicator.addEventListener("click", () => {
      this.openMenu();
    });

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

    this.#onClick = (e: MouseEvent) => {
      this.#checkEventAndCloseMenu(e);
    };
    document.addEventListener("click", this.#onClick);

    this.#noResultText =
      this.getAttribute("no-result-text") || this.#noResultText;

    this.append(this.#select, this.#valueContainer, indicators, this.#menu);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.#onClick);
  }

  get isMenuOpen() {
    return this.classList.contains("open");
  }

  get filteredOptions() {
    return this.#options.filter((_, i) => this.#matchSearch(i));
  }

  addOptionToMenu(option: HTMLElement, index: number) {
    const value = option.getAttribute("data-value") || index.toString();
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", value);
    this.#select.append(optionEl);

    option.classList.add("bl-select-menu-item");
    option.setAttribute("data-value", value);
    option.setAttribute("data-index", index.toString());
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
      this.updateList();
    });
    this.#menu.append(option);
    this.#selectedItems.push(false);
  }

  updateList() {
    let count = 0;

    if (this.#selectedItems.length > 0) {
      this.#text.innerHTML = "";
    }

    for (let i = 0; i < this.#options.length; i++) {
      const option = this.#options[i];
      const isSelected = this.#selectedItems[i];
      if (isSelected) {
        const selectedItem = document.createElement("div");
        selectedItem.classList.add("bl-select-selected-item");
        const clone = option.cloneNode(true) as HTMLElement;
        clone.classList.remove(
          "bl-select-menu-item",
          "focus",
          "selected",
          "filtered",
        );
        selectedItem.append(clone);
        option.setAttribute("aria-selected", "true");
        if (this.#multiple) {
          const closeButton = new CloseButton();
          closeButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.#setSelected(i);
          });
          selectedItem.append(closeButton);
          this.#text.append(selectedItem);
        } else {
          this.#text.innerHTML = "";
          this.#text.append(selectedItem);
        }
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
      this.#valueContainer.classList.add("has-value");
    } else {
      this.#select.selectedIndex = -1;
      this.#valueContainer.classList.remove("has-value");
      this.#text.innerHTML = `<div class="bl-select-placeholder">${this.#placeholder}</div>`;
    }

    this.#menu.querySelectorAll(".no-result").forEach((n) => n.remove());
    if (count === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("bl-select-menu-item");
      noResult.classList.add("no-result");
      noResult.textContent = this.#noResultText;
      this.#menu.append(noResult);
    }

    if (this.#selectedCount > 0 && this.#clearable) {
      this.querySelector(".bl-select-clear-button")?.classList.add("show");
    } else {
      this.querySelector(".bl-select-clear-button")?.classList.remove("show");
    }
  }

  openMenu() {
    this.classList.add("open");
    this.#input.focus();
    this.#input.setAttribute("aria-expanded", "true");
    this.#setFocused(this.#firstSelectedIndex() || 0);
  }

  closeMenu() {
    if (this.classList.contains("open")) {
      this.classList.remove("open");
      this.#text.classList.remove("filtered");
      this.#input.value = "";
      this.#input.setAttribute("aria-expanded", "false");
      this.#search = "";
    }
  }

  clear() {
    this.#selectedItems = this.#selectedItems.map(() => false);
    this.updateList();
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
    this.updateList();
    if (this.#search !== "") {
      this.#text.classList.add("filtered");
    } else {
      this.#text.classList.remove("filtered");
    }
  }

  #checkEventAndCloseMenu(e: Event) {
    let closest;
    if (e instanceof FocusEvent) {
      closest = (e.relatedTarget as HTMLElement)?.closest(Select.NAME);
      if (e.relatedTarget instanceof CloseButton) {
        this.closeMenu();
        return;
      }
    } else {
      closest = (e.target as HTMLElement)?.closest(Select.NAME);
    }
    if (closest === null || closest === undefined || closest !== this) {
      this.closeMenu();
    }
  }

  #setSelected(index: number) {
    if (this.#multiple) {
      this.#selectedItems[index] = !this.#selectedItems[index];
    } else {
      for (let i = 0; i < this.#selectedItems.length; i++) {
        this.#selectedItems[i] = index === i;
      }
    }
    this.updateList();
  }

  get #selectedCount(): number {
    return this.#selectedItems.filter((s) => s).length;
  }

  #setFocused(index: number, scrollTo = true) {
    this.#focusedItemIndex = index;
    if (scrollTo) {
      this.#options[index].scrollIntoView({
        block: "nearest",
      });
    }
    this.updateList();
  }

  #firstSelectedIndex(): number | null {
    for (let i = 0; i < this.#selectedItems.length; i++) {
      if (this.#selectedItems[i]) {
        return i;
      }
    }
    return null;
  }

  #deselectLast() {
    for (let i = this.#selectedItems.length - 1; i >= 0; i--) {
      if (this.#selectedItems[i]) {
        this.#selectedItems[i] = false;
        this.updateList();
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
