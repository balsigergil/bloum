import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

export interface BlMenuElement extends HTMLElement {
  blmenu?: Menu;
}

export class Menu {
  readonly #menu: HTMLElement;
  readonly #trigger: HTMLElement;
  #cleanup: VoidFunction | null = null;
  #cleanupEvents: VoidFunction | null = null;

  constructor(element: BlMenuElement, trigger: HTMLElement) {
    if (element.blmenu !== undefined) {
      element.blmenu.destroy();
    }
    this.#menu = element;
    this.#trigger = trigger;
    this.#registerEvents();
    element.blmenu = this;
  }

  open() {
    this.#menu.classList.add("show");
    this.#cleanup = autoUpdate(
      this.#trigger,
      this.#menu,
      this.#updatePosition.bind(this),
    );
  }

  close() {
    this.#menu.classList.remove("show");
    if (this.#cleanup) {
      this.#cleanup();
    }
  }

  isOpen() {
    return this.#menu.classList.contains("show");
  }

  destroy() {
    this.close();
    if (this.#cleanupEvents) {
      this.#cleanupEvents();
    }
  }

  #registerEvents() {
    const triggerHandler = this.#toggle.bind(this);
    this.#trigger.addEventListener("click", triggerHandler);

    const documentClickHandler = (e: MouseEvent) => {
      if (
        !this.#menu.contains(e.target as Node) &&
        !this.#trigger.contains(e.target as Node)
      ) {
        this.close();
      }
    };
    document.addEventListener("click", documentClickHandler);

    const documentKeydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        this.close();
      }
    };
    document.addEventListener("keydown", documentKeydownHandler);

    this.#cleanupEvents = () => {
      this.#trigger.removeEventListener("click", triggerHandler);
      document.removeEventListener("click", documentClickHandler);
      document.removeEventListener("keydown", documentKeydownHandler);
    };
  }

  #toggle(e: MouseEvent) {
    e.preventDefault();
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  #updatePosition() {
    computePosition(this.#trigger, this.#menu, {
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

export function initMenus() {
  document.querySelectorAll<HTMLElement>(".menu").forEach((menuEl) => {
    const dropdown = menuEl.closest(".dropdown");
    if (!dropdown) {
      return;
    }

    const trigger = dropdown.querySelector<HTMLElement>(
      "[data-dropdown-toggle]",
    );
    if (!trigger) {
      return;
    }

    new Menu(menuEl, trigger);
  });
}
