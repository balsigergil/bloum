export interface BlComboboxConfig {
  placeholder: string;
  selected?: string | string[];
  noResultsText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
}

export const DEFAULT_PROPS: BlComboboxConfig = {
  placeholder: "Select an option...",
  noResultsText: "No results found",
  isSearchable: false,
  isMultiple: false,
};

interface BlComboboxInput extends HTMLElement {
  blcombobox?: BlCombobox;
}

export class BlCombobox {
  // The underlying combobox element
  readonly #field: BlComboboxInput;

  // All options to configure the component
  readonly #config: BlComboboxConfig;

  #wrapper!: HTMLDivElement;
  #inner!: HTMLDivElement;
  #itemsContainer!: HTMLDivElement;
  #menu!: HTMLDivElement;
  #searchInput: HTMLInputElement | null = null;
  #optionsContainer!: HTMLDivElement;
  #options: HTMLDivElement[] = [];

  #selected: number[] = [];
  #activeItems: number[] = [];
  #searchValue = "";
  #highlighted = -1;

  #cleanupEvents: VoidFunction | null = null;

  constructor(element: string | BlComboboxInput, options?: BlComboboxConfig) {
    if (typeof element === "string") {
      const domElement = document.querySelector<HTMLElement>(element);
      if (domElement === null) {
        throw new Error(
          `Element ${element} not found to initialize BlCombobox`,
        );
      }
      element = domElement;
    }

    if (element.blcombobox !== undefined) {
      element.blcombobox.destroy();
    }

    this.#field = element;
    this.#field.blcombobox = this;
    // this.#field.style.display = "none";
    this.#config = this.#parseOptions(options);

    this.#render();
    this.#initializeEvents();

    // Set the selected index
    this.#setInitialSelected();
  }

  open() {
    this.#wrapper.classList.add("open");

    // Focus the search input field
    if (this.#searchInput) {
      this.#searchInput.focus();
    } else {
      this.#optionsContainer.focus();
    }

    if (this.#selected.length > 0) {
      this.#setHighlightIndex(this.#selected[0]);
    }

    this.#updateOptionsList();
  }

  close(focusWrapper = true) {
    this.#updateItemsList();
    this.#updateItemsClasses();
    if (!this.isOpen) return;
    this.#wrapper.classList.remove("open");
    this.#activeItems = [];
    if (focusWrapper) this.#wrapper.focus();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  get isOpen() {
    return this.#wrapper.classList.contains("open");
  }

  selectIndex(index: number) {
    // Check if the index is out of bounds
    if (index < 0 || index >= this.#optionsContainer.children.length) {
      return;
    }

    if (this.#config.isMultiple) {
      if (!this.#selected.includes(index)) {
        this.#selected.push(index);
      }
    } else {
      this.#selected = [index];
    }

    // Clear the search input field
    if (this.#searchInput && !this.#config.isMultiple) {
      this.#searchValue = "";
      this.#searchInput.value = "";
    }

    // Update the underlying combobox element
    if (this.#field instanceof HTMLSelectElement) {
      if (this.#config.isMultiple) {
        for (let i = 0; i < this.#field.options.length; i++) {
          this.#field.options[i].selected = this.#selected.includes(i);
        }
      } else {
        this.#field.selectedIndex = index;
      }
    }

    // Update the visible item
    this.#updateItemsList();

    if (!this.#config.isMultiple) {
      this.close();
    } else {
      this.#highlightNext();
      this.#updateOptionsList();
      this.#searchInput?.focus();
    }
  }

  destroy() {
    if (this.#cleanupEvents) {
      this.#cleanupEvents();
    }
    this.#wrapper.remove();
    delete this.#field.blcombobox;
  }

  #render() {
    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add("bl-combobox");
    this.#wrapper.tabIndex = 0;
    if (this.#config.isMultiple) {
      this.#wrapper.setAttribute("data-multiple", "");
    }

    this.#inner = document.createElement("div");
    this.#inner.classList.add("bl-combobox-inner");

    this.#itemsContainer = document.createElement("div");
    this.#itemsContainer.classList.add("bl-combobox-items");
    this.#itemsContainer.innerText = this.#config.placeholder;

    const arrow = document.createElement("div");
    arrow.classList.add("bl-combobox-arrow");

    this.#inner.append(this.#itemsContainer, arrow);
    this.#wrapper.append(this.#inner);

    this.#menu = document.createElement("div");
    this.#menu.classList.add("bl-combobox-menu");

    if (this.#config.isSearchable) {
      this.#searchInput = document.createElement("input");
      this.#searchInput.setAttribute("type", "text");
      this.#searchInput.classList.add("bl-combobox-search");
      this.#searchInput.setAttribute("placeholder", "Search...");
      this.#menu.append(this.#searchInput);
    }

    this.#optionsContainer = document.createElement("div");
    this.#optionsContainer.classList.add("bl-combobox-options");
    this.#optionsContainer.tabIndex = 0;
    this.#populateOptions();

    this.#menu.append(this.#optionsContainer);
    this.#wrapper.append(this.#menu);

    this.#field.insertAdjacentElement("afterend", this.#wrapper);
  }

  #initializeEvents() {
    this.#wrapper.addEventListener("click", (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && this.#inner.contains(e.target)) {
        this.toggle();
      }
    });

    this.#wrapper.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.close();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.#highlightNext();
          this.#updateOptionsList();
        }
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.#highlightPrevious();
          this.#updateOptionsList();
        }
      }

      if (e.key === "Tab") {
        this.close();
      }

      if (e.key === "Enter") {
        e.preventDefault();
        this.selectIndex(this.#highlighted);
      }

      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.#activeItems = Array.from(
          { length: this.#selected.length },
          (_, i) => i,
        );
        this.#updateItemsClasses();
      }

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        this.#activeItems.length > 0
      ) {
        e.preventDefault();
        this.#removeItem(this.#activeItems);
      }
    });

    this.#searchInput?.addEventListener("input", (e: Event) => {
      this.#searchValue = (e.target as HTMLInputElement).value
        .toLowerCase()
        .trim();

      // Reset the highlighted index to the first match
      this.#highlighted = -1;
      this.#highlightNext();

      this.#updateOptionsList();
    });

    this.#searchInput?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Backspace" && this.#searchValue === "") {
        this.#removeItem(this.#selected.length - 1);
        e.stopPropagation();
      }

      if (
        !(
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "Enter" ||
          e.key === "Tab" ||
          e.key === "Escape" ||
          e.key === "Esc"
        )
      ) {
        e.stopPropagation();
      }
    });

    this.#optionsContainer.addEventListener("mousemove", (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const option = e.target;
        this.#setHighlightIndex(
          parseInt(option.getAttribute("data-index") || "-1"),
        );
        this.#updateOptionsList();
      }
    });

    const handleDocumentClick = (e: MouseEvent) => {
      if (this.isOpen && !this.#wrapper.contains(e.target as Node)) {
        this.close(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    this.#cleanupEvents = () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }

  #parseOptions(props?: BlComboboxConfig): BlComboboxConfig {
    // Merge the default props with the provided props
    const parsedProps = { ...DEFAULT_PROPS };

    if (this.#field.hasAttribute("placeholder")) {
      parsedProps.placeholder = this.#field.getAttribute("placeholder") || "";
    }

    if (this.#field.hasAttribute("multiple")) {
      parsedProps.isMultiple = true;
    }

    return { ...parsedProps, ...props };
  }

  #setInitialSelected() {
    const selected = [];
    if (this.#config?.selected !== undefined) {
      if (this.#field instanceof HTMLSelectElement) {
        for (let i = 0; i < this.#field.options.length; i++) {
          const option = this.#field.options[i];
          if (Array.isArray(this.#config.selected)) {
            if (this.#config.selected.includes(option.value)) {
              selected.push(i);
            }
          } else {
            if (option.value === this.#config.selected) {
              selected.push(i);
            }
          }
        }
      }
    } else {
      if (this.#field instanceof HTMLSelectElement) {
        // Look for selected options
        for (let i = 0; i < this.#field.options.length; i++) {
          if (this.#field.options[i].selected) {
            selected.push(i);
          }
        }
      }
    }

    // TODO: Handle multiple selected options
    if (selected.length > 0) {
      this.selectIndex(selected[0]);
    }
  }

  #populateOptions() {
    if (this.#field instanceof HTMLSelectElement) {
      for (let i = 0; i < this.#field.options.length; i++) {
        const option = this.#field.options[i];
        const optionElement = document.createElement("div");
        optionElement.classList.add("bl-combobox-option");
        optionElement.innerText = option.text;
        optionElement.setAttribute("data-value", option.value);
        optionElement.setAttribute("data-index", i.toString());

        optionElement.addEventListener("click", () => {
          this.selectIndex(i);
        });

        this.#options.push(optionElement);
        this.#optionsContainer.append(optionElement);
      }
    }
  }

  #matchSearch(option: HTMLDivElement) {
    const optionText = option.innerText.toLowerCase().trim();
    return optionText.includes(this.#searchValue);
  }

  #updateOptionsList() {
    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionCount) {
      this.#highlighted = this.#optionCount - 1;
    }

    const options = this.#optionsContainer.querySelectorAll<HTMLDivElement>(
      ".bl-combobox-option",
    );
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (this.#matchSearch(option)) {
        option.classList.remove("bl-combobox-hidden");
      } else {
        option.classList.add("bl-combobox-hidden");
        continue;
      }

      if (this.#config.isMultiple && this.#selected.includes(i)) {
        option.classList.add("bl-combobox-hidden");
        continue;
      }

      if (i === this.#highlighted) {
        option.classList.add("bl-combobox-highlighted");
        option.scrollIntoView({ block: "nearest" });
      } else {
        option.classList.remove("bl-combobox-highlighted");
      }

      if (this.#selected.includes(i)) {
        option.classList.add("bl-combobox-selected");
      } else {
        option.classList.remove("bl-combobox-selected");
      }
    }
  }

  #highlightNext() {
    for (let i = this.#highlighted + 1; i < this.#optionCount; i++) {
      const option = this.#options[i];
      if (this.#config.isMultiple && this.#selected.includes(i)) {
        continue;
      }
      if (this.#matchSearch(option)) {
        this.#setHighlightIndex(i);
        break;
      }
    }
  }

  #highlightPrevious() {
    for (let i = this.#highlighted - 1; i >= 0; i--) {
      const option = this.#options[i];
      if (this.#config.isMultiple && this.#selected.includes(i)) {
        continue;
      }
      if (this.#matchSearch(option)) {
        this.#setHighlightIndex(i);
        break;
      }
    }
  }

  #setHighlightIndex(index: number) {
    this.#highlighted = index;

    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionCount) {
      this.#highlighted = this.#optionCount - 1;
    }
  }

  get #optionCount() {
    return this.#options.length;
  }

  #updateItemsList() {
    if (this.#config.isMultiple) {
      this.#itemsContainer.innerHTML = "";
      this.#activeItems = [];
      if (this.#selected.length === 0) {
        this.#itemsContainer.innerText = this.#config.placeholder;
      } else {
        for (let i = 0; i < this.#selected.length; i++) {
          const optionIndex = this.#selected[i];
          const option = this.#options[optionIndex];
          if (this.#itemsContainer.contains(option)) {
            continue;
          }
          this.#itemsContainer.append(this.#createItem(option.innerText, i));
        }
      }
    } else {
      if (this.#selected.length > 0) {
        this.#itemsContainer.innerText = (
          this.#optionsContainer.children[this.#selected[0]] as HTMLElement
        ).innerText;
      } else {
        this.#itemsContainer.innerText = this.#config.placeholder;
      }
    }
  }

  #createItem(text: string, index: number) {
    const item = document.createElement("span");
    item.classList.add("bl-combobox-item");

    const itemText = document.createElement("span");
    itemText.innerText = text;
    const itemRemoveButton = document.createElement("span");
    itemRemoveButton.classList.add("bl-combobox-item-remove");
    itemRemoveButton.innerText = "×";
    itemRemoveButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.#removeItem(index);
    });
    item.append(itemText, itemRemoveButton);

    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey || e.metaKey) {
        if (!this.#activeItems.includes(index)) {
          this.#activeItems.push(index);
        }
      } else {
        this.#activeItems = [index];
      }
      this.#updateItemsClasses();
    });

    return item;
  }

  #removeItem(index: number | number[]) {
    if (Array.isArray(index)) {
      this.#selected = this.#selected.filter((_, i) => !index.includes(i));
    } else {
      this.#selected = this.#selected.filter((_, i) => i !== index);
    }
    this.#updateItemsList();
    this.#updateOptionsList();
    this.#searchInput?.focus();
  }

  #updateItemsClasses() {
    for (
      let selectedIndex = 0;
      selectedIndex < this.#selected.length;
      selectedIndex++
    ) {
      const item = this.#itemsContainer.children[selectedIndex] as HTMLElement;
      if (item === undefined) continue;
      if (this.#activeItems.includes(selectedIndex)) {
        item.classList.add("bl-combobox-item-active");
      } else {
        item.classList.remove("bl-combobox-item-active");
      }
    }
  }
}
