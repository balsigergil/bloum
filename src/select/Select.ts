export interface BloumSelectConfiguration {
  placeholder: string;
  selected?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  noResultsText?: string;
}

export const DEFAULT_PROPS: BloumSelectConfiguration = {
  placeholder: "Select an option...",
  clearable: false,
  searchable: false,
  multiple: false,
  disabled: false,
  noResultsText: "No results found",
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

  #selected: number[] = [];
  #searchValue = "";
  #highlighted = -1;

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
      throw new Error("BloumSelect already initialized on this element");
    }

    this.#field = element;
    this.#field.bloumselect = this;
    // this.#field.style.display = "none";
    this.#config = this.#parseOptions(options);

    this.render();
  }

  render() {
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

    if (this.#config.searchable) {
      this.#searchInput = document.createElement("input");
      this.#searchInput.setAttribute("type", "text");
      this.#searchInput.classList.add("bl-select-search", "form-control");
      this.#searchInput.setAttribute("placeholder", "Search...");
      this.#menu.append(this.#searchInput);
    }

    this.#optionsContainer = document.createElement("div");
    this.#optionsContainer.classList.add("bl-select-options");
    this.#populateOptions();

    this.#menu.append(this.#optionsContainer);
    this.#wrapper.append(this.#menu);

    this.#initializeEvents();
    this.#field.insertAdjacentElement("afterend", this.#wrapper);
  }

  open() {
    this.#wrapper.classList.add("open");

    // Focus the search input field
    this.#searchInput?.focus();

    this.#updateOptionsList();
  }

  close() {
    this.#wrapper.classList.remove("open");
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

  #initializeEvents() {
    this.#wrapper.addEventListener("click", (e) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest(".bl-select-inner")
      ) {
        this.toggle();
      }
    });

    this.#searchInput?.addEventListener("input", (e) => {
      this.#searchValue = (e.target as HTMLInputElement).value
        .toLowerCase()
        .trim();
      this.#updateOptionsList();
    });

    this.#wrapper.addEventListener("blur", () => {
      this.close();
    });

    this.#wrapper.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.close();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.#highlighted++;
          this.#updateOptionsList();
        }
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.#highlighted--;
          this.#updateOptionsList();
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        this.selectIndex(this.#highlighted);
      }
    });

    this.#optionsContainer.addEventListener("mousemove", (event) => {
      if (event.target instanceof HTMLElement) {
        const option = event.target;
        this.#highlighted = parseInt(option.getAttribute("data-index") || "-1");
        this.#updateOptionsList();
      }
    });

    document.addEventListener("click", (event) => {
      if (this.isOpen && !this.#wrapper.contains(event.target as Node)) {
        this.close();
      }
    });
  }

  #parseOptions(props?: BloumSelectConfiguration): BloumSelectConfiguration {
    const parsedProps = props ?? DEFAULT_PROPS;
    if (this.#field.hasAttribute("placeholder")) {
      parsedProps.placeholder = this.#field.getAttribute("placeholder") || "";
    }
    return parsedProps;
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

        this.#optionsContainer.append(optionElement);
      }
    }
  }

  #updateOptionsList() {
    // Check if the highlighted index is out of bounds
    if (this.#highlighted < 0) {
      this.#highlighted = 0;
    } else if (this.#highlighted >= this.#optionsContainer.children.length) {
      this.#highlighted = this.#optionsContainer.children.length - 1;
    }

    const options =
      this.#optionsContainer.querySelectorAll<HTMLDivElement>(
        ".bl-select-option",
      );
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const optionText = option.innerText.toLowerCase().trim();
      if (optionText.includes(this.#searchValue)) {
        option.classList.remove("bl-select-hidden");
      } else {
        option.classList.add("bl-select-hidden");
      }

      if (i === this.#highlighted) {
        option.classList.add("bl-select-highlighted");
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
}
