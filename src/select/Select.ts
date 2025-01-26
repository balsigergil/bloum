export interface BloumSelectConfiguration {
  placeholder: string;
  selected?: string | string[];
  noResultsText?: string;
  isSearchable?: boolean;
}

export const DEFAULT_PROPS: BloumSelectConfiguration = {
  placeholder: "Select an option...",
  noResultsText: "No results found",
  isSearchable: false,
};

interface BloumInput extends HTMLElement {
  bloumselect?: BloumSelect;
}

export class BloumSelect {
  // The underlying select element
  readonly #field: BloumInput;

  // All options to configure the component
  readonly #config: BloumSelectConfiguration;

  #wrapper!: HTMLDivElement;
  #inner!: HTMLDivElement;
  #itemsContainer!: HTMLDivElement;
  #menu!: HTMLDivElement;
  #searchInput: HTMLInputElement | null = null;
  #optionsContainer!: HTMLDivElement;
  #options: HTMLDivElement[] = [];

  #selected: number[] = [];
  #searchValue = "";
  #highlighted = -1;

  #cleanupEvents: VoidFunction | null = null;

  constructor(
    element: string | BloumInput,
    options?: BloumSelectConfiguration,
  ) {
    if (typeof element === "string") {
      const domElement = document.querySelector<HTMLElement>(element);
      if (domElement === null) {
        throw new Error(
          `Element ${element} not found to initialize BloumSelect`,
        );
      }
      element = domElement;
    }

    if (element.bloumselect !== undefined) {
      element.bloumselect.destroy();
    }

    this.#field = element;
    this.#field.bloumselect = this;
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
      this.#highlightIndex(this.#selected[0]);
    }

    this.#updateOptionsList();
  }

  close(focusWrapper = true) {
    if (!this.isOpen) return;
    this.#wrapper.classList.remove("open");
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

    this.#selected = [index];

    // Clear the search input field
    if (this.#searchInput) {
      this.#searchValue = "";
      this.#searchInput.value = "";
    }

    // Update the underlying select element
    if (this.#field instanceof HTMLSelectElement) {
      this.#field.selectedIndex = index;
    }

    // Update the visible item
    this.#itemsContainer.innerText = (
      this.#optionsContainer.children[index] as HTMLElement
    ).innerText;

    this.close();
  }

  destroy() {
    if (this.#cleanupEvents) {
      this.#cleanupEvents();
    }
    this.#wrapper.remove();
    delete this.#field.bloumselect;
  }

  #render() {
    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add("bl-select");
    this.#wrapper.tabIndex = 0;

    this.#inner = document.createElement("div");
    this.#inner.classList.add("bl-select-inner");

    this.#itemsContainer = document.createElement("div");
    this.#itemsContainer.classList.add("bl-select-items");
    this.#itemsContainer.innerText = this.#config.placeholder;

    const arrow = document.createElement("div");
    arrow.classList.add("bl-select-arrow");

    this.#inner.append(this.#itemsContainer, arrow);
    this.#wrapper.append(this.#inner);

    this.#menu = document.createElement("div");
    this.#menu.classList.add("bl-select-menu");

    if (this.#config.isSearchable) {
      this.#searchInput = document.createElement("input");
      this.#searchInput.setAttribute("type", "text");
      this.#searchInput.classList.add("bl-select-search");
      this.#searchInput.setAttribute("placeholder", "Search...");
      this.#menu.append(this.#searchInput);
    }

    this.#optionsContainer = document.createElement("div");
    this.#optionsContainer.classList.add("bl-select-options");
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

    this.#searchInput?.addEventListener("input", (e: Event) => {
      this.#searchValue = (e.target as HTMLInputElement).value
        .toLowerCase()
        .trim();

      // Reset the highlighted index to the first match
      this.#highlighted = -1;
      this.#highlightNext();

      this.#updateOptionsList();
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
    });

    this.#optionsContainer.addEventListener("mousemove", (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const option = e.target;
        this.#highlightIndex(
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

  #parseOptions(props?: BloumSelectConfiguration): BloumSelectConfiguration {
    // Merge the default props with the provided props
    const parsedProps = { ...DEFAULT_PROPS };

    if (this.#field.hasAttribute("placeholder")) {
      parsedProps.placeholder = this.#field.getAttribute("placeholder") || "";
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
        optionElement.classList.add("bl-select-option");
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

  #updateOptionsList() {
    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionCount) {
      this.#highlighted = this.#optionCount - 1;
    }

    const options =
      this.#optionsContainer.querySelectorAll<HTMLDivElement>(
        ".bl-select-option",
      );
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (this.#matchSearch(option)) {
        option.classList.remove("bl-select-hidden");
      } else {
        option.classList.add("bl-select-hidden");
      }

      if (i === this.#highlighted) {
        option.classList.add("bl-select-highlighted");
        option.scrollIntoView({ block: "nearest" });
      } else {
        option.classList.remove("bl-select-highlighted");
      }

      if (this.#selected.includes(i)) {
        option.classList.add("bl-select-selected");
      } else {
        option.classList.remove("bl-select-selected");
      }
    }
  }

  #highlightNext() {
    for (let i = this.#highlighted + 1; i < this.#optionCount; i++) {
      const option = this.#options[i];
      if (this.#matchSearch(option)) {
        this.#highlightIndex(i);
        break;
      }
    }
  }

  #highlightPrevious() {
    for (let i = this.#highlighted - 1; i >= 0; i--) {
      const option = this.#options[i];
      if (this.#matchSearch(option)) {
        this.#highlightIndex(i);
        break;
      }
    }
  }

  #highlightIndex(index: number) {
    this.#highlighted = index;

    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionCount) {
      this.#highlighted = this.#optionCount - 1;
    }
  }

  #matchSearch(option: HTMLDivElement) {
    const optionText = option.innerText.toLowerCase().trim();
    return optionText.includes(this.#searchValue);
  }

  get #optionCount() {
    return this.#options.length;
  }
}
