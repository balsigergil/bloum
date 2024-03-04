import { CloseButton } from "../close/CloseButton";
import { CHEVRON_DOWN_ICON, SEARCH_ICON } from "../utils/icons";

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
  #input: HTMLInputElement | undefined = undefined;
  #menu!: HTMLDivElement;
  #optionWrapper!: HTMLDivElement;
  #text!: HTMLDivElement;
  #placeholder = "Select an option...";
  #searchPlaceholder: string = "Search options...";
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
      if (e.key === "Tab") {
        this.closeMenu(false);
      }
      if (
        e.key === "Backspace" &&
        this.#input &&
        this.#input.value === "" &&
        this.#multiple
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (this.#optionFlags.length > 0) {
          this.#deselectLast();
        }
      }
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (this.isMenuOpen) {
          if (this.#focusedItemIndex !== null) {
            this.#setSelected(this.#focusedItemIndex);
          }
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    });

    if (this.hasAttribute("placeholder")) {
      this.#placeholder = this.getAttribute("placeholder")!;
    }
    if (this.hasAttribute("search-placeholder")) {
      this.#searchPlaceholder = this.getAttribute("search-placeholder")!;
    }

    this.#clearable = this.hasAttribute("clearable");
    this.#searchable = this.hasAttribute("searchable");
    this.#multiple = this.hasAttribute("multiple");
    this.#disabled = this.hasAttribute("disabled");
    if (this.#disabled) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }

    this.#select = document.createElement("select");
    this.#select.name = this.getAttribute("name") || "";
    if (this.#multiple) {
      this.#select.multiple = true;
    }

    this.#text = document.createElement("div");
    this.#text.classList.add("bl-select-text");

    this.#menu = document.createElement("div");
    this.#menu.classList.add("bl-select-menu");

    if (this.#searchable && !this.#disabled) {
      const searchWrapper = document.createElement("div");
      searchWrapper.classList.add("bl-select-search-wrapper");
      searchWrapper.addEventListener("click", (e) => {
        // Prevent the click to close the menu
        e.stopPropagation();
      });

      const searchIcon = document.createElement("div");
      searchIcon.classList.add("bl-select-search-icon");
      searchIcon.innerHTML = SEARCH_ICON;

      this.#input = document.createElement("input");
      this.#input.setAttribute("type", "search");
      this.#input.setAttribute("autocomplete", "off");
      this.#input.setAttribute("spellcheck", "false");
      this.#input.setAttribute("role", "combobox");
      this.#input.setAttribute("aria-autocomplete", "list");
      this.#input.setAttribute("aria-expanded", "false");
      this.#input.setAttribute("placeholder", this.#searchPlaceholder);
      this.#input.classList.add("bl-select-search");
      this.#input.addEventListener("input", () => this.#onInput());

      searchWrapper.append(searchIcon, this.#input);

      this.#menu.append(searchWrapper);
    }

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
    indicator.innerHTML = CHEVRON_DOWN_ICON;

    if (this.#clearable) {
      const clearButton = new CloseButton();
      clearButton.classList.add("bl-select-clear-btn");
      clearButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.clear();
      });
      indicators.append(clearButton);
    }

    indicators.append(indicator);

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
      this.#checkEventAndCloseMenu(e, false);
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

      const selectedOption = this.#select.childNodes[i] as
        | HTMLOptionElement
        | undefined;
      if (selectedOption) {
        selectedOption.selected = isSelected;
      }

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

    this.#optionWrapper
      .querySelectorAll(".no-result")
      .forEach((n) => n.remove());
    if (count === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("bl-option", "no-result");
      noResult.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      noResult.textContent = this.#noResultsText;
      this.#optionWrapper.append(noResult);
    }
  }

  openMenu() {
    if (this.#disabled) {
      return;
    }
    if (this.isMenuOpen) {
      return;
    }
    this.classList.add("open");
    if (this.#input) {
      this.#menu.addEventListener(
        "transitionend",
        () => {
          this.#input?.focus();
        },
        { once: true },
      );
      this.#input.setAttribute("aria-expanded", "true");
    }
    this.#setFocused(this.#firstSelectedIndex() || 0);
  }

  closeMenu(focus = true) {
    if (this.isMenuOpen) {
      this.classList.remove("open");
      this.#text.classList.remove("filtered");
      if (this.#input) {
        this.#input.value = "";
        this.#input.setAttribute("aria-expanded", "false");
      }
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
    if (this.#input === undefined) {
      return;
    }
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
