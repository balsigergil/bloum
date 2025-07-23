import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { parseOptions } from "./utils";

export interface ComboboxConfig {
  placeholder: string;
  noResultsText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
}

interface ComboboxInput extends HTMLSelectElement {
  blcombobox?: Combobox;
}

export class Combobox {
  // The underlying combobox element
  readonly #field: ComboboxInput;

  // All options to configure the component
  readonly #config: ComboboxConfig;

  #wrapper!: HTMLDivElement;
  #inner!: HTMLDivElement;
  #placeholderString!: string;

  // Wrapper around the selected items in the input field
  #itemsContainer!: HTMLDivElement;

  // The dropdown menu
  #menu!: HTMLDivElement;

  #searchInput: HTMLInputElement | null = null;

  #optionsContainer!: HTMLDivElement;
  #options: HTMLDivElement[] = [];

  // Indices of the selected options
  #selected: number[] = [];

  // Indices of the highlighted items in the selected options
  // (only for multiple)
  #activeItems: number[] = [];
  #searchValue = "";
  #highlighted = -1;

  #cleanupEvents: VoidFunction | null = null;
  #cleanupFloating: VoidFunction | null = null;

  constructor(element: string | ComboboxInput, options?: ComboboxConfig) {
    if (typeof element === "string") {
      const domElement = document.querySelector<HTMLSelectElement>(element);
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

    // Clear adjacent container if any (needed for HTMX compatibility with hx-boost)
    while (element.nextElementSibling?.classList.contains("bl-combobox")) {
      element.nextElementSibling.remove();
    }

    this.#field = element;
    this.#field.blcombobox = this;
    this.#field.style.display = "none";
    this.#config = parseOptions(this.#field, options);
    this.#placeholderString = `<span class="bl-combobox-placeholder">${this.#config.placeholder}</span>`;

    this.#render();
    this.#initializeEvents();

    // Set the selected index
    this.#setInitialSelected();
  }

  /**
   * Open the dropdown and focus on the search input field
   */
  open() {
    this.#wrapper.classList.add("open");

    // Set up floating-ui positioning
    this.#cleanupFloating = autoUpdate(
      this.#inner,
      this.#menu,
      this.#updatePosition.bind(this),
    );

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

  /**
   * Close the dropdown
   * @param focusWrapper Focus on the field after closing the dropdown
   */
  close(focusWrapper = true) {
    this.#updateItemsList();
    this.#updateItemsClasses();
    if (!this.isOpen) return;
    this.#wrapper.classList.remove("open");

    // Cleanup floating-ui
    if (this.#cleanupFloating) {
      this.#cleanupFloating();
      this.#cleanupFloating = null;
    }

    this.#activeItems = [];
    if (focusWrapper) this.#wrapper.focus();
  }

  /**
   * Toggle the dropdown
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Check if the dropdown is open
   */
  get isOpen() {
    return this.#wrapper.classList.contains("open");
  }

  /**
   * Select an option by its index
   * @param index
   */
  selectIndex(index: number | number[]) {
    if (!Array.isArray(index)) {
      index = [index];
    }

    if (index.length === 0) {
      return;
    }

    // Check if there are any options to select
    if (
      this.#optionsContainer.querySelectorAll(
        ".bl-combobox-option:not(.bl-combobox-no-results):not(.bl-combobox-hidden)",
      ).length === 0
    ) {
      return;
    }

    for (const i of index) {
      // Check if the index is out of bounds
      if (i < 0 || i >= this.#optionsContainer.children.length) {
        return;
      }

      if (this.#config.isMultiple) {
        if (!this.#selected.includes(i)) {
          this.#selected.push(i);
        }
      } else {
        this.#selected = [i];
      }
    }

    // Clear the search input field
    if (this.#searchInput && !this.#config.isMultiple) {
      this.#searchValue = "";
      this.#searchInput.value = "";
    }

    this.#updateUnderlyingSelect();

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

  /**
   * Destroy the component and remove all event listeners
   */
  destroy() {
    if (this.#cleanupEvents) {
      this.#cleanupEvents();
    }
    if (this.#cleanupFloating) {
      this.#cleanupFloating();
    }
    this.#wrapper.remove();
    delete this.#field.blcombobox;
  }

  /**
   * TODO: Synchronize the component with the underlying <select> element
   *
   sync() {
   }
   */

  #updateUnderlyingSelect() {
    for (let i = 0; i < this.#field.options.length; i++) {
      this.#field.options[i].selected = this.#selected.includes(i);
    }
  }

  /**
   * Render the component. Should be called only once when the component is initialized.
   * @private
   */
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
    this.#itemsContainer.innerHTML = this.#placeholderString;

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
        if (this.isOpen) {
          this.selectIndex(this.#highlighted);
        } else {
          this.open();
        }
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

  /**
   * Set the selected options based on the <select> element
   * This method is called only once when the component is initialized.
   * @private
   */
  #setInitialSelected() {
    const selected = [];

    // Look for selected options
    for (let i = 0; i < this.#field.options.length; i++) {
      if (this.#field.options[i].hasAttribute("selected")) {
        selected.push(i);
      }
    }

    if (selected.length > 0) {
      this.selectIndex(selected);
    }
  }

  /**
   * Populate the option list.
   * This method is called only once when the component is initialized.
   * @private
   */
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

  /**
   * Check if the raw option matches the search value
   * @param option The raw option element
   * @private
   */
  #matchSearch(option: HTMLDivElement) {
    const optionText = option.innerText.toLowerCase().trim();
    return optionText.includes(this.#searchValue);
  }

  /**
   * Update the options list based on the search value
   * @private
   */
  #updateOptionsList() {
    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionCount) {
      this.#highlighted = this.#optionCount - 1;
    }

    const options = this.#optionsContainer.querySelectorAll<HTMLDivElement>(
      ".bl-combobox-option:not(.bl-combobox-no-results)",
    );

    this.#optionsContainer
      .querySelectorAll(".bl-combobox-no-results")
      .forEach((el) => el.remove());

    let foundOptions = 0;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (this.#matchSearch(option)) {
        option.classList.remove("bl-combobox-hidden");
      } else {
        option.classList.add("bl-combobox-hidden");
        continue;
      }

      // Hide the selected options from the dropdown list
      if (this.#config.isMultiple && this.#selected.includes(i)) {
        option.classList.add("bl-combobox-hidden");
        continue;
      }

      foundOptions++;

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

    if (foundOptions === 0) {
      const noResults = document.createElement("div");
      noResults.classList.add("bl-combobox-no-results", "bl-combobox-option");
      noResults.innerText = this.#config.noResultsText || "No results found";
      this.#optionsContainer.append(noResults);
    }
  }

  /**
   * Highlight the next option in the dropdown list
   * @private
   */
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

  /**
   * Highlight the previous option in the dropdown list
   * @private
   */
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

  /**
   * Update the selected items list
   * @private
   */
  #updateItemsList() {
    if (this.#config.isMultiple) {
      this.#itemsContainer.innerHTML = "";
      this.#activeItems = [];
      if (this.#selected.length === 0) {
        this.#itemsContainer.innerHTML = this.#placeholderString;
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
        this.#itemsContainer.innerHTML = this.#placeholderString;
      }
    }
  }

  /* ====== Only for multiple select ====== */

  /**
   * Create a selected item element (only for multiple select)
   * @param text Content of the item
   * @param index Index of the item in the list of selected options
   * @private
   */
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

  /**
   * Remove a selected item (only for multiple select)
   * @param index Index of the item to deselect
   * @private
   */
  #removeItem(index: number | number[]) {
    if (Array.isArray(index)) {
      this.#selected = this.#selected.filter((_, i) => !index.includes(i));
    } else {
      this.#selected = this.#selected.filter((_, i) => i !== index);
    }
    this.#updateItemsList();
    this.#updateOptionsList();
    this.#updateUnderlyingSelect();
    this.#searchInput?.focus();
  }

  /**
   * Update the classes of the selected items list
   * @private
   */
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

  /**
   * Update the position of the dropdown menu using floating-ui
   * @private
   */
  #updatePosition() {
    computePosition(this.#inner, this.#menu, {
      placement: "bottom-start",
      middleware: [offset(6), flip(), shift({ padding: 6 })],
    }).then(({ x, y }) => {
      Object.assign(this.#menu.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
}
