export class Select extends HTMLElement {
  static NAME = "bl-select";
  private selectEl!: HTMLSelectElement;
  private inputEl!: HTMLInputElement;
  private options: HTMLElement[] = [];
  private menu!: HTMLDivElement;
  private textEl!: HTMLDivElement;
  private placeholder = "Choose an item";
  private onClick!: (e: MouseEvent) => void;
  private search: string = "";
  private selectedEl: HTMLElement | null = null;
  private focusedEl: HTMLElement | null = null;

  static register() {
    customElements.define(this.NAME, Select);
  }

  connectedCallback() {
    this.options = [...this.children] as HTMLElement[];

    this.placeholder = this.getAttribute("placeholder") || "Choose an option";

    this.selectEl = document.createElement("select");
    this.selectEl.name = this.getAttribute("name") || "";

    this.textEl = document.createElement("div");
    this.textEl.classList.add("dropdown-text");
    this.textEl.innerText = this.placeholder;

    this.inputEl = document.createElement("input");
    this.inputEl.setAttribute("type", "search");
    this.inputEl.classList.add("dropdown-search-input");
    this.inputEl.addEventListener("input", () => this.onInput());
    this.inputEl.addEventListener("click", () => this.openMenu());
    this.inputEl.addEventListener("focus", () => this.openMenu());
    this.inputEl.addEventListener("blur", (e) =>
      this.checkEventAndCloseMenu(e)
    );
    this.inputEl.addEventListener("keydown", (e) => {
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
        this.inputEl.blur();
        this.closeMenu();
      }
    });

    const selected = this.getAttribute("selected") || "";
    const selectedEl = this.getOptionByValue(selected);
    if (selectedEl !== undefined) {
      this.setSelected(selectedEl);
    }
    if (this.options.length > 0) {
      this.setFocused(this.options[0]);
    }

    this.menu = document.createElement("div");
    this.menu.classList.add("dropdown-menu-wrapper");
    this.menu.tabIndex = -1;
    this.options.forEach((o) => this.addOptionToMenu(o));

    this.onClick = (e: MouseEvent) => {
      this.checkEventAndCloseMenu(e);
    };
    document.addEventListener("click", this.onClick);

    this.append(this.selectEl, this.inputEl, this.textEl, this.menu);
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

  disconnectedCallback() {
    document.removeEventListener("click", this.onClick);
  }

  addOptionToMenu(option: HTMLElement) {
    const value = option.getAttribute("data-value") || "";
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", value);
    this.selectEl.append(optionEl);

    option.classList.add("menu-item");
    option.setAttribute("data-value", value);
    option.addEventListener("click", (e) => {
      e.preventDefault();
      this.selectEl.value = value;
      this.setSelected(option);
      this.closeMenu();
    });
    option.addEventListener("mousemove", (e) => {
      this.focusedEl = (e.target as HTMLElement).closest(".menu-item");
      this.updateList();
    });
    this.menu.append(option);
  }

  onInput() {
    this.openMenu();
    this.search = this.inputEl.value || "";
    this.setFocused(this.filteredOptions[0]);
    this.updateList();
    if (this.search !== "") {
      this.textEl.classList.add("filtered");
    } else {
      this.textEl.classList.remove("filtered");
    }
  }

  updateList() {
    for (const option of this.options) {
      if (option === this.selectedEl) {
        const text = option.getAttribute("data-text");
        if (text !== null) {
          this.textEl.innerText = text;
        } else {
          const clone = option.cloneNode(true);
          this.textEl.innerHTML = "";
          this.textEl.appendChild(clone);
        }
        this.selectEl.value = option.getAttribute("data-value") ?? "";
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }

      if (option === this.focusedEl) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
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
    this.selectedEl = element;
    if (this.selectedEl.getAttribute("data-text") !== null) {
      this.style.height = "";
    } else {
      const height = this.selectedEl.offsetHeight;
      this.style.height = `${height}px`;
    }
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
    if (this.selectedEl !== null) {
      this.setFocused(this.selectedEl);
    } else {
      this.updateList();
    }
  }

  closeMenu() {
    if (this.classList.contains("open")) {
      this.classList.remove("open");
      this.textEl.classList.remove("filtered");
      this.inputEl.value = "";
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
