export class Select extends HTMLElement {
  static NAME = "bl-select";

  private select!: HTMLSelectElement;
  private input!: HTMLInputElement;
  private options: HTMLElement[] = [];
  private menu!: HTMLDivElement;
  private text!: HTMLDivElement;
  private placeholder = "Choose an item";
  private onClick!: (e: MouseEvent) => void;
  private search: string = "";
  private selectedItem: HTMLElement | null = null;
  private focusedEl: HTMLElement | null = null;

  static register() {
    customElements.define(this.NAME, Select);
  }

  connectedCallback() {
    this.options = [...this.children] as HTMLElement[];

    this.placeholder = this.getAttribute("placeholder") || "Choose an option";

    this.select = document.createElement("select");
    this.select.name = this.getAttribute("name") || "";

    this.text = document.createElement("div");
    this.text.classList.add("bl-select-text");
    this.text.innerText = this.placeholder;

    this.input = document.createElement("input");
    this.input.setAttribute("type", "search");
    this.input.classList.add("bl-select-search-input");
    this.input.addEventListener("input", () => this.onInput());
    this.input.addEventListener("click", () => this.openMenu());
    this.input.addEventListener("focus", () => this.openMenu());
    this.input.addEventListener("blur", (e) => this.checkEventAndCloseMenu(e));
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.focusNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.focusPrevious();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (this.focusedEl !== null) {
          this.setSelected(this.focusedEl);
        }
        this.input.blur();
        this.closeMenu();
      }
    });

    const selected = this.getAttribute("selected") || "";
    const selectedEl = this.getOptionByValue(selected);
    if (selectedEl !== undefined) {
      this.setSelected(selectedEl);
    } else {
    }
    if (this.options.length > 0) {
      this.setFocused(this.options[0]);
    }

    this.menu = document.createElement("div");
    this.menu.classList.add("bl-select-menu-wrapper");
    this.menu.tabIndex = -1;
    this.options.forEach((o) => this.addOptionToMenu(o));

    this.onClick = (e: MouseEvent) => {
      this.checkEventAndCloseMenu(e);
    };
    document.addEventListener("click", this.onClick);

    const theme = this.getAttribute("theme") ?? "unstyled";
    this.classList.add(`bl-theme-${theme}`);

    this.append(this.select, this.input, this.text, this.menu);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.onClick);
  }

  checkEventAndCloseMenu(e: Event) {
    let closest;
    if (e instanceof FocusEvent) {
      closest = (e.relatedTarget as HTMLElement)?.closest(Select.NAME);
    } else {
      closest = (e.target as HTMLElement)?.closest(Select.NAME);
    }
    if (closest === null || closest !== this) {
      if (this.classList.contains("open")) {
        this.closeMenu();
      }
    }
  }

  addOptionToMenu(option: HTMLElement) {
    const value = option.getAttribute("data-value") || "";
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", value);
    this.select.append(optionEl);

    option.classList.add("bl-select-menu-item");
    option.setAttribute("data-value", value);
    option.addEventListener("click", (e) => {
      e.preventDefault();
      this.select.value = value;
      this.setSelected(option);
      this.closeMenu();
    });
    option.addEventListener("mousemove", (e) => {
      this.focusedEl = (e.target as HTMLElement).closest(
        ".bl-select-menu-item",
      );
      this.updateList();
    });
    this.menu.append(option);
  }

  onInput() {
    this.openMenu();
    this.search = this.input.value || "";
    this.setFocused(this.filteredOptions[0]);
    this.updateList();
    if (this.search !== "") {
      this.text.classList.add("filtered");
    } else {
      this.text.classList.remove("filtered");
    }
  }

  updateList() {
    for (const option of this.options) {
      if (option === this.selectedItem) {
        const clone = option.cloneNode(true);
        (clone as Element).classList.remove(
          "bl-select-menu-item",
          "focus",
          "selected",
          "filtered",
        );
        this.text.innerHTML = "";
        this.text.appendChild(clone);
        this.select.value = option.getAttribute("data-value") ?? "";
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }

      if (option === this.focusedEl) {
        option.classList.add("focus");
      } else {
        option.classList.remove("focus");
      }

      if (
        option.textContent?.toLowerCase().includes(this.search.toLowerCase())
      ) {
        option.classList.remove("filtered");
      } else {
        option.classList.add("filtered");
      }
    }
  }

  setSelected(element: HTMLElement) {
    this.selectedItem = element;
    this.updateList();
  }

  setFocused(element: HTMLElement, scrollTo = false) {
    this.focusedEl = element;
    if (scrollTo) {
      this.focusedEl.scrollIntoView({
        block: "nearest",
      });
    }
    this.updateList();
  }

  openMenu() {
    this.classList.add("open");
    if (this.selectedItem !== null) {
      this.setFocused(this.selectedItem);
    } else {
      this.updateList();
    }
  }

  closeMenu() {
    if (this.classList.contains("open")) {
      this.classList.remove("open");
      this.text.classList.remove("filtered");
      this.input.value = "";
      this.search = "";
    }
  }

  focusNext() {
    if (this.isMenuOpen) {
      if (this.focusedEl !== null) {
        let nextEl = null;
        if (this.search !== "") {
          let currentEl = this.focusedEl;
          // We loop through all items until we found the next item matching the filter
          while (currentEl.nextElementSibling !== null) {
            if (this.matchSearch(currentEl.nextElementSibling)) {
              nextEl = currentEl.nextElementSibling;
              break;
            }
            currentEl = currentEl.nextElementSibling as HTMLDivElement;
          }
        } else {
          nextEl = this.focusedEl.nextElementSibling;
        }
        if (nextEl !== null) {
          this.setFocused(nextEl as HTMLDivElement, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  focusPrevious() {
    if (this.isMenuOpen) {
      if (this.focusedEl !== null) {
        let previousEl = null;
        if (this.search !== "") {
          let currentEl = this.focusedEl;
          while (currentEl.previousElementSibling !== null) {
            if (this.matchSearch(currentEl.previousElementSibling)) {
              previousEl = currentEl.previousElementSibling;
              break;
            }
            currentEl = currentEl.previousElementSibling as HTMLDivElement;
          }
        } else {
          previousEl = this.focusedEl.previousElementSibling;
        }
        if (previousEl !== null) {
          this.setFocused(previousEl as HTMLDivElement, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  getOptionByValue(value: string) {
    return this.options.find((o) => o.getAttribute("data-value") === value);
  }

  matchSearch(element: Element): boolean {
    return (
      element.textContent?.toLowerCase().includes(this.search.toLowerCase()) ||
      false
    );
  }

  get isMenuOpen() {
    return this.classList.contains("open");
  }

  get filteredOptions() {
    return this.options.filter((o) => this.matchSearch(o));
  }
}
