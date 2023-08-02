export class DropdownMenu extends HTMLElement {
  private selectEl!: HTMLSelectElement;
  private inputEl!: HTMLInputElement;
  private options: HTMLDivElement[] = [];
  private menu!: HTMLDivElement;
  private textEl!: HTMLDivElement;
  private placeholder = "Choose an item";
  private onClick!: (e: MouseEvent) => void;
  private search: string = "";
  private selectedEl: HTMLDivElement | null = null;
  private activeEl: HTMLDivElement | null = null;

  constructor() {
    super();
  }

  static register() {
    customElements.define("dropdown-menu", DropdownMenu);
  }

  static get observedAttributes() {
    return ["selected"];
  }

  connectedCallback() {
    this.options = [...this.children] as HTMLDivElement[];
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
      this.checkEventAndCloseMenu(e),
    );
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.selectNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.selectPrevious();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (this.activeEl !== null) {
          this.setSelected(this.activeEl);
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
      this.setActive(this.options[0]);
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
      closest = (e.relatedTarget as HTMLElement)?.closest("dropdown-menu");
    } else {
      closest = (e.target as HTMLElement)?.closest("dropdown-menu");
    }
    if (closest === null || closest !== this) {
      if (this.classList.contains("open")) {
        this.textEl.innerText = this.placeholder;
        this.closeMenu();
      }
    }
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.onClick);
  }

  // attributeChangedCallback(name: string, oldValue: any, newValue: any) {
  // if (oldValue !== newValue) {
  //     if (this.selectEl !== undefined && name === "selected") {
  //         this.selectEl.value = newValue;
  //         this.textEl.innerText =
  //             this.options.find((o) => o.value === newValue)?.innerText ||
  //             this.placeholder;
  //     }
  //
  //     if (name === "placeholder") {
  //         this.placeholder = newValue;
  //     }
  // }
  // }

  addOptionToMenu(option: HTMLDivElement) {
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
      const event = new CustomEvent("change", {
        bubbles: true,
        detail: {
          label: option.innerText,
          value: value,
        },
        cancelable: false,
        composed: true,
      });
      this.dispatchEvent(event);
    });
    option.addEventListener("mousemove", (e) => {
      this.activeEl = e.target as HTMLDivElement;
      this.updateList();
    });
    this.menu.append(option);
  }

  onInput() {
    this.openMenu();
    this.search = this.inputEl.value || "";
    this.setActive(this.filteredOptions[0]);
    this.updateList();
    if (this.search !== "") {
      this.textEl.classList.add("filtered");
    } else {
      this.textEl.classList.remove("filtered");
    }
  }

  updateList() {
    const selectedValue = this.selectedEl?.getAttribute("data-value");
    const activeValue = this.activeEl?.getAttribute("data-value");
    for (const option of this.options) {
      if (
        selectedValue &&
        option.getAttribute("data-value") === selectedValue
      ) {
        const clone = option.cloneNode(true);
        this.textEl.innerHTML = "";
        this.textEl.appendChild(clone);
        this.selectEl.value = selectedValue;
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }

      if (
        this.activeEl &&
        activeValue &&
        option.getAttribute("data-value") === activeValue
      ) {
        option.classList.add("active");
        this.activeEl.scrollIntoView({
          block: "nearest",
        });
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

  setSelected(element: HTMLDivElement) {
    this.selectedEl = element as HTMLDivElement;
    this.updateList();
  }

  setActive(element: HTMLDivElement) {
    this.activeEl = element as HTMLDivElement;
    this.updateList();
  }

  closeMenu() {
    if (this.classList.contains("open")) {
      this.classList.remove("open");
      this.textEl.classList.remove("filtered");
      this.inputEl.value = "";
      this.search = "";
      this.updateList();
    }
  }

  openMenu() {
    this.classList.add("open");
  }

  selectNext() {
    if (this.isMenuOpen) {
      if (this.activeEl !== null) {
        let nextEl = null;
        if (this.search !== "") {
          let currentEl = this.activeEl;
          while (currentEl.nextElementSibling !== null) {
            if (this.matchSearch(currentEl.nextElementSibling)) {
              nextEl = currentEl.nextElementSibling;
              break;
            }
            currentEl = currentEl.nextElementSibling as HTMLDivElement;
          }
        } else {
          nextEl = this.activeEl.nextElementSibling;
        }
        if (nextEl !== null) {
          this.setActive(nextEl as HTMLDivElement);
        }
      }
    } else {
      this.openMenu();
    }
  }

  selectPrevious() {
    if (this.isMenuOpen) {
      if (this.activeEl !== null) {
        let previousEl = null;
        if (this.search !== "") {
          let currentEl = this.activeEl;
          while (currentEl.previousElementSibling !== null) {
            if (this.matchSearch(currentEl.previousElementSibling)) {
              previousEl = currentEl.previousElementSibling;
              break;
            }
            currentEl = currentEl.previousElementSibling as HTMLDivElement;
          }
        } else {
          previousEl = this.activeEl.previousElementSibling;
        }
        if (previousEl !== null) {
          this.setActive(previousEl as HTMLDivElement);
        }
      }
    } else {
      this.openMenu();
    }
  }

  getOptionByValue(value: string) {
    return this.options.find((o) => o.getAttribute("data-value") === value);
  }

  get isMenuOpen() {
    return this.classList.contains("open");
  }

  get filteredOptions() {
    return this.options.filter((o) => this.matchSearch(o));
  }

  matchSearch(element: Element): boolean {
    return (
      element.textContent?.toLowerCase().includes(this.search.toLowerCase()) ||
      false
    );
  }
}
