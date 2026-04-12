import {
  autoUpdate,
  computePosition,
  offset,
  shift,
  flip,
} from "@floating-ui/dom";

export interface BlMenuElement extends HTMLElement {
  blmenu?: Menu;
}

function getOrCreatePortal(): HTMLElement {
  const PORTAL_ID = "bl-menu-portal";
  let portal = document.getElementById(PORTAL_ID);
  if (!portal) {
    portal = document.createElement("div");
    portal.id = PORTAL_ID;
    document.body.appendChild(portal);
  }
  return portal;
}

export class Menu {
  readonly #menu: HTMLElement;
  readonly #trigger: HTMLElement;
  #cleanup: VoidFunction | null = null;
  #cleanupEvents: VoidFunction | null = null;
  #portalParent: Node | null = null;
  #portalNextSibling: Node | null = null;

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
    this.#portalParent = this.#menu.parentNode;
    this.#portalNextSibling = this.#menu.nextSibling;
    getOrCreatePortal().appendChild(this.#menu);

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
      this.#cleanup = null;
    }
    this.#restoreFromPortal();
  }

  #restoreFromPortal() {
    if (this.#portalParent && this.#menu.parentNode !== this.#portalParent) {
      this.#portalParent.insertBefore(this.#menu, this.#portalNextSibling);
    }
    this.#portalParent = null;
    this.#portalNextSibling = null;
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
      middleware: [
        offset(6),
        flip({
          crossAxis: false,
        }),
        shift({ padding: 6 }),
      ],
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
