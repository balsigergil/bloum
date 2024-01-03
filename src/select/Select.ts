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
  private selectedItemIndex: number | null = null;
  private focusedItemIndex: number | null = null;
  private noResultText: string = "No result";

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

    this.menu = document.createElement("div");
    this.menu.classList.add("bl-select-menu-wrapper");
    this.menu.tabIndex = -1;
    this.options.forEach((o, i) => this.addOptionToMenu(o, i));

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
        if (this.focusedItemIndex !== null) {
          this.setSelected(this.focusedItemIndex);
        }
        this.input.blur();
        this.closeMenu();
      }
    });

    const selected = this.getAttribute("selected") || "";
    const selectedIndex = this.getOptionByValue(selected);
    if (selectedIndex !== null) {
      this.setSelected(selectedIndex);
    }
    if (this.options.length > 0) {
      this.setFocused(0);
    }

    this.onClick = (e: MouseEvent) => {
      this.checkEventAndCloseMenu(e);
    };
    document.addEventListener("click", this.onClick);

    const theme = this.getAttribute("theme") ?? "unstyled";
    this.classList.add(`bl-theme-${theme}`);

    this.noResultText =
      this.getAttribute("no-result-text") || this.noResultText;

    this.append(this.select, this.input, this.text, this.menu);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.onClick);
  }

  get isMenuOpen() {
    return this.classList.contains("open");
  }

  get filteredOptions() {
    return this.options.filter((_, i) => this.matchSearch(i));
  }

  addOptionToMenu(option: HTMLElement, index: number) {
    const value = option.getAttribute("data-value") || "";
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", value);
    this.select.append(optionEl);

    option.classList.add("bl-select-menu-item");
    option.setAttribute("data-value", value);
    option.setAttribute("data-index", index.toString());
    option.addEventListener("click", (e) => {
      e.preventDefault();
      this.select.value = value;
      const index = option.getAttribute("data-index");
      if (index !== null) {
        this.setSelected(parseInt(index));
      }
      this.closeMenu();
    });
    option.addEventListener("mousemove", () => {
      const index = option.getAttribute("data-index");
      if (index !== null) {
        this.setFocused(parseInt(index), false);
      }
      this.updateList();
    });
    this.menu.append(option);
  }

  updateList() {
    let count = 0;
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      if (i === this.selectedItemIndex) {
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

      if (i === this.focusedItemIndex) {
        option.classList.add("focus");
      } else {
        option.classList.remove("focus");
      }

      if (
        option.textContent?.toLowerCase().includes(this.search.toLowerCase())
      ) {
        option.classList.remove("filtered");
        count++;
      } else {
        option.classList.add("filtered");
      }
    }
    this.menu.querySelectorAll(".no-result").forEach((n) => n.remove());
    if (count === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("bl-select-menu-item");
      noResult.classList.add("no-result");
      noResult.textContent = this.noResultText;
      this.menu.append(noResult);
    }
  }

  openMenu() {
    this.classList.add("open");
    if (this.selectedItemIndex !== null) {
      this.setFocused(this.selectedItemIndex);
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

  private onInput() {
    this.openMenu();
    this.search = this.input.value || "";
    const options = this.filteredOptions;
    if (options.length > 0) {
      const index = this.options[0].getAttribute("data-index");
      if (index !== null) {
        this.setFocused(parseInt(index));
      }
    }
    this.updateList();
    if (this.search !== "") {
      this.text.classList.add("filtered");
    } else {
      this.text.classList.remove("filtered");
    }
  }

  private checkEventAndCloseMenu(e: Event) {
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

  private setSelected(index: number) {
    this.selectedItemIndex = index;
    this.updateList();
  }

  private setFocused(index: number, scrollTo = true) {
    this.focusedItemIndex = index;
    if (scrollTo) {
      this.options[index].scrollIntoView({
        block: "nearest",
      });
    }
    this.updateList();
  }

  private focusNext() {
    if (this.isMenuOpen) {
      if (this.focusedItemIndex !== null) {
        let nextIndex = null;
        if (this.search !== "") {
          let currentIndex = this.focusedItemIndex;
          const optionsLength = this.options.length;
          // We loop through all items until we found the next item matching the filter
          while (currentIndex + 1 < optionsLength) {
            if (this.matchSearch(currentIndex + 1)) {
              nextIndex = currentIndex + 1;
              break;
            }
            currentIndex++;
          }
        } else if (this.focusedItemIndex + 1 < this.options.length) {
          nextIndex = this.focusedItemIndex + 1;
        }
        if (nextIndex !== null) {
          this.setFocused(nextIndex, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  private focusPrevious() {
    if (this.isMenuOpen) {
      if (this.focusedItemIndex !== null) {
        let previousIndex = null;
        if (this.search !== "") {
          let currentIndex = this.focusedItemIndex;
          // We loop through all items until we found the next item matching the filter
          while (currentIndex - 1 >= 0) {
            if (this.matchSearch(currentIndex - 1)) {
              previousIndex = currentIndex - 1;
              break;
            }
            currentIndex--;
          }
        } else if (this.focusedItemIndex - 1 >= 0) {
          previousIndex = this.focusedItemIndex - 1;
        }
        if (previousIndex !== null) {
          this.setFocused(previousIndex, true);
        }
      }
    } else {
      this.openMenu();
    }
  }

  private getOptionByValue(value: string): number | null {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].getAttribute("data-value") === value) {
        return i;
      }
    }
    return null;
  }

  private matchSearch(index: number): boolean {
    return (
      this.options[index].textContent
        ?.toLowerCase()
        .includes(this.search.toLowerCase()) || false
    );
  }
}
